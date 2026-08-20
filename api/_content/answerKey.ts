import type { AnswerKeyEntry, AnswerKeySection, NeverSayEntry, PortalDoc } from './types.js';

/**
 * The Answer Key — transcribed from 00_CANON/ANSWER-KEY.md, v1.0 · 2026-08-05.
 *
 * This is the spine of the whole pack. Every other document cites it, and the
 * rule is absolute: if a number anywhere else disagrees with a row here, this
 * wins and the other document is stale.
 *
 * WHY IT EXISTS: the company's own source documents contradict each other on
 * every number a customer asks about — seven different production lead times,
 * five different deposit percentages, three different warranty lengths. A rep's
 * job is to say the sanctioned answer and nothing else.
 *
 * WHEN A RULING CHANGES: update K:\...\YuDezignSales Strategy\00_CANON\
 * ANSWER-KEY.md first — that stays the editing source of record — log it in
 * 90_MANAGER\CHANGE-LOG.md, bump the version in both places, then mirror the
 * change here and bump CONTENT_VERSION in ./index.ts.
 *
 * `answer` strings are verbatim. Do not paraphrase them to fit a layout.
 */

export const answerKeyVersion = 'Answer Key v1.4 · 2026-08-06';

export const canonRule =
  'This is the only document that settles what you say to a customer. If a number appears anywhere else in your pack — the field card, the SOP, the booth playbook — it came from here.';

export const safetyRule =
  'You are never penalised for saying "let me confirm that and come back to you today." You are penalised for guessing. A number you invent to sound confident is the one that ends up in a contract dispute.';

export const statusLegend: RepStatusLegend[] = [
  {
    status: 'ruled',
    meaning: 'Settled from an authoritative source.',
    whatYouDo: "Say it. It's live.",
  },
  {
    status: 'provisional',
    meaning:
      "The best-supported reading of the documents we have, adopted so you aren't stuck. Expires Sept 1, 2026 pending formal sign-off.",
    whatYouDo: 'Say it. Expect it to be re-confirmed.',
  },
  {
    status: 'blocked',
    meaning: 'Binds the company legally or financially and is not yet signed off.',
    whatYouDo: 'Say the deflection, word for word. Do not improvise.',
  },
];

type RepStatusLegend = { status: AnswerKeyEntry['status']; meaning: string; whatYouDo: string };

/**
 * Who decides what. Nobody expects a rep to hold every answer — what matters is
 * knowing where each one lives, so it routes in one move instead of a guess.
 */
export const routing = [
  {
    questionType: 'Product, construction, dimensions, finishes',
    comesFrom: 'The 2026 spec of record — already in this document',
    howYouRouteIt: "You answer it. That's what §2–4 are for",
  },
  {
    questionType: 'Price on a specific job',
    comesFrom: 'The quote team, as a versioned quote',
    howYouRouteIt: 'Submit a Discovery Sheet',
  },
  {
    questionType: 'Discounts, trade pricing, tier',
    comesFrom: 'Management — reps have no discount authority',
    howYouRouteIt: 'Route through the office, same day',
  },
  {
    questionType: 'Deposit, payment terms, warranty',
    comesFrom: 'The signed agreement, and it is being confirmed',
    howYouRouteIt: 'Deflect (§5, §7), then flag it to the office',
  },
  {
    questionType: 'Delivery dates on a large job',
    comesFrom: 'Operations — they hold the plant schedule',
    howYouRouteIt: 'Ask before you say a date out loud',
  },
  {
    questionType: 'Claims, damage, missing parts',
    comesFrom: 'orders@yudezign.com',
    howYouRouteIt: 'Email same day, copy the office',
  },
];

export const answerKeySections: AnswerKeySection[] = [
  {
    id: 'never-say',
    number: 1,
    title: 'The never-say list',
    blurb:
      'Read this out loud once. These are not style preferences — each one is a live commercial or legal exposure.',
  },
  {
    id: 'what-we-make',
    number: 2,
    title: 'What we make — and what we do not',
    blurb: 'Construction answers, plus the standard dimensions you memorise.',
  },
  { id: 'the-lines', number: 3, title: 'The four lines', blurb: 'Essential, Signature, Reserve, Atelier — and the closet ladder.' },
  { id: 'process', number: 4, title: 'Process and timing', blurb: 'Lead time, design fee, measuring, assembly, delivery, install.' },
  { id: 'money', number: 5, title: 'Money', blurb: 'Deposit, trade pricing, tiers, and what never leaves the building.' },
  { id: 'quoting', number: 6, title: 'Quoting', blurb: 'Your contract with the quote team. Four rules.' },
  { id: 'warranty', number: 7, title: 'Warranty and liability', blurb: 'Highest-priority deflections. Do not state a length to anyone.' },
  { id: 'who-we-are', number: 8, title: 'Who we are', blurb: 'The plant, the showroom, the group — and which address is which.' },
  { id: 'arguments', number: 9, title: 'The three arguments', blurb: 'Every line lifted from copy already approved and in print.' },
  { id: 'escalation', number: 10, title: 'Escalation', blurb: 'Who to tell, and how fast.' },
  { id: 'open-items', number: 11, title: 'Open items', blurb: 'The things that are still wrong, and what to say meanwhile.' },
];

/** §1 — the never-say list. */
export const neverSay: NeverSayEntry[] = [
  {
    id: 'ns-lead-time',
    neverSay:
      'Any production time in days or weeks — "seven to ten business days", "two to four weeks", "one week"',
    sayInstead: '"In as little as two weeks, depending on finish and scale."',
    why: 'Seven conflicting figures exist and both signed contracts disclaim delivery deadlines outright',
  },
  {
    id: 'ns-deposit',
    neverSay: 'Any deposit percentage',
    sayInstead: '"Terms come in writing with your agreement — I\'ll walk you through it."',
    why: 'Five different figures exist across live documents',
  },
  {
    id: 'ns-lifetime-warranty',
    neverSay: '"Lifetime warranty"',
    sayInstead: '"Your written warranty comes with your agreement."',
    why: 'Applies only to a series name we no longer sell',
  },
  {
    id: 'ns-we-install',
    neverSay: '"We install" / "installation included"',
    sayInstead: '"Install support" · "job-site delivery with installation coordinated"',
    why: 'Both contracts state we do not perform installation',
  },
  {
    id: 'ns-dealer-tier',
    neverSay: 'Any dealer tier, discount percentage or multiplier',
    sayInstead:
      '"Trade pricing is set per account — let me get an account opened for you and come back with your numbers."',
    why: 'Internal buy prices. Never leaves the building',
  },
  {
    id: 'ns-material-cost',
    neverSay: 'What a board or a sheet costs us',
    sayInstead: 'Nothing. Change the subject to value.',
    why: 'Never appears on any customer- or contractor-facing output',
  },
  {
    id: 'ns-metric-thickness',
    neverSay: '"19 mm"',
    sayInstead: '"Three-quarter-inch plywood"',
    why: 'US market speaks inches. Say ¾″ even when the flyer in your hand says 19 mm',
  },
  {
    id: 'ns-24-hour-quote',
    neverSay: '"3D design and quote in 24 hours"',
    sayInstead: '"I\'ll give you a date when I take your dimensions."',
    why: 'Source is a 2020 dealer deck; unconfirmed',
  },
  {
    id: 'ns-hardware-brand',
    neverSay:
      'Any hinge brand other than DTC — including "Hettich as standard" and "Blum on the upper lines"',
    sayInstead: '"DTC soft-close hinges, on every line."',
    why: 'Both have been printed in our own material and both are wrong. Corrected 2026-08-07: hinges are DTC across all four lines. If your handbook or field card says Blum, the card is stale',
  },
  {
    id: 'ns-solid-wood-shaker',
    neverSay: 'Solid wood shaker doors',
    sayInstead:
      '"Our shaker is machined from MDF — dimensionally stable, takes paint beautifully."',
    why: 'You must volunteer this. See §2',
  },
  {
    id: 'ns-unwon-job',
    neverSay: 'A job we have quoted but not won, named as a reference',
    sayInstead:
      'Name only delivered work. For scale, say "we quote multi-family packages up to fifty-plus units" — true, and it claims nothing',
    why: 'Buyers check references. One unwon job presented as won costs you the deal and the reputation',
  },
  {
    id: 'ns-competitor-claim',
    neverSay: 'Any competitor claim you have not personally verified',
    sayInstead: '"What do you like about working with them?" — then write the answer down',
    why: "We have no competitive intelligence. Don't invent it",
  },
  {
    id: 'ns-account-manager',
    neverSay: 'A named dedicated account manager',
    sayInstead: '"You\'ll have my direct number, and our order desk."',
    why: "We don't staff dedicated AMs",
  },
  {
    id: 'ns-other-brand',
    neverSay: '"Bluebonnet" on a YuDeZign job',
    sayInstead: 'Nothing — different company',
    why: 'Separate brand',
  },
  {
    id: 'ns-closet-plywood',
    neverSay: 'That a closet box is plywood, or "same materials as the kitchens"',
    sayInstead: '"Same plant, same standards, same hardware — different board."',
    why: 'Closets are primarily particleboard-cored panel. The old sentence was on the printed field card and implied a plywood closet carcass at no extra cost — a customer who ordered on that has a legitimate complaint. Only say plywood if that specific job was specified that way',
  },
  {
    id: 'ns-price-from-memory',
    neverSay: 'A price from memory — with one sanctioned exception',
    sayInstead:
      'The exception is the linear-foot ballpark: ranged, spoken, and said with the four conditions. Anything else is the quote team\'s versioned number, presented by its version.',
    why: 'Amended at v1.4. It used to read "never, ever" — and a rule you know to be wrong is a rule you stop trusting. A job price still never comes from memory',
  },
];

export const answerKey: AnswerKeyEntry[] = [
  // ── §2 What we make ───────────────────────────────────────────────────────
  {
    id: 'ak-02-01',
    sectionId: 'what-we-make',
    question: 'What kind of cabinets do you make?',
    answer:
      '"Frameless — European full-access. No face frame, so you get wider openings and more usable space in the same footprint."',
    status: 'ruled',
    source: 'product-lines.json shared_platform.construction; 2020 catalog p21',
    aliases: ['frameless', 'european', 'full access', 'what type of cabinet'],
  },
  {
    id: 'ak-02-02',
    sectionId: 'what-we-make',
    question: 'Do you make framed / face-frame cabinets?',
    answer:
      '"We manufacture frameless only." Then sell the reason: wider drawers, full-access interiors, one clean line wall to wall.',
    status: 'ruled',
    source: 'Internal product-study notes: "We only manufacture Frameless Cabinets"',
    aliases: ['face frame', 'framed', 'face-frame', 'make framed'],
    repNote:
      'Careful — this is about what we BUILD. We do sell a stocked framed line. See the next row rather than stopping at no.',
  },
  {
    id: 'ak-02-02b',
    sectionId: 'what-we-make',
    question: 'Do you sell framed cabinets?',
    answer:
      '"Yes — we carry a stocked RTA framed line. We don\'t build it, we stock it." Never lead with this.',
    status: 'ruled',
    source: 'Damian, 2026-08-06 (Answer Key v1.2)',
    aliases: ['sell framed', 'stock framed', 'rta', 'face frame available'],
    repNote:
      'Only three triggers justify raising it: they need cabinets now and cannot wait on a build, they specifically want a face-frame look, or the budget will not reach Essential. Outside those three, sell frameless.',
    links: [{ label: 'The framed line in full', href: '/sales/products?t=framed', kind: 'portal' }],
  },
  {
    id: 'ak-02-02c',
    sectionId: 'what-we-make',
    question: 'Who makes the framed cabinets, then?',
    answer:
      '"That\'s a stocked product we carry — our plant runs frameless, that\'s what we manufacture. I\'d rather you knew which is which."',
    status: 'ruled',
    source: 'Damian, 2026-08-06 — same disclosure discipline as the shaker rule',
    aliases: ['who makes framed', 'do you make it', 'stocked'],
    repNote: 'Volunteer this the moment framed comes up. Do not wait to be asked.',
  },
  {
    id: 'ak-02-02d',
    sectionId: 'what-we-make',
    question: 'What styles / finishes / sizes are in the framed line?',
    answer:
      '"We stock a range — let me check what\'s actually on the floor for what you need and come back to you today."',
    status: 'blocked',
    source: 'No stock sheet or price list exists yet. Route to the office',
    neverSayIds: ['ns-price-from-memory'],
    aliases: ['framed styles', 'framed finishes', 'framed sizes', 'framed price'],
    repNote: 'Never quote a style, finish, size or price for the framed line from memory.',
  },
  {
    id: 'ak-02-02e',
    sectionId: 'what-we-make',
    question: 'Is the framed line assembled?',
    answer:
      '"Your choice — flat-pack or assembled. It\'s priced differently either way, so tell me which and I\'ll get you the right number."',
    status: 'ruled',
    source: 'Damian, 2026-08-06',
    aliases: ['framed assembled', 'framed flat pack', 'rta assembled'],
  },
  {
    id: 'ak-02-02f',
    sectionId: 'what-we-make',
    question: "Isn't buying stock the thing you said competitors do?",
    answer:
      '"Fair question. The difference is we\'re not only a reseller — we manufacture, and the framed line is there so you\'re not stuck when a build doesn\'t fit your timeline. Everything we make, we make here."',
    status: 'ruled',
    source: 'Damian, 2026-08-06',
    aliases: ['reseller', 'hypocrite', 'you said competitors resell'],
  },
  {
    id: 'ak-02-03',
    sectionId: 'what-we-make',
    question: 'What door styles?',
    answer: '"Flat panel — slab — and shaker. Both in ¾″ material."',
    status: 'ruled',
    source: 'Study doc; Booklet p6',
    aliases: ['slab', 'flat panel', 'shaker', 'door style'],
  },
  {
    id: 'ak-02-04',
    sectionId: 'what-we-make',
    question: 'Do you do raised-panel or inset?',
    answer:
      '"No. Raised panel is a specialty build we don\'t run, and we don\'t do inset doors."',
    status: 'ruled',
    source: 'Study doc',
    aliases: ['raised panel', 'inset'],
  },
  {
    id: 'ak-02-05',
    sectionId: 'what-we-make',
    question: 'Are your shaker doors real wood?',
    answer:
      '"No — we machine ours out of a single piece of MDF. That\'s deliberate: MDF doesn\'t move with humidity, so the door won\'t warp or crack at the joints, and it takes paint better than wood does."',
    status: 'ruled',
    source: 'Study doc — "we need to be clear that we do not use real wood when we make shaker doors"',
    neverSayIds: ['ns-solid-wood-shaker'],
    aliases: ['solid wood', 'real wood', 'mdf', 'shaker'],
    repNote: 'You must volunteer this. Do not wait to be asked.',
  },
  {
    id: 'ak-02-06',
    sectionId: 'what-we-make',
    question: "What's the box made of?",
    answer:
      '"¾″ plywood. Backs and drawer bottoms are ¼″ plywood. If you want to take cost out, we can run the box in particleboard instead."',
    status: 'ruled',
    source: 'Study doc; shared_platform.box',
    neverSayIds: ['ns-metric-thickness'],
    aliases: ['plywood', 'carcass', 'particleboard', 'box material'],
  },
  {
    id: 'ak-02-07',
    sectionId: 'what-we-make',
    question: 'How is it held together?',
    answer:
      '"Cam-and-dowel — three-in-one connectors — so every joint pulls square and stays square. Wall cabinets hang on a French cleat, which is why they land dead level."',
    status: 'ruled',
    source: 'Booklet p7',
    aliases: ['joinery', 'cam and dowel', 'french cleat', 'assembly'],
  },
  {
    id: 'ak-02-08',
    sectionId: 'what-we-make',
    question: 'Soft close?',
    answer: '"Standard. Every door, every drawer. Not an upgrade."',
    status: 'ruled',
    source: 'shared_platform.soft_close; Booklet p7',
    aliases: ['soft close', 'softclose'],
  },
  {
    id: 'ak-02-09',
    sectionId: 'what-we-make',
    question: 'What overlay?',
    answer: '"Full overlay on kitchens and vanities. Half overlay on closets, so two units can share a panel."',
    status: 'ruled',
    source: 'Study doc',
    aliases: ['overlay', 'full overlay', 'half overlay'],
  },
  {
    id: 'ak-02-10',
    sectionId: 'what-we-make',
    question: 'How tall can one cabinet be?',
    answer:
      '"Ninety-six inches. Plywood comes in 4×8 sheets, so a taller box would need a sheet that doesn\'t exist. Above that we stack."',
    status: 'ruled',
    source: 'Study doc',
    aliases: ['height', 'tall', '96', 'ceiling'],
  },
  {
    id: 'ak-02-11',
    sectionId: 'what-we-make',
    question: 'Edge banding?',
    answer:
      '"One millimetre, colour-matched to the surface. It seals the core against moisture and it makes the panel read as one piece."',
    status: 'ruled',
    source: 'Showcase flyers; study doc',
    aliases: ['edge band', 'edgebanding', 'banding'],
  },
  {
    id: 'ak-02-12',
    sectionId: 'what-we-make',
    question: 'What rooms do you do?',
    answer:
      '"Kitchens, walk-in and reach-in closets, vanities including ADA, mudrooms, credenzas, coffee bars, laundry, offices, media walls — and multi-family and commercial casework."',
    status: 'ruled',
    source: 'yudezign.template.html "What We Build"',
    aliases: ['rooms', 'closets', 'vanities', 'mudroom', 'commercial', 'casework'],
  },

  // ── §3 The four lines ─────────────────────────────────────────────────────
  {
    id: 'ak-03-01',
    sectionId: 'the-lines',
    question: "What's the difference between the lines?",
    answer:
      '"Same box. Same motion. Different skin. The carcass is identical across all four lines — same frameless ¾″ plywood, same DTC soft-close hinge, same hundred-pound slide. What changes is the door surface and the finish family. So you can move up or down without giving up the cabinet."',
    status: 'ruled',
    source: 'Rewritten at v1.1 around the fact that the hardware does not ladder',
    aliases: ['lines', 'essential', 'signature', 'reserve', 'atelier', 'difference', 'tiers'],
    repNote:
      'The single most useful sentence you own. Note it no longer says "hardware brand" — that changes nothing between lines.',
    links: [{ label: 'The four lines', href: '/sales/products?t=lines', kind: 'portal' }],
  },
  {
    id: 'ak-03-02',
    sectionId: 'the-lines',
    question: 'What hardware?',
    answer:
      '"DTC soft-close hinges and Knape & Vogt 8450FM slides — the same on every line." Our partners are Häfele, Würth, DTC and Knape & Vogt.',
    status: 'ruled',
    source: 'Damian, 2026-08-06 (Answer Key v1.1). Supersedes the spec of record, which laddered the hardware',
    neverSayIds: ['ns-hardware-brand'],
    // "blum" stays in the aliases on purpose: a rep who half-remembers it from
    // the printed handbook must be able to search it and land on the correction.
    aliases: ['hardware', 'hinges', 'slides', 'blum', 'dtc', 'hafele', 'hettich', 'brand', 'kv', '8450'],
    repNote:
      'We do not use Blum, on any line. Both the hinge and the slide are identical across all four lines, so there is no hardware upgrade to sell. If you see Blum on a printed field card or in an older brochure, that material is stale.',
    links: [{ label: 'The four lines', href: '/sales/products?t=lines', kind: 'portal' }],
  },
  {
    id: 'ak-03-02b',
    sectionId: 'the-lines',
    question: 'Do the better lines get better hardware?',
    answer: '"No — and that\'s the point. Every line gets the same hinge and the same slide."',
    status: 'ruled',
    source: 'Damian, 2026-08-06',
    neverSayIds: ['ns-hardware-brand'],
    aliases: ['upgrade hardware', 'better hardware', 'ladder', 'upsell hardware'],
    repNote:
      'Do not offer a hardware upgrade; there is not one to sell. The old ladder implied Essential got worse hardware, which argued against the line that carries the volume work.',
  },
  {
    id: 'ak-03-02c',
    sectionId: 'the-lines',
    question: 'Anything special about the hinge?',
    answer:
      '"It\'s six-way adjustable — height, depth and side-to-side, both leaves. Your installer can true a door up on the wall without pulling it off the box."',
    status: 'provisional',
    expiresOn: '2026-09-01',
    source: "DTC's own product language; attach the frameless part number's spec sheet to confirm",
    aliases: ['six way', '6-way', 'adjustable', 'hinge adjustment', 'installer'],
    repNote:
      'Say this to every builder and every contractor — it is the one spec they feel on site. Nobody buys a cabinet for its hinge, but a builder who has lost a Friday to doors that will not line up on an out-of-square wall buys the next job on it.',
  },
  {
    id: 'ak-03-03',
    sectionId: 'the-lines',
    question: 'How good are the slides?',
    answer: '"Full-extension, soft-close, hundred-pound ball-bearing."',
    status: 'ruled',
    source: 'KV 8450FM, the one documented rating',
    aliases: ['slides', 'drawer slides', 'weight rating', '100 lb'],
  },
  {
    id: 'ak-03-08',
    sectionId: 'the-lines',
    question: 'What is a closet made of?',
    answer:
      '"Most of the closet system is particleboard-cored panel — the same core as our door panels. Some components are MDF."',
    status: 'ruled',
    source: 'Damian, 2026-08-06 (Answer Key v1.3)',
    neverSayIds: ['ns-closet-plywood'],
    aliases: ['closet material', 'closet made of', 'particleboard', 'closet core'],
    repNote: 'Say it plainly; it is normal for closet systems.',
  },
  {
    id: 'ak-03-09',
    sectionId: 'the-lines',
    question: 'Can I have a plywood closet?',
    answer:
      '"Yes — we custom-laminate plywood for that. It costs more and it adds lead time, so let\'s price it both ways."',
    status: 'ruled',
    source: 'Damian, 2026-08-06',
    neverSayIds: ['ns-closet-plywood'],
    aliases: ['plywood closet', 'closet plywood', 'upgrade closet'],
    repNote: 'Offer it as an option, never as the default.',
  },
  {
    id: 'ak-03-10',
    sectionId: 'the-lines',
    question: 'Is the closet the same as your kitchens?',
    answer: '"Same plant, same standards, same hardware — different board."',
    status: 'ruled',
    source: 'Damian, 2026-08-06. Retires "same materials as the kitchens"',
    neverSayIds: ['ns-closet-plywood'],
    aliases: ['closet same as kitchen', 'closet quality', 'cabinet grade'],
    repNote:
      'The kitchen box is ¾″ plywood and we sell hard on that. The closet system is not. The old sentence implied a plywood closet carcass at no extra cost — and it was on the printed field card.',
  },
  {
    id: 'ak-03-04',
    sectionId: 'the-lines',
    question: 'How many finishes?',
    answer:
      '"Over thirty." If they want a specific colour: "our library is much deeper than the brochure — tell me what you\'re matching and I\'ll check it."',
    status: 'ruled',
    source: '"30+" is the approved public number',
    aliases: ['finishes', 'colours', 'colors', 'how many'],
    links: [
      { label: 'The public finish library', href: '/finishes', kind: 'site', note: 'Where the booth QR points' },
    ],
  },
  {
    id: 'ak-03-05',
    sectionId: 'the-lines',
    question: 'What finish types?',
    answer: '"Melamine, laminate, acrylic, paint and RTF."',
    status: 'ruled',
    source: 'Study doc',
    aliases: ['melamine', 'laminate', 'acrylic', 'rtf', 'thermofoil'],
  },
  {
    id: 'ak-03-06',
    sectionId: 'the-lines',
    question: 'Hardware finishes?',
    answer: '"Brushed nickel, polished chrome, matte black."',
    status: 'ruled',
    aliases: ['nickel', 'chrome', 'matte black', 'handles'],
  },
  {
    id: 'ak-03-07',
    sectionId: 'the-lines',
    question: "Can you match a colour we've specified?",
    answer:
      '"Send it to me. We carry a deep stock library, and we can source outside it — that adds cost and time, so let\'s price both."',
    status: 'ruled',
    source: 'Study doc',
    aliases: ['colour match', 'color match', 'custom colour', 'custom color'],
  },

  // ── §4 Process and timing ─────────────────────────────────────────────────
  {
    id: 'ak-04-01',
    sectionId: 'process',
    question: 'How long does it take?',
    answer:
      '"Once the order is finalised, production runs in as little as two weeks, depending on finish and scale. Your quote carries the committed date — I won\'t guess at it."',
    status: 'ruled',
    source: 'The only approved hedge (Booklet p3/p7/p23)',
    neverSayIds: ['ns-lead-time'],
    aliases: ['lead time', 'how long', 'turnaround', 'when', 'production time', 'delivery time'],
    repNote:
      'Seven conflicting figures exist across the company and the contracts disclaim deadlines. This hedge is the whole answer — do not extend it.',
  },
  {
    id: 'ak-04-02',
    sectionId: 'process',
    question: 'What if they push for a date?',
    answer:
      '"I\'d rather give you a date I can hold than one that sounds good today. Let me confirm the schedule against your finish and come back to you."',
    status: 'ruled',
    neverSayIds: ['ns-lead-time'],
    aliases: ['push for a date', 'need it by'],
  },
  {
    id: 'ak-04-03',
    sectionId: 'process',
    question: "What's the process?",
    answer:
      '"Consult, measure, 3D design, you approve, we build, we deliver. Six steps, and you see a rendering before anything is cut."',
    status: 'ruled',
    source: 'Design Agreement §1–5',
    aliases: ['process', 'steps', 'how does it work'],
  },
  {
    id: 'ak-04-04',
    sectionId: 'process',
    question: 'Do you do the measuring?',
    answer:
      '"Yes — I come out and field-measure. Or if you\'d rather measure yourself, we have a guide and we\'ll work from your numbers."',
    status: 'ruled',
    source: 'MEASURE YOUR SPACE',
    aliases: ['measure', 'measuring', 'site visit'],
  },
  {
    id: 'ak-04-05',
    sectionId: 'process',
    question: 'What does design cost?',
    answer:
      '"$250 covers me coming out to measure plus two designs. If you give me your own measurements, it\'s $100. Either way it\'s credited back against your order when you go ahead."',
    status: 'provisional',
    expiresOn: '2026-09-01',
    source: 'Dec 2025 SOP. Two other fee schedules exist in older documents',
    aliases: ['design fee', 'design cost', 'measure fee', '250', '100'],
    repNote:
      'Check what the live website publishes. If yudezign.com says something different, the website wins in front of a customer and this ruling changes.',
  },
  {
    id: 'ak-04-06',
    sectionId: 'process',
    question: 'Do I get the drawings?',
    answer:
      '"Yes. Layouts and elevations with exact sizes, plumbing and electrical notes, and appliance model numbers — your framer, plumber and electrician all work off them."',
    status: 'ruled',
    source: 'Design Agreement §3',
    aliases: ['drawings', 'elevations', 'plans'],
  },
  {
    id: 'ak-04-07',
    sectionId: 'process',
    question: "Who's responsible if a measurement is wrong?",
    answer:
      '"If we measure, that\'s on us. If you give us the numbers, they\'re yours to stand behind — which is exactly why I\'d rather come out."',
    status: 'ruled',
    source: 'Design Agreement §15',
    aliases: ['wrong measurement', 'liability', 'mistake'],
  },
  {
    id: 'ak-04-08',
    sectionId: 'process',
    question: 'Flat-pack or assembled?',
    answer: '"Your choice. Flat-packed ships tighter and costs less; assembled is faster on site."',
    status: 'ruled',
    source: 'Booklet p7',
    aliases: ['flat pack', 'flatpack', 'assembled', 'rta'],
  },
  {
    id: 'ak-04-09',
    sectionId: 'process',
    question: 'What does assembly cost?',
    answer: '"$30 per base or wall cabinet, $60 per tall cabinet."',
    status: 'ruled',
    source: 'Study doc',
    aliases: ['assembly cost', 'assembly', '30', '60'],
  },
  {
    id: 'ak-04-10',
    sectionId: 'process',
    question: 'Do you install?',
    answer:
      '"We provide install support, not installation. Every panel is QR-tagged — your installer scans it with InstallAssistant, our free app, and it shows a 3D model of exactly where that piece goes. And we coordinate delivery around their schedule."',
    status: 'ruled',
    source: 'Both contracts: "YUDEZIGN does not manage or perform installation services."',
    neverSayIds: ['ns-we-install'],
    aliases: ['install', 'installation', 'installer', 'fitting'],
    links: [
      {
        label: 'InstallAssistant — free on iOS',
        href: 'https://apps.apple.com/us/app/installassistant/id6743378316',
        kind: 'app',
        note: 'Install it on your own phone before the show. It demos in fifteen seconds.',
      },
    ],
  },
  {
    id: 'ak-04-11',
    sectionId: 'process',
    question: 'But can you get it installed?',
    answer:
      '"Sometimes we can arrange it in the Greater Houston area — I\'d have to check current capacity and price it separately. What I won\'t do is promise it and then hand you off."',
    status: 'ruled',
    source: 'Study doc — capacity-dependent, explicitly may stop',
    neverSayIds: ['ns-we-install'],
    aliases: ['arrange install', 'recommend installer'],
  },
  {
    id: 'ak-04-12',
    sectionId: 'process',
    question: 'What about delivery?',
    answer:
      '"$350 a trip inside the Greater Houston area. A kitchen, a couple of vanities and a small closet generally ride together."',
    status: 'ruled',
    source: 'Study doc',
    aliases: ['delivery', 'shipping', 'freight', '350'],
  },
  {
    id: 'ak-04-13',
    sectionId: 'process',
    question: 'Can we pick up?',
    answer: '"Yes — the plant is 5802 Colfax Street, Houston. By appointment, and bring your order number."',
    status: 'ruled',
    source: 'Study doc',
    aliases: ['pickup', 'pick up', 'collect', 'colfax'],
  },

  // ── §5 Money ──────────────────────────────────────────────────────────────
  {
    id: 'ak-05-01',
    sectionId: 'money',
    question: 'What deposit do you take?',
    answer:
      '"Terms are set in your written agreement, and I\'ll walk you through them line by line before you sign anything. I don\'t want to quote you a number and have the paperwork say something different."',
    status: 'blocked',
    source: 'Five conflicting figures exist across live documents',
    neverSayIds: ['ns-deposit'],
    aliases: ['deposit', 'down payment', 'upfront', 'payment terms'],
    repNote: 'Flag it to the office the same day.',
  },
  {
    id: 'ak-05-01b',
    sectionId: 'money',
    question: 'What does it cost, roughly?',
    answer:
      'Price it per linear foot and say the range, not a point number: "a kitchen like that runs somewhere around four to seven and a half thousand in cabinets, depending on finish. Let me measure and get you a real number."',
    status: 'ruled',
    source: 'Damian, 2026-08-06 (Answer Key v1.4)',
    aliases: ['cost', 'how much', 'ballpark', 'roughly', 'price', 'per linear foot', 'lf'],
    repNote:
      'This is new at v1.4 and it is the one number you may say from memory. Measure the run, multiply, give the range — and say the four conditions every time.',
    links: [{ label: 'The linear-foot table', href: '/sales/pitch?t=pricing', kind: 'portal' }],
  },
  {
    id: 'ak-05-01c',
    sectionId: 'money',
    question: 'Is that the price?',
    answer:
      '"No — it\'s a ballpark so you know whether we\'re in the same conversation. Give me twenty minutes of measurements and you\'ll get a real number, itemised."',
    status: 'ruled',
    source: 'Damian, 2026-08-06',
    aliases: ['is that the price', 'firm price', 'final price'],
  },
  {
    id: 'ak-05-01d',
    sectionId: 'money',
    question: 'Can I write this on a quote?',
    answer:
      'No. Ballparks are spoken, in person. A number in writing is a quote, and quotes come from the quote team.',
    status: 'ruled',
    source: 'Follows from §6',
    neverSayIds: ['ns-price-from-memory'],
    aliases: ['in writing', 'email me a price', 'send me a number'],
  },
  {
    id: 'ak-05-01e',
    sectionId: 'money',
    question: "What's the difference between semi-custom and custom?",
    answer:
      '"Semi-custom means we build it to your sizes off our standard programme — that\'s Essential and Signature. Custom is where the materials and the add-ons open up. Reserve and Atelier are made to your sizes as well, but the surfaces and the accessory programme put them above those numbers."',
    status: 'ruled',
    source: 'Damian, 2026-08-07. Resolves the item v1.4 left BLOCKED',
    aliases: ['semi custom', 'semi-custom vs custom', 'what is custom', 'lines vs pricing'],
    repNote:
      'The rates start at Essential; Signature sits in the same band. This was blocked until now because the semi/custom axis existed in the price table and nowhere else in the pack.',
    links: [{ label: 'The rate table', href: '/sales/pitch?t=pricing', kind: 'portal' }],
  },
  {
    id: 'ak-05-01f',
    sectionId: 'money',
    question: 'What does a Reserve or Atelier job cost?',
    answer:
      '"Those run above the numbers I just gave you — the surfaces and the accessory programme move it. Let me measure and come back with a real figure rather than guess at it."',
    status: 'ruled',
    source: 'Damian, 2026-08-07',
    neverSayIds: ['ns-price-from-memory'],
    aliases: ['reserve price', 'atelier price', 'high gloss price', 'lacquer price', 'premium line cost'],
    repNote:
      'The linear-foot table is a floor, not a ceiling. There is no published rate for Reserve or Atelier, so do not extrapolate one from the table — quoting $375/LF on an Atelier kitchen under-quotes it.',
  },
  {
    id: 'ak-05-02',
    sectionId: 'money',
    question: 'Can I get trade pricing?',
    answer:
      '"Yes — we run trade pricing. It\'s set per account, so let me open one for you." Then get the New Account Registration form filled.',
    status: 'ruled',
    aliases: ['trade pricing', 'trade account', 'dealer'],
  },
  {
    id: 'ak-05-03',
    sectionId: 'money',
    question: "What tier am I on / what's my discount?",
    answer:
      '"Trade pricing is set per account — let me get an account opened for you and come back with your numbers."',
    status: 'ruled',
    neverSayIds: ['ns-dealer-tier'],
    aliases: ['tier', 'discount', 'multiplier', 'my rate'],
    repNote: 'Never name a tier, a percentage or a multiplier.',
  },
  {
    id: 'ak-05-04',
    sectionId: 'money',
    question: 'Are these prices retail or contractor?',
    answer: '"The sheets I share with trade accounts are contractor pricing."',
    status: 'ruled',
    source: 'Study doc',
    aliases: ['retail', 'contractor pricing', 'price list'],
  },
  {
    id: 'ak-05-05',
    sectionId: 'money',
    question: 'What does the material cost you?',
    answer:
      'Don\'t answer. "What I can do is show you where the money actually goes in a cabinet — that\'s a more useful conversation."',
    status: 'ruled',
    neverSayIds: ['ns-material-cost'],
    aliases: ['material cost', 'your cost', 'markup'],
  },
  {
    id: 'ak-05-06',
    sectionId: 'money',
    question: 'Can you beat this quote?',
    answer:
      '"Send it to me and let\'s compare like for like — box material, drawer count, slide rating, soft-close. Half the time the gap isn\'t price, it\'s specification."',
    status: 'ruled',
    aliases: ['beat this', 'cheaper', 'competitor quote', 'match price'],
  },
  {
    id: 'ak-05-07',
    sectionId: 'money',
    question: 'Do you take cards?',
    answer: '"Yes. There\'s a card processing fee — it\'s on your agreement."',
    status: 'ruled',
    aliases: ['credit card', 'payment method', 'cards'],
  },

  // ── §6 Quoting ────────────────────────────────────────────────────────────
  {
    id: 'ak-06-01',
    sectionId: 'quoting',
    question: 'Can you ballpark it right now?',
    answer:
      'Measure the run, multiply, give the range: "Around twenty feet of cabinetry — so roughly $4,300 in semi-custom, closer to $7,500 if you go custom. Supply only, assembled, before delivery. Finish moves it."',
    status: 'ruled',
    source: 'Damian, 2026-08-06 (v1.4). This used to be a deflection',
    aliases: ['ballpark', 'rough price', 'estimate', 'guess', 'linear foot'],
    repNote:
      'Rewritten at v1.4. You no longer deflect this — you have a number. Say the four conditions with it every time.',
    links: [{ label: 'The linear-foot table', href: '/sales/pitch?t=pricing', kind: 'portal' }],
  },
  {
    id: 'ak-06-02',
    sectionId: 'quoting',
    question: 'Can you take 10% off?',
    answer:
      '"Let me look at what\'s driving the number first. There\'s usually a smarter answer than shaving the box." Then route it through the office.',
    status: 'ruled',
    neverSayIds: ['ns-dealer-tier'],
    aliases: ['discount', '10% off', 'better price'],
    repNote: 'Discount authority sits with management, not with you — and that is deliberate.',
  },

  // ── §7 Warranty and liability ─────────────────────────────────────────────
  {
    id: 'ak-07-01',
    sectionId: 'warranty',
    question: "What's the warranty?",
    answer:
      '"Your written warranty comes with your agreement — I\'ll send you the current sheet so you\'re reading the real thing, not my summary."',
    status: 'blocked',
    source: 'Three lengths exist, and the newest contract contradicts our flyers',
    neverSayIds: ['ns-lifetime-warranty'],
    aliases: ['warranty', 'guarantee', 'how long covered'],
    repNote: 'Highest priority. Do not state a length to anyone.',
  },
  {
    id: 'ak-07-02',
    sectionId: 'warranty',
    question: 'Is it transferable to my buyer?',
    answer:
      '"That\'s exactly the kind of detail I\'d rather give you in writing than guess at. Let me send you the current sheet."',
    status: 'blocked',
    neverSayIds: ['ns-lifetime-warranty'],
    aliases: ['transferable', 'transfer warranty', 'resale'],
  },
  {
    id: 'ak-07-03',
    sectionId: 'warranty',
    question: 'Does it cover a rental / commercial job?',
    answer: 'Same deflection — the written warranty comes with the agreement.',
    status: 'blocked',
    source: 'Residential-use language exists in the warranty documents',
    neverSayIds: ['ns-lifetime-warranty'],
    aliases: ['rental', 'commercial warranty', 'investment property'],
  },
  {
    id: 'ak-07-04',
    sectionId: 'warranty',
    question: 'What if something arrives damaged?',
    answer:
      '"Inspect on delivery and note it on the packing slip. Anything you find later, email orders@yudezign.com — there\'s a claim window and I\'ll walk you through it."',
    status: 'ruled',
    aliases: ['damaged', 'damage', 'claim', 'broken', 'missing parts'],
  },

  // ── §8 Who we are ─────────────────────────────────────────────────────────
  {
    id: 'ak-08-01',
    sectionId: 'who-we-are',
    question: 'Who is YuDeZign?',
    answer:
      '"We\'re the manufacturer. We\'ve been building cabinetry in Houston since 2007 — our own plant, our own machines, our own design software."',
    status: 'ruled',
    source: '2020 catalog p21',
    aliases: ['who are you', 'company', 'history', '2007'],
  },
  {
    id: 'ak-08-02',
    sectionId: 'who-we-are',
    question: 'Where are you?',
    answer:
      'The plant is 5802 Colfax St, Houston — that\'s where cabinets are made and where customers collect. The showroom is 13366 Murphy Rd, Stafford — that\'s where you take a customer to see and touch.',
    status: 'ruled',
    source: 'Damian, 2026-08-20',
    aliases: ['address', 'where', 'location', 'showroom', 'plant', 'colfax', 'murphy'],
    repNote:
      'Two places, do not mix them up. The 13230 / 13366 question is settled: it is 13366 Murphy Rd, with no suite number. Anything still showing 13230 or "Ste 600" is out of date.',
  },
  {
    id: 'ak-08-03',
    sectionId: 'who-we-are',
    question: 'How far do you deliver?',
    answer:
      '"Greater Houston. Practically, if you\'re inside about ninety minutes of the plant, we\'re a good fit."',
    status: 'ruled',
    aliases: ['delivery radius', 'how far', 'territory', 'area'],
  },
  {
    id: 'ak-08-04',
    sectionId: 'who-we-are',
    question: "What's UFS / Yukon / Voxaura?",
    answer:
      '"Same group. UFS does flooring and building materials, Voxaura does lighting, we do cabinets and closets. If it\'s useful you can run one relationship instead of three."',
    status: 'ruled',
    aliases: ['ufs', 'yukon', 'voxaura', 'group', 'flooring', 'lighting'],
  },
  {
    id: 'ak-08-05',
    sectionId: 'who-we-are',
    question: 'Whose booth is this?',
    answer: '"We\'re all one group — I\'m on the cabinetry side."',
    status: 'blocked',
    source: 'Exhibitor identity is unresolved — see §11',
    aliases: ['whose booth', 'are you yukon', 'exhibitor'],
    repNote: 'Until ruled, this is the sentence. Do not elaborate.',
  },
  {
    id: 'ak-08-06',
    sectionId: 'who-we-are',
    question: 'Are you made in the USA?',
    answer:
      '"Made in Houston. That\'s the whole point — no ocean freight, no port delays, and no distributor between you and the shop that builds your cabinets."',
    status: 'ruled',
    source: 'Builder insert',
    aliases: ['made in usa', 'american made', 'imported', 'china'],
  },

  // ── §9 The three arguments ────────────────────────────────────────────────
  {
    id: 'ak-09-01',
    sectionId: 'arguments',
    question: 'Against an import or an out-of-state supplier',
    answer:
      '"No ocean freight, no port delays, no distributor between you and the shop that builds your cabinets. And when you need a replacement door in month eight, it comes from the same building."',
    status: 'ruled',
    source: 'Copy already approved and in print',
    aliases: ['import', 'overseas', 'out of state', 'china', 'competitor'],
  },
  {
    id: 'ak-09-02',
    sectionId: 'arguments',
    question: 'Against a big box',
    answer:
      '"That\'s a boxed-in showroom set. We\'re made to measure — custom widths, custom modifications, over thirty finishes. Same conversation, different answer."',
    status: 'ruled',
    source: 'Copy already approved and in print',
    aliases: ['big box', 'home depot', 'lowes', 'ikea', 'competitor'],
  },
  {
    id: 'ak-09-03',
    sectionId: 'arguments',
    question: 'Against another local shop',
    answer:
      '"A trade partner, not just a supplier. One source for cabinets, closets and casework, consistent across every plan you run — and our pricing sheets are organised by finish so you can budget a whole plan fast, not one kitchen at a time."',
    status: 'ruled',
    source: 'Copy already approved and in print',
    aliases: ['local shop', 'another cabinet company', 'competitor'],
  },
];

/** §10 — escalation. Who to tell, and how fast. */
export const escalation = [
  {
    situation: 'Anything BLOCKED, in front of a customer',
    who: 'Deflect, then flag it to the office',
    howFast: 'Same day',
  },
  { situation: 'Discount request', who: 'The office → management', howFast: 'Before you respond' },
  {
    situation: 'Anything over 250 cabinets',
    who: 'Operations — plant load check before you say a delivery date',
    howFast: 'Before you commit',
  },
  {
    situation: 'A claim, a damage report, a warranty question',
    who: 'orders@yudezign.com, copy the office',
    howFast: 'Same day',
  },
  {
    situation: "A question that isn't in this document",
    who: 'Ask the office — and it gets added to this document',
    howFast: 'Same day',
  },
];

/**
 * §11 — what the live website publishes, and what to do about it.
 *
 * Verified against the yudezign.com source on 2026-08-06. The Answer Key
 * anticipated exactly this check for the design fee ("if yudezign.com says
 * something different, the website wins in front of a customer") — but the
 * conflicts turn out to be wider than the design fee, and they sit on the three
 * answers that are BLOCKED or never-say.
 *
 * A rep WILL meet this: a builder reads the FAQ, then hears a deflection, and
 * concludes the rep is either evasive or less informed than the website. Being
 * briefed on it is the difference between handling it and being caught by it.
 */
export const websiteConflicts: PortalDoc = {
  id: 'website-conflicts',
  title: 'What the website says that you cannot',
  summary:
    'Three numbers you are told not to state are published on yudezign.com right now. Know about them before a customer quotes them back at you.',
  sections: [
    {
      heading: 'Deposit — the site says 50%, you say the deflection',
      paragraphs: [
        'The public FAQ and the Terms of Service both state a 50% deposit. The Answer Key rules deposit BLOCKED because five different figures exist across live documents.',
        'If a customer quotes the website at you: "That\'s the standard arrangement — and your written agreement is what governs it, so let me walk you through your terms line by line before you sign." You have neither contradicted the website nor committed to a number.',
      ],
      callout: 'Flag it to the office the same day. This one needs a ruling, not a workaround.',
    },
    {
      heading: 'Warranty — the site says "lifetime", which is on the never-say list',
      paragraphs: [
        'The public pricing page and FAQ publish a lifetime structural warranty, five years on finishes, two on hardware. "Lifetime warranty" is a never-say because it applies to a series we no longer sell, and three different warranty lengths exist across live documents — including one in the newest contract that disagrees with the printed flyers.',
        'Do not repeat the website\'s numbers from memory. Send the current sheet: "Let me send you the current warranty sheet so you\'re reading the real thing rather than my summary of it."',
      ],
      callout: 'Highest priority of the three. Do not state a length to anyone.',
    },
    {
      heading: 'Lead time — the site says 2-3 weeks throughout',
      paragraphs: [
        'The homepage, footer, about page, contact page, KD Lite page, Terms of Service and every page\'s search description publish a 2-3 week turnaround. Any production time stated in weeks is on the never-say list, because both signed contracts disclaim delivery deadlines outright.',
        'The approved hedge is close enough to live with: "in as little as two weeks, depending on finish and scale. Your quote carries the committed date." That does not contradict the website, and it does not commit you to three weeks either.',
      ],
    },
    {
      heading: 'What is consistent',
      bullets: [
        'Delivery at $350 a trip inside Greater Houston — the site and the Answer Key agree.',
        'Pickup at the plant, 5802 Colfax St — agree.',
        'The design fee is NOT published on the site, so the $250 / $100 provisional ruling stands until Sept 1.',
      ],
    },
  ],
};

/** §6 — the four quote rules. Also printed on the field card. */
export const quoteRules = [
  'Submit a complete packet. A filled Discovery Sheet is the packet. Incomplete packets get bounced, and bounces are measured.',
  'You receive a versioned quote. QUO-2026-####, with a version.',
  'You present that version. Never a number from memory, never a number you adjusted in the truck.',
  'You never show what anything costs us — not materials, not tiers, not any internal sheet.',
];
