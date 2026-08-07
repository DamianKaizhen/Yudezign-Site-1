import { Link } from 'react-router-dom';
import { AlertTriangle, ExternalLink } from 'lucide-react';

import type { ContentLink } from '../../types/salesPortal';

const KIND_LABEL: Record<ContentLink['kind'], string> = {
  video: 'Video',
  doc: 'Document',
  drive: 'Drive folder',
  app: 'App',
  site: 'On our site',
  portal: 'In this portal',
};

/**
 * A card for anything that points somewhere else — a training video, a Drive
 * folder, an App Store listing, or a page on the public site.
 *
 * `caution` gets loud treatment. One of the ten training videos demonstrates
 * rail-and-stile shaker, which is precisely what we do NOT build, and a rep who
 * watches it without that flag learns the wrong thing confidently.
 */
const LinkCard = ({ link }: { link: ContentLink }) => {
  const isInternal = link.href.startsWith('/');

  const body = (
    <>
      <div className="mb-1 flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-gray-400">
          {KIND_LABEL[link.kind]}
        </span>
        {link.duration && (
          <span className="text-[10px] text-luxury-gray-400">· {link.duration}</span>
        )}
        {link.pending && (
          <span className="rounded-full bg-accent/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-dark">
            Coming soon
          </span>
        )}
      </div>

      <p className="flex items-start gap-1.5 text-body-sm font-semibold leading-snug text-luxury-gray-900">
        <span>{link.label}</span>
        {!isInternal && !link.pending && (
          <ExternalLink
            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-luxury-gray-400"
            aria-hidden="true"
          />
        )}
      </p>

      {link.note && (
        <p className="mt-2 text-body-sm leading-relaxed text-luxury-gray-600">{link.note}</p>
      )}

      {link.caution && (
        <p className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-body-sm text-red-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{link.caution}</span>
        </p>
      )}
    </>
  );

  // A second format of the same document sits inside the card rather than
  // getting its own — two cards for one handout just reads as a duplicate.
  const alt = link.altHref ? (
    <a
      href={link.altHref}
      onClick={(event) => event.stopPropagation()}
      className="mt-3 inline-block text-body-sm font-medium text-primary hover:underline"
    >
      {link.altLabel ?? 'Alternate format'} →
    </a>
  ) : null;

  const shell =
    'block rounded-xl border border-luxury-gray-100 bg-white p-4 shadow-luxury-sm transition-shadow hover:shadow-luxury';

  // Nothing to link to yet — render the card, but not as something clickable.
  if (link.pending) {
    return <div className={`${shell} opacity-90`}>{body}</div>;
  }

  // With a second format the card can't be one big anchor, or the inner link
  // would be nested inside it.
  if (alt) {
    return (
      <div className={shell}>
        {isInternal ? (
          <Link to={link.href} className="block hover:opacity-90">
            {body}
          </Link>
        ) : (
          <a href={link.href} target="_blank" rel="noopener noreferrer" className="block">
            {body}
          </a>
        )}
        {alt}
      </div>
    );
  }

  return isInternal ? (
    <Link to={link.href} className={shell}>
      {body}
    </Link>
  ) : (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={shell}>
      {body}
    </a>
  );
};

export default LinkCard;
