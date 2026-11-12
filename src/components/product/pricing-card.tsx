import type { ReactNode } from 'react'
import { CheckCircle } from 'lucide-react'

const mono = 'font-[family-name:var(--font-mono)]'
const sans = 'font-[family-name:var(--font-figtree)]'

/** A list of what a plan includes. An item wrapped in ** is shown in bold. */
function Includes({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => {
        const strong = item.startsWith('**')
        return (
          <li key={item} className={`${sans} flex items-start gap-3 text-[15px] leading-[1.5] ${strong ? 'font-medium text-[var(--ink)]' : 'text-[var(--mid)]'}`}>
            <CheckCircle className="mt-[3px] h-4 w-4 shrink-0 text-[var(--ink)]" strokeWidth={1.5} />
            <span>{item.replaceAll('**', '')}</span>
          </li>
        )
      })}
    </ul>
  )
}

/** One plan: name, price and unit already chosen for the billing period, a button, what it includes, an optional footer link. */
export function PricingCard({
  name,
  price,
  unit,
  recommended,
  includes,
  button,
  footer,
}: {
  name: string
  price: ReactNode
  unit: ReactNode
  recommended: boolean
  includes: readonly string[]
  button: ReactNode
  footer?: ReactNode
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-[var(--panel)] p-8 sm:p-10 ${
        recommended ? 'ring-1 ring-[var(--ink)]/40' : 'ring-1 ring-[var(--rule)]'
      }`}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className={`${mono} text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase`}>{name}</span>
        {recommended && <span className={`${mono} text-[12px] tracking-[0.1em] text-[var(--ink)] uppercase`}>Recommended</span>}
      </div>
      <p className={`${mono} mb-1 text-[clamp(3rem,5vw,4.5rem)] leading-none font-normal tracking-[-0.04em] text-[var(--ink)]`}>{price}</p>
      <p className={`${sans} mt-2 mb-6 text-[15px] text-[var(--mid)]`}>{unit}</p>
      {button}
      <hr className="my-8 border-[var(--rule)]" />
      <Includes items={includes} />
      {footer}
    </div>
  )
}
