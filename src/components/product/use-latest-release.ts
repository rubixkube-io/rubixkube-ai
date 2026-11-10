'use client'

import { useEffect, useState } from 'react'
import { detectPlatform, fetchLatest, type PlatformKey, type Release } from '@/app/(site)/kepler/releases'

/** The latest release and the visitor's platform. Both are null on the server, with JavaScript off, and when GitHub cannot be reached. */
export function useLatestRelease(): { release: Release | null; platform: PlatformKey | null } {
  const [state, setState] = useState<{ release: Release | null; platform: PlatformKey | null }>({ release: null, platform: null })
  useEffect(() => {
    let live = true
    const platform = detectPlatform(navigator.userAgent || '')
    setState((s) => ({ ...s, platform }))
    fetchLatest().then((release) => {
      if (live) setState({ release, platform })
    })
    return () => {
      live = false
    }
  }, [])
  return state
}
