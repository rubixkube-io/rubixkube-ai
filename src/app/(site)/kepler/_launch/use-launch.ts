'use client'

import { useEffect, useState } from 'react'
import { LAUNCH_AT, isLive } from '../launch'

export type Left = { days: number; hours: number; minutes: number; seconds: number }

/** In development, /kepler?preview=live shows the page as it is after launch */
const previewLive = () => process.env.NODE_ENV !== 'production' && new URLSearchParams(location.search).get('preview') === 'live'

/** The time now, ticking every second until launch. Starts from the server's time so the first render matches. */
export function useLaunch(serverNow: number): { live: boolean; left: Left } {
  const [now, setNow] = useState(serverNow)
  const live = isLive(now)
  useEffect(() => {
    if (live) return
    if (previewLive()) return setNow(LAUNCH_AT)
    const tick = () => setNow(Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [live])
  const s = Math.max(0, Math.floor((LAUNCH_AT - now) / 1000))
  return {
    live,
    left: { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 },
  }
}

/** True when the visitor asked for less motion */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const q = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(q.matches)
    update()
    q.addEventListener('change', update)
    return () => q.removeEventListener('change', update)
  }, [])
  return reduce
}

/** Calls `fn` on scroll and resize, once per frame at most */
export function useOnScroll(fn: () => void) {
  useEffect(() => {
    let frame = 0
    const run = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fn)
    }
    run()
    addEventListener('scroll', run, { passive: true })
    addEventListener('resize', run)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('scroll', run)
      removeEventListener('resize', run)
    }
  }, [fn])
}
