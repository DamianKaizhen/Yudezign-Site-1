import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { docViewerPath } from '../../lib/portalLinks';
import { useStandalone } from '../../lib/hooks/useStandalone';

interface DocLinkProps {
  /** Same-origin path to the document, e.g. `/downloads/line-guide.pdf`. */
  href: string;
  /** Shown in the viewer's header and used as the share sheet's title. */
  title: string;
  className?: string;
  'aria-label'?: string;
  children: ReactNode;
}

/**
 * Opens a document the way the current context can actually cope with.
 *
 * In a browser, a new tab wins — the native PDF viewer, the back button and the
 * share menu all already work, and nothing we build will beat them. Installed
 * to a home screen none of those exist (manifest.json declares
 * `display: standalone`), so a `target="_blank"` PDF is a one-way door: no way
 * back, and no way to print or save it. There, the document goes through the
 * in-app viewer at /doc, which supplies all three.
 */
const DocLink = ({ href, title, className, children, ...rest }: DocLinkProps) => {
  const standalone = useStandalone();
  const location = useLocation();

  if (standalone) {
    // Pass the current URL so the viewer's Back has somewhere to go even when
    // it was opened cold, with no history behind it.
    const from = `${location.pathname}${location.search}`;
    return (
      <Link to={docViewerPath(href, title, from)} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
};

export default DocLink;
