import { useEffect, useRef, useState } from 'react';
// The LEGACY build, deliberately.
//
// pdfjs-dist 5.x calls `Map.prototype.getOrInsertComputed` — a 2025 proposal
// that no shipping iPhone has yet. The default build only calls it; only the
// legacy build carries the polyfill. On the default build a rep opening a PDF
// gets a TypeError, which is the one device this viewer exists for.
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
// Vite resolves this to a hashed asset URL and leaves the worker out of the
// main graph, so it is fetched only when a PDF is actually opened.
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

/**
 * Renders a PDF page by page into our own scroll container.
 *
 * The obvious implementation — `<iframe src="file.pdf">` — is what this
 * replaces, and it is broken on exactly the device this viewer exists for.
 * iOS WebKit renders a framed PDF as a single, non-scrollable image of page
 * one: the reader sees the cover, cannot reach page two, and the page is
 * stretched to whatever box the frame gives it. That is not a sizing bug that
 * CSS can fix; WebKit simply does not run its PDF viewer inside a frame.
 *
 * Drawing the pages ourselves fixes all of it at once — every page is
 * reachable, each is rendered at its true aspect ratio, and because it is our
 * own DOM the viewer's header stays put, so Back always works.
 */

/** Render a page only once it is near the viewport. A 9 MB, 16-page guide
 *  rendered eagerly would jank the scroll and burn memory on a phone. */
const RENDER_MARGIN = '150% 0px';

interface PageState {
  pageNumber: number;
  /** Height in CSS pixels at the current width, so the placeholder reserves
   *  the right space and the scrollbar doesn't jump as pages render. */
  height: number;
}

const PdfDocument = ({
  src,
  onPageChange,
  onTotalPages,
}: {
  src: string;
  onPageChange?: (page: number) => void;
  onTotalPages?: (total: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [pages, setPages] = useState<PageState[]>([]);
  const [width, setWidth] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Track the container's width so pages re-render crisply on rotate.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let loaded: PDFDocumentProxy | null = null;

    const task = pdfjs.getDocument(src);
    task.onProgress = ({ loaded: got, total }: { loaded: number; total: number }) => {
      if (total > 0) setProgress(Math.round((got / total) * 100));
    };

    task.promise.then(
      (pdf) => {
        if (cancelled) {
          pdf.destroy();
          return;
        }
        loaded = pdf;
        setDoc(pdf);
        onTotalPages?.(pdf.numPages);
      },
      (reason: Error) => {
        if (!cancelled) setError(reason?.message ?? 'Could not open this document.');
      }
    );

    return () => {
      cancelled = true;
      task.destroy();
      loaded?.destroy();
    };
  }, [src, onTotalPages]);

  // Measure every page once, so placeholders hold the correct height before
  // anything is drawn.
  useEffect(() => {
    if (!doc || width === 0) return;
    let cancelled = false;

    (async () => {
      const measured: PageState[] = [];
      for (let n = 1; n <= doc.numPages; n += 1) {
        const page = await doc.getPage(n);
        const viewport = page.getViewport({ scale: 1 });
        measured.push({ pageNumber: n, height: (width / viewport.width) * viewport.height });
      }
      if (!cancelled) setPages(measured);
    })();

    return () => {
      cancelled = true;
    };
  }, [doc, width]);

  // Report which page is in view, for the header's counter.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || pages.length === 0 || !onPageChange) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          onPageChange(Number((visible.target as HTMLElement).dataset.page));
        }
      },
      { root: el, threshold: [0.1, 0.5, 0.9] }
    );

    el.querySelectorAll('[data-page]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pages, onPageChange]);

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-body text-white/80">This document could not be opened.</p>
        <p className="text-body-sm text-white/50">{error}</p>
        <a
          href={src}
          download
          className="mt-2 rounded-lg bg-white/10 px-4 py-2 text-body-sm text-white hover:bg-white/20"
        >
          Download it instead
        </a>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      {!doc && (
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white/70" />
          {progress > 0 && <p className="text-body-sm text-white/50">{progress}%</p>}
        </div>
      )}

      {pages.map((page) => (
        <PdfPage
          key={page.pageNumber}
          doc={doc}
          pageNumber={page.pageNumber}
          width={width}
          height={page.height}
        />
      ))}
    </div>
  );
};

/** One page: a correctly-sized placeholder that paints itself when scrolled near. */
const PdfPage = ({
  doc,
  pageNumber,
  width,
  height,
}: {
  doc: PDFDocumentProxy | null;
  pageNumber: number;
  width: number;
  height: number;
}) => {
  const holderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: RENDER_MARGIN }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !doc || width === 0) return;
    let cancelled = false;
    let task: RenderTask | null = null;

    (async () => {
      const page = await doc.getPage(pageNumber);
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;

      const base = page.getViewport({ scale: 1 });
      // Cap the device pixel ratio: at 3x a full-bleed page is a 30-megapixel
      // canvas, and iOS silently drops canvases past its memory ceiling.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: (width / base.width) * dpr });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext('2d');
      if (!context) return;

      task = page.render({ canvas, canvasContext: context, viewport });
      try {
        await task.promise;
      } catch {
        // Cancelled by a re-render at a new width. Nothing to report.
      }
    })();

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [visible, doc, pageNumber, width]);

  return (
    <div
      ref={holderRef}
      data-page={pageNumber}
      style={{ height }}
      className="relative mx-auto mb-2 w-full bg-white shadow-lg"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default PdfDocument;
