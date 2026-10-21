'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Maximize, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { type } from '@/lib/type-scale'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/** How long the card must stay on screen before the film starts by itself */
const LINGER_MS = 10_000
/** How much of the card must be visible to count as being looked at */
const SEEN = 0.6

const clock = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`

/**
 * The film inside the card: fills it edge to edge, with a close button and a small row of
 * controls. It fades in and out over the card instead of opening a separate player.
 */
function CardFilm({
  video,
  shown,
  muted,
  onMute,
  onClose,
}: {
  video: React.RefObject<HTMLVideoElement | null>
  shown: boolean
  muted: boolean
  onMute: () => void
  onClose: () => void
}) {
  const [paused, setPaused] = useState(false)
  const [time, setTime] = useState(0)
  const [length, setLength] = useState(0)
  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }
  // iOS Safari only has its own video full screen
  const fullscreen = () => {
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {})
    else v.webkitEnterFullscreen?.()
  }
  const button =
    'flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-white/85 transition-colors hover:bg-white/10 hover:text-white'
  return (
    <div
      className={`absolute inset-0 z-30 bg-black transition-opacity duration-700 ease-in-out ${
        shown ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!shown}
    >
      <video
        ref={video}
        src="/videos/rubixkube-demo-1080.mp4"
        poster="/videos/rubixkube-demo-poster.jpg"
        preload="none"
        playsInline
        muted={muted}
        onClick={toggle}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setLength(e.currentTarget.duration)}
        className="h-full w-full cursor-pointer object-contain"
      />
      <button type="button" onClick={onClose} aria-label="Close the film" className={`${button} absolute top-3 right-3`}>
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-10 pb-3">
        <div className="flex items-center gap-1">
          <button type="button" onClick={toggle} aria-label={paused ? 'Play' : 'Pause'} className={button}>
            {paused ? (
              <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            ) : (
              <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            )}
          </button>
          <button type="button" onClick={onMute} aria-label={muted ? 'Turn sound on' : 'Turn sound off'} className={button}>
            {muted ? <VolumeX className="h-4 w-4" strokeWidth={1.75} /> : <Volume2 className="h-4 w-4" strokeWidth={1.75} />}
          </button>
          <span className={`${type.small} ml-1 text-white/70 tabular-nums`}>
            {clock(time)} / {clock(length || 122)}
          </span>
          <button type="button" onClick={fullscreen} aria-label="Full screen" className={`${button} ml-auto`}>
            <Maximize className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
        <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full bg-white/80" style={{ width: `${length ? (time / length) * 100 : 0}%` }} />
        </div>
      </div>
    </div>
  )
}

/** A phrase in the card's paragraph that opens the essay behind it, styled for the dark card */
function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[var(--film-ink)] underline decoration-[color-mix(in_oklab,var(--film-ink)_35%,transparent)] decoration-dotted decoration-1 underline-offset-[0.22em] transition-colors hover:decoration-[var(--film-ink)]"
    >
      {children}
    </Link>
  )
}

/**
 * The console on an ink panel: what it is, a short paragraph, a link to the platform page and the
 * film. The film plays inside the card: on "Watch the film" with sound, or muted on its own once
 * the card has been on screen for a while. It pauses off screen and fades back to the card when it
 * ends or is closed; once closed it does not start by itself again.
 */
export function FeaturedFilm() {
  const card = useRef<HTMLDivElement | null>(null)
  const video = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const dismissed = useRef(false)
  const reducedMotion = useReducedMotion()

  const start = (withSound: boolean) => {
    const v = video.current
    if (!v) return
    setMuted(!withSound)
    v.muted = !withSound
    setPlaying(true)
    v.play().catch(() => {})
  }
  const close = () => {
    dismissed.current = true
    video.current?.pause()
    setPlaying(false)
  }

  // start muted after the card has been looked at for a while; pause when it leaves the screen
  useEffect(() => {
    const el = card.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout> | undefined
    const seen = new IntersectionObserver(
      ([entry]) => {
        const v = video.current
        if (entry.intersectionRatio >= SEEN) {
          if (!dismissed.current && !reducedMotion && v?.paused && !playing)
            timer = setTimeout(() => start(false), LINGER_MS)
          else if (playing && v?.paused) v.play().catch(() => {})
        } else {
          clearTimeout(timer)
          if (v && !v.paused) v.pause()
        }
      },
      { threshold: [0, SEEN] },
    )
    seen.observe(el)
    return () => {
      clearTimeout(timer)
      seen.disconnect()
    }
  }, [playing, reducedMotion])

  // Esc closes the film; the end of the film brings the card back
  useEffect(() => {
    if (!playing) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    const v = video.current
    document.addEventListener('keydown', onKey)
    v?.addEventListener('ended', close)
    return () => {
      document.removeEventListener('keydown', onKey)
      v?.removeEventListener('ended', close)
    }
  }, [playing])

  return (
    <>
      <div ref={card} className="relative isolate grid min-h-[560px] w-full grid-cols-1 overflow-hidden rounded-2xl bg-[var(--film-bg)] text-left ring-1 ring-[var(--film-ring)] sm:aspect-[16/9] sm:min-h-0 lg:grid-cols-[5fr_7fr]">
        {/* a faint dot grid, the same paper texture the console parts sit on */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(var(--film-dot) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* text starts level with the console image (8% down): padding % follows the column's width,
            which is 5/12 of a 16:9 panel, so 8% of the height is 10.8% of it */}
        <div className="relative z-10 flex flex-col justify-start px-7 pt-10 pb-6 sm:px-12 lg:pt-[10.8%] lg:pb-12">
          <div>
            <p className="m-0 font-[family-name:var(--font-figtree)] text-[clamp(1.75rem,2.6vw,3rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-balance">
              <span className="text-[var(--film-ink)]">The RubixKube Console.</span>{' '}
              <span className="text-[color-mix(in_oklab,var(--film-ink)_50%,transparent)]">Every incident, its cause and the fix, in one place.</span>
            </p>
            <p className="mt-10 max-w-[32em] text-pretty font-[family-name:var(--font-figtree)] font-normal text-[clamp(16px,1.1vw,18px)] leading-[1.6] text-[color-mix(in_oklab,var(--film-ink)_75%,transparent)]">
              Observers in your clusters, machines and clouds{' '}
              <CardLink href="/blog/beyond-observability-building-systems-that-think-with-you">report what breaks</CardLink>.{' '}
              <strong className="font-semibold text-[var(--film-ink)]">Rubix</strong> groups it into incidents and{' '}
              <CardLink href="/blog/stop-optimizing-for-mttr-the-real-bottleneck-is-mttu-ai-sre-solves-it">
                finds the root cause
              </CardLink>{' '}
              of each one, <em className="italic">with the evidence</em>. Then it suggests the fix.{' '}
              <CardLink href="/blog/vibeops-with-rubixkube-learning-building-and-trusting-infra-the-right-way">
                You decide
              </CardLink>{' '}
              how much it may do on its own.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/platform"
              className={`${type.small} rounded-md bg-[var(--film-ink)] px-5 py-2.5 text-[var(--film-bg)] transition-opacity hover:opacity-90`}
            >
              Read more
            </Link>
            <button
              type="button"
              onClick={() => start(true)}
              className={`${type.small} flex cursor-pointer items-center gap-2 rounded-md px-4 py-2.5 text-[color-mix(in_oklab,var(--film-ink)_85%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--film-ink)_20%,transparent)] transition-colors hover:bg-[color-mix(in_oklab,var(--film-ink)_8%,transparent)]`}
            >
              <Play className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} aria-hidden />
              Watch the film
              <span className="text-[color-mix(in_oklab,var(--film-ink)_45%,transparent)]">2:02</span>
            </button>
          </div>
        </div>

        {/* the console itself, rising from the bottom right */}
        <div className="relative min-h-[260px] lg:min-h-0">
          <div className="absolute top-2 left-7 w-[150%] overflow-hidden rounded-xl ring-1 ring-[var(--film-ring)] shadow-[var(--film-shadow)] sm:left-12 lg:top-[8%] lg:left-0 lg:w-[125%]">
            <Image
              src="/screenshots/platform/hero-rca-dark.png"
              alt="An RCA in the RubixKube console: connection exhaustion on orders-db takes down payments-api"
              width={3200}
              height={2000}
              sizes="(max-width: 1024px) 150vw, 75vw"
              className="h-auto w-full"
            />
          </div>
        </div>
        <CardFilm
          video={video}
          shown={playing}
          muted={muted}
          onMute={() => {
            const v = video.current
            if (v) v.muted = !muted
            setMuted(!muted)
          }}
          onClose={close}
        />
      </div>
    </>
  )
}
