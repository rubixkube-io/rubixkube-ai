'use client'

import { useState, useEffect } from "react"
import { type SanityDocument } from "next-sanity"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ClosingCTA } from "@/components/closing-cta"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { fadeUpVariants, fadeUp } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { BookOpen, Search, Filter } from "lucide-react"
import { BlogCardStyles, NewsletterSignup } from "@/components/blog"
import { cn } from "@/lib/utils"
import { rkMono10, rkMono11, rkMono13 } from "@/lib/landing-responsive-type"

interface BlogPageClientProps {
  posts: SanityDocument[]
  category?: string
}

export function BlogPageClient({ posts, category }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(category || '')
  const prefersReducedMotion = useReducedMotion()
  const [view, setView] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const current = params.get('category') || ''
    if ((selectedCategory || '') !== current) {
      if (selectedCategory) {
        params.set('category', selectedCategory)
      } else {
        params.delete('category')
      }
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
      window.history.replaceState(null, '', newUrl)
    }
  }, [selectedCategory])

  const allCategories = posts.flatMap(post => post.categories || [])
  const uniqueCategories = [...new Set(allCategories)].sort()

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === '' ||
      (post.categories && post.categories.includes(selectedCategory))
    return matchesCategory
  })

  const featuredPost = filteredPosts.find((post: SanityDocument) => (post as { featured?: boolean }).featured) || null

  return (
    <>
      <Navbar />

      {/* Hero — section padding + inner max-w matches /blog/[slug] header/article */}
      <section className="relative bg-[var(--bg)] px-[var(--pad)]">
        <div className="rk-blog-listing-shell pt-[calc(var(--nav-stack)+2.5rem)] pb-10 sm:pb-12 text-center">
          <motion.div
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            className="flex w-full flex-col items-stretch text-center"
          >
            <span
              className={cn(
                'font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase mb-5',
                rkMono10,
              )}
            >
              RubixKube Blog
            </span>

            <h1 className="rk-landing-h2-std font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)] w-full">
              Stories from the <span className="italic text-[var(--blue)]">Reliability</span> Era
            </h1>

            <p
              className={cn(
                'font-[family-name:var(--font-mono)] font-light leading-[1.75] text-[var(--mid)] w-full mt-6',
                rkMono13,
              )}
            >
              Deep dives into AI-native infrastructure, war stories from the trenches, and the future of autonomous site reliability.
            </p>
          </motion.div>

          {/* Category Filter */}
          {uniqueCategories.length > 0 && (
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.15 } })}
              className="flex flex-wrap gap-2 justify-center mt-8"
            >
              <Button
                variant={selectedCategory === '' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('')}
              >
                All Articles
              </Button>
              {uniqueCategories.slice(0, 4).map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] px-[var(--pad)] py-12 sm:py-16">
        <div className="rk-blog-listing-shell">
          {filteredPosts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            >
              <div className="max-w-lg mx-auto">
                {posts.length === 0 ? (
                  <>
                    <div className="w-16 h-16 flex items-center justify-center bg-[var(--blue)]/10 mx-auto mb-8">
                      <BookOpen className="w-8 h-8 text-[var(--blue)]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] text-[var(--ink)] mb-4">
                      Coming Soon
                    </h3>
                    <p className={cn('font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)]', rkMono13)}>
                      We&apos;re crafting exceptional content on infrastructure reliability and AI operations.
                      Check back soon for insights that matter.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 flex items-center justify-center bg-[var(--blue)]/10 mx-auto mb-8">
                      <Search className="w-8 h-8 text-[var(--mid)]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] text-[var(--ink)] mb-4">
                      No articles found
                    </h3>
                    <p className={cn('font-[family-name:var(--font-mono)] font-light leading-relaxed text-[var(--mid)] mb-8', rkMono13)}>
                      Try adjusting your category selection to discover more content.
                    </p>
                    <Button variant="outline" onClick={() => setSelectedCategory('')}>
                      <Filter className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-14 sm:space-y-16">
              {/* Featured Article */}
              {featuredPost && (
                <motion.div
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
                >
                  <div className="mb-8">
                    <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase', rkMono10)}>
                      Featured
                    </span>
                    <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-3">
                      Featured <span className="italic text-[var(--blue)]">Article</span>
                    </h2>
                  </div>
                  <BlogCardStyles post={featuredPost} variant="featured" index={0} />
                </motion.div>
              )}

              {/* All Articles */}
              {filteredPosts.length > 0 && (
                <motion.div
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.1 } })}
                >
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
                    <div>
                      <span className={cn('font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--mid)] uppercase', rkMono10)}>
                        All Articles
                      </span>
                      <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] mt-3">
                        Latest <span className="italic text-[var(--blue)]">stories.</span>
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn('font-[family-name:var(--font-mono)] font-light text-[var(--mid)]', rkMono11)}>
                        {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                      </span>
                      <div className="flex overflow-hidden rounded-lg border border-[var(--rule)]">
                        <button
                          aria-label="Grid view"
                          onClick={() => setView('grid')}
                          className={cn(
                            'px-3 py-1.5 font-[family-name:var(--font-mono)] font-light transition-colors',
                            rkMono11,
                            view === 'grid' ? 'bg-white text-[var(--ink)]' : 'text-[var(--mid)]',
                          )}
                        >
                          Grid
                        </button>
                        <button
                          aria-label="List view"
                          onClick={() => setView('list')}
                          className={cn(
                            'px-3 py-1.5 font-[family-name:var(--font-mono)] font-light transition-colors border-l border-[var(--rule)]',
                            rkMono11,
                            view === 'list' ? 'bg-white text-[var(--ink)]' : 'text-[var(--mid)]',
                          )}
                        >
                          List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={view === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-0'
                  }>
                    {filteredPosts.slice(0, 9).map((post, idx) => (
                      <motion.div
                        key={post._id}
                        variants={fadeUpVariants}
                        {...(prefersReducedMotion ? { initial: 'visible' } : {
                          initial: 'hidden',
                          animate: 'visible',
                          transition: { delay: (idx * 0.04) + 0.2 },
                        })}
                      >
                        <BlogCardStyles
                          post={post}
                          variant={view === 'grid' ? 'default' : 'minimal'}
                          index={idx + 1}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Load More */}
              {filteredPosts.length > 9 && (
                <motion.div
                  className="text-center pt-8"
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: 0.3 } })}
                >
                  <p className={cn('font-[family-name:var(--font-mono)] font-light text-[var(--mid)] mb-6', rkMono13)}>
                    {filteredPosts.length - 9} more articles on infrastructure reliability and AI operations
                  </p>
                  <Button variant="outline">
                    Load More Articles
                  </Button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] px-[var(--pad)] py-12 sm:py-16">
        <div className="rk-blog-listing-shell">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : fadeUp)}
            className="text-center"
          >
            <NewsletterSignup className="w-full" />
          </motion.div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
