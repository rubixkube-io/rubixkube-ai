'use client'

import Link from 'next/link'
import OpenAI from '@lobehub/icons/es/OpenAI/components/Mono'
import Claude from '@lobehub/icons/es/Claude/components/Color'
import Perplexity from '@lobehub/icons/es/Perplexity/components/Color'
import { rkMono9, rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

const ASK_PROMPT = encodeURIComponent(
  'Tell me about RubixKube (rubixkube.ai) — what it does, how it helps SRE teams, and whether it would be a good fit for improving my incident management and reliability workflows.',
)

const askAiLinks = [
  {
    label: 'Ask ChatGPT',
    href: `https://chatgpt.com/?q=${ASK_PROMPT}&hints=search`,
    Icon: OpenAI,
  },
  {
    label: 'Ask Claude',
    href: `https://claude.ai/new?q=${ASK_PROMPT}`,
    Icon: Claude,
  },
  {
    label: 'Ask Perplexity',
    href: `https://www.perplexity.ai/?q=${ASK_PROMPT}`,
    Icon: Perplexity,
  },
]

export function ClosingLandingSection() {
  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] items-center border-t border-[var(--rule)] px-[var(--pad)] py-20 lg:h-[calc(100vh-var(--nav-stack))]">
      <div className="rk-landing-max w-full">
      <div className="mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <p
            className={cn(
              'mb-10 font-[family-name:var(--font-mono)] tracking-[0.28em] text-[var(--text-muted)] uppercase',
              rkMono9,
            )}
          >
            The result
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="rk-landing-h2-std mb-12 font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]">
            Not a faster tool.
            <br />
            <em className="italic text-[var(--blue)]">A smarter system.</em>
            <br />
            <span className="text-[var(--text-soft)]">That&apos;s entirely yours.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p
            className={cn(
              'mx-auto -mt-6 max-w-xl font-[family-name:var(--font-mono)] font-light leading-[1.65] tracking-[-0.01em] text-[var(--mid)]',
              rkMono13,
            )}
          >
            Every incident you resolve without RubixKube is context it never learns from.
          </p>
        </Reveal>
        <Reveal delay={0.22} className="mt-12 flex flex-col items-center gap-5">
          <p
            className={cn(
              'font-[family-name:var(--font-mono)] tracking-[0.28em] text-[var(--text-muted)] uppercase',
              rkMono9,
            )}
          >
            Don&apos;t take our word for it
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {askAiLinks.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-[5px] border border-[var(--ink)]/15 bg-[var(--bg)] px-5 py-3 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.01em] text-[var(--ink)] shadow-[0_1px_2px_rgba(17,19,24,0.06)] transition-[box-shadow,border-color,transform,color] duration-200 hover:-translate-y-px hover:border-[var(--blue)]/40 hover:text-[var(--blue)] hover:shadow-[0_4px_18px_rgba(47,91,255,0.14)] active:translate-y-px min-[1920px]:px-6 min-[1920px]:py-3.5 min-[1920px]:text-[13px] min-[2560px]:text-[14px]"
              >
                <Icon size={18} className="shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  )
}
