/**
 * Post-build prerender for the YuDeZign SPA.
 *
 * Renders each public route in headless Chrome and writes the fully-rendered
 * HTML (real content + the meta tags the SEO component injects) back into dist/,
 * so search engines get complete HTML without executing JavaScript. The page
 * still hydrates into the normal SPA for real visitors.
 *
 * Route list is derived from public/sitemap.xml (single source of truth; admin
 * paths are excluded). This step is intentionally NON-FATAL: if Chromium can't
 * launch (e.g. missing libs in a CI image), it logs a warning and exits 0 so the
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

function routesFromSitemap() {
  const xml = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf-8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs
    .map((u) => {
      try {
        return new URL(u).pathname;
      } catch {
        return null;
      }
    })
    .filter((p) => typeof p === 'string')
    .map((p) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p))
    .filter((p) => !p.startsWith('/admin'));
  return [...new Set(paths)];
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!existsSync(distDir)) {
    console.warn('[prerender] dist/ missing — skipping (run vite build first).');
    return;
  }

  const routes = routesFromSitemap();
  console.log(`[prerender] ${routes.length} routes to render`);

  const server = await preview({ root, preview: { port: 0 } });
  const base = (server.resolvedUrls?.local?.[0] || '').replace(/\/$/, '');
  if (!base) {
    console.warn('[prerender] could not resolve preview URL — skipping.');
    await server.httpServer?.close?.();
    return;
  }
  console.log(`[prerender] serving dist at ${base}`);

  let browser;
  try {
    // @sparticuz/chromium ships a self-contained Chromium that runs in lib-less
    // Linux (Vercel/CI). PUPPETEER_EXECUTABLE_PATH overrides it with a local
    // Chrome for development if desired.
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

  let ok = 0;
  let failed = 0;
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`${base}${route}`, { waitUntil: 'networkidle2', timeout: 45000 });
      // Confirm React actually rendered content into #root.
      await page.waitForFunction(
        () => {
          const el = document.getElementById('root');
          return !!el && el.children.length > 0 && (el.innerText || '').trim().length > 40;
        },
        { timeout: 20000 }
      );
      await sleep(800); // let entrance animations settle
      const html = await page.content();
      const outFile =
        route === '/' ? join(distDir, 'index.html') : join(distDir, route, 'index.html');
      mkdirSync(dirname(outFile), { recursive: true });
      writeFileSync(outFile, html, 'utf-8');
      ok++;
      console.log(`[prerender] ok   ${route}`);
    } catch (err) {
      failed++;
      console.warn(`[prerender] FAIL ${route} — ${err?.message || err}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await server.httpServer?.close?.();
  console.log(`[prerender] complete: ${ok} rendered, ${failed} failed`);
}

main().catch((err) => {
  // Never fail the build over prerendering.
  console.warn('[prerender] unexpected error — keeping plain SPA build:', err?.message || err);
  process.exit(0);
});
