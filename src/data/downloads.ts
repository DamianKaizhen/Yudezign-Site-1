// Downloadable resources (brochures, catalogs, flyers, spec sheets).
//
// To add a new file:
//   1. Drop the PDF in `public/downloads/` (keep large files web-optimized).
//   2. Optionally add a cover image in `public/downloads/covers/`.
//   3. Add an entry to the `resources` array below.
// The Downloads page (/downloads) renders everything automatically.

export type ResourceCategory = 'brochure' | 'catalog' | 'flyer' | 'spec-sheet';

export interface ResourceFile {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  /** Path under /public (e.g. "/downloads/file.pdf") or an absolute URL. */
  file: string;
  /** Optional cover thumbnail under /public. */
  cover?: string;
  /** Human-readable size, e.g. "9 MB". */
  fileSize?: string;
  /** Page count, if a multi-page document. */
  pages?: number;
  /** Year or date label shown on the card, e.g. "2026". */
  updated?: string;
  /** Highlights the item as the primary/featured download. */
  featured?: boolean;
}

export interface ResourceCategoryMeta {
  id: ResourceCategory;
  label: string;
  blurb: string;
}

// Only categories that actually have files are shown on the page.
export const resourceCategories: ResourceCategoryMeta[] = [
  { id: 'brochure', label: 'Brochures', blurb: 'Our collection lookbooks and company brochures.' },
  { id: 'catalog', label: 'Catalogs', blurb: 'Full finish, material, and product catalogs.' },
  { id: 'flyer', label: 'Flyers', blurb: 'Promotions, one-pagers, and quick guides.' },
  { id: 'spec-sheet', label: 'Spec Sheets', blurb: 'Technical specifications and detail sheets.' },
];

export const resources: ResourceFile[] = [
  {
    id: 'booklet-2026',
    title: 'YuDeZign 2026 Collection Booklet',
    description:
      'Our full product booklet — kitchens, closets, vanities, and finishes — with the story behind our Houston-built European frameless cabinetry.',
    category: 'brochure',
    file: '/downloads/YuDeZign_Booklet_2026.pdf',
    cover: '/downloads/covers/booklet-2026.jpg',
    fileSize: '9 MB',
    pages: 24,
    updated: '2026',
    featured: true,
  },
  {
    id: 'finishes-catalog',
    title: 'Finishes & Materials Catalog',
    description:
      'The complete range of door finishes, woodgrains, laminates, and materials we offer, with color references to help you choose.',
    category: 'catalog',
    file: '/YuDeZign_Finishes_Catalog.pdf',
    cover: '/downloads/covers/finishes-catalog.jpg',
    fileSize: '5 MB',
    updated: '2025',
  },
];
