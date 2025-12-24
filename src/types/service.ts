/**
 * Service Page Type Definitions
 *
 * Defines the structure for service/product detail pages.
 */

export interface ServiceData {
  slug: string;
  title: string;
  category: string;
  description: string;
  priceRange: string;
  features: string[];
  designOptions?: {
    style: string;
    description: string;
    features: string[];
  }[];
  materials?: {
    name: string;
    description: string;
    priceRange: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  relatedServices?: string[];
  seo: {
    title: string;
    metaDescription: string;
    keywords: string[];
  };
}
