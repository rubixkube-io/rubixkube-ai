'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp, cardHover } from '@/lib/animations'

export interface CardGridItem {
  title: string
  copy: string
  icon?: LucideIcon
  gradient?: string
  status?: string
  metrics?: string[]
  challenges?: string[]
  benefits?: string[]
}

export interface CardGridProps {
  items: CardGridItem[]
  title?: string
  subtitle?: string
  variant?: 'default' | 'with-icon' | 'with-metrics' | 'with-challenges' | 'with-icon-2x2' | 'with-challenges-2x2'
  className?: string
}

export function CardGrid({ 
  items, 
  title, 
  subtitle, 
  variant = 'default',
  className = ''
}: CardGridProps) {
  const prefersReducedMotion = useReducedMotion()

  const renderCard = (item: CardGridItem, index: number) => {
    const IconComponent = item.icon
    const baseCardClasses = "rounded-2xl border border-border bg-card-background p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg h-full"

    switch (variant) {
      case 'with-icon':
        return (
          <motion.div
            key={item.title}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
            {...(prefersReducedMotion ? {} : cardHover)}
            className={baseCardClasses}
          >
            {IconComponent && (
              <div className={`w-10 h-10 rounded-lg ${item.gradient ? `bg-gradient-to-r ${item.gradient}` : 'bg-indigo-50'} flex items-center justify-center mb-4`}>
                <IconComponent className={`w-5 h-5 ${item.gradient ? 'text-white' : 'text-indigo-600'}`} />
              </div>
            )}
            <h3 className="font-heading text-lg font-bold text-foreground mb-3">
              {item.title}
            </h3>
            <p className="text-foreground-muted leading-relaxed text-sm">
              {item.copy}
            </p>
          </motion.div>
        )

      case 'with-icon-2x2':
        return (
          <motion.div
            key={item.title}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
            {...(prefersReducedMotion ? {} : cardHover)}
            className={baseCardClasses}
          >
            {IconComponent && (
              <div className={`w-10 h-10 rounded-lg ${item.gradient ? `bg-gradient-to-r ${item.gradient}` : 'bg-indigo-50'} flex items-center justify-center mb-4`}>
                <IconComponent className={`w-5 h-5 ${item.gradient ? 'text-white' : 'text-indigo-600'}`} />
              </div>
            )}
            <h3 className="font-heading text-lg font-bold text-foreground mb-3">
              {item.title}
            </h3>
            <p className="text-foreground-muted leading-relaxed text-sm">
              {item.copy}
            </p>
          </motion.div>
        )

      case 'with-metrics':
        return (
          <motion.div
            key={item.title}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
            {...(prefersReducedMotion ? {} : cardHover)}
            className={baseCardClasses}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              {item.status && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'Available Now' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              )}
            </div>
            <p className="text-foreground-muted mb-4 text-sm leading-relaxed">
              {item.copy}
            </p>
            {item.metrics && (
              <div className="space-y-2">
                {item.metrics.map((metric, metricIdx) => (
                  <div key={metricIdx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-sm font-medium text-foreground">{metric}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )

      case 'with-challenges':
        return (
          <motion.div
            key={item.title}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
            {...(prefersReducedMotion ? {} : cardHover)}
            className={baseCardClasses}
          >
            <div className="flex items-start space-x-4 mb-6">
              {IconComponent && (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {item.copy}
                </p>
              </div>
            </div>
            {item.challenges && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Key Challenges:</h4>
                {item.challenges.map((challenge, challengeIdx) => (
                  <div key={challengeIdx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-sm text-foreground-muted">{challenge}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )

      case 'with-challenges-2x2':
        return (
          <motion.div
            key={item.title}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
            {...(prefersReducedMotion ? {} : cardHover)}
            className={baseCardClasses}
          >
            <div className="flex items-start space-x-4 mb-6">
              {IconComponent && (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {item.copy}
                </p>
              </div>
            </div>
            {item.challenges && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Key Challenges:</h4>
                {item.challenges.map((challenge, challengeIdx) => (
                  <div key={challengeIdx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-sm text-foreground-muted">{challenge}</span>
                    </div>
                ))}
              </div>
            )}
          </motion.div>
        )

      default:
        return (
          <motion.div
            key={item.title}
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: index * 0.1 } })}
            {...(prefersReducedMotion ? {} : cardHover)}
            className={baseCardClasses}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full bg-cta-green flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {item.copy}
                </p>
              </div>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className={`mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8 ${className}`}>
      {(title || subtitle) && (
        <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
          className="text-center mb-16"
        >
          {title && (
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.015em] text-foreground mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 ${variant === 'with-icon-2x2' || variant === 'with-challenges-2x2' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6`}>
        {items.map((item, index) => renderCard(item, index))}
      </div>
    </div>
  )
}
