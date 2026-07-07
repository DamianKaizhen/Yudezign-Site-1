import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '../../lib/schema';
import { useEffect } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb navigation component with JSON-LD schema support.
 * Displays a navigational breadcrumb trail and injects structured data for SEO.
 *
 * @example
 * <Breadcrumb items={[
 *   { label: 'Blog', href: '/blog' },
 *   { label: 'Kitchen Trends 2025' }
 * ]} />
 */
const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  // Build full breadcrumb trail with Home
  const fullItems = [
    { label: 'Home', href: '/' },
    ...items
  ];

  // Generate schema data for items with URLs
  const schemaItems = fullItems
    .filter(item => item.href)
    .map(item => ({
      name: item.label,
      url: `https://www.yudezign.com${item.href}`
    }));

  // Add current page (last item without href) to schema
  const lastItem = fullItems[fullItems.length - 1];
  if (!lastItem.href) {
    // For the last item, we use the current page URL
    schemaItems.push({
      name: lastItem.label,
      url: typeof window !== 'undefined' ? window.location.href : 'https://www.yudezign.com'
    });
  }

  // Inject schema into document head
  useEffect(() => {
    const schemaScript = document.getElementById('breadcrumb-schema');
    if (schemaScript) {
      schemaScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.textContent = JSON.stringify(generateBreadcrumbSchema(schemaItems));
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('breadcrumb-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [schemaItems]);

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={`text-sm ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1" role="list">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.label} className="flex items-center">
              {index > 0 && (
                <ChevronRight
                  className="w-4 h-4 mx-1 text-neutral-400"
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  className="text-neutral-600 font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  to={item.href}
                  className="text-primary hover:text-accent transition-colors flex items-center gap-1"
                >
                  {isFirst && <Home className="w-4 h-4" aria-hidden="true" />}
                  <span className={isFirst ? 'sr-only sm:not-sr-only' : ''}>
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span className="text-neutral-600">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
