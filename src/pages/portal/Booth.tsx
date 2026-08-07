import { Link } from 'react-router-dom';
import { Flame, Inbox } from 'lucide-react';

import { usePortal } from '../../components/portal/portalContext';
import { SubTabs } from '../../components/portal/PortalNav';
import { useSubTab } from '../../lib/hooks/useSubTab';
import CopyButton from '../../components/portal/CopyButton';
import DocView from '../../components/portal/DocView';

const TABS = [
  { id: 'run', label: 'Run of show' },
  { id: 'table', label: 'At the table' },
  { id: 'followup', label: 'The 48 hours' },
  { id: 'nurture', label: 'Nurture' },
];

const todayIso = () => new Date().toLocaleDateString('en-CA');

/**
 * Show mode.
 *
 * Capture at the booth is on PAPER, deliberately — the digital tool is
 * specified but not built, and a half-working app in a hall with bad wifi loses
 * leads that paper keeps. Nothing on this screen should imply otherwise; it
 * exists to make the paper process fast, not to replace it.
 */
const Booth = () => {
  const { rep } = usePortal();
  const tab = useSubTab('run');
  const booth = rep.booth;
  const today = todayIso();

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">Booth</h1>
        <p className="mt-2 text-body-sm text-luxury-gray-600">
          {booth.eventName} · {booth.venue} · {booth.startsOn} to {booth.endsOn}
        </p>
      </header>

      <section className="rounded-xl bg-primary p-5 text-white shadow-luxury">
        <p className="text-[11px] font-bold uppercase tracking-wider text-accent">The target</p>
        <p className="mt-1 text-h4 font-medium">{booth.leadTarget}</p>
        <p className="mt-3 text-body-sm leading-relaxed text-white/80">{booth.premise}</p>
      </section>

      <SubTabs tabs={TABS} defaultTab="run" />

      {tab === 'run' && (
        <div className="space-y-3">
          {booth.runOfShow.map((slot) => {
            const isToday = slot.day === today;
            return (
              <article
                key={slot.id}
                id={slot.id}
                className={`scroll-mt-32 rounded-xl border bg-white p-4 shadow-luxury-sm ${
                  isToday ? 'border-accent ring-2 ring-accent/30' : 'border-luxury-gray-100'
                }`}
              >
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                    {slot.when}
                  </p>
                  {isToday && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-dark">
                      Today
                    </span>
                  )}
                </div>
                <p className="font-semibold text-luxury-gray-900">{slot.what}</p>
                {slot.detail && (
                  <ul className="mt-2 space-y-1.5">
                    {slot.detail.map((line, i) => (
                      <li key={i} className="flex gap-2.5 text-body-sm text-luxury-gray-700">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}

          <DocView doc={booth.roles} className="rounded-xl bg-white p-5 shadow-luxury-sm" />
        </div>
      )}

      {tab === 'table' && (
        <div className="space-y-5">
          <section>
            <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">Qualify in twenty seconds</h2>
            <div className="space-y-2">
              {booth.qualifying.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm"
                >
                  <p className="font-medium text-luxury-gray-900">{item.label}</p>
                  {item.detail && (
                    <p className="mt-1 text-body-sm text-luxury-gray-600">{item.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">Writing the card</h2>
            <div className="space-y-2">
              {booth.cardRules.map((rule) => (
                <div
                  key={rule.id}
                  id={rule.id}
                  className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm"
                >
                  <p className="font-medium text-luxury-gray-900">{rule.label}</p>
                  {rule.detail && (
                    <p className="mt-1 text-body-sm text-luxury-gray-600">{rule.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border-l-4 border-red-600 bg-white p-4 shadow-luxury-sm">
              <p className="flex items-center gap-2 font-semibold text-red-700">
                <Flame className="h-4 w-4" aria-hidden="true" />
                HOT
              </p>
              <p className="mt-1 text-body-sm text-luxury-gray-700">
                Timeline is now or 1–3 months, <strong>or</strong> ≥5 units, <strong>or</strong> they
                asked for a price.
              </p>
            </div>
            <div className="rounded-xl border-l-4 border-luxury-gray-300 bg-white p-4 shadow-luxury-sm">
              <p className="flex items-center gap-2 font-semibold text-luxury-gray-700">
                <Inbox className="h-4 w-4" aria-hidden="true" />
                REST
              </p>
              <p className="mt-1 text-body-sm text-luxury-gray-700">
                Everything else. Two physical boxes — sort it while you still remember the
                conversation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">Pack list</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {booth.packList.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-luxury-gray-100 bg-white p-3 text-body-sm shadow-luxury-sm"
                >
                  <span className="font-medium text-luxury-gray-900">{item.label}</span>
                  {item.detail && (
                    <span className="block text-luxury-gray-500">{item.detail}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-3 text-body font-semibold text-luxury-gray-900">
              What you hand out, and to whom
            </h2>
            <dl className="space-y-2">
              {rep.handOuts.map((item) => (
                <div key={item.who} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <dt className="text-body-sm text-luxury-gray-500 sm:w-64 sm:flex-shrink-0">
                    {item.who}
                  </dt>
                  <dd className="text-body-sm font-medium text-luxury-gray-900">{item.give}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-luxury-gray-100 pt-3 text-body-sm text-luxury-gray-600">
              {rep.handOutRule}{' '}
              <Link to="/finishes" className="font-medium text-primary hover:underline">
                Open the finish library →
              </Link>
            </p>
          </section>
        </div>
      )}

      {tab === 'followup' && (
        <div className="space-y-3">
          <p className="rounded-xl bg-white p-4 text-body-sm text-luxury-gray-700 shadow-luxury-sm">
            A trade show does not produce revenue. It produces a box of paper that decays at roughly
            20% a day.
          </p>

          {booth.followUp.map((step) => (
            <article
              key={step.id}
              id={step.id}
              className="scroll-mt-32 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm"
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {step.dueWithin}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-luxury-gray-400">
                  {step.channel}
                  {step.owner ? ` · ${step.owner}` : ''}
                </span>
              </div>
              <p className="text-body-sm leading-relaxed text-luxury-gray-800">{step.action}</p>

              {step.template && (
                <div className="mt-3 rounded-lg bg-luxury-beige p-3">
                  <p className="text-body-sm italic leading-relaxed text-luxury-gray-800">
                    {step.template}
                  </p>
                  <div className="mt-2 flex justify-end">
                    <CopyButton text={step.template} label="Copy template" />
                  </div>
                </div>
              )}
            </article>
          ))}

          <section className="rounded-xl bg-white p-5 shadow-luxury-sm">
            <h2 className="mb-3 text-body font-semibold text-luxury-gray-900">Disposition</h2>
            <dl className="space-y-2">
              {booth.dispositions.map((item) => (
                <div key={item.id} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="font-medium text-luxury-gray-900 sm:w-32 sm:flex-shrink-0">
                    {item.label}
                  </dt>
                  <dd className="text-body-sm text-luxury-gray-600">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      )}

      {tab === 'nurture' && (
        <div className="space-y-3">
          <p className="text-body-sm text-luxury-gray-600">
            Five to seven touches over about six weeks. Mixed channels. Every touch gives them
            something rather than asking for something.
          </p>

          {booth.nurture.map((step, i) => (
            <article
              key={step.id}
              id={step.id}
              className="scroll-mt-32 flex gap-3 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm"
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-body-sm font-semibold text-primary">
                {i + 1}
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                  {step.dueWithin} · {step.channel}
                </p>
                <p className="mt-0.5 text-body-sm text-luxury-gray-800">{step.action}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booth;
