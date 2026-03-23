import { ImageResponse } from 'next/og'
import { getOgDynamicTemplateDataUrl } from '@/lib/og-background'
import { DynamicOgTextOverlay } from '@/lib/og-dynamic-overlay'


export const alt = 'Blog Post - RubixKube'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const { slug } = await params
    
    // For testing, always return the cover image for this specific blog post
    if (slug === 'whispers-from-the-edge-confessions-of-sri-agent') {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
            }}
          >
            <img
              src="https://cdn.sanity.io/images/jstwkd69/production/a428f3d01bae77cff02b744346595513c2e22544-1248x832.png?w=500&h=263&q=20"
              alt="Blog Post Cover"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ),
        {
          width: 600,
          height: 315,
          headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        }
      )
    }

    // Fallback to default OG image when no cover image is available
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
          eyebrow="RubixKube Blog"
          title="Blog"
          description="Read more on rubixkube.ai"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
  } catch (error) {
    console.error('Error generating OG image:', error)
    // Return a simple fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f2f0eb',
            color: '#111318',
            fontSize: '28px',
            fontWeight: 300,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          RubixKube Blog
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
