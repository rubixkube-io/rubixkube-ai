'use client'

// import Link from "next/link" - unused"
import { useState, useEffect } from "react"
import { type SanityDocument } from "next-sanity"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ClosingCTA } from "@/components/closing-cta"
import { Button } from "@/components/ui/button"
// import { urlFor } from "@/lib/sanity.client" - unused"
import { motion } from "framer-motion"
import { fadeUpVariants, fadeUp } from "@/lib/animations"
import { useTheme } from "@/components/theme-provider"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import DotGrid from "@/components/ui/bg"
import { BookOpen, ArrowUpRight, Search, Filter } from "lucide-react"
import { BlogCardStyles, NewsletterSignup } from "@/components/blog"

interface BlogPageClientProps {
  posts: SanityDocument[]
  category?: string
}

export function BlogPageClient({ posts, category }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(category || '')
  const { resolvedTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  
  // Sync selected category with URL query param for shareability/SEO filtering
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
  
  // Theme-aware colors for DotGrid
  const dotColors = resolvedTheme === 'dark' 
    ? {
        baseColor: "rgba(147, 197, 253, 0.06)", // Light blue, very subtle
        activeColor: "rgba(147, 197, 253, 0.12)" // Light blue, slightly more visible
      }
    : {
        baseColor: "rgba(59, 130, 246, 0.06)", // Darker blue, very subtle  
        activeColor: "rgba(162, 196, 250, 0.12)" // Darker blue, slightly more visible
      }
  
  // Get unique categories from posts
  const allCategories = posts.flatMap(post => post.categories || [])
  const uniqueCategories = [...new Set(allCategories)].sort()
  
  // Filter posts based on category
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === '' || 
      (post.categories && post.categories.includes(selectedCategory))
    
    return matchesCategory
  })

  // Determine featured post from CMS flag (within current filter)
  const featuredPost = filteredPosts.find((post: SanityDocument) => (post as { featured?: boolean }).featured) || null

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* DotGrid background */}
        <div className="absolute inset-0">
          <DotGrid
            dotSize={3}
            gap={20}
            baseColor={dotColors.baseColor}
            activeColor={dotColors.activeColor}
            proximity={120}
            shockRadius={250}
            shockStrength={4}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-4 sm:px-6 md:px-8 pt-16 sm:pt-20">
          <div className="min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 py-4 sm:py-6">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUpVariants}>
                <span className="inline-flex items-center rounded-full border border-border bg-background-secondary px-3 py-1 text-sm font-medium text-foreground-muted mb-4 sm:mb-6 md:mb-8">
                  RubixKube Blog
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                className="text-[28px] sm:text-[32px] md:text-[48px] lg:text-[56px] xl:text-[64px] 2xl:text-[72px] tracking-[-0.02em] leading-[0.95] text-foreground mb-4 sm:mb-6 px-2 sm:px-0"
                variants={fadeUpVariants}
                {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.1 } })}
              >
                Stories from the <span className="text-accent">Reliability</span> Era
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                className="max-w-[90vw] sm:max-w-[55ch] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-6 sm:leading-7 text-foreground-muted mx-auto px-2 sm:px-0"
                variants={fadeUpVariants}
                {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.2 } })}
              >
                Deep dives into AI-native infrastructure, war stories from the trenches, and the future of autonomous site reliability.
              </motion.p>
            </motion.div>

            {/* Category Filter - Button Style */}
            {uniqueCategories.length > 0 && (
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center w-full px-4 sm:px-0"
              >
                <Button
                  variant={selectedCategory === '' ? "primary" : "outline"}
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base"
                  onClick={() => setSelectedCategory('')}
                >
                  All Articles
                </Button>
                {uniqueCategories.slice(0, 3).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "primary" : "outline"}
                    size="lg"
                    className="w-full sm:w-auto text-sm sm:text-base"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Professional Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          {filteredPosts.length === 0 ? (
            <motion.div 
              className="text-center py-12 sm:py-16 md:py-20 lg:py-24"
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
            >
              <div className="max-w-lg mx-auto">
                {posts.length === 0 ? (
                  <>
                    <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8">
                      <BookOpen className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                      Coming Soon
                    </h3>
                    <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-6 sm:mb-8 px-4">
                      We&apos;re crafting exceptional content on infrastructure reliability and AI operations. 
                      Check back soon for insights that matter.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-2xl bg-card-background border border-border flex items-center justify-center mx-auto mb-8">
                      <Search className="w-10 h-10 text-foreground-muted" />
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                      No articles found
                    </h3>
                    <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-6 sm:mb-8 px-4">
                      Try adjusting your category selection to discover more content.
                    </p>
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-2xl hover:bg-accent/90 transition-all duration-200 font-semibold shadow-lg shadow-accent/25"
                    >
                      <Filter className="w-4 h-4" />
                      Clear Filters
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {/* Featured Article Section */}
              {featuredPost && (
                <motion.div
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
                  className="relative"
                >
                  <div className="mb-8 sm:mb-10 md:mb-12">
                    <div className="flex items-center gap-4 mb-3 sm:mb-4">
                      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                        Featured Article
                      </h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                    </div>
                    <p className="text-foreground-muted text-base sm:text-lg">
                      Our top story on infrastructure reliability and AI operations
                    </p>
                  </div>
                  <BlogCardStyles
                    post={featuredPost}
                    variant="featured"
                    index={0}
                  />
                </motion.div>
              )}

              {/* All Articles Section */}
              {filteredPosts.length > 0 && (
                <motion.div
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.2 } })}
                >
                  <div className="mb-8 sm:mb-10 md:mb-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3">
                      <div className="flex items-center gap-4">
                        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
                          Latest Articles
                        </h2>
                        <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 sm:self-auto overflow-x-auto">
                        <div className="bg-card-background border border-border rounded-xl px-3 sm:px-4 py-2 whitespace-nowrap">
                          <span className="text-xs sm:text-sm font-medium text-foreground-muted">
                            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        {/* View toggle */}
                        <div className="bg-card-background border border-border rounded-xl p-1 flex items-center">
                          <button
                            aria-label="Grid view"
                            onClick={() => setView('grid')}
                            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg ${view === 'grid' ? 'bg-background-secondary text-foreground' : 'text-foreground-muted'}`}
                          >
                            Grid
                          </button>
                          <button
                            aria-label="List view"
                            onClick={() => setView('list')}
                            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg ${view === 'list' ? 'bg-background-secondary text-foreground' : 'text-foreground-muted'}`}
                          >
                            List
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground-muted text-base sm:text-lg">
                      Insights from the trenches of infrastructure reliability
                    </p>
                  </div>
                  
                  <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8' : 'space-y-2 sm:space-y-3 md:space-y-4'}`}>
                    {filteredPosts.slice(0, 9).map((post, idx) => (
                      <motion.div
                        key={post._id}
                        variants={fadeUpVariants}
                        {...(prefersReducedMotion ? { initial: "visible" } : { 
                          initial: "hidden",
                          animate: "visible",
                          transition: { delay: (idx * 0.05) + 0.3 }
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

              {/* Load More Section */}
              {filteredPosts.length > 9 && (
                <motion.div 
                  className="text-center pt-8 sm:pt-10 md:pt-12"
                  variants={fadeUpVariants}
                  {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.5 } })}
                >
                  <div className="bg-card-background/50 backdrop-blur-sm border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-3">
                      More Stories Await
                    </h3>
                    <p className="text-sm sm:text-base text-foreground-muted mb-6 px-2">
                      {filteredPosts.length - 9} more articles on infrastructure reliability and AI operations
                    </p>
                    <button className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white rounded-xl sm:rounded-2xl hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 font-semibold text-sm sm:text-base">
                      Load More Articles
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <ArrowUpRight className="w-3 h-3 text-white" />
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Professional Newsletter Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-card-background/30">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10">
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
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