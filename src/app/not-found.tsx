'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUpVariants } from '@/lib/animations'
import { siteButton } from '@/lib/site-ui'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg)] px-[var(--pad)]">
      <motion.div
        className="rk-landing-max z-10 w-full"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="mb-6 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase">
          404
        </p>
        <h1 className="rk-section-title m-0 mb-5 text-[clamp(2.25rem,5vw,3.4rem)] leading-[1.06] text-[var(--ink)]">
          This page isn&apos;t here.
        </h1>
        <p className="rk-section-body m-0 mb-10 max-w-lg text-[var(--mid)]">
          The link may be wrong, or the page was moved. Head back home and keep exploring.
        </p>
        <Link href="/" className={siteButton}>
          Back to home
        </Link>
      </motion.div>
    </div>
  )
}
