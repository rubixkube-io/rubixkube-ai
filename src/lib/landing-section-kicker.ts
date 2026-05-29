import { rkMono10, rkMono11 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'

/** Muted mono line above a section H2 — sentence case, no rules or letter-spaced caps. */
export const landingSectionKickerClass = cn(
  'font-[family-name:var(--font-mono)] font-normal leading-snug tracking-normal text-[var(--text-muted)]',
  rkMono10,
)

/** Supporting line under a kicker or beside a headline (metrics source, etc.). */
export const landingSectionMetaClass = cn(
  'font-[family-name:var(--font-mono)] font-light leading-relaxed tracking-normal text-[var(--text-muted)]',
  rkMono11,
)
