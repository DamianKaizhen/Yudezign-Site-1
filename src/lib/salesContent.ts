import { useCallback, useEffect, useState } from 'react';

import type { PortalPayload } from '../types/salesPortal';

/**
 * Content fetch + cache for the sales portal.
 *
 * Stale-while-revalidate against `localStorage`: render whatever we already
 * have, immediately, then try the network. A rep opening this at the booth sees
 * content before the request resolves, and sees content at all if it never does.
 *
 * The cache is keyed by role. Logging in as a rep after being a manager must not
 * hand back a payload with a `manager` key still in it, so `clearContentCache()`
 * runs on logout and on any authoritative 401.
 */

const CACHE_KEY = 'yudz_portal_content_v1';
const FETCH_TIMEOUT_MS = 15000;

export type ContentSource = 'network' | 'cache' | 'none';

interface CachedPayload {
  payload: PortalPayload;
  fetchedAt: number;
}

/**
 * Top-level `rep` fields the current UI iterates or indexes into.
 *
 * A cache written before a field existed will render old-shaped data into new
 * code, which is a crash rather than a degradation — `buildSearchIndex` did
 * exactly that when `repPack` was added, and the portal came up blank. Checking
 * shape is self-maintaining in a way a hand-bumped schema number is not: add a
 * field here when the UI starts depending on it.
 */
const REQUIRED_REP_FIELDS = [
  'answerKey',
  'answerKeySections',
  'neverSay',
  'pitches',
  'objections',
  'qualifying',
  'productLines',
  'dimensions',
  'pricing',
  'sop',
  'kpis',
  'booth',
  'library',
  'notes',
] as const;

function isUsable(payload: PortalPayload | undefined): payload is PortalPayload {
  if (!payload || typeof payload !== 'object') return false;
  if (!payload.rep || !payload.role) return false;

  const rep = payload.rep as unknown as Record<string, unknown>;
  for (const field of REQUIRED_REP_FIELDS) {
    if (rep[field] === undefined || rep[field] === null) return false;
  }

  // The link groups the search index walks live one level deeper.
  const library = rep.library as Record<string, unknown> | undefined;
  if (!library) return false;
  for (const group of ['training', 'repPack', 'videos', 'documents', 'siteLinks']) {
    if (!Array.isArray(library[group])) return false;
  }

  return true;
}

function readCache(): CachedPayload | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;

    const cached = parsed as Partial<CachedPayload>;
    if (!isUsable(cached.payload)) {
      // Written by an older build. Drop it and fetch fresh rather than render
      // a shape this code cannot handle.
      clearContentCache();
      return null;
    }

    return { payload: cached.payload, fetchedAt: cached.fetchedAt ?? 0 };
  } catch {
    return null;
  }
}

function writeCache(payload: PortalPayload): void {
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ payload, fetchedAt: Date.now() } satisfies CachedPayload)
    );
  } catch {
    // Payload is ~100KB and the quota is usually 5MB, so this is rare. If it
    // does fail the portal still works online — it just won't survive offline.
    console.warn('salesContent: could not cache payload');
  }
}

export function clearContentCache(): void {
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    // Nothing useful to do.
  }
}

export interface SalesContentState {
  payload: PortalPayload | null;
  source: ContentSource;
  isLoading: boolean;
  /** Set when we have nothing to show and the fetch failed. */
  error: string | null;
  fetchedAt: number | null;
  refresh: () => void;
}

export function useSalesContent(enabled: boolean): SalesContentState {
  const cached = typeof window === 'undefined' ? null : readCache();

  const [payload, setPayload] = useState<PortalPayload | null>(cached?.payload ?? null);
  const [source, setSource] = useState<ContentSource>(cached ? 'cache' : 'none');
  const [fetchedAt, setFetchedAt] = useState<number | null>(cached?.fetchedAt ?? null);
  const [isLoading, setIsLoading] = useState(enabled && !cached);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const refresh = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    const existing = readCache();

    const load = async () => {
      setError(null);
      if (!existing) setIsLoading(true);

      try {
        // Send the version we hold so an unchanged payload comes back as a 304
        // instead of ~100KB over one bar of LTE.
        const version = existing?.payload.version;
        const url = version
          ? `/api/sales/content?v=${encodeURIComponent(version)}`
          : '/api/sales/content';

        const response = await fetch(url, {
          credentials: 'include',
          signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });

        if (cancelled) return;

        if (response.status === 304 && existing) {
          setPayload(existing.payload);
          setSource('network');
          setFetchedAt(Date.now());
          writeCache(existing.payload);
          return;
        }

        if (response.status === 401 || response.status === 403) {
          // useSalesSession owns the redirect; here we just make sure a stale
          // payload for a role we no longer hold cannot linger.
          clearContentCache();
          setPayload(null);
          setSource('none');
          return;
        }

        if (!response.ok) throw new Error(`Unexpected status ${response.status}`);

        const data = (await response.json()) as PortalPayload;
        if (!isUsable(data)) throw new Error('Malformed payload');

        writeCache(data);
        setPayload(data);
        setSource('network');
        setFetchedAt(Date.now());
      } catch {
        if (cancelled) return;

        if (existing) {
          setPayload(existing.payload);
          setSource('cache');
          setFetchedAt(existing.fetchedAt);
        } else {
          setError('Could not load the portal, and there is no saved copy on this device.');
          setSource('none');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [enabled, attempt]);

  return { payload, source, isLoading, error, fetchedAt, refresh };
}
