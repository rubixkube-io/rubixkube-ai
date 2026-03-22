'use client'

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowUpRight, Tag, User } from "lucide-react"
import { urlFor } from "@/lib/sanity.client"
import { type SanityDocument } from "next-sanity"

interface BlogCardProps {
  post: SanityDocument
  variant?: 'default' | 'featured' | 'minimal' | 'magazine' | 'compact' | 'hero'
  index?: number
  className?: string
}

export function BlogCardStyles({ post, variant = 'default', className = "" }: BlogCardProps) {

  if (variant === 'hero') {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block ${className}`}>
        <article className="relative overflow-hidden h-[500px] md:h-[600px] border border-[var(--rule)]">
          <div className="absolute inset-0">
            {post.image ? (
              <Image
                src={urlFor(post.image)?.width(1200).height(600).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-[var(--blue)]/5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/80 via-[var(--ink)]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/50 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            {post.categories && post.categories.length > 0 && (
              <div className="mb-6">
                <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-white/70 uppercase">
                  {post.categories[0]}
                </span>
              </div>
            )}
            <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-white mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-white/80 mb-8 max-w-3xl line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-6 font-[family-name:var(--font-mono)] text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>5 min read</span>
              </div>
            </div>
          </div>

          <div className="absolute top-8 right-8">
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </article>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block ${className}`}>
        <article className="grid md:grid-cols-2 gap-0 border border-[var(--rule)] overflow-hidden transition-shadow hover:shadow-md">
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
            {post.image ? (
              <Image
                src={urlFor(post.image)?.width(800).height(600).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-[var(--blue)]/5 flex items-center justify-center">
                <Tag className="w-16 h-16 text-[var(--blue)] opacity-30" />
              </div>
            )}
          </div>

          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-[var(--bg)]">
            {post.categories && post.categories.length > 0 && (
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--blue)] uppercase mb-4 self-start">
                {post.categories[0]}
              </span>
            )}
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.1] text-[var(--ink)] mb-4 group-hover:text-[var(--blue)] transition-colors">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60 mb-6 line-clamp-3">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</time>
              </div>
              <span className="text-[var(--faint)]">&middot;</span>
              <span>5 min read</span>
              {post.author && (
                <>
                  <span className="text-[var(--faint)]">&middot;</span>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.author}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    )
  }

  if (variant === 'minimal') {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block ${className}`}>
        <article className="flex items-start gap-4 md:gap-6 py-5 border-b border-[var(--rule)] last:border-b-0 transition-colors hover:bg-white/50 px-2 -mx-2">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border border-[var(--rule)] bg-[var(--bg)] flex-shrink-0">
            {post.image ? (
              <Image
                src={urlFor(post.image)?.width(160).height(160).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-[var(--blue)]/5 flex items-center justify-center">
                <Tag className="w-6 h-6 text-[var(--blue)] opacity-30" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {post.categories && post.categories.length > 0 && (
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--blue)] uppercase">
                {post.categories[0]}
              </span>
            )}
            <h3
              className="text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)] mt-1 mb-1.5 line-clamp-2 group-hover:text-[var(--blue)] transition-colors"
              style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
            >
              {post.title}
            </h3>
            <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)]">
              <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
              <span className="text-[var(--faint)]">&middot;</span>
              <span>5 min read</span>
              {post.author && (
                <>
                  <span className="text-[var(--faint)]">&middot;</span>
                  <span>{post.author}</span>
                </>
              )}
            </div>
          </div>

          <ArrowUpRight className="w-4 h-4 text-[var(--mid)] group-hover:text-[var(--blue)] transition-colors flex-shrink-0 mt-1" />
        </article>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug.current}`} className={`group block ${className}`}>
        <article className="border border-[var(--rule)] bg-[var(--bg)] p-4 transition-shadow hover:shadow-md">
          {post.categories && post.categories.length > 0 && (
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--blue)] uppercase">
              {post.categories[0]}
            </span>
          )}
          <h4
            className="text-[14px] leading-snug tracking-[-0.02em] text-[var(--ink)] mt-1 mb-2 line-clamp-2 group-hover:text-[var(--blue)] transition-colors"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {post.title}
          </h4>
          <div className="flex items-center justify-between font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)]">
            <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
            <span>5 min</span>
          </div>
        </article>
      </Link>
    )
  }

  // Default card
  return (
    <Link href={`/blog/${post.slug.current}`} className={`group block h-full ${className}`}>
      <article className="h-full border border-[var(--rule)] bg-[var(--bg)] overflow-hidden transition-shadow hover:shadow-md">
        <div className="aspect-[16/10] relative overflow-hidden">
          {post.image ? (
            <Image
              src={urlFor(post.image)?.width(600).height(375).url()}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[var(--blue)]/5 flex items-center justify-center">
              <Tag className="w-10 h-10 text-[var(--blue)] opacity-30" />
            </div>
          )}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-3 left-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-white uppercase bg-[var(--ink)]/60 backdrop-blur-sm px-2.5 py-1">
                {post.categories[0]}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3
            className="text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)] mb-3 line-clamp-2 group-hover:text-[var(--blue)] transition-colors"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)] pt-4 border-t border-[var(--rule)]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time>
              </div>
              <span className="text-[var(--faint)]">&middot;</span>
              <span>5 min</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span style={{ fontWeight: 500 }}>{post.author}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
