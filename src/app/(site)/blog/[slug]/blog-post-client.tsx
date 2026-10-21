'use client'

import { PortableText, type SanityDocument } from "next-sanity"
import type { SanityPost, SanityBlock, PortableTextImageProps, PortableTextCalloutProps, PortableTextCodeProps } from "@/types/sanity"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ClosingCTA } from "@/components/closing-cta"
import { urlFor } from "@/lib/sanity.client"
import { motion } from "framer-motion"
import { fadeUpVariants, fadeUp } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useState, useEffect, useMemo } from "react"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ShareLinks } from "@/components/blog/share-links"
import { NewsletterSignup, Callout, CodeBlock, BlogCardStyles } from "@/components/blog"

interface BlogPostClientProps {
  post: SanityPost
  relatedPosts?: SanityDocument[]
}

/** Words in the post's text blocks, for the reading time */
function wordCount(body: unknown): number {
  if (!Array.isArray(body)) return 0
  let n = 0
  for (const block of body as SanityBlock[]) {
    if (block?._type !== 'block' || !Array.isArray(block.children)) continue
    for (const c of block.children) n += (c.text || '').split(/\s+/).filter(Boolean).length
  }
  return n
}


/** The section list, plain, with the section being read marked */
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

export function BlogPostClient({ post, relatedPosts = [] }: BlogPostClientProps) {
  const prefersReducedMotion = useReducedMotion()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  
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
    if (Array.isArray(post.body)) {
      for (const block of post.body) {
        if (block?._type === 'block' && typeof block.style === 'string' && /^h[1-4]$/.test(block.style)) {
          const sanityBlock = block as SanityBlock
          const text = Array.isArray(sanityBlock.children)
            ? sanityBlock.children.map((c) => c.text || '').join('')
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
  }, [post.body])
  
  // Extract headings for the TOC component
  const headings = useMemo(() => {
    const items: { id: string; text: string; level: number }[] = []
    if (Array.isArray(post.body)) {
      for (const block of post.body) {
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
  }, [post.body, headingTextToId])
  
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1440).height(810).url()
    : null
  const coverAlt = post.image?.alt?.trim() || post.title
  const coverCaption = post.image?.caption?.trim()
  const minutes = Math.max(1, Math.round(wordCount(post.body) / 230))
  // the date in UTC, so the server and the browser print the same day
  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
    : ''
  const excerpt = post.excerpt?.trim()

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
      
      {/* Breadcrumb and title across the container, the details and the summary under it, a cover
          the full width, then the text centred with the section list in the right margin */}
      <section className="bg-[var(--bg)] px-[var(--pad)] pt-[calc(var(--nav-stack)+3.5rem)] pb-24">
        <div className="rk-landing-max w-full">
          <motion.header
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
          >
            <nav className="mb-8 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)]">
              <Link href="/" className="transition-colors hover:text-[var(--ink)]">Home</Link>
              <span className="text-[var(--faint)]">/</span>
              <Link href="/blog" className="transition-colors hover:text-[var(--ink)]">Blog</Link>
              {post.categories && post.categories.length > 0 && (
                <>
                  <span className="text-[var(--faint)]">/</span>
                  <span className="text-[var(--ink)]">{post.categories[0]}</span>
                </>
              )}
            </nav>
            <h1 className="rk-section-title m-0 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.06] text-[var(--ink)]">
              {post.title}
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]">
              {post.categories?.[0] && <span className="text-[var(--ink)]">{post.categories[0]}</span>}
              {published && <time dateTime={post.publishedAt}>{published}</time>}
              <span>{minutes} min read</span>
              {post.author?.name && (
                <span className="flex items-center gap-2 text-[var(--ink)]">
                  {post.author.image ? (
                    <Image
                      src={urlFor(post.author.image)?.width(56).height(56).url()}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : null}
                  {post.author.name}
                </span>
              )}
              <span className="ml-auto"><ShareLinks title={post.title} /></span>
            </div>
            {excerpt && (
              <p className="rk-section-body m-0 mt-6 max-w-[820px] text-[clamp(18px,1.4vw,20px)] text-[var(--mid)]">{excerpt}</p>
            )}
          </motion.header>

          {postImageUrl && (
            <figure className="m-0 mt-12">
              <div className="relative aspect-[2/1] overflow-hidden rounded-lg bg-[var(--panel)]">
                <Image
                  src={postImageUrl}
                  alt={coverAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1400px) 100vw, 1400px"
                />
              </div>
              {coverCaption ? (
                <figcaption className="mt-3 text-[14px] leading-relaxed text-[var(--mid)]">{coverCaption}</figcaption>
              ) : null}
            </figure>
          )}

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
              {Array.isArray(post.body) && (
                <PortableText 
                  value={post.body} 
                  components={{
                    types: {
                      image: ({value}: PortableTextImageProps) => {
                        if (!value?.asset?._ref) return null
                        const imageUrl = urlFor(value)
                        return (
                          <figure className="my-12">
                            <div className="relative overflow-hidden rounded-lg bg-[var(--panel)]">
                              <Image
                                src={imageUrl?.width(1000).height(562).url()}
                                alt={value.alt || "Blog image"}
                                width={1000}
                                height={562}
                                className="w-full h-auto"
                              />
                            </div>
                            {value.caption && (
                              <figcaption className="mt-3 text-[14px] leading-relaxed text-[var(--mid)]">
                                {value.caption}
                              </figcaption>
                            )}
                          </figure>
                        )
                      },
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
                    },
                  }}
                />
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

          {/* Back to Blog Floating Button */}
          {showBackToTop && (
            <motion.div
              className="fixed bottom-8 right-8 z-40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 bg-[var(--bg)] text-[var(--ink)] border border-[var(--rule)] shadow-md hover:shadow-lg hover:border-[var(--blue)]/30 transition-all duration-200 font-[family-name:var(--font-mono)] text-[13px] font-light"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All stories
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32 px-[var(--pad)]">
        <div className="rk-landing-max w-full">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
            className="mb-12"
          >
            <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Related
            </span>
            <h2 className="rk-section-title mt-3 text-[clamp(1.75rem,3vw,2.75rem)] text-[var(--ink)]">
              More <em>stories.</em>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, i) => (
              <motion.div
                key={relatedPost._id}
                variants={fadeUpVariants}
                {...(prefersReducedMotion ? { initial: "visible" } : { 
                  initial: "hidden",
                  animate: "visible",
                  transition: { delay: (i * 0.05) + 0.2 }
                })}
              >
                <BlogCardStyles
                  post={relatedPost}
                  variant="default"
                  index={i}
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.4 } })}
          >
            <Button asChild variant="outline">
              <Link href="/blog" className="inline-flex items-center gap-2">
                View All Articles
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}