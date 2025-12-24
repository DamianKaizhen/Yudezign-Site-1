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
}

const SEO = ({
  title = 'YuDezign - Custom European Frameless Cabinets | Houston',
  description = 'Premium custom European frameless cabinets manufactured in Houston. Kitchen cabinets, closets, vanities & custom cabinetry. 3/4" plywood construction, 25+ finishes, 2-3 week turnaround. Supply-only pricing.',
  keywords = 'european cabinets, frameless cabinets, custom cabinets houston, kitchen cabinets, closet cabinets, vanities, cabinet supply, houston cabinetry, plywood cabinets, luxury cabinets',
  image = 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200&q=90',
  url = 'https://yudezign.com',
  type = 'website',
  structuredData,
}: SEOProps) => {
  const siteTitle = title.includes('YuDezign') ? title : `${title} | YuDezign`;

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
    updateMetaTag('keywords', keywords);

    // Open Graph / Facebook
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', siteTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'YuDezign', true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:title', siteTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('author', 'YuDezign');

    // Geo tags for local Houston business
    updateMetaTag('geo.region', 'US-TX');
    updateMetaTag('geo.placename', 'Houston');
    updateMetaTag('geo.position', '29.7604;-95.3698');
    updateMetaTag('ICBM', '29.7604, -95.3698');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

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
  }, [siteTitle, description, keywords, image, url, type, structuredData]);

  return null; // This component doesn't render anything
};

export default SEO;
