import { AlertTriangle, ArrowRight, Ban, Check } from 'lucide-react';

import type { RepContent } from '../../types/salesPortal';
import { usePortal } from '../../components/portal/portalContext';
import { SubTabs } from '../../components/portal/PortalNav';
import { useSubTab } from '../../lib/hooks/useSubTab';
import CopyButton from '../../components/portal/CopyButton';
import ResponsiveTable, { type TableColumn } from '../../components/portal/ResponsiveTable';

type Rate = RepContent['pricing']['rates'][number];
type Example = RepContent['pricing']['examples'][number];

const RATE_COLUMNS: TableColumn<Rate>[] = [
  { key: 'room', header: 'Room', render: (r) => r.room, isRowTitle: true },
  { key: 'semi', header: 'Semi-custom', render: (r) => r.semiCustom },
  { key: 'custom', header: 'Custom', render: (r) => r.custom },
  { key: 'note', header: 'Note', render: (r) => r.note ?? '—' },
];

const EXAMPLE_COLUMNS: TableColumn<Example>[] = [
  { key: 'job', header: 'Job', render: (r) => r.job, isRowTitle: true },
  { key: 'lf', header: 'Linear feet', render: (r) => r.lf },
  { key: 'semi', header: 'Semi-custom', render: (r) => r.semiCustom },
  { key: 'custom', header: 'Custom', render: (r) => r.custom },
];

const TABS = [
  { id: 'pitch', label: 'Pitch' },
  { id: 'objections', label: 'Objections' },
  { id: 'pricing', label: 'Ballpark pricing' },
  { id: 'qualify', label: 'Questions worth asking' },
  { id: 'never-say', label: 'Careful with' },
];

/**
 * Talk tracks — pitches, objections, ballpark pricing, qualifying questions,
 * and the phrases that carry legal or commercial exposure.
 *
 * Framing note: this was called "Say this" and read as instruction rather than
 * resource, which is the wrong tone for experienced reps. The content is the
 * same approved language; it is offered rather than ordered. The one place that
 * stays blunt is the compliance list, because those genuinely are binding.
 *
 * Copy buttons matter here: retyping a deflection from a phone is where a word
 * gets changed.
 */
const SayThis = () => {
  const { rep } = usePortal();
  const tab = useSubTab('pitch');

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">
          Talk tracks
        </h1>
        <p className="mt-2 text-body-sm text-luxury-gray-600">
          Language that is already approved and in print, so you can reach for it rather than draft
          it mid-conversation. Use what fits and say it your own way — except where a row is marked
          blocked, which is a legal or commercial constraint rather than a style note.
        </p>
      </header>

      <SubTabs tabs={TABS} defaultTab="pitch" />

      {tab === 'pitch' && (
        <div className="space-y-4">
          <section className="rounded-xl bg-primary p-5 text-white shadow-luxury">
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent">The opener</p>
            <p className="mt-2 text-h4 font-medium">&ldquo;{rep.opener}&rdquo;</p>
            <p className="mt-3 text-body-sm leading-relaxed text-white/80">{rep.openerNote}</p>
          </section>

          {rep.pitches.map((pitch) => (
            <article
              key={pitch.id}
              id={pitch.id}
              className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-5 shadow-luxury-sm"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold text-luxury-gray-900">{pitch.label}</h2>
                {pitch.timing && (
                  <span className="text-[11px] uppercase tracking-wide text-luxury-gray-400">
                    {pitch.timing}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {pitch.script.map((beat, i) => (
                  <p key={i} className="text-body-sm leading-relaxed text-luxury-gray-700">
                    {beat}
                  </p>
                ))}
              </div>

              <p className="mt-4 flex items-start gap-2 rounded-lg bg-accent/15 p-3 text-body-sm font-semibold text-luxury-gray-900">
                <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-dark" aria-hidden="true" />
                {pitch.endsOn}
              </p>

              <div className="mt-3 flex justify-end border-t border-luxury-gray-100 pt-3">
                <CopyButton
                  text={`${pitch.script.join(' ')} ${pitch.endsOn}`}
                  label="Copy pitch"
                />
              </div>
            </article>
          ))}

          <p className="rounded-xl border-l-4 border-accent bg-white p-4 text-body-sm font-medium text-luxury-gray-900 shadow-luxury-sm">
            {rep.pitchRule}
          </p>

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-3 text-body font-semibold text-luxury-gray-900">
              Two things you say every single time
            </h2>
            <dl className="space-y-4">
              {rep.alwaysSay.map((item) => (
                <div key={item.when}>
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                    {item.when}
                  </dt>
                  <dd>
                    <p className="mt-0.5 text-body-sm font-medium text-luxury-gray-900">
                      &ldquo;{item.say}&rdquo;
                    </p>
                    <p className="mt-1 text-body-sm text-luxury-gray-600">{item.why}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )}

      {tab === 'objections' && (
        <div className="space-y-3">
          <p className="text-body-sm text-luxury-gray-600">{rep.objectionRule}</p>

          {rep.objections.map((objection) => (
            <details
              key={objection.id}
              id={objection.id}
              className="group scroll-mt-32 overflow-hidden rounded-xl border border-luxury-gray-100 bg-white shadow-luxury-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 font-medium text-luxury-gray-900 hover:bg-luxury-beige/60">
                <span className="flex-1 text-body-sm sm:text-body">
                  &ldquo;{objection.objection}&rdquo;
                </span>
                <span className="flex flex-shrink-0 items-center gap-2">
                  {objection.isBait && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-800">
                      Bait
                    </span>
                  )}
                  <ArrowRight
                    className="h-4 w-4 text-primary transition-transform group-open:rotate-90"
                    aria-hidden="true"
                  />
                </span>
              </summary>

              <div className="border-t border-luxury-gray-100 bg-luxury-beige/40 px-5 py-4">
                {objection.response.map((line, i) => (
                  <p key={i} className="mb-2 text-body-sm leading-relaxed text-luxury-gray-800">
                    {line}
                  </p>
                ))}

                {objection.coaching && (
                  <p className="mt-3 flex items-start gap-2 rounded-lg bg-white p-3 text-body-sm text-luxury-gray-700">
                    <AlertTriangle
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-dark"
                      aria-hidden="true"
                    />
                    <span>{objection.coaching}</span>
                  </p>
                )}

                {objection.response.length > 0 && (
                  <div className="mt-3 flex justify-end">
                    <CopyButton text={objection.response.join(' ')} label="Copy response" />
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      )}

      {tab === 'pricing' && (
        <div className="space-y-4">
          <section className="rounded-xl bg-primary p-5 text-white shadow-luxury">
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
              New — the one number you can give from memory
            </p>
            <p className="mt-2 text-body leading-relaxed">{rep.pricing.headline}</p>
          </section>

          <ResponsiveTable
            columns={RATE_COLUMNS}
            rows={rep.pricing.rates}
            rowKey={(row) => row.id}
            caption="Ballpark pricing per linear foot"
          />
          <p className="text-body-sm font-medium text-luxury-gray-700">{rep.pricing.range}</p>

          <section className="rounded-xl border-l-4 border-red-600 bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-1 font-semibold text-luxury-gray-900">
              The four conditions — say them, don&rsquo;t skip them
            </h2>
            <p className="mb-3 text-body-sm text-luxury-gray-600">
              A ballpark without these is a quote.
            </p>
            <dl className="space-y-2">
              {rep.pricing.conditions.map((c) => (
                <div key={c.id} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <dt className="font-medium text-luxury-gray-900 sm:w-64 sm:flex-shrink-0">
                    {c.label}
                  </dt>
                  <dd className="text-body-sm text-luxury-gray-600">{c.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-xl border-l-4 border-accent bg-white p-5 shadow-luxury-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent-dark">
              How it sounds
            </p>
            <p className="mt-2 text-body leading-relaxed text-luxury-gray-900">
              {rep.pricing.howToSayIt}
            </p>
            <div className="mt-3 flex justify-end">
              <CopyButton text={rep.pricing.howToSayIt} label="Copy" />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">Worked examples</h2>
            <ResponsiveTable
              columns={EXAMPLE_COLUMNS}
              rows={rep.pricing.examples}
              rowKey={(row) => row.id}
              caption="Typical jobs"
            />
          </section>

          <p className="rounded-xl bg-red-50 p-4 text-body-sm text-red-900">
            <strong>Never in writing.</strong> {rep.pricing.neverInWriting}
          </p>
        </div>
      )}

      {tab === 'qualify' && (
        <div className="space-y-3">
          <p className="text-body-sm text-luxury-gray-600">
            The reps who make it are the ones who ask these. All eight are on the back of your field
            card.
          </p>

          {rep.qualifying.map((question, i) => (
            <article
              key={question.id}
              id={question.id}
              className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm"
            >
              <div className="flex gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-body-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-luxury-gray-900">{question.question}</p>
                  <p className="mt-1 text-body-sm text-luxury-gray-600">{question.why}</p>
                  {question.listenFor && (
                    <p className="mt-2 text-body-sm text-luxury-gray-500">
                      <span className="font-medium">Listen for: </span>
                      {question.listenFor.join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {tab === 'never-say' && (
        <div className="space-y-3">
          <p className="rounded-xl bg-red-50 p-4 text-body-sm text-red-900">
            Read this out loud once. These are not style preferences — each one is a live commercial
            or legal exposure.
          </p>

          {rep.neverSay.map((row) => (
            <article
              key={row.id}
              id={row.id}
              className="scroll-mt-32 overflow-hidden rounded-xl border border-luxury-gray-100 bg-white shadow-luxury-sm"
            >
              <div className="flex items-start gap-2.5 border-l-4 border-red-600 bg-red-50/60 p-4">
                <Ban className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-700" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-800">
                    Never say
                  </p>
                  <p className="mt-0.5 text-body-sm font-medium text-luxury-gray-900">
                    {row.neverSay}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-l-4 border-primary p-4">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Say instead
                  </p>
                  <p className="mt-0.5 text-body-sm text-luxury-gray-800">{row.sayInstead}</p>
                  {row.why && (
                    <p className="mt-2 text-body-sm text-luxury-gray-500">{row.why}</p>
                  )}
                </div>
              </div>
            </article>
          ))}

          <div className="rounded-xl border-l-4 border-accent bg-white p-4 shadow-luxury-sm">
            <p className="text-body-sm font-medium text-luxury-gray-900">
              The rule that keeps you safe
            </p>
            <p className="mt-1 text-body-sm leading-relaxed text-luxury-gray-700">
              {rep.safetyRule}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SayThis;
