// Writes public/gallery/assets/site.json from the site's own data files, so the
// gallery's Portfolio and Finishes panels always show what the admin panel
// manages. The admin panel commits to src/data/*.ts, Vercel rebuilds, and this
// runs first in `npm run build`.
//
//   node scripts/gallery-data.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'gallery', 'assets', 'site.json');

/** Evaluate one exported array from a data file. They are plain object literals with a type annotation. */
function load(file, name) {
  let s = readFileSync(join(root, 'src', 'data', file), 'utf8');
  s = s.replace(/^import[^\n]*\n/gm, '');
  s = s.replace(new RegExp(`export const ${name}\\s*(:[^=]+)?=`), `module.exports.${name} =`);
  s = s.replace(/^export (const|default)[^\n]*$/gm, '').replace(/\bas const\b/g, '');
  const m = { exports: {} };
  new Function('module', s)(m);
  if (!Array.isArray(m.exports[name])) throw new Error(`${file}: could not read ${name}`);
  return m.exports[name];
}

const onSite = (p) => {
  if (!existsSync(join(root, 'public', p.replace(/^\//, '')))) throw new Error(`missing file for the gallery: ${p}`);
  return p;
};

const styles = load('finishStyles.ts', 'finishStyles')
  .filter((s) => s.visible !== false)
  .sort((a, b) => a.order - b.order)
  .map((s) => ({ id: s.id, name: s.name, description: s.description || '' }));

const finishes = load('finishes.ts', 'finishes')
  .filter((f) => styles.some((s) => s.id === f.styleId))
  .map((f) => ({ name: f.name, style: f.styleId, color: f.color, image: f.images?.[0] ? onSite(f.images[0]) : '', order: f.order }));

const projects = load('projects.ts', 'projects').map((p) => ({
  title: p.title,
  category: p.category,
  location: p.location || '',
  thumb: onSite(p.thumbnail || p.images[0]),
  images: (p.images || []).slice(0, 6).map(onSite),
  videos: (p.videos || []).slice(0, 1).map(onSite),
  description: p.description || '',
}));

const data = {
  finishes,
  styles,
  projects,
  services: [
    ['Kitchen Cabinets', 'Frameless kitchens built to your room, from a single run to a full remodel.', '/services/kitchen-cabinets'],
    ['Closet Systems', 'Walk-ins, reach-ins and wardrobes with drawers, hanging and shelving planned around what you own.', '/services/closet-systems'],
    ['Bathroom Vanities', 'Floating and floor-standing vanities, linen towers and mirrored storage.', '/services/bathroom-vanities'],
    ['Home Office', 'Desks, bookshelves and credenzas made to fit the wall they stand on.', '/services/home-office-cabinets'],
    ['Garage Cabinets', 'Hard-wearing storage for tools, sports gear and everything else.', '/services/garage-cabinets'],
    ['Stocked RTA Cabinets', 'Framed shaker lines in stock for fast-turn projects.', '/rta-cabinets'],
  ],
  about: {
    story: [
      'YuDeZign has built custom European frameless cabinets in Houston since 2019. We started from a simple observation: homeowners and contractors here deserved good European cabinetry without showroom markups.',
      'We build locally on a supply-only model, with 3/4" plywood construction as standard and lead times from as little as two weeks.',
    ],
    stats: [['2019', 'Serving Houston since'], ['2 wk', 'Lead time, from'], [String(finishes.length), 'Standard colors'], ['3/4"', 'Plywood, standard']],
    contact: { address: '13366 Murphy Rd, Stafford, TX 77477', phone: '(713) 502-0399', email: 'orders@yudezign.com', hours: 'Mon-Fri, 9:00 AM - 5:30 PM' },
  },
};

writeFileSync(out, JSON.stringify(data));
console.log(`gallery data: ${projects.length} projects, ${finishes.length} finishes in ${styles.length} styles -> public/gallery/assets/site.json`);
