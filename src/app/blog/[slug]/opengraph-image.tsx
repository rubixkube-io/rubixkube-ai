import { ImageResponse } from 'next/og'


export const alt = 'Blog Post - RubixKube'
export const size = {
  width: 600,
  height: 315,
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
        }}
      >
        <img
          src="https://rubixkube.ai/og.jpg"
          alt="RubixKube Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            color: 'white',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '20px',
            borderRadius: '12px',
            maxWidth: '400px',
          }}
        >
            <div
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                lineHeight: 1.1,
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              }}
            >
              Blog Post
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#d1d5db',
                lineHeight: 1.4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              Read more on RubixKube Blog
            </div>
        </div>
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
            backgroundColor: '#1e293b',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          RubixKube Blog
        </div>
      ),
      {
        width: 600,
        height: 315,
      }
    )
  }
}
