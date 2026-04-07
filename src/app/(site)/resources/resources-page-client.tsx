'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'
import { rkMono9, rkMono10, rkMono13 } from '@/lib/landing-responsive-type'
import {
  BookOpen,
  FileText,
  BarChart3,
  Calendar,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Terminal,
} from 'lucide-react'
import type { ReferenceGuideListItem } from './types'

const documentationCategories = [
  {
    title: 'Getting Started',
    copy: 'Sign up, install locally or on cloud, connect clusters, and complete your first 15 minutes',
    icon: BookOpen,
    link: 'https://docs.rubixkube.ai/getting-started/introduction',
    guides: [
      { title: 'Installation with KIND', link: 'https://docs.rubixkube.ai/getting-started/installation-kind' },
      { title: 'Cloud Installation', link: 'https://docs.rubixkube.ai/getting-started/installation-cloud' },
      { title: 'First Steps Tutorial', link: 'https://docs.rubixkube.ai/tutorials/first-steps' },
      { title: 'Sign Up & Login', link: 'https://docs.rubixkube.ai/getting-started/sign-up' },
    ],
  },
  {
    title: 'Using the Platform',
    copy: 'Dashboard, Insights & RCA, Chat Interface, Agents, Clusters, and Integrations',
    icon: BarChart3,
    link: 'https://docs.rubixkube.ai/using/dashboard',
    guides: [
      { title: 'Dashboard Overview', link: 'https://docs.rubixkube.ai/using/dashboard' },
      { title: 'Insights & RCA', link: 'https://docs.rubixkube.ai/using/insights' },
      { title: 'Chat Basics', link: 'https://docs.rubixkube.ai/tutorials/chat-basics' },
      { title: 'Managing Agents', link: 'https://docs.rubixkube.ai/using/agents' },
      { title: 'Connect Clusters', link: 'https://docs.rubixkube.ai/using/clusters' },
      { title: 'Integrations', link: 'https://docs.rubixkube.ai/using/integrations' },
    ],
  },
  {
    title: 'Rubix CLI',
    copy: 'The same SRI chat experience in your terminal. Install from npm, sign in once in the browser, then run rubix.',
    icon: Terminal,
    link: 'https://www.npmjs.com/package/@rubixkube/rubix',
    linkLabel: 'View on npm',
    guides: [
      { title: 'Package & README', link: 'https://www.npmjs.com/package/@rubixkube/rubix' },
      { title: 'Source on GitHub', link: 'https://github.com/rubixkube-io/rubix-cli' },
    ],
  },
]

const blogCategories = [
  { title: 'Infrastructure Reliability', copy: 'Latest insights on maintaining reliable infrastructure at scale' },
  { title: 'AI Operations', copy: 'How AI is transforming operations and incident response' },
  { title: 'Industry Insights', copy: 'Trends and best practices from the SRE community' },
  { title: 'Product Updates', copy: 'New features and improvements to RubixKube' },
  { title: 'Best Practices', copy: 'Proven strategies for infrastructure reliability' },
]

const caseStudies = [
  {
    title: 'OOMKilled Detection & Auto-Remediation',
    copy: "See how RubixKube's Agent Mesh detects memory issues, performs RCA in 30 seconds, and suggests optimal resource allocation.",
    status: 'Tutorial Available',
    metrics: ['30-90s RCA analysis', 'Automated evidence gathering', 'Memory optimization suggestions'],
    link: 'https://docs.rubixkube.ai/tutorials/rubixkube-in-action',
  },
  {
    title: 'Multi-Incident Analysis Dashboard',
    copy: 'Real dashboard showing CrashLoop, ImagePullBackOff, and PodPending incidents with 75% RCA coverage and intelligent prioritization.',
    status: 'Live Demo',
    metrics: ['75% RCA coverage', 'Real-time detection', 'Intelligent prioritization'],
    link: 'https://docs.rubixkube.ai/using/insights',
  },
  {
    title: 'Cost Optimization with AI',
    copy: 'Chat-based resource analysis identifying over-provisioned nginx containers and automated VPA recommendations.',
    status: 'Tutorial Available',
    metrics: ['10x resource optimization', 'Automated right-sizing', 'Cost analysis via chat'],
    link: 'https://docs.rubixkube.ai/tutorials/chat-cost-analysis',
  },
]

const handsonTutorials = [
  {
    title: 'Break Things, Watch RubixKube Fix Them',
    copy: 'Guided experiments with OOMKilled, CrashLoop, and ImagePullBackOff incidents - see real RCA in action',
    icon: Calendar,
    link: 'https://docs.rubixkube.ai/tutorials/rubixkube-in-action',
  },
  {
    title: 'Chat with Your Infrastructure',
    copy: 'Master the conversational interface - from basic queries to advanced troubleshooting and cost analysis',
    icon: Calendar,
    link: 'https://docs.rubixkube.ai/tutorials/chat-basics',
  },
  {
    title: 'Agent Mesh Deep Dive',
    copy: 'Understand how 6 specialized AI agents collaborate - Observer, RCA Pipeline, Memory, SRI, Remediation, and Guardian',
    icon: Calendar,
    link: 'https://docs.rubixkube.ai/concepts/agent-mesh',
  },
]

const supportResources = [
  {
    title: 'Troubleshooting Guide',
    copy: 'Step-by-step fixes for common issues across Dashboard, Insights, Agents, and platform components',
    icon: Lightbulb,
    link: 'https://docs.rubixkube.ai/support/troubleshooting',
  },
  {
    title: 'Frequently Asked Questions',
    copy: 'Quick answers to common questions about setup, RCA, agents, guardrails, and platform usage',
    icon: TrendingUp,
    link: 'https://docs.rubixkube.ai/support/faq',
  },
  {
    title: 'Beta Disclaimers & Limitations',
    copy: 'Important information about current capabilities, known limitations, and what\'s coming next',
    icon: Calendar,
    link: 'https://docs.rubixkube.ai/getting-started/disclaimers',
  },
]

const LEARN_CARD_COPY =
  'Site Reliability Intelligence, Agent Mesh, Memory Engine, and safety guardrails — long-form reads on this site.'

export function ResourcesPageClient({ guides }: { guides: ReferenceGuideListItem[] }) {
  const prefersReducedMotion = useReducedMotion()
  const learnGuidesSorted = useMemo(
    () =>
      [...guides].sort((a, b) => {
        const c = (a.category || '').localeCompare(b.category || '')
        return c !== 0 ? c : a.title.localeCompare(b.title)
      }),
    [guides],
  )

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[var(--bg)]">
        <div className="rk-landing-max px-[var(--pad)] pt-[calc(var(--nav-stack)+5rem)] pb-20 sm:pb-28 text-center">
          <motion.div
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            className="flex flex-col items-center"
          >
            <span
              className={cn(
                'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase mb-10',
                rkMono10,
              )}
            >
              Resources
            </span>

            <h1 className="rk-landing-h2-std font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)] w-full max-w-none">
              Docs, guides, and <span className="italic text-[var(--blue)]">deep dives.</span>
            </h1>

            <p
              className={cn(
                'font-[family-name:var(--font-mono)] font-light leading-[1.75] text-[var(--mid)] w-full max-w-3xl mt-10',
                rkMono13,
              )}
            >
              Get started in under 10 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Button asChild variant="primary">
                <Link href="https://console.rubixkube.ai" target="_blank" rel="noopener noreferrer">
                  Start Free
                </Link>
              </Button>
              <Button asChild variant="outline" className={outlineBlueAccentMd}>
                <Link href="https://docs.rubixkube.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 flex-shrink-0" />
                  Read the Docs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation */}
      <section id="resources" className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32 scroll-mt-20">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            className="mb-16"
          >
            <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase', rkMono10)}>
              Documentation
            </span>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-4">
              Get up and <span className="italic text-[var(--blue)]">running.</span>
            </h2>
            <p className={cn('font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)] mt-4 max-w-[60ch]', rkMono13)}>
              Get started with RubixKube and master advanced features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {documentationCategories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.title}
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: i * 0.08 } })}
                  className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10 transition-shadow hover:shadow-md"
                >
                  <div className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)]/10">
                    <Icon className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="mb-4 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                  >
                    {cat.title}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60 mb-5">
                    {cat.copy}
                  </p>

                  <div className="space-y-1.5 mb-5 flex-1">
                    {cat.guides.slice(0, 3).map((guide) => (
                      <Link
                        key={guide.title}
                        href={guide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)] hover:text-[var(--blue)] transition-colors border-l border-[var(--rule)] hover:border-[var(--blue)] pl-3 py-0.5"
                      >
                        {guide.title}
                      </Link>
                    ))}
                    {cat.guides.length > 3 && (
                      <span className="block font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)]/50 pl-3">
                        +{cat.guides.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="border-t border-[var(--rule)] pt-4 mt-auto">
                    <Link
                      href={cat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--blue)] hover:underline group"
                    >
                      {'linkLabel' in cat && cat.linkLabel ? cat.linkLabel : 'View Documentation'}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}

            {/* Learn — replaces Core Concepts; lists on-site reference pages from Sanity */}
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.24 } })}
              className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10 transition-shadow hover:shadow-md"
            >
              <div className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)]/10">
                <FileText className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />
              </div>
              <h3
                className="mb-4 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
              >
                Learn
              </h3>
              <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60 mb-5">
                {LEARN_CARD_COPY}
              </p>

              <div className="space-y-1.5 mb-5 flex-1">
                {learnGuidesSorted.length > 0 ? (
                  learnGuidesSorted.map((item) => (
                    <Link
                      key={`${item.category}-${item.slug}`}
                      href={`/${item.category}/${item.slug}`}
                      className="block font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)] hover:text-[var(--blue)] transition-colors border-l border-[var(--rule)] hover:border-[var(--blue)] pl-3 py-0.5"
                    >
                      {item.title}
                    </Link>
                  ))
                ) : (
                  <span className="block font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)]/50 pl-3 border-l border-[var(--rule)]">
                    New articles appear here when published.
                  </span>
                )}
              </div>

              <div className="border-t border-[var(--rule)] pt-4 mt-auto">
                <Link
                  href="https://docs.rubixkube.ai/concepts/what-is-sri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--blue)] hover:underline group"
                >
                  View Documentation
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog & Case Studies */}
      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[80px]">
            {/* Blog */}
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            >
              <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase', rkMono10)}>
                Blog
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-4 mb-3">
                Blog &amp; <span className="italic text-[var(--blue)]">Insights.</span>
              </h2>
              <p className={cn('font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)] mb-8', rkMono13)}>
                Stay updated with the latest in infrastructure reliability, AI operations, and industry trends.
              </p>

              <div className="space-y-0">
                {blogCategories.map((category, idx) => (
                  <Link
                    key={idx}
                    href={`/blog?category=${encodeURIComponent(category.title)}`}
                    className="block"
                  >
                    <div
                      className={cn(
                        'flex items-center justify-between py-4 group',
                        idx !== 0 && 'border-t border-[var(--rule)]',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Lightbulb className="w-4 h-4 text-[var(--blue)] shrink-0" />
                        <span
                          className={cn('font-[family-name:var(--font-mono)] font-light text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors', rkMono13)}
                          style={{ fontWeight: 500 }}
                        >
                          {category.title}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--mid)] group-hover:text-[var(--blue)] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Button variant="outline" asChild className="group">
                  <Link href="/blog" className="flex items-center gap-2">
                    View All Posts
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Tutorials & demos */}
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.1 } })}
            >
              <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase', rkMono10)}>
                Tutorials
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-4 mb-3">
                Tutorials &amp; <span className="italic text-[var(--blue)]">Demos.</span>
              </h2>
              <p className={cn('font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)] mb-8', rkMono13)}>
                Real platform demonstrations showing RubixKube&apos;s Agent Mesh detecting, analyzing, and resolving infrastructure incidents.
              </p>

              <div className="space-y-6">
                {caseStudies.map((study, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariants}
                    {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: idx * 0.08 } })}
                    className="rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-8 transition-shadow hover:shadow-md group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3
                        className="text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                        style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                      >
                        {study.title}
                      </h3>
                      <span
                        className={cn(
                          'shrink-0 ml-3 font-[family-name:var(--font-mono)] tracking-[0.1em] uppercase',
                          rkMono9,
                          study.status === 'Tutorial Available' || study.status === 'Live Demo'
                            ? 'text-[var(--green)]'
                            : 'text-[var(--mid)]',
                        )}
                      >
                        {study.status}
                      </span>
                    </div>
                    <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60 mb-4">
                      {study.copy}
                    </p>
                    <div className="space-y-1.5 mb-4">
                      {study.metrics.map((metric, metricIdx) => (
                        <div key={metricIdx} className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-[var(--blue)] shrink-0" />
                          <span className="font-[family-name:var(--font-mono)] text-[14px] text-[var(--ink)]" style={{ fontWeight: 500 }}>
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>
                    {study.link && (
                      <div className="border-t border-[var(--rule)] pt-4">
                        <Link
                          href={study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--blue)] hover:underline group/link"
                        >
                          View Tutorial
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hands-on Tutorials */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            className="mb-16"
          >
            <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase', rkMono10)}>
              Tutorials
            </span>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-4">
              Hands-on <span className="italic text-[var(--blue)]">learning.</span>
            </h2>
            <p className={cn('font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)] mt-4 max-w-[60ch]', rkMono13)}>
              Interactive learning experiences: break things, fix them, and master the platform with guided experiments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {handsonTutorials.map((tut, i) => {
              const Icon = tut.icon
              return (
                <motion.div
                  key={tut.title}
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: i * 0.08 } })}
                  className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10 transition-shadow hover:shadow-md"
                >
                  <div className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)]/10">
                    <Icon className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="mb-4 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                  >
                    {tut.title}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60 mb-5 flex-1">
                    {tut.copy}
                  </p>
                  <div className="border-t border-[var(--rule)] pt-4 mt-auto">
                    <Link
                      href={tut.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--blue)] hover:underline group"
                    >
                      Start Tutorial
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Support & Help */}
      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            className="mb-16"
          >
            <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase', rkMono10)}>
              Support
            </span>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-4">
              Help &amp; <span className="italic text-[var(--blue)]">support.</span>
            </h2>
            <p className={cn('font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)] mt-4 max-w-[60ch]', rkMono13)}>
              Get help quickly with troubleshooting guides, FAQs, and platform documentation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportResources.map((res, i) => {
              const Icon = res.icon
              return (
                <motion.div
                  key={res.title}
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: i * 0.08 } })}
                  className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10 transition-shadow hover:shadow-md"
                >
                  <div className="mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)]/10">
                    <Icon className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="mb-4 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                  >
                    {res.title}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60 mb-5 flex-1">
                    {res.copy}
                  </p>
                  <div className="border-t border-[var(--rule)] pt-4 mt-auto">
                    <Link
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--blue)] hover:underline group"
                    >
                      Get Help
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <ClosingCTA
        headline="Ready to deploy?"
        subline="Start with the quickstart guide."
      />
      <Footer />
    </>
  )
}
