import nodemailer from 'nodemailer';

/**
 * Contact-form email notifications (in-house replacement for the n8n webhook).
 *
 * Exposes sendContactNotifications(), called by /api/contact-submit AFTER the
 * spam gate passes. Sends two emails per submission:
 *   1. An internal "Website Request" email to CONTACT_NOTIFY_TO (the team inbox),
 *      with the full project details, clickable contact links, and attachments.
 *      Reply-To is set to the customer so staff can reply directly.
 *   2. A branded customer confirmation that echoes back what they requested,
 *      lists any files they shared, and links to brochures / portfolio / finishes.
 *      Only sent if the customer supplied a valid email address.
 *
 * Configuration (Vercel env vars):
 *   SMTP_HOST         - mail server host (e.g. mail.example.com)
 *   SMTP_PORT         - 465 (SSL) or 587 (STARTTLS). Defaults to 465.
 *   SMTP_USER         - the mailbox login to send from
 *   SMTP_PASSWORD     - that mailbox's password / app password
 *   SMTP_FROM         - optional "from" address; defaults to SMTP_USER
 *   SMTP_FROM_NAME    - optional display name; defaults to "YuDezign Website"
 *   CONTACT_NOTIFY_TO - internal recipient of the "Website Request" email
 *                       (defaults to orders@yudezign.com)
 */

export interface ContactSubmission {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  attachments?: string[];
  submittedAt?: string;
  source?: string;
}

// Human-readable labels mirroring the <select> option values in Contact.tsx.
const PROJECT_TYPE_LABELS: Record<string, string> = {
  kitchen: 'Kitchen Cabinets',
  closet: 'Custom Closet System',
  vanity: 'Bathroom Vanity',
  'laundry-mudroom': 'Laundry / Mudroom Cabinets',
  entertainment: 'Entertainment Center / Media Cabinet',
  office: 'Office / Reception Casework',
  'bar-pantry': "Wet Bar / Butler's Pantry",
  garage: 'Garage Storage Cabinets',
  commercial: 'Commercial / Multi-unit',
};

const BUDGET_LABELS: Record<string, string> = {
  'under-5k': 'Under $5,000',
  '5k-10k': '$5,000 - $10,000',
  '10k-20k': '$10,000 - $20,000',
  '20k-35k': '$20,000 - $35,000',
  '35k-plus': '$35,000+',
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: 'ASAP (2-3 weeks)',
  '1-2months': '1-2 months',
  '3-6months': '3-6 months',
  planning: 'Just planning',
};

// ---- Brand tokens (sampled from the actual YuDeZign logo) ------------------
const BRAND_GREEN = '#0b3e27'; // deep forest green (logo "YUD"/"IGN", center mark)
const BRAND_GREEN_DARK = '#072a1b'; // deeper green for the header gradient
const BRAND_EMERALD = '#00953f'; // medium emerald (logo "EZ" letters, Y stems)
const BRAND_LIME = '#b4cf09'; // lime-olive pop (logo Y "wings")
const BRAND_CREAM = '#f8f6f3';
const TEXT = '#1a1a1a';
const MUTED = '#6b6b6b';
const BORDER = '#ece7e0';

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const SITE = 'https://www.yudezign.com';
const PHONE_DISPLAY = '(281) 568-8000';
const PHONE_HREF = '+12815688000';
const EMAIL_PUBLIC = 'orders@yudezign.com';
const ADDRESS = '13230 Murphy Rd, Ste 600, Stafford, TX 77477';
const HOURS = 'Mon–Fri, 9:00 AM – 5:30 PM';

const FROM_NAME = process.env.SMTP_FROM_NAME || 'YuDezign Website';
const NOTIFY_TO = process.env.CONTACT_NOTIFY_TO || EMAIL_PUBLIC;

// Resource links surfaced in the customer confirmation email.
const RESOURCE_LINKS: Array<{ title: string; blurb: string; url: string }> = [
  {
    title: '2026 Collection Booklet',
    blurb: 'Kitchens, closets, vanities & finishes in one lookbook.',
    url: `${SITE}/downloads/YuDeZign_Booklet_2026.pdf`,
  },
  {
    title: 'Portfolio',
    blurb: 'Real Houston projects across every room.',
    url: `${SITE}/portfolio`,
  },
  {
    title: 'Finishes & Materials',
    blurb: 'Explore door finishes, woodgrains & laminates.',
    url: `${SITE}/finishes`,
  },
  {
    title: 'Brochures & Downloads',
    blurb: 'Catalogs, flyers & spec sheets to browse or save.',
    url: `${SITE}/downloads`,
  },
];

// ---- Small helpers ---------------------------------------------------------

function label(map: Record<string, string>, value?: string): string {
  if (!value) return '—';
  return map[value] || value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Escape + preserve line breaks for display inside an HTML cell.
function multiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br>');
}

function isValidEmail(email?: string): email is string {
  return !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function formatTimestamp(submittedAt?: string): string {
  if (!submittedAt) return new Date().toUTCString();
  const parsed = new Date(submittedAt);
  return isNaN(parsed.getTime()) ? submittedAt : parsed.toUTCString();
}

// Derive a friendly filename from an uploaded attachment URL.
function attachmentName(url: string, index: number): string {
  try {
    const path = url.split('?')[0];
    let seg = decodeURIComponent(path.substring(path.lastIndexOf('/') + 1));
    seg = seg.replace(/^\d{6,}-/, ''); // strip the upload timestamp prefix
    return seg || `Attachment ${index + 1}`;
  } catch {
    return `Attachment ${index + 1}`;
  }
}

// ---- Reusable HTML building blocks (email-client-safe, table-based) --------

type Row = [string, string]; // [label, pre-escaped HTML value]

function summaryTable(rows: Row[]): string {
  const body = rows
    .map(
      ([k, v]) => `
      <tr>
        <td width="34%" style="padding:12px 16px;background:${BRAND_CREAM};font-family:${FONT};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:${BRAND_GREEN};vertical-align:top;border-bottom:1px solid ${BORDER};">${escapeHtml(
        k
      )}</td>
        <td style="padding:12px 16px;font-family:${FONT};font-size:14px;line-height:1.5;color:${TEXT};vertical-align:top;border-bottom:1px solid ${BORDER};">${v}</td>
      </tr>`
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">${body}</table>`;
}

function sectionLabel(text: string): string {
  return `<p style="margin:28px 0 12px;font-family:${FONT};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:${BRAND_EMERALD};">${escapeHtml(
    text
  )}</p>`;
}

function attachmentsBlock(attachments: string[]): string {
  const items = attachments
    .map(
      (url, i) => `
      <tr>
        <td style="padding:10px 14px;font-family:${FONT};font-size:14px;border-bottom:1px solid ${BORDER};">
          <span style="color:${BRAND_EMERALD};">&#128206;</span>
          <a href="${escapeHtml(url)}" style="color:${BRAND_GREEN};font-weight:600;text-decoration:none;">${escapeHtml(
        attachmentName(url, i)
      )}</a>
        </td>
      </tr>`
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">${items}</table>`;
}

function ctaButton(text: string, url: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:8px auto;">
    <tr>
      <td align="center" bgcolor="${BRAND_GREEN}" style="border-radius:8px;">
        <a href="${escapeHtml(url)}" target="_blank" style="display:inline-block;padding:14px 34px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">${escapeHtml(
    text
  )}</a>
      </td>
    </tr>
  </table>`;
}

function resourceLinksBlock(): string {
  return RESOURCE_LINKS.map(
    (r) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
      <tr>
        <td style="padding:14px 18px;border:1px solid ${BORDER};border-radius:8px;background:#ffffff;">
          <a href="${escapeHtml(r.url)}" target="_blank" style="font-family:${FONT};font-size:15px;font-weight:700;color:${BRAND_GREEN};text-decoration:none;">${escapeHtml(
      r.title
    )} <span style="color:${BRAND_EMERALD};">&rarr;</span></a>
          <div style="font-family:${FONT};font-size:13px;color:${MUTED};margin-top:3px;">${escapeHtml(
      r.blurb
    )}</div>
        </td>
      </tr>
    </table>`
  ).join('');
}

// Shared shell: branded header (wordmark + heading), body content, footer.
function emailShell(opts: {
  preheader: string;
  heading: string;
  subheading?: string;
  contentHtml: string;
}): string {
  const { preheader, heading, subheading, contentHtml } = opts;

  const footerLinks = [
    ['Portfolio', `${SITE}/portfolio`],
    ['Finishes', `${SITE}/finishes`],
    ['Brochures', `${SITE}/downloads`],
    ['Contact', `${SITE}/contact`],
  ]
    .map(
      ([t, u]) =>
        `<a href="${u}" target="_blank" style="color:${BRAND_GREEN};text-decoration:none;font-weight:600;">${t}</a>`
    )
    .join(`<span style="color:${BRAND_EMERALD};"> · </span>`);

  return `<!-- preheader (hidden preview text) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(
    preheader
  )}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND_CREAM};margin:0;padding:0;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 8px rgba(15,76,58,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:${BRAND_GREEN};background:linear-gradient(135deg, ${BRAND_GREEN} 0%, ${BRAND_GREEN_DARK} 100%);padding:34px 40px;text-align:center;">
            <div style="font-family:${FONT};font-size:26px;font-weight:700;letter-spacing:0.5px;line-height:1;">
              <span style="color:#ffffff;">YuD</span><span style="color:${BRAND_LIME};">eZ</span><span style="color:#ffffff;">ign</span>
            </div>
            <div style="width:44px;height:2px;background:${BRAND_LIME};margin:16px auto 0;line-height:2px;font-size:0;">&nbsp;</div>
            <h1 style="margin:18px 0 0;font-family:${FONT};font-size:22px;font-weight:500;color:#ffffff;">${escapeHtml(
    heading
  )}</h1>
            ${
              subheading
                ? `<p style="margin:6px 0 0;font-family:${FONT};font-size:14px;color:rgba(255,255,255,0.82);">${escapeHtml(
                    subheading
                  )}</p>`
                : ''
            }
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px 32px 8px;font-family:${FONT};font-size:15px;line-height:1.6;color:${TEXT};">
            ${contentHtml}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:${BRAND_CREAM};padding:26px 32px;border-top:1px solid ${BORDER};text-align:center;">
            <p style="margin:0 0 10px;font-family:${FONT};font-size:13px;line-height:1.7;color:${MUTED};">
              <strong style="color:${BRAND_GREEN};">YuDeZign</strong> · Custom European Frameless Cabinetry<br>
              ${escapeHtml(ADDRESS)}<br>
              <a href="tel:${PHONE_HREF}" style="color:${BRAND_GREEN};text-decoration:none;">${PHONE_DISPLAY}</a>
              <span style="color:${BRAND_EMERALD};"> · </span>
              <a href="mailto:${EMAIL_PUBLIC}" style="color:${BRAND_GREEN};text-decoration:none;">${EMAIL_PUBLIC}</a><br>
              ${HOURS}
            </p>
            <p style="margin:0;font-family:${FONT};font-size:13px;">${footerLinks}</p>
          </td>
        </tr>
      </table>
      <p style="margin:14px 0 0;font-family:${FONT};font-size:11px;color:#b0a89c;">© YuDeZign · Houston, TX</p>
    </td>
  </tr>
</table>`;
}

// ---- Internal "Website Request" email --------------------------------------

export function buildInternalEmail(data: ContactSubmission): { subject: string; html: string; text: string } {
  const name = data.name?.trim() || 'Unknown';
  const email = data.email?.trim();
  const phone = data.phone?.trim();
  const projectType = label(PROJECT_TYPE_LABELS, data.projectType);
  const budget = label(BUDGET_LABELS, data.budget);
  const timeline = label(TIMELINE_LABELS, data.timeline);
  const submittedAt = formatTimestamp(data.submittedAt);
  const attachments = data.attachments?.length ? data.attachments : [];

  const emailValue = isValidEmail(email)
    ? `<a href="mailto:${escapeHtml(email)}" style="color:${BRAND_GREEN};text-decoration:none;">${escapeHtml(
        email
      )}</a>`
    : '—';
  const phoneValue = phone
    ? `<a href="tel:${escapeHtml(phone.replace(/[^\d+]/g, ''))}" style="color:${BRAND_GREEN};text-decoration:none;">${escapeHtml(
        phone
      )}</a>`
    : '—';

  const contactRows: Row[] = [
    ['Name', escapeHtml(name)],
    ['Email', emailValue],
    ['Phone', phoneValue],
  ];

  const projectRows: Row[] = [
    ['Project Type', escapeHtml(projectType)],
    ['Budget', escapeHtml(budget)],
    ['Timeline', escapeHtml(timeline)],
    ['Details', data.message?.trim() ? multiline(data.message.trim()) : '—'],
  ];

  const metaRows: Row[] = [
    ['Source', escapeHtml(data.source || 'Yudezign Website')],
    ['Submitted', escapeHtml(submittedAt)],
  ];

  const attachmentsHtml =
    attachments.length > 0
      ? `${sectionLabel(`Attachments (${attachments.length})`)}${attachmentsBlock(attachments)}`
      : `${sectionLabel('Attachments')}<p style="margin:0;font-family:${FONT};font-size:14px;color:${MUTED};">None submitted.</p>`;

  const content = `
    <p style="margin:0 0 4px;">A new quote request just came in through the website.</p>
    <p style="margin:0 0 8px;font-size:14px;color:${MUTED};">Reply to this email to respond to ${escapeHtml(
      name
    )} directly.</p>
    ${sectionLabel('Contact')}
    ${summaryTable(contactRows)}
    ${sectionLabel('Project')}
    ${summaryTable(projectRows)}
    ${attachmentsHtml}
    ${sectionLabel('Meta')}
    ${summaryTable(metaRows)}
    <div style="margin:28px 0 12px;">${ctaButton('Open in Admin Panel', `${SITE}/admin/contact-messages`)}</div>
  `;

  const html = emailShell({
    preheader: `New quote request from ${name} — ${projectType}`,
    heading: 'New Quote Request',
    subheading: `${name} · ${projectType}`,
    contentHtml: content,
  });

  const text = [
    `NEW QUOTE REQUEST — ${name}`,
    `Reply to this email to respond to the customer directly.`,
    ``,
    `CONTACT`,
    `  Name:  ${name}`,
    `  Email: ${email || '—'}`,
    `  Phone: ${phone || '—'}`,
    ``,
    `PROJECT`,
    `  Type:     ${projectType}`,
    `  Budget:   ${budget}`,
    `  Timeline: ${timeline}`,
    `  Details:  ${data.message?.trim() || '—'}`,
    ``,
    `ATTACHMENTS`,
    attachments.length ? attachments.map((u, i) => `  ${i + 1}. ${attachmentName(u, i)} — ${u}`).join('\n') : '  None submitted.',
    ``,
    `META`,
    `  Source:    ${data.source || 'Yudezign Website'}`,
    `  Submitted: ${submittedAt}`,
    ``,
    `Admin: ${SITE}/admin/contact-messages`,
  ].join('\n');

  return {
    subject: `New Quote Request: ${name} — ${projectType}`,
    html,
    text,
  };
}

// ---- Customer confirmation email -------------------------------------------

export function buildConfirmationEmail(data: ContactSubmission): { subject: string; html: string; text: string } {
  const name = data.name?.trim() || '';
  const firstName = name.split(' ')[0] || 'there';
  const email = data.email?.trim();
  const phone = data.phone?.trim();
  const projectType = label(PROJECT_TYPE_LABELS, data.projectType);
  const budget = label(BUDGET_LABELS, data.budget);
  const timeline = label(TIMELINE_LABELS, data.timeline);
  const attachments = data.attachments?.length ? data.attachments : [];

  const requestRows: Row[] = [
    ['Project Type', escapeHtml(projectType)],
    ['Budget', escapeHtml(budget)],
    ['Timeline', escapeHtml(timeline)],
    ['Your Message', data.message?.trim() ? multiline(data.message.trim()) : '—'],
  ];

  const detailRows: Row[] = [
    ['Name', escapeHtml(name || '—')],
    ['Email', escapeHtml(email || '—')],
    ['Phone', escapeHtml(phone || '—')],
  ];

  const attachmentsHtml =
    attachments.length > 0
      ? `${sectionLabel(`Files You Shared (${attachments.length})`)}${attachmentsBlock(attachments)}`
      : '';

  const content = `
    <p style="margin:0 0 14px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 14px;">Thank you for reaching out to <strong>YuDeZign</strong>. We've received your request and a member of our team will get back to you within <strong>24 hours on business days</strong>. Here's a summary of what you sent us so you can confirm the details.</p>

    ${sectionLabel('Your Request')}
    ${summaryTable(requestRows)}

    ${sectionLabel('Your Details')}
    ${summaryTable(detailRows)}

    ${attachmentsHtml}

    <div style="margin:30px 0 6px;">${ctaButton('View Our Portfolio', `${SITE}/portfolio`)}</div>
    <p style="margin:0 0 4px;text-align:center;font-size:14px;color:${MUTED};">While you wait, explore our work and resources:</p>

    ${sectionLabel('Explore YuDeZign')}
    ${resourceLinksBlock()}

    <div style="margin-top:26px;padding:18px 20px;background:${BRAND_CREAM};border-left:3px solid ${BRAND_LIME};border-radius:6px;">
      <p style="margin:0;font-size:14px;color:${TEXT};">
        Need to reach us sooner? Call <a href="tel:${PHONE_HREF}" style="color:${BRAND_GREEN};font-weight:600;text-decoration:none;">${PHONE_DISPLAY}</a>
        or just reply to this email — it comes to a monitored inbox.
      </p>
    </div>
  `;

  const html = emailShell({
    preheader: `Thanks ${firstName} — we've received your request and will reply within 24 hours.`,
    heading: `Thank You, ${firstName}`,
    subheading: "We've received your request",
    contentHtml: content,
  });

  const text = [
    `Hi ${firstName},`,
    ``,
    `Thank you for reaching out to YuDeZign. We've received your request and a member of our team will get back to you within 24 hours on business days. Here's a summary of what you sent us:`,
    ``,
    `YOUR REQUEST`,
    `  Project Type: ${projectType}`,
    `  Budget:       ${budget}`,
    `  Timeline:     ${timeline}`,
    `  Your Message: ${data.message?.trim() || '—'}`,
    ``,
    `YOUR DETAILS`,
    `  Name:  ${name || '—'}`,
    `  Email: ${email || '—'}`,
    `  Phone: ${phone || '—'}`,
    ``,
    attachments.length
      ? `FILES YOU SHARED\n${attachments.map((u, i) => `  ${i + 1}. ${attachmentName(u, i)} — ${u}`).join('\n')}\n`
      : '',
    `EXPLORE YUDEZIGN`,
    ...RESOURCE_LINKS.map((r) => `  ${r.title}: ${r.url}`),
    ``,
    `Need to reach us sooner? Call ${PHONE_DISPLAY} or reply to this email.`,
    ``,
    `YuDeZign · Custom European Frameless Cabinetry`,
    `${ADDRESS}`,
    `${PHONE_DISPLAY} · ${EMAIL_PUBLIC} · ${HOURS}`,
  ]
    .filter((line) => line !== '')
    .join('\n');

  return {
    subject: 'We received your YuDeZign quote request',
    html,
    text,
  };
}

// ---- Transport & send ------------------------------------------------------

// Build a nodemailer transport from env, or null if SMTP isn't configured yet.
function getTransport(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 465);

  return nodemailer.createTransport({
    host,
    port,
    // 465 = implicit TLS (SSL); 587/25 = STARTTLS (secure:false, upgraded later).
    secure: port === 465,
    auth: { user, pass },
  });
}

export interface NotifyResult {
  notified: boolean;
  confirmationSent: boolean;
  skipped?: boolean; // true when SMTP isn't configured
}

/**
 * Send the internal notification + customer confirmation for a submission.
 *
 * Throws if SMTP is configured but a send fails (caller decides how to handle).
 * If SMTP is NOT configured, returns { skipped: true } instead of throwing so
 * the submission flow still succeeds (the lead is stored regardless).
 */
export async function sendContactNotifications(data: ContactSubmission): Promise<NotifyResult> {
  const transport = getTransport();
  if (!transport) {
    console.warn('contactEmail: SMTP not configured; skipping email send.');
    return { notified: false, confirmationSent: false, skipped: true };
  }

  const from = `"${FROM_NAME}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`;

  // 1. Internal "Website Request" email (Reply-To = customer so staff can reply).
  const internal = buildInternalEmail(data);
  await transport.sendMail({
    from,
    to: NOTIFY_TO,
    subject: internal.subject,
    html: internal.html,
    text: internal.text,
    ...(isValidEmail(data.email) ? { replyTo: data.email.trim() } : {}),
  });

  // 2. Customer confirmation — only if a valid email was provided.
  let confirmationSent = false;
  if (isValidEmail(data.email)) {
    const confirmation = buildConfirmationEmail(data);
    await transport.sendMail({
      from,
      to: data.email.trim(),
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    confirmationSent = true;
  }

  return { notified: true, confirmationSent };
}
