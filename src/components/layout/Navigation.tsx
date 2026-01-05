import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

const Navigation = () => {
  const { settings } = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Services',
      path: '/services/kitchen-cabinets',
      subLinks: [
        { name: 'Kitchen Cabinets', path: '/services/kitchen-cabinets' },
        { name: 'Closet Systems', path: '/services/closet-systems' },
        { name: 'Bathroom Vanities', path: '/services/bathroom-vanities' },
        { name: 'Home Office', path: '/services/home-office-cabinets' },
        { name: 'Garage Cabinets', path: '/services/garage-cabinets' },
      ]
    },
    {
      name: 'Portfolio',
      path: '/portfolio',
      subLinks: [
        { name: 'All Projects', path: '/portfolio' },
        { name: 'Kitchens', path: '/portfolio/kitchens' },
        { name: 'Closets', path: '/portfolio/closets' },
        { name: 'Vanities', path: '/portfolio/vanities' },
        { name: 'Custom Projects', path: '/portfolio/custom' },
        { name: 'Commercial', path: '/portfolio/commercial' },
      ]
    },
    {
      name: 'Locations',
      path: '/locations/houston',
      subLinks: [
        { name: 'Houston', path: '/locations/houston' },
        { name: 'Katy', path: '/locations/katy' },
        { name: 'Sugar Land', path: '/locations/sugar-land' },
        { name: 'The Woodlands', path: '/locations/the-woodlands' },
        { name: 'Memorial', path: '/locations/memorial' },
      ]
    },
    {
      name: 'Resources',
      path: '/blog',
      subLinks: [
        { name: 'Blog', path: '/blog' },
        { name: 'Pricing Guide', path: '/pricing' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Showroom', path: '/showroom' },
        { name: 'Room Visualizer', path: '/visualizer' },
        { name: 'KD Lite Design Tool', path: '/kdlite' },
      ]
    },
    { name: 'Finishes & Materials', path: '/finishes' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-custom shadow-lg py-4'
          : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent py-6'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {settings.logo ? (
              <img
                src={settings.logo}
                alt={settings.companyName}
                className="h-10 md:h-12 w-auto"
              />
            ) : (
              <div className="text-2xl md:text-3xl font-bold">
                <span className={`transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}>
                  YuDe
                </span>
                <span className={`transition-colors ${isScrolled ? 'text-accent' : 'text-accent-light'}`}>
                  Zign
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <>
                    <button
                      aria-expanded={openDropdown === link.name}
                      aria-haspopup="true"
                      aria-label={`${link.name} menu`}
                      className={`flex items-center space-x-1 font-medium transition-colors ${
                        isScrolled ? 'text-neutral-700 hover:text-primary' : 'text-white hover:text-accent'
                      }`}
                      onMouseEnter={() => setOpenDropdown(link.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2"
                          onMouseEnter={() => setOpenDropdown(link.name)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              to={subLink.path}
                              className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-medium transition-colors ${
                      isScrolled ? 'text-neutral-700 hover:text-primary' : 'text-white hover:text-accent'
                    } ${location.pathname === link.path ? 'text-primary' : ''}`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link
              to="/contact"
              className="btn-primary"
            >
              Start Your Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="py-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.subLinks ? (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                          aria-expanded={openDropdown === link.name}
                          aria-haspopup="true"
                          role="menuitem"
                          className="w-full px-6 py-3 text-left font-medium text-neutral-700 hover:bg-neutral-50 flex items-center justify-between"
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>
                        <AnimatePresence>
                          {openDropdown === link.name && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden bg-neutral-50"
                            >
                              {link.subLinks.map((subLink) => (
                                <Link
                                  key={subLink.name}
                                  to={subLink.path}
                                  className="block px-10 py-2 text-neutral-600 hover:text-primary"
                                >
                                  {subLink.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block px-6 py-3 font-medium text-neutral-700 hover:bg-neutral-50 ${
                          location.pathname === link.path ? 'text-primary bg-neutral-50' : ''
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-6 mt-4">
                  <Link
                    to="/contact"
                    className="block text-center btn-primary w-full"
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
