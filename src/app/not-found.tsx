'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeUpVariants } from '@/lib/animations'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg)] px-[var(--pad)]">
      <motion.div
        className="z-10 mx-auto max-w-lg text-center"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="mb-6 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.28em] text-[var(--text-muted)] uppercase">
          404
        </p>
        <h1 className="mb-4 font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,3rem)] leading-tight font-light tracking-[-0.01em] text-[var(--ink)]">
          This page isn&apos;t here.
        </h1>
        <p className="mb-10 font-[family-name:var(--font-mono)] text-sm font-light leading-relaxed text-[var(--mid)]">
          The link may be wrong, or the page was moved. Head back home and keep exploring.
        </p>
        <Button asChild variant="primary">
          <Link href="/">Back to home</Link>
        </Button>
      </motion.div>
    </div>
  )
}
