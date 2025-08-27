'use client'

import { useState } from 'react'
import { InlineWidget } from 'react-calendly'
import { Button } from './button'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CalendlyBookingProps {
  url: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cta'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export function CalendlyBooking({ 
  url, 
  children, 
  className = '',
  variant = 'primary',
  size = 'md',
  asChild = false
}: CalendlyBookingProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openCalendly = () => {
    setIsOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeCalendly = () => {
    setIsOpen(false)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      {asChild ? (
        <div onClick={openCalendly} className={className}>
          {children}
        </div>
      ) : (
        <Button 
          variant={variant} 
          size={size} 
          onClick={openCalendly}
          className={className}
        >
          {children}
        </Button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={closeCalendly}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-4xl h-[80vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeCalendly}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Calendly Widget */}
              <div className="w-full h-full">
                <InlineWidget
                  url={url}
                  styles={{
                    height: '100%',
                    width: '100%',
                  }}
                  prefill={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    name: '',
                  }}
                  pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
