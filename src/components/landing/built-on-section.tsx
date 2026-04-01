'use client'

import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import { InfraLogoGrid } from '@/components/landing/partner-logos'

type BuiltOnSectionProps = {
  compact?: boolean
}

export function BuiltOnSection({ compact = false }: BuiltOnSectionProps) {
  const Wrapper = compact ? 'div' : 'section'
  const wrapperClass = compact
    ? 'shrink-0 border-t border-[var(--rule)] bg-[var(--background-secondary)] py-10 md:py-12'
    : 'border-t border-[var(--rule)] bg-[var(--background-secondary)] py-16 sm:py-24'

  return (
    <Wrapper className={wrapperClass}>
      <div className="rk-landing-max px-[var(--pad)]">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: compact ? '-5% 0px' : '-10% 0px' }}
          className="text-center"
        >
          <InfraLogoGrid compact={compact} />
        </motion.div>
      </div>
    </Wrapper>
  )
}
