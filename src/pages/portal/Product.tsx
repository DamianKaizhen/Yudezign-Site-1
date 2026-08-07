import { Link } from 'react-router-dom';
import { AlertTriangle, Check, X } from 'lucide-react';

import type { DimensionRow, ProductLine } from '../../types/salesPortal';
import { usePortal } from '../../components/portal/portalContext';
import { SubTabs } from '../../components/portal/PortalNav';
import { useSubTab } from '../../lib/hooks/useSubTab';
import ResponsiveTable, { type TableColumn } from '../../components/portal/ResponsiveTable';
import LinkCard from '../../components/portal/LinkCard';

const TABS = [
  { id: 'lines', label: 'The four lines' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'build', label: 'What we build' },
  { id: 'site', label: 'On our site' },
];

const LINE_COLUMNS: TableColumn<ProductLine>[] = [
  { key: 'name', header: 'Line', render: (row) => row.name, isRowTitle: true },
  { key: 'positioning', header: 'Positioning', render: (row) => row.positioning },
  { key: 'doors', header: 'Doors', render: (row) => row.doors },
  { key: 'hinge', header: 'Hinges', render: (row) => row.hinge },
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

const Product = () => {
  const { rep } = usePortal();
  const tab = useSubTab('lines');

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">Product</h1>
        <p className="mt-2 text-body-sm text-luxury-gray-600">
          What we make, what we don&rsquo;t, and the numbers you memorise.
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
            <h2 className="mb-2 text-body font-semibold text-luxury-gray-900">Closets</h2>
            <p className="text-body-sm text-luxury-gray-700">
              Everyday → Wardrobe → Dressing Room. Same ladder logic. Cabinet-grade construction,
              same materials as the kitchens. Half overlay, so two units can share a panel.
            </p>
          </section>
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

      {tab === 'site' && (
        <div className="space-y-4">
          <p className="text-body-sm text-luxury-gray-600">
            Pages on the public site you can send a customer to, or open in front of them.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {rep.library.siteLinks.map((link) => (
              <LinkCard key={link.href} link={link} />
            ))}
          </div>
          <p className="rounded-xl bg-white p-4 text-body-sm text-luxury-gray-600 shadow-luxury-sm">
            The finish library at{' '}
            <Link to="/finishes" className="font-medium text-primary hover:underline">
              /finishes
            </Link>{' '}
            is where the booth QR points.
          </p>
        </div>
      )}
    </div>
  );
};

export default Product;
