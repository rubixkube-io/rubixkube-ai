import Image from 'next/image'
import { rkMono10 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'

export type CustomerMark =
  | { kind: 'logo'; src: string; alt: string; w: number; h: number }
  | { kind: 'placeholder'; name: string }

/**
 * `w`/`h` = intrinsic pixel ratio from each asset (for Next/Image + aspect).
 * Yellow.ai file is ~2.4:1; others ~3.8:1. At a fixed max-height, squat marks render much narrower;
 * we scale those slightly in `CustomerLogoGrid` (see `LOGO_MAX_H_PX` + squat aspect threshold).
 */
export const CUSTOMER_MARKS: CustomerMark[] = [
  { kind: 'logo', src: '/logos/yellow-ai.png', alt: 'Yellow.ai', w: 3501, h: 1459 },
  { kind: 'logo', src: '/logos/fleek.png', alt: 'Fleek', w: 657, h: 174 },
  { kind: 'logo', src: '/logos/Sheshi-ai.svg', alt: 'Sheshi.ai', w: 146, h: 38 },
  { kind: 'logo', src: '/logos/vishanti.png', alt: 'Vishanti', w: 389, h: 100 },
  { kind: 'logo', src: '/logos/astreya-logo.png', alt: 'Astreya', w: 421, h: 120 },
  { kind: 'logo', src: '/logos/paygent.png', alt: 'Paygent', w: 938, h: 266 },
  { kind: 'logo', src: '/logos/byteflow.png', alt: 'Byteflow', w: 2821, h: 295 },
]

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

function LogoItem({ mark, aria }: { mark: CustomerMark; aria?: string }) {
  if (mark.kind === 'placeholder') {
    return (
      <span
        aria-label={aria}
        className="inline-flex shrink-0 items-center justify-center opacity-[0.55] grayscale"
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
      className="inline-flex shrink-0 items-center justify-center opacity-[0.55] grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0"
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
          <span className="inline-flex items-center justify-center opacity-[0.55] grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0">
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
