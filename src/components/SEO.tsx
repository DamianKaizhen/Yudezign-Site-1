import { useEffect } from 'react';

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
  description = 'Premium custom European frameless cabinets manufactured in Houston. Kitchen cabinets, closets, vanities & custom cabinetry. 3/4" plywood construction, 25+ finishes, 2-3 week turnaround. Supply-only pricing.',
  keywords = 'european cabinets, frameless cabinets, custom cabinets houston, kitchen cabinets, closet cabinets, vanities, cabinet supply, houston cabinetry, plywood cabinets, luxury cabinets',
  image = 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200&q=90',
  ogImage,
  url = 'https://www.yudezign.com',
  canonical,
  type = 'website',
  structuredData,
  article,
  noindex = false,
}: SEOProps) => {
  const siteTitle = title.includes('YuDezign') ? title : `${title} | YuDezign`;
  // Use ogImage if provided, otherwise fall back to image prop
  const effectiveImage = ogImage || image;

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

    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', siteTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', effectiveImage, true);
    updateMetaTag('og:site_name', 'YuDezign', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Article-specific Open Graph tags (for blog posts)
    if (type === 'article' && article) {
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
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:title', siteTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', effectiveImage, true);

    // Additional SEO tags
    updateMetaTag('robots', noindex ? 'noindex, nofollow, noarchive' : 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('author', 'YuDezign');

    // Geo tags for local Houston business
    updateMetaTag('geo.region', 'US-TX');
    updateMetaTag('geo.placename', 'Houston');
    updateMetaTag('geo.position', '29.7604;-95.3698');
    updateMetaTag('ICBM', '29.7604, -95.3698');

    // Canonical link — prefer the explicit canonical prop, fall back to url.
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical || url);

    // Structured Data (JSON-LD)
    if (structuredData) {
      // Remove existing page-specific schema
      const existingSchema = document.getElementById('page-schema');
      if (existingSchema) {
        existingSchema.remove();
      }

      // Create new schema script
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-schema';

      // Handle both single schema and array of schemas
      const schemaContent = Array.isArray(structuredData)
        ? { '@context': 'https://schema.org', '@graph': structuredData }
        : structuredData;

      script.textContent = JSON.stringify(schemaContent);
      document.head.appendChild(script);
    }
  }, [siteTitle, description, keywords, effectiveImage, url, canonical, type, structuredData, article, noindex]);

  return null; // This component doesn't render anything
};

export default SEO;
