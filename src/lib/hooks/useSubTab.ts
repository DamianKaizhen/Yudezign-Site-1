import { useSearchParams } from 'react-router-dom';

/**
 * Read the active sub-tab from `?t=`.
 *
 * Sub-tabs live in the query string rather than component state so every screen
 * in the portal is a shareable URL — a manager can text a rep a link straight
 * to the never-say list.
 */
export function useSubTab(defaultTab: string): string {
  const [searchParams] = useSearchParams();
  return searchParams.get('t') ?? defaultTab;
}
