import type { ReactNode } from 'react'

/** A soft blue field with a faint dot grid, for product views to float on. */
export function Backdrop({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-[var(--background-secondary)] ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(120% 90% at 0% 0%, color-mix(in srgb, var(--blue) 16%, transparent), transparent 60%), radial-gradient(90% 70% at 100% 100%, color-mix(in srgb, var(--blue) 10%, transparent), transparent 60%), radial-gradient(color-mix(in srgb, var(--ink) 7%, transparent) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, 14px 14px',
      }}
    >
      {children}
    </div>
  )
}
