'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { ArrowRight, Download } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { HeroVideo } from './hero-video'

// Declare the spline-viewer custom element for TypeScript
declare module 'react' {
  interface IntrinsicElements {
    'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      url: string;
    };
  }
}

export function ClosingCTA() {
  const prefersReducedMotion = useReducedMotion()

  // Load Spline viewer script
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.51/build/spline-viewer.js'
    document.head.appendChild(script)

    return () => {
      // Clean up script on component unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <section className="relative py-24 md:py-20 sm:py-14 overflow-hidden">
      {/* Spline 3D Background */}
      {/* <div className="absolute inset-0 w-full h-full">
        {React.createElement('spline-viewer', {
          url: '/reactive-bg.spline',
          className: 'w-full h-full object-cover scale-150',
        })}
      </div> */}
      
      {/* Content overlay */}
      <div className="relative z-10">
      <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="p-8 rounded-2xl">
            <motion.h2
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
              className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] font-extrabold tracking-[-0.015em] text-foreground mb-6 leading-[0.95] px-4 sm:px-0"
            >
              Ready to keep your infrastructure reliable?
            </motion.h2>
            
            <motion.p
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.1 } })}
              className="text-base sm:text-lg text-foreground-muted mb-8 leading-relaxed px-4 sm:px-0"
            >
              Put Site Reliability Intelligence to work in your stack.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.2 } })}
              className="flex flex-col sm:flex-row gap-3 items-start"
            >
              <Button size="lg" asChild>
                <CalendlyBooking url="https://calendly.com/rubixkube/new-meeting">
                  Schedule Demo
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </CalendlyBooking>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link href="/assets/whitepaper.pdf" download="The Reliability Layer | Rubixkube Whitepaper.pdf" target="_blank" className="flex items-center gap-2 whitespace-nowrap">
                  Download Whitepaper
                  <Download className="w-4 h-4 flex-shrink-0" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Visual - Video */}
          <div className="flex items-center justify-center">
              <HeroVideo prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
