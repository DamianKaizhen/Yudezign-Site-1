import { useEffect, useState } from 'react';

/**
 * Is the portal running as an installed web app rather than in a browser tab?
 *
 * This matters more than it sounds. manifest.json declares `display:
 * standalone`, so once a rep adds the site to their home screen there is no
 * browser chrome — no back button, no address bar, and no share menu. Opening a
 * PDF in that context is a one-way door: the document fills the screen and
 * there is no way out short of force-quitting.
 *
 * So anything that would normally lean on browser chrome has to bring its own
 * when this is true.
 */
export function useStandalone(): boolean {
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(display-mode: standalone)');

    const read = () =>
      // iOS Safari predates display-mode and still reports via navigator.
      query.matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    setStandalone(read());

    const onChange = () => setStandalone(read());
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return standalone;
}
