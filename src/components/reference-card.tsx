import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'
import { AbstractCover } from '@/components/solutions/abstract-cover'
import type { ReferenceGuideNavItem } from '@/lib/reference-nav'

/** A Sanity reference page as a card: its cover (or the abstract drawing), the kind, the title and its line */
export function ReferenceCard({
  page,
  kind,
  index,
  wide = false,
}: {
  page: ReferenceGuideNavItem
  kind?: string
  index?: number
  wide?: boolean
}) {
  const key = `${page.category}/${page.slug}`
  const image = page.heroImage?.asset ? urlFor(page.heroImage).width(wide ? 1200 : 800).height(wide ? 750 : 600).url() : null
  const summary = (page.subtitle ?? '').split(/\n\s*\n/)[0].trim()
  return (
    <Link href={`/${key}`} className="group block">
      {kind && <span className="block font-[family-name:var(--font-figtree)] text-[14px] text-[var(--ink)]">{kind}</span>}
      <span
        className={`relative block overflow-hidden rounded-xl bg-[var(--panel)] ring-1 ring-[var(--rule)] ${kind ? 'mt-3' : ''} ${
          wide ? 'aspect-[4/3] lg:aspect-[16/10]' : 'aspect-[4/3]'
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes={wide ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <span className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]">
            <AbstractCover seed={key} index={index} />
          </span>
        )}
      </span>
      <span
        className={`mt-4 block font-[family-name:var(--font-figtree)] font-semibold text-balance text-[var(--ink)] ${
          wide ? 'text-[clamp(1.25rem,1.7vw,1.6rem)] leading-[1.2] tracking-[-0.02em]' : 'text-[17px] leading-[1.3] tracking-[-0.01em]'
        }`}
      >
        {page.title}
      </span>
      {summary && (
        <span className={`rk-section-body mt-2 block text-[var(--mid)] ${wide ? 'max-w-[36em] text-[16px]' : 'line-clamp-3 text-[15px]'}`}>
          {summary}
        </span>
      )}
    </Link>
  )
}
