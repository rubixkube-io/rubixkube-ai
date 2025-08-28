'use client'

import Link from "next/link"
import Image from "next/image"
// import { motion } from "framer-motion" - unused"
import { Calendar, Clock, ArrowUpRight, Tag, User } from "lucide-react"
import { urlFor } from "@/lib/sanity.client"
// import { fadeUpVariants } from "@/lib/animations" - unused"
// import { useReducedMotion } from "@/hooks/use-reduced-motion" - unused"
import { type SanityDocument } from "next-sanity"

interface BlogCardProps {
  post: SanityDocument
  featured?: boolean
  index?: number
  className?: string
}

export function BlogCard({ post, featured = false, className = "" }: BlogCardProps) {
  // const prefersReducedMotion = useReducedMotion() - unused"

  if (featured) {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block ${className}`}>
        <article className="relative rounded-3xl overflow-hidden bg-card-background border border-border transition-all duration-500 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5">
          {/* Featured Image Background */}
          <div className="relative aspect-[2/1] overflow-hidden">
            {post.image ? (
              <>
                <Image
                  src={urlFor(post.image)?.width(1200).height(600).url()}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Professional gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent/20 via-primary/20 to-accent/30 flex items-center justify-center">
                <Tag className="w-16 h-16 text-accent opacity-60" />
              </div>
            )}
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              {/* Category badge */}
              {post.categories && post.categories.length > 0 && (
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 text-sm font-semibold">
                    {post.categories[0]}
                  </span>
                </div>
              )}
              
              {/* Title */}
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 group-hover:text-white/90 transition-colors">
                {post.title}
              </h2>
              
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-white/90 text-lg leading-relaxed line-clamp-2 mb-6 max-w-3xl">
                  {post.excerpt}
                </p>
              )}

              {/* Meta row */}
              <div className="flex items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Read more indicator */}
            <div className="absolute top-6 right-6">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug.current}`} className={`group block h-full ${className}`}>
      <article className="h-full bg-card-background border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-2">
        {/* Article Image */}
        <div className="aspect-[16/10] relative overflow-hidden">
          {post.image ? (
            <>
              <Image 
                src={urlFor(post.image)?.width(600).height(375).url()} 
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Sophisticated overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/10 via-primary/10 to-accent/20 flex items-center justify-center">
              <Tag className="w-10 h-10 text-accent opacity-60" />
            </div>
          )}
          
          {/* Category badge overlay */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm text-foreground border border-white/20 px-3 py-1.5 text-xs font-semibold shadow-lg">
                {post.categories[0]}
              </span>
            </div>
          )}
          
          {/* Read indicator */}
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6 h-full flex flex-col">
          {/* Title */}
          <h3 className="font-heading text-xl font-bold text-foreground mb-3 leading-tight line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-foreground-muted leading-relaxed mb-6 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center justify-between text-sm text-foreground-muted pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>5 min</span>
              </div>
            </div>
            
            {post.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span className="font-medium">{post.author}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
