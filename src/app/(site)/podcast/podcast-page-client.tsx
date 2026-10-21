'use client'

import { Navbar } from "@/components/navbar"
import { PageHero } from "@/components/page-hero"
import { Footer } from "@/components/footer"
import { ClosingCTA } from "@/components/closing-cta"
import { urlFor } from "@/lib/sanity.client"
import { Search, Rss } from "lucide-react"
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

/** A section's small label and title, as on the blog */
function Heading({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 border-b border-[var(--rule)] pb-5">
      <span className={`${mono} text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase`}>{label}</span>
      <h2 className="rk-section-title m-0 mt-3 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.1] text-[var(--ink)]">
        {children}
      </h2>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PodcastPageClient({ episodes }: { episodes: any[] }) {
  const featuredEpisode = episodes[0]
  const pastEpisodes = episodes.slice(1)
  const icon =
    'flex h-9 w-9 items-center justify-center rounded-md text-[var(--ink)] ring-1 ring-[var(--rule)] transition-colors hover:bg-[var(--panel)]'

  return (
    <>
      <Navbar />

      <PageHero
        className="pb-0"
        title="The Root Cause Podcast."
        lede="Deep dives into AI-native infrastructure, war stories from the trenches, and the future of autonomous site reliability."
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
              {/* Featured Episode: its words on the left, its cover on the right */}
              {featuredEpisode && (
                <section className="mt-16 sm:mt-24" aria-label="Featured">
                  <Heading label="Featured">
                    Latest <em>Episode</em>
                  </Heading>
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,9fr)] lg:gap-4">
                    <div className="order-2 flex flex-col lg:order-1 lg:pr-12">
                      <p className="m-0 flex gap-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--mid)]">
                        <span className="text-[var(--ink)]">Podcast</span>
                        <time dateTime={featuredEpisode.publishedAt}>{day(featuredEpisode.publishedAt)}</time>
                      </p>
                      <Link href={`/podcast/${featuredEpisode.slug}`} className="group mt-3 block">
                        <h3 className="rk-section-title m-0 text-[clamp(1.5rem,2.1vw,2rem)] leading-[1.15] tracking-[-0.02em] text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--rule)] group-hover:underline-offset-4">
                          {featuredEpisode.title}
                        </h3>
                      </Link>
                      {featuredEpisode.excerpt && (
                        <p className="rk-section-body m-0 mt-5 line-clamp-5 text-[16px] text-[var(--mid)]">{featuredEpisode.excerpt}</p>
                      )}
                    </div>
                    <Link
                      href={`/podcast/${featuredEpisode.slug}`}
                      className="group relative order-1 block aspect-video overflow-hidden rounded-lg bg-[var(--panel)] lg:order-2"
                    >
                      <Cover src={coverOf(featuredEpisode)} hover />
                    </Link>
                  </div>
                </section>
              )}

              {/* Past Episodes Grid: the date, the cover, the title */}
              {pastEpisodes.length > 0 && (
                <section className="mt-24 sm:mt-32" aria-label="All Episodes">
                  <Heading label="All Episodes">
                    Past <em>conversations.</em>
                  </Heading>
                  <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-5 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-4">
                    {pastEpisodes.map((episode) => (
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
                          {episode.excerpt && (
                            <span className="mt-2 line-clamp-3 block font-[family-name:var(--font-figtree)] text-[15px] leading-[1.55] text-[var(--mid)]">
                              {episode.excerpt}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      <ClosingCTA />
      <Footer />
    </>
  )
}
