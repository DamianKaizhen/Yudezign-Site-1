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


# ---------------------------------------------------------------- site-built extras: half walls and props
# Made here, in the hall's coordinates, and joined into their exhibit's model. Props are simple shapes on purpose.
import random
import bmesh


def flat_mat(name, rgb, rough=0.6, metal=0.0):
    mt = bpy.data.materials.get(name)
    if mt:
        return mt
    mt = bpy.data.materials.new(name)
    if not mt.node_tree:
        mt.use_nodes = True
    bs = mt.node_tree.nodes["Principled BSDF"]
    bs.inputs["Base Color"].default_value = (*srgb(rgb), 1)
    bs.inputs["Roughness"].default_value = rough
    bs.inputs["Metallic"].default_value = metal
    return mt


def add_mesh(name, verts, faces, mat, smooth=False):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    bm = bmesh.new(); bm.from_mesh(me)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    me.uv_layers.new(name="UVMap")
    if smooth:
        for pl in me.polygons:
            pl.use_smooth = True
    ob = bpy.data.objects.new(name, me)
    ob.data.materials.append(mat)
    COL.objects.link(ob)
    return ob


def box_ob(name, lo, hi, mat, yaw=0.0):
    cx, cy = (lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2
    c, s_ = math.cos(yaw), math.sin(yaw)
    vs = []
    for x in (lo[0], hi[0]):
        for y in (lo[1], hi[1]):
            for z in (lo[2], hi[2]):
                dx, dy = x - cx, y - cy
                vs.append((cx + dx * c - dy * s_, cy + dx * s_ + dy * c, z))
    return add_mesh(name, vs, [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)], mat)


def lathe(name, at, profile, mat, seg=20):
    """A turned shape: profile is (radius, height) pairs from the foot up; closed at both ends."""
    vs, fs = [], []
    for r, z in profile:
        for k in range(seg):
            a = 2 * math.pi * k / seg
            vs.append((at[0] + r * math.cos(a), at[1] + r * math.sin(a), at[2] + z))
    for i in range(len(profile) - 1):
        for k in range(seg):
            a, b = i * seg + k, i * seg + (k + 1) % seg
            fs.append((a, b, b + seg, a + seg))
    fs.append(tuple(range(seg)))
    fs.append(tuple((len(profile) - 1) * seg + k for k in range(seg)))
    return add_mesh(name, vs, fs, mat, smooth=True)


def blade(name, at, height, width, lean, yaw, mat, curl=0.0, n=7, thick=0.004):
    """A leaf or stem: a tapering strip that leans out and curls, with a little thickness so both sides show."""
    out = Vector((math.cos(yaw), math.sin(yaw), 0)); side = Vector((-math.sin(yaw), math.cos(yaw), 0))
    vs, fs = [], []
    for i in range(n + 1):
        t = i / n
        ang = lean + curl * t * t
        c = Vector(at) + out * (height * (math.sin(lean) * t + (math.cos(lean) - math.cos(ang)) * t * 0.6)) + Vector((0, 0, height * t * math.cos(ang * 0.6)))
        w = width * (0.55 + 0.9 * t) * (1 - t) ** 0.5 if i < n else width * 0.03
        nrm = (out * math.cos(ang) - Vector((0, 0, math.sin(ang)))).normalized()
        for sx, sn in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
            vs.append(tuple(c + side * (sx * w / 2) + nrm * (sn * thick / 2)))
    for i in range(n):
        a = i * 4
        for k in range(4):
            fs.append((a + k, a + (k + 1) % 4, a + 4 + (k + 1) % 4, a + 4 + k))
    fs.append((0, 1, 2, 3)); fs.append((n * 4, n * 4 + 1, n * 4 + 2, n * 4 + 3))
    return add_mesh(name, vs, fs, mat, smooth=True)


PROP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "props")
PROP_MODELS = {}          # asset -> (template object, size)
# kind -> (asset, height it stands in the hall, most triangles it may keep)
PROP_KINDS = {"snake": ("potted_plant_01", 1.35, 9000), "bush": ("potted_plant_02", 0.5, 6000), "plant": ("potted_plant_04", 0.24, 2500),
              "vase": ("ceramic_vase_02", 0.3, 1200), "tallvase": ("ceramic_vase_01", 0.42, 1200), "basket": ("wicker_basket_02", 0.5, 3000)}


def prop_model(aid, max_tris):
    """A model from pipeline/props as one slim object, kept out of the bake and the export; copies of it are placed."""
    if aid in PROP_MODELS:
        return PROP_MODELS[aid]
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(PROP_DIR, aid, aid + ".gltf"))
    obs = [o for o in bpy.data.objects if o not in before and o.type == "MESH" and o.name in bpy.context.view_layer.objects]
    bpy.ops.object.select_all(action="DESELECT")
    for o in obs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    bpy.ops.object.parent_clear(type="CLEAR_KEEP_TRANSFORM")
    if len(obs) > 1:
        bpy.ops.object.join()
    ob = bpy.context.view_layer.objects.active
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    for o in [o for o in bpy.data.objects if o not in before and o is not ob]:
        bpy.data.objects.remove(o, do_unlink=True)
    t = sum(len(pl.vertices) - 2 for pl in ob.data.polygons)
    if t > max_tris:
        md = ob.modifiers.new("dec", "DECIMATE")
        md.ratio = max_tris / t
        new_me = bpy.data.meshes.new_from_object(ob.evaluated_get(bpy.context.evaluated_depsgraph_get()))
        ob.modifiers.remove(md)
        ob.data = new_me
    for k, sl in enumerate(ob.material_slots):
        sl.material.name = "prop %s %d" % (aid, k)
        for n in sl.material.node_tree.nodes:
            if n.type == "TEX_IMAGE" and n.image and max(n.image.size) > 512:
                n.image.scale(512, 512)
    pts = [Vector(c) for c in ob.bound_box]
    lo = Vector([min(p[i] for p in pts) for i in range(3)]); hi = Vector([max(p[i] for p in pts) for i in range(3)])
    for v in ob.data.vertices:          # stand it on the origin
        v.co -= Vector(((lo.x + hi.x) / 2, (lo.y + hi.y) / 2, lo.z))
    ob.name = "prop template " + aid
    ob.hide_render = True
    ob.location = (0, -50, -50)
    log("prop model", aid, t, "->", sum(len(pl.vertices) - 2 for pl in ob.data.polygons), "tris, size", [round(v, 2) for v in (hi - lo)])
    PROP_MODELS[aid] = (ob, hi - lo)
    return PROP_MODELS[aid]


def make_prop(kind, at, rng, yaw=0.0, scale=1.0):
    if kind in PROP_KINDS and os.path.isdir(os.path.join(PROP_DIR, PROP_KINDS[kind][0])):
        aid, height, tris = PROP_KINDS[kind]
        tpl, size = prop_model(aid, tris)
        ob = tpl.copy(); ob.data = tpl.data.copy()
        ob.name = "prop " + kind
        ob.hide_render = False
        k = height * scale / size.z
        ob.scale = (k, k, k)
        ob.rotation_euler[2] = yaw if yaw else rng.uniform(0, 2 * math.pi)
        ob.location = at
        COL.objects.link(ob)
        return [ob]
    k = scale
    leaf = [flat_mat("prop leaf %d" % i, c, 0.55) for i, c in enumerate(((52, 84, 58), (66, 102, 64), (40, 68, 50)))]
    obs = []
    if kind in ("snake", "plant"):          # a floor planter with tall upright leaves / a small pot of the same
        tall = kind == "snake"
        r, h = (0.17 * k, 0.40 * k) if tall else (0.055 * k, 0.085 * k)
        pot = flat_mat("prop pot dark" if tall else "prop pot clay", (38, 36, 34) if tall else (196, 176, 150), 0.7)
        obs.append(lathe("prop pot", at, [(r * 0.78, 0), (r, h), (r * 0.9, h), (r * 0.9, h * 0.94)], pot))
        obs.append(lathe("prop soil", (at[0], at[1], at[2] + h * 0.93), [(r * 0.9, 0), (r * 0.9, 0.004)], flat_mat("prop soil", (46, 36, 28), 0.95), seg=14))
        for i in range(15 if tall else 10):
            a = rng.uniform(0, 2 * math.pi); d = rng.uniform(0, r * 0.55)
            base = (at[0] + d * math.cos(a), at[1] + d * math.sin(a), at[2] + h * 0.93)
            hh = rng.uniform(0.55, 1.0) * (0.95 * k if tall else 0.2 * k)
            obs.append(blade("prop leaf", base, hh, (0.075 * k if tall else 0.022 * k) * rng.uniform(0.8, 1.15),
                             rng.uniform(0.04, 0.22) if tall else rng.uniform(0.25, 0.7), a + rng.uniform(-0.5, 0.5), leaf[i % 3],
                             curl=rng.uniform(0.0, 0.25) if tall else rng.uniform(0.3, 0.9)))
    elif kind == "vase":          # a ceramic vase with a few dry stems
        obs.append(lathe("prop vase", at, [(0.045 * k, 0), (0.085 * k, 0.07 * k), (0.095 * k, 0.15 * k), (0.06 * k, 0.26 * k), (0.035 * k, 0.31 * k), (0.042 * k, 0.33 * k)],
                         flat_mat("prop ceramic", (224, 214, 198), 0.35)))
        stem = flat_mat("prop stem", (176, 148, 108), 0.8)
        for i in range(7):
            a = rng.uniform(0, 2 * math.pi)
            obs.append(blade("prop stem", (at[0], at[1], at[2] + 0.30 * k), rng.uniform(0.32, 0.5) * k, 0.012 * k, rng.uniform(0.05, 0.3), a, stem, curl=rng.uniform(0.1, 0.5), thick=0.006))
    elif kind == "books":          # three books in a stack
        z = at[2]
        for i, (w, d, t, c) in enumerate(((0.26, 0.19, 0.035, (58, 70, 66)), (0.24, 0.17, 0.028, (196, 178, 150)), (0.21, 0.15, 0.03, (120, 76, 52)))):
            obs.append(box_ob("prop book", (at[0] - w * k / 2, at[1] - d * k / 2, z), (at[0] + w * k / 2, at[1] + d * k / 2, z + t * k),
                              flat_mat("prop book %d" % i, c, 0.75), yaw + rng.uniform(-0.25, 0.25)))
            z += t * k
    elif kind == "bowl":          # a shallow bowl
        obs.append(lathe("prop bowl", at, [(0.06 * k, 0), (0.13 * k, 0.045 * k), (0.16 * k, 0.085 * k), (0.15 * k, 0.085 * k), (0.12 * k, 0.05 * k), (0.05 * k, 0.012 * k)],
                         flat_mat("prop bowl", (60, 52, 44), 0.4)))
    else:
        raise SystemExit("unknown prop " + kind)
    return obs


def site_extras(e, meshes, lo, hi):
    """Half walls beside a design's exposed flank, and props, placed from the design's own footprint."""
    made = []
    ap = [o.matrix_world @ Vector(c) for o in meshes for c in o.bound_box]          # the design as placed in the hall
    lo = Vector([min(p[i] for p in ap) for i in range(3)]); hi = Vector([max(p[i] for p in ap) for i in range(3)])
    low = [o for o in meshes if max((o.matrix_world @ Vector(c)).z for c in o.bound_box) < 1.3] or meshes
    lp = [o.matrix_world @ Vector(c) for o in low for c in o.bound_box]
    l2 = Vector([min(p[i] for p in lp) for i in range(3)]); h2 = Vector([max(p[i] for p in lp) for i in range(3)])
    for hw in e.get("halfwalls", []):          # side: 1 = the far (+x) flank, -1 = the approach flank
        th = hw.get("thick", 0.1)
        x0 = h2.x + 0.006 if hw["side"] > 0 else l2.x - 0.006 - th
        made.append(box_ob("%s half wall" % e["sku"], (x0, l2.y - hw.get("front", 0.0), 0), (x0 + th, BACK if hw.get("to_back", True) else h2.y, hw.get("height", 1.12)),
                           flat_mat("halfwall", (150, 140, 128), 0.85)))
        log("half wall", e["sku"], "x", round(x0, 2), "y", round(l2.y, 2), "to", round(BACK, 2))
    rng = random.Random(e["sku"])
    for sw in e.get("swaps", []):          # a stand-in box in the design (found by its picture's name) gives way to a real model
        def pictures(o):
            return {n.image.name for sl in o.material_slots if sl.material and sl.material.node_tree for n in sl.material.node_tree.nodes if n.type == "TEX_IMAGE" and n.image}
        old = [o for o in meshes if any(sw["picture"] in nm for nm in pictures(o))]
        if not old:
            log("SWAP SKIPPED", e["sku"], sw["picture"], "not found")
            continue
        sp = [o.matrix_world @ Vector(c) for o in old for c in o.bound_box]
        a = Vector([min(p[i] for p in sp) for i in range(3)]); b = Vector([max(p[i] for p in sp) for i in range(3)])
        tpl, size = prop_model(*[PROP_KINDS[sw["kind"]][i] for i in (0, 2)])
        ob = tpl.copy(); ob.data = tpl.data.copy()
        ob.name = "prop " + sw["kind"]; ob.hide_render = False
        ob.scale = ((b.x - a.x) * 0.94 / size.x, (b.y - a.y) * 0.94 / size.y, (b.z - a.z) / size.z)
        ob.location = ((a.x + b.x) / 2, (a.y + b.y) / 2, a.z)
        COL.objects.link(ob)
        for o in old:
            meshes.remove(o)
            bpy.data.objects.remove(o, do_unlink=True)
        made.append(ob)
        log("swap", e["sku"], sw["picture"], "->", sw["kind"], len(old), "pieces, size", [round(v, 2) for v in (b - a)])
    for pr in e.get("props", []):          # rel: across the footprint (0..1 = left..right, front..back); drop: stand on what is there
        x = lo.x + pr["rel"][0] * (hi.x - lo.x); y = lo.y + pr["rel"][1] * (hi.y - lo.y); z = 0.0
        if pr.get("drop"):
            bpy.context.view_layer.update()
            ok, loc, nrm, _i, _o, _m = scene.ray_cast(bpy.context.evaluated_depsgraph_get(), Vector((x, y, pr.get("from", 1.35))), Vector((0, 0, -1)))
            if not ok or loc.z < 0.3 or nrm.z < 0.9:
                log("PROP SKIPPED", e["sku"], pr["kind"], "nothing level under", round(x, 2), round(y, 2), "hit", ok, round(loc.z, 2) if ok else None)
                continue
            z = loc.z
        obs = make_prop(pr["kind"], (x, y, z), rng, pr.get("yaw", 0.0), pr.get("scale", 1.0))
        made += obs
        log("prop", e["sku"], pr["kind"], "at", round(x, 2), round(y, 2), round(z, 2))
    return made


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
    extras = site_extras(e, meshes, lo, hi)
    groups[e["sku"]] = [o for o in meshes if o not in movs] + extras
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
        if t > 3000 and not o.name.startswith("prop "):
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
    if name.startswith(("Door face", "Drawer face")):          # fronts stay apart from the carcass: viewers recolour them
        return "face"
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
