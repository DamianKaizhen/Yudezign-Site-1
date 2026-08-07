import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock } from 'lucide-react';

import { usePortal } from '../../components/portal/portalContext';
import { sectionsForRole } from '../../components/portal/sections';
import { isExpired } from '../../lib/salesStatus';

/**
 * The cold open — what a rep sees first, and the answer to "where do I start?"
 *
 * Three jobs, in order: point at the three things to read before talking to
 * anyone, show the state of the canon (how many answers are blocked, what
 * expires when), and get out of the way.
 */
const StartHere = () => {
  const { rep, role } = usePortal();

  const counts = rep.answerKey.reduce(
    (acc, entry) => {
      acc[entry.status] += 1;
      if (entry.status === 'provisional' && isExpired(entry.expiresOn)) acc.expired += 1;
      return acc;
    },
    { ruled: 0, provisional: 0, blocked: 0, expired: 0 }
  );

  const showStart = new Date(`${rep.booth.startsOn}T00:00:00`);
  const daysToShow = Math.ceil((showStart.getTime() - Date.now()) / 86_400_000);
  const showIsLive = daysToShow <= 0 && new Date(`${rep.booth.endsOn}T23:59:59`) >= new Date();
  const showIsUpcoming = daysToShow > 0 && daysToShow <= 21;

  const sections = sectionsForRole(role).filter((s) => s.to !== '/sales');

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">
          Start here
        </h1>
        <p className="mt-3 max-w-2xl text-body leading-relaxed text-luxury-gray-600">
          {rep.canonRule}
        </p>
      </section>

      {(showIsLive || showIsUpcoming) && (
        <Link
          to="/sales/booth"
          className="block rounded-xl bg-primary p-5 text-white shadow-luxury transition-shadow hover:shadow-luxury-lg"
        >
          <div className="flex items-start gap-3">
            <CalendarClock className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                {showIsLive ? 'Show mode — live now' : `${daysToShow} days out`}
              </p>
              <p className="mt-1 font-semibold">{rep.booth.eventName}</p>
              <p className="mt-1 text-body-sm text-white/80">
                {rep.booth.venue} · {rep.booth.leadTarget}
              </p>
            </div>
            <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-white/60" aria-hidden="true" />
          </div>
        </Link>
      )}

      <section>
        <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">
          Read these three before you talk to anyone
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <ReadFirst
            to="/sales/pitch?t=never-say"
            n="1"
            title="The never-say list"
            blurb={`${rep.neverSay.length} phrases that create live commercial or legal exposure.`}
          />
          <ReadFirst
            to="/sales/pitch?t=pitch"
            n="2"
            title="The thirty seconds"
            blurb="The default pitch and its four segment variants. It always ends on a question."
          />
          <ReadFirst
            to="/sales/answers"
            n="3"
            title="How a row is read"
            blurb="Ruled, provisional, blocked — and what you do about each."
          />
        </div>
      </section>

      <section className="rounded-xl border-l-4 border-accent bg-white p-5 shadow-luxury-sm">
        <p className="text-body-sm font-medium leading-relaxed text-luxury-gray-900">
          {rep.safetyRule}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">The state of the answers</h2>
        <div className="grid grid-cols-3 gap-3">
          <Stat value={counts.ruled} label="Ruled" tone="text-primary" />
          <Stat value={counts.provisional} label="Provisional" tone="text-accent-dark" />
          <Stat value={counts.blocked} label="Blocked" tone="text-red-700" />
        </div>

        {counts.blocked > 0 && (
          <p className="mt-3 text-body-sm text-luxury-gray-600">
            <span className="font-semibold text-red-700">{counts.blocked} blocked answers</span> are
            said word for word — deposit, warranty, and whose booth this is. Do not improvise them.
          </p>
        )}

        {counts.expired > 0 && (
          <p className="mt-2 rounded-lg bg-red-50 p-3 text-body-sm text-red-800">
            {counts.expired} provisional{' '}
            {counts.expired === 1 ? 'ruling has' : 'rulings have'} expired. Confirm with the office
            before using {counts.expired === 1 ? 'it' : 'them'}.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-h4 font-medium text-luxury-gray-900">Everything else</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.to}
                to={section.to}
                className="flex items-start gap-3 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
              >
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-luxury-gray-900">{section.label}</p>
                  <p className="mt-0.5 text-body-sm text-luxury-gray-600">{section.blurb}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const ReadFirst = ({
  to,
  n,
  title,
  blurb,
}: {
  to: string;
  n: string;
  title: string;
  blurb: string;
}) => (
  <Link
    to={to}
    className="rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
  >
    <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{n}</span>
    <p className="mt-1 font-semibold text-luxury-gray-900">{title}</p>
    <p className="mt-1 text-body-sm text-luxury-gray-600">{blurb}</p>
  </Link>
);

const Stat = ({ value, label, tone }: { value: number; label: string; tone: string }) => (
  <div className="rounded-xl border border-luxury-gray-100 bg-white p-4 text-center shadow-luxury-sm">
    <p className={`text-h3 font-medium ${tone}`}>{value}</p>
    <p className="text-[11px] uppercase tracking-wide text-luxury-gray-500">{label}</p>
  </div>
);

export default StartHere;
