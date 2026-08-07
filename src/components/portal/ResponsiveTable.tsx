import type { ReactNode } from 'react';

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  /** Hide this column's label in the stacked mobile view (for the row's title column). */
  isRowTitle?: boolean;
}

interface ResponsiveTableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption?: string;
}

/**
 * A table on desktop, a stack of labelled cards on mobile.
 *
 * The source documents are full of wide reference tables — standard dimensions,
 * the four lines, KPI targets. At 390px a real table either overflows the page
 * or shrinks the type past readable, and a rep reading standard dimensions at a
 * booth is the single worst place for either. So below `md` each row becomes a
 * card of label/value pairs, and the table only appears when there is width for
 * it.
 */
function ResponsiveTable<T>({ columns, rows, rowKey, caption }: ResponsiveTableProps<T>) {
  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((row) => {
          const titleColumn = columns.find((c) => c.isRowTitle) ?? columns[0];
          const rest = columns.filter((c) => c !== titleColumn);

          return (
            <div
              key={rowKey(row)}
              id={rowKey(row)}
              className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm"
            >
              <p className="mb-3 text-base font-semibold text-luxury-gray-900">
                {titleColumn.render(row)}
              </p>
              <dl className="space-y-2">
                {rest.map((column) => (
                  <div key={column.key} className="flex gap-3">
                    <dt className="w-24 flex-shrink-0 text-[11px] font-semibold uppercase tracking-wide text-luxury-gray-400">
                      {column.header}
                    </dt>
                    <dd className="flex-1 text-body-sm text-luxury-gray-700">
                      {column.render(row)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>

      {/* Desktop: a real table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full overflow-hidden rounded-xl bg-white shadow-luxury-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-primary text-white">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-luxury-gray-100">
            {rows.map((row) => (
              <tr key={rowKey(row)} id={`row-${rowKey(row)}`} className="scroll-mt-32 align-top">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-4 text-body-sm ${
                      column.isRowTitle
                        ? 'font-semibold text-luxury-gray-900'
                        : 'text-luxury-gray-700'
                    }`}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ResponsiveTable;
