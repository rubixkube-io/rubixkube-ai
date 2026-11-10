'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductLockup } from '@/components/product/product-lockup'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'

// Hero placeholder. The sections, pricing and FAQ come in later tasks.
export function KeplerPageClient() {
  return (
    <>
      <Navbar />
      <section id="top" className="relative overflow-hidden bg-[var(--bg)]">
        <div className="rk-landing-max relative px-[var(--pad)] pt-[calc(var(--nav-stack)+4rem)] pb-24 lg:pt-[calc(var(--nav-stack)+5rem)] lg:pb-32">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10">
            <motion.div variants={fadeUpVariants} className="mb-10">
              <ProductLockup name="Kepler" size="lg" />
            </motion.div>
            <motion.h1
              variants={fadeUpVariants}
              className="rk-section-title mt-0 mb-8 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.06] text-[var(--ink)]"
            >
              The IDE for <em>operators.</em>
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="rk-section-body m-0 max-w-[44ch] text-[var(--mid)]">
              A desktop agent for the people who keep systems alive.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  )
}
