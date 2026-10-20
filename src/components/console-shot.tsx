import Image from 'next/image'
import type { ReactNode } from 'react'

/**
 * A console view with a light and a dark version, captured from console-next with demo data.
 * The theme CSS shows the one that matches (globals.css, .rk-only-light / .rk-only-dark).
 */
export function ThemedImage({ name, w, h, alt, sizes, className = '', priority = false }: { name: string; w: number; h: number; alt: string; sizes: string; className?: string; priority?: boolean }) {
  return (
    <>
      <Image src={`/screenshots/platform/${name}-light.png`} alt={alt} width={w} height={h} sizes={sizes} className={`rk-only-light ${className}`} priority={priority} />
      <Image src={`/screenshots/platform/${name}-dark.png`} alt={alt} width={w} height={h} sizes={sizes} className={`rk-only-dark ${className}`} priority={priority} />
    </>
  )
}

/** A soft blue field with a faint dot grid for console parts to float on, as on the Hubble page. */
export function Backdrop({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--background-secondary)] ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(120% 90% at 0% 0%, rgba(47,91,255,0.16), transparent 60%), radial-gradient(90% 70% at 100% 100%, rgba(47,91,255,0.10), transparent 60%), radial-gradient(color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, 14px 14px',
      }}
    >
      {children}
    </div>
  )
}

/** Fades the right and bottom edges, so a part larger than its frame ends softly. */
export const fadeEdges = {
  maskImage: 'linear-gradient(to right, black 86%, transparent), linear-gradient(to bottom, black 72%, transparent)',
  maskComposite: 'intersect' as const,
  WebkitMaskImage: 'linear-gradient(to right, black 86%, transparent), linear-gradient(to bottom, black 72%, transparent)',
  WebkitMaskComposite: 'source-in',
}

/** Bottom edge only, for parts that fit the frame's width. */
export const fadeBottom = {
  maskImage: 'linear-gradient(to bottom, black 72%, transparent)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent)',
}

/**
 * A console part floating on the backdrop. width is in frame widths; left and top place its
 * top-left corner, in percent of the frame.
 */
export function Float({ name, w, h, alt, width, left, top }: { name: string; w: number; h: number; alt: string; width: number; left: number; top: number }) {
  return (
    <div className="absolute inset-0" style={width <= 1 ? fadeBottom : fadeEdges}>
      <div
        className="absolute overflow-hidden rounded-xl border border-[var(--rule)] shadow-[0_24px_48px_-16px_rgba(17,19,24,0.35)]"
        style={{ width: `${width * 100}%`, left: `${left}%`, top: `${top}%` }}
      >
        <ThemedImage name={name} alt={alt} w={w} h={h} sizes="(max-width: 1024px) 140vw, 1100px" className="h-auto w-full" />
      </div>
    </div>
  )
}
