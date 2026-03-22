'use client'

import { useEffect } from 'react'

const HTML_CLASS = 'rk-landing-active'

/**
 * Matches redesign.html: only <main.landing-scroll> scrolls — not the document body.
 * Prevents double-scroll and makes scroll-snap feel like the standalone page.
 */
export function HomeScrollLock() {
  useEffect(() => {
    document.documentElement.classList.add(HTML_CLASS)
    return () => document.documentElement.classList.remove(HTML_CLASS)
  }, [])
  return null
}
