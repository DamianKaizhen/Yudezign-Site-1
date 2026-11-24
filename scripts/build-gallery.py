"""Publish the 3D gallery from mockups/gallery-3d into public/gallery.

Run after changing the gallery:  python scripts/build-gallery.py

Only the gallery's own files are copied (models, baked lighting, small wall
textures, thumbnails, data). Photos, videos and swatches are NOT duplicated:
their paths are rewritten to the copies the site already serves from
public/portfolio and public/swatches.
"""
import json
import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "mockups", "gallery-3d")
DST = os.path.join(ROOT, "public", "gallery")
PUB = os.path.join(ROOT, "public")


def site_path(p):
    """assets/... path in the mockup -> the path the live site serves, when it has that file already."""
    if not isinstance(p, str) or not p.startswith("assets/"):
        return p
    name = p.split("/")[-1]
    if p.startswith("assets/video/") and name.endswith(".mp4"):
        new = "/portfolio/videos/" + name
    elif p.startswith(("assets/video/", "assets/photos/")) or (p.startswith("assets/portfolio/") and "/thumbs/" not in p):
        new = "/portfolio/" + name
    elif p.startswith("assets/swatches/"):
        new = "/swatches/" + name
    else:
        return p
    if not os.path.exists(os.path.join(PUB, new.lstrip("/"))):
        raise SystemExit("missing on the site: " + new)
    return new


def rewrite(o):
    if isinstance(o, dict):
        return {k: rewrite(v) for k, v in o.items()}
    if isinstance(o, list):
        return [rewrite(v) for v in o]
    return site_path(o)


shutil.rmtree(DST, ignore_errors=True)
os.makedirs(os.path.join(DST, "assets"))
for sub in ("bake", "models", "photos-sm"):
    shutil.copytree(os.path.join(SRC, "assets", sub), os.path.join(DST, "assets", sub))
shutil.copy(os.path.join(SRC, "assets", "logo-wordmark-light.svg"), os.path.join(DST, "assets"))
shutil.copy(os.path.join(SRC, "style.css"), DST)
for name in ("gallery.json", "movables.json"):      # site.json comes from scripts/gallery-data.mjs
    data = json.load(open(os.path.join(SRC, "assets", name), encoding="utf-8"))
    json.dump(rewrite(data), open(os.path.join(DST, "assets", name), "w", encoding="utf-8"), separators=(",", ":"))

# Models, baked lighting and data keep their file names but are cached by browsers for a day (vercel.json). A model and
# the hinge data it goes with must arrive as a pair - an old model with new hinge data swings the wrong pieces - so
# every such address carries a stamp of the published assets, and a rebuild that changes any of them changes them all.
import hashlib
_h = hashlib.sha1()
for _d, _ds, _fs in os.walk(os.path.join(DST, "assets")):
    _ds.sort()
    for _f in sorted(_fs):
        _h.update(_f.encode())
        _h.update(open(os.path.join(_d, _f), "rb").read())
STAMP = _h.hexdigest()[:10]


def stamped(js, least):
    js, n = re.subn(r"(assets/[^'`\"]*?\.(?:glb|json|jpg))(['`])", r"\1?v=%s\2" % STAMP, js)
    if n < least:
        raise SystemExit("asset addresses changed: stamped %d, expected at least %d" % (n, least))
    return js


js = open(os.path.join(SRC, "main.js"), encoding="utf-8").read()
for a, b in (
    ("tex(f.src.replace('/photos/', '/photos-sm/'))", "tex('assets/photos-sm/' + f.src.split('/').pop())"),
    ("'assets/video/projects-montage.mp4'", "'/portfolio/videos/projects-montage.mp4'"),
    ("'assets/video/projects-montage-poster.jpg'", "'/portfolio/projects-montage-poster.jpg'"),
    ("""'<a href="#">See all projects</a>'""", """'<a href="/portfolio">See all projects</a>'"""),
    # quote links open the form panel; the href is the fallback if scripting fails
    ('href="#" data-panel="contact"', 'href="/contact" data-panel="contact"'),
):
    if a not in js:
        raise SystemExit("main.js changed, cannot find: " + a)
    js = js.replace(a, b)
open(os.path.join(DST, "main.js"), "w", encoding="utf-8", newline="\n").write(stamped(js, 6))

html = open(os.path.join(SRC, "index.html"), encoding="utf-8").read()
html = html.replace('<a class="brand" href="#"', '<a class="brand" href="/"')
html = html.replace('href="#"', 'href="/contact"')
# the page runs in a frame on the home route: links open in the main window, and only the home page is indexed
html = html.replace("<title>YuDeZign Gallery (3D mockup)</title>",
                    '<title>YuDeZign Gallery</title>\n  <meta name="robots" content="noindex">\n  <base href="/gallery/" target="_top">')
if "<base href" not in html or re.search(r'href="#"', html):
    raise SystemExit("index.html changed, link rewrite failed")
open(os.path.join(DST, "index.html"), "w", encoding="utf-8", newline="\n").write(html)

# the single-exhibit viewer the service pages frame: /gallery/exhibit.html?sku=<exhibit>
html = open(os.path.join(SRC, "exhibit.html"), encoding="utf-8").read()
mark = '<meta name="robots" content="noindex">'
if mark not in html:
    raise SystemExit("exhibit.html changed, cannot place its base address")
html = html.replace(mark, mark + '\n  <base href="/gallery/" target="_top">')
open(os.path.join(DST, "exhibit.html"), "w", encoding="utf-8", newline="\n").write(html)
js = open(os.path.join(SRC, "exhibit.js"), encoding="utf-8").read()
open(os.path.join(DST, "exhibit.js"), "w", encoding="utf-8", newline="\n").write(stamped(js, 3))

import subprocess
subprocess.run(["node", os.path.join(ROOT, "scripts", "gallery-data.mjs")], check=True)

size = sum(os.path.getsize(os.path.join(d, f)) for d, _, fs in os.walk(DST) for f in fs)
print("public/gallery written: %.1f MB in %d files" % (size / 1e6, sum(len(fs) for _, _, fs in os.walk(DST))))
