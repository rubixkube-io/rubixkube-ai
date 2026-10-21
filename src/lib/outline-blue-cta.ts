/**
 * Outline CTAs with brand blue border + label (transparent fill, light blue hover wash).
 * Compose with `Button` / `CalendlyBooking`: `variant="outline"` + matching `size`.
 */

/** Navbar Book Demo — `size="sm"` */
export const outlineBlueAccentNav =
  '!rounded-[5px] !border-[rgba(47,91,255,0.3)] !bg-transparent !py-[9px] !px-5 !text-[13px] !font-medium !tracking-[0.12em] !text-[var(--blue)] shadow-[0_1px_2px_rgba(17,19,24,0.06)] !transition-[box-shadow,border-color,background-color] !duration-200 hover:!border-[rgba(47,91,255,0.55)] hover:!bg-[rgba(47,91,255,0.04)] hover:shadow-[0_4px_16px_rgba(47,91,255,0.18)] active:translate-y-px active:shadow-[0_1px_4px_rgba(47,91,255,0.12)] min-[1920px]:!py-[11px] min-[1920px]:!px-6 min-[1920px]:!text-[13px] min-[2560px]:!text-[13px]'

/** Hero / in-page section links — `size="md"` */
export const outlineBlueAccentMd =
  '!rounded-[5px] !border-[rgba(47,91,255,0.3)] !bg-transparent !text-[var(--blue)] shadow-[0_1px_2px_rgba(17,19,24,0.06)] !transition-[box-shadow,border-color,background-color] !duration-200 hover:!border-[rgba(47,91,255,0.55)] hover:!bg-[rgba(47,91,255,0.04)] hover:shadow-[0_4px_16px_rgba(47,91,255,0.18)] active:translate-y-px active:shadow-[0_1px_4px_rgba(47,91,255,0.12)]'

/** Larger secondary (e.g. closing CTA, whitepaper download) — `size="lg"` */
export const outlineBlueAccentLg =
  '!rounded-[5px] !border-[rgba(47,91,255,0.3)] !bg-transparent !text-[var(--blue)] shadow-[0_1px_2px_rgba(17,19,24,0.06)] !transition-[box-shadow,border-color,background-color] !duration-200 hover:!border-[rgba(47,91,255,0.55)] hover:!bg-[rgba(47,91,255,0.04)] hover:shadow-[0_4px_16px_rgba(47,91,255,0.18)] active:translate-y-px active:shadow-[0_1px_4px_rgba(47,91,255,0.12)]'

/**
 * Quiet outline CTAs in ink: a 1px ring in the line colour, no blue. Blue is kept for the one
 * thing to press, so second actions next to it use these.
 */
const outlineInk =
  '!rounded-[5px] !border-[var(--border)] !bg-transparent !text-[var(--ink)] shadow-none !transition-[border-color,background-color] !duration-200 hover:!border-[var(--ink)]/40 hover:!bg-[var(--ink)]/[0.03] active:translate-y-px'

/** Navbar second action — `size="sm"` */
export const outlineInkNav = `${outlineInk} !py-[9px] !px-5 !text-[13px] !font-medium !tracking-[0.12em] min-[1920px]:!py-[11px] min-[1920px]:!px-6`

/** Hero / in-page second action — `size="md"` */
export const outlineInkMd = outlineInk
