import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

import type { SearchDoc } from '../../types/salesPortal';
import { searchPortal } from '../../lib/salesSearch';

interface SearchOverlayProps {
  index: SearchDoc[];
  isOpen: boolean;
  onClose: () => void;
}

const KICKER_TONE: Record<string, string> = {
  BLOCKED: 'bg-red-700 text-white',
  'NEVER SAY': 'bg-red-100 text-red-800',
  PROVISIONAL: 'bg-accent/25 text-accent-dark',
  RULED: 'bg-primary/10 text-primary',
};

/**
 * Full-screen search. This is the portal's primary navigation.
 *
 * A rep with a builder in front of them types "deposit" and gets the BLOCKED
 * deflection — they should never have to reason about which tab an answer
 * lives under. Keyboard nav is supported for desk use, but the layout is built
 * for a thumb.
 */
const SearchOverlay = ({ index, isOpen, onClose }: SearchOverlayProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchPortal(index, query), [index, query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      // Delay so the element exists and iOS actually raises the keyboard.
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (event.key === 'Enter' && results[activeIndex]) {
        event.preventDefault();
        navigate(results[activeIndex].href);
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, results, activeIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-luxury-cream"
      role="dialog"
      aria-modal="true"
      aria-label="Search the portal"
    >
      <div className="flex items-center gap-2 border-b border-luxury-gray-100 bg-white px-4 py-3">
        <Search className="h-5 w-5 flex-shrink-0 text-luxury-gray-400" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What did they ask you?"
          aria-label="Search the portal"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-luxury-gray-900 outline-none placeholder:text-luxury-gray-400"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="-mr-2 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-luxury-gray-500 hover:bg-luxury-gray-50"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        {query.trim().length < 2 && (
          <p className="px-1 py-8 text-center text-body-sm text-luxury-gray-500">
            Search every answer, script, objection and rule.
            <br />
            Try &ldquo;deposit&rdquo;, &ldquo;lead time&rdquo; or &ldquo;warranty&rdquo;.
          </p>
        )}

        {query.trim().length >= 2 && results.length === 0 && (
          <div className="px-1 py-8 text-center">
            <p className="text-body-sm text-luxury-gray-600">
              Nothing here matches &ldquo;{query}&rdquo;.
            </p>
            <p className="mx-auto mt-3 max-w-sm rounded-lg bg-white p-4 text-body-sm text-luxury-gray-700 shadow-luxury-sm">
              A question that isn&rsquo;t in the Answer Key goes to the office the same day — and it
              gets added.
            </p>
          </div>
        )}

        <ul className="mx-auto max-w-2xl space-y-2">
          {results.map((result, i) => (
            <li key={`${result.kind}-${result.id}`}>
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  navigate(result.href);
                  onClose();
                }}
                className={`w-full rounded-xl border p-4 text-left transition-colors ${
                  i === activeIndex
                    ? 'border-primary/40 bg-white shadow-luxury'
                    : 'border-luxury-gray-100 bg-white/70 hover:bg-white'
                }`}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      KICKER_TONE[result.kicker ?? ''] ?? 'bg-luxury-gray-100 text-luxury-gray-600'
                    }`}
                  >
                    {result.kicker ?? result.kind}
                  </span>
                </div>
                <p className="text-body-sm font-semibold leading-snug text-luxury-gray-900">
                  {result.title}
                </p>
                <p className="mt-1 line-clamp-2 text-body-sm text-luxury-gray-600">{result.body}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchOverlay;
