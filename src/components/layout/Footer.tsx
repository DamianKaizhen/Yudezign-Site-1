import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { siteSettings } from '../../data/siteSettings';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            {siteSettings.logo ? (
              <img
                src={siteSettings.logo}
                alt={siteSettings.companyName}
                className="h-10 w-auto mb-4"
              />
            ) : (
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">YuDe</span>
                <span className="text-accent">Zign</span>
              </div>
            )}
            <p className="text-neutral-200 mb-4">
              Custom European frameless cabinets, crafted in Houston. Supply-only excellence with 2-3 week delivery.
            </p>
            <div className="flex space-x-4">
              {siteSettings.socialLinks.facebook && (
                <a
                  href={siteSettings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {siteSettings.socialLinks.instagram && (
                <a
                  href={siteSettings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {siteSettings.socialLinks.twitter && (
                <a
                  href={siteSettings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {siteSettings.socialLinks.youtube && (
                <a
                  href={siteSettings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-200 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-neutral-200 hover:text-accent transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/finishes" className="text-neutral-200 hover:text-accent transition-colors">
                  Finishes & Materials
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-neutral-200 hover:text-accent transition-colors">
                  Brochures & Downloads
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-200 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-200 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Portfolio Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Portfolio</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/portfolio/kitchens" className="text-neutral-200 hover:text-accent transition-colors">
                  Kitchens
                </Link>
              </li>
              <li>
                <Link to="/portfolio/closets" className="text-neutral-200 hover:text-accent transition-colors">
                  Closets
                </Link>
              </li>
              <li>
                <Link to="/portfolio/vanities" className="text-neutral-200 hover:text-accent transition-colors">
                  Vanities
                </Link>
              </li>
              <li>
                <Link to="/portfolio/custom" className="text-neutral-200 hover:text-accent transition-colors">
                  Custom Projects
                </Link>
              </li>
              <li>
                <Link to="/portfolio/commercial" className="text-neutral-200 hover:text-accent transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link to="/kdlite" className="text-neutral-200 hover:text-accent transition-colors">
                  Closet Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-neutral-200">
                  13230 Murphy Rd, Ste 600<br />
                  Stafford, TX 77477<br />
                  United States
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:+12815688000" className="text-neutral-200 hover:text-accent transition-colors">
                  (281) 568-8000
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:orders@yudezign.com" className="text-neutral-200 hover:text-accent transition-colors">
                  orders@yudezign.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm text-neutral-200">Business Hours:</p>
              <p className="text-sm text-neutral-300">Mon-Fri: 9:00 AM - 5:30 PM</p>
            </div>
          </div>
        </div>

        {/* Areas We Serve */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Proudly Serving Greater Houston</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-neutral-200">
            <div>
              <h4 className="text-accent font-medium mb-2">Inner Loop</h4>
              <ul className="space-y-1">
                <li>Memorial</li>
                <li>River Oaks</li>
                <li>Galleria</li>
                <li>Bellaire</li>
                <li>West University</li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent font-medium mb-2">Southwest</h4>
              <ul className="space-y-1">
                <li>Sugar Land</li>
                <li>Missouri City</li>
                <li>Pearland</li>
                <li>Stafford</li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent font-medium mb-2">West</h4>
              <ul className="space-y-1">
                <li>Katy</li>
                <li>Cinco Ranch</li>
                <li>Cypress</li>
                <li>Energy Corridor</li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent font-medium mb-2">North</h4>
              <ul className="space-y-1">
                <li>The Woodlands</li>
                <li>Spring</li>
                <li>Champions</li>
                <li>Tomball</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="max-w-xl">
            <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-neutral-200 mb-4 text-sm">
              Get design inspiration and exclusive offers delivered to your inbox.
            </p>
            <form className="flex gap-2" aria-label="Newsletter subscription">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:border-accent"
              />
              <button type="submit" aria-label="Subscribe to newsletter" className="btn-secondary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-300">
          <p>&copy; {currentYear} YuDezign. All rights reserved.</p>
          {/* Wraps rather than overflowing: four links at space-x-6 do not fit
              a 375px screen on one line. */}
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 md:mt-0 md:flex-nowrap">
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link to="/sales/login" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">
              Sales Portal
            </Link>
            <Link to="/admin/login" className="hover:text-accent transition-colors opacity-60 hover:opacity-100">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
