'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Copy, Check, Twitter, Linkedin } from "lucide-react"
import { fadeUpVariants } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ShareMenuProps {
  title: string
  url?: string
  className?: string
}

export function ShareMenu({ title, url, className = "" }: ShareMenuProps) {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL: ', err)
    }
  }

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-blue-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-blue-600'
    }
  ]

  return (
    <motion.div
      className={`bg-card-background border border-border rounded-2xl p-6 ${className}`}
      variants={fadeUpVariants}
      {...(prefersReducedMotion ? { initial: "visible" } : { 
        initial: "hidden",
        animate: "visible",
        transition: { delay: 0.7 }
      })}
    >
      <h3 className="font-heading text-lg font-bold text-foreground mb-4">
        Share this article
      </h3>
      
      <div className="flex items-center gap-3">
        {/* Copy URL button */}
        <button
          onClick={copyToClipboard}
          className="p-2 bg-background-secondary border border-border rounded-lg hover:bg-background-tertiary transition-all duration-200 group"
          title={copied ? "Copied!" : "Copy URL"}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Copy className="w-4 h-4 text-foreground-muted group-hover:text-foreground" />
          )}
        </button>

        {/* Social share buttons */}
        {shareLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 bg-background-secondary border border-border rounded-lg hover:bg-background-tertiary transition-all duration-200 group ${link.color}`}
              title={`Share on ${link.name}`}
            >
              <Icon className="w-4 h-4 text-foreground-muted group-hover:text-current" />
            </a>
          )
        })}

        {/* Generic share button (if supported) */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={() => {
              navigator.share({
                title: title,
                url: shareUrl
              })
            }}
            className="p-2 bg-background-secondary border border-border rounded-lg hover:bg-background-tertiary transition-all duration-200 group"
            title="Share"
          >
            <Share2 className="w-4 h-4 text-foreground-muted group-hover:text-foreground" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
