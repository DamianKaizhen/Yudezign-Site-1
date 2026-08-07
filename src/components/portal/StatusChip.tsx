import { AlertTriangle, CheckCircle2, Clock, Ban } from 'lucide-react';

import type { AnswerStatus } from '../../types/salesPortal';
import { isExpired } from '../../lib/salesStatus';

interface StatusChipProps {
  status: AnswerStatus;
  /** ISO date. A provisional ruling past this date renders as EXPIRED. */
  expiresOn?: string;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * RULED / PROVISIONAL / BLOCKED, rendered so a rep cannot miss it.
 *
 * A provisional ruling past its expiry flips to "Expired — escalate" on its
 * own. See `lib/salesStatus.ts` for why that matters.
 */
const StatusChip = ({ status, expiresOn, size = 'md', className = '' }: StatusChipProps) => {
  const expired = status === 'provisional' && isExpired(expiresOn);

  const padding = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';
  const base = `inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wide ${padding} ${className}`;

  if (expired) {
    return (
      <span className={`${base} bg-red-100 text-red-800 ring-1 ring-red-300`}>
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        Expired — escalate
      </span>
    );
  }

  if (status === 'blocked') {
    return (
      <span className={`${base} bg-red-700 text-white`}>
        <Ban className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        Blocked
      </span>
    );
  }

  if (status === 'provisional') {
    return (
      <span className={`${base} bg-accent/25 text-accent-dark ring-1 ring-accent/50`}>
        <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        Provisional
        {expiresOn && (
          <span className="font-normal normal-case tracking-normal opacity-80">
            · to {new Date(expiresOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={`${base} bg-primary/10 text-primary ring-1 ring-primary/20`}>
      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
      Ruled
    </span>
  );
};

export default StatusChip;
