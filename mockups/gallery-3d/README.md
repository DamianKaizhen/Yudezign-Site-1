# 3D gallery (home page)

The source of the site's home page gallery. Run python scripts/build-gallery.py to publish it to public/gallery.
node scripts/gallery-data.mjs (part of npm run build) fills its Portfolio and Finishes panels from src/data.

- index.html, style.css, main.js: the viewer (three.js, loaded from a CDN).
- assets/models, assets/bake, assets/photos-sm, assets/gallery.json: models, baked lighting, wall textures, layout.
- pipeline/: the Blender 5.3 scripts that place the exported Yukon designs in the hall, bake the lighting and
  export the models. They read design exports from a local work folder and are kept here for reference.

Rules: only real designs we have sold or built are shown, and no customer or street names appear on the page.
The folders assets/video, assets/photos, assets/portfolio, assets/swatches and assets/site.json are local only and
ignored by git; the published gallery uses the copies under public/.
