'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { ReferenceGuideNavItem } from '@/lib/reference-nav'

/** A recent blog post or podcast episode, for the Resources menu */
export type RecentNavItem = { kind: 'post' | 'episode'; title: string; href: string; date?: string | null }

const ReferencePagesNavContext = createContext<ReferenceGuideNavItem[]>([])
const RecentNavContext = createContext<RecentNavItem[]>([])

export function ReferencePagesNavProvider({
  guides,
  recent = [],
  children,
}: {
  guides: ReferenceGuideNavItem[]
  recent?: RecentNavItem[]
  children: ReactNode
}) {
  return (
    <ReferencePagesNavContext.Provider value={guides}>
      <RecentNavContext.Provider value={recent}>{children}</RecentNavContext.Provider>
    </ReferencePagesNavContext.Provider>
  )
}

export function useReferenceGuidesNav(): ReferenceGuideNavItem[] {
  return useContext(ReferencePagesNavContext)
}

export function useRecentNav(): RecentNavItem[] {
  return useContext(RecentNavContext)
}
