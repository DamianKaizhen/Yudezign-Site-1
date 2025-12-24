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
  [key: string]: any; // Allow additional properties for flexibility
}
