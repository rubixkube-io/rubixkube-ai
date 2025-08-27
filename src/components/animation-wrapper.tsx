'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'

interface AnimationWrapperProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimationWrapper({ children, delay = 0, className = '' }: AnimationWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={fadeUpVariants}
      {...{ ...fadeUp, transition: { delay } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimationSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <section className={className}>{children}</section>
  }

  return (
    <motion.section
      variants={fadeUpVariants}
      {...fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  )
}
