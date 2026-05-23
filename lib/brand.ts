/**
 * Canonical public branding for OC — Online Calculator.
 * Domain and contact may stay on the historical host until DNS/email migrate.
 */

export const SITE_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')) ||
  'https://online-calculators.com';

/** Primary lockup: use in UI, metadata titles, and legal copy. */
export const BRAND_NAME = 'OC - Online Calculator';

/** Short form for tight UI (badges, share sheets). */
export const BRAND_NAME_SHORT = 'OC';

export const CONTACT_EMAIL = 'info@online-calculators.com';

/** Site-wide tagline for menus and SEO blurbs. */
export const BRAND_TAGLINE =
  'Precision converters and calculators: metric, imperial, and specialty tools in one place.';

/** One-sentence copyright line (footers, mobile menu). */
export function getCopyrightLine(year: number): string {
  return `© ${year} ${BRAND_NAME}. All rights reserved.`;
}

/**
 * Extended copyright notice — written for clarity and enforceability,
 * in the tradition of established editorial / software sites.
 */
export function getCopyrightNotice(year: number): string {
  return `© ${year} ${BRAND_NAME}. All rights reserved. Unless otherwise noted, the text, visuals, and software on this website are owned by or licensed to ${BRAND_NAME} and are protected by copyright, trademark, and other intellectual property laws. You are welcome to use our online tools for personal, educational, and internal business purposes in accordance with our Terms of Service; copying, mirroring, or redistributing substantial portions of the site for commercial gain without written permission is not permitted.`;
}

/** Shorter paragraph for footers and mobile menus — still reads like a careful legal desk. */
export function getCopyrightFooterDetail(): string {
  return `Unless otherwise indicated, the materials on this site—including articles, interface design, and calculator software—are owned by or licensed to ${BRAND_NAME} and are protected by copyright and related rights worldwide. You may use our tools in the normal course of browsing; republication or systematic scraping for commercial use without permission is not authorized. For permissions or licensing, contact us at ${CONTACT_EMAIL}.`;
}

/** JSON-LD / Open Graph organization name */
export const SCHEMA_ORG_NAME = BRAND_NAME;

/**
 * Editorial partner shown on the homepage and in global footers for transparency.
 * @see https://worldincredible.com/
 */
export const PARTNER_WORLD_INCREDIBLE = {
  name: 'World Incredible',
  url: 'https://worldincredible.com/',
  logoSrc: '/brands/world-incredible-logo.png',
  logoWidth: 600,
  logoHeight: 127,
} as const;

/**
 * Framework attribution (open source — not a paid sponsorship).
 * @see https://nextjs.org/
 */
export const THANKS_NEXTJS = {
  name: 'Next.js',
  url: 'https://nextjs.org/',
  logoSrc: '/brands/nextjs-mark.png',
  logoWidth: 32,
  logoHeight: 32,
} as const;
