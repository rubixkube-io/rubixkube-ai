'use client'

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowUpRight, Tag, User, Bookmark, Share2 } from "lucide-react"
import { urlFor } from "@/lib/sanity.client"
import { type SanityDocument } from "next-sanity"

interface BlogCardProps {
  post: SanityDocument
  variant?: 'default' | 'featured' | 'minimal' | 'magazine' | 'compact' | 'hero'
  index?: number
  className?: string
}

export function BlogCardStyles({ post, variant = 'default', className = "" }: BlogCardProps) {
  
  // Hero Card - Full width background with overlay content
  if (variant === 'hero') {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block ${className}`}>
        <article className="relative rounded-3xl overflow-hidden h-[500px] md:h-[600px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            {post.image ? (
              <Image
                src={urlFor(post.image)?.width(1200).height(600).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent/30 via-primary/30 to-accent/40" />
            )}
            {/* Professional overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            {/* Category */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full border border-border bg-background-secondary px-3 py-1 text-sm font-medium text-foreground">
                  {post.categories[0]}
                </span>
              </div>
            )}
            
            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-white/90 text-xl leading-relaxed mb-8 max-w-3xl line-clamp-2">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time className="text-lg font-medium">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-lg">5 min read</span>
              </div>
            </div>
          </div>
          
          {/* Read indicator */}
          <div className="absolute top-8 right-8">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Featured Card - Large horizontal layout
  if (variant === 'featured') {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block ${className}`}>
        <article className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 bg-card-background border border-border rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
            {post.image ? (
              <Image
                src={urlFor(post.image)?.width(800).height(600).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent/10 via-primary/10 to-accent/20 flex items-center justify-center">
                <Tag className="w-16 h-16 text-accent opacity-60" />
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            {/* Category */}
            {post.categories && post.categories.length > 0 && (
              <span className="inline-flex items-center rounded-full border border-border bg-background-secondary px-3 py-1 text-sm font-medium text-foreground mb-3 sm:mb-4 md:mb-6 self-start">
                {post.categories[0]}
              </span>
            )}
            
            {/* Title */}
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3 sm:mb-4 group-hover:text-accent transition-colors">
              {post.title}
            </h2>
            
            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-foreground-muted text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-foreground-muted">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
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
        </article>
      </Link>
    )
  }

  // Magazine Style - Vertical with large image
  if (variant === 'magazine') {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block h-full ${className}`}>
        <article className="h-full bg-card-background border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
          {/* Large Image */}
          <div className="relative aspect-[3/2] overflow-hidden">
            {post.image ? (
              <Image 
                src={urlFor(post.image)?.width(600).height(400).url()} 
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent/10 via-primary/10 to-accent/20 flex items-center justify-center">
                <Tag className="w-12 h-12 text-accent opacity-60" />
              </div>
            )}
            
            {/* Category overlay */}
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center rounded-full border border-border bg-background-secondary px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
                  {post.categories[0]}
                </span>
              </div>
            )}
            
            {/* Actions overlay */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all">
                <Bookmark className="w-4 h-4 text-white" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all">
                <Share2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col h-full">
            {/* Title */}
            <h3 className="font-heading text-xl font-bold text-foreground mb-3 leading-tight line-clamp-2 group-hover:text-accent transition-colors">
              {post.title}
            </h3>
            
            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-foreground-muted leading-relaxed mb-6 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-foreground-muted pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span>5 min read</span>
              </div>
              
              <ArrowUpRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Minimal Style - Clean and simple
  if (variant === 'minimal') {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block ${className}`}>
        <article className="p-3 sm:p-4 md:p-6 border-b border-border last:border-b-0 transition-all duration-200 hover:bg-card-background/50">
          <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
            {/* Small thumbnail */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden bg-card-background border border-border flex-shrink-0">
              {post.image ? (
                <Image 
                  src={urlFor(post.image)?.width(160).height(160).url()} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                  <Tag className="w-6 h-6 text-accent opacity-60" />
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Category */}
              {post.categories && post.categories.length > 0 && (
                <span className="inline-block text-accent text-sm font-medium mb-2">
                  {post.categories[0]}
                </span>
              )}
              
              {/* Title */}
              <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mb-1 sm:mb-2 leading-tight line-clamp-2 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-foreground-muted">
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
                <span>5 min read</span>
                {post.author && <span>by {post.author}</span>}
              </div>
            </div>
            
            {/* Arrow */}
            <ArrowUpRight className="w-5 h-5 text-foreground-muted group-hover:text-accent transition-colors flex-shrink-0" />
          </div>
        </article>
      </Link>
    )
  }

  // Compact Style - Small card for sidebar
  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block ${className}`}>
        <article className="bg-card-background border border-border rounded-xl p-4 transition-all duration-200 hover:border-accent/30 hover:shadow-md">
          {/* Category */}
          {post.categories && post.categories.length > 0 && (
            <span className="inline-block text-accent text-xs font-medium mb-2">
              {post.categories[0]}
            </span>
          )}
          
          {/* Title */}
          <h4 className="font-heading text-sm font-bold text-foreground mb-2 leading-tight line-clamp-2 group-hover:text-accent transition-colors">
            {post.title}
          </h4>
          
          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-foreground-muted">
            <time>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </time>
            <span>5 min</span>
          </div>
        </article>
      </Link>
    )
  }

  // Default Style - Standard card
  return (
    <Link href={`/blog/${post.slug.current}`} className={`group block h-full ${className}`}>
      <article className="h-full bg-card-background border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
        {/* Cover Image */}
        <div className="aspect-[16/10] relative overflow-hidden">
          {post.image ? (
            <Image 
              src={urlFor(post.image)?.width(600).height(375).url()} 
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/10 via-primary/10 to-accent/20 flex items-center justify-center">
              <Tag className="w-10 h-10 text-accent opacity-60" />
            </div>
          )}
          
          {/* Category badge */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center rounded-full border border-border bg-background-secondary px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
                {post.categories[0]}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* Title */}
          <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3 leading-tight line-clamp-2 group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm sm:text-base text-foreground-muted leading-relaxed mb-3 sm:mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-foreground-muted pt-3 sm:pt-4 border-t border-border gap-2">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <span>•</span>
              <span>5 min</span>
            </div>
            
            {post.author && (
              <div className="flex items-center gap-1 sm:gap-1.5">
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
