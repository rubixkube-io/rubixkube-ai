'use client'

import { motion } from "framer-motion"
import { fadeUpVariants } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { type SanityDocument } from "next-sanity"
import { BlogCardStyles } from "./blog-card-styles"

interface BlogLayoutGridProps {
  posts: SanityDocument[]
  layout?: 'masonry' | 'grid' | 'featured-grid' | 'magazine' | 'list'
  className?: string
}

export function BlogLayoutGrid({ posts, layout = 'grid', className = "" }: BlogLayoutGridProps) {
  const prefersReducedMotion = useReducedMotion()

  if (posts.length === 0) return null

  // Masonry Layout - Pinterest style
  if (layout === 'masonry') {
    return (
      <div className={`columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 ${className}`}>
        {posts.map((post, idx) => (
          <motion.div
            key={post._id}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { 
              initial: "hidden",
              animate: "visible",
              transition: { delay: idx * 0.1 }
            })}
            className="break-inside-avoid mb-8"
          >
            <BlogCardStyles
              post={post}
              variant="magazine"
              index={idx}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  // Featured Grid Layout - Hero + Grid
  if (layout === 'featured-grid') {
    const [featuredPost, ...regularPosts] = posts
    
    return (
      <div className={`space-y-12 ${className}`}>
        {/* Hero Post */}
        {featuredPost && (
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { 
              initial: "hidden",
              animate: "visible"
            })}
          >
            <BlogCardStyles
              post={featuredPost}
              variant="hero"
            />
          </motion.div>
        )}
        
        {/* Regular Grid */}
        {regularPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.slice(0, 6).map((post, idx) => (
              <motion.div
                key={post._id}
                variants={fadeUpVariants}
                {...(prefersReducedMotion ? { initial: "visible" } : { 
                  initial: "hidden",
                  animate: "visible",
                  transition: { delay: (idx * 0.1) + 0.2 }
                })}
              >
                <BlogCardStyles
                  post={post}
                  variant="default"
                  index={idx + 1}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Magazine Layout - Mixed sizes
  if (layout === 'magazine') {
    const [featuredPost, secondPost, ...regularPosts] = posts
    
    return (
      <div className={`space-y-12 ${className}`}>
        {/* Top Section - Featured + Secondary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured takes 2 columns */}
          {featuredPost && (
            <motion.div
              className="lg:col-span-2"
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { 
                initial: "hidden",
                animate: "visible"
              })}
            >
              <BlogCardStyles
                post={featuredPost}
                variant="featured"
              />
            </motion.div>
          )}
          
          {/* Secondary post takes 1 column */}
          {secondPost && (
            <motion.div
              variants={fadeUpVariants}
              {...(prefersReducedMotion ? { initial: "visible" } : { 
                initial: "hidden",
                animate: "visible",
                transition: { delay: 0.1 }
              })}
            >
              <BlogCardStyles
                post={secondPost}
                variant="magazine"
              />
            </motion.div>
          )}
        </div>
        
        {/* Regular Grid */}
        {regularPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularPosts.slice(0, 8).map((post, idx) => (
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
                  variant="default"
                  index={idx + 2}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // List Layout - Minimal horizontal cards
  if (layout === 'list') {
    return (
      <div className={`space-y-2 ${className}`}>
        {posts.map((post, idx) => (
          <motion.div
            key={post._id}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { 
              initial: "hidden",
              animate: "visible",
              transition: { delay: idx * 0.05 }
            })}
          >
            <BlogCardStyles
              post={post}
              variant="minimal"
              index={idx}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  // Default Grid Layout
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {posts.map((post, idx) => (
        <motion.div
          key={post._id}
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : { 
            initial: "hidden",
            animate: "visible",
            transition: { delay: idx * 0.1 }
          })}
        >
          <BlogCardStyles
            post={post}
            variant="default"
            index={idx}
          />
        </motion.div>
      ))}
    </div>
  )
}
