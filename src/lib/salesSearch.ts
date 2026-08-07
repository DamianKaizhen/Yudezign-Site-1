import type { RepContent, SearchDoc } from '../types/salesPortal';

/**
 * Search across the whole portal.
 *
 * This is the primary interaction, not a convenience. A rep at a booth being
 * asked "what's your deposit?" needs the sanctioned answer in one move, on a
 * phone, without knowing which tab it lives under. Navigation is the fallback.
 *
 * Deliberately dependency-free and dumb: tokenised substring matching with
 * field weighting. The corpus is a few hundred short records, so anything
 * cleverer would cost bundle size for no perceptible gain.
 */

const STATUS_LABEL = {
  ruled: 'RULED',
  provisional: 'PROVISIONAL',
  blocked: 'BLOCKED',
} as const;

export function buildSearchIndex(rep: RepContent): SearchDoc[] {
  const docs: SearchDoc[] = [];

  const sectionSlug = (sectionId: string) => {
    const section = rep.answerKeySections.find((s) => s.id === sectionId);
    return section ? section.id : sectionId;
  };

  for (const entry of rep.answerKey) {
    docs.push({
      id: entry.id,
      kind: 'answer',
      title: entry.question,
      // Aliases are indexed but never rendered — they exist so "how long" finds
      // the lead-time row.
      body: [entry.answer, entry.repNote, ...(entry.aliases ?? [])].filter(Boolean).join(' · '),
      href: `/sales/answers?s=${sectionSlug(entry.sectionId)}#${entry.id}`,
      status: entry.status,
      kicker: STATUS_LABEL[entry.status],
    });
  }

  for (const row of rep.neverSay) {
    docs.push({
      id: row.id,
      kind: 'never-say',
      title: `Never say: ${row.neverSay}`,
      body: [row.sayInstead, row.why].filter(Boolean).join(' · '),
      href: `/sales/pitch?t=never-say#${row.id}`,
      kicker: 'NEVER SAY',
    });
  }

  for (const objection of rep.objections) {
    docs.push({
      id: objection.id,
      kind: 'objection',
      title: objection.objection,
      body: [...objection.response, objection.coaching].filter(Boolean).join(' '),
      href: `/sales/pitch?t=objections#${objection.id}`,
      kicker: objection.isBait ? 'OBJECTION · never-say bait' : 'OBJECTION',
    });
  }

  for (const pitch of rep.pitches) {
    docs.push({
      id: pitch.id,
      kind: 'pitch',
      title: pitch.label,
      body: [...pitch.script, pitch.endsOn].join(' '),
      href: `/sales/pitch?t=pitch#${pitch.id}`,
      kicker: 'PITCH',
    });
  }

  for (const question of rep.qualifying) {
    docs.push({
      id: question.id,
      kind: 'qualify',
      title: question.question,
      body: [question.why, ...(question.listenFor ?? [])].join(' · '),
      href: `/sales/pitch?t=qualify#${question.id}`,
      kicker: 'ASK THIS',
    });
  }

  for (const line of rep.productLines) {
    docs.push({
      id: line.id,
      kind: 'product',
      title: line.name,
      body: [
        line.positioning,
        line.whereItFits,
        line.doors,
        `${line.collections} · ${line.decors} décors`,
        ...line.bestFor,
      ].join(' · '),
      href: `/sales/products?t=lines#${line.id}`,
      kicker: 'LINE',
    });
  }

  for (const row of rep.dimensions) {
    docs.push({
      id: row.id,
      kind: 'dimension',
      title: `${row.cabinet} — standard dimensions`,
      body: [
        `Depth ${row.depth}`,
        `Height ${row.height}`,
        `Widths ${row.widths}`,
        row.note,
        // The rows are titled "Kitchen base", "Wall", "Tall" — none of which is
        // the word a rep types. Without these, searching "dimensions" or "how
        // deep is a base cabinet" found nothing.
        'size sizes how deep how tall how wide measurement standard',
      ]
        .filter(Boolean)
        .join(' · '),
      href: `/sales/products?t=dimensions#${row.id}`,
      kicker: 'DIMENSION',
    });
  }

  for (const stage of rep.sop) {
    docs.push({
      id: stage.id,
      kind: 'sop',
      title: `${stage.order}. ${stage.name}`,
      body: [stage.systemObject, stage.owner, stage.exitCriteria, ...(stage.steps ?? [])].join(' · '),
      href: `/sales/process?t=sop#${stage.id}`,
      kicker: 'SOP',
    });
  }

  for (const kpi of rep.kpis) {
    docs.push({
      id: kpi.id,
      kind: 'kpi',
      title: kpi.metric,
      body: [kpi.target, kpi.capturedIn, kpi.derivation].filter(Boolean).join(' · '),
      href: `/sales/process?t=kpis#${kpi.id}`,
      kicker: 'TARGET',
    });
  }

  for (const rule of rep.booth.cardRules) {
    docs.push({
      id: rule.id,
      kind: 'booth',
      title: rule.label,
      body: rule.detail ?? '',
      href: `/sales/booth?t=table#${rule.id}`,
      kicker: 'BOOTH',
    });
  }

  for (const step of [...rep.booth.followUp, ...rep.booth.nurture]) {
    docs.push({
      id: step.id,
      kind: 'follow-up',
      title: `${step.dueWithin} — ${step.channel}`,
      body: [step.action, step.template].filter(Boolean).join(' '),
      href: `/sales/booth?t=followup#${step.id}`,
      kicker: 'FOLLOW-UP',
    });
  }

  // Sources are a primary reason to open this portal, so a search result lands
  // on the right sub-tab rather than the default one.
  // `?? []` is insurance, not decoration. useSalesContent now rejects a cached
  // payload missing any of these, but this index is the first thing to touch
  // the data and a crash here blanks the whole portal — it should degrade to a
  // thinner search instead.
  const linkGroups = [
    { tab: 'training', links: rep.library.training ?? [] },
    { tab: 'pack', links: rep.library.repPack ?? [] },
    { tab: 'videos', links: rep.library.videos ?? [] },
    { tab: 'documents', links: rep.library.documents ?? [] },
    { tab: 'site', links: rep.library.siteLinks ?? [] },
  ];
  for (const group of linkGroups) {
    for (const link of group.links) {
      docs.push({
        id: `link-${link.href}`,
        kind: 'link',
        title: link.label,
        body: [link.note, link.caution].filter(Boolean).join(' '),
        href: `/sales/library?t=${group.tab}`,
        kicker: link.kind.toUpperCase(),
      });
    }
  }

  for (const note of rep.notes) {
    const text = note.sections
      .flatMap((s) => [s.heading, s.callout, ...(s.paragraphs ?? []), ...(s.bullets ?? [])])
      .filter(Boolean)
      .join(' ');
    docs.push({
      id: note.id,
      kind: 'note',
      title: note.title,
      body: [note.summary, text].filter(Boolean).join(' '),
      href: `/sales/process?t=notes#${note.id}`,
      kicker: 'NOTE',
    });
  }

  // ── Everything the index used to miss ──────────────────────────────────
  // A rep searching "gola", "$350 delivery", "what's a closet made of" or
  // "who do I call about damage" found nothing, because those live outside the
  // handful of collections indexed above. Search only earns its place as the
  // primary way in if it reaches all of it.

  for (const rate of rep.pricing.rates) {
    docs.push({
      id: rate.id,
      kind: 'pricing',
      title: `${rate.room} — ${rate.semiCustom} semi-custom, ${rate.custom} custom`,
      body: [rate.note, 'ballpark price per linear foot cost how much'].filter(Boolean).join(' '),
      href: '/sales/pitch?t=pricing',
      kicker: 'PRICING',
    });
  }
  for (const example of rep.pricing.examples) {
    docs.push({
      id: example.id,
      kind: 'pricing',
      title: `${example.job} — ${example.semiCustom} to ${example.custom}`,
      body: `${example.lf} linear feet worked example ballpark`,
      href: '/sales/pitch?t=pricing',
      kicker: 'PRICING',
    });
  }
  for (const condition of rep.pricing.conditions) {
    docs.push({
      id: condition.id,
      kind: 'pricing',
      title: condition.label,
      body: `${condition.detail ?? ''} condition on every ballpark`,
      href: '/sales/pitch?t=pricing',
      kicker: 'PRICING',
    });
  }

  for (const opening of rep.openings) {
    docs.push({
      id: opening.id,
      kind: 'product',
      title: opening.name,
      body: [opening.what, opening.caution, 'opening handle door'].filter(Boolean).join(' '),
      href: `/sales/products?t=openings#${opening.id}`,
      kicker: 'OPENING',
    });
  }

  docs.push({
    id: 'closets-material',
    kind: 'product',
    title: 'What a closet is made of',
    body: [
      rep.closets.core,
      rep.closets.sayThis,
      rep.closets.plywoodOption,
      rep.closets.neverSay,
      rep.closets.overlay,
      rep.closets.ladder.join(' '),
    ].join(' '),
    href: '/sales/products?t=lines',
    kicker: 'CLOSETS',
  });

  docs.push({
    id: 'hardware-summary',
    kind: 'product',
    title: 'Hinges, slides and hardware partners',
    body: [
      rep.hardware.hinges,
      rep.hardware.slides,
      rep.hardware.softClose,
      rep.hardware.partners,
      rep.hardware.noLadder,
      rep.hardware.sixWay,
      rep.hardware.sixWayNote,
    ].join(' '),
    href: '/sales/products?t=lines',
    kicker: 'HARDWARE',
  });

  for (const row of rep.escalation) {
    docs.push({
      id: `esc-${row.situation.slice(0, 24)}`,
      kind: 'escalation',
      title: row.situation,
      body: `${row.who} — ${row.howFast}. escalate who do I tell`,
      href: '/sales/process?t=sop',
      kicker: 'ESCALATE',
    });
  }

  for (const row of rep.vocabulary) {
    docs.push({
      id: `vocab-${row.oldTerm.slice(0, 24)}`,
      kind: 'note',
      title: `${row.oldTerm} → ${row.sayNow}`,
      body: 'old term what we say now vocabulary',
      href: '/sales/process?t=sop',
      kicker: 'VOCABULARY',
    });
  }

  for (const buyer of rep.strategy.buyers) {
    docs.push({
      id: buyer.id,
      kind: 'note',
      title: `Selling to a ${buyer.buyer.toLowerCase()}`,
      body: `${buyer.caresAbout} ${buyer.leadWith} Does not care about ${buyer.doesNotCareAbout}`,
      href: `/sales/process?t=sell#${buyer.id}`,
      kicker: 'BUYER',
    });
  }

  for (const lane of rep.strategy.bulkLanes) {
    docs.push({
      id: lane.id,
      kind: 'note',
      title: `${lane.category} — ${lane.valuePerWin}`,
      body: `${lane.why} bulk lane rank ${lane.rank}`,
      href: `/sales/process?t=sell#${lane.id}`,
      kicker: 'BULK LANE',
    });
  }

  for (const item of [...rep.booth.packList, ...rep.booth.qualifying, ...rep.booth.dispositions]) {
    docs.push({
      id: item.id,
      kind: 'booth',
      title: item.label,
      body: item.detail ?? '',
      href: '/sales/booth?t=table',
      kicker: 'BOOTH',
    });
  }

  for (const slot of rep.booth.runOfShow) {
    docs.push({
      id: slot.id,
      kind: 'booth',
      title: `${slot.when} — ${slot.what}`,
      body: (slot.detail ?? []).join(' '),
      href: '/sales/booth?t=run',
      kicker: 'RUN OF SHOW',
    });
  }

  for (const item of rep.handOuts) {
    docs.push({
      id: `handout-${item.who.slice(0, 24)}`,
      kind: 'booth',
      title: `What to hand a ${item.who.toLowerCase()}`,
      body: item.give,
      href: '/sales/booth?t=table',
      kicker: 'HAND OUT',
    });
  }

  rep.quoteRules.forEach((rule, i) => {
    docs.push({
      id: `quote-rule-${i}`,
      kind: 'sop',
      title: `Quote rule ${i + 1}`,
      body: rule,
      href: '/sales/process?t=sop',
      kicker: 'QUOTING',
    });
  });

  for (const item of rep.alwaysSay) {
    docs.push({
      id: `always-${item.when.slice(0, 24)}`,
      kind: 'pitch',
      title: item.when,
      body: `${item.say} ${item.why}`,
      href: '/sales/pitch?t=pitch',
      kicker: 'ALWAYS SAY',
    });
  }

  return docs;
}

export interface SearchResult extends SearchDoc {
  score: number;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9$¾″%.-]+/i)
    .filter((token) => token.length > 1);
}

/**
 * Words a rep types that are not the words the documents use.
 *
 * Cheaper and more predictable than stemming, and it encodes the vocabulary gap
 * this pack actually has — the Answer Key says "deflection" where a rep thinks
 * "what do I say", and "ballpark" where they think "how much".
 */
const SYNONYMS: Record<string, string[]> = {
  price: ['pricing', 'cost', 'ballpark', 'quote', 'rate'],
  cost: ['price', 'pricing', 'ballpark', 'rate'],
  expensive: ['price', 'cost', 'objection'],
  hinge: ['hinges', 'dtc', 'hardware'],
  slide: ['slides', 'drawer', 'hardware'],
  warranty: ['guarantee', 'blocked'],
  deposit: ['terms', 'payment', 'blocked'],
  lead: ['leadtime', 'turnaround', 'weeks'],
  timeline: ['lead', 'turnaround', 'weeks'],
  material: ['materials', 'plywood', 'particleboard', 'mdf'],
  colour: ['color', 'finish', 'decor'],
  color: ['colour', 'finish', 'decor'],
  size: ['dimensions', 'sizes', 'depth', 'height', 'width'],
  install: ['installation', 'installer', 'fitting'],
  framed: ['face-frame', 'rta', 'stocked'],
  closet: ['closets', 'wardrobe', 'dressing'],
  delivery: ['deliver', 'shipping', 'freight'],
};

/** Bounded edit distance. Bails as soon as it exceeds what we would accept. */
function withinEditDistance(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let best = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost);
      best = Math.min(best, current[j]);
    }
    if (best > max) return false;
    previous = current;
  }
  return previous[b.length] <= max;
}

/** How many typos to forgive. Short words get none — too many false hits. */
function tolerance(token: string): number {
  if (token.length <= 3) return 0;
  if (token.length <= 6) return 1;
  return 2;
}

function fuzzyHit(words: string[], token: string): boolean {
  const max = tolerance(token);
  if (max === 0) return false;
  return words.some((word) => word.length > 2 && withinEditDistance(word, token, max));
}

/**
 * Rank by where the match landed, then forgive typos.
 *
 * Exact matches always outrank fuzzy ones, so a correctly-spelled query behaves
 * exactly as it did before — the tolerance only decides whether a near-miss
 * appears at all, never whether it beats a real hit. That ordering matters here
 * more than in most search: a rep is reading the top result out loud.
 */
export function searchPortal(index: SearchDoc[], query: string, limit = 40): SearchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) return [];

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const doc of index) {
    const title = doc.title.toLowerCase();
    const body = doc.body.toLowerCase();
    const haystack = `${title} ${body}`;
    // Fuzzy matching is scored against title and body separately. Pooling them
    // meant a near-miss anywhere in a long body outranked a near-miss in the
    // title — "delivary" surfaced the never-say list ahead of "What about
    // delivery?", because that row merely mentions the word.
    const titleWords = title.split(/[^a-z0-9]+/i).filter(Boolean);
    const bodyWords = body.split(/[^a-z0-9]+/i).filter(Boolean);

    let score = 0;
    let matchedAll = true;

    if (title.includes(trimmed)) score += 120;
    else if (body.includes(trimmed)) score += 30;

    for (const token of tokens) {
      if (title.startsWith(token)) score += 24;
      else if (title.includes(token)) score += 16;
      else if (fuzzyHit(titleWords, token)) score += 14;
      else if (body.includes(token)) score += 6;
      else if ((SYNONYMS[token] ?? []).some((alt) => haystack.includes(alt))) score += 5;
      else if (fuzzyHit(bodyWords, token)) score += 3;
      else {
        matchedAll = false;
        break;
      }
    }

    // Every token has to land somewhere, so a second word narrows rather than
    // widens the result set.
    if (!matchedAll || score === 0) continue;

    // A BLOCKED answer is the one a rep most needs to get right, and a
    // never-say is the one that costs most to get wrong.
    if (doc.status === 'blocked') score += 10;
    if (doc.kind === 'never-say') score += 6;
    if (doc.kind === 'answer') score += 4;

    results.push({ ...doc, score });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
