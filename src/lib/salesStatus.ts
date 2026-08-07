/**
 * Has a provisional ruling passed its expiry date?
 *
 * Two rulings in the Answer Key are provisional and expire on 2026-09-01,
 * mid-quarter, with nobody watching. Encoding the date rather than writing
 * "expires Sept 1" as prose means the portal starts saying "escalate" by itself
 * on Sept 2, with no code change and no deploy.
 */
export function isExpired(expiresOn?: string): boolean {
  if (!expiresOn) return false;
  const expiry = Date.parse(expiresOn);
  return Number.isFinite(expiry) && Date.now() > expiry;
}
