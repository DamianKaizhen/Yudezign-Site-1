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
  imageUrl: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://yudezign.com/blog#article',
  headline: params.title,
  description: params.description,
  image: params.imageUrl,
  author: {
    '@type': 'Person',
    name: params.author
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
  dateModified: params.publishedDate
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
