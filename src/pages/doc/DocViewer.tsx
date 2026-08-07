import { lazy, Suspense, useCallback, useState } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, Loader2, Share2 } from 'lucide-react';

import { isViewableDocument } from '../../lib/portalLinks';

/** PDF.js is ~150 KB gzipped. Only fetched when the document is a PDF. */
const PdfDocument = lazy(() => import('./PdfDocument'));

/**
 * In-app document viewer.
 *
 * Exists because of what an installed web app takes away. manifest.json
 * declares `display: standalone`, so once the site is on a home screen there is
 * no browser chrome — no back button to leave a document with, and no share
 * menu, which on a phone is also how you reach Print and Save to Files.
 *
 * Public rather than portal-only, because the brochures on /downloads are the
 * same one-way door.
 */

const isPdf = (src: string) => /\.pdf($|[?#])/i.test(src);

const DocViewer = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [share, setShare] = useState<'idle' | 'working' | 'copied'>('idle');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const src = params.get('src');
  const title = params.get('title') ?? 'Document';
  /** Where Back goes when there is no history to return to. */
  const fallback = params.get('from') ?? '/downloads';

  const goBack = useCallback(() => {
    // history.length is 1 on a cold start — a shared link, or the first screen
    // in the installed app. Going "back" then would leave the site entirely.
    if (window.history.length > 1) navigate(-1);
    else navigate(fallback);
  }, [navigate, fallback]);

  /**
   * Share the FILE, not the URL.
   *
   * Sharing a url opens a sheet whose only real action is "open this link",
   * and following it navigates the installed app away from itself into a
   * chrome-less document — straight back into the dead end this screen exists
   * to remove. Handing iOS the actual bytes gives the genuine sheet instead,
   * the one with Print, Save to Files, Mail and AirDrop on it.
   */
  const onShare = useCallback(async () => {
    if (!src) return;
    const url = new URL(src, window.location.origin).toString();
    const filename = decodeURIComponent(src.split('/').pop() || 'document.pdf');

    setShare('working');
    try {
      const response = await fetch(src);
      if (response.ok) {
        const blob = await response.blob();
        const file = new File([blob], filename, {
          type: blob.type || 'application/pdf',
        });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title });
          setShare('idle');
          return;
        }
      }
    } catch {
      // Offline, or the share was dismissed. Fall through to the next option.
    }

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        setShare('idle');
        return;
      }
      await navigator.clipboard.writeText(url);
      setShare('copied');
      setTimeout(() => setShare('idle'), 2000);
      return;
    } catch {
      // A dismissed share sheet rejects. Nothing to report.
    }
    setShare('idle');
  }, [src, title]);

  if (!isViewableDocument(src)) {
    return <Navigate to="/downloads" replace />;
  }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-luxury-gray-900">
      <header className="flex flex-shrink-0 items-center gap-1 bg-primary px-2 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] text-white">
        <button
          type="button"
          onClick={goBack}
          className="flex h-11 items-center gap-1.5 rounded-lg px-3 text-body-sm font-medium transition-colors hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Back
        </button>

        <div className="mx-1 min-w-0 flex-1 text-center">
          <p className="truncate text-body-sm font-medium text-white/90">{title}</p>
          {totalPages > 0 && (
            <p className="text-[11px] tabular-nums text-white/50">
              Page {page} of {totalPages}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onShare}
          disabled={share === 'working'}
          aria-label="Share, print or save"
          className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/10 disabled:opacity-60"
        >
          {share === 'working' && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
          {share === 'copied' && <Check className="h-5 w-5 text-accent" aria-hidden="true" />}
          {share === 'idle' && <Share2 className="h-5 w-5" aria-hidden="true" />}
        </button>
      </header>

      {isPdf(src) ? (
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white/70" />
            </div>
          }
        >
          <PdfDocument src={src} onPageChange={setPage} onTotalPages={setTotalPages} />
        </Suspense>
      ) : (
        <HtmlDocument src={src} title={title} />
      )}

      <p className="flex-shrink-0 bg-luxury-gray-900 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center text-[11px] text-white/50">
        Share opens your phone&rsquo;s sheet — that is where Print and Save to Files live.
      </p>
    </div>
  );
};

/**
 * The training deck, which is a 16:9 HTML slide show.
 *
 * Its own scaler picks `min(width / 1280, height / 720)`, so handing it the
 * full portrait frame makes it solve for the width and leave the slide as a
 * squashed strip. Giving it a 16:9 box instead lets that scaler do the right
 * thing. `min()` letterboxes in portrait and pillarboxes in landscape without
 * needing to measure anything — the two clamps can't both bind at once.
 */
const HtmlDocument = ({ src, title }: { src: string; title: string }) => (
  <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-hidden p-2">
    <iframe
      src={src}
      title={title}
      className="border-0 bg-white"
      style={{
        width: 'min(100%, calc((100vh - 8rem) * 16 / 9))',
        aspectRatio: '16 / 9',
      }}
    />
    {/* A 16:9 deck held upright on a phone is a 210px strip with a screen of
        dead space under it. Correct, but hard to read — so say the useful bit. */}
    <p className="text-body-sm text-white/40 portrait:block landscape:hidden md:hidden">
      Turn your phone sideways for a full-screen view.
    </p>
  </div>
);

export default DocViewer;
