'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, Check } from "lucide-react"
import { fadeUpVariants } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Button } from "@/components/ui/button"

interface NewsletterSignupProps {
  compact?: boolean
  className?: string
}

export function NewsletterSignup({ compact = false, className = "" }: NewsletterSignupProps) {
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  if (compact) {
    return (
      <motion.div
        className={`bg-accent/5 border border-accent/20 rounded-2xl p-6 ${className}`}
        variants={fadeUpVariants}
        {...(prefersReducedMotion ? { initial: "visible" } : { 
          initial: "hidden",
          animate: "visible",
          transition: { delay: 0.8 }
        })}
      >
        {subscribed ? (
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">
              You&apos;re subscribed!
            </h3>
            <p className="text-sm text-foreground-muted">
              Welcome to the reliability era.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-foreground-muted mb-4">
              Get the latest insights on infrastructure reliability.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                size="md"
                className="w-full"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`bg-card-background border border-border rounded-2xl p-4 sm:p-6 md:p-8 ${className}`}
      variants={fadeUpVariants}
      {...(prefersReducedMotion ? { initial: "visible" } : { 
        initial: "hidden",
        animate: "visible",
        transition: { delay: 0.5 }
      })}
    >
      {subscribed ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
            Welcome aboard!
          </h3>
          <p className="text-foreground-muted">
            You&apos;ll receive our latest insights on infrastructure reliability and AI operations.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 px-2">
            Stay ahead of the{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                reliability
              </span>{" "}
              curve
            </h2>
            <p className="text-sm sm:text-base text-foreground-muted max-w-md mx-auto px-2">
              Join thousands of engineers getting insights on infrastructure reliability, 
              AI operations, and the future of SRE.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full sm:w-auto whitespace-nowrap"
            >
              {isLoading ? (
                'Subscribing...'
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-foreground-muted mt-4 text-center">
            No spam, unsubscribe at any time. Read our{" "}
            <a href="/legal/privacy" className="text-accent hover:text-accent/80 transition-colors">
              privacy policy
            </a>
            .
          </p>
        </>
      )}
    </motion.div>
  )
}
