import { useCallback, useEffect, useState } from 'react';

import type { PortalRole } from '../../types/salesPortal';

/**
 * Offline-tolerant session for the sales portal.
 *
 * The admin equivalent (`src/components/admin/ProtectedRoute.tsx`) catches ANY
 * fetch failure and treats it as "not authenticated", which redirects to login.
 * For an admin at a desk that is merely annoying. For a rep standing in an
 * exhibition hall with no signal it means losing the playbook mid-conversation,
 * which is the exact failure this portal exists to prevent.
 *
 * So three outcomes are treated as three different things:
 *
 *   200                         -> refresh the hint, render
 *   401 / 403                   -> authoritative denial: clear everything, log out
 *   network error / 5xx / junk  -> do nothing, keep rendering, flag offline
 *
 * The hint below is NOT a credential. The JWT lives in an httpOnly cookie the
 * client cannot read, and the server trusts nothing else. The hint only records
 * that a verification once succeeded, so the UI knows whether to render
 * optimistically instead of blocking on a network call that may never return.
 */

const HINT_KEY = 'yudz_portal_session_v1';
const VERIFY_TIMEOUT_MS = 6000;

export type SessionState =
  | 'checking' // first load, no hint to fall back on
  | 'authenticated'
  | 'unauthenticated' // server said no
  | 'unreachable'; // no hint and no network — cannot decide

interface SessionHint {
  role: PortalRole;
  expiresAt: number;
  lastVerifiedAt: number;
}

function readHint(): SessionHint | null {
  try {
    const raw = window.localStorage.getItem(HINT_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;

    const hint = parsed as Partial<SessionHint>;
    if (hint.role !== 'rep' && hint.role !== 'manager') return null;
    if (typeof hint.expiresAt !== 'number' || hint.expiresAt <= Date.now()) return null;

    return {
      role: hint.role,
      expiresAt: hint.expiresAt,
      lastVerifiedAt: typeof hint.lastVerifiedAt === 'number' ? hint.lastVerifiedAt : 0,
    };
  } catch {
    return null;
  }
}

function writeHint(hint: SessionHint): void {
  try {
    window.localStorage.setItem(HINT_KEY, JSON.stringify(hint));
  } catch {
    // Private mode, quota, whatever. The session still works for this tab.
  }
}

export function clearSessionHint(): void {
  try {
    window.localStorage.removeItem(HINT_KEY);
  } catch {
    // Nothing useful to do.
  }
}

export interface SalesSession {
  state: SessionState;
  role: PortalRole | null;
  /** True when we are rendering from a stored hint we could not revalidate. */
  isOffline: boolean;
  lastVerifiedAt: number | null;
  /** Re-run the check now — used by the Retry button on the unreachable screen. */
  revalidate: () => void;
  logout: () => Promise<void>;
}

export function useSalesSession(): SalesSession {
  const initialHint = typeof window === 'undefined' ? null : readHint();

  const [state, setState] = useState<SessionState>(
    initialHint ? 'authenticated' : 'checking'
  );
  const [role, setRole] = useState<PortalRole | null>(initialHint?.role ?? null);
  const [isOffline, setIsOffline] = useState(false);
  const [lastVerifiedAt, setLastVerifiedAt] = useState<number | null>(
    initialHint?.lastVerifiedAt ?? null
  );
  const [attempt, setAttempt] = useState(0);

  const revalidate = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    const hint = readHint();

    // Known offline and nothing cached: don't burn six seconds on a request
    // that cannot succeed.
    if (!hint && typeof navigator !== 'undefined' && navigator.onLine === false) {
      setState('unreachable');
      return;
    }

    const check = async () => {
      try {
        const response = await fetch('/api/sales/auth', {
          method: 'GET',
          credentials: 'include',
          signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
        });

        if (cancelled) return;

        if (response.status === 401 || response.status === 403) {
          // The only outcome that logs someone out.
          clearSessionHint();
          setRole(null);
          setIsOffline(false);
          setState('unauthenticated');
          return;
        }

        if (!response.ok) throw new Error(`Unexpected status ${response.status}`);

        const data: unknown = await response.json();
        const parsed = data as { authenticated?: boolean; role?: PortalRole; expiresAt?: number };

        if (parsed.authenticated !== true || !parsed.role) {
          clearSessionHint();
          setRole(null);
          setState('unauthenticated');
          return;
        }

        const verifiedAt = Date.now();
        writeHint({
          role: parsed.role,
          expiresAt: parsed.expiresAt ?? verifiedAt + 86_400_000,
          lastVerifiedAt: verifiedAt,
        });
        setRole(parsed.role);
        setLastVerifiedAt(verifiedAt);
        setIsOffline(false);
        setState('authenticated');
      } catch {
        if (cancelled) return;

        // Timeout, DNS failure, offline, 5xx, malformed body. None of these are
        // evidence that the session is invalid, so we do not act as if they are.
        if (hint) {
          setRole(hint.role);
          setLastVerifiedAt(hint.lastVerifiedAt);
          setIsOffline(true);
          setState('authenticated');
        } else {
          setState('unreachable');
        }
      }
    };

    void check();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const logout = useCallback(async () => {
    clearSessionHint();
    setRole(null);
    setState('unauthenticated');
    try {
      await fetch('/api/sales/auth', { method: 'DELETE', credentials: 'include' });
    } catch {
      // Cookie survives on the server until it expires, but the client is out
      // and the hint is gone. Good enough for a logout on a flaky connection.
    }
  }, []);

  return { state, role, isOffline, lastVerifiedAt, revalidate, logout };
}
