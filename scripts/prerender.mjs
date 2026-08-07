/**
 * Post-build prerender for the YuDeZign SPA.
 *
 * Renders each public route in headless Chrome and writes the fully-rendered
 * HTML (real content + the meta tags the SEO component injects) back into dist/,
 * so search engines get complete HTML without executing JavaScript. The page
 * still hydrates into the normal SPA for real visitors.
 *
 * Route list comes from public/sitemap.xml (single source of truth; admin paths
 * excluded). Rendering runs concurrently, drops network-idle waiting (which
 * stalled on analytics/embed requests), and blocks images/fonts/trackers that
 * don't affect the indexable HTML — cutting build time from ~10min to a couple.
 *
 * NON-FATAL: if Chromium can't launch, it logs a warning and exits 0 so the
 * plain SPA build still deploys.
 */
import { preview } from 'vite';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDir, '..');
const distDir = join(root, 'dist');
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 6);

// Resource types + hosts that don't affect the indexable HTML — blocked to speed
// up rendering and to avoid requests that never let the network go idle.
const BLOCK_TYPES = new Set(['image', 'media', 'font']);
const BLOCK_HOST =
  /google-analytics|googletagmanager|gtag|vercel-insights|vitals\.vercel|va\.vercel|speed-insights|fonts\.gstatic|fonts\.googleapis|doubleclick|hotjar|clarity\.ms|connect\.facebook|facebook\.net/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function routesFromSitemap() {
  const xml = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf-8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return [
    ...new Set(
      locs
        .map((u) => {
          try {
            return new URL(u).pathname;
          } catch {
            return null;
          }
        })
        .filter((p) => typeof p === 'string')
        .map((p) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p))
        // Private routes are never prerendered. Neither appears in sitemap.xml
        // today, so this is belt-and-braces against someone adding one.
        .filter((p) => !p.startsWith('/admin') && !p.startsWith('/sales'))
    ),
  ];
}

async function renderRoute(browser, base, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (BLOCK_TYPES.has(req.resourceType()) || BLOCK_HOST.test(req.url())) {
        req.abort().catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait until React has rendered real content into #root.
    await page.waitForFunction(
      () => {
        const el = document.getElementById('root');
        return !!el && el.children.length > 0 && (el.innerText || '').trim().length > 40;
      },
      { timeout: 15000 }
    );
    await sleep(300); // brief settle for entrance transitions

    const html = await page.content();
    const outFile =
      route === '/' ? join(distDir, 'index.html') : join(distDir, route, 'index.html');
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html, 'utf-8');
    return { route, ok: true };
  } catch (err) {
    return { route, ok: false, err: err?.message || String(err) };
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  if (!existsSync(distDir)) {
    console.warn('[prerender] dist/ missing — skipping (run vite build first).');
    return;
  }

  const routes = routesFromSitemap();
  console.log(`[prerender] ${routes.length} routes, concurrency ${CONCURRENCY}`);

  const server = await preview({ root, preview: { port: 0 } });
  const base = (server.resolvedUrls?.local?.[0] || '').replace(/\/$/, '');
  if (!base) {
    console.warn('[prerender] could not resolve preview URL — skipping.');
    await server.httpServer?.close?.();
    return;
  }

  let browser;
  try {
    const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || (await chromium.executablePath());
    browser = await puppeteer.launch({
      args: [...chromium.args, '--disable-dev-shm-usage'],
      executablePath,
      headless: chromium.headless,
    });
  } catch (err) {
    console.warn('[prerender] Chromium launch failed — keeping plain SPA build. Reason:');
    console.warn(err?.message || err);
    await server.httpServer?.close?.();
    return; // non-fatal
  }

  let idx = 0;
  let ok = 0;
  let failed = 0;
  const started = Date.now();

  async function worker() {
    while (idx < routes.length) {
      const route = routes[idx++];
      const res = await renderRoute(browser, base, route);
      if (res.ok) {
        ok++;
        console.log(`[prerender] ok   ${res.route}`);
      } else {
        failed++;
        console.warn(`[prerender] FAIL ${res.route} — ${res.err}`);
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, routes.length) }, () => worker())
  );

  await browser.close();
  await server.httpServer?.close?.();
  const secs = Math.round((Date.now() - started) / 1000);
  console.log(`[prerender] complete: ${ok} rendered, ${failed} failed in ${secs}s`);
}

main().catch((err) => {
  console.warn('[prerender] unexpected error — keeping plain SPA build:', err?.message || err);
  process.exit(0);
});
