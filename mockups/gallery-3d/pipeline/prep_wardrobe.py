"""prep_wardrobe.py - slim the downloaded garment, shoe, bag and hat models into pipeline/props.

blender -b -P prep_wardrobe.py -- <folder of downloaded .glb, named by the first 8 characters of the model id> <props dir>

The originals are large scans (CC BY 4.0, see props/README.md). Each comes out in metres, standing on the origin,
welded, slimmed, with only its colour picture kept, as props/<name>/<name>.glb. Shoes become a pair (the second
shoe is the mirror of the first, toes to -y); the two shirts on hangers come out in several colourways.
"""
import bpy, os, sys
from mathutils import Vector

SRC, DST = [os.path.abspath(p) for p in sys.argv[sys.argv.index("--") + 1:][:2]]


def load(key):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=os.path.join(SRC, key + ".glb"))
    obs = [o for o in bpy.data.objects if o.type == "MESH"]
    bpy.ops.object.select_all(action="DESELECT")
    for o in obs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    bpy.ops.object.parent_clear(type="CLEAR_KEEP_TRANSFORM")
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    for o in [o for o in bpy.data.objects if o.type != "MESH"]:
        bpy.data.objects.remove(o, do_unlink=True)
    return obs


def join(obs):
    bpy.ops.object.select_all(action="DESELECT")
    for o in obs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    if len(obs) > 1:
        bpy.ops.object.join()
    return bpy.context.view_layer.objects.active


def slim(ob, tris):
    bpy.ops.object.select_all(action="DESELECT")
    ob.select_set(True); bpy.context.view_layer.objects.active = ob
    bpy.ops.object.mode_set(mode="EDIT"); bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.mesh.remove_doubles(threshold=max(ob.dimensions) * 1e-5); bpy.ops.object.mode_set(mode="OBJECT")
    t = sum(len(p.vertices) - 2 for p in ob.data.polygons)
    if t > tris:
        md = ob.modifiers.new("d", "DECIMATE"); md.ratio = tris / t
        bpy.ops.object.modifier_apply(modifier="d")
    bpy.ops.object.shade_smooth()
    return ob


def plain(mat, rough=0.6):
    """Keep only the colour picture: no transparency, bump or gloss maps."""
    nt = mat.node_tree
    b = nt.nodes.get("Principled BSDF")
    if not b:
        return
    for name, val in (("Alpha", 1.0), ("Normal", None), ("Roughness", rough), ("Metallic", 0.9 if "metal" in mat.name.lower() else 0.0), ("Emission Color", None)):
        s = b.inputs.get(name)
        if s is None:
            continue
        for l in list(s.links):
            nt.links.remove(l)
        if val is not None:
            s.default_value = val
    if "metal" in mat.name.lower():
        b.inputs["Roughness"].default_value = 0.35
    for n in nt.nodes:
        if n.type == "TEX_IMAGE" and n.image and max(n.image.size) > 512:
            n.image.scale(512, 512)


def colour(name, rgb, rough=0.8, metal=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*rgb, 1); b.inputs["Roughness"].default_value = rough; b.inputs["Metallic"].default_value = metal
    return m


def box(ob):
    pts = [ob.matrix_world @ Vector(c) for c in ob.bound_box]
    return Vector([min(p[i] for p in pts) for i in range(3)]), Vector([max(p[i] for p in pts) for i in range(3)])


def finish(ob, name, height, squeeze=(1, 1, 1)):
    lo, hi = box(ob)
    k = height / (hi.z - lo.z)
    c = Vector(((lo.x + hi.x) / 2, (lo.y + hi.y) / 2, lo.z))
    for v in ob.data.vertices:
        v.co = Vector(((v.co.x - c.x) * k * squeeze[0], (v.co.y - c.y) * k * squeeze[1], (v.co.z - c.z) * k * squeeze[2]))
    ob.name = name
    os.makedirs(os.path.join(DST, name), exist_ok=True)
    bpy.ops.object.select_all(action="DESELECT"); ob.select_set(True)
    out = os.path.join(DST, name, name + ".glb")
    bpy.ops.export_scene.gltf(filepath=out, use_selection=True, export_format="GLB", export_image_format="JPEG", export_jpeg_quality=85, export_apply=True)
    lo, hi = box(ob)
    print("PREP", name, sum(len(p.vertices) - 2 for p in ob.data.polygons), "tris, size", [round(v, 3) for v in hi - lo], round(os.path.getsize(out) / 1e3), "kB", flush=True)


def simple(key, name, height, tris, pair=False, gap=0.03, turn=0.0):
    ob = slim(join(load(key)), tris)
    for m in ob.data.materials:
        plain(m)
    if turn:
        ob.rotation_euler[2] = turn; bpy.ops.object.transform_apply(rotation=True)
    if pair:          # the other shoe: a mirror image beside it
        lo, hi = box(ob)
        other = ob.copy(); other.data = ob.data.copy(); bpy.context.scene.collection.objects.link(other)
        for v in other.data.vertices:
            v.co.x = 2 * hi.x + gap * (hi.z - lo.z) / height - v.co.x
        other.data.flip_normals()
        ob = join([ob, other])
    finish(ob, name, height)


SHIRTS = {"shirts_light": ((0.93, 0.92, 0.89), (0.74, 0.66, 0.54)), "shirts_blue": ((0.60, 0.69, 0.80), (0.11, 0.15, 0.25)),
          "shirts_dark": ((0.19, 0.19, 0.20), (0.50, 0.55, 0.46)), "shirts_blush": ((0.84, 0.72, 0.68), (0.95, 0.94, 0.92))}
for name, (ca, cb) in SHIRTS.items():          # 6df08ef8: two shirts on two hangers
    obs = sorted(load("6df08ef8"), key=lambda o: -len(o.data.polygons))
    for o, m, t in zip(obs, (colour("shirt a", ca), colour("shirt b", cb), colour("hanger", (0.78, 0.78, 0.8), 0.35, 0.8)), (2000, 2000, 500)):
        slim(o, t)
        o.data.materials.clear(); o.data.materials.append(m)
    finish(join(obs), name, 0.80, squeeze=(0.85, 1, 1))
simple("1ed333dc", "shoes_black", 0.108, 1000, pair=True)
simple("1fab9642", "shoes_tan", 0.119, 1200, pair=True)
simple("6d656faa", "shoes_flat", 0.082, 1000, pair=True)
simple("1e2b4573", "handbag_black", 0.30, 2000)
simple("5b32d39e", "hat_straw", 0.125, 2000)
