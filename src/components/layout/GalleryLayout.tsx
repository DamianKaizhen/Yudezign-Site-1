import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_WORDMARK_LIGHT } from '../../data/brand';

// Shell for pages restyled to match the 3D gallery home page: the gallery's
// dark header and a compact footer, with `.theme-gallery` (see index.css)
// re-colouring the page inside it. Pages keep their own markup.
const LINKS = [
  { name: 'Gallery', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Finishes', path: '/finishes' },
  { name: 'Blog', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Downloads', path: '/downloads' },
  { name: 'About', path: '/about' },
];

interface GalleryLayoutProps {
  children: ReactNode;
}

const GalleryLayout = ({ children }: GalleryLayoutProps) => {
  const { pathname } = useLocation();
  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <div className="theme-gallery flex min-h-screen flex-col">
      <header className="gallery-bar fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0" aria-label="YuDeZign home">
            <img src={LOGO_WORDMARK_LIGHT} alt="YuDeZign" className="h-7 w-auto" />
          </Link>
          <nav aria-label="Main navigation" className="gallery-links ml-auto flex items-center gap-6 overflow-x-auto">
            {LINKS.map((link) => (
              <Link key={link.path} to={link.path} aria-current={isActive(link.path) ? 'page' : undefined}>
                {link.name}
              </Link>
            ))}
          </nav>
          <Link to="/contact" className="gallery-cta shrink-0">
            Start Your Project
          </Link>
        </div>
      </header>

      <main role="main" aria-label="Main content" className="flex-grow">
        {children}
      </main>

      <footer role="contentinfo" aria-label="Site footer" className="gallery-foot">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
          <div>
            <img src={LOGO_WORDMARK_LIGHT} alt="YuDeZign" className="mb-4 h-7 w-auto" />
            <p>13366 Murphy Rd, Stafford, TX 77477</p>
            <p>
              <a href="tel:+17135020399">(713) 502-0399</a> &nbsp;&middot;&nbsp;{' '}
              <a href="mailto:orders@yudezign.com">orders@yudezign.com</a>
            </p>
            <p>Mon-Fri, 9:00 AM - 5:30 PM</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sales/login">Sales Portal</Link>
            <Link to="/admin/login">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GalleryLayout;
