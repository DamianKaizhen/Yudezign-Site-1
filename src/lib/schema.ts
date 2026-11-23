/**
 * Structured Data (Schema.org) Generators
 *
 * Generates JSON-LD structured data for different page types.
 */

import { BUSINESS, DEFAULT_OG_IMAGE, LOGO_WORDMARK_PNG, SITE_URL } from '../data/brand';
import { siteSettings } from '../data/siteSettings';
import { blogPosts } from '../data/blogPosts';

/** Absolute URL for a site-relative path (leaves absolute URLs alone). */
export const absoluteUrl = (path: string): string =>
  /^https?:\/\//i.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

/** The business's postal address, shared by every LocalBusiness node. */
const postalAddress = () => ({
  '@type': 'PostalAddress',
  ...BUSINESS.address,
});

/** Profile URLs from siteSettings, ignoring bare-domain placeholders such as https://facebook.com. */
export const socialProfileUrls = (): string[] =>
  Object.values(siteSettings.socialLinks)
    .filter((u): u is string => !!u)
    .filter((u) => {
      try {
        return new URL(u).pathname.replace(/\//g, '').length > 0;
      } catch {
        return false;
      }
    });

/** Reference to the site-wide LocalBusiness node defined in index.html. */
export const ORGANIZATION_REF = { '@id': `${SITE_URL}/#organization` };

// Simplified schema generators that accept direct parameters

export const generateLocalBusinessSchema = (params: {
  name: string;
  phone: string;
  hours: string;
  priceRange: string;
  /** City / area this page is about. Rendered as areaServed, never as a street address. */
  areaServed?: string;
  /** Stable id for this node. Defaults to the site-wide organisation id. */
  id?: string;
  url?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': params.id || `${SITE_URL}/#organization`,
  name: params.name,
  url: params.url || SITE_URL,
  telephone: params.phone,
  priceRange: params.priceRange,
  address: postalAddress(),
  ...(params.areaServed && {
    areaServed: { '@type': 'City', name: `${params.areaServed}, TX` },
  }),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    opens: '09:00',
    closes: '17:30'
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
  /** Ignored: articles are always authored by the organisation. Kept for call-site compatibility. */
  author?: string;
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
  '@id': params.canonicalUrl ? `${params.canonicalUrl}#article` : 'https://www.yudezign.com/blog#article',
  headline: params.title,
  description: params.description,
  image: params.imageUrl ? absoluteUrl(params.imageUrl) : DEFAULT_OG_IMAGE,
  author: {
    '@type': 'Organization',
    name: BUSINESS.name,
    url: SITE_URL
  },
  publisher: {
    '@type': 'Organization',
    name: BUSINESS.name,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${LOGO_WORDMARK_PNG}`
    }
  },
  datePublished: params.publishedDate,
  dateModified: params.modifiedDate || params.publishedDate,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': params.canonicalUrl || 'https://www.yudezign.com/blog'
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

/** Article JSON-LD for a post defined in blogPosts.ts (hard-coded posts and the generic BlogPost page). */
export const generateBlogArticleSchema = (slug: string) => {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  return generateArticleSchema({
    title: post.title,
    description: post.seo.metaDescription,
    publishedDate: post.publishedDate,
    modifiedDate: post.updatedDate,
    imageUrl: post.featuredImage?.url || DEFAULT_OG_IMAGE,
    canonicalUrl: `${SITE_URL}/blog/${post.slug}`,
    category: post.category,
    tags: post.tags,
  });
};

/** Article + BreadcrumbList (Home > Blog > post) for a blog post. */
export const generateBlogPostSchemas = (slug: string): object[] => {
  const post = blogPosts.find((p) => p.slug === slug);
  const article = generateBlogArticleSchema(slug);
  if (!post || !article) return [];
  return [
    article,
    generateBreadcrumbSchema([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
    ]),
  ];
};

/** Breadcrumb trail ending at the current page, built from site-relative paths. */
export const generateTrailSchema = (trail: Array<{ name: string; path: string }>) =>
  generateBreadcrumbSchema([
    { name: 'Home', url: `${SITE_URL}/` },
    ...trail.map((t) => ({ name: t.name, url: absoluteUrl(t.path) })),
  ]);

export const generateItemListSchema = (
  items: Array<{ name: string; url: string; image?: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.url),
    ...(item.image && { image: absoluteUrl(item.image) }),
  })),
});

/** AboutPage / ContactPage / CollectionPage wrapper. */
export const generateWebPageSchema = (params: {
  type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  name: string;
  description: string;
  path: string;
  mainEntity?: object;
}) => ({
  '@context': 'https://schema.org',
  '@type': params.type,
  '@id': `${absoluteUrl(params.path)}#webpage`,
  url: absoluteUrl(params.path),
  name: params.name,
  description: params.description,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: ORGANIZATION_REF,
  ...(params.mainEntity && { mainEntity: params.mainEntity }),
});

/** Organization node for /about. Shares the site-wide @id so it merges with the index.html LocalBusiness. */
export const generateOrganizationSchema = (description: string) => {
  const sameAs = socialProfileUrls();
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    url: SITE_URL,
    description,
    telephone: BUSINESS.phoneE164,
    address: postalAddress(),
    logo: `${SITE_URL}${LOGO_WORDMARK_PNG}`,
    ...(sameAs.length > 0 && { sameAs }),
  };
};
