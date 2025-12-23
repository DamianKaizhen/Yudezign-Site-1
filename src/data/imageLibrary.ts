/**
 * Image Library
 * Central reference for all images used across the site
 * Organizes existing portfolio images for reuse in SEO pages
 */

export interface ImageAsset {
  url: string;
  alt: string;
  category: string;
  tags: string[];
  credit?: string;
}

export const imageLibrary: Record<string, ImageAsset[]> = {
  // Kitchen Cabinet Images
  kitchens: [
    {
      url: '/images/portfolio/kitchen-modern-white.jpg',
      alt: 'Modern white frameless kitchen cabinets in Houston home',
      category: 'kitchen',
      tags: ['modern', 'white', 'frameless', 'houston'],
    },
    {
      url: '/images/portfolio/kitchen-traditional-cherry.jpg',
      alt: 'Traditional cherry wood framed cabinets with crown molding',
      category: 'kitchen',
      tags: ['traditional', 'cherry', 'framed', 'luxury'],
    },
    {
      url: '/images/portfolio/kitchen-contemporary-gray.jpg',
      alt: 'Contemporary gray shaker cabinets with quartz countertops',
      category: 'kitchen',
      tags: ['contemporary', 'gray', 'shaker', 'quartz'],
    },
    {
      url: '/images/portfolio/kitchen-two-tone.jpg',
      alt: 'Two-tone kitchen cabinets: white uppers and navy blue island',
      category: 'kitchen',
      tags: ['two-tone', 'modern', 'navy', 'island'],
    },
    {
      url: '/images/portfolio/kitchen-acrylic-gloss.jpg',
      alt: 'High-gloss acrylic kitchen cabinets in modern Houston condo',
      category: 'kitchen',
      tags: ['acrylic', 'modern', 'high-gloss', 'condo'],
    },
  ],

  // Bathroom Vanity Images
  bathrooms: [
    {
      url: '/images/portfolio/bathroom-double-vanity.jpg',
      alt: 'Custom double vanity with marble countertop in master bathroom',
      category: 'bathroom',
      tags: ['vanity', 'double', 'marble', 'master-bath'],
    },
    {
      url: '/images/portfolio/bathroom-floating-vanity.jpg',
      alt: 'Modern floating bathroom vanity with integrated lighting',
      category: 'bathroom',
      tags: ['floating', 'modern', 'lighting', 'contemporary'],
    },
    {
      url: '/images/portfolio/bathroom-traditional-vanity.jpg',
      alt: 'Traditional bathroom vanity with raised panel doors',
      category: 'bathroom',
      tags: ['traditional', 'raised-panel', 'classic'],
    },
  ],

  // Closet System Images
  closets: [
    {
      url: '/images/portfolio/closet-walk-in-luxury.jpg',
      alt: 'Luxury walk-in closet system with glass doors and LED lighting',
      category: 'closet',
      tags: ['walk-in', 'luxury', 'glass-doors', 'LED'],
    },
    {
      url: '/images/portfolio/closet-reach-in-organized.jpg',
      alt: 'Organized reach-in closet with custom shelving and drawers',
      category: 'closet',
      tags: ['reach-in', 'organized', 'shelving', 'drawers'],
    },
    {
      url: '/images/portfolio/closet-master-suite.jpg',
      alt: 'Master bedroom closet with island and seating area',
      category: 'closet',
      tags: ['master', 'island', 'seating', 'luxury'],
    },
  ],

  // Home Office Images
  homeOffice: [
    {
      url: '/images/portfolio/office-built-in-desk.jpg',
      alt: 'Custom built-in desk with overhead cabinets and shelving',
      category: 'office',
      tags: ['built-in', 'desk', 'shelving', 'storage'],
    },
    {
      url: '/images/portfolio/office-wall-unit.jpg',
      alt: 'Wall-to-wall office cabinetry with integrated workspace',
      category: 'office',
      tags: ['wall-unit', 'workspace', 'storage'],
    },
  ],

  // Garage Cabinet Images
  garage: [
    {
      url: '/images/portfolio/garage-cabinets-system.jpg',
      alt: 'Complete garage cabinet system with workbench and slatwall',
      category: 'garage',
      tags: ['garage', 'workbench', 'slatwall', 'organization'],
    },
    {
      url: '/images/portfolio/garage-storage-wall.jpg',
      alt: 'Garage storage wall with cabinets and overhead racks',
      category: 'garage',
      tags: ['storage', 'overhead', 'organization'],
    },
  ],

  // Entertainment Center Images
  entertainment: [
    {
      url: '/images/portfolio/entertainment-center-modern.jpg',
      alt: 'Modern entertainment center with floating cabinets',
      category: 'entertainment',
      tags: ['modern', 'floating', 'media'],
    },
    {
      url: '/images/portfolio/entertainment-built-in.jpg',
      alt: 'Built-in entertainment center with fireplace integration',
      category: 'entertainment',
      tags: ['built-in', 'fireplace', 'traditional'],
    },
  ],

  // Murphy Bed Images
  murphyBed: [
    {
      url: '/images/portfolio/murphy-bed-office.jpg',
      alt: 'Murphy bed with integrated office desk and shelving',
      category: 'murphy-bed',
      tags: ['murphy-bed', 'office', 'multi-functional'],
    },
  ],

  // Laundry Room Images
  laundry: [
    {
      url: '/images/portfolio/laundry-cabinets.jpg',
      alt: 'Laundry room cabinets with folding counter and storage',
      category: 'laundry',
      tags: ['laundry', 'storage', 'folding-counter'],
    },
  ],

  // Detail Shots (hardware, finishes, features)
  details: [
    {
      url: '/images/portfolio/detail-soft-close-hinge.jpg',
      alt: 'Blum soft-close hinge detail on cabinet door',
      category: 'detail',
      tags: ['hardware', 'soft-close', 'hinge'],
    },
    {
      url: '/images/portfolio/detail-dovetail-drawer.jpg',
      alt: 'Dovetail drawer construction detail showing quality craftsmanship',
      category: 'detail',
      tags: ['drawer', 'dovetail', 'construction'],
    },
    {
      url: '/images/portfolio/detail-pull-out-organizer.jpg',
      alt: 'Pull-out spice rack organizer in kitchen cabinet',
      category: 'detail',
      tags: ['organizer', 'pull-out', 'storage'],
    },
    {
      url: '/images/portfolio/detail-glass-door.jpg',
      alt: 'Frameless glass cabinet door with LED interior lighting',
      category: 'detail',
      tags: ['glass-door', 'LED', 'lighting'],
    },
  ],

  // Before & After
  beforeAfter: [
    {
      url: '/images/portfolio/before-after-kitchen-katy.jpg',
      alt: 'Kitchen renovation before and after in Katy, Texas',
      category: 'before-after',
      tags: ['katy', 'kitchen', 'renovation', 'transformation'],
    },
    {
      url: '/images/portfolio/before-after-bathroom-houston.jpg',
      alt: 'Master bathroom vanity transformation in Houston',
      category: 'before-after',
      tags: ['houston', 'bathroom', 'vanity', 'transformation'],
    },
  ],

  // Location-Specific Images (to be used in location pages)
  locationHero: [
    {
      url: '/images/locations/houston-skyline.jpg',
      alt: 'Houston skyline from Memorial Park',
      category: 'location',
      tags: ['houston', 'skyline', 'hero'],
    },
    {
      url: '/images/locations/katy-neighborhood.jpg',
      alt: 'Katy family neighborhood with modern homes',
      category: 'location',
      tags: ['katy', 'neighborhood', 'hero'],
    },
    {
      url: '/images/locations/sugar-land-homes.jpg',
      alt: 'Sugar Land luxury homes and tree-lined streets',
      category: 'location',
      tags: ['sugar-land', 'luxury', 'hero'],
    },
    {
      url: '/images/locations/the-woodlands-forest.jpg',
      alt: 'The Woodlands forest preserve and residential area',
      category: 'location',
      tags: ['the-woodlands', 'forest', 'hero'],
    },
  ],

  // Showroom Images
  showroom: [
    {
      url: '/images/showroom/exterior.jpg',
      alt: 'YuDezign showroom exterior in Houston',
      category: 'showroom',
      tags: ['exterior', 'showroom', 'houston'],
    },
    {
      url: '/images/showroom/kitchen-displays.jpg',
      alt: 'Kitchen cabinet displays in YuDezign showroom',
      category: 'showroom',
      tags: ['kitchen', 'displays', 'showroom'],
    },
    {
      url: '/images/showroom/door-samples.jpg',
      alt: 'Cabinet door and finish samples on display',
      category: 'showroom',
      tags: ['samples', 'doors', 'finishes'],
    },
    {
      url: '/images/showroom/design-center.jpg',
      alt: 'Design consultation area in showroom',
      category: 'showroom',
      tags: ['design-center', 'consultation'],
    },
  ],
};

// Helper Functions

/**
 * Get images by category
 */
export const getImagesByCategory = (category: string): ImageAsset[] => {
  return imageLibrary[category] || [];
};

/**
 * Get images by tag
 */
export const getImagesByTag = (tag: string): ImageAsset[] => {
  const allImages: ImageAsset[] = [];
  Object.values(imageLibrary).forEach(images => {
    images.forEach(image => {
      if (image.tags.includes(tag)) {
        allImages.push(image);
      }
    });
  });
  return allImages;
};

/**
 * Get random image from category
 */
export const getRandomImage = (category: string): ImageAsset | null => {
  const images = getImagesByCategory(category);
  if (images.length === 0) return null;
  return images[Math.floor(Math.random() * images.length)];
};

/**
 * Get first image matching tags
 */
export const getImageByTags = (tags: string[]): ImageAsset | null => {
  const allImages: ImageAsset[] = [];
  Object.values(imageLibrary).forEach(images => {
    images.forEach(image => {
      const matchCount = tags.filter(tag => image.tags.includes(tag)).length;
      if (matchCount > 0) {
        allImages.push(image);
      }
    });
  });

  // Sort by number of matching tags
  allImages.sort((a, b) => {
    const aMatches = tags.filter(tag => a.tags.includes(tag)).length;
    const bMatches = tags.filter(tag => b.tags.includes(tag)).length;
    return bMatches - aMatches;
  });

  return allImages[0] || null;
};

/**
 * Get placeholder image for development
 */
export const getPlaceholderImage = (width: number = 800, height: number = 600, text: string = 'Cabinet Image'): string => {
  return `https://via.placeholder.com/${width}x${height}/2c3e50/ffffff?text=${encodeURIComponent(text)}`;
};
