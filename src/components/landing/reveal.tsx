'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useLandingScrollRoot } from './landing-scroll-context'
import { cn } from '@/lib/utils'

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
}

export function Reveal({ children, className, delay = 0, ...rest }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const scrollRootRef = useLandingScrollRoot()

  return (
    <motion.div
      variants={fadeUpVariants}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{
        once: true,
        margin: '-6% 0px',
        ...(scrollRootRef ? { root: scrollRootRef } : {}),
      }}
      transition={{ delay }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
