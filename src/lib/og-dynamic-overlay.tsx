/**
 * Typography layered on {@link public/og-template.png} for dynamic Open Graph images.
 */
export type DynamicOgOverlayProps = {
  eyebrow?: string
  title: string
  description: string
  stats?: string | null
}

export function DynamicOgTextOverlay({
  eyebrow = 'RubixKube',
  title,
  description,
  stats,
}: DynamicOgOverlayProps) {
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
        maxWidth: '620px',
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
          fontSize: '56px',
          fontWeight: 300,
          lineHeight: 1.02,
          color: '#111318',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: '20px',
          fontSize: '17px',
          lineHeight: 1.5,
          color: '#5e616b',
          fontFamily: 'ui-monospace, monospace',
          fontWeight: 300,
        }}
      >
        {description}
      </div>
      {stats ? (
        <div
          style={{
            marginTop: '22px',
            fontSize: '20px',
            fontWeight: 300,
            color: '#2f5bff',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {stats}
        </div>
      ) : null}
    </div>
  )
}
