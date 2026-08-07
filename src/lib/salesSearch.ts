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
      title: row.cabinet,
      body: [`Depth ${row.depth}`, `Height ${row.height}`, `Widths ${row.widths}`, row.note]
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
  const linkGroups = [
    { tab: 'training', links: rep.library.training },
    { tab: 'pack', links: rep.library.repPack },
    { tab: 'videos', links: rep.library.videos },
    { tab: 'documents', links: rep.library.documents },
    { tab: 'site', links: rep.library.siteLinks },
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
 * Rank by where the match landed. A title hit beats a body hit, and an exact
 * phrase in the title beats everything — "deposit" should surface the deposit
 * row above the four other places the word appears.
 */
export function searchPortal(index: SearchDoc[], query: string, limit = 30): SearchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) return [];

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const doc of index) {
    const title = doc.title.toLowerCase();
    const body = doc.body.toLowerCase();
    let score = 0;

    if (title.includes(trimmed)) score += 100;
    if (body.includes(trimmed)) score += 25;

    for (const token of tokens) {
      if (title.startsWith(token)) score += 20;
      else if (title.includes(token)) score += 12;
      if (body.includes(token)) score += 4;
    }

    // Require every token to appear somewhere, so a two-word query narrows
    // rather than widens.
    const matchesAll = tokens.every((token) => title.includes(token) || body.includes(token));
    if (!matchesAll || score === 0) continue;

    // A BLOCKED answer is the one a rep most needs to get right.
    if (doc.status === 'blocked') score += 8;

    results.push({ ...doc, score });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
