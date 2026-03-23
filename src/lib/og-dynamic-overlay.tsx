/**
 * Typography layered on {@link public/og-template.png} for dynamic Open Graph images.
 */
export type DynamicOgOverlayProps = {
  eyebrow?: string
  title: string
  description: string
  /** Short line under the description (proof point, pillar, CTA—avoid invented numbers). */
  accent?: string | null
}

function titleMetrics(title: string): { fontSize: number; lineHeight: number } {
  const n = title.length
  // @vercel/og / Satori: very tight line-height + large type underestimates wrapped height → overlap with body.
  if (n > 68) return { fontSize: 36, lineHeight: 1.22 }
  if (n > 52) return { fontSize: 42, lineHeight: 1.2 }
  if (n > 38) return { fontSize: 48, lineHeight: 1.18 }
  return { fontSize: 56, lineHeight: 1.14 }
}

export function DynamicOgTextOverlay({
  eyebrow = 'RubixKube',
  title,
  description,
  accent,
}: DynamicOgOverlayProps) {
  const { fontSize: titlePx, lineHeight: titleLh } = titleMetrics(title)

  return (
    <div
      style={{
        position: 'absolute',
        top: '100px',
        left: '64px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        maxWidth: '600px',
      }}
    >
      <div
        style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#767986',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          marginTop: '12px',
          marginBottom: '28px',
          maxWidth: '600px',
          fontSize: `${titlePx}px`,
          fontWeight: 300,
          lineHeight: titleLh,
          color: '#111318',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '17px',
          lineHeight: 1.55,
          color: '#5e616b',
          fontFamily: 'ui-monospace, monospace',
          fontWeight: 300,
          maxWidth: '600px',
        }}
      >
        {description}
      </div>
      {accent ? (
        <div
          style={{
            marginTop: '20px',
            fontSize: '19px',
            fontWeight: 300,
            lineHeight: 1.35,
            color: '#2f5bff',
            fontFamily: 'Georgia, "Times New Roman", serif',
            maxWidth: '600px',
          }}
        >
          {accent}
        </div>
      ) : null}
    </div>
  )
}
