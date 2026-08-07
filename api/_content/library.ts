import type { ContentLink, CurriculumModule, LibraryContent, PortalDoc } from './types.js';

/**
 * Everything to watch, read and bookmark — from 10_ONBOARDING/STUDY-LINKS.md
 * and CURRICULUM.md.
 *
 * The videos are THIRD-PARTY explainers, chosen because they show a concept
 * clearly, not because they show how we work. Several demonstrate methods we
 * deliberately don't use, and where that is true it is flagged — the flag is the
 * most useful part, because knowing what we don't do is half of knowing what we
 * do. If a video contradicts the Answer Key, the Answer Key wins.
 */

export const videoWarning =
  'These are third-party explainers, chosen because they show a concept clearly — not because they show how we work. If a video contradicts the Answer Key, the Answer Key wins: it is traced to our own documents and these are traced to somebody\'s YouTube channel.';

const videos: ContentLink[] = [
  {
    label: "Cabinets: Framed, Frameless & Inset — What's the Difference?",
    href: 'https://youtu.be/F8x5c-6seYo',
    kind: 'video',
    note: 'Start here. The single most useful ten minutes in this list. We build frameless only — framed and inset are shown so you can recognise them when a customer or designer specifies one, and say no clearly.',
  },
  {
    label: 'What Cabinet Hinge Do I Need — Part 1: Face-Frame vs Frameless',
    href: 'https://youtu.be/unyx9G_mqlw',
    kind: 'video',
    note: 'Why the two constructions need different hinges. Watch for how the hinge mounts to the side panel on a frameless box — that is ours.',
  },
  {
    label: 'What Hinge to Use — Part 2: Hinge and Base Plate Combinations',
    href: 'https://youtu.be/NdTHHGUww0A',
    kind: 'video',
    note: 'How hinge and plate together produce full overlay, half overlay or inset. We use full overlay on kitchens and vanities, half overlay on closets — that is what lets two closet units share one panel. Inset we do not do at all.',
  },
  {
    label: 'How to Assemble Frameless Base Cabinets',
    href: 'https://youtu.be/7jYdWrWUaIQ',
    kind: 'video',
    note: "What a customer is actually holding when they take a flat-pack delivery. Another company's cabinets, so the hardware differs — ours ship QR-tagged with the InstallAssistant app, which is a genuine selling point against exactly this experience.",
  },
  {
    label: 'Particle Board vs MDF vs Plywood',
    href: 'https://youtu.be/xPyLWKz0Pas',
    kind: 'video',
    note: 'Map it onto us as you watch: plywood → the box · particleboard → door cores, or a cheaper box on request · MDF → door cores, especially shaker.',
  },
  {
    label: 'Melamine vs Laminate',
    href: 'https://youtu.be/8nnCOPXEowg',
    kind: 'video',
    note: 'The distinction customers ask about most and reps get wrong most. Laminate is many resin-soaked layers bonded to a substrate — thicker, tougher, its own sheet. Melamine is a single resin-soaked paper fused to the core.',
  },
  {
    label: 'Acrylic vs Laminate — which is better for kitchen cabinets?',
    href: 'https://youtu.be/1UV1B2E1MaQ',
    kind: 'video',
    note: "Where high gloss belongs and where it doesn't.",
  },
  {
    label: 'How Thermofoil (RTF / 3DL) Doors Are Made',
    href: 'https://youtu.be/nzD_TW3tC_Q',
    kind: 'video',
    note: 'Vinyl film vacuum-pressed over MDF. This is how our shaker doors get their finish.',
  },
  {
    label: 'How to Finish Plywood Edges with Edge Banding',
    href: 'https://youtu.be/XCKaKX86gYE',
    kind: 'video',
    note: 'Why every exposed edge gets banded: it seals the core against moisture, and colour-matched it makes the panel read as one piece. Two sentences you will use constantly.',
  },
  {
    label: 'Build Shaker Cabinet Doors With a Table Saw',
    href: 'https://youtu.be/OdImx4h0MWo',
    kind: 'video',
    caution: "This one shows what we DON'T do.",
    note: 'Rail-and-stile shaker — five pieces of solid wood with a floating centre panel. Traditional, and not ours. Watch it specifically so you can say: "the traditional way is five pieces of wood with a floating panel. We machine ours from one piece of MDF instead, and here\'s why that\'s better for you." That sentence handles the objection in full.',
  },
];

const documents: ContentLink[] = [
  {
    label: 'Brochures — safe to send to clients',
    href: 'https://drive.google.com/drive/folders/1QscX2tn9ubGTPwpTHaDFCEAXzWwe68jz',
    kind: 'drive',
    note: 'Customer-facing. Pick the edition that matches the buyer — Builder, Contractor, Home or Commercial — rather than sending everything.',
  },
  {
    label: 'Price lists + New Account Registration form',
    href: 'https://drive.google.com/drive/folders/1GiEyUnIU02frjq6Tmpw973P_OQqGiRTO',
    kind: 'drive',
    note: 'All prices in this folder are contractor pricing. Share with trade accounts. Also holds the New Account Registration form — how a prospect becomes an account, so it is the one attachment worth sending early.',
    caution:
      'Sharing a price list is not the same as quoting a job. A price list lets a contractor budget. A JOB gets a versioned quote from the quote team, off a Discovery Sheet. Never build a job price off the sheet yourself.',
  },
  {
    label: 'InstallAssistant — our app, free on iOS',
    href: 'https://apps.apple.com/us/app/installassistant/id6743378316',
    kind: 'app',
    note: 'Every panel carries a QR sticker; scanning it shows a 3D model of the whole cabinet and exactly where that piece goes. Install it on your own phone before the show — it demos in fifteen seconds and answers "how hard is this to put together?" better than any sentence you could say.',
  },
  {
    label: 'The product-study notes (Kortex)',
    href: 'https://app.kortex.co/public/document/448a57f5-6e56-4d6a-9e13-d3ab8a196bd8',
    kind: 'doc',
    note: 'The original notes the study links expand. Same videos, plus the raw construction notes.',
  },
];

/** Deep links into the public site — the pages a rep sends a customer to. */
const siteLinks: ContentLink[] = [
  {
    label: 'Finish library',
    href: '/finishes',
    kind: 'site',
    note: 'The public finish library, and where the booth QR points. Send anyone who asks about finishes here.',
  },
  {
    label: 'Brochures & downloads',
    href: '/downloads',
    kind: 'site',
    note: 'The booklet editions and companion guides, on the public site.',
  },
  { label: 'Portfolio', href: '/portfolio', kind: 'site', note: 'Delivered work. Only ever cite delivered work as a reference.' },
  { label: 'Pricing', href: '/pricing', kind: 'site', note: 'What the website publishes. Check this against the Answer Key design fee.' },
  { label: 'KD Lite closet program', href: '/kdlite', kind: 'site' },
  { label: 'FAQ', href: '/faq', kind: 'site' },
  { label: 'Contact', href: '/contact', kind: 'site' },
];

const curriculum: CurriculumModule[] = [
  {
    id: 'cur-day1',
    week: 'Wed Aug 5 — Day 1',
    title: 'The product',
    objectives: [
      'Frameless vs framed, and why we only build frameless',
      'The box: ¾″ plywood, cam-and-dowel, French cleat, soft-close standard',
      'Doors: flat panel and shaker, both MDF-cored',
      'Sheet goods, finishes and edge banding',
      'The standard dimensions — memorise them',
    ],
    assessment: 'Homework: sketch a 12-foot L-shaped kitchen in stock sizes, name every box.',
    links: videos.slice(0, 5),
  },
  {
    id: 'cur-day2',
    week: 'Thu Aug 6 — Day 2',
    title: 'The market and the message',
    objectives: [
      'Who we sell to, and the 70/20/10 target mix',
      'The five bulk lanes, ranked',
      'The 30-second pitch and its four variants',
      'The never-say list',
    ],
    assessment: 'Homework: twenty never-say flashcards, plus your own 30-second pitch for two segments.',
  },
  {
    id: 'cur-day3',
    week: 'Fri Aug 7 — Day 3',
    title: 'The journey and the machine',
    objectives: [
      'The nine stages and four handoffs',
      'The Discovery Sheet as the quote-request packet',
      'KPIs and how you are measured',
    ],
    assessment:
      'Homework: pair up, fill a Discovery Sheet on each other, run two practice records to Quoted.',
  },
  {
    id: 'cur-day4',
    week: 'Sat Aug 8 — Day 4',
    title: 'Certification',
    objectives: [
      '09:00 written exam — 40 questions, 1 hour, closed book',
      '10:15 the 30-second pitch to camera, until clean twice in a row with no notes',
      '11:30 eight objection roleplays',
      '13:30 three live cold calls off the call list',
      '15:00 Discovery Sheet under time pressure',
      '16:00 debrief, grades, booth assignments',
    ],
    assessment:
      'Booth Certification is binary, not on the curve: 100% on the never-say section, AND the 30-second pitch delivered clean, twice, from memory. Fail either and you do not work the booth unsupervised.',
  },
  {
    id: 'cur-day5',
    week: 'Sun–Mon Aug 9–10',
    title: 'Booth build at NRG',
    objectives: ['Build the booth', 'Lead-card drill — 40 seconds a card', 'Final rehearsal'],
  },
  {
    id: 'cur-w3',
    week: 'Week 3 — Aug 17–21',
    title: 'Measure certification',
    objectives: [
      'Two supervised measures, then one solo checked against a supervised re-measure',
      'Quote-request quality',
      'CRM hygiene audit',
    ],
    assessment: 'Required before any solo measure appointment.',
  },
  {
    id: 'cur-w4',
    week: 'Week 4 — Aug 24–28',
    title: 'Bulk work',
    objectives: [
      'Apartment value-add, build-to-rent, production single-family',
      'Reading a unit mix',
      'The $55K medical building as the worked example',
    ],
    assessment: 'Gate: present one real bulk opportunity.',
  },
  {
    id: 'cur-w5',
    week: 'Week 5 — September',
    title: 'Closets and vanities as their own sale',
    objectives: [
      'Half overlay and why closets use it',
      'The three closet lines',
      'The margin is in the organisers, not the box',
    ],
    assessment: 'Gate: quote one closet end to end.',
  },
  {
    id: 'cur-w6',
    week: 'Week 6 — September',
    title: 'Contracts, change orders, negotiation, terms',
    objectives: ['Full certification'],
    assessment: 'Quota goes live October 1.',
  },
];

export const library: LibraryContent = { videos, documents, siteLinks, curriculum };

export const readingOrder = [
  { when: 'Wed night', read: 'The Answer Key — cover to cover. The one that matters most.' },
  { when: 'Thu night', read: 'Sales Strategy + What To Say, then the Day 1 videos.' },
  {
    when: 'Fri night',
    read: 'Sales SOP + KPIs & Goals + Booth Playbook, then the Builder and Contractor booklet editions.',
  },
  {
    when: 'Reference, not reading',
    read: 'The finishes catalog · the four line flyers · the closets flyer.',
  },
];

export const notTeaching: PortalDoc = {
  id: 'not-teaching',
  title: "What we're not teaching you, and why",
  sections: [
    {
      heading: 'Competitor battlecards',
      paragraphs: [
        'No competitive intelligence exists anywhere in the company. Inventing it is worse than having none, because a rep would repeat it.',
        'Instead every rep asks "what do you like about working with them?" and writes the answer down. In six weeks that is the first honest competitor picture this company has had.',
      ],
    },
    {
      heading: 'A full customer FAQ',
      paragraphs: [
        'It gets written in week 3, from the real questions nobody could answer at NRG. That will be a better document than anything we could have guessed at in advance — which is why you write down every question you get stuck on.',
      ],
    },
    {
      heading: 'All the finishes',
      paragraphs: [
        'Learn four line names and one sentence each. The décor library is a lookup, and the answer to "do you have X?" is "let me check the library and come back to you" — which is correct, fast, and gives you a reason to call.',
      ],
      callout: '"Over thirty" is the number you say out loud. The full library is much deeper.',
    },
    {
      heading: 'Measure certification',
      paragraphs: [
        'Deferred to week 3. There is no time to teach it properly in a compressed week, and a bad measure costs far more than a missed week.',
      ],
    },
  ],
};
