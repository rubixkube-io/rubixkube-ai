import { readFileSync } from 'fs'
import { join } from 'path'
import { ImageResponse } from 'next/og'

// Share cards for /kepler and /kepler/creators in the page's own look: the planet from the hero, Hanken Grotesk,
// and the page's two-tone headline (a bright line, then a softer one).

export const KEPLER_OG_SIZE = { width: 1200, height: 630 }

type Card = {
  /** public/kepler/og/<background> */
  background: string
  label?: string
  /** A short story above the headline, in the softer colour */
  lead?: string
  bright: string
  soft?: string
  address: string
}

const cache = new Map<string, Buffer>()
const read = (...parts: string[]) => {
  const path = join(process.cwd(), ...parts)
  if (!cache.has(path)) cache.set(path, readFileSync(path))
  return cache.get(path)!
}

const fonts = () =>
  ([300, 400, 600] as const).map((weight) => ({
    name: 'Hanken Grotesk',
    data: read('src', 'lib', 'og-fonts', `HankenGrotesk-${weight}.ttf`),
    weight,
    style: 'normal' as const,
  }))

/** The Kepler mark from the page header: a planet, its tilted ring and a moon */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-28 12 12)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3.1" fill="#ffffff" />
      <circle cx="19.3" cy="7.7" r="1.6" fill="#ffffff" />
    </svg>
  )
}

export function keplerOgImage({ background, label, lead, bright, soft, address }: Card) {
  const bg = `data:image/jpeg;base64,${read('public', 'kepler', 'og', background).toString('base64')}`
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', backgroundColor: '#03030a', fontFamily: 'Hanken Grotesk' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg} alt="" width={1200} height={630} style={{ position: 'absolute', top: 0, left: 0 }} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(90deg, rgba(3,3,10,0.94) 0%, rgba(3,3,10,0.78) 38%, rgba(3,3,10,0) 68%)',
          }}
        />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '56px 72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#ffffff' }}>
            <Mark size={40} />
            <span style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>Kepler</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
            {label && (
              <span style={{ fontSize: 22, fontWeight: 400, color: 'rgba(255,255,255,0.6)', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 22 }}>
                {label}
              </span>
            )}
            {lead && (
              <span style={{ fontSize: 30, fontWeight: 300, color: 'rgba(255,255,255,0.62)', lineHeight: 1.35, marginBottom: 26, maxWidth: 640 }}>
                {lead}
              </span>
            )}
            <span style={{ fontSize: 62, fontWeight: 600, color: '#ffffff', lineHeight: 1.04, letterSpacing: -1.6 }}>{bright}</span>
            {soft && (
              <span style={{ fontSize: 62, fontWeight: 300, color: 'rgba(255,255,255,0.56)', lineHeight: 1.04, letterSpacing: -1.6, marginTop: 6 }}>
                {soft}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 18, fontSize: 21, color: 'rgba(255,255,255,0.5)' }}>
            <span>by RubixKube</span>
            <span style={{ color: 'rgba(255,255,255,0.28)' }}>/</span>
            <span>{address}</span>
          </div>
        </div>
      </div>
    ),
    { ...KEPLER_OG_SIZE, fonts: fonts(), headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
  )
}

export { Mark as KeplerOgMark }
