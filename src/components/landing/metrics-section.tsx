'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { type } from '@/lib/type-scale'
import { cn } from '@/lib/utils'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { Reveal } from './reveal'

const CALENDLY = 'https://calendly.com/rubixkube-ai/30min'

const mono = 'font-[family-name:var(--font-mono)]'

/** The numbers as three outcomes: a lead figure, and a smaller one under it that backs it up */
const OUTCOMES = [
  {
    label: 'Faster answers',
    lead: { n: '2.8', u: 'min', l: 'Mean time to understand an incident' },
    more: { n: '21', u: '×', l: 'Faster than by hand' },
  },
  {
    label: 'Less noise',
    lead: { n: '90', u: '%', l: 'Fewer alerts that need a person' },
    more: { n: '98', u: '%', l: 'Of real issues still caught' },
  },
  {
    label: 'Time back',
    lead: { n: '220', u: 'hrs', l: 'Engineering time saved each month' },
    more: { n: '$6K', u: '/mo', l: 'Engineering cost saved' },
  },
] as const

/**
 * The numbers as a ruled list beside the title, read top to bottom in the order an incident runs:
 * understand it faster, hear less noise, get the time back. Each row: the figure on the left, what
 * it means and the number that backs it up on the right.
 */
export function MetricsSection() {
  return (
    <section
      id="landing-metrics"
      className="landing-snap-section flex flex-col justify-center px-[var(--pad)] py-16 lg:py-0"
    >
      <div className="rk-landing-max grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        {/* title level with the list's top rule */}
        <Reveal className="flex flex-col lg:col-span-5">
          <h2 className="rk-landing-h2-std rk-section-title m-0 -mt-[0.12em] text-[var(--ink)]">
            What happens <br />
            when your stack <br />
            <em>thinks for itself.</em>
          </h2>
          <p className="rk-section-body m-0 mt-6 max-w-[22em] text-[var(--mid)]">
            Early results from production deployments, measured as the average across 12 teams.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            {/* the same main button as the hero's Start for free */}
            <CalendlyBooking
              url={CALENDLY}
              variant="primary"
              className="!inline-flex !h-12 !items-center !rounded-[6px] !border-0 !bg-[var(--blue)] !px-6 !py-0 !font-[family-name:var(--font-figtree)] !text-[16px] !font-medium !tracking-normal !text-white !normal-case transition-[box-shadow] duration-200 hover:shadow-[0_6px_24px_rgba(47,91,255,0.35)] active:translate-y-px"
            >
              Book a demo
            </CalendlyBooking>
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]"
            >
              See pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ol className="m-0 list-none border-t border-[var(--ink)] p-0">
            {OUTCOMES.map((o, i) => (
              <li
                key={o.label}
                className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-[var(--rule)] py-7 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:items-end lg:py-[clamp(1.5rem,4.2vh,2.5rem)]"
              >
                <div>
                  <p className={cn(type.small, 'm-0 text-[var(--mid)]')}>
                    <span className="text-[var(--ink)]">0{i + 1}</span>
                    <span className="mx-2 text-[var(--rule)]">/</span>
                    {o.label}
                  </p>
                  <div className={cn(mono, 'mt-4 flex items-baseline gap-2 leading-none text-[var(--ink)]')}>
                    <span className="text-[clamp(3.25rem,5.2vw,5.5rem)] tracking-[-0.06em]">{o.lead.n}</span>
                    <span className="text-[clamp(1.1rem,1.4vw,1.4rem)] tracking-normal text-[var(--mid)]">{o.lead.u}</span>
                  </div>
                </div>
                <div className="sm:pb-1.5">
                  <p className="rk-section-body m-0 text-[var(--ink)]">{o.lead.l}</p>
                  <p className="rk-section-body m-0 mt-1.5 text-[15px] text-[var(--mid)]">
                    <span className={cn(mono, 'text-[var(--ink)]')}>
                      {o.more.n}
                      {o.more.u}
                    </span>{' '}
                    {o.more.l.charAt(0).toLowerCase() + o.more.l.slice(1)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
