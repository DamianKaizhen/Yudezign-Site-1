import { services } from '../../data/services';
import { locations } from '../../data/locations';
import { comparisons } from '../../data/comparisons';

// Single source of truth for the site's navigation, shared by the classic
// Navigation and the gallery header/footer. Services, Areas Served and the
// comparison pages are derived from the data files so a new entry in the data
// appears in every menu without a second edit.

export interface NavItem {
  name: string;
  path: string;
}

/** One column of a dropdown. Single-column menus leave the heading off. */
export interface NavGroup {
  heading?: string;
  links: NavItem[];
}

export interface NavLink extends NavItem {
  groups?: NavGroup[];
}

const RTA_LINK: NavItem = { name: 'Stocked RTA Cabinets', path: '/rta-cabinets' };

export const SERVICE_LINKS: NavItem[] = services.map((s) => ({ name: s.name, path: `/services/${s.slug}` }));
export const LOCATION_LINKS: NavItem[] = locations.map((l) => ({ name: l.name, path: `/locations/${l.slug}` }));
// "Frameless vs Framed Cabinets: Complete Comparison Guide" -> "Frameless vs Framed Cabinets"
export const COMPARE_LINKS: NavItem[] = Object.values(comparisons).map((c) => ({
  name: c.title.split(':')[0],
  path: `/vs/${c.slug}`,
}));

export const LEARN_LINKS: NavItem[] = [
  { name: 'Finishes & Materials', path: '/finishes' },
  { name: 'Blog', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Brochures & Downloads', path: '/downloads' },
];

export const PLAN_LINKS: NavItem[] = [
  { name: 'Pricing Guide', path: '/pricing' },
  { name: 'Room Visualizer', path: '/visualizer' },
  { name: 'KD Lite Design Tool', path: '/kdlite' },
  { name: 'Showroom', path: '/showroom' },
];

export const PORTFOLIO_LINKS: NavItem[] = [
  { name: 'All Projects', path: '/portfolio' },
  { name: 'Kitchens', path: '/portfolio/kitchens' },
  { name: 'Closets', path: '/portfolio/closets' },
  { name: 'Vanities', path: '/portfolio/vanities' },
  { name: 'Custom Projects', path: '/portfolio/custom' },
  { name: 'Commercial', path: '/portfolio/commercial' },
];

// Six top-level items plus the CTA sit on one line from the lg breakpoint up.
// Areas Served and Finishes & Materials live inside Resources, which is a
// three-column menu to hold them.
export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services/kitchen-cabinets',
    groups: [{ links: [...SERVICE_LINKS, RTA_LINK] }],
  },
  { name: 'Portfolio', path: '/portfolio', groups: [{ links: PORTFOLIO_LINKS }] },
  {
    name: 'Resources',
    path: '/blog',
    groups: [
      { heading: 'Learn', links: LEARN_LINKS },
      { heading: 'Plan', links: PLAN_LINKS },
      { heading: 'Areas Served', links: LOCATION_LINKS },
    ],
  },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

/** Footer columns: crawlable internal links to every public page family. */
export const FOOTER_GROUPS: NavGroup[] = [
  { heading: 'Services', links: SERVICE_LINKS },
  { heading: 'Areas Served', links: LOCATION_LINKS },
  { heading: 'Plan', links: [...PLAN_LINKS, RTA_LINK] },
  {
    heading: 'Learn',
    links: [
      { name: 'Finishes', path: '/finishes' },
      { name: 'Blog', path: '/blog' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Downloads', path: '/downloads' },
    ],
  },
  { heading: 'Compare', links: COMPARE_LINKS },
  {
    heading: 'Company',
    links: [
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  },
];
