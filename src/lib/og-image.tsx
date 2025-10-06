import { ImageResponse } from 'next/og'

export interface OGImageParams {
  title: string
  subtitle?: string
  description?: string
  stats?: string
}

export function generateOGImage({
  title,
  description = 'Detect, diagnose, and heal issues before customers feel them.',
  stats = 'Time saved: 90%'
}: OGImageParams) {
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
        {/* Background Image */}
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
        
        {/* Overlay Text */}
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
            {title}
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#d1d5db',
              lineHeight: 1.4,
              maxWidth: '400px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom Right Stats */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            backgroundColor: 'rgba(30, 58, 138, 0.9)',
            borderRadius: '12px',
            padding: '16px 20px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10,
          }}
        >
          <div style={{ marginBottom: '4px' }}>{title}</div>
          <div style={{ color: '#60a5fa' }}>{stats}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Add caching headers
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  )
}
