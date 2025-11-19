'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { LogoGrid } from './ui/logo-grid'

export function TrustedBy() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto">
              Proudly partnering with leading platforms and innovative startups to build reliable, self-healing infrastructure
            </p>
          </motion.div>

          {/* Logo Grid */}
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.2 } })}
          >
            <LogoGrid compact />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
