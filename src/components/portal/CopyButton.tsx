import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

/**
 * Copy a sanctioned answer or a follow-up template to the clipboard.
 *
 * Reps text these to prospects from the booth floor. Retyping a BLOCKED
 * deflection from a phone screen is exactly where a word gets changed.
 */
const CopyButton = ({ text, label = 'Copy', className = '' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable over plain http and in some in-app browsers.
      // Silent failure is better than an error toast a rep has to dismiss.
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : label}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-luxury-gray-600 transition-colors hover:bg-luxury-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span className="text-primary">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;
