import type { VercelRequest, VercelResponse } from '@vercel/node';
import { evaluateSubmission, type SubmissionPayload } from './_lib/spamGuard.js';
import { addContactMessage } from './_lib/contactStore.js';
import { sendContactNotifications, type ContactSubmission } from './_lib/contactEmail.js';

/**
 * Public contact-form endpoint (the ONLY endpoint the form calls).
 *
 * Flow: spam gate -> store the lead -> send notification + confirmation emails.
 * Consolidating into one endpoint lets us verify the single-use Turnstile token
 * exactly once and gate every write in one place. Storing and emailing run in
 * parallel (Promise.allSettled) so one failing never blocks the other.
 */

function clientIp(req: VercelRequest): string | undefined {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string') return xff.split(',')[0].trim();
  if (Array.isArray(xff)) return xff[0];
  return req.socket?.remoteAddress || undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const body = (req.body || {}) as SubmissionPayload;

  // Minimal required-field validation.
  if (!body.name || !body.email || !body.phone) {
    return res.status(400).json({ success: false, error: 'Name, email, and phone are required.' });
  }

  // Spam gate.
  const decision = await evaluateSubmission(body, clientIp(req));
  if (decision.action === 'reject') {
    console.warn(`contact-submit: rejected submission (${decision.reason})`);
    return res.status(403).json({
      success: false,
      error: 'We could not verify your submission. Please reload the page and try again, or call us at (281) 568-8000.',
    });
  }

  const submittedAt = new Date().toISOString();
  const source = 'Yudezign Website';

  // Fields to persist (anti-spam fields stripped).
  const storeInput = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    projectType: body.projectType || '',
    budget: body.budget,
    timeline: body.timeline || '',
    message: body.message || '',
    attachments: body.attachments,
    source,
    submittedAt,
  };

  // Quarantine: store flagged as spam, send NO email. Respond success so the
  // spammer isn't tipped off and a false-positive real lead still gets the
  // normal confirmation UX (and is recorded for review in the admin panel).
  if (decision.action === 'quarantine') {
    try {
      await addContactMessage({ ...storeInput, status: 'spam', spamReason: decision.reason });
      console.warn(`contact-submit: quarantined submission (${decision.reason})`);
    } catch (error) {
      console.error('contact-submit: failed to store quarantined message:', error);
    }
    return res.status(200).json({ success: true, quarantined: true });
  }

  // Accept: store + notify in parallel (independent, resilient).
  const submission: ContactSubmission = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    projectType: body.projectType,
    budget: body.budget,
    timeline: body.timeline,
    message: body.message,
    attachments: body.attachments,
    submittedAt,
    source,
  };

  const [storeResult, notifyResult] = await Promise.allSettled([
    addContactMessage({ ...storeInput, status: 'new' }),
    sendContactNotifications(submission),
  ]);

  const stored = storeResult.status === 'fulfilled';
  const notified = notifyResult.status === 'fulfilled';
  if (!stored) {
    console.error('contact-submit: store failed:', (storeResult as PromiseRejectedResult).reason);
  }
  if (!notified) {
    console.error('contact-submit: notify failed:', (notifyResult as PromiseRejectedResult).reason);
  }

  if (!stored && !notified) {
    return res.status(500).json({
      success: false,
      error: 'Unable to submit right now. Please call (281) 568-8000 or email orders@yudezign.com.',
    });
  }

  return res.status(200).json({ success: true, stored, notified });
}
