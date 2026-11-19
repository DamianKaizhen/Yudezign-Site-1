import type { FinishStyle } from '../types';

export const finishStyles: FinishStyle[] = [
  {
    id: 'essential',
    name: 'Essential',
    description: 'Smooth matte solids, at the working price. Egger smooth-matte TFL doors for rentals, spec homes and hardworking family spaces.',
    visible: true,
    order: 1,
  },
  {
    id: 'signature',
    name: 'Signature',
    description: 'Woodgrains and textures, in the balanced middle. Deep-texture woodgrain and textured TFL for warm kitchens and rooms meant to feel lived in.',
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
    description: 'Gloss, perfect matt and feature oak for statement builds. High-gloss acrylic, perfect matt, Supramat and feature oak for flagship kitchens, media walls and hospitality.',
    visible: true,
    order: 4,
  }
];
