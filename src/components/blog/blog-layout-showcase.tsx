'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutGrid, List, Columns, Layers, Newspaper } from "lucide-react"
import { type SanityDocument } from "next-sanity"
import { BlogLayoutGrid } from "./blog-layout-grid"
import { fadeUpVariants } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface BlogLayoutShowcaseProps {
  posts: SanityDocument[]
  defaultLayout?: 'masonry' | 'grid' | 'featured-grid' | 'magazine' | 'list'
  className?: string
}

export function BlogLayoutShowcase({ 
  posts, 
  defaultLayout = 'featured-grid',
  className = "" 
}: BlogLayoutShowcaseProps) {
  const [selectedLayout, setSelectedLayout] = useState(defaultLayout)
  const prefersReducedMotion = useReducedMotion()

  const layoutOptions = [
    {
      id: 'featured-grid',
      name: 'Featured Grid',
      icon: Layers,
      description: 'Hero post with grid'
    },
    {
      id: 'magazine',
      name: 'Magazine',
      icon: Newspaper,
      description: 'Editorial layout'
    },
    {
      id: 'grid',
      name: 'Grid',
      icon: LayoutGrid,
      description: 'Standard grid'
    },
    {
      id: 'masonry',
      name: 'Masonry',
      icon: Columns,
      description: 'Pinterest style'
    },
    {
      id: 'list',
      name: 'List',
      icon: List,
      description: 'Minimal list'
    }
  ]

  return (
    <div className={className}>
      {/* Layout Selector */}
      <motion.div
        className="mb-12"
        variants={fadeUpVariants}
        {...(prefersReducedMotion ? { initial: "visible" } : { 
          initial: "hidden",
          animate: "visible"
        })}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Choose Your Layout
            </h2>
            <p className="text-foreground-muted">
              Select the perfect layout style for your content
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {layoutOptions.map((layout) => {
            const Icon = layout.icon
            return (
              <button
                key={layout.id}
                onClick={() => setSelectedLayout(layout.id as 'grid' | 'magazine' | 'masonry' | 'list' | 'featured-grid')}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  selectedLayout === layout.id
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'bg-card-background text-foreground-muted hover:text-foreground hover:bg-background-secondary border border-border hover:border-accent/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{layout.name}</div>
                  <div className="text-xs opacity-75">{layout.description}</div>
                </div>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Layout Content */}
      <motion.div
        key={selectedLayout}
        variants={fadeUpVariants}
        {...(prefersReducedMotion ? { initial: "visible" } : { 
          initial: "hidden",
          animate: "visible",
          transition: { delay: 0.2 }
        })}
      >
        <BlogLayoutGrid 
          posts={posts} 
          layout={selectedLayout}
        />
      </motion.div>
    </div>
  )
}
