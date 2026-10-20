'use client'

import { useEffect, useRef } from 'react'

/** True when the key press belongs to something else: typing, a modifier, or an open dialog. */
function ignoreKey(e: KeyboardEvent) {
  if (e.defaultPrevented || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return true
  const el = e.target as HTMLElement | null
  if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return true
  return document.querySelector('[role="dialog"][aria-modal="true"]') !== null
}

/**
 * Runs `action` when a single letter key is pressed on the page, the way the console's
 * shortcuts work. `key` is matched case-insensitively.
 */
export function useKeyShortcut(key: string, action: () => void) {
  const latest = useRef(action)
  useEffect(() => {
    latest.current = action
  })
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (ignoreKey(e) || e.key.toLowerCase() !== key.toLowerCase()) return
      e.preventDefault()
      latest.current()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [key])
}
