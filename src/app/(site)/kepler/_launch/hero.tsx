'use client'

import { useEffect, useRef } from 'react'
import { ASSETS, DISCORD_URL, FACES, NAV, TAGLINE } from '../content'
import { AppleIcon, KeplerMark, LinuxIcon, WindowsIcon } from './icons'
import { Notify } from './notify'
import { SYSTEMS, useDownloads, type Os } from './use-downloads'
import { usePrefersReducedMotion, type Left } from './use-launch'

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
      <video ref={video} className="planet" muted loop playsInline preload="none" poster={`${ASSETS}/hero-planet-hd.webp`} />
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

/** After launch: the download for the visitor's system, else the list of all of them. */
function Download() {
  const { os, files } = useDownloads()
  const system = SYSTEMS.find((s) => s.os === os)
  const Icon = os ? ICON[os] : null
  // Linux has three packages, so its button goes to the list
  const href = os && os !== 'linux' ? files[os][0].url : '#download'
  return (
    <div className="golive">
      <div className="go">
        <a className="btn primary" href={href}>
          {Icon && <Icon />}
          {system ? `Download for ${system.name}` : 'Download Kepler'}
        </a>
        <a className="btn ghost" href="#pricing">
          See pricing
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

/** After launch the hero is type only, and the real product screen follows on the same dark ground. */
function Screen() {
  return (
    <div className="screens">
      <div className="sect-head">
        <h2>
          See it work.<span>One question, the evidence and the fix.</span>
        </h2>
      </div>
      <figure className="screen">
        {/* eslint-disable-next-line @next/next/no-img-element -- a fixed product screenshot */}
        <img
          src={`${ASSETS}/screen-workspace.webp`}
          width={2000}
          height={1254}
          loading="lazy"
          alt="Kepler investigating why a checkout deployment is not ready: the commands it ran, the evidence, a timeline and the fix"
        />
      </figure>
    </div>
  )
}

export function Hero({ live, left }: { live: boolean; left: Left }) {
  return (
    <section className="hero" id="top">
      <div className="pin">
        <Planet />
        <header className="bar">
          <a className="brand" href="#top">
            <KeplerMark />
            <b>Kepler</b>
          </a>
          <nav aria-label="Kepler">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
        </header>
        <div className="lead">
          <h1>
            <span className="thin">{live ? 'Kepler is open' : 'Kepler opens to everyone'}</span>
            <span className="bold">{live ? 'to everyone.' : 'on 20 November.'}</span>
          </h1>
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
      </div>
      {live && <Screen />}
    </section>
  )
}
