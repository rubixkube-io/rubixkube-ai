'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { CALENDLY_DEMO_URL } from '@/lib/calendly-demo-url'
import { ArrowDown } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'

const DEFAULT_HEADLINE = 'See how it works.'
const DEFAULT_SUBLINE = 'Book a 30-minute demo. No slides, just your stack.'

export type ClosingCTAProps = {
  headline?: string
  subline?: string
}

/** The closing ask on every page: a title, one line, the demo button and the whitepaper link */
export function ClosingCTA({ headline = DEFAULT_HEADLINE, subline = DEFAULT_SUBLINE }: ClosingCTAProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-t border-[var(--rule)] bg-[var(--bg)] px-[var(--pad)] py-20 md:py-28">
      <motion.div
        variants={fadeUpVariants}
        {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
        className="relative z-10 mx-auto max-w-[56rem] text-center"
      >
        <h2 className="rk-section-title m-0 text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.04] text-[var(--ink)]">{headline}</h2>

        <p className="rk-section-body mx-auto mt-5 mb-0 max-w-xl text-[clamp(17px,1.3vw,19px)] text-[var(--mid)]">{subline}</p>

        {/* the site's button pattern: one solid button and a text link */}
        <div className="mt-10 flex flex-col items-center justify-center gap-x-7 gap-y-5 sm:flex-row">
          <CalendlyBooking
            url={CALENDLY_DEMO_URL}
            variant="primary"
            className="!inline-flex !h-12 !items-center !rounded-[6px] !border-0 !bg-[var(--blue)] !px-6 !py-0 !font-[family-name:var(--font-figtree)] !text-[16px] !font-medium !tracking-normal !text-white !normal-case transition-[box-shadow] duration-200 hover:shadow-[0_6px_24px_rgba(47,91,255,0.35)] active:translate-y-px"
          >
            Schedule Demo
          </CalendlyBooking>

          <Link
            href="/assets/whitepaper.pdf"
            download="The Reliability Layer | Rubixkube Whitepaper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]"
          >
            Download Whitepaper
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
