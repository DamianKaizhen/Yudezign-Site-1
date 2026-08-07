import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Check, Download, ExternalLink, Share2 } from 'lucide-react';

/**
 * In-app document viewer.
 *
 * Exists because of what an installed web app takes away. With `display:
 * standalone` there is no browser chrome, so opening a PDF left a rep stuck:
 * no back button to leave it, and no share menu — which on a phone is also how
 * you reach Print, Save to Files and AirDrop.
 *
 * This puts those back. Back returns to where they were, Share hands off to the
 * OS sheet, and Open in browser is the escape hatch for anything the embedded
 * view renders badly.
 */

/**
 * Only same-origin portal documents may be framed.
 *
 * `src` comes off the query string, so without this the viewer would happily
 * embed any URL handed to it — a phishing frame wearing our header.
 */
const ALLOWED_PREFIXES = ['/sales-training/', '/downloads/'];

function isAllowed(src: string | null): src is string {
  if (!src) return false;
  // Reject protocol-relative and absolute URLs outright.
  if (!src.startsWith('/') || src.startsWith('//')) return false;
  return ALLOWED_PREFIXES.some((prefix) => src.startsWith(prefix));
}

const DocViewer = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [shared, setShared] = useState(false);

  const src = params.get('src');
  const title = params.get('title') ?? 'Document';

  const goBack = useCallback(() => {
    // history.length is 1 when the viewer was opened directly — a shared link,
    // or a cold start in the installed app. Going "back" then would leave the
    // portal entirely, so fall back to Sources.
    if (window.history.length > 1) navigate(-1);
    else navigate('/sales/library');
  }, [navigate]);

  const share = useCallback(async () => {
    if (!src) return;
    const url = new URL(src, window.location.origin).toString();

    try {
      if (navigator.share) {
        // On iOS this is the same sheet as Safari's — which is where Print,
        // Save to Files and AirDrop live.
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // A cancelled share sheet rejects. Nothing to report.
    }
  }, [src, title]);

  if (!isAllowed(src)) {
    return <Navigate to="/sales/library" replace />;
  }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-luxury-gray-900">
      <header className="flex items-center gap-1 bg-primary px-2 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] text-white">
        <button
          type="button"
          onClick={goBack}
          className="flex h-11 items-center gap-1.5 rounded-lg px-3 text-body-sm font-medium transition-colors hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Back
        </button>

        <p className="mx-1 flex-1 truncate text-center text-body-sm font-medium text-white/90">
          {title}
        </p>

        <button
          type="button"
          onClick={share}
          aria-label="Share, print or save"
          className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
        >
          {shared ? (
            <Check className="h-5 w-5 text-accent" aria-hidden="true" />
          ) : (
            <Share2 className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <a
          href={src}
          download
          aria-label="Download"
          className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
        >
          <Download className="h-5 w-5" aria-hidden="true" />
        </a>

        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in browser"
          className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
        >
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
        </a>
      </header>

      {/* An iframe renders PDFs through the platform viewer and HTML directly,
          so one element covers both the handouts and the deck. */}
      <iframe
        src={src}
        title={title}
        className="min-h-0 flex-1 border-0 bg-white"
      />

      <p className="bg-luxury-gray-900 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center text-[11px] text-white/50">
        Share opens your phone&rsquo;s sheet — that is where Print and Save to Files live.
      </p>
    </div>
  );
};

export default DocViewer;
