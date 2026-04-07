'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { ArrowRight, Check, X, Minus, ChevronDown, ChevronRight } from 'lucide-react'

/* ─────────────────────────────────────────────
   Content block types — mixed editorial + marketing
   ───────────────────────────────────────────── */

interface ProseBlock {
  _type: 'prose'
  id: string
  heading: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[]
}

interface HighlightBlock {
  _type: 'highlight'
  heading?: string
  body?: string
}

interface StatsBlock {
  _type: 'stats'
  items?: { value?: string; label?: string }[]
}

interface ComparisonBlock {
  _type: 'comparison'
  id: string
  heading?: string
  usLabel?: string
  themLabel?: string
  rows?: { feature?: string; us?: true | false | 'partial' | string; them?: true | false | 'partial' | string }[]
}

interface SplitBlock {
  _type: 'split'
  id: string
  heading?: string
  body?: string
  imageSrc?: string
  imageAlt?: string
  layout?: 'imageLeft' | 'imageRight'
  bullets?: string[]
}

interface ImageBlock {
  _type: 'imageBlock'
  id: string
  src?: string
  alt?: string
  caption?: string
  aspectRatio?: '16/9' | '4/3' | 'auto'
}

interface CardsBlock {
  _type: 'cards'
  id: string
  heading?: string
  items?: { title?: string; body?: string }[]
}

interface QuoteBlock {
  _type: 'quote'
  text?: string
  attribution?: string
  role?: string
}

interface FaqBlock {
  _type: 'faq'
  id: string
  heading?: string
  items?: { question?: string; answer?: string }[]
}

interface InlineCtaBlock {
  _type: 'inlineCta'
  heading?: string
  body?: string
  cta?: { label?: string; href?: string }
}

interface ChecklistBlock {
  _type: 'checklist'
  id: string
  heading?: string
  body?: string
  items?: string[]
}

export type ContentBlock =
  | ProseBlock
  | HighlightBlock
  | StatsBlock
  | ComparisonBlock
  | SplitBlock
  | CardsBlock
  | QuoteBlock
  | FaqBlock
  | InlineCtaBlock
  | ImageBlock
  | ChecklistBlock

export interface ReferencePage {
  category: string
  categoryLabel: string
  title: string
  titleAccent?: string
  subtitle: string
  lastUpdated?: string
  readingTime?: string
  heroImage?: {
    src?: string
    alt: string
    caption?: string
  }
  blocks: ContentBlock[]
  relatedPages?: { label: string; href: string; category?: string }[]
}

/* ─────────────────────────────────────────────
   Shared
   ───────────────────────────────────────────── */

function FeatureCell({ value }: { value: true | false | 'partial' | string }) {
  if (value === true || value === 'true') return <Check className="mx-auto h-5 w-5 text-[var(--blue)]" strokeWidth={2} />
  if (value === false || value === 'false') return <X className="mx-auto h-5 w-5 text-[var(--mid)]/40" strokeWidth={1.5} />
  if (value === 'partial') return <Minus className="mx-auto h-5 w-5 text-[var(--mid)]/60" strokeWidth={1.5} />
  return <span className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--mid)]">{value}</span>
}

/* ─────────────────────────────────────────────
   Shared helpers
   ───────────────────────────────────────────── */

function textToId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/* ─────────────────────────────────────────────
   Sticky TOC
   ───────────────────────────────────────────── */

interface TocEntry { id: string; text: string; level: 2 | 3 }

function TOC({ headings, activeId }: { headings: TocEntry[]; activeId: string }) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (headings.length === 0) return null

  const renderItem = (h: TocEntry, onClickExtra?: () => void) => (
    <li key={h.id}>
      <button
        onClick={() => { scrollTo(h.id); onClickExtra?.() }}
        className={`block w-full text-left font-[family-name:var(--font-mono)] font-light leading-snug transition-colors ${
          h.level === 3 ? 'pl-7 text-[11px]' : 'pl-4 text-[12px]'
        } ${
          activeId === h.id
            ? 'text-[var(--blue)] border-l-2 border-[var(--blue)] -ml-px'
            : 'text-[var(--mid)] hover:text-[var(--ink)]'
        }`}
      >
        {h.text}
      </button>
    </li>
  )

  return (
    <>
      <nav className="hidden lg:block sticky top-[calc(var(--nav-stack)+2rem)] self-start">
        <span className="mb-4 block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
          On this page
        </span>
        <ul className="space-y-2 border-l border-[var(--rule)]">
          {headings.map((h) => renderItem(h))}
        </ul>
      </nav>

      <details className="lg:hidden border border-[var(--rule)] rounded-[6px] mb-10">
        <summary className="flex cursor-pointer items-center justify-between px-5 py-3 font-[family-name:var(--font-mono)] text-[12px] font-light tracking-[0.1em] text-[var(--mid)] uppercase">
          On this page
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </summary>
        <ul className="space-y-1 px-5 pb-4">
          {headings.map((h) => renderItem(h, () => {
            const el = document.querySelector('details[open]') as HTMLDetailsElement | null
            if (el) el.open = false
          }))}
        </ul>
      </details>
    </>
  )
}

/* ─────────────────────────────────────────────
   Block renderers
   ───────────────────────────────────────────── */

function ProseRenderer({ block, anim }: { block: ProseBlock; anim: object }) {
  const proseComponents: PortableTextComponents = {
    block: {
      normal: ({children}) => (
        <p className="mt-5 first:mt-0">{children}</p>
      ),
      h3: ({children, value}) => {
        const text = (value?.children || []).map((c: {text?: string}) => c.text || '').join('')
        const id = text ? textToId(text) : undefined
        return (
          <h3 id={id} className="mt-10 scroll-mt-[calc(var(--nav-stack)+2rem)] font-[family-name:var(--font-serif)] text-[clamp(1.12rem,1.9vw,1.35rem)] leading-[1.25] font-light tracking-[-0.01em] text-[var(--ink)]">
            {children}
          </h3>
        )
      },
      h4: ({children}) => (
        <h4 className="mt-8 font-[family-name:var(--font-serif)] text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.3] font-medium text-[var(--ink)]">
          {children}
        </h4>
      ),
      blockquote: ({children}) => (
        <blockquote className="mt-8 border-l-2 border-[var(--blue)] pl-5 font-[family-name:var(--font-serif)] text-[1.05rem] italic leading-[1.6] text-[var(--ink)]">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}) => <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>,
      number: ({children}) => <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>,
    },
    listItem: {
      bullet: ({children}) => <li>{children}</li>,
      number: ({children}) => <li>{children}</li>,
    },
    marks: {
      strong: ({children}) => <strong className="font-medium text-[var(--ink)]">{children}</strong>,
      em: ({children}) => <em>{children}</em>,
      code: ({children}) => (
        <code className="rounded bg-[var(--background-secondary)] px-1.5 py-0.5 text-[0.92em] text-[var(--ink)]">
          {children}
        </code>
      ),
      link: ({children, value}) => (
        <a href={value?.href} className="text-[var(--blue)] underline underline-offset-4" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  }

  return (
    <div id={block.id} className="mb-20 last:mb-0 scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.div variants={fadeUpVariants} {...anim}>
        {block.heading ? (
          <h2 className="mb-5 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.5vw,1.85rem)] leading-[1.15] font-light tracking-[-0.01em] text-[var(--ink)]">
            {block.heading}
          </h2>
        ) : null}
        <div className="font-[family-name:var(--font-mono)] text-[14px] font-light leading-[1.9] text-[var(--mid)] min-[1920px]:text-[16px]">
          <PortableText value={block.body} components={proseComponents} />
        </div>
      </motion.div>
    </div>
  )
}

function HighlightRenderer({ block, anim }: { block: HighlightBlock; anim: object }) {
  return (
    <motion.div variants={fadeUpVariants} {...anim} className="mb-20">
      <div className="rounded-[6px] border border-[var(--blue)]/15 bg-[var(--blue)]/[0.025] px-7 py-6 sm:px-9 sm:py-8">
        {block.heading && (
          <h3 className="mb-2 font-[family-name:var(--font-serif)] text-[clamp(1.1rem,2vw,1.35rem)] font-light text-[var(--ink)]">
            {block.heading}
          </h3>
        )}
        <p className="font-[family-name:var(--font-mono)] text-[14px] font-light leading-[1.85] text-[var(--mid)] min-[1920px]:text-[16px]">
          {block.body}
        </p>
      </div>
    </motion.div>
  )
}

function StatsRenderer({ block, anim, prefersReducedMotion }: { block: StatsBlock; anim: object; prefersReducedMotion: boolean }) {
  return (
    <motion.div variants={fadeUpVariants} {...anim} className="mb-20">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 rounded-[6px] border border-[var(--rule)] bg-[var(--background-secondary)] px-6 py-8 sm:px-8 sm:py-10">
        {block.items.map((item, i) => (
          <motion.div
            key={item.label}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: i * 0.06 } })}
            className="text-center"
          >
            <span className="block font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4vw,2.75rem)] leading-[1] font-light text-[var(--blue)]">
              {item.value}
            </span>
            <span className="mt-2 block font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.08em] text-[var(--mid)] uppercase">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ComparisonRenderer({ block, anim }: { block: ComparisonBlock; anim: object }) {
  const rows = block.rows || []
  return (
    <div id={block.id} className="mb-20 scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.div variants={fadeUpVariants} {...anim}>
        {block.heading && (
          <h2 className="mb-8 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.5vw,1.85rem)] leading-[1.15] font-light tracking-[-0.01em] text-[var(--ink)]">
            {block.heading}
          </h2>
        )}
        <div className="overflow-x-auto rounded-[6px] border border-[var(--rule)]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--rule)] bg-[var(--background-secondary)]">
                <th className="py-3 px-5 font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.12em] text-[var(--mid)] uppercase">Feature</th>
                <th className="py-3 px-4 text-center font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.12em] text-[var(--blue)] uppercase">{block.usLabel || 'Us'}</th>
                <th className="py-3 px-4 text-center font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.12em] text-[var(--mid)] uppercase">{block.themLabel || 'Them'}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-[var(--rule)]/50 last:border-b-0">
                  <td className="py-3 px-5 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)] min-[1920px]:text-[15px]">{row.feature}</td>
                  <td className="py-3 px-4 text-center"><FeatureCell value={row.us ?? ''} /></td>
                  <td className="py-3 px-4 text-center"><FeatureCell value={row.them ?? ''} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

function SplitRenderer({ block, anim }: { block: SplitBlock; anim: object }) {
  const imageRight = block.layout !== 'imageLeft'
  return (
    <div id={block.id} className="mb-20 scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.div variants={fadeUpVariants} {...anim}>
        <div className={`grid items-start gap-8 md:grid-cols-2 md:gap-12`}>
          <div className={imageRight ? '' : 'md:order-2'}>
            {block.heading && (
              <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.5vw,1.85rem)] leading-[1.15] font-light tracking-[-0.01em] text-[var(--ink)]">
                {block.heading}
              </h2>
            )}
            {block.body && (
              <p className="font-[family-name:var(--font-mono)] text-[14px] font-light leading-[1.85] text-[var(--mid)] min-[1920px]:text-[16px]">
                {block.body}
              </p>
            )}
            {block.bullets && block.bullets.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {block.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue)]" strokeWidth={2} />
                    <span className="font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)] min-[1920px]:text-[15px]">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={`relative aspect-[4/3] overflow-hidden rounded-[8px] border border-[var(--rule)] bg-[var(--background-secondary)] shadow-sm ${imageRight ? '' : 'md:order-1'}`}>
            {block.imageSrc ? (
              <Image src={block.imageSrc} alt={block.imageAlt || ''} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
                <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em] text-[var(--mid)]/30 uppercase">
                  {block.imageAlt || 'Image'}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function ChecklistRenderer({ block, anim }: { block: ChecklistBlock; anim: object }) {
  return (
    <div id={block.id} className="mb-20 scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.div variants={fadeUpVariants} {...anim}>
        {block.heading && (
          <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.5vw,1.85rem)] leading-[1.15] font-light tracking-[-0.01em] text-[var(--ink)]">
            {block.heading}
          </h2>
        )}
        {block.body && (
          <p className="mb-6 font-[family-name:var(--font-mono)] text-[14px] font-light leading-[1.9] text-[var(--mid)] min-[1920px]:text-[16px]">
            {block.body}
          </p>
        )}
        {block.items && block.items.length > 0 && (
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue)]" strokeWidth={2} />
                <span className="font-[family-name:var(--font-mono)] text-[14px] font-light leading-[1.75] text-[var(--ink)] min-[1920px]:text-[16px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  )
}

function CardsRenderer({ block, anim, prefersReducedMotion }: { block: CardsBlock; anim: object; prefersReducedMotion: boolean }) {
  const items = block.items || []
  return (
    <div id={block.id} className="mb-20 scroll-mt-[calc(var(--nav-stack)+2rem)]">
      {block.heading && (
        <motion.div variants={fadeUpVariants} {...anim}>
          <h2 className="mb-8 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.5vw,1.85rem)] leading-[1.15] font-light tracking-[-0.01em] text-[var(--ink)]">
            {block.heading}
          </h2>
        </motion.div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: i * 0.05 } })}
            className="rounded-[6px] border border-[var(--rule)] bg-[var(--background-secondary)] p-6"
          >
            <h3 className="mb-2 font-[family-name:var(--font-serif)] text-[clamp(1rem,1.5vw,1.2rem)] font-light text-[var(--ink)]">{item.title}</h3>
            <p className="font-[family-name:var(--font-mono)] text-[13px] font-light leading-relaxed text-[var(--mid)] min-[1920px]:text-[15px]">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function QuoteRenderer({ block, anim }: { block: QuoteBlock; anim: object }) {
  return (
    <motion.div variants={fadeUpVariants} {...anim} className="mb-20">
      <div className="border-l-2 border-[var(--blue)] pl-6 sm:pl-8">
        {block.text && (
          <p className="mb-4 font-[family-name:var(--font-serif)] text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.4] font-light text-[var(--ink)]">
            &ldquo;{block.text}&rdquo;
          </p>
        )}
        {(block.attribution || block.role) && (
          <div>
            {block.attribution && (
              <span className="font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)]">{block.attribution}</span>
            )}
            {block.role && (
              <span className="ml-2 font-[family-name:var(--font-mono)] text-[12px] font-light text-[var(--mid)]">— {block.role}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function FaqRenderer({ block, anim }: { block: FaqBlock; anim: object }) {
  const items = block.items || []
  return (
    <div id={block.id} className="mb-20 scroll-mt-[calc(var(--nav-stack)+2rem)]">
      {block.heading && (
        <motion.div variants={fadeUpVariants} {...anim}>
          <h2 className="mb-10 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.5vw,1.85rem)] leading-[1.15] font-light tracking-[-0.01em] text-[var(--ink)]">
            {block.heading}
          </h2>
        </motion.div>
      )}

      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={fadeUpVariants}
          {...anim}
          className={`py-7 ${i !== 0 ? 'border-t border-[var(--rule)]' : ''}`}
        >
          <h3 className="mb-2.5 font-[family-name:var(--font-serif)] text-[clamp(1.05rem,1.8vw,1.25rem)] font-light leading-[1.25] text-[var(--ink)]">
            {item.question}
          </h3>
          <p className="font-[family-name:var(--font-mono)] text-[14px] font-light leading-[1.75] text-[var(--mid)] min-[1920px]:text-[16px]">
            {item.answer}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

function InlineCtaRenderer({ block, anim }: { block: InlineCtaBlock; anim: object }) {
  return (
    <motion.div variants={fadeUpVariants} {...anim} className="mb-20">
      <div className="rounded-[6px] border border-[var(--blue)]/15 bg-[var(--blue)]/[0.025] px-7 py-8 sm:px-9 sm:py-10 text-center">
        {block.heading && (
          <h3 className="mb-2 font-[family-name:var(--font-serif)] text-[clamp(1.15rem,2vw,1.5rem)] font-light text-[var(--ink)]">
            {block.heading}
          </h3>
        )}
        {block.body && (
          <p className="mx-auto mb-6 max-w-[50ch] font-[family-name:var(--font-mono)] text-[13px] font-light leading-relaxed text-[var(--mid)]">
            {block.body}
          </p>
        )}
        {block.cta?.href && (
          <Link
            href={block.cta.href}
            className="inline-flex items-center gap-2 rounded-[6px] bg-[var(--blue)] px-6 py-3 font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-white uppercase transition-colors hover:bg-blue-700"
          >
            {block.cta.label || 'Get started'}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        )}
      </div>
    </motion.div>
  )
}

function ImageRenderer({ block, anim }: { block: ImageBlock; anim: object }) {
  return (
    <div id={block.id} className="mb-20 scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.figure variants={fadeUpVariants} {...anim} className="m-0">
        {block.src && (
          <Image
            src={block.src}
            alt={block.alt}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        )}
        {block.caption && (
          <figcaption className="mt-3 text-center font-[family-name:var(--font-mono)] text-[13px] font-light leading-relaxed text-[var(--mid)]">
            {block.caption}
          </figcaption>
        )}
      </motion.figure>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main
   ───────────────────────────────────────────── */

export function ReferencePageClient({ page }: { page: ReferencePage }) {
  const prefersReducedMotion = useReducedMotion()
  const anim = prefersReducedMotion ? { initial: 'visible' as const } : fadeUp
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeId, setActiveId] = useState('')

  const tocHeadings = useMemo<TocEntry[]>(() => {
    const entries: TocEntry[] = []
    for (const block of page.blocks) {
      if (block._type === 'prose') {
        if (block.heading && block.id) {
          entries.push({ id: block.id, text: block.heading, level: 2 })
        }
        for (const node of block.body || []) {
          if (node._type === 'block' && node.style === 'h3') {
            const text = (node.children || []).map((c: {text?: string}) => c.text || '').join('')
            if (text) entries.push({ id: textToId(text), text, level: 3 })
          }
        }
      } else if ('id' in block && 'heading' in block && block.heading && block._type !== 'highlight' && block._type !== 'stats' && block._type !== 'quote' && block._type !== 'inlineCta') {
        entries.push({ id: (block as {id: string}).id, text: block.heading as string, level: 2 })
      }
    }
    return entries
  }, [page.blocks])

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids = tocHeadings.map((h) => h.id)
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setActiveId(e.target.id) },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0 },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [tocHeadings])

  return (
    <>
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[var(--rule)]">
        <div className="h-full bg-[var(--blue)] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Navbar />

      {/* ── Hero header ── */}
      <header className="bg-[var(--bg)] px-[var(--pad)] pt-[calc(var(--nav-stack)+4.5rem)] pb-16 sm:pb-20">
        <div className="rk-landing-max">
          <motion.nav
            className="mb-6 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--faint)]"
            variants={fadeUpVariants} initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible"
          >
            <Link href="/" className="transition-colors hover:text-[var(--mid)]">Home</Link>
            <span>/</span>
            <span className="text-[var(--mid)]">{page.categoryLabel}</span>
          </motion.nav>

          <motion.div variants={fadeUpVariants} initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible">
            <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              {page.categoryLabel}
            </span>
          </motion.div>

          <motion.h1
            className="mb-5 max-w-4xl font-[family-name:var(--font-serif)] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.08] font-light tracking-[-0.015em] text-[var(--ink)]"
            variants={fadeUpVariants} initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible"
          >
            {page.titleAccent && page.title.includes(page.titleAccent) ? (
              <>
                {page.title.split(page.titleAccent)[0]}
                <span className="italic text-[var(--blue)]">{page.titleAccent}</span>
                {page.title.split(page.titleAccent)[1]}
              </>
            ) : page.title}
          </motion.h1>

          <motion.p
            className="mb-10 max-w-4xl whitespace-pre-line font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)] min-[1920px]:text-[17px]"
            variants={fadeUpVariants} initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible"
          >
            {page.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4 font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)]"
            variants={fadeUpVariants} initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible"
          >
            {page.lastUpdated && <span>Updated {page.lastUpdated}</span>}
            {page.readingTime && <><span className="text-[var(--faint)]">·</span><span>{page.readingTime}</span></>}
          </motion.div>

          {page.heroImage && (
            <motion.div
              variants={fadeUpVariants}
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              animate="visible"
              className="mt-12 sm:mt-16"
            >
              <figure className="m-0">
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--background-secondary)] shadow-sm">
                  {page.heroImage.src ? (
                    <Image src={page.heroImage.src} alt={page.heroImage.alt} fill className="object-cover" priority />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
                      <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em] text-[var(--mid)]/30 uppercase">
                        {page.heroImage.alt || 'Cover Image'}
                      </span>
                    </div>
                  )}
                </div>
                {page.heroImage.caption && (
                  <figcaption className="mt-4 text-center font-[family-name:var(--font-mono)] text-[13px] font-light leading-relaxed text-[var(--mid)]">
                    {page.heroImage.caption}
                  </figcaption>
                )}
              </figure>
            </motion.div>
          )}
        </div>
      </header>

      <div className="border-t border-[var(--rule)]" />

      {/* ── Body ── */}
      <section className="bg-[var(--bg)] px-[var(--pad)] py-16 sm:py-20">
        <div className="rk-landing-max grid gap-12 lg:grid-cols-[1fr_200px] xl:gap-16">
          {/* Content column */}
          <article className="min-w-0">
            {page.blocks.map((block, i) => {
              switch (block._type) {
                case 'prose': return <ProseRenderer key={i} block={block} anim={anim} />
                case 'highlight': return <HighlightRenderer key={i} block={block} anim={anim} />
                case 'stats': return <StatsRenderer key={i} block={block} anim={anim} prefersReducedMotion={prefersReducedMotion} />
                case 'comparison': return <ComparisonRenderer key={i} block={block} anim={anim} />
                case 'split': return <SplitRenderer key={i} block={block} anim={anim} />
                case 'checklist': return <ChecklistRenderer key={i} block={block} anim={anim} />
                case 'cards': return <CardsRenderer key={i} block={block} anim={anim} prefersReducedMotion={prefersReducedMotion} />
                case 'quote': return <QuoteRenderer key={i} block={block} anim={anim} />
                case 'faq': return <FaqRenderer key={i} block={block} anim={anim} />
                case 'inlineCta': return <InlineCtaRenderer key={i} block={block} anim={anim} />
                case 'imageBlock': return <ImageRenderer key={i} block={block} anim={anim} />
              }
            })}
          </article>

          {/* TOC sidebar */}
          <TOC headings={tocHeadings} activeId={activeId} />
        </div>
      </section>

      {/* ── Related ── */}
      {page.relatedPages && page.relatedPages.length > 0 && (
        <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] px-[var(--pad)] py-16">
          <div className="rk-landing-max">
            <span className="mb-6 block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              Continue reading
            </span>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.relatedPages.map((rp) => (
                <Link
                  key={rp.href}
                  href={rp.href}
                  className="group flex items-center justify-between rounded-[6px] border border-[var(--rule)] bg-[var(--bg)] px-5 py-4 transition-colors hover:border-[var(--mid)]"
                >
                  <div>
                    {rp.category && (
                      <span className="mb-1 block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] text-[var(--blue)] uppercase">{rp.category}</span>
                    )}
                    <span className="font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)] min-[1920px]:text-[15px]">{rp.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[var(--mid)] transition-colors group-hover:text-[var(--blue)]" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCTA />
      <Footer />
    </>
  )
}
