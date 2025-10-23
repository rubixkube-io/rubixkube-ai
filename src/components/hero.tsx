'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { useTheme } from '@/components/theme-provider'
import DotGrid from './ui/bg'
import { JourneyAnimation } from './ui/journey-animation'
import { CalendlyBooking } from './ui/calendly-booking'

const supportingPoints = [
  'Detect, diagnose, and heal automatically, before customers feel it',
  'AI you can trust: Human-in-the-loop guardrails', 
  'Works with Kubernetes, cloud, and your existing tools'
]

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  
  // Theme-aware colors for DotGrid
  const dotColors = resolvedTheme === 'dark' 
    ? {
        baseColor: "rgba(147, 197, 253, 0.06)", // Light blue, very subtle
        activeColor: "rgba(147, 197, 253, 0.07)" // Light blue, slightly more visible
      }
    : {
        baseColor: "rgba(59, 130, 246, 0.06)", // Darker blue, very subtle  
        activeColor: "rgba(59, 130, 246, 0.07)" // Darker blue, slightly more visible
      }

  // Inject Typeform script only once
  useEffect(() => {
    if (!document.querySelector('script[src="//embed.typeform.com/next/embed.js"]')) {
      const script = document.createElement('script')
      script.src = "//embed.typeform.com/next/embed.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* DotGrid background */}
      <div className="absolute inset-0">
        <DotGrid
          dotSize={1.5}
          gap={20}
          baseColor={dotColors.baseColor}
          activeColor={dotColors.activeColor}
          proximity={100}
          shockRadius={250}
          shockStrength={4}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-6 md:px-8 pt-20">
        {/* News Badge */}
        <div className="w-full flex justify-center mb-8">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
          >
            <Link
              href="https://console.rubixkube.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/8 via-cyan-400/6 to-teal-400/4 dark:from-blue-600/12 dark:via-cyan-500/10 dark:to-teal-400/8 border border-blue-400/15 dark:border-teal-400/20 px-4 py-2 text-sm font-medium text-foreground hover:from-blue-500/12 hover:via-cyan-400/10 hover:to-teal-400/8 dark:hover:from-blue-600/25 dark:hover:via-cyan-500/20 dark:hover:to-teal-400/15 hover:border-blue-400/25 dark:hover:border-teal-400/30 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-500 group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-all duration-200 hover:scale-110 animate-pulse" style={{ animationDuration: '2s' }} />
              <span className="text-foreground/90 group-hover:text-foreground">
                Just launched! Meet your AI reliability team
              </span>
              <span className="text-primary group-hover:text-primary/80 font-semibold">
                Experience SRI
              </span>
              <ArrowRight className="w-3 h-3 text-primary group-hover:text-primary/80 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </motion.div>
        </div>
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
                  <span className="text-accent">Intelligence</span>
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
              <Button variant="primary" size="lg" asChild>
                <CalendlyBooking url="https://calendly.com/rubixkube-ai/30min">
                  Book Demo
                </CalendlyBooking>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/blog/the-age-of-site-reliability-intelligence-sri">
                  What is SRI?
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
        {/* ... trust bar remains unchanged ... */}
      </div>
    </section>
  )
}