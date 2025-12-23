/**
 * Location Page Type Definitions
 *
 * Defines the structure for location-specific pages targeting local SEO.
 * Each location page represents a city/area served in the Houston metro.
 */

export interface LocationData {
  slug: string; // URL-friendly identifier (e.g., 'houston', 'katy')
  name: string; // Display name (e.g., 'Houston', 'Katy')

  // SEO Metadata
  metaTitle: string; // Page title for SEO
  metaDescription: string; // Meta description (150-160 chars)
  keywords: string[]; // Target keywords for this location

  // Hero Section
  heroImage: string; // Hero background image URL
  heroHeading?: string; // Optional custom heading (defaults to "Custom Cabinets in {name}")
  heroSubheading?: string; // Optional custom subheading

  // Geographic Data
  coordinates: {
    lat: number; // Latitude for map and schema
    lng: number; // Longitude for map and schema
  };

  // Location Details
  neighborhoods: string[]; // List of neighborhoods/areas served
  housingStyle: string; // Description of typical housing in this area
  keyPoints: string[]; // 3-4 key selling points for this location

  // Content Sections
  localAngle?: string; // Optional unique angle for this market (e.g., "Houston humidity expertise")
  climateConsiderations?: string; // Optional climate-specific information

  // Related Content
  projects: string[]; // Project IDs to feature from this location
  testimonial?: {
    name: string;
    role: string;
    content: string;
    rating: number;
  };

  // Map Integration
  mapImageUrl: string; // Static map image path
  googleMapsUrl: string; // Link to Google Maps for directions

  // Internal Linking
  relatedLocations?: string[]; // Slugs of nearby locations to link to
  featuredServices?: string[]; // Service slugs to highlight (e.g., ['kitchen-cabinets', 'closets'])
}

export interface NeighborhoodGroup {
  region: string; // Region name (e.g., "Inner Loop", "Southwest")
  neighborhoods: string[]; // List of neighborhoods in this region
}
