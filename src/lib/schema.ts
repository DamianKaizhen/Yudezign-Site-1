/**
 * Structured Data (Schema.org) Generators
 *
 * Generates JSON-LD structured data for different page types.
 */

// Simplified schema generators that accept direct parameters

export const generateLocalBusinessSchema = (params: {
  name: string;
  address: string;
  phone: string;
  hours: string;
  priceRange: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://yudezign.com/#organization',
  name: params.name,
  url: 'https://yudezign.com',
  telephone: params.phone,
  priceRange: params.priceRange,
  address: {
    '@type': 'PostalAddress',
    streetAddress: params.address,
    addressRegion: 'TX',
    addressCountry: 'US'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    opens: '09:00',
    closes: '18:00'
  }
});

export const generateServiceSchema = (params: {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  priceRange: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: params.name,
  description: params.description,
  provider: {
    '@type': 'Organization',
    name: params.provider
  },
  areaServed: {
    '@type': 'City',
    name: params.areaServed
  },
  priceRange: params.priceRange
});

export const generateArticleSchema = (params: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  imageUrl: string;
  canonicalUrl?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': params.canonicalUrl ? `${params.canonicalUrl}#article` : 'https://yudezign.com/blog#article',
  headline: params.title,
  description: params.description,
  image: params.imageUrl,
  author: {
    '@type': 'Person',
    name: params.author,
    url: 'https://yudezign.com/about'
  },
  publisher: {
    '@type': 'Organization',
    name: 'YuDezign',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yudezign.com/logo.png'
    }
  },
  datePublished: params.publishedDate,
  dateModified: params.modifiedDate || params.publishedDate,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': params.canonicalUrl || 'https://yudezign.com/blog'
  },
  ...(params.category && { articleSection: params.category }),
  ...(params.tags && { keywords: params.tags.join(', ') }),
  ...(params.wordCount && { wordCount: params.wordCount })
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
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
