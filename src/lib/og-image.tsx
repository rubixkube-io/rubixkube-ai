import { ImageResponse } from 'next/og'
import { getOgDynamicTemplateDataUrl, getOgFonts } from '@/lib/og-background'
import { DynamicOgTextOverlay } from '@/lib/og-dynamic-overlay'

export interface OGImageParams {
  eyebrow?: string
  title: string
  description?: string
  accent?: string | null
}

/**
 * Page-specific OG: `og-template.png` with the page's title drawn on it.
 */
export function generateOGImage({
  eyebrow,
  title,
  description,
  accent,
}: OGImageParams) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#0f1013',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getOgDynamicTemplateDataUrl()}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <DynamicOgTextOverlay
          eyebrow={eyebrow}
          title={title}
          description={description}
          accent={accent ?? null}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: getOgFonts(),
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  )
}
