'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp, cardHover } from '@/lib/animations'

const whyPoints = [
  {
    title: 'One command center',
    copy: 'Unify incidents, signals, and actions in one place.'
  },
  {
    title: 'Predict and prevent',
    copy: 'Catch risky rollouts and regressions early.'
  },
  {
    title: 'De-risk deployments',
    copy: 'Plan safe rollbacks and patches with context.'
  },
  {
    title: 'MTTR that actually drops',
    copy: 'Correlate signals to evidence. No alert fatigue.'
  },
  {
    title: 'Protect revenue and trust',
    copy: 'SLOs stay green. Customers stay happy.'
  }
]

export function WhySection() {
  const prefersReducedMotion = useReducedMotion()





  return (
    <section className="py-24 md:py-20 sm:py-14 bg-background">
      <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
        <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
          className="text-center mb-16"
        >
          <h2 className="text-[56px] sm:text-[40px] font-extrabold tracking-[-0.015em] text-foreground mb-4">
            Why RubixKube
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyPoints.map((point, index) => (
            <motion.div
              key={point.title}
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
              {...(prefersReducedMotion ? {} : cardHover)}
              className="rounded-2xl border border-border bg-card-background p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-cta-green" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-foreground-muted leading-relaxed">
                    {point.copy}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
