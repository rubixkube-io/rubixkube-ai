'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'

interface HeroVideoProps {
  prefersReducedMotion: boolean
}

export function HeroVideo({ prefersReducedMotion }: HeroVideoProps) {
  return (
    <motion.div
      variants={fadeUpVariants}
      {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.5 } })}
      className="hidden lg:flex items-center justify-center perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="transform-gpu"
        whileHover={prefersReducedMotion ? {} : {
          scale: 1.55,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
        animate={{
          rotateX: 0,
          rotateY: 0,
          scale: 1.5
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <video
          src="/hero.webm"
          autoPlay
          muted
          loop
          playsInline
          className="object-contain w-auto h-auto max-w-[600px] drop-shadow-2xl"
          style={{
            maxHeight: '500px',
            backgroundColor: 'transparent',
            mixBlendMode: 'normal'
          }}
        />
      </motion.div>
    </motion.div>
  );
}
