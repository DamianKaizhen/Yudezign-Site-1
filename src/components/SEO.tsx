import { useEffect } from 'react';
import { DEFAULT_OG_IMAGE, SITE_URL } from '../data/brand';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  image?: string;
  url?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'place' | 'service';
  structuredData?: object | object[] | null;
  /** Keep this page out of search results. Used by the private sales portal. */
  noindex?: boolean;
  // Article-specific props (for blog posts)
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEO = ({
  title = 'YuDezign - Custom European Frameless Cabinets | Houston',
  description = 'Premium custom European frameless cabinets manufactured in Houston. Kitchen cabinets, closets, vanities & custom cabinetry. 3/4" plywood construction, 20 standard colors, lead times from as little as two weeks. Supply-only pricing.',
  keywords = 'european cabinets, frameless cabinets, custom cabinets houston, kitchen cabinets, closet cabinets, vanities, cabinet supply, houston cabinetry, plywood cabinets, luxury cabinets',
  image = DEFAULT_OG_IMAGE,
  ogImage,
  url,
  canonical,
  ogType,
  type = 'website',
  structuredData,
  article,
  noindex = false,
}: SEOProps) => {
  const siteTitle = /yudezign/i.test(title) ? title : `${title} | YuDezign`;
  // Use ogImage if provided, otherwise fall back to image prop. Social crawlers
  // need an absolute URL, so a site-relative path is resolved against the origin.
  const rawImage = ogImage || image;
  const effectiveImage = rawImage.startsWith('/') ? `${SITE_URL}${rawImage}` : rawImage;
  // Honour ogType (pages pass it) over type. Only values Open Graph knows are
  // emitted; 'place' and 'service' are not valid og:type values.
  const requestedType = ogType || type;
  const effectiveType = ['website', 'article', 'profile', 'product', 'book'].includes(requestedType)
    ? requestedType
    : 'website';

  useEffect(() => {
    // Update document title
    document.title = siteTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, useProperty = false) => {
      const attribute = useProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    updateMetaTag('title', siteTitle);
    updateMetaTag('description', description);
    updateMetaTag('keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);

    // A page that supplies neither url nor canonical canonicalises to its own
    // path (never the home page). Query string and hash are dropped.
    const path = window.location.pathname.replace(/\/+$/, '');
    const resolvedUrl = canonical || url || `${SITE_URL}${path}`;

    // Open Graph / Facebook
    updateMetaTag('og:type', effectiveType, true);
    updateMetaTag('og:url', resolvedUrl, true);
    updateMetaTag('og:title', siteTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', effectiveImage, true);
    updateMetaTag('og:site_name', 'YuDezign', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Article-specific Open Graph tags (for blog posts)
    if (effectiveType === 'article' && article) {
      if (article.publishedTime) {
        updateMetaTag('article:published_time', article.publishedTime, true);
      }
      if (article.modifiedTime) {
        updateMetaTag('article:modified_time', article.modifiedTime, true);
      }
      if (article.author) {
        updateMetaTag('article:author', article.author, true);
      }
      if (article.section) {
        updateMetaTag('article:section', article.section, true);
      }
      if (article.tags && article.tags.length > 0) {
        // Add first few tags as article:tag meta elements
        article.tags.slice(0, 5).forEach((tag, index) => {
          updateMetaTag(`article:tag:${index}`, tag, true);
        });
      }
    }

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', resolvedUrl, true);
    updateMetaTag('twitter:title', siteTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', effectiveImage, true);

    // Additional SEO tags
    updateMetaTag('robots', noindex ? 'noindex, nofollow, noarchive' : 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('author', 'YuDezign');

    // Geo tags for local Houston business. geo.position / ICBM were downtown
    // Houston, not the showroom address, so they are omitted until the real
    // coordinates are supplied.
    updateMetaTag('geo.region', 'US-TX');
    updateMetaTag('geo.placename', 'Houston');

    // Canonical link — prefer the explicit canonical prop, fall back to url.
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', resolvedUrl);

    // Structured Data (JSON-LD). Always drop the previous page's block first so a
    // page that supplies none does not inherit a stale one.
    document.getElementById('page-schema')?.remove();

    const blocks = (Array.isArray(structuredData) ? structuredData : [structuredData]).filter(
      (b): b is object => !!b && typeof b === 'object'
    );
    if (blocks.length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-schema';

      // Several blocks go into one @graph; the shared @context moves to the top.
      const stripContext = (b: object) => {
        const { ['@context']: _ctx, ...rest } = b as Record<string, unknown>;
        void _ctx;
        return rest;
      };
      const schemaContent =
        blocks.length === 1 && !Array.isArray(structuredData)
          ? blocks[0]
          : { '@context': 'https://schema.org', '@graph': blocks.map(stripContext) };

      script.textContent = JSON.stringify(schemaContent);
      document.head.appendChild(script);
    }
  }, [siteTitle, description, keywords, effectiveImage, url, canonical, effectiveType, structuredData, article, noindex]);

  return null; // This component doesn't render anything
};

export default SEO;
