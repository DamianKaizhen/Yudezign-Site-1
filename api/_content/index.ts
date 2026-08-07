import type { PortalPayload, PortalRole, RepContent } from './types.js';
import {
  answerKey,
  answerKeySections,
  answerKeyVersion,
  canonRule,
  escalation,
  neverSay,
  quoteRules,
  routing,
  safetyRule,
  statusLegend,
  websiteConflicts,
} from './answerKey.js';
import {
  alwaysSay,
  objectionRule,
  objections,
  opener,
  openerNote,
  pitchRule,
  pitches,
  qualifying,
} from './talkTracks.js';
import {
  accessories,
  accessoriesNote,
  closetLines,
  dimensions,
  framedLine,
  hardwareFinishes,
  hardwareStatement,
  openings,
  productLines,
  sameBoxSentence,
  shakerDisclosure,
  weBuild,
  weDoNotBuild,
} from './product.js';
import { strategy } from './strategy.js';
import { kpis, sop, vocabulary, discoverySheet } from './process.js';
import { booth, handOutRule, handOuts } from './booth.js';
import { library } from './library.js';
import { managerContent } from './manager.js';

/**
 * Assembles the payload served by `GET /api/sales/content`.
 *
 * WHY THIS LIVES UNDER api/ AND NOT src/data/:
 * this is a Vite SPA with no code splitting on the public routes, so anything
 * imported from `src/` is downloaded by every visitor to yudezign.com and
 * readable with View Source. A password gate on the page would hide the UI, not
 * the data. Serving it per-role from a function is the only version that
 * actually restricts anything.
 *
 * KEEPING THIS IN SYNC: the editing source of record is still the K: drive at
 * `K:\08 Subsidiaries\0Claude Code Projects\YuDezignSales Strategy\`. Change a
 * ruling there first, log it in 90_MANAGER\CHANGE-LOG.md, then mirror it here
 * and bump CONTENT_VERSION so cached clients re-fetch.
 */

/**
 * Bump on every content change — clients revalidate against this and a stale
 * version would otherwise 304 and keep serving the old payload from cache.
 */
export const CONTENT_VERSION = '2026-08-07.5';

export const repContent: RepContent = {
  version: answerKeyVersion,
  canonRule,
  safetyRule,
  opener,
  openerNote,
  pitchRule,
  objectionRule,
  weBuild,
  weDoNotBuild,
  shakerDisclosure,
  alwaysSay,
  handOuts,
  handOutRule,
  statusLegend,
  routing,
  answerKeySections,
  answerKey,
  neverSay,
  pitches,
  objections,
  qualifying,
  productLines,
  sameBoxSentence,
  hardware: hardwareStatement,
  openings,
  hardwareFinishes,
  accessories,
  accessoriesNote,
  closets: closetLines,
  dimensions,
  strategy,
  quoteRules,
  escalation,
  sop,
  vocabulary,
  kpis,
  booth,
  library,
  notes: [
    // First in the list on purpose — this is the one a rep meets in the field
    // without warning.
    websiteConflicts,
    framedLine,
    strategy.whatWeAre,
    strategy.constraint,
    strategy.crossSell,
    strategy.notDoing,
    discoverySheet,
    booth.roles,
    {
      id: 'safety-rule',
      title: 'The rule that keeps you safe',
      sections: [{ callout: safetyRule }],
    },
  ],
};

export function buildPayload(role: PortalRole): PortalPayload {
  const payload: PortalPayload = {
    version: CONTENT_VERSION,
    role,
    rep: repContent,
  };

  // Managers get an extra key. Reps' payloads never touch managerContent at
  // all — the key is absent, not undefined, so it cannot be serialised in.
  if (role === 'manager') {
    payload.manager = managerContent;
  }

  return payload;
}
