import { useMemo } from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

import type { DimensionRow, ProductLine } from '../../types/salesPortal';
import { usePortal } from '../../components/portal/portalContext';
import { SubTabs } from '../../components/portal/PortalNav';
import { useSubTab } from '../../lib/hooks/useSubTab';
import ResponsiveTable, { type TableColumn } from '../../components/portal/ResponsiveTable';
import AnswerCard from '../../components/portal/AnswerCard';
import DocView from '../../components/portal/DocView';

const TABS = [
  { id: 'lines', label: 'The four lines' },
  { id: 'construction', label: 'Construction' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'openings', label: 'Openings' },
  { id: 'framed', label: 'Framed' },
  { id: 'build', label: "What we don't build" },
];

// No hardware columns. Answer Key v1.1 ruled that hinges AND slides are
// identical across all four lines, so a per-line column implies a ladder that
// does not exist — which is exactly the error that reached the spec of record,
// the field card and the booklet. Hardware is stated once, below the table.
const LINE_COLUMNS: TableColumn<ProductLine>[] = [
  {
    key: 'name',
    header: 'Line',
    render: (row) => (
      <>
        {row.name}
        <span className="block text-[11px] font-normal uppercase tracking-wide text-luxury-gray-400">
          {row.tier}
        </span>
      </>
    ),
    isRowTitle: true,
  },
  { key: 'whereItFits', header: 'Where it fits', render: (row) => row.whereItFits },
  { key: 'doors', header: 'Doors', render: (row) => row.doors },
  {
    key: 'collections',
    header: 'Finish collections',
    render: (row) => (
      <>
        {row.collections}
        <span className="ml-1 font-semibold text-primary">· {row.decors} décors</span>
      </>
    ),
  },
];

const DIMENSION_COLUMNS: TableColumn<DimensionRow>[] = [
  { key: 'cabinet', header: 'Cabinet', render: (row) => row.cabinet, isRowTitle: true },
  { key: 'depth', header: 'Depth', render: (row) => row.depth },
  { key: 'height', header: 'Height', render: (row) => row.height },
  { key: 'widths', header: 'Widths', render: (row) => row.widths },
  { key: 'note', header: 'Note', render: (row) => row.note ?? '—' },
];

/**
 * The product-knowledge hub — the portal's primary purpose.
 *
 * The Construction tab surfaces the Answer Key's own §2 and §3 rows rather than
 * restating them, so there is exactly one wording for every product fact and it
 * carries its source. Editing them in one place changes them everywhere.
 */
const Product = () => {
  const { rep } = usePortal();
  const tab = useSubTab('lines');

  const constructionAnswers = useMemo(
    () =>
      rep.answerKey.filter(
        // The framed rows are §2 too, but they have their own tab.
        (entry) => entry.sectionId === 'what-we-make' && !entry.id.startsWith('ak-02-02')
      ),
    [rep.answerKey]
  );
  const lineAnswers = useMemo(
    () => rep.answerKey.filter((entry) => entry.sectionId === 'the-lines'),
    [rep.answerKey]
  );
  // The framed rows live in §2 but belong on their own tab — a rep looking for
  // "do you do framed" should not have to read past the frameless answers.
  const framedAnswers = useMemo(
    () => rep.answerKey.filter((entry) => entry.id.startsWith('ak-02-02')),
    [rep.answerKey]
  );
  const framedDoc = useMemo(
    () => rep.notes.find((note) => note.id === 'framed-line'),
    [rep.notes]
  );
  const neverSayById = useMemo(
    () => new Map(rep.neverSay.map((row) => [row.id, row])),
    [rep.neverSay]
  );

  const resolveNeverSay = (ids?: string[]) =>
    (ids ?? [])
      .map((id) => neverSayById.get(id))
      .filter((row): row is NonNullable<typeof row> => Boolean(row));

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">Product</h1>
        <p className="mt-2 text-body-sm text-luxury-gray-600">
          What we make, how it is built, and the numbers you memorise.
        </p>
      </header>

      <SubTabs tabs={TABS} defaultTab="lines" />

      {tab === 'lines' && (
        <div className="space-y-5">
          <section className="rounded-xl border-l-4 border-accent bg-white p-5 shadow-luxury-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent-dark">
              The single most useful sentence you own
            </p>
            <p className="mt-2 text-body leading-relaxed text-luxury-gray-900">
              {rep.sameBoxSentence}
            </p>
          </section>

          <ResponsiveTable
            columns={LINE_COLUMNS}
            rows={rep.productLines}
            rowKey={(row) => row.id}
            caption="The four cabinet lines"
          />

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-1 text-body font-semibold text-luxury-gray-900">
              The hardware does not ladder
            </h2>
            <p className="mb-3 text-body-sm text-luxury-gray-600">
              Same on every single line — this is the argument, not a hedge.
            </p>
            <dl className="space-y-3">
              {[
                { label: 'Hinges', value: rep.hardware.hinges },
                { label: 'Slides', value: rep.hardware.slides },
                { label: 'Soft close', value: rep.hardware.softClose },
                { label: 'Supply partners', value: rep.hardware.partners },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 text-body-sm text-luxury-gray-800">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 rounded-lg border-l-4 border-accent bg-accent/10 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent-dark">
                Six-way adjustable — say this to every builder
              </p>
              <p className="mt-1 text-body-sm text-luxury-gray-900">{rep.hardware.sixWay}</p>
              <p className="mt-2 text-body-sm text-luxury-gray-600">{rep.hardware.sixWayNote}</p>
            </div>

            <p className="mt-3 rounded-lg bg-red-50 p-3 text-body-sm text-red-900">
              <strong>There is no upgrade to sell.</strong> {rep.hardware.noLadder} We do not fit
              Blum on any line — if you see it on a printed field card or an older brochure, that
              material is stale.
            </p>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-2 text-body font-semibold text-luxury-gray-900">Closets</h2>
            <p className="text-body-sm text-luxury-gray-700">
              {rep.closets.ladder.join(' → ')}. Same ladder logic, built to cabinet standards in the
              same plant. {rep.closets.overlay}
            </p>
            <p className="mt-3 rounded-lg border-l-4 border-primary bg-primary/5 p-3 text-body font-medium text-luxury-gray-900">
              {rep.closets.sayThis}
            </p>
            <p className="mt-3 text-body-sm text-luxury-gray-700">{rep.closets.core}</p>
            <p className="mt-2 text-body-sm text-luxury-gray-700">{rep.closets.plywoodOption}</p>
            <p className="mt-3 rounded-lg bg-red-50 p-3 text-body-sm text-red-900">
              <strong>Never:</strong> {rep.closets.neverSay} The old line — &ldquo;same materials as
              the kitchens&rdquo; — is retired, and it was on the printed field card.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-h4 font-medium text-luxury-gray-900">Hardware and finishes</h2>
            {lineAnswers.map((entry) => (
              <AnswerCard
                key={entry.id}
                entry={entry}
                neverSay={resolveNeverSay(entry.neverSayIds)}
              />
            ))}
          </section>
        </div>
      )}

      {tab === 'openings' && (
        <div className="space-y-4">
          <p className="text-body-sm text-luxury-gray-600">
            Four ways a door opens. {rep.hardwareFinishes}.
          </p>
          {rep.openings.map((opening) => (
            <article
              key={opening.id}
              id={opening.id}
              className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm"
            >
              <h2 className="font-semibold text-luxury-gray-900">{opening.name}</h2>
              <p className="mt-1 text-body-sm text-luxury-gray-700">{opening.what}</p>
              {opening.caution && (
                <p className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-body-sm text-red-900">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>{opening.caution}</span>
                </p>
              )}
            </article>
          ))}

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-2 text-body font-semibold text-luxury-gray-900">Accessories</h2>
            <p className="text-body-sm text-luxury-gray-700">{rep.accessories}</p>
            <p className="mt-3 rounded-lg bg-luxury-beige p-3 text-body-sm text-luxury-gray-800">
              {rep.accessoriesNote}
            </p>
          </section>
        </div>
      )}

      {tab === 'framed' && (
        <div className="space-y-4">
          {framedDoc && (
            <DocView doc={framedDoc} className="rounded-xl bg-white p-5 shadow-luxury-sm" />
          )}
          {framedAnswers.map((entry) => (
            <AnswerCard key={entry.id} entry={entry} neverSay={resolveNeverSay(entry.neverSayIds)} />
          ))}
        </div>
      )}

      {tab === 'construction' && (
        <div className="space-y-4">
          <p className="text-body-sm text-luxury-gray-600">
            How the box is made, in the exact words that are cleared to say. Each row carries the
            document it came from.
          </p>
          {constructionAnswers.map((entry) => (
            <AnswerCard key={entry.id} entry={entry} neverSay={resolveNeverSay(entry.neverSayIds)} />
          ))}
        </div>
      )}

      {tab === 'dimensions' && (
        <div className="space-y-4">
          <p className="text-body-sm text-luxury-gray-600">Memorise these.</p>
          <ResponsiveTable
            columns={DIMENSION_COLUMNS}
            rows={rep.dimensions}
            rowKey={(row) => row.id}
            caption="Standard cabinet dimensions"
          />
          <p className="text-[11px] uppercase tracking-wide text-luxury-gray-400">
            Source: internal product-study notes
          </p>
        </div>
      )}

      {tab === 'build' && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <section className="rounded-xl border-l-4 border-primary bg-white p-5 shadow-luxury-sm">
              <h2 className="mb-3 font-semibold text-primary">We build</h2>
              <ul className="space-y-2">
                {rep.weBuild.map((item) => (
                  <li key={item} className="flex gap-2 text-body-sm text-luxury-gray-700">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border-l-4 border-red-600 bg-white p-5 shadow-luxury-sm">
              <h2 className="mb-3 font-semibold text-red-700">We do not build</h2>
              <ul className="space-y-2">
                {rep.weDoNotBuild.map((item) => (
                  <li key={item} className="flex gap-2 text-body-sm text-luxury-gray-700">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="rounded-xl border-l-4 border-accent bg-white p-5 shadow-luxury-sm">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-accent-dark">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              {rep.shakerDisclosure.heading}
            </p>
            <p className="mt-2 text-body leading-relaxed text-luxury-gray-900">
              {rep.shakerDisclosure.say}
            </p>
            <p className="mt-3 text-body-sm text-luxury-gray-600">{rep.shakerDisclosure.why}</p>
          </section>

          <section className="rounded-xl bg-red-50 p-5">
            <p className="text-body-sm text-red-900">
              <strong>The expo banner says &ldquo;frameless &amp; framed.&rdquo;</strong> We do not
              build framed. If a customer points at the banner and asks for face-frame, the answer is
              still no.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default Product;
