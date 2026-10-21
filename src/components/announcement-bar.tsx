'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'

const KEPLER_URL = 'https://trykepler.rubixkube.ai'
const DISMISS_KEY = 'rk-announce-kepler-launch'
const OFF_CLASS = 'rk-announce-off'

/**
 * Launch bar pinned above the navbar. Dismiss lasts for the tab session only. Height feeds --nav-stack via --announce-h,
 * so the fixed header and the homepage snap sections shift with it.
 */
export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    let off = false
    try {
      off = sessionStorage.getItem(DISMISS_KEY) === '1'
    } catch {}
    if (off) {
      document.documentElement.classList.add(OFF_CLASS)
      setDismissed(true)
    }
  }, [])

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {}
    document.documentElement.classList.add(OFF_CLASS)
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <>
      {/* Runs while the HTML parses so a returning visitor never sees the bar flash before hydration */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem('${DISMISS_KEY}')==='1')document.documentElement.classList.add('${OFF_CLASS}')}catch(e){}`,
        }}
      />
    <div
      role="region"
      aria-label="Announcement"
      className="fixed top-0 right-0 left-0 z-[101] flex h-[var(--announce-h)] overflow-hidden items-center justify-center border-b border-white/10 bg-[#111318] px-10 font-[family-name:var(--font-mono)] text-[13px] tracking-[0.02em] text-[#f2f0eb] sm:px-[var(--pad)] sm:text-[13px]"
    >
      <Link
        href={KEPLER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-w-0 items-center gap-2.5 sm:gap-3"
      >
        <span className="shrink-0 rounded-[3px] bg-[var(--blue)] px-1.5 py-0.5 text-[12px] font-medium tracking-[0.14em] text-white uppercase sm:text-[12px]">
          New
        </span>
        <span className="truncate">
          <span className="hidden sm:inline">Kepler, the SRE IDE by RubixKube, is here.</span>
          <span className="sm:hidden">Kepler, the SRE IDE, is here.</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[#c4c5cc] transition-colors group-hover:text-white">
          Try Kepler
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
        </span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 text-[#c4c5cc] transition-colors hover:text-white sm:right-[calc(var(--pad)/2)]"
      >
        <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      </button>
    </div>
    </>
  )
}
