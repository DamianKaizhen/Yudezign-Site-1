// Builds public/sitemap.xml from the site's own route sources, so it cannot drift
// from the real routes. Runs first in `npm run build` (before the prerender step,
// which reads its URL list from the output).
//
//   node scripts/generate-sitemap.mjs
//
// Sources:
//   - static routes and hard-coded blog routes: <Route path="..."> in src/App.tsx
//   - /services/:slug   src/data/services.ts
//   - /locations/:slug  src/data/locations.ts
//   - /vs/:slug         src/data/comparisons.ts
//   - /blog/:slug       src/data/blogPosts.ts
//   - /portfolio/:category  the categoryInfo keys in src/pages/portfolio/CategoryPage.tsx
//
// lastmod is the last git commit date of the page's source file (the page
// component for a route with its own file; otherwise the data file behind it).
// With no usable git history (no .git, shallow clone, untracked file) it keeps
// the date already in the committed sitemap, or falls back to today.
//
// Excluded: /classic, /admin, /sales, /doc, /gallery (private, alternate or non-page).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.yudezign.com';
const outFile = join(root, 'public', 'sitemap.xml');
const read = (rel) => readFileSync(join(root, rel), 'utf8');
const today = new Date().toISOString().slice(0, 10);

const EXCLUDED = [/^\/classic(\/|$)/, /^\/admin(\/|$)/, /^\/sales(\/|$)/, /^\/doc(\/|$)/, /^\/gallery(\/|$)/];

/** Slugs from a data file: every `slug: '...'` property. */
function slugsFrom(rel) {
  const slugs = [...read(rel).matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((m) => m[1]);
  if (slugs.length === 0) throw new Error(`${rel}: no slugs found`);
  return [...new Set(slugs)];
}

/** Keys of the categoryInfo object in CategoryPage.tsx. */
function portfolioCategories() {
  const src = read('src/pages/portfolio/CategoryPage.tsx');
  const start = src.indexOf('const categoryInfo = {');
  const end = src.indexOf('\n};', start);
  if (start < 0 || end < 0) throw new Error('CategoryPage.tsx: categoryInfo not found');
  const keys = [...src.slice(start, end).matchAll(/^ {2}(\w+): \{/gm)].map((m) => m[1]);
  if (keys.length === 0) throw new Error('CategoryPage.tsx: no categories found');
  return keys;
}

/** import name -> file path (relative to repo root) for the components App.tsx imports. */
function importMap(app) {
  const map = {};
  const resolve = (spec) => {
    const base = join('src', spec);
    for (const ext of ['.tsx', '.ts', '/index.tsx']) {
      const rel = (base + ext).replace(/\\/g, '/');
      if (existsSync(join(root, rel))) return rel;
    }
    return null;
  };
  for (const m of app.matchAll(/^import (\w+) from '\.\/([^']+)';/gm)) map[m[1]] = resolve(m[2]);
  for (const m of app.matchAll(/const (\w+) = lazy\(\(\) => import\('\.\/([^']+)'\)\)/g)) map[m[1]] = resolve(m[2]);
  return map;
}

/** Routes in App.tsx with the page component each renders. */
function appRoutes() {
  // Drop JSX comments first so commented-out routes are ignored.
  const app = read('src/App.tsx').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  const imports = importMap(app);
  const routes = [];
  for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{([\s\S]*?)\}\s*\/>/g)) {
    const [, path, element] = m;
    const tags = [...element.matchAll(/<([A-Z]\w*)/g)].map((t) => t[1]);
    const comp = tags.find((t) => imports[t] && !/Layout$/.test(t));
    routes.push({ path, file: comp ? imports[comp] : null });
  }
  return routes;
}

// ---- git dates --------------------------------------------------------------
let gitOk = false;
try {
  const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: root, encoding: 'utf8' }).trim();
  gitOk = shallow === 'false';
} catch {
  gitOk = false;
}

function gitDate(rel) {
  if (!gitOk || !rel) return null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', rel], { cwd: root, encoding: 'utf8' }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

/** lastmod values already in the committed sitemap, used when git can't answer. */
const previous = new Map();
if (existsSync(outFile)) {
  const xml = readFileSync(outFile, 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) previous.set(m[1], m[2]);
}

function lastmod(loc, files) {
  const dates = files.map(gitDate).filter(Boolean).sort();
  if (dates.length) return dates[dates.length - 1];
  return previous.get(loc) || today;
}

// ---- collect URLs -----------------------------------------------------------
const entries = new Map(); // path -> { files, changefreq, priority }
const add = (path, files, changefreq, priority) => {
  if (EXCLUDED.some((re) => re.test(path))) return;
  const prev = entries.get(path);
  entries.set(path, {
    files: [...new Set([...(prev?.files || []), ...files.filter(Boolean)])],
    changefreq: prev?.changefreq || changefreq,
    priority: prev?.priority ?? priority,
  });
};

const DYNAMIC = {
  '/services/:slug': { data: 'src/data/services.ts', slugs: () => slugsFrom('src/data/services.ts'), prefix: '/services/', freq: 'monthly', pri: 0.9 },
  '/locations/:slug': { data: 'src/data/locations.ts', slugs: () => slugsFrom('src/data/locations.ts'), prefix: '/locations/', freq: 'monthly', pri: 0.8 },
  '/vs/:slug': { data: 'src/data/comparisons.ts', slugs: () => slugsFrom('src/data/comparisons.ts'), prefix: '/vs/', freq: 'monthly', pri: 0.7 },
  '/blog/:slug': { data: 'src/data/blogPosts.ts', slugs: () => slugsFrom('src/data/blogPosts.ts'), prefix: '/blog/', freq: 'monthly', pri: 0.7 },
  '/portfolio/:category': { data: 'src/pages/portfolio/CategoryPage.tsx', slugs: portfolioCategories, prefix: '/portfolio/', freq: 'weekly', pri: 0.8 },
};

const routes = appRoutes();
if (routes.length === 0) throw new Error('src/App.tsx: no routes parsed');
const hardCoded = new Map(routes.filter((r) => !r.path.includes(':') && !r.path.includes('*')).map((r) => [r.path, r.file]));

const STATIC_PRIORITY = {
  '/': ['weekly', 1.0],
  '/portfolio': ['weekly', 0.9],
  '/pricing': ['monthly', 0.9],
  '/finishes': ['monthly', 0.8],
  '/rta-cabinets': ['monthly', 0.8],
  '/contact': ['monthly', 0.8],
  '/about': ['monthly', 0.7],
  '/faq': ['monthly', 0.7],
  '/showroom': ['monthly', 0.7],
  '/visualizer': ['monthly', 0.7],
  '/kdlite': ['monthly', 0.6],
  '/downloads': ['monthly', 0.6],
  '/blog': ['weekly', 0.8],
  '/privacy': ['yearly', 0.3],
  '/terms': ['yearly', 0.3],
};

for (const route of routes) {
  if (route.path.includes('*')) continue;
  if (route.path.includes(':')) {
    const dyn = DYNAMIC[route.path];
    if (!dyn) {
      console.warn(`[sitemap] dynamic route ${route.path} has no data source mapped; not listed`);
      continue;
    }
    for (const slug of dyn.slugs()) {
      // A blog post with its own component (hard-coded route) is dated by that file.
      const own = hardCoded.get(dyn.prefix + slug);
      add(dyn.prefix + slug, own ? [own] : [dyn.data], dyn.freq, dyn.pri);
    }
  } else {
    const [freq, pri] = STATIC_PRIORITY[route.path] || ['monthly', 0.6];
    add(route.path, [route.file], freq, pri);
  }
}

// ---- write ------------------------------------------------------------------
// Home first, then alphabetical, so diffs stay readable.
const paths = [...entries.keys()].sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
const urls = paths.map((path) => {
  const e = entries.get(path);
  const loc = path === '/' ? `${SITE}/` : `${SITE}${path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod(loc, e.files)}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/generate-sitemap.mjs from src/App.tsx and src/data. Do not edit by hand. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
writeFileSync(outFile, xml, 'utf8');
console.log(`[sitemap] wrote ${paths.length} URLs to public/sitemap.xml (git dates: ${gitOk ? 'yes' : 'no, kept previous/today'})`);
