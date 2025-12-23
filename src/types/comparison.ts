/**
 * Comparison Page Type Definitions
 *
 * Defines the structure for "VS" comparison pages.
 * These target comparison keywords and help users make informed decisions.
 */

export interface ComparisonData {
  slug: string; // URL-friendly identifier (e.g., 'frameless-vs-framed-cabinets')

  // SEO Metadata
  metaTitle: string; // Page title for SEO
  metaDescription: string; // Meta description
  keywords: string[]; // Target keywords

  // Page Content
  title: string; // Display title (e.g., "Frameless vs Framed Cabinets")
  introduction: string; // Brief intro paragraph

  // The Two Options Being Compared
  option1: ComparisonOption;
  option2: ComparisonOption;

  // Comparison Table
  comparisonTable: ComparisonRow[];

  // Detailed Sections
  detailedComparison?: {
    title: string;
    option1Details: string;
    option2Details: string;
  }[];

  // Decision Guide
  recommendation?: {
    title: string;
    content: string;
  };

  // Visual Aids
  images?: {
    option1Image?: string;
    option2Image?: string;
    comparisonImage?: string; // Side-by-side comparison
  };

  // Related Content
  relatedComparisons?: string[]; // Slugs of related comparison pages
  relatedServices?: string[]; // Related service page slugs
  relatedBlogPosts?: string[]; // Related blog post slugs
}

export interface ComparisonOption {
  name: string; // Option name (e.g., "Frameless Cabinets")
  description: string; // Brief description
  pros: string[]; // List of advantages
  cons: string[]; // List of disadvantages
  bestFor: string; // Who/what this option is best for
  priceRange?: string; // Optional price range
  image?: string; // Optional representative image
}

export interface ComparisonRow {
  feature: string; // Feature being compared
  option1: string | boolean; // Option 1 value (string or checkmark)
  option2: string | boolean; // Option 2 value
  important?: boolean; // Flag to highlight important rows
}

// Predefined comparison types for type safety
export type ComparisonType =
  | 'frameless-vs-framed-cabinets'
  | 'custom-vs-semi-custom-cabinets'
  | 'melamine-vs-laminate-vs-acrylic'
  | 'cabinet-refacing-vs-replacement'
  | 'yudezign-vs-big-box-stores';
