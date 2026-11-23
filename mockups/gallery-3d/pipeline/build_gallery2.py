"""build_gallery2.py - the hall with sold client designs only.

blender -b -P build_gallery2.py -- <sold_dir> <out_assets_dir> [bake_width] [samples]
"""
import json, math, os, sys, time
import bpy
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:]
SOLD, OUT = os.path.abspath(argv[0]), os.path.abspath(argv[1])
BW = int(argv[2]) if len(argv) > 2 else 4096
SAMPLES = int(argv[3]) if len(argv) > 3 else 192
HERE = os.path.dirname(os.path.abspath(__file__))
LAYOUT = json.load(open(os.path.join(HERE, "layout.json"), encoding="utf-8"))
T0 = time.time()


def log(*a):
    print("GAL", round(time.time() - T0), *a, flush=True)


bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
COL = scene.collection
H = LAYOUT["hall"]
X0, X1, Y0, Y1, HH = H["x0"], H["x1"], H["y0"], H["y1"], H["h"]
BACK = 7.9


def srgb(c):
    return [((v / 255) / 12.92 if v / 255 <= 0.04045 else ((v / 255 + 0.055) / 1.055) ** 2.4) for v in c[:3]]


def counter_top(meshes, spec, root, sku):
    """A slab over the raised front of a desk: the footprint of everything that reaches the top, filled and smoothed."""
    import bmesh
    import numpy as np
    tops = {}
    for o in meshes:
        zs = [(o.matrix_world @ Vector(c)).z for c in o.bound_box]
        tops[o.name] = max(zs)
    ztop = max(z for z in tops.values() if z < spec["below"])
    band = [o for o in meshes if ztop - 0.03 <= tops[o.name] <= ztop + 0.002]
    cell = 0.015
    pts = []
    for o in band:
        mw = o.matrix_world
        me = o.data
        for poly in me.polygons:
            vs = [mw @ me.vertices[i].co for i in poly.vertices]
            for k in range(1, len(vs) - 1):
                a, b, c = vs[0], vs[k], vs[k + 1]
                n = int(max((b - a).length, (c - a).length, (c - b).length) / (cell * 0.6)) + 1
                for i in range(n + 1):
                    for j in range(n + 1 - i):
                        q = a + (b - a) * (i / n) + (c - a) * (j / n)
                        pts.append((q.x, q.y))
    pts = np.array(pts)
    lo = pts.min(axis=0) - 0.5
    ij = np.floor((pts - lo) / cell).astype(int)
    shape = ij.max(axis=0) + int(0.5 / cell) + 2
    grid = np.zeros(shape, dtype=bool)
    grid[ij[:, 0], ij[:, 1]] = True

    def morph(gr, r, grow):
        out = gr.copy() if grow else np.ones_like(gr)
        for dx in range(-r, r + 1):
            for dy in range(-r, r + 1):
                if dx * dx + dy * dy > r * r:
                    continue
                sh = np.roll(np.roll(gr, dx, axis=0), dy, axis=1)
                out = (out | sh) if grow else (out & sh)
        return out
    r = int(0.22 / cell)
    grid = morph(morph(grid, r, True), r, False)                       # close the gaps between dividers
    grid = morph(grid, max(1, int(spec["overhang"] / cell)), True)     # a small overhang
    bm = bmesh.new()
    vcache = {}

    def vert(i, j):
        if (i, j) not in vcache:
            vcache[(i, j)] = bm.verts.new((lo[0] + i * cell, lo[1] + j * cell, ztop + spec["thick"]))
        return vcache[(i, j)]
    for i, j in zip(*np.nonzero(grid)):
        bm.faces.new((vert(i, j), vert(i + 1, j), vert(i + 1, j + 1), vert(i, j + 1)))
    bmesh.ops.dissolve_limit(bm, angle_limit=0.02, verts=bm.verts, edges=bm.edges)
    for _ in range(14):                                                 # take the stair-steps off the outline
        bmesh.ops.smooth_vert(bm, verts=[v for v in bm.verts if v.is_boundary], factor=0.5, use_axis_x=True, use_axis_y=True, use_axis_z=False)
    bmesh.ops.dissolve_limit(bm, angle_limit=0.06, verts=bm.verts, edges=bm.edges)
    bmesh.ops.triangulate(bm, faces=bm.faces)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    for f in bm.faces:
        if f.normal.z < 0:
            f.normal_flip()
    ext = bmesh.ops.extrude_face_region(bm, geom=list(bm.faces))
    bmesh.ops.translate(bm, verts=[e for e in ext["geom"] if isinstance(e, bmesh.types.BMVert)], vec=(0, 0, -spec["thick"]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(sku + " top")
    bm.to_mesh(me)
    bm.free()
    me.uv_layers.new(name="UVMap")
    mt = bpy.data.materials.new("Worktop stone")
    if not mt.node_tree:
        mt.use_nodes = True
    bs = mt.node_tree.nodes["Principled BSDF"]
    bs.inputs["Base Color"].default_value = (*srgb((232, 228, 220)), 1)
    bs.inputs["Roughness"].default_value = 0.2
    ob = bpy.data.objects.new(sku + " top", me)
    ob.data.materials.append(mt)
    COL.objects.link(ob)
    ob.parent = root
    log("counter top", sku, "z", round(ztop, 3), "band objects", len(band), "tris", len(me.polygons))
    return ob


# ---------------------------------------------------------------- exhibits
# The exporter (mrs_export.py --movables --leds) keeps each real door and drawer as its own node, mv_NNN, and lists its
# hinge axis or pull direction beside the model in <name>.movables.json. They stay separate objects here.
groups = {}
MOVABLES, LEDS, mov_objs = [], [], []


def g2b(v):
    """glTF (y up) -> Blender (z up)."""
    return Vector((v[0], -v[2], v[1]))


for e in LAYOUT["exhibits"]:
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(SOLD, e["glb"]))
    new = [o for o in bpy.data.objects if o not in before]
    side = json.load(open(os.path.join(SOLD, e["glb"][:-4] + ".movables.json"), encoding="utf-8"))
    mvmeta = {m["name"]: m for m in side["movables"]}
    mine = []
    for o in new:
        base = o.name.split(".")[0]
        if o.type == "MESH" and base in mvmeta:
            mine.append((o, mvmeta[base]))
            o.name = "mv_%s_%s" % (e["sku"], base[3:])
    if len(mine) != len(mvmeta):
        raise SystemExit("%s: %d of %d doors and drawers found after import" % (e["sku"], len(mine), len(mvmeta)))
    ROOM = ("01()", "lvkouban", "noname_", "2012-6-")          # walls, floor, ceiling, ceiling light of the source room
    drop = tuple(e.get("drop", []))
    for o in [o for o in new if o.type == "MESH" and (o.name.startswith(ROOM) or o.name in drop)]:
        new.remove(o)
        bpy.data.objects.remove(o, do_unlink=True)
    root = bpy.data.objects.new(e["sku"], None)
    COL.objects.link(root)
    for o in new:
        if o.parent is None:
            o.parent = root
    if e.get("top"):
        bpy.context.view_layer.update()
        new.append(counter_top([o for o in new if o.type == "MESH"], e["top"], root, e["sku"]))
    for k, bx in enumerate(e.get("boxes", [])):          # site-built extras, in the model's own coordinates
        mt = bpy.data.materials.get("halfwall") or bpy.data.materials.new("halfwall")
        if not mt.node_tree:
            mt.use_nodes = True
        bs = mt.node_tree.nodes["Principled BSDF"]
        bs.inputs["Base Color"].default_value = (*srgb((150, 140, 128)), 1)
        bs.inputs["Roughness"].default_value = 0.85
        lo_, hi_ = bx["lo"], bx["hi"]
        me = bpy.data.meshes.new("extra")
        vs = [(x, y, z) for x in (lo_[0], hi_[0]) for y in (lo_[1], hi_[1]) for z in (lo_[2], hi_[2])]
        me.from_pydata(vs, [], [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)])
        import bmesh
        bm = bmesh.new(); bm.from_mesh(me)
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
        bm.to_mesh(me); bm.free()
        me.uv_layers.new(name="UVMap")
        ob = bpy.data.objects.new("%s extra %d" % (e["sku"], k), me)
        ob.data.materials.append(mt)
        COL.objects.link(ob)
        ob.parent = root
        new.append(ob)
    root.rotation_euler[2] = math.radians(e["rot"])
    bpy.context.view_layer.update()
    meshes = [o for o in new if o.type == "MESH"]
    pts = [o.matrix_world @ Vector(c) for o in meshes for c in o.bound_box]
    lo = Vector([min(p[i] for p in pts) for i in range(3)])
    hi = Vector([max(p[i] for p in pts) for i in range(3)])
    root.location = (e["xc"] - (lo.x + hi.x) / 2, BACK - hi.y, -lo.z)
    bpy.context.view_layer.update()
    movs = [o for o, _ in mine]
    groups[e["sku"]] = [o for o in meshes if o not in movs]
    Mw = root.matrix_world.copy()
    R3 = Mw.to_3x3()
    for o, m in mine:
        mov_objs.append(o)
        MOVABLES.append(dict(name=o.name, sku=e["sku"], kind=m["kind"], pivot=[round(c, 4) for c in Mw @ g2b(m["pivot"])],
                             axis=[round(c, 5) for c in (R3 @ g2b(m["axis"])).normalized()], max=m["max"]))
    for d in side["leds"]:
        LEDS.append(dict(sku=e["sku"], a=[round(c, 4) for c in Mw @ g2b(d["a"])], b=[round(c, 4) for c in Mw @ g2b(d["b"])],
                         out=[round(c, 3) for c in (R3 @ g2b(d["out"])).normalized()]))
    log("placed", e["sku"], "size", [round(v, 2) for v in (hi - lo)])

# ---------------------------------------------------------------- hall shell
def shell_mat(name, color, rough, size):
    mt = bpy.data.materials.new(name)
    if not mt.node_tree:
        mt.use_nodes = True
    nt = mt.node_tree
    b = nt.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*color, 1)
    b.inputs["Roughness"].default_value = rough
    img = bpy.data.images.new(name + "_bake", size[0], size[1], alpha=False, float_buffer=True)
    t = nt.nodes.new("ShaderNodeTexImage")
    t.image = img
    nt.nodes.active = t
    return mt, img


def quad(name, p0, pu, pv, mat):
    p0, pu, pv = Vector(p0), Vector(pu), Vector(pv)
    me = bpy.data.meshes.new(name)
    me.from_pydata([tuple(p0), tuple(p0 + pu), tuple(p0 + pu + pv), tuple(p0 + pv)], [], [(0, 1, 2, 3)])
    uv = me.uv_layers.new(name="UVMap")
    for i, c in enumerate([(0, 0), (1, 0), (1, 1), (0, 1)]):
        uv.data[i].uv = c
    ob = bpy.data.objects.new(name, me)
    ob.data.materials.append(mat)
    COL.objects.link(ob)
    return ob


L, Wd = X1 - X0, Y1 - Y0
WALL, FLOOR, CEIL = srgb((122, 112, 102)), srgb((52, 50, 48)), srgb((30, 28, 27))
SH = BW // 8
defs = [
    ("shell_floor", (X0, Y0, 0), (L, 0, 0), (0, Wd, 0), FLOOR, 0.28, (BW, BW * 3 // 16)),
    ("shell_back", (X0, Y1, 0), (L, 0, 0), (0, 0, HH), WALL, 0.85, (BW, SH)),
    ("shell_front", (X1, Y0, 0), (-L, 0, 0), (0, 0, HH), WALL, 0.85, (BW, SH)),
    ("shell_west", (X0, Y0, 0), (0, Wd, 0), (0, 0, HH), WALL, 0.85, (BW // 4, SH)),
    ("shell_east", (X1, Y1, 0), (0, -Wd, 0), (0, 0, HH), WALL, 0.85, (BW // 4, SH)),
    ("shell_ceiling", (X0, Y1, HH), (L, 0, 0), (0, -Wd, 0), CEIL, 0.9, (BW // 2, SH)),
]
shells = []
for name, p0, pu, pv, col, rough, size in defs:
    mt, img = shell_mat(name, col, rough, size)
    shells.append((quad(name, p0, pu, pv, mt), img))

# ---------------------------------------------------------------- partition walls (west face, east face, end cap)
TH = 0.2
for w in LAYOUT.get("wings", []):
    xa, xb, y0 = w["x"] - TH / 2, w["x"] + TH / 2, w["y0"]
    mt, img = shell_mat(w["name"], WALL, 0.85, (1024, 512))
    me = bpy.data.meshes.new(w["name"])
    verts = [(xa, Y1, 0), (xa, y0, 0), (xa, y0, HH), (xa, Y1, HH),          # west face, looks toward the entrance
             (xb, y0, 0), (xb, Y1, 0), (xb, Y1, HH), (xb, y0, HH),          # east face
             (xa, y0, 0), (xb, y0, 0), (xb, y0, HH), (xa, y0, HH)]          # end cap
    me.from_pydata(verts, [], [(0, 1, 2, 3), (4, 5, 6, 7), (8, 9, 10, 11)])
    uv = me.uv_layers.new(name="UVMap")
    for f, (u0, u1) in enumerate(((0.0, 0.48), (0.5, 0.98), (0.985, 1.0))):
        for k, (a, b) in enumerate(((u0, 0), (u1, 0), (u1, 1), (u0, 1))):
            uv.data[f * 4 + k].uv = (a, b)
    ob = bpy.data.objects.new(w["name"], me)
    ob.data.materials.append(mt)
    COL.objects.link(ob)
    shells.append((ob, img))

# ---------------------------------------------------------------- lights
def spot(name, loc, aim, energy, size=60, blend=0.7):
    sp = bpy.data.lights.new(name, "SPOT")
    sp.energy = energy
    sp.spot_size = math.radians(size)
    sp.spot_blend = blend
    sp.shadow_soft_size = 0.35
    sp.color = (1.0, 0.9, 0.78)
    so = bpy.data.objects.new(name, sp)
    so.location = loc
    so.rotation_euler = (Vector(aim) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    COL.objects.link(so)


SP = LAYOUT["spot"]
for p in LAYOUT["pieces"]:
    cx, cy = (p["x"] + p["W"] / 2) / 1000, (p["y"] + p["D"] / 2) / 1000
    spot(p["sku"] + " spot", (cx, cy - 2.2, 3.4), (cx, cy, 0.5), SP["energy"], SP["angle"], 0.6)
for s in LAYOUT["sections"]:
    for f in s["frames"]:
        spot("pic " + f["title"], (f["x"], Y0 + 1.9, HH - 0.15), (f["x"], Y0, f["z"]), 150, 46)
for w in LAYOUT.get("wings", []):
    ym = (w["y0"] + Y1) / 2
    sd = w.get("side", -1)
    spot("wing wash " + w["name"], (w["x"] + sd * 2.0, ym, HH - 0.15), (w["x"], ym, 1.8), 170, 70)
spot("east wash a", (X1 - 2.6, 2.6, HH - 0.15), (X1, 2.9, 2.0), 260)
spot("east wash b", (X1 - 2.6, 5.4, HH - 0.15), (X1, 5.1, 2.0), 260)
# a soft wash down the back wall between the exhibits, so it never reads as a void
xs = sorted((p["x"] + p["W"] / 2) / 1000 for p in LAYOUT["pieces"])
gaps = [39.0, 42.0]
for i, gx in enumerate(gaps):
    for dx in (-2.2, 0, 2.2):
        spot(f"wall wash {i} {dx}", (gx + dx, Y1 - 1.5, HH - 0.15), (gx + dx, Y1, 1.7), 90, 70)
for i, fx in enumerate((4.0, 16.0, 28.0, 40.0)):
    a = bpy.data.lights.new(f"fill{i}", "AREA")
    a.size = 12; a.size_y = 4; a.energy = 260; a.color = (1.0, 0.92, 0.84)
    o = bpy.data.objects.new(f"fill{i}", a)
    o.location = (fx, 3.2, HH - 0.1)
    COL.objects.link(o)

vw = LAYOUT["videoWall"]
em = bpy.data.materials.new("videowall_glow")
if not em.node_tree:
    em.use_nodes = True
nt = em.node_tree
for n in list(nt.nodes):
    if n.type == "BSDF_PRINCIPLED":
        nt.nodes.remove(n)
e_ = nt.nodes.new("ShaderNodeEmission")
e_.inputs["Color"].default_value = (0.9, 0.82, 0.72, 1)
e_.inputs["Strength"].default_value = 2.2
nt.links.new(e_.outputs["Emission"], nt.nodes["Material Output"].inputs["Surface"])
glow = quad("videowall_glow", (X0 + 0.03, vw["y"] - vw["w"] / 2, vw["z"] - vw["h"] / 2), (0, vw["w"], 0), (0, 0, vw["h"]), em)

world = bpy.data.worlds.new("World")
scene.world = world
if not world.node_tree:
    world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = (0, 0, 0, 1)

# ---------------------------------------------------------------- bake
scene.render.engine = "CYCLES"
prefs = bpy.context.preferences.addons["cycles"].preferences
for dt in ("OPTIX", "CUDA"):
    try:
        prefs.compute_device_type = dt
        prefs.get_devices()
        if any(d.type == dt for d in prefs.devices):
            for d in prefs.devices:
                d.use = d.type == dt
            scene.cycles.device = "GPU"
            log("gpu", dt)
            break
    except Exception:
        pass
scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.cycles.sample_clamp_indirect = 3.0
scene.cycles.use_adaptive_sampling = False
scene.view_settings.view_transform = "Standard"
try:
    scene.view_settings.look = "None"
except Exception:
    pass
scene.view_settings.exposure = -1.0
scene.render.image_settings.file_format = "JPEG"
scene.render.image_settings.quality = 95
os.makedirs(os.path.join(OUT, "bake"), exist_ok=True)
os.makedirs(os.path.join(OUT, "models"), exist_ok=True)
for ob, img in shells:
    if ob.name == "shell_ceiling" or os.environ.get("NOBAKE"):
        continue
    bpy.ops.object.select_all(action="DESELECT")
    ob.select_set(True)
    bpy.context.view_layer.objects.active = ob
    bpy.ops.object.bake(type="DIFFUSE", pass_filter={"DIRECT", "INDIRECT", "COLOR"}, margin=2)
    img.save_render(os.path.join(OUT, "bake", ob.name + ".jpg"), scene=scene)
    log("baked", ob.name, img.size[:])
bpy.data.objects.remove(glow, do_unlink=True)

# ---------------------------------------------------------------- doors, drawers and light strips
bpy.context.view_layer.update()
json.dump({"movables": MOVABLES, "leds": LEDS}, open(os.path.join(OUT, "movables.json"), "w"), indent=0)
log("movables", len(MOVABLES), {k: sum(1 for m in MOVABLES if m["kind"] == k) for k in ("door", "flap", "drawer")}, "leds", len(LEDS))
log("movables by exhibit", {s_: sum(1 for m in MOVABLES if m["sku"] == s_) for s_ in groups})

# ---------------------------------------------------------------- slim the models down
# appliances, sinks, taps, stools and plants arrive far denser than a web page needs
dg = bpy.context.evaluated_depsgraph_get()
before_t = after_t = 0
for obs in list(groups.values()) + [mov_objs]:
    for o in obs:
        t = sum(len(pl.vertices) - 2 for pl in o.data.polygons)
        before_t += t
        if t > 3000:
            md = o.modifiers.new("dec", "DECIMATE")
            md.ratio = max(0.18, min(0.6, 2500 / t))
            dg = bpy.context.evaluated_depsgraph_get()
            new_me = bpy.data.meshes.new_from_object(o.evaluated_get(dg))
            o.modifiers.remove(md)
            o.data = new_me
            t = sum(len(pl.vertices) - 2 for pl in o.data.polygons)
        after_t += t
log("decimate", before_t, "->", after_t, "tris")

import hashlib
import re


def klass(name):
    for k in ("jinse", "liangguangjinshu", "jinshu", "dalishi", "taoci", "pige"):
        if k in name:
            return k
    if re.match(r"01 - Default|8d6e78b8", name):
        return "mirror"
    if name.startswith("Worktop"):
        return "Worktop"
    return "board"


img_key, img_first = {}, {}
for im in bpy.data.images:
    if im.size[0] == 0 or im.name.endswith("_bake"):
        continue
    if max(im.size) > 1024:
        f = 1024 / max(im.size)
        im.scale(max(1, int(im.size[0] * f)), max(1, int(im.size[1] * f)))
    import numpy as np
    buf = np.empty(len(im.pixels), dtype=np.float32)
    im.pixels.foreach_get(buf)                      # compare the whole picture, not one corner of it
    key = (tuple(im.size), hashlib.md5(np.round(buf, 2).tobytes()).hexdigest())
    img_key[im.name] = key
    img_first.setdefault(key, im)
mat_first, remap = {}, {}
for mt in bpy.data.materials:
    if not mt.node_tree or mt.name.startswith(("shell_", "wing_", "videowall")):
        continue
    b = next((n for n in mt.node_tree.nodes if n.type == "BSDF_PRINCIPLED"), None)
    if not b:
        continue
    tex = next((n for n in mt.node_tree.nodes if n.type == "TEX_IMAGE" and n.image and n.image.name in img_key), None)
    if tex:
        tex.image = img_first[img_key[tex.image.name]]
    col = tuple(round(v, 3) for v in b.inputs["Base Color"].default_value)
    alpha = round(b.inputs["Alpha"].default_value, 2)
    key = (klass(mt.name), tex.image.name if tex else None, tex.extension if tex else None, None if tex else col, alpha, mt.blend_method if hasattr(mt, "blend_method") else "")
    if key in mat_first:
        remap[mt.name] = mat_first[key]
    else:
        mat_first[key] = mt
allm = [o for obs in groups.values() for o in obs]
for o in allm + mov_objs:
    for sl in o.material_slots:
        if sl.material and sl.material.name in remap:
            sl.material = remap[sl.material.name]
log("materials", len(mat_first), "kept,", len(remap), "merged; images", len(img_first), "of", len(img_key))

# ---------------------------------------------------------------- export
bpy.context.view_layer.update()
world_m = {o.name: o.matrix_world.copy() for o in allm + mov_objs}
for o in allm + mov_objs:
    o.parent = None
    o.matrix_world = world_m[o.name]
joined = []
for g, obs in groups.items():
    bpy.ops.object.select_all(action="DESELECT")
    for o in obs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    if len(obs) > 1:
        bpy.ops.object.join()
    act = bpy.context.view_layer.objects.active
    act.name = g
    log("joined", g, len(obs), "objects", sum(len(p.vertices) - 2 for p in act.data.polygons), "tris", len(act.data.materials), "materials")
    joined.append(act)


def export(path, obs, draco=False):
    bpy.ops.object.select_all(action="DESELECT")
    for o in obs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    kw = dict(filepath=path, export_format="GLB", use_selection=True, export_yup=True, export_apply=False,
              export_cameras=False, export_lights=False, export_image_format="JPEG", export_jpeg_quality=82,
              export_draco_mesh_compression_enable=draco and not os.environ.get("NODRACO"), export_draco_mesh_compression_level=6,
              export_draco_position_quantization=14, export_draco_normal_quantization=10, export_draco_texcoord_quantization=24)
    try:
        bpy.ops.export_scene.gltf(**kw)
    except TypeError as ex:
        log("export retry", ex)
        for k in ("export_jpeg_quality", "export_lights", "export_cameras"):
            kw.pop(k, None)
        bpy.ops.export_scene.gltf(**kw)
    log("exported", os.path.basename(path), round(os.path.getsize(path) / 1e6, 1), "MB")


for sku_, act in zip(groups, joined):          # one model per exhibit: the hall loads them in turn, a service page only its own
    export(os.path.join(OUT, "models", sku_ + ".glb"),
           [act] + [o for o in mov_objs if o.name.startswith("mv_%s_" % sku_)], draco=True)
export(os.path.join(OUT, "models", "shell.glb"), [ob for ob, _ in shells if ob.name != "shell_floor"])
log("done")
