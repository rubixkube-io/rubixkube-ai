'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants } from '@/lib/animations'
import { useTheme } from '@/components/theme-provider'
import DotGrid from '@/components/ui/bg'
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

  const useCases = [
    {
      title: "Incident Response & Resolution",
      copy: "Incidents that finish themselves - agents correlate signals, pinpoint root cause, and apply safe fixes.",
      icon: AlertTriangle
    },
    {
      title: "Proactive Monitoring & Prevention",
      copy: "Prevention over panic - learns from history to predict and stop repeat failures before they cascade.",
      icon: Lightbulb
    },
    {
      title: "Deployment Safety & Rollback",
      copy: "Safe launches, always - validates deployments and automatically rolls back at the first sign of risk.",
      icon: Shield
    },
    {
      title: "Capacity Planning & Optimization",
      copy: "Capacity without chaos - continuously optimizes resources before they bottleneck.",
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

        <div className="relative z-10 mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-4 sm:px-6 md:px-8 pt-20">
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
                <span className="inline-flex items-center rounded-full border border-border bg-background-secondary px-3 py-1 text-sm font-medium text-foreground-muted mb-8">
                  Solutions
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px] tracking-[-0.02em] leading-[0.95] text-foreground mb-6 px-4 sm:px-0"
                variants={fadeUpVariants}
              >
                Solve Real <span className="text-accent">Infrastructure Challenges</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                className="max-w-[90vw] sm:max-w-[55ch] text-[18px] sm:text-[19px] md:text-[20px] leading-7 text-foreground-muted mx-auto px-4 sm:px-0"
                variants={fadeUpVariants}
              >
                Reliability isn&apos;t optional. Every failure costs revenue, trust, and momentum. RubixKube transforms operations from firefighting to foresight - keeping your business resilient.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-3 mt-8 justify-center items-center w-full px-4 sm:px-0"
              >
                <Button size="lg" asChild>
                  <CalendlyBooking url="https://calendly.com/rubixkube/new-meeting">
                    Book Demo
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </CalendlyBooking>
                </Button>
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
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <CardGrid
          items={useCases}
          title="Key Use Cases"
          subtitle="Transform your operations with intelligent automation and proactive monitoring."
          variant="with-icon-2x2"
        />
      </section>

      {/* Industries Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary">
        <CardGrid
          items={industries}
          title="Industries We Serve"
          subtitle="From startups to enterprises, RubixKube adapts to your industry&apos;s unique challenges and compliance requirements."
          variant="with-challenges-2x2"
        />
      </section>

      {/* CTA Section */}
      <ClosingCTA />

      <Footer />
    </>
  )
}
