import { fadeUpVariants } from '@/lib/animations'

/** Text and section classes shared by the product pages (Kepler and its creators page). */
export const mono = 'font-[family-name:var(--font-mono)]'
export const sans = 'font-[family-name:var(--font-figtree)]'
export const label =
  'mb-6 inline-block font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase'
export const h2 = 'rk-section-title mt-0 mb-6 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)]'
export const lead = 'rk-section-body m-0 max-w-[44ch] text-[var(--mid)]'
export const section = 'scroll-mt-[calc(var(--nav-stack)+4rem)] bg-[var(--bg)] py-24 sm:py-32'

export const reveal = {
  variants: fadeUpVariants,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, amount: 0.1 },
}
