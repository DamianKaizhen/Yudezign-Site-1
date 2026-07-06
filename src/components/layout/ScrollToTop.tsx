import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window back to the top whenever the route (pathname) changes.
 *
 * Without this, React Router keeps the previous page's scroll position when
 * navigating, so opening a new page can land you halfway down it. In-page
 * anchor links (e.g. /page#section) are left alone so they still work.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // preserve anchor navigation
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
