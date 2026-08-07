import type { DimensionRow, ProductLine } from './types.js';

/**
 * Product facts — transcribed from ANSWER-KEY.md §2 and §3.
 *
 * The box is identical across all four lines. What changes is the door surface,
 * the hardware brand and the finish family — which is why a customer can move up
 * or down without giving up the cabinet. That sentence is the single most useful
 * one a rep owns, and it lives in the Answer Key as ak-03-01.
 */

export const productLines: ProductLine[] = [
  {
    id: 'essential',
    name: 'Essential',
    positioning: 'The widest palette, at the working price.',
    doors: 'Woodgrain & solid TFL',
    hinge: 'DTC soft-close',
    slide: 'DTC soft-close undermount',
    bestFor: ['Rentals', 'Spec homes', 'Hardworking family spaces'],
  },
  {
    id: 'signature',
    name: 'Signature',
    positioning: 'European decors, in the balanced middle.',
    doors: 'European TFL, deep textures',
    hinge: 'Blum',
    slide: 'KV GS4270 full-extension',
    bestFor: ['Warm kitchens', 'Dens'],
  },
  {
    id: 'reserve',
    name: 'Reserve',
    positioning: 'Soft-touch surfaces, handleless lines.',
    doors: 'Super-matte, soft-touch, high gloss',
    hinge: 'Blum',
    slide: 'KV 8450FM',
    bestFor: ['Modern builds'],
  },
  {
    id: 'atelier',
    name: 'Atelier',
    positioning: 'Lacquered panels and statement builds.',
    doors: 'Lacquered high gloss & perfect matt',
    hinge: 'Blum',
    slide: 'KV 8450FM',
    bestFor: ['Flagship kitchens', 'Hospitality'],
  },
];

export const closetLines = {
  ladder: ['Everyday', 'Wardrobe', 'Dressing Room'],
  note: 'Same ladder logic. Cabinet-grade construction, same materials as the kitchens.',
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
  },
];

export const dimensionsSource =
  'Internal product-study notes, "Standard Dimensions we follow when designing cabinets".';

export const weBuild = [
  'Frameless cabinets only — European full-access, no face frame',
  'Flat panel (slab) and shaker doors, both in ¾″ material',
  'Kitchens, walk-in and reach-in closets',
  'Vanities including ADA',
  'Mudrooms, credenzas, coffee bars, laundry, offices, media walls',
  'Multi-family and commercial casework',
];

export const weDoNotBuild = [
  'Framed / face-frame cabinets',
  'Raised-panel doors',
  'Inset doors',
  'Solid wood shaker doors — ours are machined from MDF',
  'Countertops',
  'A single box taller than 96″ — above that we stack',
];

/**
 * The one thing a rep must volunteer rather than wait to be asked. It is on the
 * never-say list from the other direction: letting a customer assume solid wood
 * and finding out at delivery is the failure being prevented.
 */
export const shakerDisclosure = {
  heading: 'Volunteer this. Do not wait to be asked.',
  say: '"No — we machine ours out of a single piece of MDF. That\'s deliberate: MDF doesn\'t move with humidity, so the door won\'t warp or crack at the joints, and it takes paint better than wood does."',
  why: 'Our own study notes: "we need to be clear that we do not use real wood when we make shaker doors."',
};
