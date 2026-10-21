'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'
import { siteLink, siteLinkArrow } from '@/lib/site-ui'
import {
  BookOpen,
  FileText,
  BarChart3,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  Lightbulb,
  TrendingUp,
  Terminal,
} from 'lucide-react'
import type { ReferenceGuideListItem } from './types'
import { referenceGuideNavDisplayTitle } from '@/lib/reference-nav'

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

const eyebrow = 'font-[family-name:var(--font-mono)] text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase'

/** A card, as on the home page's products: panel paper with a hairline ring */
const card = 'flex flex-col rounded-2xl bg-[var(--panel)] p-8 ring-1 ring-[var(--rule)]'

const iconBox = 'mb-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--bg)] ring-1 ring-[var(--rule)]'

const cardTitle = 'rk-section-title m-0 mb-3 text-[1.2rem] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]'

/** A guide inside a card: a quiet Figtree link on a rule */
const guideLink =
  'block border-l border-[var(--rule)] py-0.5 pl-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]'

export function ResourcesPageClient({ guides }: { guides: ReferenceGuideListItem[] }) {
  const prefersReducedMotion = useReducedMotion()
  const learnGuidesSorted = useMemo(
    () =>
      [...guides].sort((a, b) => {
        const c = (a.category || '').localeCompare(b.category || '')
        return c !== 0 ? c : referenceGuideNavDisplayTitle(a).localeCompare(referenceGuideNavDisplayTitle(b))
      }),
    [guides],
  )

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[var(--bg)]">
        <PageHero
          title="Docs, guides, and deep dives."
          lede="Get started in under 10 minutes."
        />
      </section>

      {/* Documentation */}
      <section id="resources" className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32 scroll-mt-20">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            className="mb-16"
          >
            <span className={eyebrow}>
              Documentation
            </span>
            <h2 className="rk-section-title text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)] mt-4">
              Get up and <em>running.</em>
            </h2>
            <p className="rk-section-body m-0 mt-4 max-w-[60ch] text-[var(--mid)]">
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
                  className={card}
                >
                  <div className={iconBox}>
                    <Icon className="h-5 w-5 text-[var(--ink)]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className={cardTitle}
                  >
                    {cat.title}
                  </h3>
                  <p className="rk-section-body text-[15px] text-[var(--mid)] mb-5">
                    {cat.copy}
                  </p>

                  <div className="space-y-1.5 mb-5 flex-1">
                    {cat.guides.slice(0, 3).map((guide) => (
                      <Link
                        key={guide.title}
                        href={guide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={guideLink}
                      >
                        {guide.title}
                      </Link>
                    ))}
                    {cat.guides.length > 3 && (
                      <span className="block pl-3 font-[family-name:var(--font-mono)] text-[12px] text-[var(--mid)]">
                        +{cat.guides.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="border-t border-[var(--rule)] pt-4 mt-auto">
                    <Link
                      href={cat.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={siteLink}
                    >
                      {'linkLabel' in cat && cat.linkLabel ? cat.linkLabel : 'View Documentation'}
                      <ArrowUpRight className={siteLinkArrow} aria-hidden />
                    </Link>
                  </div>
                </motion.div>
              )
            })}

            {/* Learn — replaces Core Concepts; lists on-site reference pages from Sanity */}
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.24 } })}
              className={card}
            >
              <div className={iconBox}>
                <FileText className="h-5 w-5 text-[var(--ink)]" strokeWidth={1.5} />
              </div>
              <h3
                className={cardTitle}
              >
                Learn
              </h3>
              <p className="rk-section-body text-[15px] text-[var(--mid)] mb-5">
                {LEARN_CARD_COPY}
              </p>

              <div className="space-y-1.5 mb-5 flex-1">
                {learnGuidesSorted.length > 0 ? (
                  learnGuidesSorted.map((item) => (
                    <Link
                      key={`${item.category}-${item.slug}`}
                      href={`/${item.category}/${item.slug}`}
                      className={guideLink}
                    >
                      {referenceGuideNavDisplayTitle(item)}
                    </Link>
                  ))
                ) : (
                  <span className="block border-l border-[var(--rule)] pl-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)]">
                    New articles appear here when published.
                  </span>
                )}
              </div>

              <div className="border-t border-[var(--rule)] pt-4 mt-auto">
                <Link
                  href="https://docs.rubixkube.ai/concepts/what-is-sri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={siteLink}
                >
                  View Documentation
                  <ArrowUpRight className={siteLinkArrow} aria-hidden />
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
              <span className={eyebrow}>
                Blog
              </span>
              <h2 className="rk-section-title text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)] mt-4 mb-3">
                Blog &amp; <em>Insights.</em>
              </h2>
              <p className="rk-section-body m-0 mb-8 text-[var(--mid)]">
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
                        <Lightbulb className="w-4 h-4 text-[var(--mid)] shrink-0" strokeWidth={1.5} />
                        <span className="font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]">
                          {category.title}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--mid)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-all" aria-hidden />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/blog" className={siteLink}>
                  View All Posts
                  <ArrowRight className={siteLinkArrow} aria-hidden />
                </Link>
              </div>
            </motion.div>

            {/* Tutorials & demos */}
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.1 } })}
            >
              <span className={eyebrow}>
                Tutorials
              </span>
              <h2 className="rk-section-title text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)] mt-4 mb-3">
                Tutorials &amp; <em>Demos.</em>
              </h2>
              <p className="rk-section-body m-0 mb-8 text-[var(--mid)]">
                Real platform demonstrations showing RubixKube&apos;s Agent Mesh detecting, analyzing, and resolving infrastructure incidents.
              </p>

              <div className="space-y-6">
                {caseStudies.map((study, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariants}
                    {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: idx * 0.08 } })}
                    className="rounded-2xl bg-[var(--panel)] p-8 ring-1 ring-[var(--rule)]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="rk-section-title m-0 text-[1.2rem] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">
                        {study.title}
                      </h3>
                      <span
                        className={cn(
                          'shrink-0 ml-3 pt-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] uppercase',
                          study.status === 'Tutorial Available' || study.status === 'Live Demo'
                            ? 'text-[var(--green)]'
                            : 'text-[var(--mid)]',
                        )}
                      >
                        {study.status}
                      </span>
                    </div>
                    <p className="rk-section-body text-[15px] text-[var(--mid)] mb-4">
                      {study.copy}
                    </p>
                    <div className="space-y-1.5 mb-4">
                      {study.metrics.map((metric, metricIdx) => (
                        <div key={metricIdx} className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-[var(--ink)] shrink-0" />
                          <span className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink)]">
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
                          className={siteLink}
                        >
                          View Tutorial
                          <ArrowUpRight className={siteLinkArrow} aria-hidden />
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
            <span className={eyebrow}>
              Tutorials
            </span>
            <h2 className="rk-section-title text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)] mt-4">
              Hands-on <em>learning.</em>
            </h2>
            <p className="rk-section-body m-0 mt-4 max-w-[60ch] text-[var(--mid)]">
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
                  className={card}
                >
                  <div className={iconBox}>
                    <Icon className="h-5 w-5 text-[var(--ink)]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className={cardTitle}
                  >
                    {tut.title}
                  </h3>
                  <p className="rk-section-body text-[15px] text-[var(--mid)] mb-5 flex-1">
                    {tut.copy}
                  </p>
                  <div className="border-t border-[var(--rule)] pt-4 mt-auto">
                    <Link
                      href={tut.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={siteLink}
                    >
                      Start Tutorial
                      <ArrowUpRight className={siteLinkArrow} aria-hidden />
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
            <span className={eyebrow}>
              Support
            </span>
            <h2 className="rk-section-title text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)] mt-4">
              Help &amp; <em>support.</em>
            </h2>
            <p className="rk-section-body m-0 mt-4 max-w-[60ch] text-[var(--mid)]">
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
                  className={card}
                >
                  <div className={iconBox}>
                    <Icon className="h-5 w-5 text-[var(--ink)]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className={cardTitle}
                  >
                    {res.title}
                  </h3>
                  <p className="rk-section-body text-[15px] text-[var(--mid)] mb-5 flex-1">
                    {res.copy}
                  </p>
                  <div className="border-t border-[var(--rule)] pt-4 mt-auto">
                    <Link
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={siteLink}
                    >
                      Get Help
                      <ArrowUpRight className={siteLinkArrow} aria-hidden />
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
