'use client'

import { useEffect, useRef } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface LottieAnimationProps {
  animationData: Record<string, unknown>
  className?: string
  loop?: boolean
  autoplay?: boolean
  speed?: number
  delay?: number
}

export function LottieAnimation({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  delay = 0
}: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed)
      
      if (prefersReducedMotion) {
        lottieRef.current.pause()
      } else if (autoplay && delay > 0) {
        lottieRef.current.pause()
        setTimeout(() => {
          lottieRef.current?.play()
        }, delay * 1000)
      }
    }
  }, [speed, prefersReducedMotion, autoplay, delay])

  if (prefersReducedMotion) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg flex items-center justify-center">
          <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">
            Animation
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
    >
      <div className="relative w-full h-full">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={loop}
          autoplay={autoplay && !prefersReducedMotion}
          className="w-full h-full"
        />
      </div>
    </motion.div>
  )
}
