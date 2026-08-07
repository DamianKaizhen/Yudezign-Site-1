/**
 * Sales portal content model.
 *
 * IMPORTANT — this file must stay dependency-free: no `process`, no `node:*`, no
 * `@vercel/node`. `src/types/salesPortal.ts` re-exports these types, and
 * `tsconfig.app.json` compiles `src` with only `vite/client` types, so anything
 * node-flavoured that leaks in here breaks the front-end build.
 *
 * Two repo constraints worth knowing before editing:
 *   - `erasableSyntaxOnly` is on, so no `enum`. Use string unions.
 *   - `verbatimModuleSyntax` is on, so every type import must be `import type`.
 */

export type AnswerStatus = 'ruled' | 'provisional' | 'blocked';
export type PortalRole = 'rep' | 'manager';

export type LinkKind = 'video' | 'doc' | 'drive' | 'app' | 'site' | 'portal';

export interface ContentLink {
  label: string;
  href: string;
  kind: LinkKind;
  /** Short note rendered under the label — what it is, or what to watch for. */
  note?: string;
  /** Videos only. Shown as a badge so a rep knows what they're starting. */
  duration?: string;
  /** Renders a warning treatment. Used for the video that shows what we DON'T do. */
  caution?: string;
}

export interface AnswerKeySection {
  /** Stable slug used in the URL: /sales/answers?s=money */
  id: string;
  /** Section number in ANSWER-KEY.md, 1-11. */
  number: number;
  title: string;
  blurb?: string;
}

export interface AnswerKeyEntry {
  /** Stable id — anchor target, search key, and cross-reference handle. */
  id: string;
  sectionId: string;
  question: string;
  /**
   * The sanctioned answer. When status is 'blocked' this is the deflection and
   * it is said word for word — the UI renders it as such.
   */
  answer: string;
  status: AnswerStatus;
  /** Required when status is 'provisional'. ISO date; the UI auto-expires it. */
  expiresOn?: string;
  /** Where the ruling came from, so a rep can see it isn't invented. */
  source?: string;
  /** Ids of NeverSayEntry rows this answer is guarding against (the [NS] tags). */
  neverSayIds?: string[];
  /** Alternate phrasings a customer might use. Feeds search; never rendered. */
  aliases?: string[];
  links?: ContentLink[];
  /** Coaching for the rep. Explicitly NOT said to the customer. */
  repNote?: string;
}

export interface NeverSayEntry {
  id: string;
  neverSay: string;
  sayInstead: string;
  why?: string;
}

export type PitchAudience = 'core' | 'builder' | 'contractor' | 'homeowner' | 'commercial';

export interface Pitch {
  id: string;
  label: string;
  audience: PitchAudience;
  timing?: string;
  /** One string per beat, so it reads as a script rather than a paragraph. */
  script: string[];
  /** The question it ends on. A pitch that ends on a full stop ends the conversation. */
  endsOn: string;
}

export interface Objection {
  id: string;
  objection: string;
  response: string[];
  /**
   * True when the objection is bait for a never-say answer (lead time, deposit,
   * warranty). The UI flags these — they are where reps get caught.
   */
  isBait?: boolean;
  answerKeyIds?: string[];
  neverSayIds?: string[];
  coaching?: string;
}

export interface QualifyingQuestion {
  id: string;
  question: string;
  why: string;
  listenFor?: string[];
}

export interface ProductLine {
  id: string;
  name: string;
  positioning: string;
  doors: string;
  hinge: string;
  slide: string;
  bestFor: string[];
}

export interface DimensionRow {
  id: string;
  cabinet: string;
  depth: string;
  height: string;
  widths: string;
  note?: string;
}

export interface SopStage {
  id: string;
  order: number;
  name: string;
  /** System object and status, e.g. "Lead · CLT-#### · Lead". */
  systemObject: string;
  owner: string;
  /** The gate. You cannot leave the stage until this is true. */
  exitCriteria: string;
  steps?: string[];
  handoff?: {
    label: string;
    to: string;
    deliverable: string;
  };
}

export interface KpiTarget {
  id: string;
  metric: string;
  target: string;
  capturedIn: string;
  /** Reps trust numbers whose arithmetic is visible. Show the derivation. */
  derivation?: string;
}

export interface BoothSlot {
  id: string;
  /** ISO date, so the UI can highlight today without parsing prose. */
  day?: string;
  when: string;
  what: string;
  who?: string;
  detail?: string[];
}

export interface FollowUpStep {
  id: string;
  dueWithin: string;
  channel: 'email' | 'sms' | 'call' | 'crm' | 'task';
  action: string;
  owner?: string;
  /** Copy-able message body, rendered with a copy button. */
  template?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
}

/**
 * Escape hatch for genuinely narrative passages — strategy, "what we're not
 * teaching you and why". Plain paragraphs and bullets, no markdown: rendering
 * markdown would mean shipping a parser, and searching rendered prose returns
 * "this page contains your word" instead of the answer.
 */
export interface PortalDoc {
  id: string;
  title: string;
  summary?: string;
  sections: Array<{
    heading?: string;
    paragraphs?: string[];
    bullets?: string[];
    /** Rendered as a pull-quote. Used for the rules that must not get lost. */
    callout?: string;
  }>;
}

export interface BoothContent {
  eventName: string;
  venue: string;
  startsOn: string;
  endsOn: string;
  /** The arithmetic that sets the pace. Rendered at the top of the tab. */
  premise: string;
  leadTarget: string;
  runOfShow: BoothSlot[];
  roles: PortalDoc;
  qualifying: ChecklistItem[];
  cardRules: ChecklistItem[];
  packList: ChecklistItem[];
  followUp: FollowUpStep[];
  nurture: FollowUpStep[];
  dispositions: ChecklistItem[];
}

export interface LibraryContent {
  /** The canon rule about third-party videos. Lives here, not in the UI. */
  warning: string;
  videos: ContentLink[];
  documents: ContentLink[];
  siteLinks: ContentLink[];
}

export interface BuyerProfile {
  id: string;
  buyer: string;
  caresAbout: string;
  /** The sentence to open with for this buyer. */
  leadWith: string;
  doesNotCareAbout: string;
}

export interface BulkLane {
  id: string;
  rank: number;
  category: string;
  valuePerWin: string;
  why: string;
}

export interface StrategyContent {
  whatWeAre: PortalDoc;
  lanes: Array<{ id: string; lane: string; who: string; typicalSize: string; note?: string }>;
  anchors: Array<{ id: string; label: string; value: string; caution?: string }>;
  targetMix: string;
  targetMixWhy: string;
  bulkLanes: BulkLane[];
  skipped: string;
  territory: string;
  buyers: BuyerProfile[];
  leadSources: Array<{ id: string; source: string; whatsThere: string; state: string }>;
  constraint: PortalDoc;
  crossSell: PortalDoc;
  notDoing: PortalDoc;
  sixMonths: string;
}

export interface RepContent {
  version: string;
  /** "If a number disagrees with the Answer Key, the Answer Key wins." */
  canonRule: string;
  /** "You are never penalised for saying let me confirm..." */
  safetyRule: string;
  opener: string;
  openerNote: string;
  pitchRule: string;
  objectionRule: string;
  weBuild: string[];
  weDoNotBuild: string[];
  shakerDisclosure: { heading: string; say: string; why: string };
  alwaysSay: Array<{ when: string; say: string; why: string }>;
  handOuts: Array<{ who: string; give: string }>;
  handOutRule: string;
  statusLegend: Array<{ status: AnswerStatus; meaning: string; whatYouDo: string }>;
  routing: Array<{ questionType: string; comesFrom: string; howYouRouteIt: string }>;
  answerKeySections: AnswerKeySection[];
  answerKey: AnswerKeyEntry[];
  neverSay: NeverSayEntry[];
  pitches: Pitch[];
  objections: Objection[];
  qualifying: QualifyingQuestion[];
  productLines: ProductLine[];
  dimensions: DimensionRow[];
  strategy: StrategyContent;
  quoteRules: string[];
  escalation: Array<{ situation: string; who: string; howFast: string }>;
  sop: SopStage[];
  vocabulary: Array<{ oldTerm: string; sayNow: string }>;
  kpis: KpiTarget[];
  booth: BoothContent;
  library: LibraryContent;
  notes: PortalDoc[];
}

export interface ManagerContent {
  version: string;
  docs: PortalDoc[];
}

export interface PortalPayload {
  version: string;
  role: PortalRole;
  rep: RepContent;
  /** Present only when role === 'manager'. Absent, not undefined, for reps. */
  manager?: ManagerContent;
}

/** A flattened record for the search index. Built on the client from the payload. */
export interface SearchDoc {
  id: string;
  kind:
    | 'answer'
    | 'never-say'
    | 'objection'
    | 'pitch'
    | 'qualify'
    | 'product'
    | 'dimension'
    | 'sop'
    | 'kpi'
    | 'booth'
    | 'follow-up'
    | 'link'
    | 'note';
  title: string;
  body: string;
  /** Where to go, e.g. '/sales/answers?s=money#ak-05-01' */
  href: string;
  status?: AnswerStatus;
  kicker?: string;
}
