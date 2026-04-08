'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { Button } from '@/components/ui/button'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { fadeUpVariants } from '@/lib/animations'
import {
  RefreshCw,
  ShieldCheck,
  GitMerge,
  TrendingUp,
  Eye,
  Microscope,
  Zap,
  Cloud,
  Shield,
  Users,
  Layers,
} from 'lucide-react'
import Link from 'next/link'

export function SolutionsPageClient() {
  // Bento spans: [2, 1, 1, 2] — row 1 is wide|narrow, row 2 is narrow|wide
  const useCases = [
    {
      title: 'Self-healing infrastructure.',
      copy: 'Imagine a system that doesn\'t just alert you to problems, but fixes them on its own, correlating signals, pinpointing the root cause, and applying safe fixes.',
      icon: RefreshCw,
      span: 2,
    },
    {
      title: 'Prevention over panic.',
      copy: 'RubixKube learns from every past incident, allowing it to predict and stop repeat failures before they can cascade and cause damage.',
      icon: ShieldCheck,
      span: 1,
    },
    {
      title: 'Proactive guardrails for every launch.',
      copy: 'RubixKube validates deployments and automatically rolls back at the first sign of risk, transforming a moment of potential crisis into a seamless, automated recovery.',
      icon: GitMerge,
      span: 1,
    },
    {
      title: 'Capacity without chaos.',
      copy: 'RubixKube turns reactive scaling into proactive intelligence. The system continuously optimizes resources, ensuring your infrastructure is always ready for demand and preventing bottlenecks before they even form.',
      icon: TrendingUp,
      span: 2,
    },
  ]

  const industries = [
    {
      title: 'E-commerce & Retail',
      copy: 'Keep your online store running 24/7. Prevent revenue loss from downtime and ensure smooth customer experiences.',
      icon: Cloud,
      challenges: ['High traffic spikes', 'Payment processing reliability', 'Inventory system uptime'],
    },
    {
      title: 'Financial Services',
      copy: 'Meet strict compliance requirements while maintaining system reliability. AI agents ensure your financial systems are always available.',
      icon: Shield,
      challenges: ['Regulatory compliance', 'Transaction processing', 'Data security'],
    },
    {
      title: 'Healthcare & Life Sciences',
      copy: 'Ensure critical healthcare systems remain operational. AI agents monitor and maintain the infrastructure that supports patient care.',
      icon: Users,
      challenges: ['Patient data systems', 'Medical device connectivity', 'Emergency response systems'],
    },
    {
      title: 'Technology & SaaS',
      copy: 'Scale your platform with confidence. AI agents handle the complexity of modern cloud-native architectures.',
      icon: Layers,
      challenges: ['Microservices complexity', 'Multi-cloud management', 'API reliability'],
    },
  ]

  const steps = [
    {
      number: '01',
      label: 'Observe',
      icon: Eye,
      description:
        'Continuous, low-latency telemetry across every layer of your stack (metrics, logs, events, topology), stitched into a live knowledge graph.',
    },
    {
      number: '02',
      label: 'Diagnose',
      icon: Microscope,
      description:
        'AI agents correlate signals, traverse the graph, and surface root cause (not just the symptom) in seconds, not hours.',
    },
    {
      number: '03',
      label: 'Act',
      icon: Zap,
      description:
        'Safe, explainable remediation with human-in-the-loop controls. Agents execute, rollback, or escalate based on confidence and policy.',
    },
  ]

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section id="overview" className="relative bg-[var(--bg)] pb-0 scroll-mt-[var(--nav-stack)]">
        <div className="rk-landing-max relative z-10 w-full px-[var(--pad)] pt-[calc(var(--nav-stack)+5rem)] pb-20 text-center">
          <motion.div
            className="mx-auto max-w-4xl"
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpVariants}>
              <span className="mb-8 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Solutions
              </span>
            </motion.div>

            <motion.h1
              className="mb-8 font-[family-name:var(--font-serif)] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]"
              variants={fadeUpVariants}
            >
              Solve Real{' '}
              <span className="italic text-[var(--blue)]">Infrastructure Challenges</span>
            </motion.h1>

            <motion.p
              className="mx-auto max-w-[55ch] font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]"
              variants={fadeUpVariants}
            >
              From reactive firefighting to autonomous, self-healing operations.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Button asChild variant="primary">
                <Link href="https://console.rubixkube.ai" target="_blank" rel="noopener noreferrer">
                  Start Free
                </Link>
              </Button>
              <Button asChild variant="outline" className={outlineBlueAccentMd}>
                <Link href="https://calendly.com/rubixkube-ai/30min" target="_blank" rel="noopener noreferrer">
                  Talk to Sales
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases — bento grid */}
      <section
        id="use-cases"
        className="scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32"
      >
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Use Cases
            </span>
            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
              The reliability layer for the{' '}
              <span className="italic text-[var(--blue)]">AI era.</span>
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
              Transform your operations with intelligent automation and proactive monitoring.
            </p>
          </motion.div>

          {/* Bento: grid-cols-3, spans [2,1,1,2] */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {useCases.map((uc, i) => {
              const Icon = uc.icon
              const spanClass = uc.span === 2 ? 'md:col-span-2' : 'md:col-span-1'
              return (
                <motion.div
                  key={uc.title}
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
                  <h3
                    className="mb-4 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                  >
                    {uc.title}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60">
                    {uc.copy}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section
        id="industries"
        className="scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32"
      >
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Industries
            </span>
            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
              Industries powered by{' '}
              <span className="italic text-[var(--blue)]">SRI.</span>
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
              AWS, GCP, Kubernetes, or even VMs. RubixKube connects where your production actually runs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {industries.map((industry, i) => {
              const Icon = industry.icon
              return (
                <motion.div
                  key={industry.title}
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10 transition-shadow hover:shadow-md"
                >
                  <div className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)]/10">
                    <Icon className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="mb-4 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                  >
                    {industry.title}
                  </h3>
                  <p className="mb-6 font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60">
                    {industry.copy}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {industry.challenges.map((challenge) => (
                      <li
                        key={challenge}
                        className="font-[family-name:var(--font-mono)] text-[12px] font-light tracking-[0.03em] text-[var(--mid)]"
                      >
                        · {challenge}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works — Observe → Diagnose → Act */}
      <section
        id="how-it-works"
        className="scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32"
      >
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              How It Works
            </span>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
              Three steps to{' '}
              <span className="italic text-[var(--blue)]">autonomous.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 divide-y divide-[var(--rule)] md:grid-cols-3 md:divide-x md:divide-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.label}
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="flex flex-col gap-6 px-0 py-12 md:px-10 md:py-0 first:md:pl-0 last:md:pr-0"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.15em] text-[var(--mid)] uppercase pt-1">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)]/10">
                      <Icon className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="mb-3 text-[18px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                      style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                    >
                      {step.label}
                    </h3>
                    <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <ClosingCTA
        headline="See RubixKube solve your use case"
        subline="Book a 30-minute demo."
      />
      <Footer />
    </>
  )
}
