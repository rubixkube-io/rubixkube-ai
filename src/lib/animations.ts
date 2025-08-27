import { Variants } from 'framer-motion'

export const fadeUpVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
}

export const fadeUp = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-10% 0px" }
}

export const cardHoverVariants: Variants = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: { 
    y: -4, 
    boxShadow: "0 16px 40px rgba(2,6,23,0.12)",
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 26
    }
  }
}

export const cardHover = {
  initial: "rest",
  whileHover: "hover"
}
