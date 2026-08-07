import { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';

import { useSalesSession } from '../../lib/hooks/useSalesSession';
import { clearContentCache, useSalesContent } from '../../lib/salesContent';
import PortalLayout from './PortalLayout';

/**
 * The gate.
 *
 * Contrast with `src/components/admin/ProtectedRoute.tsx`, which redirects to
 * login on ANY fetch failure. Here a network failure is explicitly not treated
 * as a denial — see `useSalesSession` for why that distinction is the whole
 * point of this portal.
 *
 * Note this is a UX gate, not the security boundary. The security boundary is
 * `/api/sales/content`, which decides what a given role is allowed to receive.
 * Nothing sensitive is in the bundle for this component to protect.
 */
const PortalGate = () => {
  const { state, role, isOffline, lastVerifiedAt, revalidate, logout } = useSalesSession();
  const { payload, isLoading, error, refresh } = useSalesContent(state === 'authenticated');

  const handleLogout = useCallback(() => {
    clearContentCache();
    void logout();
  }, [logout]);

  if (state === 'unauthenticated') {
    return <Navigate to="/sales/login" replace />;
  }

  if (state === 'unreachable') {
    return (
      <Shell>
        <WifiOff className="mx-auto mb-4 h-10 w-10 text-luxury-gray-400" aria-hidden="true" />
        <h1 className="mb-2 text-h4 font-medium text-luxury-gray-900">Can&rsquo;t reach the server</h1>
        <p className="mb-6 text-body-sm text-luxury-gray-600">
          You need a connection once to sign in. After that the portal keeps working offline on this
          device.
        </p>
        <button
          type="button"
          onClick={revalidate}
          className="rounded-lg bg-primary px-6 py-2.5 text-body-sm font-medium text-white transition-colors hover:bg-primary-light"
        >
          Try again
        </button>
      </Shell>
    );
  }

  if (state === 'checking' || (isLoading && !payload)) {
    return (
      <Shell>
        <motion.div
          className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-body-sm text-luxury-gray-600">Opening your portal…</p>
      </Shell>
    );
  }

  if (!payload) {
    return (
      <Shell>
        <h1 className="mb-2 text-h4 font-medium text-luxury-gray-900">Nothing to show yet</h1>
        <p className="mb-6 text-body-sm text-luxury-gray-600">
          {error ?? 'The portal content could not be loaded.'}
        </p>
        <button
          type="button"
          onClick={refresh}
          className="rounded-lg bg-primary px-6 py-2.5 text-body-sm font-medium text-white transition-colors hover:bg-primary-light"
        >
          Try again
        </button>
      </Shell>
    );
  }

  return (
    <PortalLayout
      payload={payload}
      // The payload's role is what the server actually granted; the session
      // hint is only a client-side convenience, so it never wins here.
      role={payload.role ?? role ?? 'rep'}
      isOffline={isOffline}
      lastVerifiedAt={lastVerifiedAt}
      onLogout={handleLogout}
    />
  );
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen items-center justify-center bg-luxury-cream px-4">
    <div className="w-full max-w-sm text-center">{children}</div>
  </div>
);

export default PortalGate;
