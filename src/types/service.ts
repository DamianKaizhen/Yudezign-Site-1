/**
 * Service Page Type Definitions
 *
 * Defines the structure for service/product detail pages.
 * Each service page targets specific product-related search queries.
 */

export interface ServiceData {
  slug: string; // URL-friendly identifier (e.g., 'kitchen-cabinets')
  name: string; // Display name (e.g., 'Kitchen Cabinets')

  // SEO Metadata
  metaTitle: string; // Page title for SEO
  metaDescription: string; // Meta description (150-160 chars)
  keywords: string[]; // Target keywords

  // Hero Section
  heroImage: string; // Hero background image URL
  icon: string; // Lucide icon name for service

  // Service Overview
  overview: string; // 2-3 sentence overview of the service
  longDescription?: string; // Optional longer description

  // Design Options
  designOptions: {
    title: string; // Option name (e.g., "Modern Minimalist")
    description: string; // Brief description
    image: string; // Image URL
  }[];

  // Materials & Finishes
  materials: string[]; // Available material options
  finishes?: {
    name: string;
    description: string;
    image?: string;
  }[];

  // Features & Benefits
  features: {
    icon: string; // Lucide icon name
    title: string;
    description: string;
  }[];

  // Process
  process: {
    step: number;
    title: string;
    description: string;
    duration?: string; // Optional time estimate (e.g., "1-2 days")
  }[];

  // Pricing Guide
  pricingGuide: {
    level: string; // 'Budget', 'Mid-Range', 'Premium', 'Luxury'
    range: string; // Price range (e.g., '$800-$1,200/linear ft')
    features: string[]; // What's included at this level
  }[];

  // FAQs
  faqs: {
    question: string;
    answer: string;
  }[];

  // Related Content
  relatedProjects: string[]; // Project IDs to showcase
  relatedServices?: string[]; // Related service slugs

  // Technical Specifications (optional)
  specifications?: {
    label: string;
    value: string;
  }[];

  // Houston-Specific Angle (optional)
  houstonAngle?: string; // Local market considerations (e.g., humidity for garage cabinets)
}

export interface PricingTier {
  level: string;
  range: string;
  features: string[];
  popular?: boolean; // Flag for "Most Popular" tier
}
