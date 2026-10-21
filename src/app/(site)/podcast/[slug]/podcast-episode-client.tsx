'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ClosingCTA } from "@/components/closing-cta"
import { motion } from "framer-motion"
import { fadeUpVariants, fadeUp } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"
import { rkMono11 } from "@/lib/landing-responsive-type"
import { urlFor } from "@/lib/sanity.client"
import { PortableText } from "@portabletext/react"
import { type SanityDocument } from "next-sanity"
import type { PortableTextCalloutProps, PortableTextCodeProps } from "@/types/sanity"
import { Rss, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"

import { IconBrandApplePodcast } from "@tabler/icons-react"
import { NewsletterSignup, Callout, CodeBlock } from "@/components/blog"
import { ShareLinks } from "@/components/blog/share-links"

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

/** The section list, plain, with the section being read marked (as on a blog post) */
function Contents({ headings, fold = false }: { headings: { id: string; text: string; level: number }[]; fold?: boolean }) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const seen = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-20% 0% -60% 0%' },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) seen.observe(el)
    })
    return () => seen.disconnect()
  }, [headings])
  if (headings.length < 2) return null
  if (fold)
    return (
      <details className="mb-10 border-b border-[var(--rule)] font-[family-name:var(--font-figtree)] font-normal 2xl:hidden">
        <summary className="cursor-pointer list-none py-3 text-[15px] text-[var(--ink)]">On this page</summary>
        <ul className="m-0 list-none space-y-1.5 p-0 pb-4">
          {headings
            .filter((h) => h.level <= 2)
            .map((h) => (
              <li key={h.id} className="m-0 p-0">
                <a href={`#${h.id}`} className="text-[15px] text-[var(--mid)] hover:text-[var(--ink)]">
                  {h.text}
                </a>
              </li>
            ))}
        </ul>
      </details>
    )
  return (
    <nav aria-label="On this page" className="font-[family-name:var(--font-figtree)] font-normal">
      <p className="m-0 mb-3 text-[14px] text-[var(--ink)]">On this page</p>
      <ul className="m-0 max-h-[calc(100vh-var(--nav-stack)-8rem)] list-none space-y-2 overflow-y-auto border-l border-[var(--rule)] p-0">
        {headings
          .filter((h) => h.level <= 2)
          .map((h) => (
            <li key={h.id} className="m-0 p-0">
              <a
                href={`#${h.id}`}
                className={`block border-l py-0.5 pl-4 text-[14px] leading-[1.45] transition-colors ${
                  active === h.id
                    ? 'border-[var(--ink)] text-[var(--ink)]'
                    : 'border-transparent text-[var(--mid)] hover:text-[var(--ink)]'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export function PodcastEpisodeClient({ episode }: { episode: SanityDocument }) {
  const prefersReducedMotion = useReducedMotion()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const videoId = getYoutubeId(episode.youtubeUrl)
  const hasVideo = !!videoId || !!episode.videoUrl

  // Helper: slugify text to id-safe value
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80)
  
  // Helper: convert React children to plain text
  const childrenToText = (children: unknown): string => {
    if (typeof children === 'string') return children
    if (Array.isArray(children)) return children.map(childrenToText).join('')
    if (children && typeof children === 'object' && children !== null && 'props' in children) {
      const childComponent = children as { props?: { children?: unknown } }
      return childrenToText(childComponent.props?.children)
    }
    return ''
  }
  
  // Build deterministic ids for headings from Sanity body blocks
  const headingTextToId = useMemo(() => {
    const map = new Map<string, string>()
    const counts = new Map<string, number>()
    if (Array.isArray(episode.body)) {
      for (const block of episode.body) {
        if (block?._type === 'block' && typeof block.style === 'string' && /^h[1-4]$/.test(block.style)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const sanityBlock = block as any
          const text = Array.isArray(sanityBlock.children)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? sanityBlock.children.map((c: any) => c.text || '').join('')
            : ''
          const base = slugify(text || 'section')
          const seen = counts.get(base) || 0
          const id = seen === 0 ? base : `${base}-${seen + 1}`
          counts.set(base, seen + 1)
          map.set(text, id)
        }
      }
    }
    return map
  }, [episode.body])
  
  // Extract headings for the TOC component
  const headings = useMemo(() => {
    const items: { id: string; text: string; level: number }[] = []
    if (Array.isArray(episode.body)) {
      for (const block of episode.body) {
        if (block?._type === 'block' && typeof block.style === 'string' && /^h[1-4]$/.test(block.style)) {
          const text = Array.isArray(block.children)
            ? block.children.map((c: { text?: string }) => c.text || '').join('')
            : ''
          const id = headingTextToId.get(text) || slugify(text || 'section')
          const level = Number(block.style.replace('h', ''))
          items.push({ id, text, level })
        }
      }
    }
    return items
  }, [episode.body, headingTextToId])

  // the date in UTC, so the server and the browser print the same day
  const published = episode.publishedAt
    ? new Date(episode.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
    : ''
  const coverUrl = episode.image ? urlFor(episode.image)?.width(1440).height(810).url() : null
  const excerpt = episode.excerpt?.trim()

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / maxHeight) * 100
      setScrollProgress(progress)
      setShowBackToTop(progress > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--rule)] z-50">
        <div 
          className="h-full bg-[var(--blue)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />

      {/* Breadcrumb and title across the container, the details and the summary under it, the
          player (or cover) the full width, then the text centred with the section list in the
          right margin, as on a blog post */}
      <section className="bg-[var(--bg)] px-[var(--pad)] pt-[calc(var(--nav-stack)+3.5rem)] pb-24">
        <div className="rk-landing-max w-full">
          <motion.header
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
          >
            <nav className="mb-8 flex min-w-0 items-center gap-2 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)]">
              <Link href="/" className="shrink-0 transition-colors hover:text-[var(--ink)]">Home</Link>
              <span className="text-[var(--faint)]">/</span>
              <Link href="/podcast" className="shrink-0 transition-colors hover:text-[var(--ink)]">Podcast</Link>
              <span className="text-[var(--faint)]">/</span>
              <span className="min-w-0 max-w-[200px] truncate text-[var(--ink)]">{episode.title}</span>
            </nav>
            <h1 className="rk-section-title m-0 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.06] text-[var(--ink)]">
              {episode.title}
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]">
              <span className="text-[var(--ink)]">Podcast</span>
              {published && <time dateTime={episode.publishedAt}>{published}</time>}
              <span className="ml-auto flex items-center gap-4">
                {/* Audio Links */}
                <span className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.1em] text-[var(--mid)] uppercase">Listen on:</span>
                  {episode.applePodcastUrl && (
                    <a href={episode.applePodcastUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--mid)] transition-colors hover:text-[var(--ink)]" title="Apple Podcasts">
                      <IconBrandApplePodcast stroke={1.5} className="h-4 w-4" />
                    </a>
                  )}
                  {episode.youtubeUrl && (
                    <a href={episode.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--mid)] transition-colors hover:text-[var(--ink)]" title="YouTube">
                      <YoutubeIcon className="h-4 w-4" />
                    </a>
                  )}
                  <a href="https://feeds.zencastr.com/f/3wcU1DE3.rss" target="_blank" rel="noopener noreferrer" className="flex items-center text-[var(--mid)] transition-colors hover:text-[var(--ink)]" title="RSS Feed">
                    <Rss className="h-3.5 w-3.5" />
                  </a>
                </span>
                <span className="h-4 w-px bg-[var(--rule)]" aria-hidden />
                <ShareLinks title={episode.title} />
              </span>
            </div>
            {excerpt && (
              <p className="rk-section-body m-0 mt-6 max-w-[820px] text-[clamp(18px,1.4vw,20px)] text-[var(--mid)]">{excerpt}</p>
            )}
          </motion.header>

          {/* The player, or the cover when the episode has no video */}
          {hasVideo ? (
            <div className="mt-12">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--panel)]">
                 {videoId ? (
                   <iframe 
                     src={`https://www.youtube.com/embed/${videoId}`} 
                     className="absolute inset-0 w-full h-full"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   />
                 ) : (
                   <video 
                     controls 
                     poster={episode.image ? urlFor(episode.image).url() : undefined}
                     className="absolute inset-0 w-full h-full object-contain bg-black"
                   >
                     <source src={episode.videoUrl} type="video/mp4" />
                   </video>
                 )}
              </div>
            </div>
          ) : coverUrl ? (
            <div className="relative mt-12 aspect-video overflow-hidden rounded-lg bg-[var(--panel)]">
              <Image
                src={coverUrl}
                alt={episode.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-x-12 2xl:grid-cols-[minmax(0,1fr)_800px_minmax(0,1fr)]">
            <div className="mx-auto w-full min-w-0 max-w-[800px] pt-14 2xl:col-start-2">
            <Contents headings={headings} fold />
            {/* Main Content */}
            <motion.article
              className="min-w-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              {episode.body ? (
                <PortableText 
                  value={episode.body} 
                  components={{
                    types: {
                      callout: ({value}: PortableTextCalloutProps) => (
                        <Callout type={value.type} title={value.title}>
                          <PortableText value={value.content} />
                        </Callout>
                      ),
                      code: ({value}: PortableTextCodeProps) => (
                        <CodeBlock
                          code={value.code}
                          language={value.language}
                          filename={value.filename}
                          showLineNumbers={value.showLineNumbers}
                        />
                      ),
                    },
                    block: {
                      h1: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h1 id={id} className="rk-section-title mt-16 mb-5 scroll-mt-[calc(var(--nav-stack)+2rem)] text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.15] text-[var(--ink)]">
                            {children}
                          </h1>
                        )
                      },
                      h2: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h2 id={id} className="rk-section-title mt-14 mb-4 scroll-mt-[calc(var(--nav-stack)+2rem)] text-[clamp(1.4rem,2vw,1.65rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
                            {children}
                          </h2>
                        )
                      },
                      h3: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h3 id={id} className="rk-section-title mt-10 mb-3 scroll-mt-[calc(var(--nav-stack)+2rem)] text-[1.25rem] leading-[1.25] tracking-[-0.015em] text-[var(--ink)]">
                            {children}
                          </h3>
                        )
                      },
                      h4: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h4 id={id} className="rk-section-title mt-8 mb-2 scroll-mt-[calc(var(--nav-stack)+2rem)] text-[1.075rem] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">
                            {children}
                          </h4>
                        )
                      },
                      normal: ({children}) => (
                        <p className="mb-6 font-[family-name:var(--font-figtree)] text-[18px] font-normal leading-[1.7] text-[var(--ink)]">
                          {children}
                        </p>
                      ),
                      blockquote: ({children}) => (
                        <blockquote className="my-10 border-l border-[var(--rule)] pl-6">
                          <div className="font-[family-name:var(--font-serif)] text-[1.5rem] leading-[1.4] italic text-[var(--mid)]">
                            {children}
                          </div>
                        </blockquote>
                      ),
                    },
                    list: {
                      bullet: ({children}) => (
                        <ul className="mb-6 ml-6 list-outside list-disc space-y-2.5 marker:text-[var(--mid)]">
                          {children}
                        </ul>
                      ),
                      number: ({children}) => (
                        <ol className="mb-6 ml-6 list-outside list-decimal space-y-2.5 marker:text-[var(--mid)]">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({children}) => (
                        <li className="pl-1 font-[family-name:var(--font-figtree)] text-[18px] font-normal leading-[1.7] text-[var(--ink)]">
                          {children}
                        </li>
                      ),
                      number: ({children}) => (
                        <li className="pl-1 font-[family-name:var(--font-figtree)] text-[18px] font-normal leading-[1.7] text-[var(--ink)]">
                          {children}
                        </li>
                      ),
                    },
                    marks: {
                      strong: ({children}) => (
                        <strong className="font-semibold text-[var(--ink)]">
                          {children}
                        </strong>
                      ),
                      em: ({children}) => (
                        <em className="italic text-[var(--ink)]">
                          {children}
                        </em>
                      ),
                      code: ({children}) => (
                        <code className="bg-[var(--rule)]/40 border border-[var(--rule)] px-1.5 py-0.5 rounded text-[0.875em] font-[family-name:var(--font-mono)] text-[var(--ink)]">
                          {children}
                        </code>
                      ),
                      link: ({children, value}) => (
                        <a
                          href={value.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--blue)] hover:text-[var(--blue)]/80 transition-colors underline underline-offset-4 decoration-[var(--blue)]/40 hover:decoration-[var(--blue)]"
                        >
                          {children}
                        </a>
                      ),
                    }
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--rule)] py-20">
                  <Rss className="mb-4 h-8 w-8 text-[var(--mid)]" />
                  <p className={cn("font-[family-name:var(--font-mono)] text-[var(--mid)] uppercase tracking-[0.12em]", rkMono11)}>
                    Transcript Syncing
                  </p>
                </div>
              )}
            </motion.article>

              <div className="mt-16">
                <NewsletterSignup compact={true} />
              </div>
            </div>
            <aside className="hidden pt-14 2xl:block">
              <div className="sticky top-[calc(var(--nav-stack)+2rem)]">
                <Contents headings={headings} />
              </div>
            </aside>
          </div>
          
          {/* Back to Podcast Floating Button */}
          {showBackToTop && (
            <motion.div
              className="fixed bottom-8 right-8 z-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Link
                href="/podcast"
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 bg-[var(--bg)] text-[var(--ink)] border border-[var(--rule)] shadow-md hover:shadow-lg hover:border-[var(--blue)]/30 transition-all duration-200 font-[family-name:var(--font-mono)] text-[13px] font-light"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All episodes
              </Link>
            </motion.div>
          )}

        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
