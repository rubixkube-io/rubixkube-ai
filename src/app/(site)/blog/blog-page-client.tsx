'use client'

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { type SanityDocument } from "next-sanity"
import { ArrowLeft, ArrowRight, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ClosingCTA } from "@/components/closing-cta"
import { NewsletterSignup } from "@/components/blog"
import { urlFor } from "@/lib/sanity.client"

interface BlogPageClientProps {
  posts: SanityDocument[]
  category?: string
}

/** How many stories the feature at the top steps through */
const FEATURED = 3

const mono = 'font-[family-name:var(--font-mono)]'

/** The date in UTC, so the server and the browser print the same day */
const day = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }) : ''

const cover = (post: SanityDocument, w: number, h: number) =>
  post.image ? urlFor(post.image)?.width(w).height(h).url() : null

/**
 * The feature: one story at a time, its words on the left and its cover on the right, with
 * arrows to step through the newest few.
 */
function Feature({ posts }: { posts: SanityDocument[] }) {
  const [at, setAt] = useState(0)
  const post = posts[at]
  if (!post) return null
  const src = cover(post, 1600, 1000)
  const step = (d: number) => setAt((i) => (i + d + posts.length) % posts.length)
  const arrow =
    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[var(--ink)] ring-1 ring-[var(--rule)] transition-colors hover:bg-[var(--panel)]'
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)] lg:gap-4">
      <div className="order-2 flex flex-col border-t border-[var(--rule)] pt-8 lg:order-1 lg:pr-12">
        <p className="m-0 flex gap-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)]">
          {post.categories?.[0] && <span className="text-[var(--ink)]">{post.categories[0]}</span>}
          <span>{day(post.publishedAt)}</span>
        </p>
        <Link href={`/blog/${post.slug.current}`} className="group mt-3 block">
          <h2 className="rk-section-title m-0 text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--rule)] group-hover:underline-offset-4">
            {post.title}
          </h2>
        </Link>
        {post.excerpt && (
          <p className="rk-section-body m-0 mt-5 line-clamp-4 text-[16px] text-[var(--mid)]">{post.excerpt}</p>
        )}
        <Link
          href={`/blog/${post.slug.current}`}
          className="group mt-7 inline-flex items-center gap-1.5 self-start font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]"
        >
          Read more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
        {posts.length > 1 && (
          <div className="mt-10 flex items-center gap-5 lg:mt-auto lg:pt-10">
            <button type="button" onClick={() => step(-1)} aria-label="Previous story" className={arrow}>
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <span className={`${mono} text-[12px] tracking-[0.08em] text-[var(--mid)] tabular-nums`}>
              {String(at + 1).padStart(2, '0')} / {String(posts.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => step(1)} aria-label="Next story" className={arrow}>
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
      <Link
        href={`/blog/${post.slug.current}`}
        className="relative order-1 block aspect-[16/10] overflow-hidden rounded-lg bg-[var(--panel)] lg:order-2"
      >
        {src && (
          <Image
            key={post._id}
            src={src}
            alt={post.image?.alt || ''}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 64vw"
            className="object-cover"
          />
        )}
      </Link>
    </div>
  )
}

/** One story in the grid: the date, the cover, the title */
function Story({ post }: { post: SanityDocument }) {
  const src = cover(post, 800, 600)
  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <span className={`${mono} block text-[12px] text-[var(--mid)]`}>{day(post.publishedAt)}</span>
      <span className="relative mt-3 block aspect-[4/3] overflow-hidden rounded-md bg-[var(--panel)]">
        {src && (
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        )}
      </span>
      <span className="mt-4 block font-[family-name:var(--font-figtree)] text-[17px] leading-[1.3] font-semibold tracking-[-0.01em] text-balance text-[var(--ink)]">
        {post.title}
      </span>
    </Link>
  )
}

/**
 * The blog: a statement about what we write, the newest stories one at a time, then every
 * story in a grid with a topic menu and a search.
 */
export function BlogPageClient({ posts, category }: BlogPageClientProps) {
  const [topic, setTopic] = useState(category || '')
  const [query, setQuery] = useState('')

  // keep the chosen topic in the address, so a filtered list can be shared
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if ((params.get('category') || '') === topic) return
    if (topic) params.set('category', topic)
    else params.delete('category')
    window.history.replaceState(null, '', `${window.location.pathname}${params.toString() ? `?${params}` : ''}`)
  }, [topic])

  const topics = useMemo(() => [...new Set(posts.flatMap((p) => p.categories || []))].sort(), [posts])
  const newest = useMemo(
    () => [...posts].sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '')),
    [posts],
  )
  const featured = newest.slice(0, FEATURED)

  const shown = newest.filter((p) => {
    if (topic && !p.categories?.includes(topic)) return false
    const q = query.trim().toLowerCase()
    return !q || `${p.title} ${p.excerpt || ''}`.toLowerCase().includes(q)
  })

  const field =
    'h-9 rounded-md bg-[var(--panel)] px-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--ink)] ring-1 ring-[var(--rule)] outline-none focus:ring-[var(--ink)]'

  return (
    <>
      <Navbar />

      <main className="bg-[var(--bg)] px-[var(--pad)] pt-[calc(var(--nav-stack)+3.5rem)] pb-24 sm:pt-[calc(var(--nav-stack)+5rem)]">
        <div className="rk-landing-max">
          <h1 className="rk-section-title m-0 max-w-[34ch] text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.1]">
            <span className="text-[var(--ink)]">The RubixKube blog</span>{' '}
            <span className="text-[var(--mid)]">
              is where we write about running production: what breaks, how Rubix finds the cause, and what we
              learn building for the people who keep systems running.
            </span>
          </h1>

          {featured.length > 0 && (
            <section className="mt-16 sm:mt-24" aria-label="Featured stories">
              <Feature posts={featured} />
            </section>
          )}

          <section className="mt-24 sm:mt-32" aria-label="All stories">
            <div className="flex flex-col gap-5 border-b border-[var(--rule)] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <p className={`${mono} m-0 text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase`}>
                <span className="text-[var(--ink)]">{shown.length}</span> {shown.length === 1 ? 'Article' : 'Articles'}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:flex sm:items-center">
                {topics.length > 0 && (
                  <select
                    aria-label="Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={`${field} w-full cursor-pointer pr-8 sm:w-auto`}
                  >
                    <option value="">All topics</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                )}
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
                <p className="rk-section-body m-0 text-[var(--mid)]">No articles match.</p>
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
              <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-5 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-4">
                {shown.map((post) => (
                  <li key={post._id} className="m-0 p-0">
                    <Story post={post} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] px-[var(--pad)] py-16 sm:py-20">
        <div className="rk-landing-max">
          <NewsletterSignup className="w-full" />
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
