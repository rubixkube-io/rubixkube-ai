'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp, cardHover } from '@/lib/animations'

const useCases = [
  {
    title: 'Incident Response',
    points: [
      'Auto-triage and correlation across logs, metrics, traces',
      'Proposed fixes with risk and blast radius',
      'MTTR down. On-call stress down'
    ]
  },
  {
    title: 'Release Reliability',
    points: [
      'Detect bad rollouts right after deploy',
      'Rollback or patch with context and approvals',
      'Protect customer experience'
    ]
  },
  {
    title: 'Cost and Performance',
    points: [
      'Spot regressions and noisy neighbors',
      'Right-size workloads with evidence',
      'Keep SLOs and budgets in line'
    ]
  },
  {
    title: 'Compliance and Audit',
    points: [
      'Action logs, RCAs, and policies in one place',
      'Prove who did what and why',
      'SOC-friendly by design'
    ]
  }
]

export function UseCases() {
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
            What RubixKube handles
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
              {...(prefersReducedMotion ? {} : cardHover)}
              className="rounded-2xl border border-border bg-card-background p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg h-full"
            >
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                {useCase.title}
              </h3>
              <ul className="space-y-3">
                {useCase.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cta-green flex-shrink-0 mt-0.5" />
                    <span className="text-foreground-muted leading-relaxed text-sm">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
