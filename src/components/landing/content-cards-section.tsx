'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from './reveal'

/** Mask fades frost (gradient + blur) to transparent so blur doesn’t end in a hard band; text sits above in a separate layer. */
const frostMask =
  '[mask-image:linear-gradient(to_top,black_0%,black_12%,rgba(0,0,0,0.78)_40%,rgba(0,0,0,0.28)_70%,rgba(0,0,0,0.06)_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_12%,rgba(0,0,0,0.78)_40%,rgba(0,0,0,0.28)_70%,rgba(0,0,0,0.06)_88%,transparent_100%)] [mask-size:100%_100%] [mask-repeat:no-repeat]'

const frostMaskWhitepaper =
  '[mask-image:linear-gradient(to_top,black_0%,black_16%,rgba(0,0,0,0.82)_46%,rgba(0,0,0,0.32)_74%,rgba(0,0,0,0.06)_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_16%,rgba(0,0,0,0.82)_46%,rgba(0,0,0,0.32)_74%,rgba(0,0,0,0.06)_90%,transparent_100%)] [mask-size:100%_100%] [mask-repeat:no-repeat]'

/** Bottom ~half: frosted slab (masked) + full-opacity type — taller min-height pulls copy into darker band. */
const textPanelShell =
  'absolute inset-x-0 bottom-0 flex min-h-[280px] flex-col justify-end px-7 pb-8 pt-24 sm:min-h-[320px] sm:px-8 sm:pb-9 sm:pt-28'

/** Gradient + masked frosted glass (blur + slight saturate so the image reads “through” frost). */
const textPanelFrost = `pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.7)_24%,rgba(2,3,10,0.76)_42%,rgba(5,7,16,0.86)_58%,rgba(10,12,22,0.6)_78%,rgba(14,16,26,0.22)_92%,transparent_100%)] backdrop-blur-[28px] backdrop-saturate-150 [-webkit-backdrop-filter:blur(28px)_saturate(1.35)] ${frostMask}`

/** Whitepaper: taller slab, slightly stronger blur under the mask. */
const textPanelShellWhitepaper =
  'absolute inset-x-0 bottom-0 flex min-h-[320px] flex-col justify-end px-7 pb-8 pt-28 sm:min-h-[360px] sm:px-8 sm:pb-9 sm:pt-32'

const textPanelFrostWhitepaper = `pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.72)_28%,rgba(1,3,10,0.78)_48%,rgba(4,6,15,0.88)_62%,rgba(9,11,20,0.64)_80%,rgba(14,16,24,0.24)_94%,transparent_100%)] backdrop-blur-[32px] backdrop-saturate-150 [-webkit-backdrop-filter:blur(32px)_saturate(1.35)] ${frostMaskWhitepaper}`

const eyebrow =
  'mb-2.5 font-[family-name:var(--font-mono)] text-[11px] font-semibold tracking-[0.16em] text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,1),0_2px_14px_rgba(0,0,0,0.95)] antialiased'

const titleHero =
  'text-balance max-w-lg font-[family-name:var(--font-serif)] text-[clamp(1.28rem,2.45vw,2.05rem)] font-semibold leading-[1.2] tracking-[0.015em] text-white antialiased [text-shadow:0_1px_2px_rgba(0,0,0,1),0_2px_10px_rgba(0,0,0,1),0_8px_32px_rgba(0,0,0,0.92),0_16px_56px_rgba(0,0,0,0.78)]'

const titleSide =
  'text-balance font-[family-name:var(--font-serif)] text-[clamp(1.05rem,2.4vw,1.4rem)] font-semibold leading-[1.28] tracking-[0.015em] text-white antialiased [text-shadow:0_1px_2px_rgba(0,0,0,1),0_2px_10px_rgba(0,0,0,1),0_6px_28px_rgba(0,0,0,0.92),0_14px_48px_rgba(0,0,0,0.76)] sm:text-[clamp(1.125rem,2.2vw,1.5rem)]'

/**
 * Full-bleed three-up (blog / whitepaper / blog) — lives in the top half of homepage `LandingFooter`.
 */
export function LandingContentCards() {
  return (
    <Reveal className="grid min-h-[min(100%,50vh)] w-full flex-1 grid-cols-1 md:min-h-0 md:grid-cols-[2fr_1fr_1fr] md:h-full">
      <Link
        href="/blog/beyond-observability-building-systems-that-think-with-you"
        className="group relative isolate block min-h-[40vh] overflow-hidden md:min-h-0 md:h-full"
      >
        <Image
          src="/beyond-observability.webp"
          alt=""
          fill
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div className={textPanelShell}>
          <div className={textPanelFrost} aria-hidden />
          <div className="relative z-10 [text-rendering:optimizeLegibility]">
            <p className={eyebrow}>SRI Diaries · 5 min read</p>
            <p className={titleHero}>Beyond Observability: Building Systems That Think With You</p>
          </div>
        </div>
        <span
          className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/30 text-sm text-white/80 backdrop-blur-sm"
          aria-hidden
        >
          ↗
        </span>
      </Link>

      <Link
        href="/assets/whitepaper.pdf"
        className="group relative isolate block min-h-[32vh] overflow-hidden md:h-full md:min-h-0"
      >
        <Image
          src="/printable.png"
          alt=""
          fill
          className="object-cover object-[center_22%] transition-transform duration-[600ms] ease-out group-hover:scale-[1.03] md:object-center"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <div className={textPanelShellWhitepaper}>
          <div className={textPanelFrostWhitepaper} aria-hidden />
          <div className="relative z-10 [text-rendering:optimizeLegibility]">
            <p className={eyebrow}>Whitepaper · PDF</p>
            <p className={titleSide}>The Case for Site Reliability Intelligence</p>
          </div>
        </div>
        <span
          className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/35 text-sm text-white/75 backdrop-blur-sm"
          aria-hidden
        >
          ↗
        </span>
      </Link>

      <Link
        href="/blog/the-evolution-of-reliability-from-firefighting-to-intelligence"
        className="group relative isolate block min-h-[32vh] overflow-hidden md:h-full md:min-h-0"
      >
        <Image
          src="/deepmind.jpg"
          alt=""
          fill
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <div className={textPanelShell}>
          <div className={textPanelFrost} aria-hidden />
          <div className="relative z-10 [text-rendering:optimizeLegibility]">
            <p className={eyebrow}>Infrastructure Reliability · 5 min read</p>
            <p className={titleSide}>
              The Evolution of Reliability: From Firefighting to Intelligence
            </p>
          </div>
        </div>
        <span
          className="absolute top-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/30 text-sm text-white/80 backdrop-blur-sm"
          aria-hidden
        >
          ↗
        </span>
      </Link>
    </Reveal>
  )
}
