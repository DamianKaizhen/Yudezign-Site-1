import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEO = ({
  title = 'YuDeZign - Custom European Frameless Cabinets | Houston',
  description = 'Premium custom European frameless cabinets manufactured in Houston. Kitchen cabinets, closets, vanities & custom cabinetry. 3/4" plywood construction, 25+ finishes, 2-3 week turnaround. Supply-only pricing.',
  keywords = 'european cabinets, frameless cabinets, custom cabinets houston, kitchen cabinets, closet cabinets, vanities, cabinet supply, houston cabinetry, plywood cabinets, luxury cabinets',
  image = 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200&q=90',
  url = 'https://yudezign.com',
  type = 'website',
}: SEOProps) => {
  const siteTitle = title.includes('YuDeZign') ? title : `${title} | YuDeZign`;

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
    updateMetaTag('og:site_name', 'YuDeZign', true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:title', siteTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');
    updateMetaTag('author', 'YuDeZign');

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
  }, [siteTitle, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
};

export default SEO;
