import Image from 'next/image'
import { rkMono10 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'

export type CustomerMark =
  | { kind: 'logo'; src: string; alt: string; w: number; h: number; k?: number; mono?: string }
  | { kind: 'placeholder'; name: string }

/**
 * `w`/`h` = intrinsic pixel size of each asset (for Next/Image + aspect). Files are trimmed to the
 * mark, with no empty border. `k` corrects how heavy a mark reads next to the others when every
 * logo gets the same area (see `markHeight`): below 1 for bold wordmarks, above 1 for thin ones.
 * In the hero each mark is drawn in one colour from its shape (see `LogoMark`); `mono` is a
 * one-colour copy for logos whose detail sits in light or white parts that the shape alone loses.
 *
 * Order matters: the first six are the hero's fixed top row; the rest rotate through the row below.
 */
export const CUSTOMER_MARKS: CustomerMark[] = [
  // the hero's top row, always shown
  { kind: 'logo', src: '/logos/astreya-logo.png', alt: 'Astreya', w: 421, h: 120, k: 0.92 },
  { kind: 'logo', src: '/logos/littlebird.svg', alt: 'Littlebird', w: 106, h: 22 },
  { kind: 'logo', src: '/logos/yellow-ai-mark.png', alt: 'Yellow.ai', w: 2973, h: 708 },
  { kind: 'logo', src: '/logos/krutrim.png', alt: 'Krutrim', w: 254, h: 72, k: 0.92, mono: '/logos/krutrim-mono.png' },
  { kind: 'logo', src: '/logos/dialpad.svg', alt: 'Dialpad', w: 94, h: 33, k: 0.86 },
  { kind: 'logo', src: '/logos/landmark-group.png', alt: 'Landmark Group', w: 300, h: 66, k: 1.05 },
  // the row below rotates through these
  { kind: 'logo', src: '/logos/browserstack.svg', alt: 'BrowserStack', w: 180, h: 32, k: 1.05, mono: '/logos/browserstack-mono.png' },
  { kind: 'logo', src: '/logos/synamedia.svg', alt: 'Synamedia', w: 833, h: 135, k: 0.88 },
  { kind: 'logo', src: '/logos/scaler.svg', alt: 'Scaler', w: 190, h: 40, k: 0.9 },
  { kind: 'logo', src: '/logos/safe.svg', alt: 'Safe Security', w: 152, h: 40 },
  { kind: 'logo', src: '/logos/pulsegen.svg', alt: 'Pulsegen', w: 106, h: 30, k: 0.92 },
  { kind: 'logo', src: '/logos/tese-io.png', alt: 'Tese', w: 1645, h: 336 },
  { kind: 'logo', src: '/logos/fleek.png', alt: 'Fleek', w: 657, h: 174, mono: '/logos/fleek-mono.png' },
  { kind: 'logo', src: '/logos/paygent-mark.png', alt: 'Paygent', w: 851, h: 199 },
  { kind: 'logo', src: '/logos/vishanti.png', alt: 'Vishanti', w: 389, h: 100 },
  { kind: 'logo', src: '/logos/Sheshi-ai.svg', alt: 'Sheshi.ai', w: 146, h: 38 },
  { kind: 'logo', src: '/logos/byteflow.png', alt: 'Byteflow', w: 2821, h: 295, k: 1.1 },
]

/** Every mark gets about this much area (px²), so wide and squat logos read the same size */
const MARK_AREA = 1750

/** The height that gives a mark the shared area, corrected by its `k` and kept between 13 and 26px */
export function markHeight(mark: Extract<CustomerMark, { kind: 'logo' }>) {
  const h = Math.sqrt(MARK_AREA / (mark.w / mark.h))
  return Math.min(26, Math.max(13, h)) * (mark.k ?? 1)
}

/** Infra and partner marks for the "Built on" row (muted). */
export const INFRA_LOGOS = [
  { src: '/logos/gcp.png', alt: 'GCP', w: 72, h: 24 },
  { src: '/logos/aws.svg', alt: 'AWS', w: 56, h: 20 },
  { src: '/logos/mongodb.svg', alt: 'MongoDB', w: 88, h: 24 },
  { src: '/logos/neo4j.svg', alt: 'Neo4j', w: 72, h: 20 },
  { src: '/logos/digitalocean.svg', alt: 'DigitalOcean', w: 96, h: 20 },
  { src: '/logos/auth0.svg', alt: 'Auth0', w: 64, h: 20 },
  { src: '/logos/anthropic.webp', alt: 'Anthropic', w: 88, h: 22 },
] as const

/** Max CSS height for logos; width follows aspect + max-w-full inside slot. */
const LOGO_MAX_H_PX = 22
/** Wordmarks wider than this W/H ratio still look small at the same max-height; nudge scale. */
const SQUAT_ASPECT_THRESHOLD = 2.75

/**
 * A customer mark in one colour, sized by `markHeight`, so every logo reads the same in both
 * themes: the shape (or its `mono` copy) is a mask filled with `--logo-ink`. On hover the real,
 * coloured logo fades in on light; on dark the shape brightens, since many logos are drawn for
 * light backgrounds.
 */
export function LogoMark({ mark }: { mark: Extract<CustomerMark, { kind: 'logo' }> }) {
  const h = markHeight(mark)
  const mask = `url(${mark.mono ?? mark.src}) center / contain no-repeat`
  return (
    <span
      role="img"
      aria-label={mark.alt}
      className="group relative inline-flex shrink-0"
      style={{ height: h, width: h * (mark.w / mark.h) }}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-[var(--logo-ink)] transition-[opacity,background-color] duration-500 ease-in-out group-hover:opacity-0 [html[data-theme='dark']_&]:group-hover:bg-[var(--logo-ink-hover)] [html[data-theme='dark']_&]:group-hover:opacity-100"
        style={{ mask, WebkitMask: mask }}
      />
      <Image
        src={mark.src}
        alt=""
        width={mark.w}
        height={mark.h}
        sizes="160px"
        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 [html[data-theme='dark']_&]:hidden"
      />
    </span>
  )
}

export function LogoItem({ mark, aria }: { mark: CustomerMark; aria?: string }) {
  if (mark.kind === 'placeholder') {
    return (
      <span
        aria-label={aria}
        className="inline-flex shrink-0 rk-logo items-center justify-center opacity-[0.55] grayscale"
      >
        <span
          className={cn(
            'font-[family-name:var(--font-mono)] font-light tracking-[0.12em] text-[var(--ink)] uppercase',
            rkMono10,
          )}
        >
          {mark.name}
        </span>
      </span>
    )
  }

  const aspect = mark.w / mark.h
  const squatBoost = aspect < SQUAT_ASPECT_THRESHOLD

  return (
    <span
      aria-label={aria}
      className="inline-flex shrink-0 rk-logo items-center justify-center opacity-[0.55] grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0"
    >
      <span
        className={cn(
          'inline-flex items-center justify-center',
          squatBoost && 'origin-center scale-[1.6] sm:scale-[1.52]',
        )}
      >
        <Image
          src={mark.src}
          alt={mark.alt}
          width={mark.w}
          height={mark.h}
          sizes="140px"
          className="w-auto object-contain object-center"
          style={{ maxHeight: LOGO_MAX_H_PX }}
        />
      </span>
    </span>
  )
}

/** Scrolling ticker of customer marks — duplicated for seamless loop. */
export function CustomerLogoGrid() {
  return (
    <div className="rk-marquee-track" aria-label="Trusted by">
      <div className="rk-marquee-inner" aria-hidden="false">
        {/* first pass */}
        {CUSTOMER_MARKS.map((mark) => (
          <LogoItem
            key={`a-${mark.kind === 'logo' ? mark.src : mark.name}`}
            mark={mark}
          />
        ))}
        {/* duplicate for seamless loop */}
        {CUSTOMER_MARKS.map((mark) => (
          <LogoItem
            key={`b-${mark.kind === 'logo' ? mark.src : mark.name}`}
            mark={mark}
            aria="presentation"
          />
        ))}
      </div>
    </div>
  )
}

/** Single-pass grid for "Built on" (no marquee). */
export function InfraLogoGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={
        compact
          ? 'm-0 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-6 p-0 sm:gap-x-8 sm:gap-y-8 md:gap-x-10'
          : 'm-0 flex list-none flex-wrap items-center justify-center gap-x-10 gap-y-10 p-0 sm:gap-x-14 sm:gap-y-12 md:gap-x-16'
      }
    >
      {INFRA_LOGOS.map((logo) => (
        <li key={logo.src} className="m-0 flex p-0">
          <span className="inline-flex rk-logo items-center justify-center opacity-[0.55] grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              className={
                compact
                  ? 'h-6 w-auto max-w-[100px] object-contain sm:h-7 md:h-8'
                  : 'h-8 w-auto max-w-[120px] object-contain md:h-10'
              }
            />
          </span>
        </li>
      ))}
    </ul>
  )
}
