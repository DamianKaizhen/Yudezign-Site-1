import { useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CloudOff, LogOut, Search } from 'lucide-react';

import { useStandalone } from '../../lib/hooks/useStandalone';

import type { PortalPayload, PortalRole } from '../../types/salesPortal';
import { buildSearchIndex } from '../../lib/salesSearch';
import SEO from '../SEO';
import PortalNav from './PortalNav';
import PortalBottomNav from './PortalBottomNav';
import SearchOverlay from './SearchOverlay';
import type { PortalContext } from './portalContext';

interface PortalLayoutProps {
  payload: PortalPayload;
  role: PortalRole;
  isOffline: boolean;
  lastVerifiedAt: number | null;
  onLogout: () => void;
}

function formatSyncedAt(timestamp: number | null): string {
  if (!timestamp) return 'not yet';
  return new Date(timestamp).toLocaleString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * The portal shell.
 *
 * Rendered bare — no site Navigation, no marketing Footer. This is a tool, and
 * on a phone the public nav plus footer would cost most of the first screen
 * before a single answer appeared. There is a link back to the website in the
 * header for anyone who wants it.
 */
const PortalLayout = ({
  payload,
  role,
  isOffline,
  lastVerifiedAt,
  onLogout,
}: PortalLayoutProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const rep = payload.rep;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const standalone = useStandalone();
  // Only where there is something to go back to, and only where the platform
  // has not already provided it.
  const showBack = standalone && pathname !== '/sales';

  const index = useMemo(() => buildSearchIndex(rep), [rep]);
  const context: PortalContext = { rep, payload, role, index };

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Belt-and-braces with robots.txt and the vercel.json X-Robots-Tag. */}
      <SEO title="Sales Portal | YuDezign" description="Internal sales resources." noindex />

      <header className="sticky top-0 z-50 shadow-luxury-sm print:hidden">
        <div className="bg-primary text-white">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2.5">
            {/* Installed as a web app there is no browser back button, so a rep
                who has drilled into a sub-page has no way out but the bottom
                bar. Give them the affordance they expect. */}
            {showBack && (
              <button
                type="button"
                onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/sales'))}
                aria-label="Back"
                className="-ml-2 flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

            <Link to="/sales" className="flex items-baseline gap-2 text-lg font-semibold">
              <span>
                YuDe<span className="text-accent">Zign</span>
              </span>
              <span className="text-[11px] font-normal uppercase tracking-widest text-white/70">
                Sales
              </span>
            </Link>

            {role === 'manager' && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-dark">
                Manager
              </span>
            )}

            <div className="ml-auto flex items-center gap-1">
              {/* Search lives in the bottom bar on mobile, within thumb reach. */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search the portal"
                className="hidden h-10 items-center gap-2 rounded-lg bg-white/10 px-3 text-body-sm text-white/90 transition-colors hover:bg-white/20 md:flex"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span>Search</span>
              </button>
              <button
                type="button"
                onClick={onLogout}
                aria-label="Sign out"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* The scrolling pill row is a desktop affordance; mobile gets the
            bottom bar instead, so this would just be a second way to do the
            same thing while eating the top of a small screen. */}
        <div className="hidden md:block">
          <PortalNav role={role} />
        </div>

        {isOffline && (
          <div className="flex items-center gap-2 bg-accent/25 px-4 py-2 text-[13px] text-accent-dark">
            <CloudOff className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span>
              Offline — showing your saved copy from {formatSyncedAt(lastVerifiedAt)}.
            </span>
          </div>
        )}
      </header>

      {/* pb clears the fixed bottom bar on mobile. */}
      <main className="mx-auto max-w-6xl px-4 py-6 pb-28 md:pb-16">
        <Outlet context={context} />
      </main>

      <footer className="border-t border-luxury-gray-100 px-4 py-6 pb-28 md:pb-6 print:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-[11px] text-luxury-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {rep.version} · content {payload.version}
          </p>
          <p>
            If a number here disagrees with the Answer Key, the Answer Key wins.{' '}
            <Link to="/" className="underline hover:text-primary">
              Back to yudezign.com
            </Link>
          </p>
        </div>
      </footer>

      <PortalBottomNav role={role} onSearch={() => setSearchOpen(true)} />

      <SearchOverlay index={index} isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default PortalLayout;
