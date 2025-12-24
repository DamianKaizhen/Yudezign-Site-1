/**
 * Location Data for SEO-Optimized Location Pages
 *
 * Contains detailed information for each city/area served in the Houston metro.
 * Each location targets local SEO keywords and provides city-specific content.
 *
 * Based on SEO research from docs/SEO OptimizedPagesResearch.md
 */

import type { LocationData } from '../types';

export const locations: LocationData[] = [
  {
    slug: 'houston',
    name: 'Houston',
    metaTitle: 'Custom Cabinets Houston TX | European Frameless | YuDezign',
    metaDescription:
      'Premium custom European frameless cabinets in Houston. Kitchen, closets, vanities. 2-3 week turnaround, local manufacturing. Serving Memorial, Heights, Montrose. Supply-only pricing.',
    keywords: [
      'custom cabinets houston',
      'frameless cabinets houston',
      'cabinet makers houston',
      'european cabinets houston',
      'kitchen cabinets houston',
      'custom closets houston'
    ],
    heroImage: 'https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=1920&q=90',
    coordinates: { lat: 29.7604, lng: -95.3698 },
    neighborhoods: [
      'Memorial',
      'River Oaks',
      'Heights',
      'Montrose',
      'Galleria',
      'Bellaire',
      'West University',
      'Museum District',
      'Rice Village',
      'Midtown'
    ],
    housingStyle:
      'Historic bungalows, modern townhomes, luxury high-rises, and traditional estates',
    keyPoints: [
      'Houston humidity expertise - engineered cores prevent wood expansion',
      'Space maximization for urban living - 10-15% more storage with frameless design',
      'Fast turnaround - 2-3 weeks vs 8-12 weeks for imported cabinets',
      'Local manufacturing - no shipping delays, personalized service'
    ],
    localAngle:
      'Houston cabinets built for 90% humidity. Moisture-resistant engineered cores prevent warping and cracking that solid wood experiences in our climate.',
    climateConsiderations:
      'Houston averages 75-90% humidity year-round. Our cabinet boxes use dimensionally stable MDF/plywood cores that won\'t expand with humidity changes, unlike solid wood which can swell enough to cause doors to rub.',
    projects: [], // Will be populated with actual project IDs
    mapImageUrl: '/images/maps/houston-map.png',
    googleMapsUrl: 'https://goo.gl/maps/YuDezignHouston',
    relatedLocations: ['katy', 'sugar-land', 'the-woodlands', 'memorial'],
    featuredServices: ['kitchen-cabinets', 'closet-systems', 'bathroom-vanities']
  },

  {
    slug: 'katy',
    name: 'Katy',
    metaTitle: 'Custom Cabinets Katy TX | Frameless Kitchen Cabinets | YuDezign',
    metaDescription:
      'Custom cabinets in Katy TX. Large family kitchens, oversized islands, durable finishes. Serving Cinco Ranch, Grand Lakes, Cross Creek Ranch. 2-3 week delivery.',
    keywords: [
      'custom cabinets katy tx',
      'frameless cabinets katy',
      'kitchen cabinets katy',
      'katy cabinet makers',
      'cinco ranch cabinets'
    ],
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=90',
    coordinates: { lat: 29.7858, lng: -95.8244 },
    neighborhoods: [
      'Cinco Ranch',
      'Grand Lakes',
      'Cross Creek Ranch',
      'Seven Meadows',
      'Katy Mills',
      'Cane Island'
    ],
    housingStyle:
      'Large-scale new construction and master-planned communities with open-concept great rooms',
    keyPoints: [
      'Oversized islands (10ft+) perfect for large family homes',
      'Durable laminate and acrylic finishes for active families',
      'Hidden pantries and mudroom storage - trending in new builds',
      'Quick installation - perfect for new construction timelines'
    ],
    localAngle:
      'Katy\'s master-planned communities demand quality cabinetry for resale value. Our custom solutions perfectly fit the large, open-concept spaces typical in Katy homes.',
    projects: [],
    mapImageUrl: '/images/maps/katy-map.png',
    googleMapsUrl: 'https://goo.gl/maps/KatyTX',
    relatedLocations: ['cypress', 'houston', 'sugar-land'],
    featuredServices: ['kitchen-cabinets', 'garage-cabinets', 'laundry-room-cabinets']
  },

  {
    slug: 'sugar-land',
    name: 'Sugar Land',
    metaTitle: 'Custom Cabinets Sugar Land TX | Luxury Frameless | YuDezign',
    metaDescription:
      'Luxury custom cabinets in Sugar Land. Modern transitional style, high-end finishes. Serving Telfair, Sweetwater, Commonwealth. Premium European frameless design.',
    keywords: [
      'custom cabinets sugar land',
      'sugar land cabinet makers',
      'luxury cabinets sugar land',
      'frameless cabinets sugar land'
    ],
    heroImage: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1920&q=90',
    coordinates: { lat: 29.6196, lng: -95.6349 },
    neighborhoods: [
      'Telfair',
      'Sweetwater',
      'Commonwealth',
      'Riverstone',
      'New Territory',
      'First Colony'
    ],
    housingStyle:
      'High-end new construction and luxury remodels with modern transitional aesthetics',
    keyPoints: [
      'Resale value focus - Sugar Land is a top Houston suburb for home values',
      'Modern transitional style dominance - sleek yet timeless designs',
      'Smart home integration - tech-ready cabinet solutions',
      'Premium finishes - high-gloss acrylic and natural wood veneers'
    ],
    localAngle:
      'Sugar Land homeowners invest in quality. Our European frameless cabinets deliver the modern luxury aesthetic that defines this affluent market.',
    projects: [],
    mapImageUrl: '/images/maps/sugar-land-map.png',
    googleMapsUrl: 'https://goo.gl/maps/SugarLandTX',
    relatedLocations: ['houston', 'missouri-city', 'stafford'],
    featuredServices: ['kitchen-cabinets', 'closet-systems', 'home-office-cabinets']
  },

  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    metaTitle: 'Custom Cabinets The Woodlands TX | Luxury European | YuDezign',
    metaDescription:
      'Luxury custom cabinets in The Woodlands. Nature-integrated design, earth-tone finishes. Serving Carlton Woods, Sterling Ridge. Premium European craftsmanship.',
    keywords: [
      'custom cabinets the woodlands',
      'the woodlands cabinet makers',
      'carlton woods cabinets',
      'luxury cabinets the woodlands'
    ],
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=90',
    coordinates: { lat: 30.1588, lng: -95.4613 },
    neighborhoods: [
      'Carlton Woods',
      'Sterling Ridge',
      'Grogan\'s Mill',
      'Indian Springs',
      'Alden Bridge',
      'Panther Creek'
    ],
    housingStyle:
      'Nature-integrated luxury homes and estates with multiple cabinet projects per home',
    keyPoints: [
      'Earth-tone finishes and natural wood looks blend with forested settings',
      'Large estates often need kitchen + study + butler\'s pantry solutions',
      'Golf course community homes require sophisticated entertaining spaces',
      'Premium high-gloss acrylic finishes and integrated LED lighting'
    ],
    localAngle:
      'The Woodlands\' natural luxury aesthetic calls for sophisticated cabinetry. Our custom designs complement the area\'s unique blend of nature and upscale living.',
    projects: [],
    mapImageUrl: '/images/maps/the-woodlands-map.png',
    googleMapsUrl: 'https://goo.gl/maps/TheWoodlandsTX',
    relatedLocations: ['spring', 'tomball', 'houston'],
    featuredServices: ['kitchen-cabinets', 'home-office-cabinets', 'entertainment-centers']
  },

  {
    slug: 'pearland',
    name: 'Pearland',
    metaTitle: 'Custom Cabinets Pearland TX | Affordable Quality | YuDezign',
    metaDescription:
      'Quality custom cabinets in Pearland TX. Budget-conscious options without compromising quality. Serving Shadow Creek Ranch, Silverlake. Fast 2-3 week turnaround.',
    keywords: [
      'custom cabinets pearland',
      'pearland cabinet makers',
      'shadow creek ranch cabinets',
      'affordable cabinets pearland'
    ],
    heroImage: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1920&q=90',
    coordinates: { lat: 29.5636, lng: -95.2861 },
    neighborhoods: [
      'Shadow Creek Ranch',
      'Silverlake',
      'Southdown',
      'Country Place',
      'Silver Creek',
      'Pearland Town Center'
    ],
    housingStyle: 'Growing suburban market with new construction and young families',
    keyPoints: [
      'Value-tier custom options - quality without luxury pricing',
      'Perfect for first-time homeowners upgrading from builder-grade',
      'New construction partnerships with local builders',
      'Budget-friendly melamine and laminate finishes'
    ],
    localAngle:
      'Pearland\'s growing market deserves quality cabinetry at fair prices. We offer value-tier custom solutions that beat big-box quality.',
    projects: [],
    mapImageUrl: '/images/maps/pearland-map.png',
    googleMapsUrl: 'https://goo.gl/maps/PearlandTX',
    relatedLocations: ['houston', 'friendswood', 'league-city'],
    featuredServices: ['kitchen-cabinets', 'closet-systems', 'garage-cabinets']
  },

  {
    slug: 'cypress',
    name: 'Cypress',
    metaTitle: 'Custom Cabinets Cypress TX | Modern Farmhouse | YuDezign',
    metaDescription:
      'Custom cabinets in Cypress TX. Modern farmhouse style, large lots, outdoor kitchen integration. Serving Bridgeland, Cypress Creek Lakes. European frameless quality.',
    keywords: [
      'custom cabinets cypress tx',
      'cypress cabinet makers',
      'bridgeland cabinets',
      'modern farmhouse cabinets'
    ],
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=90',
    coordinates: { lat: 29.9691, lng: -95.6972 },
    neighborhoods: [
      'Bridgeland',
      'Cypress Creek Lakes',
      'Fairfield',
      'Towne Lake',
      'Blackhorse Ranch',
      'Cypress Park'
    ],
    housingStyle:
      'Explosive growth area with modern farmhouse style and large lots with oversized kitchens',
    keyPoints: [
      'Modern farmhouse aesthetic - shaker doors, neutral tones',
      'Oversized kitchens on large lots require extensive cabinetry',
      'Outdoor kitchen integration - weather-resistant options',
      'Family-focused storage solutions - deep pantries, mudrooms'
    ],
    localAngle:
      'Cypress\' rapid growth brings modern farmhouse design trends. Our custom cabinets deliver the perfect blend of rustic charm and contemporary function.',
    projects: [],
    mapImageUrl: '/images/maps/cypress-map.png',
    googleMapsUrl: 'https://goo.gl/maps/CypressTX',
    relatedLocations: ['katy', 'tomball', 'houston'],
    featuredServices: ['kitchen-cabinets', 'mudroom-cabinets', 'outdoor-kitchen']
  },

  {
    slug: 'memorial',
    name: 'Memorial',
    metaTitle: 'Custom Cabinets Memorial Houston | Luxury Renovation | YuDezign',
    metaDescription:
      'Luxury custom cabinets in Memorial Houston. High-end renovations, traditional + modern fusion. Serving Memorial Villages, Bunker Hill. Premium European frameless.',
    keywords: [
      'custom cabinets memorial houston',
      'memorial villages cabinets',
      'luxury cabinets memorial',
      'bunker hill cabinets'
    ],
    heroImage: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&q=90',
    coordinates: { lat: 29.7752, lng: -95.5201 },
    neighborhoods: [
      'Memorial Villages',
      'Bunker Hill Village',
      'Piney Point Village',
      'Hunters Creek Village',
      'Spring Valley'
    ],
    housingStyle:
      'Luxury renovation market - older homes with high budgets for modern updates',
    keyPoints: [
      'High-end finishes - premium acrylic/laminate, integrated LED lighting',
      'Traditional + modern fusion - inset cabinetry meets sleek hardware',
      'Architect collaboration experience for custom estate projects',
      'Premium features - soft-close, full-extension drawers, custom inserts'
    ],
    localAngle:
      'Memorial\'s established luxury homes demand sophisticated renovations. Our European frameless cabinets bring modern elegance to traditional spaces.',
    projects: [],
    mapImageUrl: '/images/maps/memorial-map.png',
    googleMapsUrl: 'https://goo.gl/maps/MemorialHouston',
    relatedLocations: ['river-oaks', 'houston', 'galleria'],
    featuredServices: ['kitchen-cabinets', 'bathroom-vanities', 'butler-pantry']
  },

  {
    slug: 'river-oaks',
    name: 'River Oaks',
    metaTitle: 'Custom Cabinets River Oaks Houston | Ultra-Luxury | YuDezign',
    metaDescription:
      'Ultra-luxury custom cabinets in River Oaks. Historic estate restorations, bespoke design. Architect collaboration. Premium European frameless craftsmanship.',
    keywords: [
      'custom cabinets river oaks',
      'luxury cabinets river oaks',
      'river oaks cabinet makers',
      'ultra-luxury cabinets houston'
    ],
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90',
    coordinates: { lat: 29.7489, lng: -95.4226 },
    neighborhoods: [
      'River Oaks',
      'Afton Oaks',
      'Sunset Boulevard area'
    ],
    housingStyle:
      'Historic estate restorations and ultra-luxury new construction',
    keyPoints: [
      'Bespoke design consultations - every detail customized',
      'Architect collaboration - we work with Houston\'s top design firms',
      'Premium materials showcase - exotic woods, hand-applied finishes',
      'Inset cabinetry for traditional luxury aesthetic'
    ],
    localAngle:
      'River Oaks represents Houston\'s pinnacle of luxury living. Our bespoke cabinetry meets the exacting standards of this prestigious neighborhood.',
    projects: [],
    mapImageUrl: '/images/maps/river-oaks-map.png',
    googleMapsUrl: 'https://goo.gl/maps/RiverOaksHouston',
    relatedLocations: ['memorial', 'west-university', 'houston'],
    featuredServices: ['kitchen-cabinets', 'wine-room', 'butler-pantry']
  },

  {
    slug: 'galleria',
    name: 'Galleria',
    metaTitle: 'Custom Cabinets Galleria Houston | Urban Luxury | YuDezign',
    metaDescription:
      'Urban luxury cabinets in Galleria Houston. High-rise condos, space optimization, contemporary European. Serving Uptown, Post Oak. Frameless design for maximum storage.',
    keywords: [
      'custom cabinets galleria houston',
      'uptown cabinets houston',
      'high rise cabinets',
      'luxury condo cabinets'
    ],
    heroImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=90',
    coordinates: { lat: 29.7372, lng: -95.4618 },
    neighborhoods: [
      'Galleria',
      'Uptown Park',
      'Post Oak',
      'Greenway Plaza'
    ],
    housingStyle:
      'High-rise luxury condos and townhomes requiring space optimization',
    keyPoints: [
      'Frameless cabinets provide 10-15% more storage - crucial for urban spaces',
      'Contemporary European aesthetics match high-rise modern interiors',
      'Quick turnaround perfect for condo renovation restrictions',
      'Sleek handleless options for minimalist urban design'
    ],
    localAngle:
      'Galleria\'s urban luxury demands smart space solutions. Our frameless European cabinets maximize every inch while delivering sophisticated style.',
    projects: [],
    mapImageUrl: '/images/maps/galleria-map.png',
    googleMapsUrl: 'https://goo.gl/maps/GalleriaHouston',
    relatedLocations: ['river-oaks', 'memorial', 'houston'],
    featuredServices: ['kitchen-cabinets', 'closet-systems', 'murphy-beds']
  },

  {
    slug: 'west-university',
    name: 'West University',
    metaTitle: 'Custom Cabinets West University | Family-Focused | YuDezign',
    metaDescription:
      'Quality custom cabinets in West University Houston. Family-oriented professionals, timeless design for resale. Walk-to-school neighborhoods value quality craftsmanship.',
    keywords: [
      'custom cabinets west university',
      'west u cabinets',
      'rice village cabinets',
      'family cabinets houston'
    ],
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=90',
    coordinates: { lat: 29.7166, lng: -95.4352 },
    neighborhoods: [
      'West University Place',
      'Southgate',
      'Rice Military',
      'Rice Village area'
    ],
    housingStyle:
      'Traditional homes with modern updates for family-oriented professionals',
    keyPoints: [
      'Timeless design for resale value - West U homes turn over frequently',
      'Family-focused functionality - homework nooks, organized pantries',
      'Rice University area appeal - sophisticated yet practical',
      'Traditional + transitional styles blend well with neighborhood character'
    ],
    localAngle:
      'West University families value quality and longevity. Our cabinetry delivers timeless style that appeals to the next homeowner while serving your family today.',
    projects: [],
    mapImageUrl: '/images/maps/west-university-map.png',
    googleMapsUrl: 'https://goo.gl/maps/WestUniversityHouston',
    relatedLocations: ['rice-village', 'houston', 'bellaire'],
    featuredServices: ['kitchen-cabinets', 'mudroom-cabinets', 'homework-station']
  }
];

// Helper function to get a location by slug
export const getLocationBySlug = (slug: string): LocationData | undefined => {
  return locations.find(loc => loc.slug === slug);
};

// Helper function to get all location slugs (for routing)
export const getAllLocationSlugs = (): string[] => {
  return locations.map(loc => loc.slug);
};

// Helper function to get nearby locations
export const getNearbyLocations = (slug: string): LocationData[] => {
  const location = getLocationBySlug(slug);
  if (!location || !location.relatedLocations) return [];

  return location.relatedLocations
    .map((relatedSlug: string) => getLocationBySlug(relatedSlug))
    .filter((loc: LocationData | undefined): loc is LocationData => loc !== undefined);
};
