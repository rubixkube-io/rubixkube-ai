import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { getOgDynamicTemplateDataUrl } from '@/lib/og-background'
import { DynamicOgTextOverlay } from '@/lib/og-dynamic-overlay'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'RubixKube'
    const description =
      searchParams.get('description') ||
      'Infrastructure that heals itself. Detect, diagnose, and resolve autonomously before customers feel it.'
    const stats = searchParams.get('stats') || undefined

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
          <DynamicOgTextOverlay title={title} description={description} stats={stats ?? null} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: unknown) {
    const error = e as Error
    console.log(`${error.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
