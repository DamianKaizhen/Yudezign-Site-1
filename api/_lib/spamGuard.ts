/**
 * Server-side spam gate for the public contact form.
 *
 * Layered defense (all enforced in /api/contact-submit):
 *   1. Honeypot     — a hidden field bots fill but humans leave empty  -> REJECT
 *   2. Timing       — submissions faster than humans can type          -> REJECT
 *   3. Turnstile    — Cloudflare invisible CAPTCHA, verified here       -> REJECT
 *   4. Content      — links / sales-pitch phrases / gibberish          -> QUARANTINE
 *
 * REJECT = block outright (nothing stored, nothing emailed). Used for signals
 * that are definitively bots. QUARANTINE = store the message flagged as 'spam'
 * and send no email — used for fuzzy content signals so a wrongly-flagged real
 * lead is still recorded for review.
 *
 * Turnstile is skipped (submissions allowed) when TURNSTILE_SECRET_KEY is not
 * set, so the form keeps working before keys are configured — the honeypot,
 * timing, and content layers still apply.
 */

export interface SubmissionPayload {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  attachments?: string[];
  // anti-spam fields injected by the form:
  turnstileToken?: string;
  honeypot?: string; // hidden "company_website" field; must stay empty
  formLoadedAt?: number; // epoch ms when the form mounted (for the timing check)
}

export type SpamDecision =
  | { action: 'accept' }
  | { action: 'quarantine'; reason: string }
  | { action: 'reject'; reason: string };

// Minimum plausible time (ms) between the form loading and a human submitting.
const MIN_FILL_MS = 3000;

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Sales-pitch / solicitation phrases seen in the B2B spam that passes a CAPTCHA.
const PITCH_PHRASES = [
  'book a time',
  'grab a time',
  'quick 15',
  '15-minute',
  '15 minute',
  'intro call',
  'hop on a call',
  'schedule a call',
  'reaching out on behalf',
  'we help businesses',
  'we help companies',
  'we help software',
  'redesign your website',
  'refreshed website',
  'first page of google',
  'rank your',
  'boost your',
  'increase your',
  'lead generation',
  'find their next customer',
  'find your next customer',
  'partnership opportunity',
  'guest post',
  'backlink',
  'seo services',
];

const URL_RE = /(https?:\/\/|www\.)/i;

/** Random bot strings: long, no spaces, weird case/vowel patterns (e.g. "UMqkUnPCcurHbFUnIsK"). */
function looksLikeGibberish(value: string): boolean {
  const s = value.trim();
  if (s.length < 8 || /\s/.test(s)) return false;
  const letters = s.replace(/[^a-z]/gi, '');
  if (letters.length < 8) return false;
  const vowels = (s.match(/[aeiou]/gi) || []).length;
  const vowelRatio = vowels / letters.length;
  const caseSwitches = (s.match(/[a-z][A-Z]|[A-Z][a-z]/g) || []).length;
  return vowelRatio < 0.28 || caseSwitches >= 5;
}

/** Returns a reason string if content looks spammy, else null. */
function contentSpamReason(p: SubmissionPayload): string | null {
  const message = (p.message || '').toString();
  const name = (p.name || '').toString();
  const email = (p.email || '').toString();
  const haystack = `${name} ${message}`.toLowerCase();

  if (URL_RE.test(message)) return 'contains-link';

  for (const phrase of PITCH_PHRASES) {
    if (haystack.includes(phrase)) return `pitch-phrase: ${phrase}`;
  }

  if (looksLikeGibberish(message) || looksLikeGibberish(name)) return 'gibberish-text';

  // Gmail "dot abuse" (dots are ignored by Gmail) is a common bot signal.
  if (/@gmail\.com$/i.test(email.trim())) {
    const localDots = (email.split('@')[0].match(/\./g) || []).length;
    if (localDots >= 4) return 'suspicious-email';
  }

  return null;
}

async function verifyTurnstile(
  token: string | undefined,
  ip?: string
): Promise<{ ok: boolean; skipped?: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn('spamGuard: TURNSTILE_SECRET_KEY not set; skipping CAPTCHA check.');
    return { ok: true, skipped: true };
  }
  if (!token) return { ok: false };

  const body = new URLSearchParams();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);

  try {
    const resp = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body });
    const data = (await resp.json()) as { success?: boolean };
    return { ok: !!data.success };
  } catch (error) {
    // On a Cloudflare outage, fail OPEN (allow) — honeypot/timing/content still
    // apply, and we'd rather not block real customers if CF is unreachable.
    console.error('spamGuard: Turnstile verification error; allowing:', error);
    return { ok: true, skipped: true };
  }
}

/**
 * Evaluate a submission. Definitive-bot signals reject; fuzzy content signals
 * quarantine; everything else is accepted.
 */
export async function evaluateSubmission(
  payload: SubmissionPayload,
  ip?: string
): Promise<SpamDecision> {
  // 1. Honeypot — any content here means a bot filled a hidden field.
  if (payload.honeypot && payload.honeypot.trim() !== '') {
    return { action: 'reject', reason: 'honeypot' };
  }

  // 2. Timing — too fast to be a human (only when a plausible timestamp exists).
  if (typeof payload.formLoadedAt === 'number' && payload.formLoadedAt > 0) {
    const elapsed = Date.now() - payload.formLoadedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
      return { action: 'reject', reason: 'too-fast' };
    }
  }

  // 3. Turnstile CAPTCHA.
  const turnstile = await verifyTurnstile(payload.turnstileToken, ip);
  if (!turnstile.ok) {
    return { action: 'reject', reason: 'failed-captcha' };
  }

  // 4. Content heuristics — quarantine (don't hard-reject) to avoid losing a
  //    real lead to a false positive.
  const reason = contentSpamReason(payload);
  if (reason) {
    return { action: 'quarantine', reason };
  }

  return { action: 'accept' };
}
