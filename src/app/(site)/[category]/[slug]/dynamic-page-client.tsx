'use client'

import { useState, useEffect, useMemo, type ComponentProps } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { ArrowRight, Check, X, Minus, ChevronDown } from 'lucide-react'
import { ShareLinks } from '@/components/blog/share-links'
import { splitTitle } from '@/lib/title-split'

type PortableTextValue = NonNullable<ComponentProps<typeof PortableText>['value']>

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
  /** Portable text or legacy plain string from Sanity */
  body?: string | unknown[]
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
  body?: string | unknown[]
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
  items?: { title?: string; body?: string | unknown[] }[]
}

interface QuoteBlock {
  _type: 'quote'
  /** Portable text or legacy plain string */
  text?: string | unknown[]
  attribution?: string
  role?: string
}

interface FaqBlock {
  _type: 'faq'
  id: string
  heading?: string
  items?: { question?: string; answer?: string | unknown[] }[]
}

interface InlineCtaBlock {
  _type: 'inlineCta'
  heading?: string
  body?: string | unknown[]
  cta?: { label?: string; href?: string }
}

interface ChecklistBlock {
  _type: 'checklist'
  id: string
  heading?: string
  body?: string | unknown[]
  items?: string[]
}

interface MarkdownSectionBlock {
  _type: 'markdownSection'
  id: string
  caption?: string
  content?: string
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
  | MarkdownSectionBlock

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
  if (value === true || value === 'true') return <Check className="mx-auto h-5 w-5 text-[var(--ink)]" strokeWidth={2} />
  if (value === false || value === 'false') return <X className="mx-auto h-5 w-5 text-[var(--mid)]/40" strokeWidth={1.5} />
  if (value === 'partial') return <Minus className="mx-auto h-5 w-5 text-[var(--mid)]/60" strokeWidth={1.5} />
  return <span className="font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]">{value}</span>
}

/* ─────────────────────────────────────────────
   Shared helpers
   ───────────────────────────────────────────── */

function textToId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/** Shared portable text (matches Sanity reference page blocks + nested custom block bodies). */
const referencePagePortableComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="mt-5 first:mt-0">{children}</p>,
    h2: ({children, value}) => {
      const text = (value?.children || [])
        .map((c) => (typeof c === 'object' && c !== null && 'text' in c ? String((c as { text?: string }).text ?? '') : ''))
        .join('')
      const id = text ? textToId(text) : undefined
      return (
        <h2
          id={id}
          className="rk-section-title mt-12 scroll-mt-[calc(var(--nav-stack)+2rem)] text-[clamp(1.3rem,1.8vw,1.5rem)] leading-[1.25] tracking-[-0.02em] text-[var(--ink)]"
        >
          {children}
        </h2>
      )
    },
    h3: ({children, value}) => {
      const text = (value?.children || [])
        .map((c) => (typeof c === 'object' && c !== null && 'text' in c ? String((c as { text?: string }).text ?? '') : ''))
        .join('')
      const id = text ? textToId(text) : undefined
      return (
        <h3 id={id} className="rk-section-title mt-10 scroll-mt-[calc(var(--nav-stack)+2rem)] text-[1.2rem] leading-[1.3] tracking-[-0.015em] text-[var(--ink)]">
          {children}
        </h3>
      )
    },
    h4: ({children}) => (
      <h4 className="rk-section-title mt-8 text-[1.05rem] leading-[1.35] tracking-[-0.01em] text-[var(--ink)]">
        {children}
      </h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="mt-8 border-l border-[var(--rule)] pl-6 font-[family-name:var(--font-serif)] text-[1.45rem] italic leading-[1.4] text-[var(--mid)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-[var(--mid)]">{children}</ul>,
    number: ({children}) => <ol className="mt-5 list-decimal space-y-2 pl-6 marker:text-[var(--mid)]">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li>{children}</li>,
    number: ({children}) => <li>{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold text-[var(--ink)]">{children}</strong>,
    em: ({children}) => <em>{children}</em>,
    underline: ({children}) => <u className="underline underline-offset-2">{children}</u>,
    'strike-through': ({children}) => <s className="text-[var(--mid)]">{children}</s>,
    code: ({children}) => (
      <code className="rounded bg-[var(--background-secondary)] px-1.5 py-0.5 text-[0.92em] text-[var(--ink)]">{children}</code>
    ),
    link: ({children, value}) => (
      <a href={value?.href} className="text-[var(--blue)] underline underline-offset-4" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

function FormattedInline({
  value,
  className,
}: {
  value?: string | unknown[] | null
  className?: string
}) {
  if (value == null) return null
  if (typeof value === 'string') {
    if (!value.trim()) return null
    return <p className={className}>{value}</p>
  }
  if (Array.isArray(value) && value.length > 0) {
    return (
      <div className={className}>
        <PortableText value={value as PortableTextValue} components={referencePagePortableComponents} />
      </div>
    )
  }
  return null
}

/* ─────────────────────────────────────────────
   Sticky TOC
   ───────────────────────────────────────────── */

interface TocEntry { id: string; text: string; level: 2 | 3 }

function TOC({ headings, activeId, mobile = false }: { headings: TocEntry[]; activeId: string; mobile?: boolean }) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  headings = headings.filter((h) => h.level === 2)
  if (headings.length < 2) return null

  const renderItem = (h: TocEntry, onClickExtra?: () => void) => (
    <li key={h.id}>
      <button
        onClick={() => { scrollTo(h.id); onClickExtra?.() }}
        className={`-ml-px block w-full cursor-pointer border-l py-0.5 pl-4 text-left font-[family-name:var(--font-figtree)] text-[14px] leading-[1.45] transition-colors ${
          activeId === h.id
            ? 'border-[var(--ink)] text-[var(--ink)]'
            : 'border-transparent text-[var(--mid)] hover:text-[var(--ink)]'
        }`}
      >
        {h.text}
      </button>
    </li>
  )

  if (!mobile)
    return (
      <nav aria-label="On this page" className="sticky top-[calc(var(--nav-stack)+2rem)]">
        <p className="m-0 mb-3 font-[family-name:var(--font-figtree)] text-[14px] text-[var(--ink)]">On this page</p>
        <ul className="m-0 max-h-[calc(100vh-var(--nav-stack)-8rem)] list-none space-y-2 overflow-y-auto border-l border-[var(--rule)] p-0">
          {headings.map((h) => renderItem(h))}
        </ul>
      </nav>
    )

  return (
      <details className="mb-2 border-b border-[var(--rule)] 2xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--ink)]">
          On this page
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </summary>
        <ul className="m-0 list-none space-y-1 p-0 pb-4">
          {headings.map((h) => renderItem(h, () => {
            const el = document.querySelector('details[open]') as HTMLDetailsElement | null
            if (el) el.open = false
          }))}
        </ul>
      </details>
  )
}

/* ─────────────────────────────────────────────
   Block renderers
   (Vertical rhythm between blocks: parent <article className="... gap-*">)
   ───────────────────────────────────────────── */

function ProseRenderer({ block, anim }: { block: ProseBlock; anim: object }) {
  const hasBody = Array.isArray(block.body) && block.body.length > 0
  return (
    <div id={block.id} className="scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.div variants={fadeUpVariants} {...anim}>
        {block.heading ? (
          <h2
            className={`${'rk-section-title text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]'} ${hasBody ? 'mb-4' : 'mb-6'}`}
          >
            {block.heading}
          </h2>
        ) : null}
        {hasBody ? (
          <div className="font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]">
            <PortableText value={block.body} components={referencePagePortableComponents} />
          </div>
        ) : null}
      </motion.div>
    </div>
  )
}

function HighlightRenderer({ block, anim }: { block: HighlightBlock; anim: object }) {
  const bodyClass =
    'font-[family-name:var(--font-figtree)] font-normal text-[19px] leading-[1.6] text-[var(--ink)]'
  return (
    <motion.div variants={fadeUpVariants} {...anim}>
      <div className="border-l border-[var(--ink)] py-1 pl-6 sm:pl-8">
        {block.heading && (
          <p className="m-0 mb-3 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase">
            {block.heading}
          </p>
        )}
        <FormattedInline value={block.body} className={bodyClass} />
      </div>
    </motion.div>
  )
}

function StatsRenderer({ block, anim, prefersReducedMotion }: { block: StatsBlock; anim: object; prefersReducedMotion: boolean }) {
  return (
    <motion.div variants={fadeUpVariants} {...anim}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-[var(--rule)] py-8 sm:grid-cols-4">
        {(block.items ?? []).map((item, i) => (
          <motion.div
            key={item.label}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: i * 0.06 } })}
            className="text-left"
          >
            <span className="block font-[family-name:var(--font-mono)] text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1] tracking-[-0.05em] text-[var(--ink)]">
              {item.value}
            </span>
            <span className="mt-3 block font-[family-name:var(--font-figtree)] text-[14px] leading-[1.4] text-[var(--mid)]">
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
    <div id={block.id} className="scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.div variants={fadeUpVariants} {...anim}>
        {block.heading && (
          <h2 className="rk-section-title text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)] mb-8">
            {block.heading}
          </h2>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--ink)]">
                <th className="py-3 pr-5 font-[family-name:var(--font-mono)] text-[12px] font-light tracking-[0.12em] text-[var(--mid)] uppercase">Feature</th>
                <th className="py-3 px-4 text-center font-[family-name:var(--font-mono)] text-[12px] font-light tracking-[0.12em] text-[var(--ink)] uppercase">{block.usLabel || 'Us'}</th>
                <th className="py-3 px-4 text-center font-[family-name:var(--font-mono)] text-[12px] font-light tracking-[0.12em] text-[var(--mid)] uppercase">{block.themLabel || 'Them'}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-[var(--rule)]">
                  <td className="py-3.5 pr-5 font-[family-name:var(--font-figtree)] text-[16px] text-[var(--ink)]">{row.feature}</td>
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
    <div id={block.id} className="scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.div variants={fadeUpVariants} {...anim}>
        <div className={`grid items-start gap-8 md:grid-cols-2 md:gap-12`}>
          <div className={imageRight ? '' : 'md:order-2'}>
            {block.heading && (
              <h2 className="rk-section-title text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)] mb-4">
                {block.heading}
              </h2>
            )}
            <FormattedInline
              value={block.body}
              className="font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]"
            />
            {block.bullets && block.bullets.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {block.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="mt-1.5 h-4 w-4 shrink-0 text-[var(--ink)]" strokeWidth={2} />
                    <span className="font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--panel)] ${imageRight ? '' : 'md:order-1'}`}>
            {block.imageSrc ? (
              <Image src={block.imageSrc} alt={block.imageAlt || ''} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]">
                <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.12em] text-[var(--mid)]/30 uppercase">
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
    <div id={block.id} className="scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.div variants={fadeUpVariants} {...anim}>
        {block.heading && (
          <h2 className="rk-section-title text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)] mb-4">
            {block.heading}
          </h2>
        )}
        {block.body != null &&
          (typeof block.body === 'string'
            ? block.body.trim()
            : Array.isArray(block.body) && block.body.length > 0) && (
          <div className="mb-6">
            <FormattedInline
              value={block.body}
              className="font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]"
            />
          </div>
        )}
        {block.items && block.items.length > 0 && (
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-1.5 h-4 w-4 shrink-0 text-[var(--ink)]" strokeWidth={2} />
                <span className="font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]">
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
    <div id={block.id} className="scroll-mt-[calc(var(--nav-stack)+2rem)]">
      {block.heading && (
        <motion.div variants={fadeUpVariants} {...anim}>
          <h2 className="rk-section-title text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)] mb-8">
            {block.heading}
          </h2>
        </motion.div>
      )}
      {/* a ruled list: the title on the left, what it holds on the right */}
      <div className="border-b border-[var(--rule)]">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: 'visible' } : { ...fadeUp, transition: { delay: i * 0.05 } })}
            className="grid gap-x-8 gap-y-2 border-t border-[var(--rule)] py-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] [&_li]:text-[16px] [&_p]:text-[16px] [&_p:first-child]:mt-0 [&_ul]:space-y-1 [&_ul:first-child]:mt-0"
          >
            <h3 className="rk-section-title m-0 text-[1.1rem] leading-[1.35] tracking-[-0.01em] text-[var(--ink)]">{item.title}</h3>
            <FormattedInline
              value={item.body}
              className="font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function QuoteRenderer({ block, anim }: { block: QuoteBlock; anim: object }) {
  const quoteTextClass =
    'mb-4 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.2vw,1.75rem)] italic leading-[1.4] text-[var(--ink)]'
  return (
    <motion.div variants={fadeUpVariants} {...anim}>
      <div className="border-l border-[var(--rule)] pl-6 sm:pl-8">
        {block.text != null &&
          (typeof block.text === 'string'
            ? block.text.trim()
            : Array.isArray(block.text) && block.text.length > 0) &&
          (typeof block.text === 'string' ? (
            <p className={quoteTextClass}>&ldquo;{block.text}&rdquo;</p>
          ) : (
            <div className={quoteTextClass}>
              <PortableText value={block.text as PortableTextValue} components={referencePagePortableComponents} />
            </div>
          ))}
        {(block.attribution || block.role) && (
          <div>
            {block.attribution && (
              <span className="font-[family-name:var(--font-figtree)] text-[15px] font-medium text-[var(--ink)]">{block.attribution}</span>
            )}
            {block.role && (
              <span className="ml-2 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]">{block.role}</span>
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
    <div id={block.id} className="scroll-mt-[calc(var(--nav-stack)+2rem)]">
      {block.heading && (
        <motion.div variants={fadeUpVariants} {...anim}>
          <h2 className="rk-section-title text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)] mb-10">
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
          <h3 className="rk-section-title mb-2.5 text-[1.2rem] leading-[1.3] tracking-[-0.015em] text-[var(--ink)]">
            {item.question}
          </h3>
          <FormattedInline
            value={item.answer}
            className="font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]"
          />
        </motion.div>
      ))}
    </div>
  )
}

function InlineCtaRenderer({ block, anim }: { block: InlineCtaBlock; anim: object }) {
  return (
    <motion.div variants={fadeUpVariants} {...anim}>
      <div className="border-y border-[var(--rule)] py-10 text-center">
        {block.heading && (
          <h3 className="rk-section-title mb-3 text-[clamp(1.4rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
            {block.heading}
          </h3>
        )}
        {block.body != null &&
          (typeof block.body === 'string'
            ? block.body.trim()
            : Array.isArray(block.body) && block.body.length > 0) && (
          <div className="mx-auto mb-6 max-w-[50ch]">
            <FormattedInline
              value={block.body}
              className="font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)] text-center [&_p]:text-center [&_ul]:text-left [&_ol]:text-left"
            />
          </div>
        )}
        {block.cta?.href && (
          <Link
            href={block.cta.href}
            className="inline-flex h-12 items-center rounded-[6px] bg-[var(--blue)] px-6 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-white transition-[box-shadow] duration-200 hover:shadow-[0_6px_24px_rgba(47,91,255,0.35)] active:translate-y-px"
          >
            {block.cta.label || 'Get started'}
          </Link>
        )}
      </div>
    </motion.div>
  )
}

function ImageRenderer({ block, anim }: { block: ImageBlock; anim: object }) {
  return (
    <div id={block.id} className="scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.figure variants={fadeUpVariants} {...anim} className="m-0">
        {block.src && (
          <Image
            src={block.src}
            alt={block.alt ?? ''}
            width={1200}
            height={800}
            className="h-auto w-full rounded-lg"
          />
        )}
        {block.caption && (
          <figcaption className="mt-3 font-[family-name:var(--font-figtree)] text-[14px] leading-relaxed text-[var(--mid)]">
            {block.caption}
          </figcaption>
        )}
      </motion.figure>
    </div>
  )
}

const gfmMarkdownComponents: Components = {
  h1: ({children}) => (
    <h1 className="rk-section-title mt-12 first:mt-0 scroll-mt-[calc(var(--nav-stack)+2rem)] text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
      {children}
    </h1>
  ),
  h2: ({children}) => (
    <h2 className="rk-section-title mt-12 first:mt-0 scroll-mt-[calc(var(--nav-stack)+2rem)] text-[clamp(1.3rem,1.8vw,1.5rem)] leading-[1.25] tracking-[-0.02em] text-[var(--ink)]">
      {children}
    </h2>
  ),
  h3: ({children}) => (
    <h3 className="rk-section-title mt-8 text-[1.2rem] leading-[1.3] tracking-[-0.015em] text-[var(--ink)]">{children}</h3>
  ),
  p: ({children}) => (
    <p className="mt-5 first:mt-0 font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]">{children}</p>
  ),
  ul: ({children}) => <ul className="mt-4 list-disc space-y-2 pl-6 first:mt-0">{children}</ul>,
  ol: ({children}) => <ol className="mt-4 list-decimal space-y-2 pl-6 first:mt-0">{children}</ol>,
  li: ({children}) => <li className="font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]">{children}</li>,
  a: ({href, children}) => (
    <a
      href={href}
      className="text-[var(--blue)] underline underline-offset-4"
      {...(typeof href === 'string' && /^https?:\/\//i.test(href) ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
    >
      {children}
    </a>
  ),
  strong: ({children}) => <strong className="font-semibold text-[var(--ink)]">{children}</strong>,
  em: ({children}) => <em>{children}</em>,
  code: ({className, children, ...props}) => {
    const isBlock = typeof className === 'string' && className.includes('language-')
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className="rounded bg-[var(--background-secondary)] px-1.5 py-0.5 text-[0.92em] text-[var(--ink)]">{children}</code>
    )
  },
  pre: ({children}) => (
    <pre className="my-6 overflow-x-auto rounded-[6px] border border-[var(--rule)] bg-[var(--background-secondary)] p-4 font-[family-name:var(--font-mono)] text-[14px] leading-relaxed">
      {children}
    </pre>
  ),
  blockquote: ({children}) => (
    <blockquote className="mt-8 border-l border-[var(--rule)] pl-6 font-[family-name:var(--font-serif)] text-[1.45rem] italic leading-[1.4] text-[var(--mid)] first:mt-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-[var(--rule)]" />,
  table: ({children}) => (
    <div className="my-8 overflow-x-auto first:mt-0">
      <table className="w-full min-w-[min(100%,36rem)] border-collapse text-left">{children}</table>
    </div>
  ),
  thead: ({children}) => <thead className="border-b border-[var(--ink)] [&_tr]:border-b-0">{children}</thead>,
  tbody: ({children}) => <tbody>{children}</tbody>,
  tr: ({children}) => <tr className="border-b border-[var(--rule)]">{children}</tr>,
  th: ({children}) => (
    <th className="py-3 pr-5 text-left align-bottom font-[family-name:var(--font-mono)] text-[12px] font-light uppercase tracking-[0.08em] text-[var(--mid)]">{children}</th>
  ),
  td: ({children}) => (
    <td className="py-3.5 pr-5 align-top font-[family-name:var(--font-figtree)] text-[15px] leading-[1.5] text-[var(--ink)] first:font-semibold">{children}</td>
  ),
}

function MarkdownSectionRenderer({ block, anim }: { block: MarkdownSectionBlock; anim: object }) {
  const content = block.content?.trim()
  if (!content) return null
  return (
    <div id={block.id} className="scroll-mt-[calc(var(--nav-stack)+2rem)]">
      <motion.div variants={fadeUpVariants} {...anim}>
        {block.caption ? (
          <p className="mb-4 font-[family-name:var(--font-mono)] text-[12px] font-light tracking-[0.12em] text-[var(--mid)] uppercase">
            {block.caption}
          </p>
        ) : null}
        <div className="min-w-0 [&_table+p]:mt-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={gfmMarkdownComponents}>
            {content}
          </ReactMarkdown>
        </div>
      </motion.div>
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
      } else if ('id' in block && 'heading' in block && block.heading) {
        entries.push({ id: (block as { id: string }).id, text: block.heading, level: 2 })
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

      {/* ── Header: the same as a blog post; the text below is wider for richer content ── */}
      <header className="bg-[var(--bg)] px-[var(--pad)] pt-[calc(var(--nav-stack)+3.5rem)]">
        <div className="rk-landing-max">
          <motion.div variants={fadeUpVariants} initial={prefersReducedMotion ? 'visible' : 'hidden'} animate="visible">
            <nav className="mb-8 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)]">
              <Link href="/" className="transition-colors hover:text-[var(--ink)]">Home</Link>
              <span className="text-[var(--faint)]">/</span>
              <span className="text-[var(--ink)]">{page.categoryLabel}</span>
            </nav>
            <h1 className="rk-section-title m-0 max-w-[34ch] text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.1]">
              {/* the accent phrase from Sanity in blue, in the title's own font; without one, the part
                  after the colon in grey */}
              {page.titleAccent && page.title.includes(page.titleAccent) ? (
                <span className="text-[var(--ink)]">
                  {page.title.slice(0, page.title.indexOf(page.titleAccent))}
                  <span className="text-[var(--blue)]">{page.titleAccent}</span>
                  {page.title.slice(page.title.indexOf(page.titleAccent) + page.titleAccent.length)}
                </span>
              ) : (
                (() => {
                  const t = splitTitle(page.title)
                  return (
                    <>
                      <span className="text-[var(--ink)]">{t.lead}</span>
                      {t.rest && <span className="text-[var(--mid)]">{t.rest}</span>}
                    </>
                  )
                })()
              )}
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]">
              <span className="text-[var(--ink)]">{page.categoryLabel}</span>
              {page.lastUpdated && <span>Updated {page.lastUpdated}</span>}
              {page.readingTime && <span>{page.readingTime}</span>}
              <span className="ml-auto"><ShareLinks title={page.title} /></span>
            </div>
            {page.subtitle && (
              <p className="rk-section-body m-0 mt-6 max-w-[820px] whitespace-pre-line text-[clamp(18px,1.4vw,20px)] text-[var(--mid)]">
                {page.subtitle}
              </p>
            )}
          </motion.div>

          {page.heroImage?.src && (
            <figure className="m-0 mt-12">
              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-[var(--panel)]">
                <Image src={page.heroImage.src} alt={page.heroImage.alt} fill className="object-cover" priority sizes="(max-width: 1400px) 100vw, 1400px" />
              </div>
              {page.heroImage.caption && (
                <figcaption className="mt-3 font-[family-name:var(--font-figtree)] text-[14px] leading-relaxed text-[var(--mid)]">
                  {page.heroImage.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </header>

      {/* ── Body: the text centred and wide; the section list in the right margin on very wide screens ── */}
      <section className="bg-[var(--bg)] px-[var(--pad)] pt-14 pb-24">
        <div className="rk-landing-max grid grid-cols-1 gap-x-10 2xl:grid-cols-[minmax(0,1fr)_900px_minmax(0,1fr)]">
          <article className="mx-auto flex w-full min-w-0 max-w-[900px] flex-col gap-12 2xl:col-start-2">
            <TOC headings={tocHeadings} activeId={activeId} mobile />
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
                case 'markdownSection': return <MarkdownSectionRenderer key={i} block={block} anim={anim} />
                case 'imageBlock': return <ImageRenderer key={i} block={block} anim={anim} />
              }
            })}
          </article>
          <aside className="hidden 2xl:block">
            <TOC headings={tocHeadings} activeId={activeId} />
          </aside>
        </div>
      </section>

      {/* ── Related ── */}
      {page.relatedPages && page.relatedPages.length > 0 && (
        <section className="bg-[var(--bg)] px-[var(--pad)] pb-24">
          <div className="rk-landing-max">
            <div className="mx-auto max-w-[900px]">
            <h2 className="rk-section-title m-0 mb-5 text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">Continue reading</h2>
            <div className="border-b border-[var(--rule)]">
              {page.relatedPages.map((rp) => (
                <Link
                  key={rp.href}
                  href={rp.href}
                  className="group flex items-center justify-between gap-6 border-t border-[var(--rule)] py-4"
                >
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    {rp.category && (
                      <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.1em] text-[var(--mid)] uppercase">{rp.category}</span>
                    )}
                    <span className="font-[family-name:var(--font-figtree)] text-[17px] font-medium text-[var(--ink)]">{rp.label}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[var(--ink)] transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              ))}
            </div>
            </div>
          </div>
        </section>
      )}

      <ClosingCTA />
      <Footer />
    </>
  )
}
