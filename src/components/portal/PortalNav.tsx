import { NavLink, useSearchParams } from 'react-router-dom';

import type { PortalRole } from '../../types/salesPortal';
import { sectionsForRole } from './sections';

/**
 * The top tab row.
 *
 * Horizontally scrollable on mobile rather than wrapping: eight wrapped pills
 * eat half a phone screen before any content appears, and the portal's job is
 * to answer a question fast. Snap points keep it from stopping mid-pill.
 */
const PortalNav = ({ role }: { role: PortalRole | null }) => {
  const sections = sectionsForRole(role);

  return (
    <nav
      aria-label="Portal sections"
      className="border-b border-luxury-gray-100 bg-luxury-beige/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-6xl">
        <ul className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => (
            <li key={section.to} className="snap-start">
              <NavLink
                to={section.to}
                end={section.to === '/sales'}
                className={({ isActive }) =>
                  `inline-flex whitespace-nowrap rounded-md px-4 py-2 text-body-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white shadow-luxury'
                      : 'bg-white text-luxury-gray-600 hover:text-primary'
                  }`
                }
              >
                {section.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

interface SubTabsProps {
  tabs: Array<{ id: string; label: string }>;
  /** Which tab shows when `?t=` is absent. */
  defaultTab: string;
}

/**
 * Sub-tabs, driven by `?t=` so every screen in the portal is a shareable URL.
 */
export const SubTabs = ({ tabs, defaultTab }: SubTabsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get('t') ?? defaultTab;

  return (
    <div
      role="tablist"
      aria-label="Section views"
      className="flex snap-x gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.set('t', tab.id);
              setSearchParams(next, { replace: true });
            }}
            className={`snap-start whitespace-nowrap rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white text-luxury-gray-600 ring-1 ring-luxury-gray-100 hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default PortalNav;
