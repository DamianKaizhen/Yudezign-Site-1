import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';

import type { PortalRole } from '../../types/salesPortal';
import { sectionsForRole } from './sections';

interface PortalBottomNavProps {
  role: PortalRole | null;
  onSearch: () => void;
}

/**
 * Mobile navigation.
 *
 * A rep uses this one-handed, standing up, often mid-conversation. The
 * horizontally-scrolling pill row at the top of the screen is fine on a laptop
 * and poor on a phone: it needs a reach to the top of the device, and half the
 * sections are off-screen until you scroll a strip you may not notice scrolls.
 *
 * So on mobile the sections move to a fixed bottom bar within thumb reach, with
 * Search in the middle — it is the primary interaction here, not an afterthought
 * behind an icon in the corner. Everything not in the bar is one tap away under
 * More, listed in full rather than hidden behind another scroll.
 */

/** The four that earn a permanent slot. The rest live under More. */
const PRIMARY = ['/sales', '/sales/products', '/sales/answers'];

const PortalBottomNav = ({ role, onSearch }: PortalBottomNavProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { pathname } = useLocation();
  const sections = sectionsForRole(role);

  const primary = PRIMARY.map((to) => sections.find((s) => s.to === to)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s)
  );
  const isActive = (to: string) => (to === '/sales' ? pathname === '/sales' : pathname.startsWith(to));
  const moreIsActive = !primary.some((s) => isActive(s.to));

  return (
    <>
      <nav
        aria-label="Portal sections"
        // pb keeps the bar clear of the iPhone home indicator.
        className="fixed inset-x-0 bottom-0 z-50 border-t border-luxury-gray-200 bg-white/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] md:hidden print:hidden"
      >
        <ul className="flex items-stretch">
          {primary.map((section) => {
            const Icon = section.icon;
            const active = isActive(section.to);
            return (
              <li key={section.to} className="flex-1">
                <Link
                  to={section.to}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-1 py-2 text-[11px] font-medium transition-colors ${
                    active ? 'text-primary' : 'text-luxury-gray-500'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="leading-none">{section.label}</span>
                </Link>
              </li>
            );
          })}

          <li className="flex-1">
            <button
              type="button"
              onClick={onSearch}
              aria-label="Search the portal"
              className="flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 px-1 py-2 text-[11px] font-medium text-luxury-gray-500"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-luxury">
                <Search className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="leading-none">Search</span>
            </button>
          </li>

          <li className="flex-1">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-expanded={sheetOpen}
              aria-label="More sections"
              className={`flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 px-1 py-2 text-[11px] font-medium transition-colors ${
                moreIsActive ? 'text-primary' : 'text-luxury-gray-500'
              }`}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="leading-none">More</span>
            </button>
          </li>
        </ul>
      </nav>

      <AnimatePresence>
        {sheetOpen && (
          <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true">
            <motion.button
              type="button"
              aria-label="Close"
              className="absolute inset-0 h-full w-full bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-luxury-cream pb-[env(safe-area-inset-bottom)]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-luxury-gray-100 bg-luxury-cream px-4 py-3">
                <span className="font-semibold text-luxury-gray-900">All sections</span>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-luxury-gray-500"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <ul className="space-y-2 p-4">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <li key={section.to}>
                      <Link
                        to={section.to}
                        onClick={() => setSheetOpen(false)}
                        className={`flex items-start gap-3 rounded-xl border bg-white p-4 shadow-luxury-sm ${
                          isActive(section.to)
                            ? 'border-primary/40 ring-1 ring-primary/20'
                            : 'border-luxury-gray-100'
                        }`}
                      >
                        <Icon
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block font-semibold text-luxury-gray-900">
                            {section.label}
                          </span>
                          <span className="mt-0.5 block text-body-sm text-luxury-gray-600">
                            {section.blurb}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortalBottomNav;
