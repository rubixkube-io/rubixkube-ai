'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '../content'
import { usePrefersReducedMotion } from './use-launch'

/** Plays muted while at least a quarter of it is on screen; holds its still otherwise and for reduced motion. */
function InViewVideo({ src, poster, label, onRef }: { src: string; poster: string; label: string; onRef?: (v: HTMLVideoElement | null) => void }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    const v = ref.current
    onRef?.(v)
    if (!v || reduce) return
    const seen = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 })
    seen.observe(v)
    return () => seen.disconnect()
  }, [reduce, onRef])
  return (
    <video ref={ref} muted loop playsInline preload="none" poster={poster} aria-label={label}>
      <source src={src} type="video/mp4" />
    </video>
  )
}

/** The interview reel: the participants in their own words, muted until the visitor turns the sound on. */
function Voices() {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [muted, setMuted] = useState(true)
  const toggle = () => {
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
    if (!video.muted) video.play().catch(() => {})
  }
  return (
    <figure className="tile reel">
      <InViewVideo
        src={`${ASSETS}/voices.mp4`}
        poster={`${ASSETS}/voices-poster.webp`}
        label="Hack Day participants on Kepler, in their own words"
        onRef={setVideo}
      />
      <button type="button" className="sound" onClick={toggle} aria-pressed={!muted}>
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </figure>
  )
}

const PHOTOS = [
  { src: 'photo-crowd.webp', alt: 'The crowd packed under the canopy at Mauji before the opening talk', cls: 'p-a' },
  { src: 'photo-room.webp', alt: 'The room from above, every table taken by people building', cls: 'p-b' },
]

/** Hack Day Pune as a mosaic: the film, the interview reel and photos from the day. */
export function HackDayMosaic() {
  return (
    <figure className="mosaic">
      <div className="grid">
        <div className="tile film">
          <InViewVideo
            src={`${ASSETS}/hackday.mp4`}
            poster={`${ASSETS}/hackday-poster.webp`}
            label="Hack Day Pune: the crowd arriving, talks, teams building at their laptops, demos, and the crowd again"
          />
        </div>
        <Voices />
        {PHOTOS.map((p) => (
          <div key={p.src} className={`tile ${p.cls}`}>
            <Image src={`${ASSETS}/${p.src}`} alt={p.alt} fill sizes="(max-width: 760px) 50vw, 33vw" />
          </div>
        ))}
      </div>
      <figcaption>Hack Day Pune, 25 October. 146 people in one room.</figcaption>
    </figure>
  )
}
