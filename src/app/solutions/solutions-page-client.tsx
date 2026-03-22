'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants } from '@/lib/animations'
import { CardGrid } from '@/components/ui/card-grid'
import { 
  ArrowRight,
  Lightbulb,
  Users,
  Shield,
  Brain,
  AlertTriangle,
  Cloud,
  Dices
} from 'lucide-react'
import Link from 'next/link'

export function SolutionsPageClient() {
  const useCases = [
    {
      title: "Self-healing infrastructure.",
      copy: "Imagine a system that doesn't just alert you to problems, but fixes them on its own, correlating signals, pinpointing the root cause, and applying safe fixes.",
      icon: AlertTriangle
    },
    {
      title: "Prevention over panic.",
      copy: "RubixKube learns from every past incident, allowing it to predict and stop repeat failures before they can cascade and cause damage.",
      icon: Lightbulb
    },
    {
      title: "Proactive guardrails for every launch.",
      copy: "RubixKube validates deployments and automatically rolls back at the first sign of risk, transforming a moment of potential crisis into a seamless, automated recovery.",
      icon: Shield
    },
    {
      title: "Capacity without chaos.",
      copy: "RubixKube turns reactive scaling into proactive intelligence. The system continuously optimizes resources, ensuring your infrastructure is always ready for demand and preventing bottlenecks before they even form.",
      icon: Brain
    }
  ]

  const industries = [
    {
      title: "E-commerce & Retail",
      copy: "Keep your online store running 24/7. Prevent revenue loss from downtime and ensure smooth customer experiences.",
      icon: Cloud,
      challenges: ["High traffic spikes", "Payment processing reliability", "Inventory system uptime"]
    },
    {
      title: "Financial Services",
      copy: "Meet strict compliance requirements while maintaining system reliability. AI agents ensure your financial systems are always available.",
      icon: Shield,
      challenges: ["Regulatory compliance", "Transaction processing", "Data security"]
    },
    {
      title: "Healthcare & Life Sciences",
      copy: "Ensure critical healthcare systems remain operational. AI agents monitor and maintain the infrastructure that supports patient care.",
      icon: Users,
      challenges: ["Patient data systems", "Medical device connectivity", "Emergency response systems"]
    },
    {
      title: "Technology & SaaS",
      copy: "Scale your platform with confidence. AI agents handle the complexity of modern cloud-native architectures.",
      icon: Dices,
      challenges: ["Microservices complexity", "Multi-cloud management", "API reliability"]
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg)]" aria-hidden />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-20 sm:px-6 md:px-[var(--pad)] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px]">
          <div className="min-h-[600px] flex flex-col items-center justify-center gap-12">
            {/* Text Content */}
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUpVariants}>
                <span className="mb-8 inline-flex items-center border border-[var(--rule)] bg-[var(--background-secondary)] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] text-[var(--mid)] uppercase">
                  Solutions
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                className="mb-6 px-4 font-[family-name:var(--font-serif)] text-[clamp(2.25rem,6vw,5rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)] sm:px-0"
                variants={fadeUpVariants}
              >
                Solve Real <span className="italic text-[var(--blue)]">Infrastructure Challenges</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                className="mx-auto max-w-[90vw] px-4 font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)] sm:max-w-[55ch] sm:px-0"
                variants={fadeUpVariants}
              >
                From reactive firefighting to autonomous, self-healing operations.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-3 mt-8 justify-center items-center w-full px-4 sm:px-0"
              >
                <CalendlyBooking url="https://calendly.com/rubixkube-ai/30min" variant="primary" size="lg" className="inline-flex items-center gap-2">
                  Book Demo
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </CalendlyBooking>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#solutions">
                    Explore Solutions
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="solutions" className="py-24 md:py-20 sm:py-14 bg-background">
        <CardGrid
          items={useCases}
          title="The Reliability Layer for AI Era"
          subtitle="Transform your operations with intelligent automation and proactive monitoring."
          variant="with-icon-2x2"
        />
      </section>

      {/* Industries Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary">
        <CardGrid
          items={industries}
          title="Industries Powered by SRI"
          subtitle="We secure businesses across every industry. From high-growth startups to Fortune 500 enterprises - by ensuring compliance and eliminating their toughest infrastructure challenges."
          variant="with-challenges-2x2"
        />
      </section>

      {/* CTA Section */}
      <ClosingCTA />

      <Footer />
    </>
  )
}
