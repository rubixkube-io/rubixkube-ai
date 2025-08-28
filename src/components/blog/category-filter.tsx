'use client'

import { motion } from "framer-motion"
import { fadeUpVariants } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  className = "" 
}: CategoryFilterProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div 
      className={`${className}`}
      variants={fadeUpVariants}
      {...(prefersReducedMotion ? { initial: "visible" } : { 
        initial: "hidden",
        animate: "visible",
        transition: { delay: 0.3 }
      })}
    >
            {/* Desktop: Professional filter layout */}
      <div className="hidden md:flex flex-wrap justify-start gap-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`group relative overflow-hidden px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
            selectedCategory === ''
              ? 'bg-accent text-white shadow-lg shadow-accent/20 scale-105'
              : 'bg-card-background/80 backdrop-blur-sm text-foreground-muted hover:text-foreground hover:bg-card-background border border-border hover:border-accent/30 hover:shadow-md'
          }`}
          aria-pressed={selectedCategory === ''}
          aria-label="Show all articles"
        >
          <span className="relative z-10">All Articles</span>
          {selectedCategory !== '' && (
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 group-hover:from-accent/5 group-hover:via-accent/10 group-hover:to-accent/5 transition-all duration-300" />
          )}
        </button>
        
        {categories.slice(0, 4).map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`group relative overflow-hidden px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-accent text-white shadow-lg shadow-accent/20 scale-105'
                : 'bg-card-background/80 backdrop-blur-sm text-foreground-muted hover:text-foreground hover:bg-card-background border border-border hover:border-accent/30 hover:shadow-md'
            }`}
            aria-pressed={selectedCategory === category}
            aria-label={`Filter articles by ${category}`}
          >
            <span className="relative z-10">{category}</span>
            {selectedCategory !== category && (
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 group-hover:from-accent/5 group-hover:via-accent/10 group-hover:to-accent/5 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Mobile: Enhanced horizontal scroll */}
      <div className="md:hidden relative">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 px-6 -mx-6">
          <button
            onClick={() => onCategoryChange('')}
            className={`flex-shrink-0 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              selectedCategory === ''
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-card-background/80 backdrop-blur-sm text-foreground-muted border border-border'
            }`}
            aria-pressed={selectedCategory === ''}
            aria-label="Show all articles"
          >
            All
          </button>
          
          {categories.slice(0, 6).map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-card-background/80 backdrop-blur-sm text-foreground-muted border border-border'
              }`}
              aria-pressed={selectedCategory === category}
              aria-label={`Filter articles by ${category}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Professional fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}
