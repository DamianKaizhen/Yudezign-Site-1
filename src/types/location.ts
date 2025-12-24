/**
 * Location Page Type Definitions
 *
 * Defines the structure for location-specific pages targeting local SEO.
 */

export interface LocationData {
  slug: string;
  city: string;
  zipCode: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhoods: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  relatedLocations?: string[];
  seo: {
    title: string;
    metaDescription: string;
    keywords: string[];
    h2Heading: string;
    content: string;
  };
}

export interface NeighborhoodGroup {
  region: string; // Region name (e.g., "Inner Loop", "Southwest")
  neighborhoods: string[]; // List of neighborhoods in this region
}
