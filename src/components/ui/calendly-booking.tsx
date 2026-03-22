'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
  /** e.g. close mobile nav when opening the widget */
  onOpen?: () => void
}

export function CalendlyBooking({
  url,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  asChild = false,
  onOpen,
}: CalendlyBookingProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const openCalendly = () => {
    onOpen?.()
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeCalendly = () => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  const overlay =
    mounted &&
    createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="calendly-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-0 backdrop-blur-md sm:p-4 md:p-6"
            onClick={closeCalendly}
            aria-modal="true"
            role="dialog"
            aria-label="Schedule a demo"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.32 }}
              className="relative flex h-[100dvh] w-full max-h-[100dvh] flex-col overflow-hidden bg-white shadow-2xl sm:h-[min(92dvh,900px)] sm:max-h-[min(92dvh,900px)] sm:max-w-[min(1180px,calc(100vw-2rem))] sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeCalendly}
                className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 shadow-md transition-colors hover:bg-white sm:top-4 sm:right-4"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

              <div className="min-h-0 flex-1 pt-2">
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
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      {asChild ? (
        <div onClick={openCalendly} className={className}>
          {children}
        </div>
      ) : (
        <Button variant={variant} size={size} onClick={openCalendly} className={className}>
          {children}
        </Button>
      )}

      {overlay}
    </>
  )
}
