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
        'mb-9 flex items-center gap-3.5 font-[family-name:var(--font-mono)] text-[11px] font-normal uppercase tracking-[0.22em] text-[var(--mid)] min-[1920px]:text-[13px] min-[2560px]:text-[15px]',
        className,
      )}
    >
      <span className="h-px w-5 shrink-0 bg-[var(--blue)]" aria-hidden />
      {children}
    </div>
  )
}
