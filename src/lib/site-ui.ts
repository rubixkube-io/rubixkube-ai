/**
 * The site's two actions, as the home page draws them: one solid blue button, and quiet text links
 * beside it (with an arrow: `ArrowRight` for a page on the site, `ArrowUpRight` for another site,
 * `ArrowDown` for a download). Blue is only for the main action.
 */

/** The main action: solid blue, Figtree, 6px corners */
export const siteButton =
  'inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-[var(--blue)] px-6 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-white transition-[box-shadow] duration-200 hover:shadow-[0_6px_24px_rgba(47,91,255,0.35)] active:translate-y-px'

/** The same button for a `CalendlyBooking`, whose own Button styles have to be overridden */
export const siteButtonCalendly =
  '!inline-flex !h-12 !items-center !gap-2 !rounded-[6px] !border-0 !bg-[var(--blue)] !px-6 !py-0 !font-[family-name:var(--font-figtree)] !text-[16px] !font-medium !tracking-normal !text-white !normal-case transition-[box-shadow] duration-200 hover:shadow-[0_6px_24px_rgba(47,91,255,0.35)] active:translate-y-px'

/** A secondary action: a Figtree text link; put the arrow icon inside with `h-4 w-4` */
export const siteLink =
  'group inline-flex items-center gap-1.5 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]'

/** The same text link for a `CalendlyBooking` */
export const siteLinkCalendly =
  'group !inline-flex !h-auto !items-center !gap-1.5 !rounded-none !border-0 !bg-transparent !p-0 !font-[family-name:var(--font-figtree)] !text-[16px] !font-medium !tracking-normal !text-[var(--ink)] !normal-case !shadow-none'

/** The arrow inside a `siteLink`, nudging on hover */
export const siteLinkArrow = 'h-4 w-4 transition-transform group-hover:translate-x-0.5'
