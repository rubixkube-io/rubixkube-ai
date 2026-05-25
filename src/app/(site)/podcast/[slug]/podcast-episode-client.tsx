'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ClosingCTA } from "@/components/closing-cta"
import { motion } from "framer-motion"
import { fadeUpVariants } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"
import { rkMono11 } from "@/lib/landing-responsive-type"
import { urlFor } from "@/lib/sanity.client"
import { PortableText } from "@portabletext/react"
import { type SanityDocument } from "next-sanity"
import type { PortableTextCalloutProps, PortableTextCodeProps } from "@/types/sanity"
import { Rss, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"

import { IconBrandApplePodcast } from "@tabler/icons-react"
import { TableOfContents, ShareMenu, NewsletterSignup, Callout, CodeBlock } from "@/components/blog"

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

      {/* Header Section */}
      <header className="bg-[var(--bg)] pt-[calc(var(--nav-stack)+3.5rem)] pb-12 px-[var(--pad)]">
        <div className="rk-landing-max">
          {/* Breadcrumb */}
          <motion.div variants={fadeUpVariants} initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible">
            <nav className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)] mb-8">
              <Link href="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
              <span className="text-[var(--faint)]">/</span>
              <Link href="/podcast" className="hover:text-[var(--ink)] transition-colors">Podcast</Link>
              <span className="text-[var(--faint)]">/</span>
              <span className="text-[var(--blue)] truncate max-w-[200px]">{episode.title}</span>
            </nav>
          </motion.div>

          {/* Cinematic Media Player */}
          {hasVideo && (
            <motion.div
              className="mb-10 mx-auto w-full max-w-[960px]"
              variants={fadeUpVariants}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              animate="visible"
            >
              <div className="rounded-2xl overflow-hidden bg-[var(--bg)] border border-[var(--rule)] shadow-sm aspect-video relative">
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
            </motion.div>
          )}

          {/* Title */}
          <motion.div
            className="mb-6"
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible"
          >
            <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] tracking-[-0.015em] text-[var(--ink)]">
              {episode.title}
            </h1>
          </motion.div>
          
          {/* Excerpt */}
          {episode.excerpt && (
            <motion.div
              className="mb-6"
              variants={fadeUpVariants}
              initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible"
            >
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)] max-w-[60ch]">
                {episode.excerpt}
              </p>
            </motion.div>
          )}

          {/* Meta row */}
          <motion.div
            className="flex flex-wrap items-center gap-4 sm:gap-6 py-5 border-b border-[var(--rule)] mb-10 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)]"
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <time>
                {new Date(episode.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            {/* Audio Links */}
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-[var(--mid)] tracking-[0.1em] uppercase font-semibold text-[10px]">Listen on:</span>
              {episode.applePodcastUrl && (
                <a href={episode.applePodcastUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[var(--ink)] hover:text-[#872EC4] transition-colors" title="Apple Podcasts">
                  <IconBrandApplePodcast stroke={1.5} className="w-4 h-4" />
                </a>
              )}
              {episode.youtubeUrl && (
                <a href={episode.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[var(--ink)] hover:text-[#FF0000] transition-colors" title="YouTube">
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}
              <a href="https://feeds.zencastr.com/f/3wcU1DE3.rss" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[var(--ink)] hover:text-[var(--blue)] transition-colors" title="RSS Feed">
                <Rss className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <section className="pb-24 bg-[var(--bg)] px-[var(--pad)]">
        <div className="rk-landing-max w-full">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_260px] gap-12 xl:gap-16">
            
            {/* Main Content */}
            <motion.article
              className="prose prose-lg max-w-none min-w-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              style={{
                '--tw-prose-body': 'var(--foreground)',
                '--tw-prose-headings': 'var(--foreground)',
                '--tw-prose-lead': 'var(--foreground-muted)',
                '--tw-prose-links': 'var(--accent)',
                '--tw-prose-bold': 'var(--foreground)',
                '--tw-prose-counters': 'var(--foreground-muted)',
                '--tw-prose-bullets': 'var(--foreground-muted)',
                '--tw-prose-hr': 'var(--border)',
                '--tw-prose-quotes': 'var(--foreground)',
                '--tw-prose-quote-borders': 'var(--accent)',
                '--tw-prose-captions': 'var(--foreground-muted)',
                '--tw-prose-code': 'var(--foreground)',
                '--tw-prose-pre-code': 'var(--foreground)',
                '--tw-prose-pre-bg': 'var(--card-background)',
                '--tw-prose-th-borders': 'var(--border)',
                '--tw-prose-td-borders': 'var(--border)',
              } as React.CSSProperties}
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
                          <h1 id={id} className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-16 mb-8">
                            {children}
                          </h1>
                        )
                      },
                      h2: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h2 id={id} className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-12 mb-6">
                            {children}
                          </h2>
                        )
                      },
                      h3: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h3 id={id} className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2rem)] font-light leading-[1.15] tracking-[-0.01em] text-[var(--ink)] mt-10 mb-4">
                            {children}
                          </h3>
                        )
                      },
                      h4: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h4 id={id} className="font-[family-name:var(--font-serif)] text-[clamp(1.25rem,2.5vw,1.5rem)] font-light leading-[1.2] text-[var(--ink)] mt-8 mb-3">
                            {children}
                          </h4>
                        )
                      },
                      normal: ({children}) => (
                        <p className="text-[var(--ink)] leading-[1.8] mb-6 text-[16px]">
                          {children}
                        </p>
                      ),
                      blockquote: ({children}) => (
                        <blockquote className="border-l-2 border-[var(--blue)] bg-[var(--blue)]/[0.03] p-6 my-8">
                          <div className="font-[family-name:var(--font-mono)] text-[var(--ink)] text-[15px] font-light leading-relaxed italic">
                            {children}
                          </div>
                        </blockquote>
                      ),
                    },
                    list: {
                      bullet: ({children}) => (
                        <ul className="list-disc list-outside ml-6 mb-6 space-y-3">
                          {children}
                        </ul>
                      ),
                      number: ({children}) => (
                        <ol className="list-decimal list-outside ml-6 mb-6 space-y-3">
                          {children}
                        </ol>
                      ),
                    },
                    listItem: {
                      bullet: ({children}) => (
                        <li className="text-[var(--ink)] leading-[1.8] text-[16px]">
                          {children}
                        </li>
                      ),
                      number: ({children}) => (
                        <li className="text-[var(--ink)] leading-[1.8] text-[16px]">
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
                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[var(--rule)] rounded-2xl bg-[var(--background-secondary)]">
                  <Rss className="w-8 h-8 text-[var(--faint)] mb-4" />
                  <p className={cn("font-[family-name:var(--font-mono)] text-[var(--mid)] uppercase tracking-[0.2em]", rkMono11)}>
                    Transcript Syncing
                  </p>
                </div>
              )}
            </motion.article>

            {/* Right Rail - Desktop Only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                {headings.length > 0 && <TableOfContents headings={headings} />}

                {/* Share */}
                <ShareMenu title={episode.title} />

                {/* Newsletter */}
                <NewsletterSignup compact={true} />
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
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 bg-[var(--bg)] text-[var(--ink)] border border-[var(--rule)] shadow-md hover:shadow-lg hover:border-[var(--blue)]/30 transition-all duration-200 font-[family-name:var(--font-mono)] text-xs font-light"
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
