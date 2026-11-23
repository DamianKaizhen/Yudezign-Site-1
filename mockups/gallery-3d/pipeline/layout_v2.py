"""v2 layout: the 3D exhibits are sold client designs only (no concept pieces)."""
import json, os, shutil

REPO = r"\\wsl.localhost\Ubuntu\home\damian\yukon-projects\Yudezign-Site-1"
ASSETS = os.path.join(REPO, "mockups", "gallery-3d", "assets")
HERE = os.path.dirname(os.path.abspath(__file__))
SOLD = os.path.join(HERE, "..", "sold")
base = json.load(open(os.path.join(ASSETS, "gallery.json"), encoding="utf-8"))
BACK = 7.9

# glb, rotation about Z (deg) so the design faces into the hall, footprint after rotation (m), centre x
EXHIBITS = [
    dict(sku="mudroom", glb="mudroom/Mudroom.glb", rot=-90, W=2.02, D=0.64, H=2.42, xc=41.2, drop=["UKQD-A003"],
         title="Mudroom", eyebrow="Showroom display",
         text="A bench over open cubbies with a panelled back, an open shelf and a row of upper cabinets, in blue and oak.",
         meta="Mudroom  \u00b7  Yukon Flooring Showroom, Stafford"),
    dict(sku="coffee-bar", side=1, glb="coffee-bar/Coffee Bar Area.glb", rot=0, W=2.46, D=1.4, H=2.42, xc=35.2,
         title="Coffee Bar", eyebrow="Showroom display",
         text="An L-shaped coffee bar in green with a slat backsplash, a wine cooler and a wood-wrapped tall end.",
         meta="Coffee bar  ·  Yukon Flooring Showroom, Stafford"),
    dict(sku="showroom-kitchen", side=1, glb="showroom-kitchen/Kichen 1v5.glb", rot=0, W=3.62, D=3.2, H=2.74, xc=17.4,
         title="Showroom Kitchen", eyebrow="Showroom display",
         text="A handleless kitchen with glass-front uppers, a custom hood, a tall pantry bank and a waterfall island.",
         meta="Kitchen and island  ·  Yukon Flooring Showroom, Stafford"),
    dict(sku="reception-desk", top=dict(below=1.6, thick=0.035, overhang=0.02), glb="tg-reception/TR1p-tg-reception-desk.glb", rot=90, W=2.25, D=2.15, H=2.43, xc=2.0,
         title="Curved Reception Desk", eyebrow="Client project, commercial",
         text="A curved L-shaped reception desk in black with a wood wave inlay and a stone transaction top, set in front of a full-height slat wall.",
         meta="Reception desk and slat wall  \u00b7  Houston"),
    dict(sku="executive-office", side=1, glb="tg-office/TO1-tg-executive-office.glb", rot=180, W=2.67, D=3.5, H=2.79, xc=8.6,
         title="Executive Office", eyebrow="Client project, commercial",
         text="An L-shaped executive desk with a credenza, floating shelves and a slat back panel.",
         meta="Desk, credenza and shelving  \u00b7  Houston"),
    dict(sku="garage-cabinet", glb="garage-cabinet/GarageCabinetv2.glb", rot=0, W=3.18, D=0.72, H=2.79, xc=28.0,
         title="Garage Cabinets", eyebrow="Showroom display",
         text="A wall of garage storage with tall cabinets, lift-up upper doors, a slat wall and a workbench with a drawer bank.",
         meta="Garage storage  \u00b7  Yukon Flooring Showroom, Stafford"),
    dict(sku="master-bath", side=1, glb="master-bath/MasterBathv2.glb", rot=0, W=2.82, D=2.75, H=2.52, xc=21.5,
         title="Master Bath", eyebrow="Showroom display",
         text="A corner double vanity with vessel sinks, framed mirrors and open shelving.",
         meta="Vanities  ·  Yukon Flooring Showroom, Stafford"),
    # hall=False: built for its service page only (a whole walk-in room does not stand against the hall wall)
    dict(sku="master-closet", hall=False, glb="master-closet/master-closet.glb", rot=0, W=4.77, D=5.51, H=4.31, xc=-40.0,
         title="Walk-in Master Closet"),
]
pieces = []
for e in EXHIBITS:
    if not e.get("hall", True):
        continue
    pieces.append(dict(sku=e["sku"], name=e["title"], x=round((e["xc"] - e["W"] / 2) * 1000), y=round((BACK - e["D"]) * 1000),
                       W=round(e["W"] * 1000), D=round(e["D"] * 1000), H=round(e["H"] * 1000)))

old = {s["id"]: s for s in base["stops"]}
stops = [old["intro"], old["hall"]]
stops[1]["text"] = ("One wall holds finished projects across Houston. Along the other stand client designs you can walk "
                    "around, exactly as we drew them. Keep scrolling to walk it.")
stops[1]["target"] = [16.0, 5.4, 1.2]


def exhibit(sku):
    e = next(x for x in EXHIBITS if x["sku"] == sku)
    stops.append(dict(id=sku, zone=None, kind="piece", sku=sku, pos=[round(e["xc"] + e.get("side", -1) * 2.4, 2), round(max(2.7, BACK - e["D"] - 3.2), 2), 1.6],
                      target=[e["xc"], round(BACK - e["D"] / 2, 2), 1.0], lens=22,
                      eyebrow=e["eyebrow"], title=e["title"], text=e["text"], meta=e["meta"]))


for step in ("reception-desk", "wall-kitchens", "executive-office", "wall-closets", "showroom-kitchen", "master-bath",
             "wall-vanities", "garage-cabinet", "wall-custom", "coffee-bar", "wall-commercial", "mudroom"):
    if step in old and step.startswith("wall-"):
        stops.append(old[step])
    else:
        exhibit(step)
stops.append(old["finale"])
for s in stops:
    if s["zone"] is None:
        s["zone"] = min(base["sections"], key=lambda sec: abs(sec["xc"] - s["pos"][0]))["id"]

base["pieces"] = pieces
base["stops"] = stops
base["exhibits"] = [dict(sku=e["sku"], glb=e["glb"], rot=e["rot"], xc=e["xc"], title=e["title"], drop=e.get("drop", []), top=e.get("top"),
                         boxes=e.get("boxes", [])) for e in EXHIBITS]
base["spot"] = dict(energy=900, angle=72)
# partition walls on the approach side of the deep exhibits, each with a screen showing built work
PUB = os.path.join(REPO, "public", "portfolio")
SCREENS = {"coffee-bar": ("closet-collage", "Closet collection", 16 / 9), "showroom-kitchen": ("kitchen-grand-tour", "Grand Kitchen", 16 / 9),
           "master-bath": ("vanity-oak-tour", "Oak Vanity", 16 / 9), "executive-office": ("clinic-cabinets", "Medical Clinic Office", 544 / 720)}
wings = []
for e in EXHIBITS:
    if e["sku"] not in SCREENS or not e.get("hall", True):
        continue
    vid, vtitle, aspect = SCREENS[e["sku"]]
    for src, dst in ((os.path.join(PUB, "videos", vid + ".mp4"), os.path.join(ASSETS, "video", vid + ".mp4")),
                     (os.path.join(PUB, vid + "-poster.jpg"), os.path.join(ASSETS, "video", vid + "-poster.jpg"))):
        if not os.path.exists(dst):
            open(dst, "wb").write(open(src, "rb").read())
    wings.append(dict(name="wing_%d" % len(wings), x=round(e["xc"] - e["W"] / 2 - 0.3, 2), y0=round(BACK - e["D"] - 0.4, 2),
                      title=e["title"], video="assets/video/%s.mp4" % vid, poster="assets/video/%s-poster.jpg" % vid,
                      videoTitle=vtitle, aspect=round(aspect, 4)))
base["wings"] = wings
json.dump(base, open(os.path.join(HERE, "layout.json"), "w", encoding="utf-8"), indent=1)
public = {k: v for k, v in base.items() if k != "exhibits"}          # source file names stay out of the web copy
json.dump(public, open(os.path.join(ASSETS, "gallery.json"), "w", encoding="utf-8"), indent=1)
shutil.rmtree(os.path.join(ASSETS, "drawings"), ignore_errors=True)
print("stops", [s["id"] for s in stops])
