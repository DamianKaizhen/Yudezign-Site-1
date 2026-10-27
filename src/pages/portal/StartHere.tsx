import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  CalendarClock,
  Compass,
  Library,
  MessageSquareQuote,
  Package,
  PlayCircle,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

import { usePortal } from '../../components/portal/portalContext';
import { isExpired } from '../../lib/salesStatus';

/**
 * The cold open — written for a rep who was not at the August presentation.
 *
 * Reworked on 2026-10-27 (Damian: "the portal builds on the assumption that
 * people were at the presentation"). The page now walks in order: what we sell,
 * how to learn it, the five facts that cannot be wrong, where answers live, how
 * a job moves, and the printed pack. "Answer Key" is explained the first time
 * it appears instead of assumed. Product facts here mirror Answer Key v1.5; if
 * they ever disagree, the Answer Key wins and this page is what is wrong.
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

  const videos = rep.library.training.filter((item) => item.kind === 'video');
  const reading = rep.library.training.filter((item) => item.kind !== 'video');
  const fieldCard = rep.library.repPack.find((item) => /field card/i.test(item.label));

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">
          Start here
        </h1>
        <p className="mt-3 max-w-2xl text-body leading-relaxed text-luxury-gray-600">
          YuDeZign manufactures European frameless cabinetry, closets and vanities in its own Houston
          plant, and stocks a framed cabinet line it resells. This portal holds the approved product
          facts and the words to use with a customer.
        </p>
        <p className="mt-3 max-w-2xl text-body-sm leading-relaxed text-luxury-gray-600">
          Every answer here traces back to <strong className="text-luxury-gray-900">the Answer Key</strong>,
          the one document that settles what we say to a customer, kept by the office and versioned
          ({rep.version}). Where anything disagrees with it, the Answer Key wins.
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

      {/* 1 · What we sell */}
      <section>
        <SectionHeading n="1" title="What we sell" blurb="Two product programs. Know which one a customer is asking about." />
        <div className="grid gap-3 sm:grid-cols-2">
          <BigCard
            to="/sales/products?t=lines"
            icon={Package}
            kicker="Made to measure"
            title="Frameless cabinetry, built to order in Houston"
            blurb="Kitchens, closets, vanities, mudrooms, media walls and commercial casework. One ¾″ plywood box and the same hardware across four Styles — Essential, Signature, Reserve, Atelier — each with five standard colours, and a deeper library on request."
          />
          <BigCard
            to="/sales/products?t=framed"
            icon={Package}
            kicker="Stocked framed line"
            title="A framed, ready-to-assemble line we buy in and resell"
            blurb="Three collections, stock sizes, flat-pack or assembled, on the floor now. Shown only on three triggers: the customer needs cabinets now, wants a face-frame look, or has a budget a made-to-measure build will not reach."
          />
        </div>
      </section>

      {/* 2 · Learn it */}
      <section>
        <SectionHeading n="2" title="Learn it" blurb="About an hour, in this order. The videos cover both programs; the deck and the guide go deeper." />
        <div className="space-y-3">
          {videos.map((video, i) => (
            <a
              key={video.href}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl border-l-4 border-primary bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
            >
              <PlayCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                  Watch {i + 1} of {videos.length}
                  {video.duration ? ` · ${video.duration}` : ''}
                </p>
                <p className="mt-0.5 font-semibold text-luxury-gray-900">{video.label}</p>
                {video.note && <p className="mt-1 text-body-sm text-luxury-gray-600">{video.note}</p>}
              </div>
            </a>
          ))}
          {reading.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
            >
              <BookOpenCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                  Then read
                </p>
                <p className="mt-0.5 font-semibold text-luxury-gray-900">{item.label}</p>
                {item.note && <p className="mt-1 text-body-sm text-luxury-gray-600">{item.note}</p>}
              </div>
            </a>
          ))}
          {fieldCard && (
            <a
              href={fieldCard.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
            >
              <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">
                  Then carry
                </p>
                <p className="mt-0.5 font-semibold text-luxury-gray-900">{fieldCard.label}</p>
                <p className="mt-1 text-body-sm text-luxury-gray-600">
                  One sheet, two sides, the facts and the phrases. Print it and keep it in the truck.
                </p>
              </div>
            </a>
          )}
        </div>
      </section>

      {/* 3 · The five you cannot get wrong */}
      <section>
        <SectionHeading n="3" title="The five you cannot get wrong" blurb="The facts that come up in almost every conversation. Each one opens the page behind it." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <FactCard
            to="/sales/products?t=framed"
            n="1"
            title="We build frameless. We stock framed."
            blurb="Frameless, made to order in Houston: the hinge mounts to the side panel, so the opening is the full width of the box. The framed line is a stocked product we resell, and you say so the moment it comes up."
          />
          <FactCard
            to="/sales/products?t=construction"
            n="2"
            title="One box, one hinge, the slide by box depth"
            blurb="¾″ plywood box, DTC soft-close hinge on every Style. The slide is set by box depth: DTC concealed undermount on 21″ and 24″ boxes, KV 8450FM on the rest. There is no hardware upgrade to sell."
          />
          <FactCard
            to="/sales/products?t=lines"
            n="3"
            title="Four Styles, twenty standard colours"
            blurb="Essential, Signature, Reserve, Atelier. Same box, same motion, different skin. Five standard colours each; say “twenty standard colours, and a deeper library on request.”"
          />
          <FactCard
            to="/sales/products?t=build"
            n="4"
            title="The shaker is machined MDF, and you say so first"
            blurb="A custom shaker is one piece of MDF in RTF, costs more than the slab and is not recommended. Volunteer it before they ask, and send shaker buyers to the stocked framed line."
          />
          <FactCard
            to="/sales/answers?f=blocked"
            n="5"
            title="Timing, deposit, warranty and installation come from the office"
            blurb="“In as little as two weeks, depending on finish and scale; the quote carries the date.” Never a deposit figure or a warranty length. Installation runs through partner contractors inside Greater Houston, on a separate quote."
          />
        </div>
      </section>

      {/* 4 · When a customer asks */}
      <section>
        <SectionHeading n="4" title="When a customer asks" blurb="Two places. Search the first; read the second once." />
        <div className="grid gap-3 sm:grid-cols-2">
          <BigCard
            to="/sales/answers"
            icon={BookOpen}
            kicker="Answers"
            title={`${rep.answerKey.length} customer questions, one approved answer each`}
            blurb="The Answer Key, searchable. Every entry shows where the answer came from and whether it is ruled, provisional or blocked. Blocked means you say the scripted deflection word for word."
          />
          <BigCard
            to="/sales/pitch"
            icon={MessageSquareQuote}
            kicker="Talk tracks"
            title="The pitch, the objections, the questions to ask"
            blurb={`The thirty-second opener for each kind of buyer, ${rep.objections.length} objections with their answers, the qualifying questions, and the ${rep.neverSay.length} phrases to avoid.`}
          />
        </div>
      </section>

      {/* 5 · How a job moves */}
      <section>
        <SectionHeading n="5" title="How a job moves" blurb="From first contact to the thirty-day call, and the only prices you may say." />
        <BigCard
          to="/sales/process"
          icon={Compass}
          kicker="Process"
          title="Nine stages, four hand-offs, your numbers"
          blurb="Who owns each stage and where it hands off, the system's own vocabulary for a lead, an estimate and a project, the discovery sheet that is the quote request, and the services you may quote: assembly, delivery, pickup."
        />
      </section>

      {/* 6 · The library */}
      <section>
        <SectionHeading n="6" title="Your documents" blurb="Everything above lives here as a file, plus what is safe to send a client." />
        <BigCard
          to="/sales/library"
          icon={Library}
          kicker="Library"
          title="The printed pack, the deck, the videos, the brochures"
          blurb="Field card, brief, discovery sheet and handbook as PDFs; the training videos and the deck; third-party explainer videos with their warnings; the line guide, flyers and brochures that are safe to hand a customer."
        />
        {role === 'manager' && (
          <div className="mt-3">
            <BigCard
              to="/sales/manager"
              icon={ShieldCheck}
              kicker="Manager"
              title="Comp, quota, certification, open questions"
              blurb="Manager-only. Reps never receive this content from the server."
            />
          </div>
        )}
      </section>

      {/* Deliberately last and understated: improvising a warranty or a deposit is
          a live commercial exposure, but it is not what this portal is for. */}
      <section className="rounded-xl border border-luxury-gray-100 bg-white p-5 shadow-luxury-sm">
        <div className="flex items-start gap-3">
          <ShieldAlert
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-luxury-gray-400"
            aria-hidden="true"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-luxury-gray-900">Before you quote anything</h2>
            <p className="mt-1 text-body-sm leading-relaxed text-luxury-gray-600">
              {counts.blocked} answers are legally or commercially blocked, deposit and warranty among
              them. Those are said word for word. {rep.neverSay.length} more phrases are worth knowing
              so you can avoid them.
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
        <span>{rep.version}</span>
        <span aria-hidden="true">·</span>
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

const SectionHeading = ({ n, title, blurb }: { n: string; title: string; blurb: string }) => (
  <div className="mb-3">
    <p className="text-[11px] font-bold uppercase tracking-wider text-accent">Step {n}</p>
    <h2 className="mt-0.5 text-h4 font-medium text-luxury-gray-900">{title}</h2>
    <p className="mt-1 text-body-sm text-luxury-gray-600">{blurb}</p>
  </div>
);

const BigCard = ({
  to,
  icon: Icon,
  kicker,
  title,
  blurb,
}: {
  to: string;
  icon: typeof Package;
  kicker: string;
  title: string;
  blurb: string;
}) => (
  <Link
    to={to}
    className="flex items-start gap-3 rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury"
  >
    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
    <div className="flex-1">
      <p className="text-[11px] font-bold uppercase tracking-wider text-luxury-gray-400">{kicker}</p>
      <p className="mt-0.5 font-semibold text-luxury-gray-900">{title}</p>
      <p className="mt-1 text-body-sm leading-relaxed text-luxury-gray-600">{blurb}</p>
    </div>
    <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-luxury-gray-300" aria-hidden="true" />
  </Link>
);

const FactCard = ({
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
    <p className="mt-1 text-body-sm leading-relaxed text-luxury-gray-600">{blurb}</p>
  </Link>
);

export default StartHere;
