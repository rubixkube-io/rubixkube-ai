import { Fragment, type ReactNode } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { webPageJsonLd } from '@/components/structured-data'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { rkMono10, rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { AFTER_HOURS_CHALLENGES, type AfterHoursChallenge } from '@/data/after-hours'

const mono = 'font-[family-name:var(--font-mono)]'
const serif = 'font-[family-name:var(--font-serif)]'

export function afterHoursMetadata(challenge: AfterHoursChallenge, path: string): Metadata {
  const title = `Challenge ${challenge.id}: ${challenge.title} - RubixKube After Hours`
  const ogTitle = `After Hours, Challenge ${challenge.id}: ${challenge.headline.text}`
  const ogImage = { url: `https://rubixkube.ai${challenge.ogImage}`, width: 1200, height: 630, alt: challenge.poster.alt }
  return {
    title,
    description: challenge.description,
    openGraph: { title: ogTitle, description: challenge.description, url: `https://rubixkube.ai${path}`, images: [ogImage] },
    twitter: { card: 'summary_large_image', title: ogTitle, description: challenge.description, images: [ogImage.url] },
    alternates: { canonical: path },
  }
}

/** Renders "[text](url)" in letter copy as links. Everything else stays plain text. */
function withLinks(text: string): ReactNode {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!m) return <Fragment key={i}>{part}</Fragment>
    const [, label, href] = m
    const cls = 'text-[var(--blue)] underline underline-offset-4'
    return href.startsWith('http') ? (
      <a key={i} href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    ) : (
      <Link key={i} href={href} className={cls}>
        {label}
      </Link>
    )
  })
}

/** Headline with the accent phrase in blue italic, like the other inner pages. */
function Headline({ text, accent }: { text: string; accent: string }) {
  const at = text.indexOf(accent)
  if (at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <span className="italic text-[var(--blue)]">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  )
}

export function AfterHoursLetter({ challenge, path }: { challenge: AfterHoursChallenge; path: string }) {
  const open = challenge.status === 'open'
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

      {/* ── Poster first, then the same header as the other inner pages (see pricing) ── */}
      <section className="relative bg-[var(--bg)]">
        <div className="rk-landing-max px-[var(--pad)] pt-[calc(var(--nav-stack)+2.5rem)] pb-20 text-center sm:pb-28">
          <Image
            src={challenge.poster.src}
            alt={challenge.poster.alt}
            width={challenge.poster.width}
            height={challenge.poster.height}
            priority
            sizes="(min-width: 640px) 560px, 100vw"
            className="mx-auto h-auto w-full max-w-[560px] rounded-[6px] border border-[var(--rule)] shadow-sm"
          />

          <div className="mt-16 flex flex-col items-center sm:mt-20">
            <span className={cn(`${mono} mb-10 tracking-[0.2em] text-[var(--mid)] uppercase`, rkMono10)}>
              After Hours · Challenge {challenge.id}
              {!open && ' · Closed'}
            </span>

            <h1 className={`rk-landing-h2-std ${serif} w-full max-w-none leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]`}>
              <Headline {...challenge.headline} />
            </h1>

            <p className={cn(`${mono} mt-10 w-full max-w-3xl leading-[1.75] font-light text-[var(--mid)]`, rkMono13)}>
              {challenge.subtitle}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {open && (
                <Button asChild variant="primary">
                  <a href={challenge.url}>Start Challenge {challenge.id}</a>
                </Button>
              )}
              <Button asChild variant="outline" className={outlineBlueAccentMd}>
                <a href="#letter">Read the letter</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── The letter ── */}
      <section
        id="letter"
        className="scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--background-secondary)] px-[var(--pad)] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[680px]">
          <article className="rounded-[6px] border border-[var(--rule)] bg-[#faf9f6] px-6 py-10 shadow-sm sm:px-14 sm:py-14">
            <header className="mb-10 border-b border-[var(--rule)] pb-6">
              <div className="flex items-center justify-between gap-4">
                <span className={`${mono} flex items-center gap-2.5 text-[12px] tracking-[0.18em] text-[var(--ink)] uppercase`}>
                  <Image src="/logo-icon.png" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
                  RubixKube
                </span>
                <time className={`${mono} shrink-0 text-[12px] font-light text-[var(--mid)]`}>{challenge.date}</time>
              </div>
              <p className={`${mono} mt-5 text-[12px] font-light text-[var(--mid)]`}>
                Re: Challenge {challenge.id}, {challenge.title}
              </p>
            </header>

            <div className={`${serif} text-[clamp(1.15rem,1.9vw,1.3rem)] leading-[1.7] text-[var(--ink)]`}>
              {challenge.letter.map((block, i) =>
                block.type === 'lead' ? (
                  <p key={i} className="mt-8 text-[clamp(1.6rem,3.2vw,2.1rem)] leading-[1.2] font-light tracking-[-0.01em] first:mt-0">
                    {withLinks(block.text)}
                  </p>
                ) : (
                  <p key={i} className="mt-5 first:mt-0">
                    {withLinks(block.text)}
                  </p>
                ),
              )}
              <p className="mt-10 italic">{challenge.signoff}</p>
            </div>

            {challenge.postscript && (
              <p className={`${mono} mt-10 border-t border-[var(--rule)] pt-5 text-[13px] leading-relaxed font-light text-[var(--mid)]`}>
                P.S. {withLinks(challenge.postscript)}
              </p>
            )}
          </article>

          {open && (
            <div className="mt-12 text-center">
              <Button asChild variant="primary">
                <a href={challenge.url}>Start Challenge {challenge.id}</a>
              </Button>
            </div>
          )}

          {others.length > 0 && (
            <nav className="mt-16 border-t border-[var(--rule)] pt-6 text-center" aria-label="Other challenges">
              <p className={`${mono} mb-3 text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase`}>Other challenges</p>
              <ul className={`${mono} space-y-1 text-[13px] font-light`}>
                {others.map((c) => (
                  <li key={c.id}>
                    <Link href={`/after-hours/${c.id}`} className="text-[var(--ink)] underline-offset-4 hover:text-[var(--blue)] hover:underline">
                      Challenge {c.id}: {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
