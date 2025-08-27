'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeUpVariants } from '@/lib/animations'
import { useTheme } from '@/components/theme-provider'
import DotGrid from '@/components/ui/bg'

export default function NotFound() {
  const { resolvedTheme } = useTheme()
  
  // Theme-aware colors for DotGrid
  const dotColors = resolvedTheme === 'dark' 
    ? {
        baseColor: "rgba(147, 197, 253, 0.06)", // Light blue, very subtle
        activeColor: "rgba(147, 197, 253, 0.12)" // Light blue, slightly more visible
      }
    : {
        baseColor: "rgba(59, 130, 246, 0.06)", // Darker blue, very subtle  
        activeColor: "rgba(162, 196, 250, 0.12)" // Darker blue, slightly more visible
      }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* DotGrid background */}
      <div className="absolute inset-0">
        <DotGrid
          dotSize={3}
          gap={20}
          baseColor={dotColors.baseColor}
          activeColor={dotColors.activeColor}
          proximity={120}
          shockRadius={250}
          shockStrength={4}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      
      <motion.div 
        className="text-center z-10 max-w-2xl mx-auto px-6"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="relative mb-8"
          variants={fadeUpVariants}
        >
          <div
            className="text-7xl md:text-8xl font-black uppercase relative text-accent animate-pulse"
            style={{
              textShadow: '3px 3px 0px rgba(59, 130, 246, 0.3), -2px -2px 0px rgba(96, 165, 250, 0.3)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.05em'
            }}
          >
            ERROR
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-4xl text-foreground mb-6 font-bold"
          variants={fadeUpVariants}
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          404 - Achievement Unlocked!
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-foreground-muted mb-8 max-w-lg mx-auto leading-relaxed"
          variants={fadeUpVariants}
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          Congratulations! You&apos;ve discovered a page that exists in a parallel universe.
        </motion.p>
        
        <motion.div variants={fadeUpVariants}>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg py-6 px-10">
            <Link href="/">
              Back to Reality
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
