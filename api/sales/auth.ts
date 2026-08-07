import type { VercelRequest, VercelResponse } from '@vercel/node';

import { MissingSecretError } from '../_lib/secrets.js';
import {
  clearedCookie,
  expiresAtFor,
  roleForPassword,
  sessionCookie,
  signSalesToken,
  verifySalesRequest,
} from '../_lib/salesAuth.js';

/**
 * Sales portal session endpoint.
 *
 *   POST   /api/sales/auth   { password }  -> sets the cookie, returns the role
 *   GET    /api/sales/auth                 -> verifies the cookie
 *   DELETE /api/sales/auth                 -> clears the cookie
 *
 * Logout is a method on this route rather than its own file: `api/` already
 * holds fourteen serverless functions and the plan limit is a real constraint.
 */

/** Crude brake on password guessing. Real rate limiting needs a KV store. */
const FAILED_LOGIN_DELAY_MS = 500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clientIp(request: VercelRequest): string {
  const header = request.headers['x-forwarded-for'];
  if (typeof header === 'string') return header.split(',')[0].trim();
  if (Array.isArray(header)) return header[0] ?? 'unknown';
  return 'unknown';
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  // No CORS allowance: unlike the admin endpoints this is same-origin only.
  response.setHeader('X-Robots-Tag', 'noindex, nofollow');

  try {
    if (request.method === 'POST') {
      const password = typeof request.body?.password === 'string' ? request.body.password : '';

      if (!password) {
        return response.status(400).json({ error: 'Password is required' });
      }

      const role = roleForPassword(password);

      if (!role) {
        console.warn(`sales/auth: failed login from ${clientIp(request)}`);
        await sleep(FAILED_LOGIN_DELAY_MS);
        return response.status(401).json({ error: 'That password was not recognised' });
      }

      const token = await signSalesToken(role);
      response.setHeader('Set-Cookie', sessionCookie(token, role));

      return response.status(200).json({
        authenticated: true,
        role,
        expiresAt: expiresAtFor(role),
      });
    }

    if (request.method === 'GET') {
      const session = await verifySalesRequest(request);

      if (!session) {
        return response.status(401).json({ authenticated: false });
      }

      return response.status(200).json({
        authenticated: true,
        role: session.role,
        expiresAt: session.expiresAt,
      });
    }

    if (request.method === 'DELETE') {
      response.setHeader('Set-Cookie', clearedCookie());
      return response.status(200).json({ authenticated: false });
    }

    return response.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    if (error instanceof MissingSecretError) {
      // Fail shut and say so in the logs. Never fall back to a known secret.
      console.error('sales/auth: refusing to serve —', error.message);
      return response.status(500).json({ error: 'Sales portal is not configured' });
    }
    console.error('sales/auth: unexpected error', error);
    return response.status(500).json({ error: 'Authentication failed' });
  }
}
