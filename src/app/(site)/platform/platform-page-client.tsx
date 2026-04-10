'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { Button } from '@/components/ui/button'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { fadeUpVariants } from '@/lib/animations'
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
import { BrainIntegrationStrip } from '@/components/landing/brain-integration-strip'
import { BuiltOnSection } from '@/components/landing/built-on-section'

export function PlatformPageClient() {
  // Ordered to match bento spans: wide [0,3,4] get richer copy; narrow [1,2,5] get one punchy sentence
  const platformFeatures = [
    {
      title: "Agentic Mesh Architecture",
      copy: "A self-orchestrating network of specialized AI agents (Observer, Planner, Executor, Historian, Collaborator) that collaborate as a reasoning engine for multi-step infrastructure operations. Purpose-built for coordination, not just automation.",
      icon: Users
    },
    {
      title: "Real-time Monitoring",
      copy: "Continuous observation with intelligent anomaly detection that surfaces what matters, not just what fired.",
      icon: AlertTriangle
    },
    {
      title: "Automated Remediation",
      copy: "Agents that diagnose, plan, and act, with human-in-the-loop controls for safety and compliance.",
      icon: Rocket
    },
    {
      title: "Infrastructure Knowledge Graph",
      copy: "A live graph of services, metrics, logs, dependencies, ownership, and incident history, enriched with CI/CD context and runbooks. Answers not just what happened, but why, what changed, and whether it happened before.",
      icon: Clock
    },
    {
      title: "Conversational Interface",
      copy: "A context-aware operational interface that transforms infrastructure complexity into natural dialogue. Ask questions, trigger actions, and review incident timelines without CLI gymnastics or YAML hunting.",
      icon: Lightbulb
    },
    {
      title: "Integrations",
      copy: "Native connectors for Jira, GitHub, PagerDuty, Slack, Confluence, and more. Plugs into your stack on day one.",
      icon: Puzzle
    }
  ]

  return (
    <>
      <Navbar />

      {/* Hero Section — screenshot naturally taller than first viewport; user scrolls to see the rest */}
      <section className="relative bg-[var(--bg)] pb-0">
        {/* Text block */}
        <div className="rk-landing-max relative z-10 w-full px-[var(--pad)] pt-[calc(var(--nav-stack)+5rem)] pb-14 text-center">
          <motion.div
            className="mx-auto max-w-4xl"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpVariants}>
              <span className="mb-8 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Platform Overview
              </span>
            </motion.div>

            <motion.h1
              className="mb-8 font-[family-name:var(--font-serif)] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]"
              variants={fadeUpVariants}
            >
              The architecture of
              <br />
              <span className="italic text-[var(--blue)]">autonomous reliability.</span>
            </motion.h1>

            <motion.p
              className="mx-auto max-w-[55ch] font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]"
              variants={fadeUpVariants}
            >
              A self-orchestrating mesh of specialized AI agents built to observe, diagnose, and heal infrastructure failures in real time.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Button asChild variant="primary">
                <Link href="https://console.rubixkube.ai" target="_blank" rel="noopener noreferrer">
                  Start Free
                  <Rocket className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button asChild variant="outline" className={outlineBlueAccentMd}>
                <Link href="https://calendly.com/rubixkube-ai/30min" target="_blank" rel="noopener noreferrer">
                  Book a Demo
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Browser-framed screenshot — capped at home page max-width (120rem), overflows section height */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto w-full px-[var(--pad)]"
          style={{ maxWidth: 'min(100%, 120rem)' }}
        >
          {/* Browser chrome */}
          <div className="rounded-t-xl border border-b-0 border-[var(--rule)] bg-[var(--background-secondary)] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
                <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
                <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
              </div>
              <div className="flex-1 rounded-md bg-[var(--bg)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                console.rubixkube.ai
              </div>
            </div>
          </div>
          {/* Screenshot — no height cap, overflows naturally */}
          <div className="overflow-hidden border border-t-0 border-[var(--rule)] shadow-2xl">
            <Image
              src="/screenshots/hero-light.png"
              alt="RubixKube Platform Dashboard"
              width={1200}
              height={800}
              className="h-auto w-full"
              priority
            />
          </div>
        </motion.div>

        {/* Gradient fade — screenshot dissolves into the next section rather than hard-cutting */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-64 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </section>

      <BuiltOnSection />

      {/* Talk to Infra Section */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid items-center gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20">
            {/* Left: Chat Screenshot */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div>
                <div className="rounded-t-xl border border-b-0 border-[var(--rule)] bg-[var(--background-secondary)] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
                      <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
                      <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
                    </div>
                    <div className="flex-1 rounded-md bg-[var(--bg)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                      console.rubixkube.ai
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden border border-t-0 border-[var(--rule)] shadow-sm">
                  <Image
                    src="/screenshots/chat-light.png"
                    alt="RubixKube Chat Interface - Talk to your infrastructure"
                    width={800}
                    height={600}
                    className="h-auto w-full"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent" />
                </div>
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
              <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Conversational UI
              </span>
              <h2 className="mb-6 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
                Talk to your <span className="italic text-[var(--blue)]">infrastructure.</span>
              </h2>
              <p className="mb-8 font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                Stop digging through logs and YAML files. Just ask RubixKube. Our intelligent
                conversational interface understands your infrastructure context and helps you
                diagnose issues, run commands, and get answers in seconds.
              </p>
              <div className="space-y-4 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)]">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
                  <span>Natural language queries</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
                  <span>Context-aware responses</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
                  <span>Execute actions safely</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Actionable Insights Section */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            {/* Left: Content */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1"
            >
              <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Unified Graph
              </span>
              <h2 className="mb-6 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
                Actionable <span className="italic text-[var(--blue)]">insights.</span>
              </h2>
              <p className="mb-8 font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                Get a unified view of your entire stack. RubixKube connects the dots between
                metrics, logs, and events to provide clear, actionable insights. Identify root
                causes faster and prevent incidents before they happen.
              </p>
              <div className="space-y-4 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)]">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
                  <span>Unified observability graph</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
                  <span>Automated root cause analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
                  <span>Proactive anomaly detection</span>
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
              <div>
                <div className="rounded-t-xl border border-b-0 border-[var(--rule)] bg-[var(--background-secondary)] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
                      <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
                      <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
                    </div>
                    <div className="flex-1 rounded-md bg-[var(--bg)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
                      console.rubixkube.ai
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden border border-t-0 border-[var(--rule)] shadow-sm">
                  <Image
                    src="/screenshots/actions-light.png"
                    alt="RubixKube Dashboard - Actionable Insights"
                    width={800}
                    height={600}
                    className="h-auto w-full"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rubix CLI Section */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid items-center gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20">
            {/* Left: Terminal Screenshot */}
            <div className="order-1 lg:order-1">
              <Image
                src="/screenshots/rubix-cli.png"
                alt="Rubix CLI Interface"
                width={1600}
                height={1200}
                className="h-auto w-full"
              />
            </div>

            {/* Right: Content */}
            <div className="order-2 lg:order-2">
              <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Rubix CLI
              </span>
              <h2 className="mb-6 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
                Intelligence in your <span className="italic text-[var(--blue)]">workflow.</span>
              </h2>
              <p className="mb-8 font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                Bring Site Reliability Intelligence into the workflow where engineers actually live. Investigate incidents, understand blast radius, and get intelligent RCAs without leaving your terminal.
              </p>
              <div className="mb-8 space-y-4 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)]">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
                  <span>No context switching</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
                  <span>Resume previous investigations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
                  <span>Manage multiple clusters</span>
                </div>
              </div>
              <Button asChild variant="outline" className={outlineBlueAccentMd}>
                <Link href="/products/rubix-cli">
                  Explore Rubix CLI
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Agentic Mesh Section */}
      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="mb-16 text-center">
            <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Platform Features
            </span>
            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
              The <span className="italic text-[var(--blue)]">anatomy</span> of autonomy.
            </h2>
            <p className="mx-auto max-w-2xl font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
              Discover the key capabilities that make RubixKube the most intelligent infrastructure management platform available.
            </p>
          </div>
          {/* Bento zigzag: row1 [2|1], row2 [1|2], row3 [2|1] */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {platformFeatures.map((feature, i) => {
              const Icon = feature.icon
              // Spans: [2,1, 1,2, 2,1] — wide alternates sides each row
              const spans = [2, 1, 1, 2, 2, 1]
              const span = spans[i] ?? 1
              const spanClass = span === 2 ? 'md:col-span-2' : 'md:col-span-1'

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className={`${spanClass} flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10 transition-shadow hover:shadow-md`}
                >
                  <div className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)]/10">
                    <Icon className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-4 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]" style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                    {feature.title}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60">
                    {feature.copy}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Day One Integrations Section */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="mb-16 text-center">
            <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Integrations
            </span>
            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
              Day one <span className="italic text-[var(--blue)]">compatibility.</span>
            </h2>
            <p className="mx-auto max-w-2xl font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
              RubixKube plugs directly into your existing stack. No new agents to deploy, no new dashboards to build. It reads what you already have.
            </p>
          </div>

          <div className="w-full">
            <BrainIntegrationStrip hideHeader />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ClosingCTA
        headline="See the architecture in action"
        subline="Book a walkthrough of the platform."
      />

      <Footer />
    </>
  )
}
