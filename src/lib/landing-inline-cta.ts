import { cn } from '@/lib/utils'

/** Base for in-flow text CTAs (blue link + arrow), matches metrics / platform / docs. */
const landingCtaLinkBase =
  'group inline-flex items-center gap-2 font-[family-name:var(--font-mono)] font-medium text-[var(--blue)] underline decoration-1 underline-offset-4 transition-colors hover:text-[var(--ink)]'

export const landingCtaLinkSm = cn(
  landingCtaLinkBase,
  'text-[11px] min-[1920px]:text-[13px] min-[2560px]:text-[15px]',
)

export const landingCtaLinkSmCaps = cn(landingCtaLinkSm, 'uppercase tracking-[0.14em]')

export const landingCtaLinkLg = cn(
  landingCtaLinkBase,
  'text-[12px] tracking-[0.1em] min-[1920px]:text-sm min-[2560px]:text-base',
)

export const landingCtaArrowSmClass =
  'h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5'

export const landingCtaArrowLgClass =
  'h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5'
