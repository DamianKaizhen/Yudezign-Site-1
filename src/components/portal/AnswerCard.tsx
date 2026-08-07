import { Link } from 'react-router-dom';
import { AlertTriangle, ExternalLink, Info } from 'lucide-react';

import type { AnswerKeyEntry, NeverSayEntry } from '../../types/salesPortal';
import { isExpired } from '../../lib/salesStatus';
import { resolveLinkTarget } from '../../lib/portalLinks';
import StatusChip from './StatusChip';
import CopyButton from './CopyButton';

interface AnswerCardProps {
  entry: AnswerKeyEntry;
  /** Resolved never-say rows referenced by this entry, for the inline warning. */
  neverSay?: NeverSayEntry[];
}

/**
 * One Answer Key row.
 *
 * A BLOCKED entry gets visibly different treatment — red border, and the
 * literal heading "Say this word for word". The whole reason the Answer Key
 * exists is that improvising these answers creates legal and commercial
 * exposure, so the UI must not let a blocked deflection look like a suggestion.
 */
const AnswerCard = ({ entry, neverSay = [] }: AnswerCardProps) => {
  const blocked = entry.status === 'blocked';
  const expired = entry.status === 'provisional' && isExpired(entry.expiresOn);

  const border = blocked
    ? 'border-red-300 ring-1 ring-red-200'
    : expired
      ? 'border-red-200'
      : 'border-luxury-gray-100';

  return (
    <article
      id={entry.id}
      // scroll-mt clears the sticky portal header when a deep link lands here.
      className={`scroll-mt-32 rounded-xl border bg-white p-5 shadow-luxury-sm sm:p-6 ${border}`}
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <h3 className="flex-1 text-base font-semibold leading-snug text-luxury-gray-900 sm:text-lg">
          {entry.question}
        </h3>
        <StatusChip status={entry.status} expiresOn={entry.expiresOn} size="sm" />
      </div>

      {blocked ? (
        <div className="rounded-lg border-l-4 border-red-600 bg-red-50 p-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-red-800">
            Say this word for word
          </p>
          <p className="text-body-sm leading-relaxed text-luxury-gray-900 sm:text-body">
            {entry.answer}
          </p>
        </div>
      ) : (
        <p className="text-body-sm leading-relaxed text-luxury-gray-700 sm:text-body">
          {entry.answer}
        </p>
      )}

      {expired && (
        <p className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-body-sm text-red-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>
            This ruling expired on{' '}
            {new Date(entry.expiresOn as string).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            . Confirm it with the office before you say it.
          </span>
        </p>
      )}

      {neverSay.length > 0 && (
        <div className="mt-4 rounded-lg bg-red-50/70 p-3">
          {neverSay.map((row) => (
            <p key={row.id} className="text-body-sm text-red-900">
              <span className="font-semibold">Never say:</span> {row.neverSay}
            </p>
          ))}
        </div>
      )}

      {entry.repNote && (
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-luxury-beige p-3 text-body-sm text-luxury-gray-700">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-luxury-gray-500" aria-hidden="true" />
          <span>
            <span className="font-semibold">For you, not the customer: </span>
            {entry.repNote}
          </span>
        </p>
      )}

      {entry.links && entry.links.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {entry.links.map((link) => {
            // Same trap as LinkCard: a PDF path starts with "/" too, and
            // routing it client-side blanks the portal.
            const isRoute = resolveLinkTarget(link.href) === 'route';
            return (
              <li key={link.href}>
                {isRoute ? (
                  <Link
                    to={link.href}
                    className="inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:underline"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
                {link.note && (
                  <span className="block text-body-sm text-luxury-gray-500">{link.note}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-luxury-gray-100 pt-3">
        {entry.source ? (
          <p className="text-[11px] uppercase tracking-wide text-luxury-gray-400">
            Source: {entry.source}
          </p>
        ) : (
          <span />
        )}
        <CopyButton text={entry.answer} label="Copy answer" />
      </div>
    </article>
  );
};

export default AnswerCard;
