#!/usr/bin/env python
"""Generate src/data/rtaCatalog.ts and public/rta/ from the RTA website package.

Source of record: the `website-package` folder of the RTA Cabinet Pricing project on the K: drive
(workbook YuDeZign_RTA_Website_Catalog.xlsx plus finishes/ and cabinets/ images). Rebuild that
package first when prices change:

    python "K:\\08 Subsidiaries\\0Claude Code Projects\\RTA Cabinet Pricing\\tools\\build_website_package.py"

then regenerate the site data (run from Windows, where K: is visible; the repo path may be the
WSL UNC path):

    python -I scripts/import-rta-catalog.py "K:/08 Subsidiaries/0Claude Code Projects/RTA Cabinet Pricing/website-package" .

Rules baked in here, from the website brief of 2026-11-04:
  * only YuDeZign's own YDS- item codes and retail prices are published; the script refuses to run
    if a vendor name, cost or list-price column shows up in the workbook;
  * the RTA finishes are a separate list from the made-to-measure palette;
  * images are copied into the repo (public/rta/), never linked to the K: drive.

Requires openpyxl (pip install openpyxl).
"""
import json
import os
import re
import shutil
import sys
from datetime import date

from openpyxl import load_workbook

FORBIDDEN = re.compile(r"artisan|vendor|wholesale|\bcost\b|list price|msrp|partner price", re.I)

LINES = [
    # id, sheet, name, blurb (from PARTNER-PRODUCT-GUIDE.md, customer-safe wording)
    ("shaker", "Shaker", "YuDeZign Shaker",
     "The full-range collection: a classic face-frame shaker door on a complete kitchen and vanity programme, "
     "with glass-door walls, corner solutions, pantries, oven cabinets and a full set of panels and mouldings, in eleven finishes."),
    ("slim", "Slim", "YuDeZign Slim",
     "A narrow-rail shaker for a cleaner, more contemporary look. The same cabinet sizes as Shaker for walls, bases, "
     "pantries and vanities, with its own crown profiles, in five finishes."),
    ("contract", "Contract", "YuDeZign Contract",
     "A simple face-frame shaker for trade, rental and multi-unit work: bases, walls, pantries, vanities and "
     "ADA-height cabinets in three finishes."),
]

# Category -> page section. Order of SECTIONS is the order on the page.
SECTIONS = ["Base Cabinets", "Wall Cabinets", "Tall Cabinets", "Vanities", "Panels & Fillers", "Mouldings", "Accessories"]


SECTION_OF = {
    "Base Cabinets": [
        "Standard Base Cabinets", "Drawer Bases", "Sink Bases", "Corner Sink Bases", "Corner Sink Fronts",
        "Farm Sink Bases", "Blind Corner Bases", "Easy Reach Bases", "Full Height Bases", "Microwave Bases",
        "Spice Pull-out Bases", "Base Spice Drawers", "Tray Bases", "Waste Bin Bases", "Base End Cabinets",
        "Base End Shelves",
    ],
    "Wall Cabinets": [
        "Standard Wall Cabinets", "Glass Door Wall Cabinets", "Refrigerator Wall Cabinets", "Wall Cabinets with Drawer",
        "Wall Blind Corner", "Wall Diagonal Corner", "Wall Easy Reach", "Wall Angle Cabinets", "Wall Microwave Cabinets",
        "Wall End Shelves", "Wall Plate Racks", "Wall Spice Drawers", "Wall Wine Racks",
    ],
    "Tall Cabinets": ["Utility / Pantry Cabinets", "Oven Cabinets"],
    "Vanities": [
        "Vanity Sink Bases", "Vanity Sink Drawer Bases", "Vanity Offset Sink Bases", "Vanity Drawer Bases",
        "Vanity Bases", "Vanity Knee Drawers",
    ],
    "Panels & Fillers": [
        "Fillers", "Toe Kick", "Skins / Veneer Panels", "Finished Panels", "Decorative Door Panels",
        "Dishwasher Return Panels", "Refrigerator End Panels",
    ],
    "Mouldings": [
        "Crown Moulding", "Light Rail Moulding", "Scribe Moulding", "Shoe Moulding", "Batten Moulding",
        "Outside Corner Moulding", "Furniture Base Moulding", "Valances", "Corbels", "Decorative Legs",
    ],
    "Accessories": ["Roll-out Trays", "Trays", "Floating Shelves", "Stemware Holders", "Waste Bin", "Touch-up Kit"],
}
_CATEGORY_SECTION = {cat: sec for sec, cats in SECTION_OF.items() for cat in cats}


def section_for(category: str) -> str:
    try:
        return _CATEGORY_SECTION[category]
    except KeyError:
        raise SystemExit(f"no section for category {category!r}: add it to SECTION_OF") from None


def main(package: str, repo: str) -> None:
    wb_path = os.path.join(package, "YuDeZign_RTA_Website_Catalog.xlsx")
    wb = load_workbook(wb_path, read_only=True, data_only=True)

    readme = [r[0] for r in wb["README"].iter_rows(values_only=True) if r and r[0]]
    m = re.search(r"Built (\d{4}-\d{2}-\d{2}) from price list version (\d{4}-\d{2}-\d{2})", " ".join(readme))
    if not m:
        raise SystemExit("README sheet does not carry the build / price-list dates")
    built, price_list = m.group(1), m.group(2)
    tax = re.search(r"Sales tax \(([\d.]+)%\)", " ".join(readme))
    delivery = re.search(r"Delivery in Greater Houston is \$(\d+)", " ".join(readme))
    if not (tax and delivery):
        raise SystemExit("README sheet does not carry the tax rate / delivery charge")

    finishes_by_style: dict[str, list[dict]] = {}
    for row in list(wb["Finishes"].iter_rows(values_only=True))[1:]:
        style, name, fid, _d, _dr, door, drawer, notes = row
        if not fid:
            continue
        finishes_by_style.setdefault(style, []).append({
            "id": fid, "name": name,
            "door": "/rta/" + door.replace("\\", "/"),
            "drawer": "/rta/" + drawer.replace("\\", "/"),
            "lowRes": bool(notes and "low resolution" in notes.lower()),
            "_src": (door, drawer),
        })

    copied: set[str] = set()

    def copy_asset(rel: str) -> None:
        rel = rel.replace("\\", "/")
        if rel in copied:
            return
        src = os.path.join(package, rel)
        if not os.path.exists(src):
            raise SystemExit(f"missing image in package: {rel}")
        dst = os.path.join(repo, "public", "rta", rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(src, dst)
        copied.add(rel)

    lines_out = []
    total_cabinets = total_variations = 0
    for lid, sheet, lname, blurb in LINES:
        rows = list(wb[sheet].iter_rows(values_only=True))
        header = [str(h) for h in rows[0]]
        for h in header:
            if FORBIDDEN.search(h):
                raise SystemExit(f"refusing to publish column {h!r} from sheet {sheet}")
        price_cols = [(i, h[:-4].strip()) for i, h in enumerate(header) if h.endswith(" ($)") and h != "Assembly add-on ($)"]
        finishes = finishes_by_style[lname]
        if [n for _, n in price_cols] != [f["name"] for f in finishes]:
            raise SystemExit(f"{sheet}: price columns do not match the Finishes sheet order")
        col = {h: i for i, h in enumerate(header)}
        cabinets = []
        categories: list[str] = []
        for r in rows[1:]:
            code = r[col["Item code"]]
            if not code:
                continue
            desc = str(r[col["Description"]]).strip()
            cat = str(r[col["Category"]]).strip()
            if FORBIDDEN.search(desc) or FORBIDDEN.search(cat):
                raise SystemExit(f"refusing to publish row {code}: {desc!r}")
            if cat not in categories:
                categories.append(cat)
            drawing = r[col["Drawing file"]]
            if drawing:
                copy_asset(drawing)
            prices = []
            for i, _ in price_cols:
                v = r[i]
                prices.append(round(float(v)) if isinstance(v, (int, float)) else None)
            cabinets.append({
                "code": code,
                "desc": desc,
                "category": cat,
                "section": section_for(cat),
                "w": r[col["W (in)"]], "h": r[col["H (in)"]], "d": r[col["D (in)"]],
                "doors": r[col["Doors"]], "drawers": r[col["Drawers"]],
                "canAssemble": r[col["Can ship assembled"]] == "Yes",
                "assembly": round(float(r[col["Assembly add-on ($)"]] or 0)),
                "prices": prices,
                "drawing": ("/rta/" + drawing.replace("\\", "/")) if drawing else None,
            })
            total_variations += sum(1 for p in prices if p is not None)
        total_cabinets += len(cabinets)
        for f in finishes:
            for rel in f.pop("_src"):
                copy_asset(rel)
        sections = [s for s in SECTIONS if any(c["section"] == s for c in cabinets)]
        lines_out.append({
            "id": lid, "name": lname, "blurb": blurb,
            "finishes": finishes, "sections": sections, "categories": categories, "cabinets": cabinets,
        })
        no_drawing = sum(1 for c in cabinets if not c["drawing"])
        print(f"{lname}: {len(cabinets)} cabinets, {len(finishes)} finishes, {len(categories)} categories, "
              f"{no_drawing} without a drawing, sections {sections}")
    wb.close()

    catalog = {
        "builtFrom": f"YuDeZign_RTA_Website_Catalog.xlsx built {built}",
        "priceListVersion": price_list,
        "generated": date.today().isoformat(),
        "salesTaxPct": float(tax.group(1)),
        "deliveryGreaterHouston": int(delivery.group(1)),
        "lines": lines_out,
    }
    body = json.dumps(catalog, ensure_ascii=False, separators=(",", ":"))
    ts = (
        "// GENERATED FILE - do not edit by hand.\n"
        "// Source: RTA Cabinet Pricing/website-package on the K: drive, via scripts/import-rta-catalog.py.\n"
        f"// {catalog['builtFrom']}; price list version {price_list}; generated {catalog['generated']}.\n"
        "// Prices are YuDeZign retail, before sales tax, delivery and other fees. Item codes are YuDeZign's own.\n"
        "import type { RtaCatalog } from '../types/rta';\n\n"
        f"export const rtaCatalog: RtaCatalog = {body};\n"
    )
    out = os.path.join(repo, "src", "data", "rtaCatalog.ts")
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(ts)
    print(f"wrote {out}: {len(ts)/1024:.0f} KB, {total_cabinets} cabinets, {total_variations} priced variations, "
          f"{len(copied)} images copied to public/rta/")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    main(sys.argv[1], sys.argv[2])
