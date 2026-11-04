'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, BookOpen, Cable, LayoutList, Terminal } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { ReferenceCard } from '@/components/reference-card'
import { siteLink, siteLinkArrow } from '@/lib/site-ui'
import { USE_CASES } from '@/data/solutions'
import { compareGroups, compareToolName } from '@/lib/reference-nav'
import type { ReferenceGuideListItem } from './types'

const DOCS = 'https://docs.rubixkube.ai'

/** The docs, in the order someone new meets them */
const DOC_CARDS = [
  {
    title: 'Get started',
    copy: 'Sign up, connect your first environment and read your first incident.',
    icon: BookOpen,
    links: [
      { title: 'Overview', href: `${DOCS}/getting-started/overview` },
      { title: 'Connect your environment', href: `${DOCS}/getting-started/connect-your-environment` },
      { title: 'Your first incident', href: `${DOCS}/tutorials/first-incident` },
    ],
  },
  {
    title: 'Use RubixKube',
    copy: 'Incidents, RCAs, Tasks, and how much Rubix may do on its own.',
    icon: LayoutList,
    links: [
      { title: 'Incidents', href: `${DOCS}/using/incidents` },
      { title: 'Reading an RCA', href: `${DOCS}/using/rca-reports` },
      { title: 'Tasks', href: `${DOCS}/using/tasks` },
      { title: 'Modes', href: `${DOCS}/using/modes` },
    ],
  },
  {
    title: 'Connect your stack',
    copy: 'Clusters, clouds, machines and the tools you already use.',
    icon: Cable,
    links: [
      { title: 'Kubernetes', href: `${DOCS}/environments/kubernetes` },
      { title: 'AWS', href: `${DOCS}/environments/aws` },
      { title: 'Machines', href: `${DOCS}/environments/vm` },
      { title: 'Integrations', href: `${DOCS}/integrations/catalog` },
    ],
  },
  {
    title: 'Rubix CLI',
    copy: 'Chat with Rubix, browse incidents and script it from your terminal.',
    icon: Terminal,
    links: [
      { title: 'Overview', href: `${DOCS}/cli/overview` },
      { title: 'Browse', href: `${DOCS}/cli/browse` },
      { title: 'Commands', href: `${DOCS}/cli/commands` },
    ],
  },
]

const HELP = [
  { title: 'FAQ', href: `${DOCS}/support/faq` },
  { title: 'Troubleshooting', href: `${DOCS}/support/troubleshooting` },
  { title: "What's new", href: `${DOCS}/getting-started/whats-new` },
  { title: 'Status', href: '/status' },
  { title: 'Community Slack', href: 'https://join.slack.com/t/rubixkubecommunity/shared_invite/zt-3fq7kiu8k-RC5uzLY6BjQFE5Uq_NziEA' },
  { title: 'Contact', href: '/contact' },
]

/** A blog post as the server hands it over: the cover already sized */
export type ResourcePost = { title: string; href: string; excerpt: string; date: string; image: string }

const mono = 'font-[family-name:var(--font-mono)] text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase'
const heading = 'rk-section-title m-0 mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] text-[var(--ink)]'
const card = 'flex flex-col rounded-2xl bg-[var(--panel)] p-8 ring-1 ring-[var(--rule)]'
const listLink =
  'block border-l border-[var(--rule)] py-0.5 pl-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]'
const isExternal = (href: string) => href.startsWith('http')

function Section({
  label,
  title,
  line,
  more,
  children,
}: {
  label: string
  title: string
  line?: string
  more?: { title: string; href: string }
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-[var(--rule)] px-[var(--pad)] py-20 sm:py-28">
      <div className="rk-landing-max">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`${mono} m-0`}>{label}</p>
            <h2 className={heading}>{title}</h2>
            {line && <p className="rk-section-body m-0 mt-4 max-w-[60ch] text-[var(--mid)]">{line}</p>}
          </div>
          {more && (
            <Go href={more.href} className={`${siteLink} shrink-0`}>
              {more.title}
              {isExternal(more.href) ? <ArrowUpRight className={siteLinkArrow} aria-hidden /> : <ArrowRight className={siteLinkArrow} aria-hidden />}
            </Go>
          )}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

function Go({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

/**
 * Resources: the docs, then a few of each kind of page on the site (learn, compare, use cases),
 * each with a link to all of them, then the blog and where to get help.
 */
export function ResourcesPageClient({ guides, posts }: { guides: ReferenceGuideListItem[]; posts: ResourcePost[] }) {
  const { learn, compare, useCases } = useMemo(() => {
    const byTitle = new Map(guides.filter((g) => g.category === 'use-case').map((g) => [g.title.toLowerCase(), g]))
    return {
      learn: guides.filter((g) => ['learn', 'glossary', 'guide', 'tools'].includes(g.category)),
      compare: compareGroups(guides),
      // the first use cases in their set order, the ones with a page of their own
      useCases: USE_CASES.flatMap((u) => byTitle.get(u.title.toLowerCase()) ?? []).slice(0, 4),
    }
  }, [guides])

  return (
    <>
      <Navbar />
      <PageHero title="Resources." lede="Docs, guides and comparisons for running production with an AI SRE." />

      <main className="bg-[var(--bg)]">
        <Section label="Documentation" title="Get up and running." more={{ title: 'All docs', href: DOCS }}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {DOC_CARDS.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.title} className={card}>
                  <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg)] ring-1 ring-[var(--rule)]">
                    <Icon className="h-5 w-5 text-[var(--ink)]" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="rk-section-title m-0 mb-3 text-[1.2rem] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">{c.title}</h3>
                  <p className="rk-section-body m-0 mb-5 text-[15px] text-[var(--mid)]">{c.copy}</p>
                  <div className="mt-auto space-y-1.5">
                    {c.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={listLink}>
                        {l.title}
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Section>

        {learn.length > 0 && (
          <Section label="Learn" title="The ideas behind it.">
            <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {learn.slice(0, 3).map((p, i) => (
                <li key={p.slug} className="m-0 p-0">
                  <ReferenceCard page={p} index={i} />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {compare.lead && (
          <Section label="Compare" title="Compare AI SRE tools." more={{ title: 'All comparisons', href: '/compare' }}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <ReferenceCard page={compare.lead} wide index={3} />
              </div>
              <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:col-span-6">
                {compare.alternatives.slice(0, 2).map((p, i) => (
                  <li key={p.slug} className="m-0 p-0">
                    <ReferenceCard page={p} index={i + 4} />
                  </li>
                ))}
              </ul>
            </div>
            {compare.versus.length > 0 && (
              <div className="mt-14 border-t border-[var(--rule)] pt-8">
                <p className={`${mono} m-0`}>RubixKube vs</p>
                <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
                  {compare.versus.map((p) => (
                    <li key={p.slug} className="m-0 p-0">
                      <Link
                        href={`/${p.category}/${p.slug}`}
                        className="inline-flex h-9 items-center rounded-md bg-[var(--panel)] px-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--ink)] ring-1 ring-[var(--rule)] transition-colors hover:ring-[var(--ink)]"
                      >
                        {compareToolName(p)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        )}

        {useCases.length > 0 && (
          <Section label="Use cases" title="What teams use it for." more={{ title: 'All use cases', href: '/solutions?type=use-case' }}>
            <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((p, i) => (
                <li key={p.slug} className="m-0 p-0">
                  <ReferenceCard page={p} index={i} />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {posts.length > 0 && (
          <Section label="Blog" title="From the blog." more={{ title: 'All posts', href: '/blog' }}>
            <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.href} className="m-0 p-0">
                  <Link href={p.href} className="group block">
                    {p.date && <span className="block font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)]">{p.date}</span>}
                    <span className="relative mt-3 block aspect-[4/3] overflow-hidden rounded-xl bg-[var(--panel)] ring-1 ring-[var(--rule)]">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </span>
                    <span className="mt-4 block font-[family-name:var(--font-figtree)] text-[17px] leading-[1.3] font-semibold tracking-[-0.01em] text-balance text-[var(--ink)]">
                      {p.title}
                    </span>
                    {p.excerpt && <span className="rk-section-body mt-2 line-clamp-3 block text-[15px] text-[var(--mid)]">{p.excerpt}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section label="Help" title="Get help.">
          <ul className="m-0 grid list-none grid-cols-2 gap-x-6 p-0 sm:grid-cols-3 lg:grid-cols-6">
            {HELP.map((h) => (
              <li key={h.title} className="m-0 border-t border-[var(--rule)] p-0">
                <Go
                  href={h.href}
                  className="group flex items-center gap-1.5 py-4 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]"
                >
                  {h.title}
                  {isExternal(h.href) ? (
                    <ArrowUpRight className="h-4 w-4 text-[var(--mid)] group-hover:text-[var(--ink)]" aria-hidden />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-[var(--mid)] group-hover:text-[var(--ink)]" aria-hidden />
                  )}
                </Go>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <ClosingCTA />
      <Footer />
    </>
  )
}
