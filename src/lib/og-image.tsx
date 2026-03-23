import { ImageResponse } from 'next/og'
import { getOgDynamicTemplateDataUrl } from '@/lib/og-background'
import { DynamicOgTextOverlay } from '@/lib/og-dynamic-overlay'

export interface OGImageParams {
  eyebrow?: string
  title: string
  description?: string
  accent?: string | null
}

/**
 * Page-specific OG: `og-template.png` + editorial type (matches site, not the full og.png card).
 */
export function generateOGImage({
  eyebrow,
  title,
  description = 'Infrastructure that heals itself. Detect, diagnose, and resolve autonomously.',
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
          backgroundColor: '#f2f0eb',
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
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  )
}
