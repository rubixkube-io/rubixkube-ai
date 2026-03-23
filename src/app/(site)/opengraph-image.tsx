import { ImageResponse } from 'next/og'

export const alt = 'RubixKube | Site Reliability Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
            top: '40px',
            left: '40px',
            color: 'white',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
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
            RubixKube
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#60a5fa',
              fontWeight: '600',
              marginBottom: '20px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}
          >
            Site Reliability Intelligence
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
            Detect, diagnose, and heal issues before customers feel them.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}