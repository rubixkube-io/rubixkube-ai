'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { fadeUpVariants } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings?: TOCItem[]
  className?: string
}

export function TableOfContents({ headings = [], className = "" }: TableOfContentsProps) {
  const prefersReducedMotion = useReducedMotion()
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { 
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    )

    // Observe all headings
    const headingElements = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id]')
    headingElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      })
    }
  }

  if (headings.length === 0) {
    // Fallback static TOC for demo
    const staticHeadings = [
      { id: 'introduction', text: 'Introduction', level: 2 },
      { id: 'getting-started', text: 'Getting Started', level: 3 },
      { id: 'best-practices', text: 'Best Practices', level: 3 },
      { id: 'advanced-topics', text: 'Advanced Topics', level: 2 },
      { id: 'conclusion', text: 'Conclusion', level: 2 },
    ]
    headings = staticHeadings
  }

  return (
    <>
      {/* Desktop Version */}
      <motion.div
        className={`hidden lg:block bg-card-background border border-border rounded-2xl p-6 ${className}`}
        variants={fadeUpVariants}
        {...(prefersReducedMotion ? { initial: "visible" } : { 
          initial: "hidden",
          animate: "visible",
          transition: { delay: 0.6 }
        })}
      >
        <h3 className="font-heading text-lg font-bold text-foreground mb-4">
          On this page
        </h3>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left text-sm transition-colors duration-200 ${
                heading.level === 3 ? 'pl-3' : ''
              } ${
                activeId === heading.id
                  ? 'text-accent font-medium'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Mobile Version - Collapsible */}
      <div className="lg:hidden">
        <details className="bg-card-background border border-border rounded-2xl overflow-hidden">
          <summary className="p-4 cursor-pointer hover:bg-background-secondary transition-colors">
            <h3 className="font-heading text-lg font-bold text-foreground inline">
              On this page
            </h3>
          </summary>
          <nav className="px-4 pb-4 space-y-2">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => {
                  scrollToHeading(heading.id)
                  // Close the details element on mobile after clicking
                  const details = document.querySelector('details')
                  if (details) details.open = false
                }}
                className={`block w-full text-left text-sm transition-colors duration-200 ${
                  heading.level === 3 ? 'pl-3' : ''
                } ${
                  activeId === heading.id
                    ? 'text-accent font-medium'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </details>
      </div>
    </>
  )
}
