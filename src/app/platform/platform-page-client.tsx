'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants } from '@/lib/animations'
import { useTheme } from '@/components/theme-provider'
import DotGrid from '@/components/ui/bg'
import { CardGrid } from '@/components/ui/card-grid'
import {
  CheckCircle,
  Lightbulb,
  Users,
  Clock,
  AlertTriangle,
  Rocket,
  Puzzle
} from 'lucide-react'
import Link from 'next/link'

export function PlatformPageClient() {
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
    },
    {
      title: "Integrations with your existing tools",
      copy: "RubixKube supports modular integrations with several third-party tools like Jira, Confluence, Github, PagerDuty, Microsoft Teams, Slack and several others.",
      icon: Puzzle
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
                  Platform
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-[40px] sm:text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] tracking-[-0.02em] leading-[0.95] text-foreground mb-6"
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
                  <Link href="https://console.rubixkube.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Launch Console
                    <Rocket className="w-4 h-4 flex-shrink-0" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#platform-in-action">
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
              <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl">
                <Image
                  src={`/screenshots/hero-${resolvedTheme === 'dark' ? 'dark' : 'light'}.png`}
                  alt="RubixKube Platform Dashboard - Cloud management interface with AI agents and infrastructure monitoring"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Talk to Infra Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary">
        <div className="mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Chat Screenshot */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-xl overflow-hidden border border-border shadow-xl">
                <Image
                  src={`/screenshots/chat-${resolvedTheme === 'dark' ? 'dark' : 'light'}.png`}
                  alt="RubixKube Chat Interface - Talk to your infrastructure"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Talk to your <span className="text-accent">Infrastructure</span>
              </h2>
              <p className="text-lg text-foreground-muted mb-8">
                Stop digging through logs and YAML files. Just ask RubixKube.
                Our intelligent conversational interface understands your infrastructure context
                and helps you diagnose issues, run commands, and get answers in seconds.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground-muted">Natural language queries</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground-muted">Context-aware responses</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground-muted">Execute actions safely</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Actionable Insights Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <div className="mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Actionable <span className="text-accent">Insights</span>
              </h2>
              <p className="text-lg text-foreground-muted mb-8">
                Get a unified view of your entire stack. RubixKube connects the dots between
                metrics, logs, and events to provide clear, actionable insights.
                Identify root causes faster and prevent incidents before they happen.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground-muted">Unified observability graph</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground-muted">Automated root cause analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-foreground-muted">Proactive anomaly detection</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Dashboard Screenshot */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2"
            >
              <div className="relative rounded-xl overflow-hidden border border-border shadow-xl">
                <Image
                  src={`/screenshots/actions-${resolvedTheme === 'dark' ? 'dark' : 'light'}.png`}
                  alt="RubixKube Dashboard - Actionable Insights"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
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
