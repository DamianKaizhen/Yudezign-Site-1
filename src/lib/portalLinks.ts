/**
 * Decide how a portal link should be opened.
 *
 * This exists because getting it wrong is not a cosmetic bug. A path starting
 * with "/" was previously treated as a React Router route and rendered as
 * <Link>, which meant clicking a PDF asked the router to navigate to
 * "/sales-training/docs/field-card.pdf". No route matches that, so the app
 * rendered nothing — a blank page — and because the URL had changed, the back
 * button replayed the same dead entry. Only a hard refresh recovered, since
 * that finally asked the server for the file.
 *
 * So "starts with a slash" is not the question. The question is whether the
 * path is a route this app can render, or a file the server should serve.
 */

export type LinkTarget =
  /** A route inside the SPA — navigate client-side. */
  | 'route'
  /** A file served by the CDN — needs a real document request. */
  | 'asset'
  /** Another origin entirely. */
  | 'external';

/**
 * Paths served as static files that carry no file extension, because
 * `cleanUrls` in vercel.json strips ".html".
 */
const STATIC_PREFIXES = ['/sales-training/'];

/** e.g. ".pdf", ".jpg", ".html" — optionally followed by a query or hash. */
const HAS_EXTENSION = /\.[a-z0-9]{2,5}($|[?#])/i;

export function resolveLinkTarget(href: string): LinkTarget {
  if (!href.startsWith('/')) return 'external';
  if (STATIC_PREFIXES.some((prefix) => href.startsWith(prefix))) return 'asset';
  if (HAS_EXTENSION.test(href)) return 'asset';
  return 'route';
}

/** Assets and external links both open in a new tab, so the portal stays put. */
export function opensInNewTab(href: string): boolean {
  return resolveLinkTarget(href) !== 'route';
}
