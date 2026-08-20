/**
 * Fixed brand assets, served from public/.
 *
 * These deliberately do NOT live in siteSettings.ts. That file is regenerated
 * wholesale by api/admin/settings.ts (`reconstructSettingsFile`) from a fixed
 * template every time Site Settings is saved in the admin panel — any field the
 * template doesn't know about is silently dropped, along with its interface
 * entry. A reversed logo stored there would survive until the first admin save
 * and then vanish, taking the footer and sidebar logos with it.
 */

/** Wordmark for light grounds: near-black ink, brand green on "EZ". */
export const LOGO_WORDMARK = '/logo-wordmark.svg';

/**
 * Reversed wordmark, for the surfaces painted `bg-primary` — the site footer
 * and the admin sidebar.
 *
 * Needed because the standard wordmark sets "EZ" in #01593F, and the primary
 * ground is #0f4c3a. Those two greens are near-identical, so the letters
 * disappear and the rest of the mark reads as dark-on-dark. This variant is
 * white with "EZ" in the site's accent gold — the same white-plus-accent
 * pairing Footer.tsx already used for its text fallback.
 */
export const LOGO_WORDMARK_LIGHT = '/logo-wordmark-light.svg';

/** Raster copy, for structured data and social cards that reject SVG. */
export const LOGO_WORDMARK_PNG = '/logo-wordmark.png';
