import type { VercelRequest } from '@vercel/node';
import { SignJWT, jwtVerify } from 'jose';

import { MissingSecretError, requireSecret, secretsMatch } from './secrets.js';
import type { PortalRole } from '../_content/types.js';

/**
 * Access control for the sales rep portal (/sales).
 *
 * Deliberately a separate gate from the admin panel. A rep holding `admin_token`
 * would have write access to all nine admin CRUD endpoints from a phone that
 * lives in a jacket pocket at a trade show; the portal only ever needs to read.
 *
 * Two shared passwords, two roles. Per-rep accounts are the right long-term
 * answer and the wrong five-day answer — so instead the token carries a `v`
 * claim that acts as a global kill switch (bump SESSION_VERSION and every
 * outstanding session dies), and the passwords are meant to be rotated.
 *
 * Rotate SALES_REP_PASSWORD and SALES_MANAGER_PASSWORD on 2026-09-01.
 */

export const SALES_COOKIE = 'sales_token';

/** The admin panel's cookie. Read-only here — the portal never mints one. */
const ADMIN_COOKIE = 'admin_token';

const ISSUER = 'yudezign';
const AUDIENCE = 'yudezign-sales-portal';

/**
 * Bump to invalidate every outstanding session at once.
 *
 * The rep password will end up in a group text. This is the one-line revocation
 * that does not require waiting out a 30-day token.
 */
const SESSION_VERSION = 1;

/**
 * Reps get 30 days: being logged out mid-show, in a hall with no signal, is the
 * exact failure this portal exists to avoid. Managers get 12 hours, because
 * their payload carries compensation and quota.
 */
const TTL_SECONDS: Record<PortalRole, number> = {
  rep: 60 * 60 * 24 * 30,
  manager: 60 * 60 * 12,
};

export interface SalesSession {
  role: PortalRole;
  /** Epoch milliseconds. */
  expiresAt: number;
  /** Which cookie authenticated this request. */
  via: 'sales' | 'admin';
}

/**
 * Signing key for sales sessions.
 *
 * Prefers a dedicated SALES_JWT_SECRET, falls back to the admin JWT_SECRET so
 * the portal works without provisioning anything new. Note this reads
 * process.env directly — it never uses the literal default that
 * api/admin/auth.ts falls back to, so an unset environment throws here rather
 * than signing with a key anyone reading the repo already knows.
 */
function secretKey(): Uint8Array {
  const secret = process.env.SALES_JWT_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    console.error('salesAuth: neither SALES_JWT_SECRET nor JWT_SECRET is set');
    throw new MissingSecretError('SALES_JWT_SECRET');
  }
  return new TextEncoder().encode(secret);
}

/** Signing key the admin panel uses, for accepting an existing admin session. */
function adminSecretKey(): Uint8Array {
  return new TextEncoder().encode(requireSecret('JWT_SECRET'));
}

/**
 * Which role does this password unlock, if any?
 *
 * Manager is checked first so that a misconfiguration where both variables hold
 * the same value cannot silently downgrade a manager to a rep. If they are
 * equal we refuse manager auth outright rather than guessing.
 */
export function roleForPassword(password: string): PortalRole | null {
  // TEMPORARY, set 2026-08-06 at Damian's request: until SALES_REP_PASSWORD
  // exists, the portal opens with the existing ADMIN_PASSWORD so it can ship
  // before the expo without a new credential to distribute.
  //
  // This is a real trade-off, not a convenience. The TOKEN separation still
  // holds — a /sales login mints a sales_token scoped to this audience and it
  // cannot be replayed against the admin endpoints. What it does mean is that
  // anyone given this password can go to /admin/login directly and write to
  // the CMS. Set SALES_REP_PASSWORD before the reps get it.
  const usingAdminFallback = !process.env.SALES_REP_PASSWORD && Boolean(process.env.ADMIN_PASSWORD);
  const repPassword = process.env.SALES_REP_PASSWORD || process.env.ADMIN_PASSWORD;
  const managerPassword = process.env.SALES_MANAGER_PASSWORD;

  if (!repPassword && !managerPassword) {
    console.error('salesAuth: neither SALES_REP_PASSWORD nor SALES_MANAGER_PASSWORD is set');
    return null;
  }

  const sharePassword = Boolean(
    repPassword && managerPassword && secretsMatch(repPassword, managerPassword)
  );
  if (sharePassword) {
    console.error(
      'salesAuth: SALES_MANAGER_PASSWORD equals SALES_REP_PASSWORD — refusing manager access'
    );
  }

  if (managerPassword && !sharePassword && secretsMatch(password, managerPassword)) {
    return 'manager';
  }
  if (repPassword && secretsMatch(password, repPassword)) {
    if (usingAdminFallback) {
      // Logged on every successful fallback login, on purpose: this should be
      // noisy in the Vercel logs until SALES_REP_PASSWORD is set.
      console.warn(
        'salesAuth: SALES_REP_PASSWORD is not set — a rep signed in with ADMIN_PASSWORD, ' +
          'which also grants admin panel access. Set SALES_REP_PASSWORD.'
      );
    }
    return 'rep';
  }
  return null;
}

export async function signSalesToken(role: PortalRole): Promise<string> {
  return new SignJWT({ role, v: SESSION_VERSION })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject('sales')
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${TTL_SECONDS[role]}s`)
    .sign(secretKey());
}

/**
 * Verify the cookie on a request. Returns null for anything that is not a live,
 * correctly-scoped sales session.
 *
 * The issuer/audience check is what stops an admin token — including one minted
 * from the fallback secret committed in `api/admin/auth.ts` — being replayed
 * here.
 */
export async function verifySalesRequest(request: VercelRequest): Promise<SalesSession | null> {
  const salesSession = await verifySalesToken(request.cookies?.[SALES_COOKIE]);
  if (salesSession) return salesSession;

  // Fall back to an existing admin session, so signing in at /admin also opens
  // /sales without a second password prompt.
  //
  // This only works in this direction. A sales token can never authenticate an
  // admin request: it is signed for a different audience, and every admin
  // endpoint verifies its own cookie. So an admin gains read access to the
  // portal, and a rep gains nothing — which is the asymmetry we want.
  return verifyAdminToken(request.cookies?.[ADMIN_COOKIE]);
}

async function verifySalesToken(token?: string): Promise<SalesSession | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
      subject: 'sales',
    });

    if (payload.v !== SESSION_VERSION) return null;
    if (payload.role !== 'rep' && payload.role !== 'manager') return null;

    return {
      role: payload.role,
      expiresAt: (payload.exp ?? 0) * 1000,
      via: 'sales',
    };
  } catch {
    // Expired, tampered with, or signed by something else. All the same answer.
    return null;
  }
}

/**
 * Accept a live admin session, mapped to the manager role.
 *
 * Manager rather than rep because whoever holds the admin password already
 * controls the whole site — withholding the compensation document from them
 * would be theatre, and they are in practice the sales manager.
 *
 * Admin tokens carry `{ authenticated: true }` with no issuer or audience, so
 * this deliberately verifies them on their own terms rather than the portal's.
 */
async function verifyAdminToken(token?: string): Promise<SalesSession | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, adminSecretKey());
    if (payload.authenticated !== true) return null;

    return {
      role: 'manager',
      expiresAt: (payload.exp ?? 0) * 1000,
      via: 'admin',
    };
  } catch {
    return null;
  }
}

/**
 * `Secure` is gated on VERCEL_ENV, not NODE_ENV.
 *
 * `vercel dev` serves over plain http, and a Secure cookie is silently dropped
 * there — which looks exactly like a broken login. NODE_ENV is unreliable on
 * Vercel (it is "production" in preview deployments too), so it is the wrong
 * signal for "am I on http right now".
 */
function cookieFlags(maxAge: number): string {
  const secure = process.env.VERCEL_ENV !== 'development' ? ' Secure;' : '';
  // SameSite=Lax, not Strict: a manager will text reps this link, and under
  // Strict the cookie is not sent on that first cross-site navigation, so the
  // portal looks logged-out on the one tap that matters.
  return `HttpOnly; Path=/api/sales; Max-Age=${maxAge}; SameSite=Lax;${secure}`;
}

export function sessionCookie(token: string, role: PortalRole): string {
  return `${SALES_COOKIE}=${token}; ${cookieFlags(TTL_SECONDS[role])}`;
}

export function clearedCookie(): string {
  return `${SALES_COOKIE}=; ${cookieFlags(0)}`;
}

/**
 * Also clear the admin cookie on portal sign-out.
 *
 * Without this, an admin who signs out of the portal stays signed in: the
 * gate would immediately re-accept their admin_token and bounce them back in,
 * so "Sign out" would visibly do nothing. Signing out of both is the only
 * version where the button means what it says.
 *
 * Path and SameSite must match how api/admin/auth.ts set the cookie, or the
 * browser treats this as a different cookie and ignores it.
 */
export function clearedAdminCookie(): string {
  const secure = process.env.VERCEL_ENV !== 'development' ? ' Secure;' : '';
  return `${ADMIN_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict;${secure}`;
}

export function expiresAtFor(role: PortalRole): number {
  return Date.now() + TTL_SECONDS[role] * 1000;
}
