import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { type } from '@/lib/type-scale'
import type { BeliefStory } from '@/lib/landing-featured-content'

/**
 * Four pieces, picked in an order that follows the page: who we build for (the hero's "people
 * who keep systems running"), why that needs memory, the metric behind the numbers above, and
 * where we stand among AI SRE tools. Words come from Sanity; `title` overrides a page title that
 * was written for search rather than for a card.
 */
const BELIEFS = [
  { slug: 'kepler-a-tool-for-the-operator', href: '/blog/kepler-a-tool-for-the-operator', kind: 'Essay' },
  { slug: 'ai-for-operations-cant-live-in-one-repo', href: '/blog/ai-for-operations-cant-live-in-one-repo', kind: 'Essay' },
  {
    slug: 'mean-time-to-understand',
    href: '/glossary/mean-time-to-understand',
    kind: 'Glossary',
    title: 'MTTU: the part of an incident most teams never measure',
  },
  {
    slug: 'ai-sre-tools-2026',
    href: '/compare/ai-sre-tools-2026',
    kind: 'Compare',
    title: 'AI SRE tools in 2026: what they do well, what they miss',
  },
] as const satisfies readonly { slug: string; href: string; kind: string; title?: string }[]

type Belief = (typeof BELIEFS)[number]

/** One story: the cover with no text on it, then the title, the description and one meta line */
function Story({ b, story, feature = false }: { b: Belief; story?: BeliefStory; feature?: boolean }) {
  const title = ('title' in b ? b.title : undefined) ?? story?.title
  if (!title) return null
  return (
    <Link href={b.href} className="group block">
      <span
        className={`relative block overflow-hidden rounded-lg bg-[var(--panel)] ${feature ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
      >
        {story?.cover && (
          <Image
            src={story.cover}
            alt=""
            fill
            sizes={feature ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        )}
      </span>
      <span
        className={`block font-[family-name:var(--font-figtree)] font-normal text-[var(--ink)] ${
          feature
            ? 'mt-6 max-w-[24ch] text-[clamp(1.75rem,3vw,3rem)] leading-[1.08] tracking-[-0.03em]'
            : 'mt-4 text-[clamp(1.1rem,1.35vw,1.3rem)] leading-[1.3] tracking-[-0.01em]'
        }`}
      >
        {title}
      </span>
      {story?.description && (
        <span
          className={`rk-section-body block text-[var(--mid)] ${feature ? 'mt-4 max-w-[40em] line-clamp-3' : 'mt-2 line-clamp-3 text-[15px]'}`}
        >
          {story.description}
        </span>
      )}
      <span className={`${type.small} mt-3 flex gap-3`}>
        <span className="text-[var(--ink)]">{b.kind}</span>
        {story?.date && <span className="text-[var(--mid)]">{story.date}</span>}
      </span>
    </Link>
  )
}

/**
 * What we believe, as one feature with a column of smaller stories beside it. The side column runs longer than the feature, on purpose.
 */
export function BeliefsSection({ stories }: { stories: Record<string, BeliefStory> }) {
  const [lead, ...rest] = BELIEFS
  return (
    <section className="shrink-0 snap-start px-[var(--pad)] pt-[clamp(3rem,8vh,5rem)] pb-[clamp(4rem,12vh,8rem)]">
      <div className="rk-landing-max w-full">
        <div className="flex items-end justify-between gap-6">
          <h2 className="rk-section-title m-0 text-[clamp(1.5rem,2.2vw,2.25rem)] text-[var(--ink)]">What we believe</h2>
          <Link
            href="/blog"
            className={`${type.small} group inline-flex shrink-0 items-center gap-1.5 text-[var(--ink)] hover:text-[var(--blue)] md:mb-2`}
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-14 lg:grid-cols-[minmax(0,2.15fr)_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Story b={lead} story={stories[lead.slug]} feature />
          </div>
          <ul className="m-0 flex list-none flex-col gap-14 p-0">
            {rest.map((b) => (
              <li key={b.slug} className="m-0 p-0">
                <Story b={b} story={stories[b.slug]} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
