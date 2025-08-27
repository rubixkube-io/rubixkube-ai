'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { ArrowRight, Eye, Brain, Zap, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'

const steps = [
  {
    title: 'Observe',
    copy: 'Continuously maps your infra across Kubernetes, cloud, code, and configs. Pulls context from Prometheus, Loki, GitHub, and more.',
    icon: Eye
  },
  {
    title: 'Plan', 
    copy: 'Agents reason over live data and history to propose safe, auditable actions.',
    icon: Brain
  },
  {
    title: 'Act',
    copy: 'Execute fixes behind guardrails. Approve PRs or apply controlled changes with policy checks.',
    icon: Zap
  },
  {
    title: 'Learn',
    copy: 'Every incident updates memory and playbooks. RCAs become knowledge, not documents you forget.',
    icon: TrendingUp
  }
]

export function SRIFlow() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="how-it-works" className="py-24 md:py-20 sm:py-14 overflow-hidden bg-background">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-6">
            How Site Reliability Intelligence works
          </div>
          <h2 className="text-[56px] sm:text-[40px] font-extrabold tracking-[-0.015em] mb-4 text-foreground">
            Observe → Plan → Act → Learn
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <motion.div
                key={step.title}
                variants={fadeUpVariants}
                {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden xl:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-accent to-transparent z-10 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-accent via-accent/80 to-transparent animate-flow" />
                  </div>
                )}
                
                <div className="rounded-xl p-6 border border-border bg-background hover:bg-background-secondary/50 transition-all duration-300 h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-foreground-muted">
                      {step.copy}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        {/* Image in centered card layout */}
        <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.2 } })}
          className="mb-12"
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          style={{
            filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.15)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.1))"
          }}
        >
          <div className="rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-2xl bg-background">
            <Image
              src='/rca.png'
              alt="RubixKube Dashboard Interface"
              width={800}
              height={800}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>
        
        <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.4 } })}
          className="text-center"
        >
          <Button 
            size="lg" 
            asChild
          >
            <CalendlyBooking url="https://calendly.com/rubixkube/new-meeting">
              Explore Platform
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </CalendlyBooking>
          </Button>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2F5BFF_1px,transparent_1px),linear-gradient(to_bottom,#2F5BFF_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.04]" />
    </section>
  )
}
