'use client'

import posthog from 'posthog-js'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ASSETS, DISCORD_URL, DOCS_URL, FACES, NAV, NAV_LIVE, TAGLINE, TITLE_LIVE } from '../content'
import { KeplerDemo } from './demo'
import { AppleIcon, KeplerMark, LinuxIcon, WindowsIcon } from './icons'
import { Notify } from './notify'
import { SYSTEMS, useDownloads, type Os } from './use-downloads'
import { useOnScroll, usePrefersReducedMotion, type Left } from './use-launch'

const ICON: Record<Os, () => React.JSX.Element> = { mac: AppleIcon, win: WindowsIcon, linux: LinuxIcon }
const pad = (n: number) => String(n).padStart(2, '0')

/** The planet loops as video on larger screens; phones and reduced motion keep the still. */
function Planet() {
  const video = useRef<HTMLVideoElement>(null)
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    const v = video.current
    if (!v || reduce || !matchMedia('(min-width: 761px)').matches) return
    v.src = `${ASSETS}/hero-loop.mp4`
    v.play().catch(() => {})
  }, [reduce])
  return (
    <div className="planet-wrap" aria-hidden="true">
      {/* The poster is the loop's own first frame, so the planet does not jump when the video takes over */}
      <video ref={video} className="planet" muted loop playsInline preload="none" poster={`${ASSETS}/hero-loop-poster.webp`} />
    </div>
  )
}

function Countdown({ left }: { left: Left }) {
  const units = [
    [left.days, 'days'],
    [left.hours, 'hours'],
    [left.minutes, 'min'],
    [left.seconds, 'sec'],
  ] as const
  return (
    <div className="count" role="timer" aria-label={`${left.days} days and ${left.hours} hours until launch`}>
      <div className="nums">
        {units.map(([n, l]) => (
          <div key={l}>
            <span className="n">{pad(n)}</span>
            <span className="l">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** The download for the visitor's system, else the list of all of them. Linux has three packages, so it goes to the list. */
function useDownload(from: string) {
  const { os, files } = useDownloads()
  const system = SYSTEMS.find((s) => s.os === os)
  const file = os && os !== 'linux' ? files[os][0] : null
  return {
    system,
    Icon: os ? ICON[os] : null,
    href: file ? file.url : '#download',
    onClick: () => file && posthog.capture('kepler_download_clicked', { platform: file.key, from }),
  }
}

/** After launch: the download, and the docs for engineers who read before they install. */
function Download() {
  const { system, Icon, href, onClick } = useDownload('hero')
  return (
    <div className="golive">
      <div className="go">
        <a className="btn primary" href={href} onClick={onClick}>
          {Icon && <Icon />}
          {system ? `Download for ${system.name}` : 'Download Kepler'}
        </a>
        <a className="btn ghost" href={DOCS_URL} rel="noopener">
          Read the docs
        </a>
      </div>
      <p>
        {system ? (
          <>
            {system.detail}. Also on <a href="#download">{system.also}</a>.
          </>
        ) : (
          <>
            For macOS, Windows and Linux. <a href="#download">All downloads</a>
          </>
        )}
      </p>
    </div>
  )
}

/** The headline's second line rolls up through each role once and stays on the last. Reduced motion shows the last. */
function Roles() {
  const reduce = usePrefersReducedMotion()
  const last = TITLE_LIVE.roles.length - 1
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return setI(last)
    if (i >= last) return
    const id = setTimeout(() => setI(i + 1), i === 0 ? 2600 : 2200)
    return () => clearTimeout(id)
  }, [i, last, reduce])
  return (
    <span className="bold roll" aria-hidden="true">
      <span key={i}>{TITLE_LIVE.roles[i]}</span>
    </span>
  )
}

/** The nav's last link after launch: the download for the visitor's system */
function NavDownload() {
  const { href, onClick } = useDownload('nav')
  return (
    <a href={href} onClick={onClick}>
      Download
    </a>
  )
}

/** The share of the hero's scroll spent raising the window; the rest holds it in place to be used */
const RISE = 0.45
const RISE_MEDIA = '(min-width: 761px) and (prefers-reduced-motion: no-preference)'

/** After launch on larger screens the hero pins and, as the page scrolls, the Kepler window rises over the planet.
 *  Sets --r (0 to 1) on the hero and returns true once the window is in place, which starts its replay.
 *  Phones and reduced motion get the window under the hero instead, ready at once. */
function useRise(ref: React.RefObject<HTMLElement | null>, on: boolean) {
  const [risen, setRisen] = useState(false)
  const measure = useCallback(() => {
    const el = ref.current
    if (!el || !on) return
    if (!matchMedia(RISE_MEDIA).matches) return setRisen(true)
    const box = el.getBoundingClientRect()
    const r = Math.min(1, Math.max(0, -box.top / Math.max(1, (box.height - innerHeight) * RISE)))
    el.style.setProperty('--r', r.toFixed(3))
    if (r > 0.92) setRisen(true)
  }, [ref, on])
  useOnScroll(measure)
  return risen
}

/** Before launch: the countdown and the planet. After: the download, then Kepler itself rises over the planet and
 *  replays an incident, waiting for the visitor to press Run. */
export function Hero({ live, left }: { live: boolean; left: Left }) {
  const ref = useRef<HTMLElement>(null)
  const risen = useRise(ref, live)
  return (
    <section className={live ? 'hero rise' : 'hero'} id="top" ref={ref}>
      <div className="pin">
        <Planet />
        <header className="bar">
          <a className="brand" href="#top">
            <KeplerMark />
            <b>Kepler</b>
          </a>
          <nav aria-label="Kepler">
            {(live ? NAV_LIVE : NAV).map((n) => (
              <a key={n.href} href={n.href} rel={n.href.startsWith('http') ? 'noopener' : undefined}>
                {n.label}
              </a>
            ))}
            {live && <NavDownload />}
          </nav>
        </header>
        <div className="lead">
          {live ? (
            <h1 aria-label={`${TITLE_LIVE.lead} ${TITLE_LIVE.roles.at(-1)}`}>
              <span className="thin" aria-hidden="true">
                {TITLE_LIVE.lead}
              </span>
              <Roles />
            </h1>
          ) : (
            <h1>
              <span className="thin">Kepler opens to everyone</span>
              <span className="bold">on 20 November.</span>
            </h1>
          )}
          {live ? <Download /> : <Countdown left={left} />}
          <p className="sub">{TAGLINE}</p>
          {!live && <Notify />}
          <a className="hfaces" href={DISCORD_URL} rel="noopener">
            <span>
              {FACES.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element -- 30px avatars, already sized
                <img key={src} src={src} alt="" width={30} height={30} />
              ))}
            </span>
            Join the operators already inside
          </a>
        </div>
        {live && (
          <div className="demo">
            <KeplerDemo ready={risen} />
          </div>
        )}
      </div>
    </section>
  )
}
