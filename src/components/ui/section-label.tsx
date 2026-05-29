import { rkMono10 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-9 flex items-center gap-3.5 font-[family-name:var(--font-mono)] font-normal uppercase tracking-[0.22em] text-[var(--mid)]',
        rkMono10,
        className,
      )}
    >
      <span className="h-px w-5 shrink-0 bg-[var(--blue)]" aria-hidden />
      {children}
    </div>
  )
}
