import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';
import { LOGO_WORDMARK_LIGHT } from '../../data/brand';

interface NavItem {
  name: string;
  path: string;
}

/** One column of a dropdown. Single-column menus leave the heading off. */
interface NavGroup {
  heading?: string;
  links: NavItem[];
}

interface NavLink extends NavItem {
  groups?: NavGroup[];
}

// Six top-level items plus the CTA sit on one line from the lg breakpoint up.
// Areas Served and Finishes & Materials used to be top-level as well, and at
// 1280px the bar had to wrap both onto two lines, so they live inside
// Resources now, which became a three-column menu to hold them.
const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services/kitchen-cabinets',
    groups: [
      {
        links: [
          { name: 'Kitchen Cabinets', path: '/services/kitchen-cabinets' },
          { name: 'Closet Systems', path: '/services/closet-systems' },
          { name: 'Bathroom Vanities', path: '/services/bathroom-vanities' },
          { name: 'Home Office', path: '/services/home-office-cabinets' },
          { name: 'Garage Cabinets', path: '/services/garage-cabinets' },
        ],
      },
    ],
  },
  {
    name: 'Portfolio',
    path: '/portfolio',
    groups: [
      {
        links: [
          { name: 'All Projects', path: '/portfolio' },
          { name: 'Kitchens', path: '/portfolio/kitchens' },
          { name: 'Closets', path: '/portfolio/closets' },
          { name: 'Vanities', path: '/portfolio/vanities' },
          { name: 'Custom Projects', path: '/portfolio/custom' },
          { name: 'Commercial', path: '/portfolio/commercial' },
        ],
      },
    ],
  },
  {
    name: 'Resources',
    path: '/blog',
    groups: [
      {
        heading: 'Learn',
        links: [
          { name: 'Finishes & Materials', path: '/finishes' },
          { name: 'Blog', path: '/blog' },
          { name: 'FAQ', path: '/faq' },
          { name: 'Brochures & Downloads', path: '/downloads' },
        ],
      },
      {
        heading: 'Plan',
        links: [
          { name: 'Pricing Guide', path: '/pricing' },
          { name: 'Room Visualizer', path: '/visualizer' },
          { name: 'KD Lite Design Tool', path: '/kdlite' },
          { name: 'Showroom', path: '/showroom' },
        ],
      },
      {
        heading: 'Areas Served',
        links: [
          { name: 'Houston', path: '/locations/houston' },
          { name: 'Katy', path: '/locations/katy' },
          { name: 'Sugar Land', path: '/locations/sugar-land' },
          { name: 'The Woodlands', path: '/locations/the-woodlands' },
          { name: 'Memorial', path: '/locations/memorial' },
        ],
      },
    ],
  },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

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
    setOpenDropdown(null);
  }, [location]);

  // One colour class per link, never two: text-white and text-accent share a
  // specificity, so which one won used to depend on Tailwind's output order
  // rather than on which was meant.
  const topLinkClass = (active: boolean) => {
    if (active) return isScrolled ? 'text-primary' : 'text-accent';
    return isScrolled ? 'text-neutral-700 hover:text-primary' : 'text-white hover:text-accent';
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpenDropdown(null);
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-custom shadow-lg py-4'
          : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent py-6'
      }`}
    >
      {/* container-custom is only max-w-7xl mx-auto, so at 1280px and below the
          bar used to run edge to edge: the wordmark sat at x=0 and the CTA was
          cut off on the right. The sections below all carry their own gutter. */}
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* shrink-0 and a right margin, because the wordmark is ~4.7:1 where
              the old mark was square. Without shrink-0 flex compresses the
              image itself — it measured 101px wide against a true 227px at
              1024px — and without the margin it butts straight into "Home". */}
          <Link to="/" className="flex shrink-0 items-center space-x-2 mr-6 lg:mr-10">
            {/* The bar is a dark scrim over the hero photo until you scroll,
                then flips to near-white — so the wordmark has to flip too, or
                it disappears at one end or the other. This is the same rule the
                text fallback just below already follows. */}
            {settings.logo ? (
              <img
                src={isScrolled ? settings.logo : LOGO_WORDMARK_LIGHT}
                alt={settings.companyName}
                className="h-7 shrink-0 md:h-8 lg:h-9 w-auto"
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
          <div className="hidden lg:flex items-center gap-x-6 xl:gap-x-8">
            {NAV_LINKS.map((link) => {
              const groups = link.groups;
              const isOpen = openDropdown === link.name;
              const multiColumn = (groups?.length ?? 0) > 1;
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={groups ? () => setOpenDropdown(link.name) : undefined}
                  onMouseLeave={groups ? () => setOpenDropdown(null) : undefined}
                >
                  {groups ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-label={`${link.name} menu`}
                        onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                        className={`flex items-center gap-x-1 whitespace-nowrap font-medium transition-colors ${topLinkClass(false)}`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* pt-3 is the hover bridge: the panel hangs a little
                          below the label, and without it the pointer leaves
                          the wrapper on the way down and the menu closes
                          before it can be reached. The centring sits on this
                          static wrapper rather than on the animated panel,
                          because framer-motion writes its own transform and
                          would wipe out a -translate-x-1/2. */}
                      <div
                        className={`absolute top-full pt-3 ${
                          multiColumn ? 'left-1/2 -translate-x-1/2' : 'left-0'
                        }`}
                      >
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.18 }}
                              className={`rounded-lg bg-white shadow-xl ring-1 ring-black/5 ${
                                multiColumn ? 'flex gap-x-2 px-3 py-4' : 'w-52 py-2'
                              }`}
                            >
                              {groups.map((group, i) => (
                                <div key={group.heading ?? i} className={multiColumn ? 'min-w-[11rem]' : ''}>
                                  {group.heading && (
                                    <p className="px-4 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                      {group.heading}
                                    </p>
                                  )}
                                  {group.links.map((item) => (
                                    <Link
                                      key={item.path}
                                      to={item.path}
                                      className={`block whitespace-nowrap px-4 transition-colors hover:bg-neutral-50 hover:text-primary ${
                                        multiColumn ? 'py-1.5 text-sm' : 'py-2'
                                      } ${location.pathname === item.path ? 'text-primary' : 'text-neutral-700'}`}
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`whitespace-nowrap font-medium transition-colors ${topLinkClass(
                        location.pathname === link.path
                      )}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              );
            })}

            {/* CTA Button */}
            <Link to="/contact" className="btn-primary shrink-0 whitespace-nowrap">
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
                {NAV_LINKS.map((link) => {
                  const groups = link.groups;
                  const isOpen = openDropdown === link.name;
                  return (
                    <div key={link.name}>
                      {groups ? (
                        <>
                          <button
                            onClick={() => setOpenDropdown(isOpen ? null : link.name)}
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                            role="menuitem"
                            className="w-full px-6 py-3 text-left font-medium text-neutral-700 hover:bg-neutral-50 flex items-center justify-between"
                          >
                            <span>{link.name}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                              aria-hidden="true"
                            />
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className="overflow-hidden bg-neutral-50"
                              >
                                {groups.map((group, i) => (
                                  <div key={group.heading ?? i} className={group.heading ? 'py-2' : ''}>
                                    {group.heading && (
                                      <p className="px-10 pb-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                                        {group.heading}
                                      </p>
                                    )}
                                    {group.links.map((item) => (
                                      <Link
                                        key={item.path}
                                        to={item.path}
                                        className="block px-10 py-2 text-neutral-600 hover:text-primary"
                                      >
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
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
                  );
                })}
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
