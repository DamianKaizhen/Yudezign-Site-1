import { useMemo } from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

import type { DimensionRow, ProductLine } from '../../types/salesPortal';
import { usePortal } from '../../components/portal/portalContext';
import { SubTabs } from '../../components/portal/PortalNav';
import { useSubTab } from '../../lib/hooks/useSubTab';
import ResponsiveTable, { type TableColumn } from '../../components/portal/ResponsiveTable';
import AnswerCard from '../../components/portal/AnswerCard';

const TABS = [
  { id: 'lines', label: 'The four lines' },
  { id: 'construction', label: 'Construction' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'build', label: "What we don't build" },
];

// No Hinges column: they are DTC on every line, so a per-line column implied a
// difference that does not exist. Stated once below the table instead.
const LINE_COLUMNS: TableColumn<ProductLine>[] = [
  { key: 'name', header: 'Line', render: (row) => row.name, isRowTitle: true },
  { key: 'positioning', header: 'Positioning', render: (row) => row.positioning },
  { key: 'doors', header: 'Doors', render: (row) => row.doors },
  { key: 'slide', header: 'Slides', render: (row) => row.slide },
  { key: 'bestFor', header: 'Best for', render: (row) => row.bestFor.join(' · ') },
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
    () => rep.answerKey.filter((entry) => entry.sectionId === 'what-we-make'),
    [rep.answerKey]
  );
  const lineAnswers = useMemo(
    () => rep.answerKey.filter((entry) => entry.sectionId === 'the-lines'),
    [rep.answerKey]
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
              &ldquo;The box is identical across all four lines — same frameless ¾″ plywood carcass,
              same soft-close. What changes is the door surface, the hardware brand and the finish
              family. So you can move up or down without giving up the cabinet.&rdquo;
            </p>
          </section>

          <ResponsiveTable
            columns={LINE_COLUMNS}
            rows={rep.productLines}
            rowKey={(row) => row.id}
            caption="The four cabinet lines"
          />

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-3 text-body font-semibold text-luxury-gray-900">Hardware</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                  Hinges
                </dt>
                <dd className="mt-0.5 text-body-sm text-luxury-gray-800">{rep.hardware.hinges}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                  Slides
                </dt>
                <dd className="mt-0.5 text-body-sm text-luxury-gray-800">{rep.hardware.slides}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                  Supply partners
                </dt>
                <dd className="mt-0.5 text-body-sm text-luxury-gray-800">
                  {rep.hardware.partners}
                </dd>
              </div>
            </dl>
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-body-sm text-red-900">
              <strong>We do not use Blum.</strong> Older material — including the printed handbook
              and field card — lists Blum on Signature, Reserve and Atelier. That is wrong. If a
              customer quotes it back at you, the hinges are DTC.
            </p>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-2 text-body font-semibold text-luxury-gray-900">Closets</h2>
            <p className="text-body-sm text-luxury-gray-700">
              Everyday → Wardrobe → Dressing Room. Same ladder logic. Cabinet-grade construction,
              same materials as the kitchens. Half overlay, so two units can share a panel.
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
