'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * The top of every page but the home page and Hubble, as /solutions draws it: one statement, its
 * lead in ink and the rest in grey, then the actions. Anything else that belongs to the header (a
 * details line, a status banner, quick links) goes in `children`, under the actions.
 */
export function PageHero({
  title,
  lede,
  actions,
  children,
  className = 'pb-20 sm:pb-28',
}: {
  /** The lead of the statement, in ink */
  title: ReactNode
  /** The rest of the statement, in grey, on the same lines */
  lede?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  /** Space under the hero */
  className?: string
}) {
  const still = useReducedMotion()
  return (
    <div
      className={`rk-landing-max relative z-10 w-full px-[var(--pad)] pt-[calc(var(--nav-stack)+3.5rem)] sm:pt-[calc(var(--nav-stack)+5rem)] ${className}`}
    >
      <motion.div variants={fadeUpVariants} initial={still ? 'visible' : 'hidden'} animate="visible">
        <h1 className="rk-section-title m-0 max-w-[34ch] text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.1]">
          <span className="text-[var(--ink)]">{title}</span>
          {lede && (
            <>
              {' '}
              <span className="text-[var(--mid)]">{lede}</span>
            </>
          )}
        </h1>
        {actions && <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">{actions}</div>}
        {children}
      </motion.div>
    </div>
  )
}
