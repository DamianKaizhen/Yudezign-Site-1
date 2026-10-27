import type { FinishStyle } from '../types';

export const finishStyles: FinishStyle[] = [
  {
    id: 'essential',
    name: 'Essential',
    description: 'The widest palette, at the working price. Woodgrain and solid TFL doors for rentals, spec homes and hardworking family spaces.',
    visible: true,
    order: 1,
  },
  {
    id: 'signature',
    name: 'Signature',
    description: 'European decors, in the balanced middle. Smooth matte solids and deep-texture woodgrains for warm kitchens and rooms meant to feel lived in.',
    visible: true,
    order: 2,
  },
  {
    id: 'reserve',
    name: 'Reserve',
    description: 'Soft-touch surfaces, handleless lines. Super-matte doors that resist fingerprints, for modern builds where the architecture speaks.',
    visible: true,
    order: 3,
  },
  {
    id: 'atelier',
    name: 'Atelier',
    description: 'Lacquered panels and statement builds. High gloss and perfect matt for flagship kitchens, media walls and hospitality.',
    visible: true,
    order: 4,
  }
];
