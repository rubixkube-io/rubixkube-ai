import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { getOgDynamicTemplateDataUrl, getOgFonts, getOgLogoDataUrl } from '@/lib/og-background'
import { DynamicOgTextOverlay } from '@/lib/og-dynamic-overlay'

export const runtime = 'nodejs'

/** Covers come only from our Sanity project, so the route cannot be used to fetch other images */
const COVER_PREFIX = 'https://cdn.sanity.io/images/jstwkd69/'

/** A card is the same for the same query, so the CDN keeps it once it is drawn */
const CACHE = 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400'

const full = { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 } as const

/**
 * Share cards for Sanity pages.
 * - `cover`: the page's cover, full-bleed, with the logo on a dark tab.
 * - otherwise: the dark template with `eyebrow`, `title` and `description`.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cover = searchParams.get('cover')
    const title = searchParams.get('title') || 'RubixKube'
    const description = searchParams.get('description') || undefined
    const eyebrow = searchParams.get('eyebrow') || undefined
    const accent = searchParams.get('accent') || undefined

    const card =
      cover && cover.startsWith(COVER_PREFIX) ? (
        <div style={{ height: '100%', width: '100%', display: 'flex', position: 'relative', backgroundColor: '#0f1013' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt="" style={{ ...full, objectFit: 'cover' }} />
          <div
            style={{
              position: 'absolute',
              left: '48px',
              bottom: '48px',
              display: 'flex',
              alignItems: 'center',
              padding: '16px 22px',
              borderRadius: '12px',
              backgroundColor: '#0f1013',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={getOgLogoDataUrl()} alt="RubixKube" width={189} height={22} />
          </div>
        </div>
      ) : (
        <div style={{ height: '100%', width: '100%', display: 'flex', position: 'relative', backgroundColor: '#0f1013' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={getOgDynamicTemplateDataUrl()} alt="" style={{ ...full, objectFit: 'cover' }} />
          <DynamicOgTextOverlay eyebrow={eyebrow} title={title} description={description} accent={accent ?? null} />
        </div>
      )

    return new ImageResponse(card, { width: 1200, height: 630, fonts: getOgFonts(), headers: { 'Cache-Control': CACHE } })
  } catch (e: unknown) {
    console.log(`${(e as Error).message}`)
    return new Response('Failed to generate the image', { status: 500 })
  }
}
