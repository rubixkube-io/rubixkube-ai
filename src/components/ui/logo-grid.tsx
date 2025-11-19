'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface Logo {
  name: string
  src: string
  width?: number
  height?: number
}

const logos: Logo[] = [
  { name: 'GCP', src: '/logos/gcp.png', width: 240, height: 80 },
  { name: 'Yellow.ai', src: '/logos/yellow-ai.png', width: 120, height: 40 },
  { name: 'Fleek', src: '/logos/fleek.png', width: 100, height: 40 },
  { name: 'Vishanti', src: '/logos/vishanti.png', width: 120, height: 40 },
  { name: 'Sheshi.ai', src: '/logos/Sheshi-ai.svg', width: 120, height: 40 },
  { name: 'NVIDIA Inception', src: '/logos/nvidia-inception-program-badge-rgb-for-screen.png', width: 120, height: 50 },
]

interface LogoGridProps {
  title?: string
  subtitle?: string
  compact?: boolean
}

export function LogoGrid({ title, subtitle, compact = false }: LogoGridProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={compact ? 'w-full' : 'w-full max-w-6xl mx-auto px-6 md:px-8'}>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-sm font-medium text-foreground-muted mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-foreground-muted/70">{subtitle}</p>
          )}
        </div>
      )}

      <div className={`${compact ? 'flex flex-wrap gap-6' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12'} items-center justify-center`}>
        {logos.map((logo, index) => (
          <motion.div
            key={logo.name}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: prefersReducedMotion ? 0 : index * 0.1,
              ease: 'easeOut'
            }}
            className="group relative"
          >
            <div className="relative w-40 h-32 flex items-center justify-center bg-white dark:bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width || 120}
                height={logo.height || 40}
                className="relative object-contain max-w-full h-auto transition-transform duration-300 group-hover:scale-110"
                style={{ maxHeight: '80px' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
