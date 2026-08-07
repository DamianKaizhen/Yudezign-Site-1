import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, CalendarClock, PlayCircle, ShieldAlert } from 'lucide-react';

import { usePortal } from '../../components/portal/portalContext';
import { sectionsForRole } from '../../components/portal/sections';
import { isExpired } from '../../lib/salesStatus';

/**
 * The cold open.
 *
 * Reframed on 2026-08-07: this leads with product knowledge and where the
 * answers come from, because that is what the portal is for. The never-say
 * list used to be the first thing on this page; it is still one tap away and
 * still flagged, but it is no longer what a rep is greeted with.
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
  const startVideo = rep.library.videos[0];
  const deck = rep.library.training[0];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">
          Start here
        </h1>
        <p className="mt-3 max-w-2xl text-body leading-relaxed text-luxury-gray-600">
          We manufacture frameless cabinets and closets in our own Houston plant. Everything below is
          traced to a source — if a number here disagrees with the Answer Key, the Answer Key wins.
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
        <h2 className="mb-1 text-h4 font-medium text-luxury-gray-900">Know these three</h2>
        <p className="mb-3 text-body-sm text-luxury-gray-600">
          The product facts that come up in almost every conversation.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <StartCard
            to="/sales/products?t=lines"
            n="1"
            title="The four lines"
            blurb="The box is identical across all four. Only the door, hardware and finish change."
          />
          <StartCard
            to="/sales/products?t=dimensions"
            n="2"
            title="Standard dimensions"
            blurb="Base, wall, tall, bath and ADA. Memorise these — they settle most layout questions on the spot."
          />
          <StartCard
            to="/sales/products?t=build"
            n="3"
            title="What we build, and don't"
            blurb="Frameless only, MDF shaker, nothing over 96″. Knowing the no's is half the job."
          />
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-h4 font-medium text-luxury-gray-900">Where the answers come from</h2>
        <p className="mb-3 text-body-sm text-luxury-gray-600">
          Nothing in this portal was invented. Every ruling carries its source.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/sales/answers"
            className="rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
          >
            <p className="font-semibold text-luxury-gray-900">The Answer Key</p>
            <p className="mt-1 text-body-sm text-luxury-gray-600">
              {rep.answerKey.length} customer questions, one sanctioned answer each. Search it rather
              than browse it.
            </p>
          </Link>
          <Link
            to="/sales/library"
            className="rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
          >
            <p className="font-semibold text-luxury-gray-900">Sources</p>
            <p className="mt-1 text-body-sm text-luxury-gray-600">
              {rep.library.videos.length} explainer videos, the brochure and price-list folders, and
              our own public pages.
            </p>
          </Link>
        </div>

        {deck && (
          <a
            href={deck.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-start gap-3 rounded-xl border-l-4 border-primary bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
          >
            <BookOpenCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                Start with this
              </p>
              <p className="mt-0.5 font-semibold text-luxury-gray-900">{deck.label}</p>
              <p className="mt-1 text-body-sm text-luxury-gray-600">{deck.note}</p>
            </div>
          </a>
        )}

        {startVideo && (
          <a
            href={startVideo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-start gap-3 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
          >
            <PlayCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                If you watch one thing
              </p>
              <p className="mt-0.5 font-semibold text-luxury-gray-900">{startVideo.label}</p>
              <p className="mt-1 text-body-sm text-luxury-gray-600">
                Ten minutes on frameless versus framed — the distinction the whole product rests on.
              </p>
            </div>
          </a>
        )}
      </section>

      <section>
        <h2 className="mb-1 text-h4 font-medium text-luxury-gray-900">Everything else</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
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

      {/* Deliberately near the bottom and understated. It still has to be here —
          improvising a warranty or a deposit is a live commercial exposure — but
          it is not what this portal is for. */}
      <section className="rounded-xl border border-luxury-gray-100 bg-white p-5 shadow-luxury-sm">
        <div className="flex items-start gap-3">
          <ShieldAlert
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-luxury-gray-400"
            aria-hidden="true"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-luxury-gray-900">Before you quote anything</h2>
            <p className="mt-1 text-body-sm leading-relaxed text-luxury-gray-600">
              {counts.blocked} answers are legally or commercially blocked — deposit, warranty, and
              whose booth this is. Those are said word for word. {rep.neverSay.length} more phrases
              are worth knowing so you can avoid them.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/sales/pitch?t=never-say"
                className="rounded-lg bg-luxury-gray-900 px-3.5 py-1.5 text-body-sm font-medium text-white transition-colors hover:bg-primary"
              >
                What not to say
              </Link>
              <Link
                to="/sales/answers?f=blocked"
                className="rounded-lg bg-white px-3.5 py-1.5 text-body-sm font-medium text-luxury-gray-700 ring-1 ring-luxury-gray-200 transition-colors hover:text-primary"
              >
                The {counts.blocked} blocked answers
              </Link>
            </div>
            <p className="mt-3 text-body-sm italic text-luxury-gray-500">{rep.safetyRule}</p>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap gap-3 text-body-sm text-luxury-gray-500">
        <span>
          <span className="font-semibold text-primary">{counts.ruled}</span> ruled
        </span>
        <span aria-hidden="true">·</span>
        <span>
          <span className="font-semibold text-accent-dark">{counts.provisional}</span> provisional
        </span>
        <span aria-hidden="true">·</span>
        <span>
          <span className="font-semibold text-red-700">{counts.blocked}</span> blocked
        </span>
        {counts.expired > 0 && (
          <>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-red-700">
              {counts.expired} expired — confirm with the office
            </span>
          </>
        )}
      </section>
    </div>
  );
};

const StartCard = ({
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

export default StartHere;
