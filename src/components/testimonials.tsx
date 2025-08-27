'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'

const testimonials = [
  {
    quote: 'RubixKube brought calm and clarity to our operations. Instead of noise, we got actions that made sense. We moved from reacting to anticipating.',
    author: 'Ganesh Kumar,CEO Sheshi AI'
  },
  {
    quote: 'It\'s rare that something makes seasoned SREs pause mid-standup. RubixKube did. Confident impact with low risk.',
    author: 'Richie Sebastian, DevOps Lead'
  },
  {
    quote: 'The value wasn\'t a dashboard. It was the system fixing the right things at the right time with proof.',
    author: 'Kartik Pawar, Staff Engineer, Fellow.ai'
  }
]

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion()



  return (
    <section className="py-24 md:py-20 sm:py-14 bg-background-secondary">
      <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
        <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
          className="text-center mb-16"
        >
          <h2 className="text-[56px] sm:text-[40px] font-extrabold tracking-[-0.015em] text-foreground mb-4">
            Success Stories
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
              className="rounded-2xl border border-border bg-card-background p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg h-full"
            >
              <Quote className="w-8 h-8 text-accent mb-4" />
              <blockquote className="text-foreground-muted leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="text-sm font-medium text-foreground">
                - {testimonial.author}
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
