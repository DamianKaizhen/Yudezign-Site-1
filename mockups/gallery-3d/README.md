# 3D gallery (home page)

The source of the site's home page gallery. Run python scripts/build-gallery.py to publish it to public/gallery.
node scripts/gallery-data.mjs (part of npm run build) fills its Portfolio and Finishes panels from src/data.

- index.html, style.css, main.js: the hall viewer (three.js, loaded from a CDN). exhibit.html, exhibit.js: one exhibit
  on its own.
- assets/models, assets/bake, assets/photos-sm, assets/gallery.json, assets/movables.json: one model per exhibit, baked
  lighting, wall textures, layout, and the doors, drawers and light strips.
- pipeline/: the Blender 5.3 scripts that place the exported Yukon designs in the hall, bake the lighting and
  export the models. They read design exports from a local work folder and are kept here for reference.

Rules: only real designs we have sold or built are shown, and no customer or street names appear on the page.
The folders assets/video, assets/photos, assets/portfolio, assets/swatches and assets/site.json are local only and
ignored by git; the published gallery uses the copies under public/.

## How the exhibits are built

1. Export each design from its Yukon `.mrs` file with the `yudezign-mrs-format` skill:
   `python mrs_export.py <scene.mrs> <sold>/<folder> --formats glb --room all --movables --leds --max-texture 1024`.
   `--movables` keeps every real door, lift-up flap and drawer as its own part and writes `<name>.movables.json` with the
   design's own hinge line or pull direction and its limit (90 degrees, 450 or 500 mm). Filler panels, exposed end panels
   and false fronts stay fixed. `--leds` places a light strip under each wall cabinet that has a hinged door. The designs
   do not draw their lighting, so the strips are placed, not read from the file.
   The exporter also treats a front as ONE door when the design builds it from several pieces: overlay panels move with
   the door or drawer they cover (the showroom pantry), and a framed glass door stored as two stiles gets its rails and
   glass (the master bath, the walk-in closet). The showroom kitchen needs `--keep-pictures 4772CFDC_10625,wa4925_calcutta`
   so its glazed uppers and marble splashback are not treated as a board finish.
2. `python pipeline/layout_v2.py` writes `pipeline/layout.json` and `assets/gallery.json` (exhibit order, stops, wings).
3. `blender -b -P pipeline/build_gallery2.py -- <sold> <out>` places the exhibits, bakes the hall, and writes one model per
   exhibit (`models/<sku>.glb`) plus `movables.json` (doors, drawers and light strips in hall coordinates). About two
   minutes with a GPU. Then `python pipeline/post_bake.py <out>/bake <out>/bake_post`.
4. Copy `models`, the post-processed `bake` and `movables.json` into `assets/`, then run `python scripts/build-gallery.py`.

Source scenes (2026-11-23): showroom designs under `Yukon Flooring Showroom/00 REVISED/` (Kichen 1v5, MasterBathv2,
GarageCabinetv2, Coffee Bar Area), the mudroom under `HoustonShow2026/BoothPlanV3/Mudroom`, and the two client designs in
`C:\yudezign-mrs-lab` (tg-office, tg-reception).

## The two viewers

- `index.html` + `main.js`: the hall. It loads one model per exhibit. Select a door or drawer to open it, or use "Open doors
  and drawers" on the exhibit's card. The Lighting panel dims the hall and sets its warmth, and switches, dims and sets the
  colour (2700 K to 6000 K) of the cabinet lights.
- `exhibit.html` + `exhibit.js`: one exhibit on its own, for a service page (`/gallery/exhibit.html?sku=<sku>`). Drag to
  turn it, open doors and drawers, and set the room and cabinet lighting. Nothing is baked there, so every control applies.
  A service shows its exhibit when it has an `exhibit` entry in `src/data/services.ts`.
- **Change finish** (exhibit viewer): shows the door and drawer fronts in any of the 20 standard colours, using the site's
  own swatch images (`site.json`). It recolours materials named "Door face ..." / "Drawer face ..." only; the pipeline
  keeps those apart from the carcass, and fronts named "Glass front" / "Fixed front" are left alone. Not in the hall yet.
- **Part colours** (exhibit viewer): a design is divided into parts, one per as-built board finish (body, fronts, slat wall, desktop...), and a finish used both above and below 1.1 m is divided into Upper and Lower (fixed fronts come merged into one mesh, so `exhibit.js` divides a spanning mesh board by board). The Finish panel shows a chip per part with its as-built picture; picking one flashes that part on the model, and the next swatch colours only it. Up to six parts get a chip (the largest); small trims follow All. Chrome rods, the hamper and the slat wall are never recoloured. Check link: `?part=<n>:<name>` (repeatable).
- **Customize this design** (hall): a card link to the service page that shows the same exhibit (`PAGE` in `main.js`; `scripts/build-gallery.py` fails if it disagrees with `src/data/services.ts`). The page scrolls to `#exhibit-3d` and opens the viewer's Finish panel.
- Check links: `?finish=<name>` and `?view=<turn>,<tilt>,<distance>` in the exhibit viewer; `?stop=<n>` jumps to a stop, `?open` opens everything, `?led=<on>,<level>,<kelvin>` sets the cabinet lights.

## Done 2026-11-23

- Doors, flaps and drawers open on all seven exhibits (92 moving parts). Cabinet lights on the kitchen and the coffee bar.
- The island kitchen is out; the showroom garage cabinet is in.
- Service pages for kitchens, vanities, home office, garage and laundry / mudroom show their exhibit in 3D.
- Every public page uses the gallery style (`GalleryLayout`), with the full menu and footer. Only `/classic` keeps the old one.
- The Areas Served links in the Resources panel are on.

## Still to do

- **Showroom closet.** In the hall as `showroom-closet` (2026-11-24). The showroom closet exists only as a KD Lite drawing, so
  it was rebuilt as a Yukon scene in the design lab (`C:/yudezign-mrs-lab/showroom-closet`, its README lists what is a
  stand-in). The hall uses the `--hall` build (SC1h: the L without the dresser, which would stand with its back to
  visitors); SC1 is the whole room.
- **Closets.** The sold walk-in master closet is in (`master-closet`, exported from the scene submitted to the factory, in the
  job's `Master Closet/To Submit` folder). It is a whole room, so it is built with `hall=False` in `layout_v2.py`: it gets a
  model for the Closet Systems page (`exhibit.html?sku=master-closet&room`, viewed from inside) and does not stand in the hall.
  Still to do: the Yukon showroom closet (`00 REVISED/New Closet`, PDF only, needs rebuilding in Yukon with the design lab),
  and deciding whether a closet stands in the hall.
- **Props** (bowls, towels, books, garments and so on): not started.
- **Stocked RTA page:** photos and finishes only for now; a 3D RTA kitchen is undecided.
- The entertainment-centre service has no exhibit.
- Still to verify on the live site: a real quote submission, and the phone experience.
