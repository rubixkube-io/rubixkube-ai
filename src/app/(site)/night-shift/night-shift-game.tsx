'use client'

import { useEffect, useRef, useState } from 'react'
import posthog from 'posthog-js'
import { Button } from '@/components/ui/button'
import { outlineInkMd } from '@/lib/outline-blue-cta'

const GAME_SRC = '/games/night-shift/index.html'
const mono = 'font-[family-name:var(--font-mono)]'

/**
 * The game, served as static files from public/games/night-shift and shown in a frame so its
 * scripts and styles stay apart from the site's. Full screen uses the browser's own full screen;
 * where a frame cannot go full screen (iPhone), the frame is fixed over the whole window instead.
 */
export function NightShiftGame() {
  const frame = useRef<HTMLIFrameElement>(null)
  const [cover, setCover] = useState(false)

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin || e.data?.source !== 'rubix-night-shift') return
      if (e.data.type === 'immersive') setCover(!!e.data.on)
      if (e.data.type === 'night_finished') posthog.capture('night_shift_night_finished', { night: e.data.night })
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = cover ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [cover])

  const fullScreen = () => {
    const el = frame.current
    if (!el) return
    if (el.requestFullscreen) el.requestFullscreen().then(() => el.focus()).catch(() => setCover(true))
    else setCover(true)
  }

  return (
    <div>
      <div
        className={
          cover
            ? 'fixed inset-0 z-[3000] bg-[#05040a] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]'
            : 'relative mx-auto aspect-[16/10] w-full max-w-[1080px] overflow-hidden rounded-[10px] border border-[#2a2240] bg-[#0b0914] shadow-[0_30px_80px_-20px_rgba(17,19,24,0.45)]'
        }
      >
        <iframe
          ref={frame}
          src={GAME_SRC}
          title="Rubix Night Shift"
          allow="fullscreen; autoplay"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="mx-auto mt-4 flex max-w-[1080px] flex-wrap items-center justify-between gap-4">
        <Button variant="outline" size="sm" className={outlineInkMd} onClick={fullScreen}>
          Full screen
        </Button>
        <p className={`${mono} m-0 max-w-[70ch] text-[12px] leading-relaxed font-light text-[var(--mid)]`}>
          Click the game, then move with WASD or the arrow keys. E or Space to talk and look, J for the incidents, F for full screen, M for sound. On a phone, New game opens full screen with touch controls.
        </p>
      </div>
    </div>
  )
}
