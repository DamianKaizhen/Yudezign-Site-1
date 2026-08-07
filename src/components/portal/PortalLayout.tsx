import { useMemo, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { CloudOff, LogOut, Search } from 'lucide-react';

import type { PortalPayload, PortalRole } from '../../types/salesPortal';
import { buildSearchIndex } from '../../lib/salesSearch';
import SEO from '../SEO';
import PortalNav from './PortalNav';
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

  const index = useMemo(() => buildSearchIndex(rep), [rep]);
  const context: PortalContext = { rep, payload, role, index };

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Belt-and-braces with robots.txt and the vercel.json X-Robots-Tag. */}
      <SEO title="Sales Portal | YuDezign" description="Internal sales resources." noindex />

      <header className="sticky top-0 z-50 shadow-luxury-sm print:hidden">
        <div className="bg-primary text-white">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
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
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search the portal"
                className="flex h-10 items-center gap-2 rounded-lg bg-white/10 px-3 text-body-sm text-white/90 transition-colors hover:bg-white/20"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Search</span>
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

        <PortalNav role={role} />

        {isOffline && (
          <div className="flex items-center gap-2 bg-accent/25 px-4 py-2 text-[13px] text-accent-dark">
            <CloudOff className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span>
              Offline — showing your saved copy from {formatSyncedAt(lastVerifiedAt)}.
            </span>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-20">
        <Outlet context={context} />
      </main>

      <footer className="border-t border-luxury-gray-100 px-4 py-6 print:hidden">
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

      <SearchOverlay index={index} isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default PortalLayout;
