'use client'

import Image from 'next/image'
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
  CheckCircle,
  Lightbulb,
  Users,
  Clock,
  AlertTriangle,
  Rocket
} from 'lucide-react'
import Link from 'next/link'

export function PlatformPageClient() {
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

  const platformFeatures = [
    {
      title: "Agentic Mesh Architecture",
      copy: "A self orchestrating network of specialized AI agents (Observer, Planner, Executor, Historian, Collaborator) that form a collaborative reasoning engine for intelligent, multi-step infrastructure operations. Think \"microservices for operational intelligence.\"",
      icon: Users
    },
    {
      title: "Intelligent Conversational Interface",
      copy: "Human-centric, context-aware interface that transforms operational complexity into intuitive dialogue. Eliminates CLI gymnastics and YAML hunting - it's an operational copilot that understands infrastructure, not just text.",
      icon: Lightbulb
    },
    {
      title: "Unified Observability & Knowledge Graph",
      copy: "Comprehensive infrastructure graph connecting services, metrics, logs, dependencies, ownership, and incident history. Enriched with CI/CD, docs, and runbooks to answer \"What happened?\", \"Why?\", \"What next?\", and \"Has this happened before?\"",
      icon: Clock
    },
    {
      title: "Real-time Monitoring",
      copy: "Continuous observation of your infrastructure with intelligent anomaly detection and correlation.",
      icon: AlertTriangle
    },
    {
      title: "Automated Remediation",
      copy: "Intelligent agents that can automatically fix common issues while maintaining safety and compliance.",
      icon: Rocket
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

        <div className="relative z-10 mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-6 md:px-8 pt-20">
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
                <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-8">
                  Platform
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                className="text-[64px] lg:text-[72px] xl:text-[80px] sm:text-[48px] tracking-[-0.02em] leading-[0.95] text-foreground mb-6"
                variants={fadeUpVariants}
              >
                Site Reliability <span className="text-accent">Intelligence</span>
              </motion.h1>


              {/* Subheadline */}
              <motion.p 
                className="max-w-[55ch] text-[18px] leading-7 text-foreground-muted mx-auto"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Explore RubixKube&apos;s intelligent platform. Discover how our AI agents observe, plan, act, and learn to keep your infrastructure reliable and your business running.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-3 mt-8 justify-center"
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
            </motion.div>

            {/* Hero Platform Screenshot */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full max-w-6xl mx-auto"
            >
              <Image
                src="/623_1x_shots_so.png"
                alt="RubixKube Platform Dashboard - Cloud management interface with AI agents and infrastructure monitoring"
                width={1200}
                height={800}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary">
        <div className="mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-6 md:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              See the Platform in <span className="text-accent">Action</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Experience the power of AI-driven infrastructure management through our intuitive interface
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Platform Screenshot */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Image
                src="/279_1x_shots_so.png"
                alt="RubixKube RCA Reports Interface - Root Cause Analysis dashboard with incident management"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Right: Content */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Intelligent Incident Management
              </h3>
              <p className="text-lg text-foreground-muted mb-8">
                Our platform provides comprehensive RCA (Root Cause Analysis) capabilities, 
                helping teams quickly identify and resolve infrastructure issues before they impact customers.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground-muted">Automated incident detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground-muted">AI-powered root cause analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground-muted">Intelligent remediation suggestions</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <CardGrid
          items={platformFeatures}
          title="Platform Features"
          subtitle="Discover the key capabilities that make RubixKube the most intelligent infrastructure management platform available."
          variant="with-icon-2x2"
        />
      </section>

      {/* CTA Section */}
      <ClosingCTA />

      <Footer />
    </>
  )
}
