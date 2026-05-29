import { landingSectionKickerClass } from '@/lib/landing-section-kicker'
import { cn } from '@/lib/utils'

/** Editorial kicker above a section headline (homepage + marketing pages). */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <p className={cn('mb-4 max-w-prose', landingSectionKickerClass, className)}>{children}</p>
}
