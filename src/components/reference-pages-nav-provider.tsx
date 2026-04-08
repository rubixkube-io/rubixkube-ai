'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { ReferenceGuideNavItem } from '@/lib/reference-nav'

const ReferencePagesNavContext = createContext<ReferenceGuideNavItem[]>([])

export function ReferencePagesNavProvider({
  guides,
  children,
}: {
  guides: ReferenceGuideNavItem[]
  children: ReactNode
}) {
  return (
    <ReferencePagesNavContext.Provider value={guides}>{children}</ReferencePagesNavContext.Provider>
  )
}

export function useReferenceGuidesNav(): ReferenceGuideNavItem[] {
  return useContext(ReferencePagesNavContext)
}
