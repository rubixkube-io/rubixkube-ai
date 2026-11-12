import { ImageResponse } from 'next/og'
import { KeplerOgMark } from '@/lib/og-kepler'

// The home screen icon for /kepler: the Kepler mark on the page's near-black
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#07070f' }}>
        <KeplerOgMark size={132} />
      </div>
    ),
    size,
  )
}
