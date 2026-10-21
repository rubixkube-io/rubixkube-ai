/**
 * The site's three text sizes. The home page, nav and footer use only these; other pages move
 * onto them over time. A new size is added here only when a page truly needs it.
 */
const mono = 'font-[family-name:var(--font-mono)]'
const sans = 'font-[family-name:var(--font-figtree)] font-semibold'

export const type = {
  /** Opening statements and the biggest headlines */
  display: `${sans} text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.1] tracking-[-0.03em]`,
  /** Card titles, belief rows, footer column headings */
  statement: `${sans} text-[clamp(1.25rem,1.7vw,1.6rem)] leading-[1.25] tracking-[-0.02em]`,
  /** Everything else: nav, links, buttons, dates, labels, short lines */
  small: `${mono} text-[13px] tracking-[0.02em]`,
}

/** The small size alone, for places that set their own font, weight and letter spacing */
export const smallSize = 'text-[13px]'
