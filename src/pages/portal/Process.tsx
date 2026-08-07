import { ArrowRight } from 'lucide-react';

import type { KpiTarget } from '../../types/salesPortal';
import { usePortal } from '../../components/portal/portalContext';
import { SubTabs } from '../../components/portal/PortalNav';
import { useSubTab } from '../../lib/hooks/useSubTab';
import ResponsiveTable, { type TableColumn } from '../../components/portal/ResponsiveTable';
import DocView from '../../components/portal/DocView';

const TABS = [
  { id: 'sop', label: 'The nine stages' },
  { id: 'kpis', label: 'Your numbers' },
  { id: 'sell', label: 'Who we sell to' },
  { id: 'notes', label: 'Reference' },
];

const KPI_COLUMNS: TableColumn<KpiTarget>[] = [
  { key: 'metric', header: 'Metric', render: (row) => row.metric, isRowTitle: true },
  { key: 'target', header: 'Target', render: (row) => row.target },
  { key: 'capturedIn', header: 'Captured in', render: (row) => row.capturedIn },
  { key: 'derivation', header: 'Where it comes from', render: (row) => row.derivation ?? '—' },
];

/**
 * The machine and the numbers.
 *
 * KPI derivations are shown rather than hidden: reps trust numbers whose
 * arithmetic is visible, and "125 dials" reads as arbitrary until you see it is
 * 3 phone days × 40 plus 2 field days × 15.
 */
const Process = () => {
  const { rep } = usePortal();
  const tab = useSubTab('sop');
  const strategy = rep.strategy;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">Process</h1>
        <p className="mt-2 text-body-sm text-luxury-gray-600">
          Nine stages, four handoffs — and how you&rsquo;re measured.
        </p>
      </header>

      <SubTabs tabs={TABS} defaultTab="sop" />

      {tab === 'sop' && (
        <div className="space-y-3">
          {rep.sop.map((stage) => (
            <article
              key={stage.id}
              id={stage.id}
              className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-5 shadow-luxury-sm"
            >
              <div className="mb-2 flex items-start gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-body-sm font-semibold text-white">
                  {stage.order}
                </span>
                <div className="flex-1">
                  <h2 className="font-semibold text-luxury-gray-900">{stage.name}</h2>
                  <p className="text-body-sm text-luxury-gray-500">
                    {stage.systemObject} · owned by {stage.owner}
                  </p>
                </div>
              </div>

              <p className="mb-3 rounded-lg bg-luxury-beige p-3 text-body-sm text-luxury-gray-800">
                <span className="font-semibold">You cannot leave until: </span>
                {stage.exitCriteria}
              </p>

              {stage.steps && (
                <ul className="space-y-1.5">
                  {stage.steps.map((step, i) => (
                    <li key={i} className="flex gap-2.5 text-body-sm text-luxury-gray-700">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              )}

              {stage.handoff && (
                <div className="mt-4 rounded-lg border-l-4 border-accent bg-accent/10 p-3">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-accent-dark">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    Handoff {stage.handoff.label} · {stage.handoff.to}
                  </p>
                  <p className="mt-1 text-body-sm text-luxury-gray-800">
                    {stage.handoff.deliverable}
                  </p>
                </div>
              )}
            </article>
          ))}

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-3 text-body font-semibold text-luxury-gray-900">
              Old term → what we say now
            </h2>
            <dl className="space-y-2">
              {rep.vocabulary.map((row) => (
                <div key={row.oldTerm} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="text-body-sm text-luxury-gray-500 line-through sm:w-64 sm:flex-shrink-0">
                    {row.oldTerm}
                  </dt>
                  <dd className="text-body-sm font-medium text-luxury-gray-900">{row.sayNow}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-luxury-gray-100 pt-3 text-body-sm text-luxury-gray-600">
              Anything in an archived SOP that states a lead time, a deposit percentage or a warranty
              length is superseded by the Answer Key, regardless of how official the old document
              looks.
            </p>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-3 text-body font-semibold text-luxury-gray-900">The quote rules</h2>
            <ol className="space-y-2">
              {rep.quoteRules.map((rule, i) => (
                <li key={i} className="flex gap-3 text-body-sm text-luxury-gray-700">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-3 text-body font-semibold text-luxury-gray-900">Escalation</h2>
            <dl className="space-y-3">
              {rep.escalation.map((row) => (
                <div key={row.situation} className="border-l-2 border-luxury-gray-100 pl-3">
                  <dt className="text-body-sm font-medium text-luxury-gray-900">{row.situation}</dt>
                  <dd className="text-body-sm text-luxury-gray-600">
                    {row.who} — <span className="font-medium">{row.howFast}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )}

      {tab === 'kpis' && (
        <div className="space-y-5">
          <ResponsiveTable
            columns={KPI_COLUMNS}
            rows={rep.kpis}
            rowKey={(row) => row.id}
            caption="Per-rep leading indicators"
          />

          <section className="rounded-xl border-l-4 border-red-600 bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-2 font-semibold text-luxury-gray-900">The ceiling</h2>
            <p className="text-body-sm text-luxury-gray-700">
              The plant runs about 500 cabinets a month for standard, replicable work — 25 a day over
              20 days. Anything over 250 cabinets gets a plant-load check{' '}
              <strong>before you say a delivery date out loud.</strong> Before the sentence, not
              after the quote.
            </p>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-2 font-semibold text-luxury-gray-900">
              What is not measured, on purpose
            </h2>
            <p className="text-body-sm text-luxury-gray-600">
              Hours worked. Emails sent. Miles driven. CRM notes written.
            </p>
          </section>
        </div>
      )}

      {tab === 'sell' && (
        <div className="space-y-5">
          <section className="rounded-xl bg-primary p-5 text-white shadow-luxury">
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Target mix</p>
            <p className="mt-1 text-h4 font-medium">{strategy.targetMix}</p>
            <p className="mt-3 text-body-sm leading-relaxed text-white/80">
              {strategy.targetMixWhy}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">
              What each buyer actually cares about
            </h2>
            <p className="mb-3 text-body-sm text-luxury-gray-600">
              You will lose deals by pitching the wrong thing to the right person.
            </p>
            <div className="space-y-3">
              {strategy.buyers.map((buyer) => (
                <article
                  key={buyer.id}
                  id={buyer.id}
                  className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm"
                >
                  <h3 className="font-semibold text-luxury-gray-900">{buyer.buyer}</h3>
                  <p className="mt-1 text-body-sm text-luxury-gray-600">{buyer.caresAbout}</p>
                  <p className="mt-3 rounded-lg bg-primary/5 p-3 text-body-sm font-medium text-luxury-gray-900">
                    Lead with: {buyer.leadWith}
                  </p>
                  <p className="mt-2 text-body-sm text-luxury-gray-500">
                    <span className="font-medium">Doesn&rsquo;t care about: </span>
                    {buyer.doesNotCareAbout}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">
              The five bulk categories, ranked
            </h2>
            <div className="space-y-2">
              {strategy.bulkLanes.map((lane) => (
                <article
                  key={lane.id}
                  id={lane.id}
                  className="scroll-mt-32 flex gap-3 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-body-sm font-bold text-accent-dark">
                    {lane.rank}
                  </span>
                  <div>
                    <p className="font-semibold text-luxury-gray-900">{lane.category}</p>
                    <p className="text-body-sm font-medium text-primary">{lane.valuePerWin}</p>
                    <p className="mt-1 text-body-sm text-luxury-gray-600">{lane.why}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-3 rounded-xl bg-white p-4 text-body-sm text-luxury-gray-600 shadow-luxury-sm">
              <span className="font-medium">Deliberately skipped: </span>
              {strategy.skipped}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">Anchors</h2>
            <div className="space-y-2">
              {strategy.anchors.map((anchor) => (
                <div
                  key={anchor.id}
                  className={`rounded-xl border-l-4 bg-white p-4 shadow-luxury-sm ${
                    anchor.caution ? 'border-red-600' : 'border-primary'
                  }`}
                >
                  <p className="text-body-sm text-luxury-gray-600">{anchor.label}</p>
                  <p className="text-h4 font-medium text-luxury-gray-900">{anchor.value}</p>
                  {anchor.caution && (
                    <p className="mt-2 rounded-lg bg-red-50 p-3 text-body-sm text-red-900">
                      {anchor.caution}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === 'notes' && (
        <div className="space-y-4">
          {rep.notes.map((note) => (
            <DocView key={note.id} doc={note} className="rounded-xl bg-white p-5 shadow-luxury-sm" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Process;
