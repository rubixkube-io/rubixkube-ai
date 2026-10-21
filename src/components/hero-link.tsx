import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * A phrase in a hero statement that opens the essay or page behind it. It keeps the sentence's
 * colour with a faint dotted underline; `accent` makes it blue. Use the accent once or twice at most.
 */
export function HeroLink({ href, accent = false, children }: { href: string; accent?: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`underline decoration-dotted decoration-1 underline-offset-[0.22em] transition-colors ${
        accent
          ? 'text-[var(--blue)] decoration-[var(--blue)]/25 hover:decoration-[var(--blue)]'
          : 'decoration-[var(--mid)]/15 hover:text-[var(--blue)] hover:decoration-[var(--blue)]'
      }`}
    >
      {children}
    </Link>
  )
}
