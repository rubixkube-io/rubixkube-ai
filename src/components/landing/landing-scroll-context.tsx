'use client'

import { createContext, useContext, type RefObject } from 'react'

export const LandingScrollRootRefContext = createContext<RefObject<HTMLElement | null> | null>(null)

export function useLandingScrollRoot() {
  return useContext(LandingScrollRootRefContext)
}
