/**
 * Structured Data (Schema.org) Generators
 *
 * Generates JSON-LD structured data for different page types.
 * This improves SEO and enables rich results in search engines.
 */

import type {
  LocationData,
  ServiceData,
  BlogPost,
  FAQ,
  ComparisonData
} from '../types';

/**
 * Generates LocalBusiness schema for location pages
 * Helps with local SEO and Google Maps integration
 */
export const generateLocalBusinessSchema = (location: LocationData) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `https://yudezign.com/locations/${location.slug}#business`,
  name: `YuDezign Custom Cabinets - ${location.name}`,
  description: location.metaDescription,
  url: `https://yudezign.com/locations/${location.slug}`,
  telephone: '+12815688000',
  priceRange: '$$-$$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: location.name,
    addressRegion: 'TX',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: location.coordinates.lat,
    longitude: location.coordinates.lng
  },
  areaServed: {
    '@type': 'City',
    name: `${location.name}, TX`
  },
  sameAs: [
    'https://www.facebook.com/yudezign',
    'https://www.instagram.com/yudezign'
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00'
  }
});

/**
 * Generates Service schema for service pages
 * Helps with service-related search queries
 */
export const generateServiceSchema = (service: ServiceData) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `https://yudezign.com/services/${service.slug}#service`,
  name: service.name,
  description: service.overview,
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://yudezign.com/#organization',
    name: 'YuDezign',
    telephone: '+12815688000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '13230 Murphy Rd, Ste 600',
      addressLocality: 'Stafford',
      addressRegion: 'TX',
      postalCode: '77477',
      addressCountry: 'US'
    }
  },
  areaServed: [
    { '@type': 'City', 'name': 'Houston, TX' },
    { '@type': 'City', 'name': 'Katy, TX' },
    { '@type': 'City', 'name': 'Sugar Land, TX' },
    { '@type': 'City', 'name': 'The Woodlands, TX' },
    { '@type': 'City', 'name': 'Pearland, TX' },
    { '@type': 'City', 'name': 'Cypress, TX' },
    { '@type': 'City', 'name': 'Stafford, TX' },
    { '@type': 'City', 'name': 'Missouri City, TX' },
    { '@type': 'City', 'name': 'Pasadena, TX' },
    { '@type': 'City', 'name': 'League City, TX' }
  ],
  serviceType: service.name,
  url: `https://yudezign.com/services/${service.slug}`
});

/**
 * Generates Product schema with price range for service pages
 * Helps with product-related search queries and pricing displays
 */
export const generateProductSchema = (service: ServiceData) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `https://yudezign.com/services/${service.slug}#product`,
  name: service.name,
  description: service.overview,
  image: service.heroImage,
  brand: {
    '@type': 'Brand',
    name: 'YuDezign'
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    price: service.pricingGuide[0]?.range || '$$-$$$',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      '@id': 'https://yudezign.com/#organization',
      name: 'YuDezign'
    }
  }
});

/**
 * Generates FAQPage schema for FAQ pages
 * Enables FAQ rich results in Google Search
 */
export const generateFAQSchema = (faqs: FAQ[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

/**
 * Generates Article schema for blog posts
 * Helps with article-related search queries and rich results
 */
export const generateArticleSchema = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': `https://yudezign.com/blog/${post.slug}#article`,
  headline: post.title,
  description: post.excerpt,
  image: post.heroImage,
  datePublished: post.date,
  dateModified: post.updatedDate || post.date,
  author: {
    '@type': 'Person',
    name: post.author,
    jobTitle: post.authorRole || 'Content Writer'
  },
  publisher: {
    '@type': 'Organization',
    '@id': 'https://yudezign.com/#organization',
    name: 'YuDezign',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yudezign.com/logo.png'
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://yudezign.com/blog/${post.slug}`
  },
  keywords: post.tags.join(', ')
});

/**
 * Generates BreadcrumbList schema for breadcrumb navigation
 * Helps Google understand site structure
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: { name: string; url: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
});

/**
 * Generates table schema for comparison pages
 * Helps with comparison-related search queries
 */
export const generateComparisonSchema = (comparison: ComparisonData) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `https://yudezign.com/vs/${comparison.slug}`,
  name: comparison.title,
  description: comparison.metaDescription,
  mainEntity: {
    '@type': 'Table',
    about: comparison.introduction
  }
});

/**
 * Generates Organization schema (global, for all pages)
 * This should be in index.html but can also be included on pages
 */
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://yudezign.com/#organization',
  name: 'YuDezign',
  url: 'https://yudezign.com',
  logo: 'https://yudezign.com/logo.png',
  description:
    'Premium European frameless custom cabinets in Houston. Kitchen cabinets, closets, vanities. 2-3 week turnaround, local manufacturing.',
  telephone: '+12815688000',
  email: 'info@yudezign.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '13230 Murphy Rd, Ste 600',
    addressLocality: 'Stafford',
    addressRegion: 'TX',
    postalCode: '77477',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.7604,
    longitude: -95.3698
  },
  sameAs: [
    'https://www.facebook.com/yudezign',
    'https://www.instagram.com/yudezign'
  ]
});

/**
 * Helper function to inject structured data into the page
 * Usage: Call this in useEffect with the generated schema
 */
export const injectStructuredData = (schema: object, id: string = 'page-schema') => {
  if (typeof window === 'undefined') return; // Server-side rendering guard

  // Remove existing schema with same ID
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  // Create new script element
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Helper to inject multiple schemas at once
 */
export const injectMultipleSchemas = (schemas: object[]) => {
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': schemas
  };
  injectStructuredData(combinedSchema, 'page-schemas');
};
