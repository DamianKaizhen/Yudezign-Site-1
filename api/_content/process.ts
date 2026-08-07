import type { KpiTarget, PortalDoc, SopStage } from './types.js';

/**
 * The machine — transcribed from 30_SOP/SALES-SOP.md and 40_TARGETS/KPI-AND-GOALS.md.
 *
 * Nine stages, four handoffs. Written from the company's existing operating SOP
 * with three deliberate changes: staff and vendor names replaced with roles,
 * every hard number replaced by a pointer at the Answer Key, and stage 9
 * reassigned from Operations to the rep (see H4 — that is where the second
 * order comes from, and Operations has no reason to ask for one).
 */

export const vocabularyRule =
  "We use the system's vocabulary, not our own. Outreach, Leads, Estimates, Sales Projects, Factory Projects. Two vocabularies is how a pipeline turns into fiction.";

export const sop: SopStage[] = [
  {
    id: 'sop-1',
    order: 1,
    name: 'Target',
    systemObject: 'Outreach',
    owner: 'Rep',
    exitCriteria: 'Contact attempted and logged',
    steps: [
      'Your work queue is Call-List-HOU-2026.xlsx, split between the two of you so you never double-dial a company.',
      'Three phone days, two field days.',
      'Every attempt gets logged with an outcome and a dated next action. A call you don\'t log didn\'t happen.',
      'Qualify out fast and kindly. Outside roughly ninety minutes of the plant, or under about $3,000, say so and move on.',
    ],
  },
  {
    id: 'sop-2',
    order: 2,
    name: 'Qualify',
    systemObject: 'Lead · CLT-#### · Lead',
    owner: 'Rep',
    exitCriteria: 'Fit, need, timeline and zip captured on a Discovery Sheet',
    steps: [
      'A conversation becomes a Lead when you can answer four things: is it a fit, is there a real need, when, and where.',
      "Create the client record — CLT-#### — while you're still in the car, not that evening. The follow-up clock starts from the conversation.",
      'Follow up every new lead within 24 hours, by phone, email or text. That standard is already in the company job description, and it is now measured.',
    ],
  },
  {
    id: 'sop-3',
    order: 3,
    name: 'Scope & measure',
    systemObject: 'Lead + appointment',
    owner: 'Rep (Design if complex)',
    exitCriteria: 'Complete dimension and photo package in the project folder',
    steps: [
      "Until you are measure-certified in week 3, you do not measure a customer's space alone.",
      'Wall-to-wall at 36″, corner to every opening, and trim-edge to trim-edge across each opening. Sum the parts and compare them to the whole — if they don\'t agree, one of them is wrong.',
      'Floor to ceiling, and the window heights that break the wall up. Ceiling height, and whether it changes across the room.',
      'Every service: water supply, drain, gas, outlets, switches, vents, and their heights off the floor.',
      'Photographs of everything, including the plumbing and electrical, uploaded to the project folder.',
      'Appliances and sink are not optional and they are not "to follow." Brand, model, actual dimensions, hinge side.',
      'If the client measures instead of us, they own the numbers and you say so, out loud and in writing.',
    ],
  },
  {
    id: 'sop-4',
    order: 4,
    name: 'Design & estimate',
    systemObject: 'Estimate · EST-#### / QUO-2026-#### · Quoted',
    owner: 'Quote & Design team',
    exitCriteria: 'A priced, versioned quote is back with the rep',
    steps: [
      'You hand over a complete packet and you get back a priced, versioned quote. What happens in between is the Quote & Design team\'s, not yours.',
      'A completed Discovery Sheet is the packet. You never write the same information twice.',
      'The completeness strip at the bottom of the sheet is the bounce list. If a box is unticked, the packet comes back, and the bounce counts against your first-pass acceptance rate.',
    ],
    handoff: {
      label: 'H1',
      to: 'Rep → Quote & Design team',
      deliverable:
        'The Quote Request Packet — a completed Discovery Sheet. The single highest-failure interface in the whole process.',
    },
  },
  {
    id: 'sop-5',
    order: 5,
    name: 'Present & negotiate',
    systemObject: 'Estimate versions',
    owner: 'Rep',
    exitCriteria: 'Client verbally accepts a named version number',
    steps: [
      'Present in person where you can. A rendering emailed cold gets skimmed; a rendering walked through gets approved.',
      'Say what is included and what is not — carcass colour, door finish, edge banding, shelf count, fillers, side panels — before they ask.',
      '"They\'re happy with it" is not an exit condition. Write the version number down.',
    ],
    handoff: {
      label: 'H2',
      to: 'Quote & Design team → Rep',
      deliverable:
        'A quote with a code and a version. You present that version — never a number from memory, never one you adjusted in the truck. Any revision creates a NEW version.',
    },
  },
  {
    id: 'sop-6',
    order: 6,
    name: 'Close',
    systemObject: 'Sales Project · SP-#### · Sold',
    owner: 'Rep + admin',
    exitCriteria: 'Signed, terms met, no open client decisions',
    steps: [
      'Design approved in writing, against a named version.',
      'Agreement signed.',
      'Payment terms met per the signed agreement.',
      'No open client decisions. No "they\'ll confirm the handle later." Later is a change order.',
      'Anything that moves after approval is documented before it is actioned — in writing, with price and schedule impact, and signed. Even when the customer confirmed it by text. Especially then.',
    ],
    handoff: {
      label: 'H3',
      to: 'Rep → Operations',
      deliverable: 'Four conditions, all four, no exceptions.',
    },
  },
  {
    id: 'sop-7',
    order: 7,
    name: 'Produce',
    systemObject: 'Factory Project · PRJ-2026-### · In Production',
    owner: 'Operations',
    exitCriteria: 'Final change lock confirmed with the client',
    steps: [
      "Stay out of the plant's way. Do not call the shop for a status. Ask Operations.",
      "Own the client's expectations. If something moves, the client hears it from you, early, with a new date — not from a driver on delivery day.",
      'Before you say any delivery date out loud on a job over 250 cabinets, get a plant load check. The plant runs about 500 cabinets a month.',
    ],
  },
  {
    id: 'sop-8',
    order: 8,
    name: 'Deliver & support',
    systemObject: 'Installed',
    owner: 'Operations',
    exitCriteria: 'Delivery confirmed, install-app link sent',
    steps: [
      'The client gets a link to InstallAssistant, our free iOS app. Every panel carries a QR sticker the app reads to show a 3D model of where that piece goes.',
      'Send the App Store link, or tell them to search the store for InstallAssistant. Any install-app URL you find in an archived SOP is out of date — do not pass it on.',
      'We provide install support. We do not install. "Installation coordinated" is the ceiling of what you promise.',
      'Damage or shortage is noted on the packing slip at delivery. Anything found later goes to orders@yudezign.com the same day.',
    ],
  },
  {
    id: 'sop-9',
    order: 9,
    name: 'Retain & grow',
    systemObject: 'Closed → new Outreach',
    owner: 'Rep',
    exitCriteria: '30-day check-in done, next opportunity logged',
    steps: [
      'At 30 days you call. Not email. Ask how it went, ask what you\'d fix, and ask what\'s next.',
      'Log the answer and set the next action. That call is also where your only real competitive intelligence comes from.',
    ],
    handoff: {
      label: 'H4',
      to: 'Split: Operations keeps logistics, the rep owns the relationship',
      deliverable:
        'Operations keeps damage, missing parts, the install-app link and install photos. The rep owns the 30-day check-in and the next opportunity. A builder who buys once is a transaction; a builder who buys twice is the entire strategy.',
    },
  },
];

export const whereThingsLive = [
  { what: 'Clients, estimates, quotes, projects, statuses', where: 'The ops system — the system of record' },
  { what: 'Drawings, photos, signed documents, quote files', where: 'The project folder on the Drive' },
  { what: 'Your activity counts', where: 'Weekly-Sales-Report-<REP>.xlsx, Friday' },
  { what: 'Answers to customer questions', where: 'The Answer Key' },
];

export const systemOfRecordRule =
  'A deal that is not in the system does not exist. It is not discussed at the Friday meeting, it does not appear in the pipeline, and it does not count toward your numbers.';

export const vocabulary = [
  { oldTerm: 'Inquiry / project start', sayNow: 'Outreach, then Lead' },
  { oldTerm: 'Sales Order, Quotation Log', sayNow: 'Estimate + Quote (QUO-2026-####)' },
  { oldTerm: 'Project Information Sheet', sayNow: 'Discovery Sheet' },
  { oldTerm: 'Submit to the SP Team / the vendor', sayNow: 'Hand off to Operations' },
  { oldTerm: 'Colfax', sayNow: 'The plant' },
  { oldTerm: 'Order in production', sayNow: 'Factory Project (PRJ-2026-###)' },
  { oldTerm: 'Job completed', sayNow: 'Installed, then Closed' },
];

export const archivedSopRule =
  'Anything in an archived SOP that states a lead time, a deposit percentage or a warranty length is superseded by the Answer Key, regardless of how official the old document looks.';

/** Per-rep leading indicators. The derivation is shown because reps trust numbers whose arithmetic is visible. */
export const kpis: KpiTarget[] = [
  {
    id: 'kpi-dials',
    metric: 'Dials',
    target: '125/wk in ramp → 150 from October',
    capturedIn: 'Weekly workbook',
    derivation: '3 phone days × 40 + 2 field days × 15',
  },
  {
    id: 'kpi-connects',
    metric: 'Decision-maker connects',
    target: '12/wk',
    capturedIn: 'Weekly workbook',
    derivation: '8–12% connect rate on cold B2B construction calling',
  },
  {
    id: 'kpi-touches',
    metric: 'In-person touches',
    target: '8/wk',
    capturedIn: 'Weekly workbook',
    derivation: '2 field days × 4 stops',
  },
  {
    id: 'kpi-accounts',
    metric: 'New accounts opened (CLT-####)',
    target: '2/wk',
    capturedIn: 'Ops system',
    derivation: 'Company standard: 30%+ of visits should open an account',
  },
  {
    id: 'kpi-followup',
    metric: 'Follow-up inside 24 hrs',
    target: '95% — no ramp allowance',
    capturedIn: 'Ops system timestamps',
    derivation: 'Already the written standard',
  },
  {
    id: 'kpi-appointments',
    metric: 'Discovery / measure appointments',
    target: '1/wk rising to 2',
    capturedIn: 'Ops system + calendar',
    derivation: '~50% of new accounts',
  },
  {
    id: 'kpi-estimates',
    metric: 'Standard estimates issued',
    target: '3/wk from September',
    capturedIn: 'Ops system',
  },
  {
    id: 'kpi-bulk',
    metric: 'Bulk estimates (≥10 cabinets or ≥5 units)',
    target: '2/mo Sept → 3/mo Oct–Nov',
    capturedIn: 'Ops system, flagged',
  },
  {
    id: 'kpi-firstpass',
    metric: 'Quote-request first-pass acceptance',
    target: 'Measured from week 1 → 80% by October',
    capturedIn: 'Quote-team bounce log',
  },
];

export const laggingIndicators = [
  {
    metric: 'Quote → sold conversion',
    target: '15–20% through Q3',
    note: 'Industry runs 25–35%; a new rep with no relationships does not start there',
  },
  { metric: 'Dollars booked', target: 'See the monthly plan' },
  { metric: 'Cabinets booked', target: 'Against the 500/month ceiling' },
  {
    metric: 'Average order value anchors',
    target: '~$2,600 single vanity · ~$6K one-off kitchen · $31,880 custom home · $180/cabinet at volume',
  },
  { metric: 'Second order rate', target: 'Quarterly — reads zero until Q4' },
];

export const monthlyPlan = [
  { month: 'August', target: 'Counts toward Aug + Sept combined. Activity only.' },
  { month: 'September', target: '$100K across August and September combined' },
  { month: 'October', target: '$100K plus at least one signed builder or multi-family award' },
  { month: 'November', target: '$100K' },
  {
    month: 'December',
    target: 'Assume $100K, front-loaded — flagged for confirmation (~2.5 real selling weeks)',
  },
];

export const theCeiling = {
  heading: 'The ceiling',
  fact: 'The plant runs about 500 cabinets a month for standard, replicable work — 25 a day over 20 days.',
  implication:
    '$100K/month is roughly 300–405 cabinets, which is 60–80% of the entire plant. Blended value per cabinet is ~$247 at the 70/20/10 mix, ~$332 at the custom-heavy mix you will actually sell first.',
  rules: [
    'A Plant Load line is filled weekly by Operations and sits at the top of the Friday agenda.',
    'Anything over 250 cabinets gets a load check before you say a delivery date. Before the sentence, not after the quote.',
    'A 54-unit job is one and a half to two months of the entire factory. Selling more than we can build is worse than selling nothing.',
  ],
};

export const notMeasured = {
  heading: 'What is not measured, on purpose',
  items: ['Hours worked', 'Emails sent', 'Miles driven', 'CRM notes written'],
};

export const cadence = [
  {
    when: 'Daily standup, 10 minutes',
    what: 'Aug 13–28 only. Touches yesterday, appointments booked, quotes out.',
    note: 'A permanent daily standup for two people is theatre.',
  },
  { when: 'Friday, weekly', what: 'Five items. A deal that is not in the system is not discussed.' },
  { when: 'Monthly', what: 'Lagging review + work-log roll-up.' },
  { when: 'Quarterly', what: 'Re-baseline.' },
];

export const whatGoodLooksLike = [
  { when: 'End of week 1', what: 'Both reps booth-certified' },
  { when: 'End of August', what: 'Every show lead touched 3× and dispositioned, plus 12 site visits' },
  { when: 'End of September', what: '16 accounts, 24 estimates, 4 bulk quotes' },
  { when: 'End of October', what: 'At least one signed builder or multi-family award' },
  { when: 'End of November', what: 'A second order' },
  { when: 'End of December', what: 'Nothing open, 2027 list built' },
];

export const discoverySheet: PortalDoc = {
  id: 'discovery-sheet',
  title: 'The Discovery Sheet',
  summary:
    'One sheet, two sides. Intake on the front, a quarter-inch grid page on the back for the layout sketch. A completed sheet IS the quote-request packet — you never write the same information twice.',
  sections: [
    {
      heading: 'What goes on the front',
      bullets: [
        'Who — name, company, role, phone, email, job-site address, zip, and the segment tick (Builder, Contractor/GC, Designer, Homeowner, Commercial, Dealer)',
        'What — rooms, new build or remodel, units, timeline',
        'Specification — line, door style, exterior finish, interior carcass colour, edge band, opening method, hardware finish',
        'Size — the measurements',
        'Appliances, sink & services — brand, model, W×H×D, hinge side. Not optional, not "to follow"',
        'Delivery — flat-packed or assembled, delivery or pickup at the plant',
        'Qualify — budget per unit, who else says yes, who they buy from today and what they like about them',
        'What they actually asked for — in their words',
      ],
    },
    {
      heading: 'The back',
      paragraphs: [
        'A quarter-inch grid page with the measuring order and the sum-checks printed alongside it. Draw on the back — not in a margin, and not on a separate scrap that gets separated from the form.',
      ],
    },
    {
      heading: 'The completeness strip',
      paragraphs: [
        'The strip at the bottom is the bounce list. If a box is unticked, the packet comes back, and the bounce is counted against your first-pass acceptance rate.',
      ],
      callout:
        'That metric is not there to punish you — it is the earliest honest signal of whether a rep is going to make it, and it is far kinder to fix in week three than in month three.',
    },
  ],
};
