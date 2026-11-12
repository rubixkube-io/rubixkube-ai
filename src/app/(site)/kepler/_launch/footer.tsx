'use client'

import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { ASSETS, DISCORD_URL, DOCS_URL, TAGLINE } from '../content'
import { KeplerMark } from './icons'
import { useOnScroll, usePrefersReducedMotion } from './use-launch'

/** The full lockup rises from the footer's edge and draws its orbit as the footer comes into view. */
function Lockup() {
  const wrap = useRef<HTMLDivElement>(null)
  const lock = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()
  const place = useCallback(() => {
    if (!wrap.current || !lock.current) return
    if (reduce) return lock.current.style.setProperty('--p', '1')
    const r = wrap.current.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, ((innerHeight - r.top) / r.height - 0.35) / 0.6))
    lock.current.style.setProperty('--p', (1 - Math.pow(1 - p, 3)).toFixed(3))
  }, [reduce])
  useOnScroll(place)
  return (
    <div className="reveal" ref={wrap} aria-hidden="true">
      <div className="lock" ref={lock}>
        <KeplerMark ring="orb" moon="sat" />
        <span>Kepler</span>
      </div>
    </div>
  )
}

export function Footer({ live }: { live: boolean }) {
  const columns = [
    {
      title: 'Kepler',
      links: [
        live ? { href: '/kepler#download', label: 'Download' } : { href: '/kepler#notify', label: 'Notify me' },
        { href: '/kepler#pricing', label: 'Pricing' },
        { href: DOCS_URL, label: 'Docs' },
      ],
    },
    {
      title: 'Community',
      links: [
        { href: DISCORD_URL, label: 'Discord' },
        { href: '/kepler#people', label: 'The beta' },
        { href: '/kepler#founder', label: 'Founder' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/', label: 'RubixKube' },
        { href: '/legal/privacy', label: 'Privacy' },
        { href: '/legal/terms', label: 'Terms' },
      ],
    },
  ]
  return (
    <>
      <Lockup />
      <footer>
        <div className="ftop">
          <div className="about">
            <p>{TAGLINE}</p>
            <span className="by">
              by
              {/* eslint-disable-next-line @next/next/no-img-element -- the RubixKube wordmark, an svg */}
              <img src={`${ASSETS}/rk-on-dark.svg`} alt="RubixKube" />
            </span>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('/') ? (
                      <Link href={l.href}>{l.label}</Link>
                    ) : (
                      <a href={l.href} rel={l.href.startsWith('http') ? 'noopener' : undefined}>
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="fbase">
          <span>© 2026 RubixKube</span>
          <span>{live ? 'Open to everyone since 20 November' : 'Opens 20 November'}</span>
        </div>
      </footer>
    </>
  )
}
