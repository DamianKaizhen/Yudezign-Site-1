import type { ContentLink, LibraryContent } from './types.js';

/**
 * Sources — everything to watch, read and send, from 10_ONBOARDING/STUDY-LINKS.md.
 *
 * The videos are THIRD-PARTY explainers, chosen because they show a concept
 * clearly, not because they show how we work. Several demonstrate methods we
 * deliberately don't use, and where that is true it is flagged — the flag is
 * the most useful part, because knowing what we don't do is half of knowing
 * what we do. If a video contradicts the Answer Key, the Answer Key wins.
 *
 * The training curriculum that used to live here was removed on 2026-08-07: it
 * was pinned to the Aug 5-10 onboarding week and went stale immediately.
 * Training is being handled outside this portal.
 */

const videoWarning =
  "These are third-party explainers, chosen because they show a concept clearly — not because they show how we work. Several demonstrate methods we deliberately don't use, and where that is true it is flagged. If a video contradicts the Answer Key, the Answer Key wins: it is traced to our own documents and these are traced to somebody's YouTube channel.";

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

/**
 * The product-knowledge session, hosted on the site.
 *
 * The deck is a 16:9 presentation with keyboard navigation and three embedded
 * explainer videos — those only play over https, which is why the local copy on
 * the K: drive shows the "no connection" fallback instead. The lesson guide is
 * the 8.5×11 printable handout.
 */
// `cleanUrls: true` in vercel.json 308-redirects /foo.html to /foo, so these
// link the extensionless form — otherwise every open costs a redirect.
const training: ContentLink[] = [
  {
    label: 'Product Knowledge — the deck',
    href: '/sales-training/deck',
    kind: 'doc',
    note: 'The full presentation. Arrow keys to move, and the embedded videos play here — they do not in the offline copy. Best on a laptop; it scales to fit whatever you open it on.',
  },
  {
    // PDF only, by Damian's call — two formats of one document read as two
    // documents, and which you got depended on which line you tapped.
    label: 'Lesson guide (PDF)',
    href: '/sales-training/guide.pdf',
    kind: 'doc',
    note: 'The same material as a 16-page handout, laid out for 8.5×11. Prints clean and travels — worth downloading before the wifi gets bad. 8.8 MB.',
  },
];

/**
 * The printed pack, as PDFs.
 *
 * These are what a rep carries on paper. Having them here means the current
 * version is always one tap away, and a rep who left the field card in the
 * truck is not stuck. All four were rebuilt against Answer Key v1.4.
 */
const repPack: ContentLink[] = [
  {
    label: 'Rep Handbook',
    href: '/sales-training/docs/rep-handbook.pdf',
    kind: 'doc',
    note: 'The whole study pack bound into one document — the Answer Key, strategy, what to say, the SOP, KPIs and the show playbooks. 1 MB.',
  },
  {
    label: 'Field Card',
    href: '/sales-training/docs/field-card.pdf',
    kind: 'doc',
    note: 'The laminated two-sider that lives in your pocket. Side 1 is the product, side 2 is what not to say plus the numbers. 158 KB — the one to keep on your phone.',
  },
  {
    label: 'The Brief',
    href: '/sales-training/docs/brief.pdf',
    kind: 'doc',
    note: 'The eight-page visual brief: the product, the lines, the pitch, objections and the pricing table. 5 MB.',
  },
  {
    label: 'Discovery Sheet',
    href: '/sales-training/docs/discovery-sheet.pdf',
    kind: 'doc',
    note: 'The intake pad — front is the quote-request packet, back is a quarter-inch grid for the layout sketch. A completed sheet IS the quote request. 149 KB, print it double-sided.',
  },
];

const documents: ContentLink[] = [
  {
    label: 'The 2026 Line Guide',
    href: '/downloads/YuDeZign_LineGuide_2026.pdf',
    kind: 'doc',
    note: '20 pages, all four cabinet lines and all three closet lines side by side — door surfaces, palettes with décor counts, openings, interiors. Customer-facing and safe to send. This is the one to open when someone asks what the difference between the lines actually is.',
  },
  {
    label: 'Per-line flyers — Essential · Signature · Reserve · Atelier · Closets',
    href: '/downloads',
    kind: 'site',
    note: 'One page each, on the public downloads page. Hand over the single line a customer has settled on rather than all four — a visitor with five documents reads none of them.',
  },
  {
    label: 'Brochures — safe to send to clients',
    href: '/downloads',
    kind: 'site',
    note: 'On our own site, so you can send the link rather than attaching files. Pick the edition that matches the buyer — Builder, Contractor, Home or Commercial — rather than sending everything.',
  },
  {
    label: 'Price lists + New Account Registration form',
    href: '',
    kind: 'doc',
    pending: true,
    note: 'Coming to this portal shortly. Until then, ask the office for the current contractor price list and the New Account Registration form — that form is how a prospect becomes an account, so it is the one attachment worth sending early.',
    caution:
      'Sharing a price list is not the same as quoting a job. A price list lets a contractor budget. A JOB gets a versioned quote from the quote team, off a Discovery Sheet. Never build a job price off the sheet yourself.',
  },
  {
    label: 'Finishes catalog (PDF)',
    href: '/YuDeZign_Finishes_Catalog.pdf',
    kind: 'doc',
    note: 'The full finish library, on our own site. "Over thirty" is the number you say out loud — the catalog is much deeper, and the answer to "do you have X?" is "let me check the library and come back to you."',
  },
  {
    label: 'InstallAssistant — our app, free on iOS',
    href: 'https://apps.apple.com/us/app/installassistant/id6743378316',
    kind: 'app',
    note: 'Every panel carries a QR sticker; scanning it shows a 3D model of the whole cabinet and exactly where that piece goes. Install it on your own phone — it demos in fifteen seconds and answers "how hard is this to put together?" better than any sentence you could say.',
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
    label: 'Downloads — line guide, flyers, booklets',
    href: '/downloads',
    kind: 'site',
    note: 'Everything customer-facing in one place, including the 2026 Line Guide and a one-page flyer for each line. You can send this link instead of attaching files.',
  },
  {
    label: 'Brochures & downloads',
    href: '/downloads',
    kind: 'site',
    note: 'The booklet editions and companion guides, on the public site.',
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    kind: 'site',
    note: 'Delivered work. Only ever cite delivered work as a reference.',
  },
  {
    label: 'KD Lite closet program',
    href: '/kdlite',
    kind: 'site',
    note: 'The closet ladder — Everyday, Wardrobe, Dressing Room.',
  },
  {
    label: 'Pricing',
    href: '/pricing',
    kind: 'site',
    note: 'What the website publishes. Worth reading before a customer quotes it back at you — see the note in Process → Reference.',
  },
  { label: 'FAQ', href: '/faq', kind: 'site', note: 'What a customer reads before they call you.' },
  { label: 'Contact', href: '/contact', kind: 'site' },
];

export const library: LibraryContent = {
  warning: videoWarning,
  training,
  repPack,
  videos,
  documents,
  siteLinks,
};
