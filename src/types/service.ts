/**
 * Service Page Type Definitions
 *
 * Defines the structure for service/product detail pages.
 */

export interface ServiceData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  icon: string;
  overview: string;
  portfolioCategory?: 'kitchens' | 'closets' | 'vanities' | 'custom' | 'commercial';
  /** Optional marketing video (repo /portfolio/videos/*.mp4) shown in its own section. */
  video?: string;
  /** Poster image for the marketing video. */
  videoPoster?: string;
  /** Purpose-built organizer components, rendered as a grid. */
  organizers?: { name: string; description: string }[];
  /** Hardware finish options offered for this service. */
  hardwareOptions?: string[];
  [key: string]: any; // Allow additional properties for flexibility
}
