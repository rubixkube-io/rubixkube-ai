'use client'

import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Zap, 
  Brain, 
  Network, 
  Shield, 
  FileText 
} from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp, cardHover } from '@/lib/animations'

const features = [
  {
    title: 'Conversational Control',
    copy: 'Manage clusters and apps through chat, CLI, or web. Natural language with real action.',
    icon: MessageSquare
  },
  {
    title: 'Smart Agent Operations',
    copy: 'Agents detect incidents, triage root cause, and propose fixes with evidence.',
    icon: Zap
  },
  {
    title: 'Evolving Memory',
    copy: 'Snapshot and historical memory improve every decision and RCA.',
    icon: Brain
  },
  {
    title: 'Agent Mesh',
    copy: 'Specialized agents coordinate across your stack to investigate and remediate faster.',
    icon: Network
  },
  {
    title: 'Guardrails and Approvals',
    copy: 'Least-privilege actions, policy checks, and human approvals when you want them.',
    icon: Shield
  },
  {
    title: 'Evidence-Linked RCA',
    copy: 'Timelines, queries, diffs, and actions captured automatically and shared with teams.',
    icon: FileText
  }
]

export function FeaturesGrid() {
  const prefersReducedMotion = useReducedMotion()





  return (
    <section className="py-24 md:py-20 sm:py-14 bg-background-secondary">
      <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
        <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
          className="text-center mb-16"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.015em] text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            The future of operations, powered by intelligent agents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={fadeUpVariants}
                {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
                {...(prefersReducedMotion ? {} : cardHover)}
                className="rounded-2xl border border-border bg-card-background p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg h-full"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed text-sm">
                  {feature.copy}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
