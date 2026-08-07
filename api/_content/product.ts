import type { DimensionRow, OpeningStyle, PortalDoc, ProductLine } from './types.js';

/**
 * Product facts — transcribed from ANSWER-KEY.md §2 and §3, v1.3 · 2026-08-06,
 * and the 60_TRAINING deck.
 *
 * Three corrections landed between v1.0 and v1.3 and all three reversed
 * something the pack had previously stated confidently:
 *
 *   v1.1 — the hardware does NOT ladder. DTC hinges and KV 8450FM slides on all
 *          four lines. No Blum anywhere. The old ladder implied the entry line
 *          got worse hardware, which argued against Essential — the line that
 *          carries the volume work.
 *   v1.2 — we manufacture frameless only, but we STOCK AND RESELL an RTA framed
 *          line. The old "we don't do framed" cost sales we could have served.
 *   v1.3 — closets are primarily particleboard-cored panel, not "the same
 *          materials as the kitchens". The kitchen box is ¾" plywood; the
 *          closet system is not.
 */

export const productLines: ProductLine[] = [
  {
    id: 'essential',
    name: 'Essential',
    tier: 'value',
    positioning: 'The widest palette, at the working price.',
    whereItFits: 'Rentals, spec homes, hardworking family spaces',
    doors: 'Woodgrain & solid TFL',
    collections: 'Sommet, Karisma, Prelude, Prism',
    decors: 62,
    bestFor: ['Rentals', 'Spec homes', 'Multi-family', 'Hardworking family spaces'],
  },
  {
    id: 'signature',
    name: 'Signature',
    tier: 'mid',
    positioning: 'European decors, in the balanced middle.',
    whereItFits: 'Warm kitchens, dens, lived-in spaces',
    doors: 'European TFL, deep textures',
    collections: 'EGGER 26+, Prism',
    decors: 33,
    bestFor: ['Warm kitchens', 'Dens'],
  },
  {
    id: 'reserve',
    name: 'Reserve',
    tier: 'mid-high',
    positioning: 'Soft-touch surfaces, handleless lines.',
    whereItFits: 'Modern builds where the architecture speaks',
    doors: 'Super-matte, soft-touch, high gloss',
    collections: 'AGT Trend',
    decors: 24,
    bestFor: ['Modern builds'],
  },
  {
    id: 'atelier',
    name: 'Atelier',
    tier: 'high',
    positioning: 'Lacquered panels and statement builds.',
    whereItFits: 'Flagship kitchens, media walls, hospitality',
    doors: 'Lacquered high gloss & perfect matt',
    collections: 'Lummia',
    decors: 23,
    bestFor: ['Flagship kitchens', 'Media walls', 'Hospitality'],
  },
];

/**
 * The sentence the whole range hangs on. Rewritten at v1.1 around the fact that
 * the hardware is identical rather than laddered.
 */
export const sameBoxSentence =
  '"Same box. Same motion. Different skin. The carcass is identical across all four lines — same frameless ¾″ plywood, same DTC soft-close hinge, same hundred-pound slide. What changes is the door surface and the finish family. So you can move up or down without giving up the cabinet."';

/**
 * Hardware, stated once because it genuinely does not vary.
 *
 * RULED 2026-08-06. We do not fit Blum, on any line. Naming any hinge brand
 * other than DTC is a never-say — the old ladder reached the spec of record,
 * the brief, the field card and the booklet before it was caught.
 */
export const hardwareStatement = {
  hinges: 'DTC soft-close hinges, on every line. There is no hinge upgrade between lines.',
  slides:
    'Knape & Vogt 8450FM — full-extension, soft-close, 100 lb. The same slide on every line, not just the upper ones.',
  softClose: 'Standard on every door and every drawer. Not an upgrade.',
  partners: 'Häfele, Würth, DTC and Knape & Vogt.',
  noLadder:
    'There is no hardware upgrade to sell. Do not offer "better hardware" on a higher line — a rep who invents one is selling a product we do not make.',
  /** PROVISIONAL — DTC's own product language, pending the part number's spec sheet. */
  sixWay:
    '"It\'s six-way adjustable — height, depth and side-to-side, both leaves. Your installer can true a door up on the wall without pulling it off the box."',
  sixWayNote:
    'Say this to every builder and every contractor. Nobody buys a cabinet for its hinge, but a builder who has lost a Friday to doors that will not line up on an out-of-square wall buys the next job on it.',
};

/** "Memorise these." — ANSWER-KEY.md §2 */
export const dimensions: DimensionRow[] = [
  {
    id: 'dim-kitchen-base',
    cabinet: 'Kitchen base',
    depth: '24″',
    height: '34.5″',
    widths: '3″ increments, 9″ → 42″',
    note: 'So a 1.5″ top lands at 36″',
  },
  {
    id: 'dim-base-ada',
    cabinet: 'Base, ADA',
    depth: '24″',
    height: '32.5″',
    widths: '3″ increments, 9″ → 42″',
    note: '34″ overall',
  },
  {
    id: 'dim-wall',
    cabinet: 'Wall',
    depth: '13″',
    height: '24 / 30 / 36 / 42″',
    widths: '12 / 15 / 18″ single door · 24 / 30 / 36″ double',
  },
  {
    id: 'dim-tall',
    cabinet: 'Tall',
    depth: '24″',
    height: '~96″',
    widths: '15 / 18 / 21″ single · 24 / 30 / 36″ double · 30 / 36″ oven & microwave',
  },
  {
    id: 'dim-bath-base',
    cabinet: 'Bath base',
    depth: '21″',
    height: '34.5″ or 32.5″ ADA',
    widths: '3″ increments',
    note: 'Not 24″ — this is the one that gets missed',
  },
];

export const dimensionsSource =
  'Internal product-study notes, "Standard Dimensions we follow when designing cabinets".';

export const weBuild = [
  'Frameless cabinets — European full-access, no face frame',
  'Flat panel (slab) and shaker doors, both in ¾″ material',
  'Kitchens, walk-in and reach-in closets',
  'Vanities including ADA',
  'Mudrooms, credenzas, coffee bars, laundry, offices, media walls',
  'Multi-family and commercial casework',
];

export const weDoNotBuild = [
  'Framed / face-frame cabinets — we do not BUILD them, but we do stock and resell an RTA framed line',
  'Raised-panel doors',
  'Inset doors',
  'Solid wood shaker doors — ours are machined from MDF',
  'Countertops',
  'A single box taller than 96″ — above that we stack',
];

/**
 * We build frameless. We sell framed too. RULED at v1.2.
 *
 * The old wording cost a sale rather than making a false claim: a rep asked
 * "do you do framed?" said no and walked away from a customer we can serve.
 */
export const framedLine: PortalDoc = {
  id: 'framed-line',
  title: 'We build frameless. We sell framed too.',
  summary:
    'We manufacture frameless only. We also stock an RTA framed line that we buy in and resell — and you volunteer which is which.',
  sections: [
    {
      heading: 'The disclosure — volunteer it, do not wait to be asked',
      callout:
        '"That\'s a stocked product we carry — our plant runs frameless, that\'s what we manufacture. I\'d rather you knew which is which."',
      paragraphs: [
        'Same discipline as the shaker rule. The moment framed comes up, say that we stock it rather than build it.',
      ],
    },
    {
      heading: 'Only three reasons to raise it at all',
      bullets: [
        'They need cabinets now and cannot wait on a build.',
        'They specifically want a face-frame look.',
        'The budget will not reach Essential.',
      ],
      paragraphs: ['Outside those three, sell frameless. Never lead with the framed line.'],
    },
    {
      heading: 'Everything specific about it is BLOCKED',
      paragraphs: [
        'There is no stock sheet, style list, size list or price list for the framed line anywhere in the company yet. So styles, finishes, sizes and price are all a deflection: "We stock a range — let me check what\'s actually on the floor for what you need and come back to you today."',
        'Assembly is the one specific you can answer: flat-pack or assembled, the customer\'s choice, priced differently either way.',
      ],
    },
    {
      heading: 'If they push on the reseller point',
      callout:
        '"Fair question. The difference is we\'re not only a reseller — we manufacture, and the framed line is there so you\'re not stuck when a build doesn\'t fit your timeline. Everything we make, we make here."',
    },
  ],
};

/**
 * Closets are not made of what the pack used to say. RULED at v1.3.
 *
 * "Cabinet-grade construction, same materials as the kitchens" was on the
 * printed field card. The kitchen box is ¾" plywood and we sell hard on that;
 * carrying the sentence across implied a plywood closet carcass at no extra
 * cost, which a customer could legitimately complain about on delivery.
 */
export const closetLines = {
  ladder: ['Everyday', 'Wardrobe', 'Dressing Room'],
  sayThis: '"Same plant, same standards, same hardware — different board."',
  core: 'Most of the closet system is particleboard-cored panel — the same core as our door panels. Some components are MDF. Say it plainly; it is normal for closet systems.',
  plywoodOption:
    '"Yes — we custom-laminate plywood for that. It costs more and it adds lead time, so let\'s price it both ways."',
  neverSay:
    'Never state a closet box is plywood unless that specific job was specified that way.',
  overlay: 'Half overlay on closets, so two units can share a panel.',
};

/**
 * The one thing a rep must volunteer rather than wait to be asked.
 */
export const shakerDisclosure = {
  heading: 'Volunteer this. Do not wait to be asked.',
  say: '"Our shaker is machined MDF rather than five pieces of solid wood — and that\'s on purpose. MDF doesn\'t move with humidity, so the door can\'t warp or split at a joint the way a wood shaker will, and it takes paint better because there\'s no grain. In Houston that matters more than it would somewhere dry."',
  why: 'A traditional shaker door is five pieces of solid wood — two rails, two stiles, and a panel that floats so it can move with the season. Ours is one piece of MDF with the profile machined into it, finished in RTF.',
  never:
    'Never say or imply solid wood about a shaker door. Not "solid feel," not "solid construction."',
};

/**
 * Four ways a door opens. J-pull was missing from the spec of record entirely —
 * we build it, it is in our own project photography, and one of our own photos
 * was mis-captioned as gola because of it.
 */
export const openings: OpeningStyle[] = [
  {
    id: 'opening-handles',
    name: 'Handles',
    what: 'Bar pulls, arch pulls, knobs — in three hardware finishes.',
  },
  {
    id: 'opening-jpull',
    name: 'J-pull',
    what: 'A shaped lip on the edge of the door itself. Handleless look, no separate profile.',
    caution:
      'J-pull is NOT gola. Gola is a channel in the box; J-pull is a shape on the door. They look alike in a photo and they are different products at different prices — a designer will catch this, and we have already mis-captioned one of our own project photos over it.',
  },
  {
    id: 'opening-gola',
    name: 'Gola',
    what: 'A continuous channel profile set into the carcass. The door stays plain.',
  },
  {
    id: 'opening-push',
    name: 'Push-to-open',
    what: 'No handle, no channel. Press and it releases.',
  },
];

export const hardwareFinishes = 'Brushed nickel · polished chrome · matte black';

export const accessories =
  'Pull-outs, lazy-susans, wire baskets, waste bins, cutlery trays, spice racks, wine storage.';

export const accessoriesNote =
  'Accessories are where a job grows. A customer who has chosen a finish has stopped deciding. A customer looking at a spice pull-out has started again.';
