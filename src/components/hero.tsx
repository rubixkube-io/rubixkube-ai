'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { useTheme } from '@/components/theme-provider'
import DotGrid from './ui/bg'
import { JourneyAnimation } from './ui/journey-animation'



const supportingPoints = [
  'Detect, diagnose, and heal automatically, before customers feel it',
  'AI you can trust: Human-in-the-loop guardrails', 
  'Works with Kubernetes, cloud, and your tools'
]

// const trustbarLogos = [
//   { name: 'Sample 1', width: 120 },
//   { name: 'Sample 2', width: 100 },
//   { name: 'Sample 3', width: 140 },
// ]


export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  
  // Theme-aware colors for DotGrid
  const dotColors = resolvedTheme === 'dark' 
    ? {
        baseColor: "rgba(147, 197, 253, 0.06)", // Light blue, very subtle
        activeColor: "rgba(147, 197, 253, 0.12)" // Light blue, slightly more visible
      }
    : {
        baseColor: "rgba(59, 130, 246, 0.06)", // Darker blue, very subtle  
        activeColor: "rgba(162, 196, 250, 0.12)" // Darker blue, slightly more visible
      }

  return (
    
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* DotGrid background */}
      <div className="absolute inset-0">
        <DotGrid
          dotSize={3}
          gap={20}
          baseColor={dotColors.baseColor}
          activeColor={dotColors.activeColor}
          proximity={120}
          shockRadius={250}
          shockStrength={4}
          resistance={750}
          returnDuration={1.5}
        />
      </div>


      <div className="relative z-10 mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-6 md:px-8 pt-20">
        <div className="min-h-[600px] flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
              className="inline-flex items-center rounded-full border border-border bg-background-secondary px-3 py-1 text-sm font-medium text-foreground-muted mb-8"
            >
              RubixKube
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.1 } })}
              className="text-[40px] sm:text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] tracking-[-0.02em] leading-[0.95] text-foreground mb-6"
            >
              <span className="font-medium">Site Reliability</span>{' '}
              <span className="relative">
                <span className="relative inline-block font-normal">
                  Engineer
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none" 
                    viewBox="0 0 140 40" 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <filter id="organicStroke">
                        <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise"/>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.4"/>
                      </filter>
                    </defs>
                    <motion.path 
                      d="M-15,26 Q10,24 30,25 Q55,23 80,24 Q105,22 135,20" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeLinecap="round"
                      filter="url(#organicStroke)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1.0 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 1.2,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      className="text-accent"
                    />
                  </svg>
                </span>{' '}
                {/* after the strike through finishes show the word Intelligence */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <span className="font-black">Intelligence</span>
                </motion.span>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.2 } })}
              className="max-w-[55ch] text-[18px] leading-7 text-foreground-muted mb-8"
            >
              For Businesses who can&apos;t afford downtime, 
              RubixKube is the AI Reliability Brain (SRI) that predicts, prevents, and safely fixes failures across cloud-native stacks.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.3 } })}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Button size="lg" asChild>
                <CalendlyBooking url="https://calendly.com/rubixkube/new-meeting">
                  Book Demo
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </CalendlyBooking>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#how-it-works">
                  See it in Action
                </Link>
              </Button>
            </motion.div>

            {/* Supporting Points */}
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.4 } })}
              className="space-y-3"
            >
              {supportingPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cta-green flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground-muted">{point}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Journey Animation */}
          {/* hide on mobile */}
          <div className="flex-1 flex items-stretch justify-center lg:justify-end mt-8 lg:mt-0 hidden lg:block">
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.5 } })}
              className="w-full max-w-[620px] lg:max-w-[520px] xl:max-w-[600px] 2xl:max-w-[700px] 3xl:max-w-[800px]"
            >
              {/* Glassmorphic frame */}
              <div className="relative h-[520px] lg:h-[540px] rounded-3xl overflow-hidden border border-border-secondary">
                <div className="absolute inset-0">
                  <JourneyAnimation />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Bar */}
        {/* <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.6 } })}
          className="border-t border-border pt-8 mt-16"
        >
          <p className="text-sm text-foreground-muted mb-6">
            Trusted by modern engineering teams
          </p>
          <div className="flex items-center gap-8 opacity-70">
            {trustbarLogos.map((logo, index) => (
              <div
                key={logo.name}
                className="bg-background-secondary rounded-lg flex items-center justify-center text-xs font-medium text-foreground-muted hover:opacity-100 transition-opacity"
                style={{ width: logo.width, height: 40 }}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}
