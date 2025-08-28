'use client'

import { PortableText, type SanityDocument } from "next-sanity"
import type { SanityPost, SanityBlock, PortableTextImageProps, PortableTextCalloutProps, PortableTextCodeProps } from "@/types/sanity"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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
  
  // Inject BlogPosting JSON-LD for SEO
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || undefined,
      "datePublished": post.publishedAt,
      "dateModified": post.publishedAt,
      "author": post.author?.name ? { "@type": "Person", name: post.author.name } : { "@type": "Organization", name: "RubixKube" },
      "image": post.image ? urlFor(post.image)?.width(1200).height(630).url() : undefined,
      "publisher": { "@type": "Organization", name: "RubixKube", logo: { "@type": "ImageObject", url: "https://rubixkube.ai/logo-icon.png" } },
      "mainEntityOfPage": { "@type": "WebPage", "@id": typeof window !== 'undefined' ? window.location.href : '' }
    }
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'rk-blog-jsonld'
    el.text = JSON.stringify(jsonLd)
    document.head.appendChild(el)
    return () => {
      const existing = document.getElementById('rk-blog-jsonld')
      if (existing) existing.remove()
    }
  }, [post])
  
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(675).url()
    : null

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
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50">
        <div 
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-background pt-20 pb-12">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          {/* Breadcrumb */}
          <motion.nav 
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>→</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              {post.categories && post.categories.length > 0 && (
                <>
                  <span>→</span>
                  <span className="text-accent">{post.categories[0]}</span>
                </>
              )}
            </div>
          </motion.nav>

          {/* Cover Image */}
          {postImageUrl && (
            <motion.div 
              className="mb-12"
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.1 } })}
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-card-background border border-border">
                <Image
                  src={postImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Title */}
          <motion.div 
            className="mb-8"
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.2 } })}
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[0.9]">
              {post.title}
            </h1>
          </motion.div>

          {/* Excerpt/Dek */}
          {post.excerpt && (
            <motion.div 
              className="mb-8"
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.3 } })}
            >
              <p className="text-xl leading-relaxed text-foreground-muted max-w-3xl">
                {post.excerpt}
              </p>
            </motion.div>
          )}

          {/* Meta row */}
          <motion.div 
            className="flex items-center gap-6 py-6 border-b border-border mb-12"
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.4 } })}
          >
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <Calendar className="w-4 h-4" />
              <time>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-card-background border border-border rounded-full flex items-center justify-center overflow-hidden">
                  {post.author?.image ? (
                    <Image 
                      src={urlFor(post.author.image)?.width(32).height(32).url()} 
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-foreground-muted" />
                  )}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {post.author.name || 'RubixKube Team'}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="pb-24 bg-background">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-16">
            {/* Main Content */}
            <motion.article 
              className="prose prose-lg max-w-none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              style={{ 
                maxWidth: '80ch',
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
                            <div className="relative rounded-2xl overflow-hidden bg-card-background border border-border shadow-lg">
                              <Image
                                src={imageUrl?.width(1000).height(562).url()}
                                alt={value.alt || "Blog image"}
                                width={1000}
                                height={562}
                                className="w-full h-auto"
                              />
                            </div>
                            {value.caption && (
                              <figcaption className="text-center text-sm text-foreground-muted mt-4 italic">
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
                          <h1 id={id} className="font-heading text-4xl font-bold text-foreground mt-16 mb-8 leading-tight">
                            {children}
                          </h1>
                        )
                      },
                      h2: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h2 id={id} className="font-heading text-3xl font-bold text-foreground mt-12 mb-6 leading-tight">
                            {children}
                          </h2>
                        )
                      },
                      h3: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h3 id={id} className="font-heading text-2xl font-bold text-foreground mt-10 mb-4 leading-tight">
                            {children}
                          </h3>
                        )
                      },
                      h4: ({children}) => {
                        const text = childrenToText(children)
                        const id = headingTextToId.get(text) || slugify(text || 'section')
                        return (
                          <h4 id={id} className="font-heading text-xl font-bold text-foreground mt-8 mb-3 leading-tight">
                            {children}
                          </h4>
                        )
                      },
                      normal: ({children}) => (
                        <p className="text-foreground leading-relaxed mb-6 text-lg">
                          {children}
                        </p>
                      ),
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-accent bg-accent/5 p-6 my-8 rounded-r-2xl">
                          <div className="text-foreground text-lg italic">
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
                        <li className="text-foreground leading-relaxed text-lg">
                          {children}
                        </li>
                      ),
                      number: ({children}) => (
                        <li className="text-foreground leading-relaxed text-lg">
                          {children}
                        </li>
                      ),
                    },
                    marks: {
                      strong: ({children}) => (
                        <strong className="font-bold text-foreground">
                          {children}
                        </strong>
                      ),
                      em: ({children}) => (
                        <em className="italic text-foreground">
                          {children}
                        </em>
                      ),
                      code: ({children}) => (
                        <code className="bg-card-background border border-border px-2 py-1 rounded text-sm font-mono text-foreground">
                          {children}
                        </code>
                      ),
                      link: ({children, value}) => (
                        <a
                          href={value.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent/80 transition-colors underline underline-offset-4 decoration-accent/50 hover:decoration-accent"
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
            className="mt-16 pt-12 border-t border-border"
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.9 } })}
          >
            <div className="bg-card-background border border-border rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-background-secondary border border-border rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                  {post.author?.image ? (
                    <Image 
                      src={urlFor(post.author.image)?.width(64).height(64).url()} 
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-foreground-muted" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    {post.author?.name || 'RubixKube Team'}
                  </h3>
                  <div className="text-foreground-muted mb-4">
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
                className="inline-flex items-center gap-2 px-4 py-3 bg-card-background text-foreground border border-border rounded-full shadow-lg hover:shadow-xl hover:border-accent/50 transition-all duration-200 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                All stories
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="font-heading text-3xl font-bold text-foreground">
                  Related Articles
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              </div>
              <div className="bg-card-background border border-border rounded-xl px-4 py-2">
                <span className="text-sm font-medium text-foreground-muted">
                  {relatedPosts.length} article{relatedPosts.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <p className="text-foreground-muted text-lg">
              Insights from the trenches of infrastructure reliability
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg shadow-accent/25"
            >
              View All Articles
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}