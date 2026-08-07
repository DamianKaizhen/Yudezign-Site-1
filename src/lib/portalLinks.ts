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

/**
 * Where a same-origin document should actually be opened.
 *
 * In a browser, a new tab is better than anything we could build: the native
 * PDF viewer, the back button and the share menu all already work. Installed as
 * a web app none of those exist, so the document goes through the in-app viewer
 * instead, which supplies them.
 *
 * `/doc` is public rather than under `/sales`, because the brochures on
 * /downloads are the same one-way door for anyone who installed the site.
 *
 * @param from Where Back returns to when the viewer was opened cold — a shared
 *   link, or the first screen after launching the installed app — and there is
 *   no history entry to go back to.
 */
export function docViewerPath(href: string, title: string, from?: string): string {
  const params = new URLSearchParams({ src: href, title });
  if (from) params.set('from', from);
  return `/doc?${params.toString()}`;
}

/**
 * Whether the viewer may frame this path.
 *
 * `src` arrives from the query string, so without this the viewer would happily
 * embed any URL handed to it — a phishing frame wearing our header.
 *
 * Two ways to qualify, because our documents don't all live in one place: the
 * Finishes Catalog sits at the public root while everything else is under
 * /downloads. Prefix alone would silently bounce it back to the list — the very
 * dead end this viewer exists to remove.
 */

/** Static trees whose files may carry no extension, since `cleanUrls` in
 *  vercel.json strips ".html". */
const VIEWABLE_PREFIXES = ['/sales-training/', '/downloads/'];

/** Anything else must look like a document, so app routes can't be framed. */
const DOCUMENT_EXTENSION = /\.(pdf|html?)($|[?#])/i;

export function isViewableDocument(src: string | null | undefined): src is string {
  if (!src) return false;
  // Reject protocol-relative and absolute URLs outright.
  if (!src.startsWith('/') || src.startsWith('//')) return false;
  // Never frame an API response.
  if (src.startsWith('/api/')) return false;
  if (VIEWABLE_PREFIXES.some((prefix) => src.startsWith(prefix))) return true;
  return DOCUMENT_EXTENSION.test(src);
}
