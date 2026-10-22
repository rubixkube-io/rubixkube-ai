/**
 * Typography layered on {@link public/og-template.png} for dynamic Open Graph images:
 * the eyebrow in DM Mono, the title in Figtree semibold, the description in grey.
 */
export type DynamicOgOverlayProps = {
  eyebrow?: string
  title: string
  description?: string
  /** Short line under the description (proof point, pillar, CTA; no invented numbers). */
  accent?: string | null
}

function titleSize(title: string): number {
  const n = title.length
  // Satori underestimates wrapped height at large sizes, so long titles step down
  if (n > 80) return 40
  if (n > 56) return 48
  if (n > 36) return 56
  return 66
}

export function DynamicOgTextOverlay({ eyebrow = 'RubixKube', title, description, accent }: DynamicOgOverlayProps) {
  const size = titleSize(title)
  return (
    <div
      style={{
        position: 'absolute',
        top: '140px',
        left: '72px',
        width: '640px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ fontFamily: 'DM Mono', fontSize: '15px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a4a7b1' }}>{eyebrow}</div>
      <div
        style={{
          marginTop: '18px',
          fontFamily: 'Figtree',
          fontWeight: 600,
          fontSize: `${size}px`,
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          color: '#eceae4',
        }}
      >
        {title}
      </div>
      {description ? (
        <div style={{ marginTop: '22px', fontFamily: 'Figtree', fontSize: '22px', lineHeight: 1.45, color: '#a4a7b1', maxWidth: '600px' }}>
          {description}
        </div>
      ) : null}
      {accent ? (
        <div style={{ marginTop: '18px', fontFamily: 'DM Mono', fontSize: '15px', letterSpacing: '0.08em', color: '#5b7cff' }}>{accent}</div>
      ) : null}
    </div>
  )
}
