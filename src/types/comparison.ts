/**
 * Comparison Page Type Definitions
 *
 * Defines the structure for "VS" comparison pages.
 */

export interface ComparisonData {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  intro: string;
  winner?: string | null;
  comparisonTable: ComparisonRow[];
  detailedSections: {
    heading: string;
    content: string;
  }[];
  faqSection?: {
    question: string;
    answer: string;
  }[];
  relatedComparisons?: string[];
  relatedServices?: string[];
  seo: {
    keywords: string[];
    schema?: any;
  };
}

export interface ComparisonRow {
  feature: string;
  option1: string;
  option2: string;
  option3?: string; // For 3-way comparisons
}

// Predefined comparison types for type safety
export type ComparisonType =
  | 'frameless-vs-framed-cabinets'
  | 'custom-vs-semi-custom-cabinets'
  | 'melamine-vs-laminate-vs-acrylic'
  | 'cabinet-refacing-vs-replacement'
  | 'yudezign-vs-big-box-stores';
