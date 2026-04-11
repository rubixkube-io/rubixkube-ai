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
import { ArrowLeft, Calendar, User, Clock, ArrowUpRight } from "lucide-react"
import { TableOfContents, ShareMenu, NewsletterSignup, Callout, CodeBlock, BlogCardStyles } from "@/components/blog"

interface BlogPostClientProps {
  post: SanityPost
  relatedPosts?: SanityDocument[]
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
          <motion.div variants={fadeUpVariants}>
            <nav className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)] mb-8">
              <Link href="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
              <span className="text-[var(--faint)]">/</span>
              <Link href="/blog" className="hover:text-[var(--ink)] transition-colors">Blog</Link>
              {post.categories && post.categories.length > 0 && (
                <>
                  <span className="text-[var(--faint)]">/</span>
                  <span className="text-[var(--blue)]">{post.categories[0]}</span>
                </>
              )}
            </nav>
          </motion.div>

          {/* Cover image: centered column (narrower than headline), LCP-friendly, optional Sanity caption/alt */}
          {postImageUrl && (
            <motion.div
              className="mb-10 mx-auto w-full max-w-[720px]"
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.1 } })}
            >
              <figure className="m-0">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--bg)] shadow-sm">
                  <Image
                    src={postImageUrl}
                    alt={coverAlt}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </div>
                {coverCaption ? (
                  <figcaption className="mt-3 text-center font-[family-name:var(--font-mono)] text-xs font-light leading-relaxed text-[var(--mid)]">
                    {coverCaption}
                  </figcaption>
                ) : null}
              </figure>
            </motion.div>
          )}

          {/* Title */}
          <motion.div
            className="mb-6"
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.2 } })}
          >
            <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] tracking-[-0.015em] text-[var(--ink)]">
              {post.title}
            </h1>
          </motion.div>

          {/* Excerpt */}
          {post.excerpt && (
            <motion.div
              className="mb-6"
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.3 } })}
            >
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)] max-w-[60ch]">
                {post.excerpt}
              </p>
            </motion.div>
          )}

          {/* Meta row */}
          <motion.div
            className="flex flex-wrap items-center gap-4 sm:gap-6 py-5 border-b border-[var(--rule)] mb-10 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)]"
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.4 } })}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <time>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>5 min read</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-[var(--bg)] border border-[var(--rule)] rounded-full flex items-center justify-center overflow-hidden">
                  {post.author?.image ? (
                    <Image
                      src={urlFor(post.author.image)?.width(32).height(32).url()}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-3.5 h-3.5 text-[var(--mid)]" />
                  )}
                </div>
                <span style={{ fontWeight: 500 }} className="text-[var(--ink)]">
                  {post.author.name || 'RubixKube Team'}
                </span>
              </div>
            )}
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
              {Array.isArray(post.body) && (
                <PortableText 
                  value={post.body} 
                  components={{
                    types: {
                      image: ({value}: PortableTextImageProps) => {
                        if (!value?.asset?._ref) return null
                        const imageUrl = urlFor(value)
                        return (
                          <figure className="my-12 not-prose">
                            <div className="relative overflow-hidden rounded-2xl bg-[var(--bg)] border border-[var(--rule)]">
                              <Image
                                src={imageUrl?.width(1000).height(562).url()}
                                alt={value.alt || "Blog image"}
                                width={1000}
                                height={562}
                                className="w-full h-auto"
                              />
                            </div>
                            {value.caption && (
                              <figcaption className="text-center font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)] mt-4 italic">
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
                    },
                  }}
                />
              )}
            </motion.article>

            {/* Right Rail - Desktop Only */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <TableOfContents headings={headings} />

                {/* Share */}
                <ShareMenu title={post.title} />

                {/* Newsletter */}
                <NewsletterSignup compact={true} />
              </div>
            </aside>
          </div>

          {/* Author Bio */}
          <motion.div
            className="mt-16 pt-12 border-t border-[var(--rule)]"
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.9 } })}
          >
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--bg)] p-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[var(--background-secondary)] border border-[var(--rule)] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                  {post.author?.image ? (
                    <Image 
                      src={urlFor(post.author.image)?.width(64).height(64).url()} 
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-[var(--mid)]" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)] mb-2"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                  >
                    {post.author?.name || 'RubixKube Team'}
                  </h3>
                  <div className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60 mb-4">
                    {post.author?.bio ? (
                      typeof post.author.bio === 'string' ? (
                        <p className="leading-relaxed">{post.author.bio}</p>
                      ) : (
                        <PortableText 
                          value={post.author.bio} 
                          components={{
                            block: {
                              normal: ({children}) => <p className="leading-relaxed">{children}</p>
                            }
                          }}
                        />
                      )
                    ) : (
                      <p className="leading-relaxed">
                        Building the future of site reliability with AI-native infrastructure solutions. 
                        Passionate about turning operational complexity into elegant simplicity.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

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
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 bg-[var(--bg)] text-[var(--ink)] border border-[var(--rule)] shadow-md hover:shadow-lg hover:border-[var(--blue)]/30 transition-all duration-200 font-[family-name:var(--font-mono)] text-xs font-light"
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
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Related
            </span>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-3">
              More <span className="italic text-[var(--blue)]">stories.</span>
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