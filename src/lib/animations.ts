import { Variants } from 'framer-motion'

export const fadeUpVariants: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export const fadeUp = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-8% 0px' },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

/** Subtle lift for legacy card grids until fully restyled */
export const cardHoverVariants: Variants = {
  rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: {
    y: -2,
    boxShadow: '0 12px 32px rgba(17,19,24,0.08)',
    transition: { type: 'spring', stiffness: 400, damping: 28 },
  },
}

export const cardHover = {
  initial: 'rest' as const,
  whileHover: 'hover' as const,
}
