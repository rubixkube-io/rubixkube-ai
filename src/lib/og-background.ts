import { readFileSync } from 'fs'
import { join } from 'path'
import { SITE_URL, STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'

/** Default share card (homepage metadata, etc.): `public/og.png`, the dark card with the RCA screen */
export const OG_STATIC_IMAGE_URL = STATIC_MARKETING_OG_URL

/** Dynamic OG layer: `public/og-template.png`, the dark card with the halftone and no text */
export const OG_DYNAMIC_TEMPLATE_URL = `${SITE_URL}/og-template.png`

let ogPngDataUrl: string | null = null
let ogTemplateDataUrl: string | null = null

/**
 * Full marketing OG (hero + stats) for default {@link opengraph-image} only.
 */
export function getOgPngDataUrl(): string {
  if (ogPngDataUrl) return ogPngDataUrl
  const buf = readFileSync(join(process.cwd(), 'public', 'og.png'))
  ogPngDataUrl = `data:image/png;base64,${buf.toString('base64')}`
  return ogPngDataUrl
}

/**
 * Clean template for page-specific {@link ImageResponse} (title/description/accent drawn in JSX).
 */
export function getOgDynamicTemplateDataUrl(): string {
  if (ogTemplateDataUrl) return ogTemplateDataUrl
  const buf = readFileSync(join(process.cwd(), 'public', 'og-template.png'))
  ogTemplateDataUrl = `data:image/png;base64,${buf.toString('base64')}`
  return ogTemplateDataUrl
}

type OgFont = { name: string; data: Buffer; weight: 400 | 600; style: 'normal' }
let ogFontList: OgFont[] | null = null

/** Figtree and DM Mono for {@link ImageResponse}; Satori needs the font files themselves */
export function getOgFonts(): OgFont[] {
  if (ogFontList) return ogFontList
  const read = (f: string) => readFileSync(join(process.cwd(), 'src', 'lib', 'og-fonts', f))
  ogFontList = [
    { name: 'Figtree', data: read('Figtree-Regular.ttf'), weight: 400, style: 'normal' },
    { name: 'Figtree', data: read('Figtree-SemiBold.ttf'), weight: 600, style: 'normal' },
    { name: 'DM Mono', data: read('DMMono-Regular.ttf'), weight: 400, style: 'normal' },
  ]
  return ogFontList
}

let ogLogoDataUrl: string | null = null

/** The light-on-dark wordmark, for the logo tab on cover cards */
export function getOgLogoDataUrl(): string {
  if (ogLogoDataUrl) return ogLogoDataUrl
  const buf = readFileSync(join(process.cwd(), 'public', 'dark-logo.svg'))
  ogLogoDataUrl = `data:image/svg+xml;base64,${buf.toString('base64')}`
  return ogLogoDataUrl
}
