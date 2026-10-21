'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Boxes, Hash, Search, Workflow } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { AbstractCover } from '@/components/solutions/abstract-cover'
import { SOLUTION_PRODUCTS, USE_CASES } from '@/data/solutions'

/** One entry in the gallery: a product, a use case, or a Sanity reference page */
export type SolutionEntry = {
  key: string
  category: string
  kind: string
  title: string
  summary: string
  href: string
  date?: string
  image?: string
}

const mono = 'font-[family-name:var(--font-mono)]'
const isExternal = (href: string) => href.startsWith('http')

/** The groups, in the order the category row and the topic menu show them */
const GROUPS = [
  { id: 'products', name: 'Products', icon: Boxes, line: 'What we build: the platform, on-call, the desktop IDE and the CLI.' },
  { id: 'use-case', name: 'Use cases', icon: Workflow, line: 'What teams use RubixKube for, from the first alert to the post-mortem.' },
  { id: 'case-study', name: 'Case studies', icon: BookOpen, line: 'How teams run RubixKube in production.' },
  { id: 'glossary', name: 'Glossary', icon: Hash, line: 'The terms we use, defined plainly.' },
] as const

/**
 * Where each entry sits in the gallery on wide screens. The pattern repeats every seven entries:
 * a wide one with a small one beside it, three small ones stepped down, then a small one and a
 * wide one, so the page reads like an editor laid it out rather than a grid.
 */
const SLOTS = [
  { col: 'lg:col-span-7', wide: true },
  { col: 'lg:col-span-4 lg:col-start-9 lg:pt-28', wide: false },
  { col: 'lg:col-span-4', wide: false },
  { col: 'lg:col-span-4 lg:col-start-5 lg:pt-20', wide: false },
  { col: 'lg:col-span-4 lg:col-start-9 lg:pt-8', wide: false },
  { col: 'lg:col-span-4 lg:pt-28', wide: false },
  { col: 'lg:col-span-7 lg:col-start-6', wide: true },
]

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

/** The products one at a time on a dark band: the words on the left, the product on the right */
function ProductBand() {
  const [at, setAt] = useState(0)
  const p = SOLUTION_PRODUCTS[at]
  const step = (d: number) => setAt((i) => (i + d + SOLUTION_PRODUCTS.length) % SOLUTION_PRODUCTS.length)
  const arrow =
    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[var(--film-ink)] ring-1 ring-[color-mix(in_oklab,var(--film-ink)_25%,transparent)] transition-colors hover:bg-[color-mix(in_oklab,var(--film-ink)_8%,transparent)]'
  return (
    <section id="products" aria-label="Products" className="scroll-mt-[var(--nav-stack)] px-[var(--pad)]">
      <div className="rk-landing-max grid grid-cols-1 overflow-hidden rounded-2xl bg-[var(--film-bg)] ring-1 ring-[var(--film-ring)] lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)]">
        <div className="flex flex-col px-7 py-12 sm:px-12 lg:py-16 lg:pr-12">
          <p className={`${mono} m-0 text-[12px] tracking-[0.12em] text-[color-mix(in_oklab,var(--film-ink)_55%,transparent)] uppercase`}>
            Products
          </p>
          <h2 className="rk-section-title mt-6 mb-0 text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.1] text-[var(--film-ink)]">{p.name}</h2>
          <p className="rk-section-body m-0 mt-4 max-w-[30em] text-[color-mix(in_oklab,var(--film-ink)_72%,transparent)]">{p.line}</p>
          <Go
            href={p.href}
            className="group mt-8 inline-flex items-center gap-1.5 self-start font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--film-ink)]"
          >
            {p.action}
            {isExternal(p.href) ? (
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            ) : (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            )}
          </Go>
          <div className="mt-12 flex items-center gap-5 lg:mt-auto lg:pt-12">
            <button type="button" onClick={() => step(-1)} aria-label="Previous product" className={arrow}>
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <span className={`${mono} text-[12px] tracking-[0.08em] text-[color-mix(in_oklab,var(--film-ink)_60%,transparent)] tabular-nums`}>
              {String(at + 1).padStart(2, '0')} / {String(SOLUTION_PRODUCTS.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => step(1)} aria-label="Next product" className={arrow}>
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
        <div className="relative min-h-[260px] overflow-hidden lg:min-h-[500px]">
          <Image
            key={p.name}
            src={p.image.src}
            alt={p.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 64vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>
    </section>
  )
}

/** One gallery entry: the kind and date, the cover, the title and its line */
function Entry({ e, wide, index }: { e: SolutionEntry; wide: boolean; index: number }) {
  return (
    <Go href={e.href} className="group block">
      <span className="flex items-center gap-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)]">
        <span className="text-[var(--ink)]">{e.kind}</span>
        {e.date && <span>{e.date}</span>}
        {isExternal(e.href) && <span>Docs</span>}
      </span>
      <span className={`relative mt-3 block overflow-hidden rounded-xl bg-[var(--panel)] ring-1 ring-[var(--rule)] ${wide ? 'aspect-[4/3] lg:aspect-[16/10]' : 'aspect-[4/3]'}`}>
        {e.image ? (
          <Image
            src={e.image}
            alt=""
            fill
            sizes={wide ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <span className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]">
            <AbstractCover seed={e.key} index={index} />
          </span>
        )}
      </span>
      <span
        className={`mt-4 block font-[family-name:var(--font-figtree)] font-semibold text-balance text-[var(--ink)] ${
          wide ? 'text-[clamp(1.25rem,1.7vw,1.6rem)] leading-[1.2] tracking-[-0.02em]' : 'text-[17px] leading-[1.3] tracking-[-0.01em]'
        }`}
      >
        {e.title}
      </span>
      {e.summary && (
        <span className={`rk-section-body mt-2 block text-[var(--mid)] ${wide ? 'max-w-[36em] text-[16px]' : 'line-clamp-3 text-[15px]'}`}>
          {e.summary}
        </span>
      )}
    </Go>
  )
}

/**
 * Solutions: a statement, the groups with their counts, the products one at a time, then every
 * product, use case and Sanity page in one gallery with a topic menu and a search. A group with
 * nothing in it is left out until its first entry is published.
 */
export function SolutionsPageClient({ pages }: { pages: SolutionEntry[] }) {
  const entries = useMemo<SolutionEntry[]>(() => {
    const products: SolutionEntry[] = SOLUTION_PRODUCTS.map((p) => ({
      key: `products/${p.name}`,
      category: 'products',
      kind: 'Product',
      title: p.name,
      summary: p.line,
      href: p.href,
      image: p.image.src,
    }))
    // a Sanity product page that a product above already links to is not listed twice
    const linked = new Set(SOLUTION_PRODUCTS.map((p) => p.href))
    const fromSanity = pages.filter((p) => !(p.category === 'products' && (linked.has(p.href) || /kepler/i.test(p.href))))
    // a use case written up in Sanity replaces the short entry of the same name
    const written = new Set(fromSanity.filter((p) => p.category === 'use-case').map((p) => p.title.toLowerCase()))
    const useCases: SolutionEntry[] = USE_CASES.filter((u) => !written.has(u.title.toLowerCase())).map((u) => ({
      key: `use-case/${u.slug}`,
      category: 'use-case',
      kind: 'Use case',
      title: u.title,
      summary: u.summary,
      href: u.href,
    }))
    // use cases first, the newest Sanity pages next, the products last: the band above already shows them
    return [...fromSanity.filter((p) => p.category === 'use-case'), ...useCases, ...fromSanity.filter((p) => p.category !== 'use-case'), ...products]
  }, [pages])

  const groups = GROUPS.map((g) => ({ ...g, count: entries.filter((e) => e.category === g.id).length })).filter((g) => g.count > 0)

  const [topic, setTopic] = useState('')
  const [query, setQuery] = useState('')

  // the nav links into a group with ?type=..., and a chosen group stays in the address
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('type') || ''
    if (t) setTopic(t)
  }, [])
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if ((params.get('type') || '') === topic) return
    if (topic) params.set('type', topic)
    else params.delete('type')
    window.history.replaceState(null, '', `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash}`)
  }, [topic])

  const shown = entries.filter((e) => {
    if (topic && e.category !== topic) return false
    const q = query.trim().toLowerCase()
    return !q || `${e.title} ${e.summary} ${e.kind}`.toLowerCase().includes(q)
  })

  const field =
    'h-9 rounded-md bg-[var(--panel)] px-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--ink)] ring-1 ring-[var(--rule)] outline-none focus:ring-[var(--ink)]'

  const pick = (id: string) => {
    setTopic(id)
    document.getElementById('all')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Navbar />

      <PageHero
        className="pb-0"
        title="Solutions."
        lede="What teams use RubixKube for, and the products that do it."
      />

      <main className="bg-[var(--bg)]">
        <div className="px-[var(--pad)]">
          <div className="rk-landing-max">

            {/* the groups, with how many entries each has; picking one filters the gallery */}
            <ul className="m-0 mt-16 grid list-none grid-cols-1 gap-x-5 gap-y-10 p-0 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {groups.map((g) => {
                const Icon = g.icon
                return (
                  <li key={g.id} className="m-0 border-t border-[var(--rule)] p-0 pt-6">
                    <button type="button" onClick={() => pick(g.id)} className="group block w-full cursor-pointer text-left">
                      <span className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-[var(--ink)]" strokeWidth={1.5} aria-hidden />
                        <span className="font-[family-name:var(--font-figtree)] text-[20px] font-semibold tracking-[-0.015em] text-[var(--ink)]">
                          {g.name}
                        </span>
                      </span>
                      <span className="mt-1 block pl-9 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)]">
                        {g.count} {g.count === 1 ? 'entry' : 'entries'}
                      </span>
                      <span className="rk-section-body mt-4 block text-[15px] text-[var(--mid)] group-hover:text-[var(--ink)]">{g.line}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          <ProductBand />
        </div>

        <section id="all" aria-label="Everything" className="scroll-mt-[var(--nav-stack)] px-[var(--pad)] pt-20 pb-28 sm:pt-28">
          <div className="rk-landing-max">
            <div className="flex flex-col gap-5 border-b border-[var(--rule)] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <p className={`${mono} m-0 text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase`}>
                <span className="text-[var(--ink)]">{shown.length}</span> {shown.length === 1 ? 'Entry' : 'Entries'}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:flex sm:items-center">
                <select
                  aria-label="Group"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={`${field} w-full cursor-pointer pr-8 sm:w-auto`}
                >
                  <option value="">Everything</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className={`${field} w-full pr-9 sm:w-56`}
                  />
                  <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[var(--mid)]" aria-hidden />
                </label>
              </div>
            </div>

            {shown.length === 0 ? (
              <div className="py-24 text-center">
                <p className="rk-section-body m-0 text-[var(--mid)]">Nothing matches.</p>
                <button
                  type="button"
                  onClick={() => {
                    setTopic('')
                    setQuery('')
                  }}
                  className="mt-4 cursor-pointer font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)] underline decoration-[var(--rule)] underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-x-6 gap-y-16 p-0 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-24">
                {shown.map((e, i) => {
                  const slot = SLOTS[i % SLOTS.length]
                  return (
                    <li key={e.key} className={`m-0 p-0 ${slot.col}`}>
                      <Entry e={e} wide={slot.wide} index={i} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>
      </main>

      <ClosingCTA headline="See RubixKube solve your use case" subline="Book a 30-minute demo." />
      <Footer />
    </>
  )
}
