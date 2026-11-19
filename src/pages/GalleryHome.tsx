import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// The home page is the 3D gallery, a self-contained page under public/gallery
// (built by scripts/build-gallery.py from mockups/gallery-3d). It runs in a
// frame so its WebGL code stays out of the main bundle. The heading, summary
// and links below are what search engines and screen readers get.
// The quote form inside the gallery uses the same spam check as the contact page.
// A Turnstile site key is public, so it can ride in the frame's address.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

const GalleryHome = () => (
  <>
    <SEO
      title="Custom European Frameless Cabinets | Houston"
      description="Premium custom European frameless cabinets manufactured in Houston. Kitchen cabinets, closets, vanities & custom cabinetry. 3/4 plywood construction, 20 standard colors, lead times from as little as two weeks. Supply-only pricing."
      keywords="european cabinets, frameless cabinets, custom cabinets houston, kitchen cabinets, closet cabinets, vanities, cabinet supply, houston cabinetry, plywood cabinets, luxury cabinets"
      url="https://www.yudezign.com"
    />
    <main role="main" aria-label="Main content" className="fixed inset-0 bg-[#0b0a09]">
      <div className="sr-only">
        <h1>Custom Frameless Cabinets, Precision Crafted in Houston</h1>
        <p>
          YuDeZign has built custom European frameless cabinets in Houston since 2007: kitchens, closets,
          vanities, custom casework and commercial projects, with 3/4&quot; plywood construction as standard and
          lead times from as little as two weeks. Walk the gallery to see finished projects and client designs.
        </p>
        <nav aria-label="Site">
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/services/kitchen-cabinets">Services</Link>
          <Link to="/finishes">Finishes &amp; Materials</Link>
          <Link to="/rta-cabinets">Stocked RTA Cabinets</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/classic">Classic home page</Link>
        </nav>
      </div>
      <iframe
        src={`/gallery/index.html${TURNSTILE_SITE_KEY ? `?tsk=${encodeURIComponent(TURNSTILE_SITE_KEY)}` : ''}`}
        title="YuDeZign 3D gallery"
        className="h-full w-full border-0"
        allow="autoplay; fullscreen"
      />
    </main>
  </>
);

export default GalleryHome;
