#!/usr/bin/env node
/**
 * Fails the build if sales portal content reached the client bundle.
 *
 * This is the web equivalent of 00_CANON/verify_copy.py, which greps the sales
 * pack for never-say phrases and fails the print run on a hit. Same idea,
 * different failure mode.
 *
 * The rule being enforced: NONE of the sales content — rep or manager — may be
 * in `dist/`. It is served per-role from /api/sales/content precisely so it
 * never reaches an unauthenticated browser. In a Vite SPA anything imported
 * from `src/` ends up in a chunk that any visitor can fetch and read, so a
 * single stray `import ... from '../../api/_content/answerKey'` would quietly
 * publish the lot. That import would look completely reasonable in review,
 * which is why this check exists rather than a convention.
 *
 * Run automatically as the last step of `npm run build`, or on its own with
 * `npm run verify:bundle`.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

/**
 * Distinctive strings from the sales content. A hit means content that should
 * only ever travel through the authenticated endpoint is sitting in a public
 * file.
 *
 * Chosen to be unique to the content and absent from ordinary marketing copy —
 * a canary that also appears on the public site would fire constantly and get
 * switched off, which is worse than no check at all.
 */
const CANARIES = [
  // Manager-only — the ones with real consequences. Kept in sync with
  // MANAGER_CANARIES in api/_content/manager.ts, which the unit test asserts
  // are genuinely present in the manager payload (a canary that guards nothing
  // passes forever and teaches you it is safe).
  { phrase: 'A decent program X% from revenue for whole team', tier: 'MANAGER' },
  { phrase: 'A rep with no written comp plan leaves', tier: 'MANAGER' },
  { phrase: 'Commission is earned on collection, not on signature', tier: 'MANAGER' },
  { phrase: 'over 120% base + full accelerator', tier: 'MANAGER' },
  { phrase: 'Which deal are you avoiding?', tier: 'MANAGER' },
  { phrase: 'Base salary figure, and whether it is the same for both reps', tier: 'MANAGER' },

  // Rep-facing, but still internal — pricing rules, quotas, scripts.
  //
  // A canary must be unique to the SERVED PAYLOAD. Two things disqualify one:
  //   - the portal's own UI chrome ("Never say" is a tab label, and belongs in
  //     the chunk), and
  //   - anything the public marketing site already says. "in as little as two
  //     weeks" was tried here and fired on the main bundle, because
  //     src/data/services.ts publishes that exact phrase. That is a real
  //     content conflict worth knowing about, but it is not a leak, and a
  //     canary that fires on it would get switched off.
  { phrase: 'Say the deflection, word for word', tier: 'REP' },
  { phrase: 'Trade pricing is set per account', tier: 'REP' },
  { phrase: 'Doing 14 townhomes off Westheimer', tier: 'REP' },
  { phrase: 'A call you don', tier: 'REP' }, // "...t log didn't happen" — apostrophe-safe
  { phrase: 'HBE2026-001', tier: 'REP' },
  { phrase: '$30 per base or wall cabinet', tier: 'REP' },
  { phrase: 'plant load check before you say a delivery date', tier: 'REP' },

  // Secrets that must never be inlined.
  { phrase: 'SALES_REP_PASSWORD', tier: 'SECRET' },
  { phrase: 'SALES_MANAGER_PASSWORD', tier: 'SECRET' },
  { phrase: 'SALES_JWT_SECRET', tier: 'SECRET' },
];

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }

  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (/\.(js|mjs|css|html|json|txt)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

let distExists = true;
try {
  statSync(dist);
} catch {
  distExists = false;
}

if (!distExists) {
  console.error('check-bundle-leak: dist/ not found. Run a build first.');
  process.exit(1);
}

const files = walk(dist);
const hits = [];

for (const file of files) {
  const contents = readFileSync(file, 'utf-8');
  for (const canary of CANARIES) {
    if (contents.includes(canary.phrase)) {
      hits.push({ file: file.slice(root.length + 1), ...canary });
    }
  }
}

// The prerender step must also never have produced a static /sales page.
const prerendered = files.filter((f) => /[/\\]dist[/\\]sales([/\\]|\.)/.test(f));

if (hits.length === 0 && prerendered.length === 0) {
  console.log(`check-bundle-leak: clean — scanned ${files.length} files in dist/`);
  process.exit(0);
}

console.error('\ncheck-bundle-leak: FAILED\n');

if (hits.length > 0) {
  console.error('Sales portal content found in the public bundle:\n');
  for (const hit of hits) {
    console.error(`  [${hit.tier}] ${hit.file}`);
    console.error(`      matched: "${hit.phrase}"`);
  }
  console.error(
    '\nSales content must not be imported from src/. It is served per-role by\n' +
      'api/sales/content.ts so it never reaches an unauthenticated browser.\n' +
      'Import TYPES from src/types/salesPortal.ts; never import content values.\n'
  );
}

if (prerendered.length > 0) {
  console.error('Prerendered output exists for the private /sales route:\n');
  for (const file of prerendered) console.error(`  ${file.slice(root.length + 1)}`);
  console.error('\nRemove /sales from public/sitemap.xml.\n');
}

process.exit(1);
