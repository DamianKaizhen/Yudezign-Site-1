import type { VercelRequest, VercelResponse } from '@vercel/node';

import { MissingSecretError } from '../_lib/secrets.js';
import { verifySalesRequest } from '../_lib/salesAuth.js';
import { CONTENT_VERSION, buildPayload } from '../_content/index.js';

/**
 * The role-gated content payload.
 *
 * This endpoint — not the React route guard — is the actual security boundary
 * of the sales portal. A rep's payload is built without ever touching the
 * manager module, so there is no `manager` key to leak.
 *
 *   GET /api/sales/content            -> full payload for the cookie's role
 *   GET /api/sales/content?v=<ver>    -> 304 when the client already has it
 *
 * The `v` short-circuit matters more than it looks: reps reload this on one bar
 * of LTE in an exhibition hall, and a 304 is a few hundred bytes against a
 * payload of a hundred-odd kilobytes.
 */

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader('X-Robots-Tag', 'noindex, nofollow');
  // vercel.json already applies no-store to /api/*; state it here too so the
  // guarantee survives someone editing that file.
  response.setHeader('Cache-Control', 'private, no-store, must-revalidate');

  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await verifySalesRequest(request);

    if (!session) {
      return response.status(401).json({ authenticated: false });
    }

    const clientVersion = typeof request.query.v === 'string' ? request.query.v : undefined;
    if (clientVersion && clientVersion === CONTENT_VERSION) {
      return response.status(304).end();
    }

    return response.status(200).json(buildPayload(session.role));
  } catch (error) {
    if (error instanceof MissingSecretError) {
      console.error('sales/content: refusing to serve —', error.message);
      return response.status(500).json({ error: 'Sales portal is not configured' });
    }
    console.error('sales/content: unexpected error', error);
    return response.status(500).json({ error: 'Could not load portal content' });
  }
}
