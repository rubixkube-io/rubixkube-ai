/**
 * Canonical URLs for static OG assets and site origin.
 * Routes with `opengraph-image.tsx` should omit `openGraph.images` so Next.js emits the hashed image URL.
 */
export const SITE_URL = 'https://rubixkube.ai' as const

/** Full marketing card from `og-image.html` / `public/og.png` (homepage, legal, status, JSON-LD). */
export const STATIC_MARKETING_OG_URL = `${SITE_URL}/og.png` as const
