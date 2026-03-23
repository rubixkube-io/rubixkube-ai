import { readFileSync } from 'fs'
import { join } from 'path'
import { SITE_URL, STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'

/** Default share card (homepage metadata, etc.) — `public/og.png` from og-image.html */
export const OG_STATIC_IMAGE_URL = STATIC_MARKETING_OG_URL

/** Dynamic OG layer — `public/og-template.png` from og-dynamic-template.html */
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
 * Clean template for page-specific {@link ImageResponse} (title/description/stats drawn in JSX).
 */
export function getOgDynamicTemplateDataUrl(): string {
  if (ogTemplateDataUrl) return ogTemplateDataUrl
  const buf = readFileSync(join(process.cwd(), 'public', 'og-template.png'))
  ogTemplateDataUrl = `data:image/png;base64,${buf.toString('base64')}`
  return ogTemplateDataUrl
}
