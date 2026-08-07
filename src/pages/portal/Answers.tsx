import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

import type { AnswerStatus } from '../../types/salesPortal';
import { usePortal } from '../../components/portal/portalContext';
import AnswerCard from '../../components/portal/AnswerCard';
import StatusChip from '../../components/portal/StatusChip';

type StatusFilter = AnswerStatus | 'all';

const FILTERS: Array<{ id: StatusFilter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'ruled', label: 'Ruled' },
  { id: 'provisional', label: 'Provisional' },
  { id: 'blocked', label: 'Blocked' },
];

/**
 * The Answer Key.
 *
 * Section pills come from the source document's own §1-§11 structure, so a rep
 * who has read the printed handbook finds the same shape here. Sections that
 * are not question/answer tables (never-say, escalation, open items) live on
 * their own tabs and are linked from here rather than duplicated.
 */
const Answers = () => {
  const { rep } = usePortal();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  // ?f= lets other screens deep-link a filtered view, e.g. "the 3 blocked
  // answers" from Start here.
  const filterParam = searchParams.get('f');
  const initialStatus: StatusFilter =
    filterParam === 'ruled' || filterParam === 'provisional' || filterParam === 'blocked'
      ? filterParam
      : 'all';
  const [status, setStatus] = useState<StatusFilter>(initialStatus);

  // Only sections that actually carry answer rows get a pill.
  const sections = useMemo(
    () => rep.answerKeySections.filter((s) => rep.answerKey.some((e) => e.sectionId === s.id)),
    [rep]
  );

  const activeSection = searchParams.get('s') ?? sections[0]?.id ?? '';
  const neverSayById = useMemo(
    () => new Map(rep.neverSay.map((row) => [row.id, row])),
    [rep.neverSay]
  );

  const entries = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    return rep.answerKey.filter((entry) => {
      // A status filter searches every section too — "show me the blocked ones"
      // is meaningless scoped to one tab.
      const scopeToSection = !trimmed && status === 'all';
      if (scopeToSection && entry.sectionId !== activeSection) return false;
      if (status !== 'all' && entry.status !== status) return false;
      if (!trimmed) return true;

      const haystack = [entry.question, entry.answer, entry.repNote, ...(entry.aliases ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [rep.answerKey, activeSection, status, query]);

  const currentSection = sections.find((s) => s.id === activeSection);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">Answers</h1>
        <p className="mt-2 text-body-sm text-luxury-gray-600">
          Every answer you give a customer. {rep.version}.
        </p>
      </header>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-luxury-gray-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter every section…"
          aria-label="Filter answers"
          className="w-full rounded-lg border border-luxury-gray-200 py-2.5 pl-9 pr-3 text-body-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setStatus(filter.id)}
            aria-pressed={status === filter.id}
            className={`rounded-full px-3.5 py-1.5 text-body-sm font-medium transition-colors ${
              status === filter.id
                ? 'bg-primary text-white'
                : 'bg-white text-luxury-gray-600 ring-1 ring-luxury-gray-100 hover:text-primary'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {!query.trim() && status === 'all' && (
        <div className="flex snap-x gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.set('s', section.id);
                setSearchParams(next, { replace: true });
              }}
              className={`snap-start whitespace-nowrap rounded-md px-3.5 py-2 text-body-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-luxury-gray-900 text-white'
                  : 'bg-white text-luxury-gray-600 ring-1 ring-luxury-gray-100 hover:text-primary'
              }`}
            >
              <span className="mr-1.5 opacity-50">{section.number}</span>
              {section.title}
            </button>
          ))}
        </div>
      )}

      {!query.trim() && status === 'all' && currentSection?.blurb && (
        <p className="text-body-sm text-luxury-gray-600">{currentSection.blurb}</p>
      )}

      {(query.trim() || status !== 'all') && (
        <p className="text-body-sm text-luxury-gray-500">
          {entries.length} {entries.length === 1 ? 'match' : 'matches'} across all sections
        </p>
      )}

      <div className="space-y-4">
        {entries.map((entry) => (
          <AnswerCard
            key={entry.id}
            entry={entry}
            neverSay={(entry.neverSayIds ?? [])
              .map((id) => neverSayById.get(id))
              .filter((row): row is NonNullable<typeof row> => Boolean(row))}
          />
        ))}

        {entries.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center shadow-luxury-sm">
            <p className="text-body-sm text-luxury-gray-600">Nothing here matches that filter.</p>
            <p className="mt-3 text-body-sm text-luxury-gray-500">
              A question that isn&rsquo;t in the Answer Key goes to the office the same day — and it
              gets added.
            </p>
          </div>
        )}
      </div>

      <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
        <h2 className="mb-3 text-body font-semibold text-luxury-gray-900">How to read a row</h2>
        <dl className="space-y-3">
          {rep.statusLegend.map((item) => (
            <div key={item.status} className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
              <dt className="sm:w-40 sm:flex-shrink-0">
                <StatusChip status={item.status} size="sm" />
              </dt>
              <dd className="text-body-sm text-luxury-gray-600">
                {item.meaning}{' '}
                <span className="font-medium text-luxury-gray-900">{item.whatYouDo}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
};

export default Answers;
