'use client'

import { ReactNode } from "react"
import { Lightbulb, Info, AlertTriangle } from "lucide-react"

interface CalloutProps {
  type?: 'insight' | 'note' | 'caution'
  children: ReactNode
  title?: string
  className?: string
}

export function Callout({ 
  type = 'note', 
  children, 
  title,
  className = "" 
}: CalloutProps) {
  const variants = {
    insight: {
      icon: Lightbulb,
      bgColor: 'bg-accent/5',
      borderColor: 'border-accent/20',
      textColor: 'text-accent',
      title: 'Insight'
    },
    note: {
      icon: Info,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      title: 'Note'
    },
    caution: {
      icon: AlertTriangle,
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      borderColor: 'border-amber-200 dark:border-amber-800',
      textColor: 'text-amber-700 dark:text-amber-300',
      title: 'Caution'
    }
  }
  
  const variant = variants[type]
  const Icon = variant.icon
  
  return (
    <div className={`my-8 p-6 rounded-2xl border ${variant.bgColor} ${variant.borderColor} ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${variant.textColor}`} />
        <div className="flex-1">
          <h4 className={`font-semibold mb-2 ${variant.textColor}`}>
            {title || variant.title}
          </h4>
          <div className="text-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
