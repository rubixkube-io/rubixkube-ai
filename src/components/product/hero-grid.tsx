/** The faint blue glow and dot grid behind a product page hero. Fades out at the bottom. */
export function HeroGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'radial-gradient(60% 70% at 85% 40%, color-mix(in srgb, var(--blue) 12%, transparent), transparent 70%), radial-gradient(color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px)',
        backgroundSize: 'auto, 16px 16px',
        maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
      }}
    />
  )
}
