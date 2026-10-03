import { Fragment, type ReactNode } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { webPageJsonLd } from '@/components/structured-data'
import { STATIC_MARKETING_OG_URL } from '@/lib/og-metadata'
import { AFTER_HOURS_CHALLENGES, type AfterHoursChallenge } from '@/data/after-hours'

const mono = 'font-[family-name:var(--font-mono)]'
const serif = 'font-[family-name:var(--font-serif)]'

export function afterHoursMetadata(challenge: AfterHoursChallenge, path: string): Metadata {
  const title = `Challenge ${challenge.id}: ${challenge.title} - RubixKube After Hours`
  return {
    title,
    description: challenge.description,
    openGraph: {
      title: `After Hours, Challenge ${challenge.id}: ${challenge.title}`,
      description: challenge.description,
      url: `https://rubixkube.ai${path}`,
      images: [{ url: STATIC_MARKETING_OG_URL, width: 1200, height: 630, alt: 'RubixKube | Site Reliability Intelligence' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `After Hours, Challenge ${challenge.id}: ${challenge.title}`,
      description: challenge.description,
      images: [STATIC_MARKETING_OG_URL],
    },
    alternates: { canonical: path },
  }
}

/** Renders "[text](url)" in letter copy as links. Everything else stays plain text. */
function withLinks(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!m) return <Fragment key={i}>{part}</Fragment>
    const [, label, href] = m
    const external = href.startsWith('http')
    return external ? (
      <a key={i} href={href} className="text-[var(--blue)] underline underline-offset-4" target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    ) : (
      <Link key={i} href={href} className="text-[var(--blue)] underline underline-offset-4">
        {label}
      </Link>
    )
  })
}

export function AfterHoursLetter({ challenge, path }: { challenge: AfterHoursChallenge; path: string }) {
  const jsonLd = webPageJsonLd({
    name: `After Hours, Challenge ${challenge.id}: ${challenge.title}`,
    description: challenge.description,
    url: `https://rubixkube.ai${path}`,
  })
  const others = AFTER_HOURS_CHALLENGES.filter((c) => c.id !== challenge.id)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main className="bg-[var(--bg)] px-[var(--pad)] pt-[calc(var(--nav-stack)+3.5rem)] pb-24">
        <div className="mx-auto max-w-[680px]">
          <p className={`${mono} mb-8 text-center text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase`}>
            After Hours · Challenge {challenge.id}
            {challenge.status === 'closed' && ' · Closed'}
          </p>

          <article className="rounded-[6px] border border-[var(--rule)] bg-[#faf9f6] px-6 py-10 shadow-sm sm:px-14 sm:py-14">
            <header className="mb-10 flex items-baseline justify-between gap-4 border-b border-[var(--rule)] pb-5">
              <h1 className={`${serif} text-[clamp(1.35rem,2.5vw,1.6rem)] leading-tight font-light text-[var(--ink)]`}>
                {challenge.title}
              </h1>
              <time className={`${mono} shrink-0 text-[12px] font-light text-[var(--mid)]`}>{challenge.date}</time>
            </header>

            <div className={`${serif} text-[clamp(1.15rem,1.9vw,1.3rem)] leading-[1.7] text-[var(--ink)]`}>
              {challenge.letter.map((block, i) => {
                if (block.type === 'lead')
                  return (
                    <p key={i} className="mt-8 text-[clamp(1.6rem,3.2vw,2.1rem)] leading-[1.2] font-light tracking-[-0.01em] first:mt-0">
                      {withLinks(block.text)}
                    </p>
                  )
                if (block.type === 'image')
                  return (
                    <figure key={i} className="my-10 -mx-2 sm:-mx-6">
                      <Image
                        src={challenge.image.src}
                        alt={challenge.image.alt}
                        width={challenge.image.width}
                        height={challenge.image.height}
                        className="h-auto w-full rounded-[4px] border border-[var(--rule)]"
                        sizes="(min-width: 680px) 620px, 100vw"
                        priority
                      />
                      <figcaption className={`${mono} mt-3 text-center text-[12px] font-light text-[var(--mid)]`}>
                        {challenge.image.caption}
                      </figcaption>
                    </figure>
                  )
                return (
                  <p key={i} className="mt-5 first:mt-0">
                    {withLinks(block.text)}
                  </p>
                )
              })}

              <p className="mt-10 italic">{challenge.signoff}</p>
            </div>

            {challenge.postscript && (
              <p className={`${mono} mt-10 border-t border-[var(--rule)] pt-5 text-[13px] leading-relaxed font-light text-[var(--mid)]`}>
                P.S. {withLinks(challenge.postscript)}
              </p>
            )}
          </article>

          {challenge.status === 'open' && (
            <div className="mt-10 text-center">
              <a
                href={challenge.url}
                className={`${mono} inline-flex items-center gap-2 rounded-[6px] bg-[var(--blue)] px-6 py-3 text-[11px] font-light tracking-[0.1em] text-white uppercase transition-colors hover:bg-blue-700`}
              >
                Start Challenge {challenge.id}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          )}

          {others.length > 0 && (
            <nav className="mt-16 border-t border-[var(--rule)] pt-6 text-center" aria-label="Other challenges">
              <p className={`${mono} mb-3 text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase`}>Other challenges</p>
              <ul className={`${mono} space-y-1 text-[13px] font-light`}>
                {others.map((c) => (
                  <li key={c.id}>
                    <Link href={`/after-hours/${c.id}`} className="text-[var(--ink)] underline-offset-4 hover:text-[var(--blue)] hover:underline">
                      {c.id} · {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
