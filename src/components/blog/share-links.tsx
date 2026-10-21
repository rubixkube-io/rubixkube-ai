'use client'

import { useState } from 'react'
import { Check, Link2, Linkedin } from 'lucide-react'

/** X's mark, which lucide does not carry */
function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.37l7.18-8.2L2 3h6.33l4.38 5.79L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z" />
    </svg>
  )
}

/** Share as three small icons: copy the address, or post it to LinkedIn or X */
export function ShareLinks({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const here = () => window.location.href
  const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')
  const icon = 'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-[var(--mid)] transition-colors hover:bg-[var(--panel)] hover:text-[var(--ink)]'
  return (
    <span className="-mr-1.5 inline-flex items-center gap-0.5">
      <button
        type="button"
        className={icon}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={copied ? 'Copied' : 'Copy link'}
        onClick={() => {
          navigator.clipboard?.writeText(here()).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }).catch(() => {})
        }}
      >
        {copied ? <Check className="h-4 w-4" strokeWidth={1.75} /> : <Link2 className="h-4 w-4" strokeWidth={1.75} />}
      </button>
      <button
        type="button"
        className={icon}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(here())}`)}
      >
        <Linkedin className="h-4 w-4" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        className={icon}
        aria-label="Share on X"
        title="Share on X"
        onClick={() => open(`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(here())}`)}
      >
        <XMark className="h-3.5 w-3.5" />
      </button>
    </span>
  )
}
