'use client'

import { useState } from "react"

import { Navbar } from "@/components/navbar"
import { PageHero } from "@/components/page-hero"
import { Footer } from "@/components/footer"
import { ClosingCTA } from "@/components/closing-cta"
import { urlFor } from "@/lib/sanity.client"
import { ArrowLeft, ArrowRight, Search, Rss } from "lucide-react"
import Link from "next/link"

import { IconBrandApplePodcast } from "@tabler/icons-react"

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

function getYoutubeId(url: string) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/)
  return match ? match[1] : null
}

const mono = 'font-[family-name:var(--font-mono)]'

/** The date in UTC, so the server and the browser print the same day */
const day = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }) : ''

/** The episode's cover: its YouTube thumbnail, else its Sanity image */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function coverOf(episode: any): string | null {
  const videoId = getYoutubeId(episode.youtubeUrl)
  if (videoId) return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  return episode.image ? urlFor(episode.image).url() : null
}

/** A cover, or the feed mark when an episode has none */
function Cover({ src, hover }: { src: string | null; hover?: boolean }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className={`absolute inset-0 h-full w-full object-cover ${hover ? 'transition-transform duration-700 group-hover:scale-[1.02]' : ''}`}
    />
  ) : (
    <span className="absolute inset-0 flex items-center justify-center">
      <Rss className="h-10 w-10 text-[var(--mid)]" />
    </span>
  )
}

/** How many episodes the feature at the top steps through */
const FEATURED = 3

/**
 * The feature, as on /blog: one episode at a time, its words on the left and its cover on the
 * right, with arrows to step through the newest few.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Feature({ episodes }: { episodes: any[] }) {
  const [at, setAt] = useState(0)
  const e = episodes[at]
  if (!e) return null
  const step = (d: number) => setAt((i) => (i + d + episodes.length) % episodes.length)
  const arrow =
    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[var(--ink)] ring-1 ring-[var(--rule)] transition-colors hover:bg-[var(--panel)]'
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)] lg:gap-4">
      <div className="order-2 flex flex-col border-t border-[var(--rule)] pt-8 lg:order-1 lg:pr-12">
        <p className="m-0 flex gap-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)]">
          <span className="text-[var(--ink)]">Podcast</span>
          <time dateTime={e.publishedAt}>{day(e.publishedAt)}</time>
        </p>
        <Link href={`/podcast/${e.slug}`} className="group mt-3 block">
          <h2 className="rk-section-title m-0 text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--rule)] group-hover:underline-offset-4">
            {e.title}
          </h2>
        </Link>
        {e.excerpt && <p className="rk-section-body m-0 mt-5 line-clamp-4 text-[16px] text-[var(--mid)]">{e.excerpt}</p>}
        <Link
          href={`/podcast/${e.slug}`}
          className="group mt-7 inline-flex items-center gap-1.5 self-start font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]"
        >
          Listen
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
        {episodes.length > 1 && (
          <div className="mt-10 flex items-center gap-5 lg:mt-auto lg:pt-10">
            <button type="button" onClick={() => step(-1)} aria-label="Previous episode" className={arrow}>
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <span className={`${mono} text-[12px] tracking-[0.08em] text-[var(--mid)] tabular-nums`}>
              {String(at + 1).padStart(2, '0')} / {String(episodes.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => step(1)} aria-label="Next episode" className={arrow}>
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
      <Link href={`/podcast/${e.slug}`} className="relative order-1 block aspect-video self-start overflow-hidden rounded-lg bg-[var(--panel)] lg:order-2">
        <Cover key={e._id} src={coverOf(e)} />
      </Link>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PodcastPageClient({ episodes }: { episodes: any[] }) {
  const featured = episodes.slice(0, FEATURED)
  const [query, setQuery] = useState('')
  const shown = episodes.filter((e) => {
    const q = query.trim().toLowerCase()
    return !q || `${e.title} ${e.excerpt || ''}`.toLowerCase().includes(q)
  })
  const field =
    'h-9 rounded-md bg-[var(--panel)] px-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--ink)] ring-1 ring-[var(--rule)] outline-none focus:ring-[var(--ink)]'
  const icon =
    'flex h-9 w-9 items-center justify-center rounded-md text-[var(--ink)] ring-1 ring-[var(--rule)] transition-colors hover:bg-[var(--panel)]'

  return (
    <>
      <Navbar />

      <PageHero
        className="pb-0"
        title="The Root Cause."
        lede="A podcast with deep dives into AI-native infrastructure, war stories from the trenches, and the future of autonomous site reliability."
        actions={
          <div className="flex items-center gap-3">
            <a href="https://www.youtube.com/playlist?list=PL0RlH4tLsvsgl9A07Ha31rYSalREe5Cp3" target="_blank" rel="noopener noreferrer" className={icon}>
              <YoutubeIcon className="h-4 w-4" />
            </a>
            <a href="https://podcasts.apple.com/us/podcast/the-root-cause-by-rubixkube/id1896761094" target="_blank" rel="noopener noreferrer" className={icon}>
              <IconBrandApplePodcast stroke={1.5} className="h-4 w-4" />
            </a>
            <a href="https://feeds.zencastr.com/f/3wcU1DE3.rss" target="_blank" rel="noopener noreferrer" className={icon}>
              <Rss className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>
        }
      />

      <main className="bg-[var(--bg)] px-[var(--pad)] pb-24">
        <div className="rk-landing-max">
          {episodes.length === 0 ? (
            <div className="mx-auto max-w-lg py-24 text-center">
              <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--panel)] ring-1 ring-[var(--rule)]">
                <Search className="h-6 w-6 text-[var(--mid)]" />
              </div>
              <h3 className="rk-section-title m-0 mb-4 text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] text-[var(--ink)]">
                No episodes found
              </h3>
              <p className="rk-section-body m-0 text-[var(--mid)]">
                We are crafting exceptional audio content on infrastructure reliability. Check back soon.
              </p>
            </div>
          ) : (
            <>
              <section className="mt-16 sm:mt-20" aria-label="Featured episodes">
                <Feature episodes={featured} />
              </section>

              {/* every episode, as the /blog grid: the date, the cover, the title */}
              <section className="mt-24 sm:mt-32" aria-label="All episodes">
                <div className="flex flex-col gap-5 border-b border-[var(--rule)] pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <p className={`${mono} m-0 text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase`}>
                    <span className="text-[var(--ink)]">{shown.length}</span> {shown.length === 1 ? 'Episode' : 'Episodes'}
                  </p>
                  <label className="relative block">
                    <span className="sr-only">Search</span>
                    <input
                      type="search"
                      value={query}
                      onChange={(ev) => setQuery(ev.target.value)}
                      placeholder="Search"
                      className={`${field} w-full pr-9 sm:w-56`}
                    />
                    <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[var(--mid)]" aria-hidden />
                  </label>
                </div>

                {shown.length === 0 ? (
                  <div className="py-24 text-center">
                    <p className="rk-section-body m-0 text-[var(--mid)]">No episodes match.</p>
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="mt-4 cursor-pointer font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)] underline decoration-[var(--rule)] underline-offset-4"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-5 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-4">
                    {shown.map((episode) => (
                      <li key={episode._id} className="m-0 p-0">
                        <Link href={`/podcast/${episode.slug}`} className="group block">
                          <time dateTime={episode.publishedAt} className={`${mono} block text-[12px] text-[var(--mid)]`}>
                            {day(episode.publishedAt)}
                          </time>
                          <span className="relative mt-3 block aspect-video overflow-hidden rounded-md bg-[var(--panel)]">
                            <Cover src={coverOf(episode)} hover />
                          </span>
                          <span className="mt-4 block font-[family-name:var(--font-figtree)] text-[17px] leading-[1.3] font-semibold tracking-[-0.01em] text-balance text-[var(--ink)]">
                            {episode.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <ClosingCTA />
      <Footer />
    </>
  )
}
