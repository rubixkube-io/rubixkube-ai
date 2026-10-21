import { CUSTOMER_MARKS, LogoMark, type CustomerMark } from './partner-logos'

const LOGOS = CUSTOMER_MARKS.filter((m): m is Extract<CustomerMark, { kind: 'logo' }> => m.kind === 'logo')

/**
 * Every customer logo in one full-width row that drifts slowly to the left and fades out at
 * both edges. The list is drawn twice so the loop has no seam; the second copy is hidden from
 * screen readers. It pauses on hover, and stays still for people who ask for reduced motion
 * (see `.rk-ticker` in globals.css).
 */
export function CustomerLogoTicker() {
  const row = (copy: number) => (
    <ul className="m-0 flex shrink-0 list-none items-center p-0" aria-hidden={copy > 0 || undefined}>
      {LOGOS.map((mark) => (
        <li key={mark.src} className="m-0 flex h-10 shrink-0 items-center p-0 px-7 sm:px-9 lg:px-11">
          <LogoMark mark={mark} />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="rk-ticker" role="group" aria-label="Trusted by">
      <div className="rk-ticker-track">
        {row(0)}
        {row(1)}
      </div>
    </div>
  )
}
