import { ImageResponse } from 'next/og'
import { getOgPngDataUrl } from '@/lib/og-background'

export const alt = 'RubixKube | Site Reliability Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

/** Default (site) OG: static artboard only — title/description come from page metadata. */
export default async function Image() {
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
          src={getOgPngDataUrl()}
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
      </div>
    ),
    {
      ...size,
    },
  )
}
