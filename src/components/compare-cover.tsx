import { AbstractCover } from '@/components/solutions/abstract-cover'

/**
 * A cover for a comparison with no image: the other tool's name set large over a faint drawing
 * picked by the page's slug, so every comparison card says which one it is and no two look alike.
 */
export function CompareCover({ label, name, seed }: { label: string; name: string; seed: string }) {
  return (
    <span className="absolute inset-0 block bg-[var(--panel)]">
      <span className="absolute inset-0 opacity-45">
        <AbstractCover seed={seed} />
      </span>
      <span className="absolute inset-0 bg-gradient-to-t from-[var(--panel)] via-[color-mix(in_oklab,var(--panel)_70%,transparent)] to-transparent" />
      <span className="absolute inset-x-5 top-5 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em] text-[var(--mid)] uppercase">
        <span className="h-2 w-2 rounded-full bg-[var(--blue)]" aria-hidden />
        {label}
      </span>
      <span className="absolute inset-x-5 bottom-5 block font-[family-name:var(--font-figtree)] text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.025em] text-balance text-[var(--ink)]">
        {name}
      </span>
    </span>
  )
}
