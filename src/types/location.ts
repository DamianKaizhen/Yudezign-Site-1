/**
 * Location Page Type Definitions
 *
 * Defines the structure for location-specific pages targeting local SEO.
 */

export interface LocationData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroImage: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhoods: string[];
  [key: string]: any; // Allow additional properties
}

export interface NeighborhoodGroup {
  region: string; // Region name (e.g., "Inner Loop", "Southwest")
  neighborhoods: string[]; // List of neighborhoods in this region
}
