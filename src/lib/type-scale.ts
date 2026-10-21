/**
 * The site's three text sizes. The home page, nav and footer use only these; other pages move
 * onto them over time. A new size is added here only when a page truly needs it.
 */
const mono = 'font-[family-name:var(--font-mono)]'
const serif = 'font-[family-name:var(--font-serif)]'

export const type = {
  /** Opening statements and the biggest headlines */
  display: `${serif} text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.12] tracking-[-0.012em]`,
  /** Card titles, belief rows, footer column headings */
  statement: `${serif} text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.22] tracking-[-0.008em]`,
  /** Everything else: nav, links, buttons, dates, labels, short lines */
  small: `${mono} text-[13px] tracking-[0.02em]`,
}

/** The small size alone, for places that set their own font, weight and letter spacing */
export const smallSize = 'text-[13px]'
