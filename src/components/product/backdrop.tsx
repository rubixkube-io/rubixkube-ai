import type { ReactNode } from 'react'

/** A soft blue field with a faint dot grid, for product views to float on. */
export function Backdrop({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-[var(--background-secondary)] ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(120% 90% at 0% 0%, rgba(47,91,255,0.16), transparent 60%), radial-gradient(90% 70% at 100% 100%, rgba(47,91,255,0.10), transparent 60%), radial-gradient(rgba(17,19,24,0.07) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, 14px 14px',
      }}
    >
      {children}
    </div>
  )
}
