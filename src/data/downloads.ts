// Downloadable resources (brochures, catalogs, flyers, spec sheets).
//
// To add a new file:
//   1. Drop the PDF in `public/downloads/` (keep large files web-optimized).
//   2. Optionally add a cover image in `public/downloads/covers/`.
//   3. Add an entry to the `resources` array below.
// The Downloads page (/downloads) renders everything automatically.

export type ResourceCategory = 'brochure' | 'companion' | 'flyer' | 'catalog' | 'spec-sheet';

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
// Order here controls the order of sections on the page.
export const resourceCategories: ResourceCategoryMeta[] = [
  { id: 'brochure', label: 'Brochures', blurb: 'Our collection lookbooks and company brochures.' },
  {
    id: 'companion',
    label: 'Companion Guides',
    blurb: 'Quick, audience-specific guides for homeowners, builders, contractors, and commercial clients.',
  },
  { id: 'flyer', label: 'Product Flyers', blurb: 'One-page overviews of our cabinet and closet offerings.' },
  { id: 'catalog', label: 'Catalogs', blurb: 'Full finish, material, and product catalogs.' },
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

  // Audience companion guides (from the 2026 catalog)
  {
    id: 'companion-home',
    title: 'For Your Home — Homeowner Guide',
    description:
      'The essentials of YuDeZign custom cabinets and closets, distilled for planning a project of your own.',
    category: 'companion',
    file: '/downloads/companion-home.pdf',
    cover: '/downloads/covers/companion-home.jpg',
    fileSize: '0.9 MB',
    pages: 4,
    updated: '2026',
  },
  {
    id: 'companion-builder',
    title: 'For Builders — Trade Program',
    description:
      'Our trade program for home builders: local production, reliable schedules, and volume pricing from our Houston shop.',
    category: 'companion',
    file: '/downloads/companion-builder.pdf',
    cover: '/downloads/covers/companion-builder.jpg',
    fileSize: '0.8 MB',
    pages: 4,
    updated: '2026',
  },
  {
    id: 'companion-contractor',
    title: 'For Contractors — Remodel-Ready',
    description:
      'Remodel-ready cabinetry with quick turnaround from our Houston shop: fast quotes, custom widths, one local call.',
    category: 'companion',
    file: '/downloads/companion-contractor.pdf',
    cover: '/downloads/covers/companion-contractor.jpg',
    fileSize: '0.7 MB',
    pages: 4,
    updated: '2026',
  },
  {
    id: 'companion-commercial',
    title: 'For Commercial Spaces',
    description:
      'Casework and storage for units, amenities, and workplaces — uniform, durable, and serviced locally from our Houston shop.',
    category: 'companion',
    file: '/downloads/companion-commercial.pdf',
    cover: '/downloads/covers/companion-commercial.jpg',
    fileSize: '1 MB',
    pages: 4,
    updated: '2026',
  },

  // Standalone one-page product flyers
  {
    id: 'flyer-cabinets',
    title: 'Custom Cabinets Flyer',
    description:
      'A one-page overview of our custom frameless cabinetry — construction, a sampling of finishes, and fitted interior accessories.',
    category: 'flyer',
    file: '/downloads/flyer-cabinets.pdf',
    cover: '/downloads/covers/flyer-cabinets.jpg',
    fileSize: '0.3 MB',
    updated: '2026',
  },
  {
    id: 'flyer-closets',
    title: 'Custom Closets Flyer',
    description:
      'A one-page overview of our custom closets and wardrobes — cabinet-grade materials, fitted organizers, finishes, and hardware.',
    category: 'flyer',
    file: '/downloads/flyer-closets.pdf',
    cover: '/downloads/covers/flyer-closets.jpg',
    fileSize: '0.2 MB',
    updated: '2026',
  },
];
