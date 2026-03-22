'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { outlineBlueAccentLg } from '@/lib/outline-blue-cta'
import { ArrowRight, Download } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'

const CALENDLY = 'https://calendly.com/rubixkube-ai/30min'

export function ClosingCTA() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-t border-[var(--rule)] bg-[var(--bg)] px-[var(--pad)] py-20 sm:py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-[min(100%,48rem)] text-center lg:max-w-[min(100%,56rem)]">
        <motion.h2
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
          className="mb-6 px-2 font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)] sm:px-0"
        >
          Ready to keep your infrastructure reliable?
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.08 } })}
          className="mx-auto mb-10 max-w-xl px-2 font-[family-name:var(--font-mono)] text-sm font-light leading-relaxed text-[var(--mid)] sm:px-0 sm:text-[15px]"
        >
          Put Site Reliability Intelligence to work in your stack.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.15 } })}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <CalendlyBooking url={CALENDLY} variant="primary" size="lg" className="inline-flex items-center gap-2">
            Schedule Demo
            <ArrowRight className="h-4 w-4 shrink-0" />
          </CalendlyBooking>

          <Button asChild variant="outline" size="lg" className={`gap-2 ${outlineBlueAccentLg}`}>
            <Link
              href="/assets/whitepaper.pdf"
              download="The Reliability Layer | Rubixkube Whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Whitepaper
              <Download className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
