'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { FeaturedFilm } from '@/components/featured-film'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { type } from '@/lib/type-scale'
import { HeroLink } from '@/components/hero-link'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { Backdrop, Float } from '@/components/console-shot'
import Image from 'next/image'
import { latestAfterHoursChallenge } from '@/data/after-hours'
import type { HomeStory } from '@/lib/landing-featured-content'

const CONSOLE_URL = 'https://console.rubixkube.ai'
const DEMO_URL = 'https://calendly.com/rubixkube-ai/30min'
const KEPLER_URL = 'https://trykepler.rubixkube.ai'
const DOCS_URL = 'https://docs.rubixkube.ai'



function TwoTone({ lead, rest, className, dark = false }: { lead: string; rest: string; className: string; dark?: boolean }) {
  return (
    <p className={className}>
      <span className={`font-normal ${dark ? 'text-[#f4f2ec]' : 'text-[var(--ink)]'}`}>{lead}</span>{' '}
      <span className={`font-light ${dark ? 'text-white/55' : 'text-[var(--mid)]'}`}>{rest}</span>
    </p>
  )
}


/* ───────────────────────── featured ───────────────────────── */

function Featured() {
  return (
    <section className="px-[var(--pad)]">
      <div className="rk-landing-max">
        <FeaturedFilm />
      </div>
    </section>
  )
}

/* ───────────────────────── products ───────────────────────── */

type ProductRow = { label: string; value: string; href: string; external?: boolean }

const PRODUCTS: {
  name: string
  lead: string
  rest: string
  image: ReactNode
  rows: ProductRow[]
  cta: { label: string; href: string; external?: boolean }
}[] = [
  {
    name: 'RubixKube',
    lead: 'RubixKube.',
    rest: 'Watches your infrastructure when nobody is there. Every incident ends with a cause and a fix.',
    image: (
      <Backdrop className="h-full rounded-none border-0">
        <Float
          name="part-investigating"
          w={1520}
          h={770}
          width={0.9}
          left={5}
          top={12}
          alt="Rubix investigating an incident: checking orders-db connections, 497 of 500 in use"
        />
      </Backdrop>
    ),
    rows: [
      { label: 'Get started', value: 'Free', href: CONSOLE_URL, external: true },
      { label: 'Documentation', value: 'Docs', href: DOCS_URL, external: true },
    ],
    cta: { label: 'Explore the platform', href: '/platform' },
  },
  {
    name: 'Kepler',
    lead: 'Kepler.',
    rest: 'A new way of thinking about operations: the SRE IDE that sits with the engineer on call.',
    image: <Image src="/screenshots/kepler.png" alt="Kepler, the SRE IDE by RubixKube" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />,
    rows: [
      { label: 'Download', value: 'macOS, Windows, Linux', href: KEPLER_URL, external: true },
      { label: 'Why we built it', value: 'Essay', href: '/blog/kepler-a-tool-for-the-operator' },
    ],
    cta: { label: 'Try Kepler', href: KEPLER_URL, external: true },
  },
]

function MaybeExternal({ href, external, className, children }: { href: string; external?: boolean; className: string; children: ReactNode }) {
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function Products() {
  return (
    <section className="px-[var(--pad)] pt-6">
      <div className="rk-landing-max grid grid-cols-1 gap-4 md:grid-cols-2">
        {PRODUCTS.map((p) => (
          <article key={p.name} className="flex flex-col rounded-2xl bg-[var(--panel)] p-6 ring-1 ring-[var(--rule)] sm:p-7">
            <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg ring-1 ring-[var(--rule)]">{p.image}</div>
            <TwoTone className={type.statement} lead={p.lead} rest={p.rest} />
            <div className="mt-auto pt-10">
              {p.rows.map((r) => (
                <MaybeExternal
                  key={r.label}
                  href={r.href}
                  external={r.external}
                  className={`${type.small} group flex items-center justify-between border-t border-[var(--rule)] py-3 text-[var(--ink)]`}
                >
                  <span>{r.label}</span>
                  <span className="flex items-center gap-1.5 text-[var(--mid)] group-hover:text-[var(--ink)]">
                    {r.value}
                    {r.external ? <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} /> : <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />}
                  </span>
                </MaybeExternal>
              ))}
              <MaybeExternal
                href={p.cta.href}
                external={p.cta.external}
                className={`${type.small} mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-[var(--bg)] py-2.5 text-[var(--ink)] ring-1 ring-[var(--rule)] transition-colors hover:ring-[var(--blue)]/40 hover:text-[var(--blue)]`}
              >
                {p.cta.label}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </MaybeExternal>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ───────────────────────── beliefs ───────────────────────── */

/** What RubixKube and Kepler are built on, one essay each. */
const BELIEFS = [
  {
    slug: 'kepler-a-tool-for-the-operator',
    href: '/blog/kepler-a-tool-for-the-operator',
    belief: 'The operator is the last unserved user.',
    line: 'Every tool in operations serves the infrastructure or the organisation. None was built for the person holding the pager.',
    cta: 'Read the essay',
  },
  {
    slug: 'ai-for-operations-cant-live-in-one-repo',
    href: '/blog/ai-for-operations-cant-live-in-one-repo',
    belief: 'Operations needs a map, not a drill.',
    line: 'Coding agents know one repository deeply. Operators work across forty, and across time. The map is never finished.',
    cta: 'Read the essay',
  },
  {
    slug: 'mean-time-to-understand',
    href: '/glossary/mean-time-to-understand',
    belief: 'The bottleneck is understanding, not recovery.',
    line: 'Most of an incident is spent working out what broke and why. We measure that as MTTU, and we build to shorten it.',
    cta: 'What is MTTU',
  },
  {
    slug: 'ai-sre-tools-2026',
    href: '/compare/ai-sre-tools-2026',
    belief: 'Investigation should not start over every time.',
    line: 'Most AI SRE tools begin at the alert and reset after it. Reliability comes from a system that keeps learning in between.',
    cta: 'Compare AI SRE tools',
  },
] as const

function Beliefs({ covers }: { covers: Record<string, string> }) {
  return (
    <section className="px-[var(--pad)] pt-28 sm:pt-40">
      <div className="rk-landing-max">
        <TwoTone
          className={`${type.display} max-w-[44ch]`}
          lead="RubixKube watches your infrastructure when nobody is there. Kepler sits with the engineer when someone is."
          rest="Those are the two ends of an incident, and Rubix works in both."
        />
        {/* one belief per row, the image switching sides, so the page reads as an argument rather than a grid */}
        <div className="mt-16 flex flex-col gap-16 sm:gap-24">
          {BELIEFS.map((b, i) => (
            <Link key={b.slug} href={b.href} className="group grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--panel)] ring-1 ring-[var(--rule)] md:col-span-6 ${i % 2 ? 'md:order-2 md:col-start-7' : ''}`}
              >
                {covers[b.slug] && (
                  <Image
                    src={covers[b.slug]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <div className={`md:col-span-5 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-8'}`}>
                <TwoTone className={type.statement} lead={b.belief} rest={b.line} />
                <p className={`${type.small} mt-7 flex items-center gap-1.5 text-[var(--ink)] group-hover:text-[var(--blue)]`}>
                  {b.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── latest ───────────────────────── */

/** The current After Hours challenge, as one item among the latest. */
function afterHoursStory(): HomeStory {
  const c = latestAfterHoursChallenge()
  return {
    title: `After Hours ${c.id}: ${c.title}`,
    href: '/after-hours',
    tag: 'After Hours',
    date: new Date(c.launchedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
    sortKey: c.launchedAt,
    imageUrl: c.poster.src,
    imageAlt: c.poster.alt,
  }
}

/** Newest posts and podcast episodes from Sanity, with their own covers. Publishing one updates the page. */
function Latest({ stories }: { stories: HomeStory[] }) {
  const items = [...stories, afterHoursStory()].sort((a, b) => b.sortKey.localeCompare(a.sortKey)).slice(0, 4)
  return (
    <section className="px-[var(--pad)] pt-24 pb-28 sm:pt-32 sm:pb-36">
      <div className="rk-landing-max">
        <div className="grid grid-cols-1 gap-x-5 gap-y-12 border-t border-[var(--rule)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <Link key={p.href} href={p.href} className="group block">
              <div className="relative aspect-[8/5] overflow-hidden rounded-lg bg-[var(--panel)] ring-1 ring-[var(--rule)]">
                <Image
                  src={p.imageUrl}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className={`${type.statement} mt-4 text-[var(--ink)] group-hover:text-[var(--blue)]`}>{p.title}</h3>
              <p className={`${type.small} mt-2 text-[var(--mid)]`}>
                {p.tag} · {p.date}
              </p>
            </Link>
          ))}
        </div>
        <div className={`${type.small} mt-12 flex items-center gap-6 text-[var(--mid)]`}>
          <Link href="/blog" className="flex items-center gap-1.5 hover:text-[var(--ink)]">
            All posts
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
          <Link href="/podcast" className="flex items-center gap-1.5 hover:text-[var(--ink)]">
            Podcast
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── page ───────────────────────── */

export function HomePage({ stories, beliefCovers }: { stories: HomeStory[]; beliefCovers: Record<string, string> }) {
  return (
    <div className="bg-[var(--bg)]">
      <Navbar />

      <section className="px-[var(--pad)] pt-[calc(var(--nav-stack)+3.5rem)] pb-14 sm:pt-[calc(var(--nav-stack)+5rem)] sm:pb-20">
        <div className="rk-landing-max">
          <h1 className={type.display}>
            <span className="font-normal text-[var(--ink)]">
              RubixKube builds for{' '}
              <HeroLink href="/blog/kepler-a-tool-for-the-operator" accent>the people who keep production running</HeroLink>.
            </span>{' '}
            <span className="font-light text-[var(--mid)]">
              It{' '}
              <HeroLink href="/glossary/mean-time-to-understand">
                finds the cause
              </HeroLink>{' '}
              of every incident, opens the fix and{' '}
              <HeroLink href="/blog/aiops-auto-remediation-memory-failure">
                remembers what worked
              </HeroLink>
              .
            </span>
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild variant="primary">
              <a href={CONSOLE_URL} target="_blank" rel="noopener noreferrer">
                Start free
              </a>
            </Button>
            <CalendlyBooking url={DEMO_URL} variant="outline" className={outlineBlueAccentMd}>
              Book a demo
            </CalendlyBooking>
          </div>
        </div>
      </section>

      <Featured />
      <Products />
      <Beliefs covers={beliefCovers} />
      <Latest stories={stories} />

      <Footer />
    </div>
  )
}
