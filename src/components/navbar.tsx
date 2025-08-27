'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'

import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants } from '@/lib/animations'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Platform', href: '/platform' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Resources', href: '/resources' },
  { name: 'Our Story', href: '/about' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 24
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  return (
    <motion.header
      variants={fadeUpVariants}
      {...(prefersReducedMotion ? { initial: "visible" } : { initial: "hidden", animate: "visible" })}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled 
          ? 'bg-background/70 backdrop-blur border-b border-border' 
          : 'bg-transparent'
      )}
    >
              <nav className="mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-6 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <span className="flex items-center space-x-4">
              <Image
                src="/logo-icon.png"
                alt="RubixKube Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <Image 
                src="/logo-text.svg" 
                alt="RubixKube" 
                width={120}
                height={24}
                className="h-6 w-auto dark:invert" 
              />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:underline hover:underline-offset-4 transition-all duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button asChild>
              <CalendlyBooking url="https://calendly.com/rubixkube/new-meeting">
                Book Demo
              </CalendlyBooking>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-background-secondary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden border-t border-border bg-background"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-background-secondary rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <Button asChild>
                    <CalendlyBooking url="https://calendly.com/rubixkube/new-meeting" className="w-full">
                      Book Demo
                    </CalendlyBooking>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
