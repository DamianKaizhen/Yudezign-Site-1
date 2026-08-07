import { createHash, timingSafeEqual } from 'node:crypto';

/**
 * Secret handling for endpoints that must fail shut.
 *
 * The admin endpoints do this the other way round: `api/admin/auth.ts` falls back
 * to a literal JWT secret committed in the repo, and that same literal is
 * copy-pasted into ten files. If JWT_SECRET is ever unset in the environment,
 * anyone who can read the repo can mint a valid admin cookie.
 *
 * Nothing here has a fallback. A missing secret throws, the handler 500s, and no
 * request is served — which is the correct outcome, because the alternative is
 * serving requests against a secret the whole internet knows.
 */

export class MissingSecretError extends Error {
  constructor(name: string) {
    super(`${name} is not configured`);
    this.name = 'MissingSecretError';
  }
}

/**
 * Read a required environment secret, or throw.
 *
 * Callers should let this propagate to a 500 rather than catching it — a
 * misconfigured deployment must be loud, not quietly permissive.
 */
export function requireSecret(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`secrets: ${name} is not set`);
    throw new MissingSecretError(name);
  }
  return value;
}

/** Read an optional secret. Returns undefined rather than throwing. */
export function optionalSecret(name: string): string | undefined {
  return process.env[name] || undefined;
}

/**
 * Constant-time compare of two secrets.
 *
 * Hashes both sides first so timingSafeEqual always gets equal-length buffers —
 * passing mismatched lengths throws, and the throw itself would leak length.
 *
 * (Same helper as `boothAuth.ts`, duplicated rather than imported: that file is
 * still unmerged work-in-progress and this one must not depend on it landing.)
 */
export function secretsMatch(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}
