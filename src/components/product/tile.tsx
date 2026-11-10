'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Backdrop } from '@/components/product/backdrop'
import { fadeUpVariants } from '@/lib/animations'

/** One feature in the grid: a zoomed view on top, its name and one or two lines below. */
export function Tile({ span, title, copy, visual, tall = false }: { span: string; title: string; copy: string; visual: ReactNode; tall?: boolean }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`${span} flex flex-col overflow-hidden rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--rule)] transition-shadow hover:shadow-md`}
    >
      <Backdrop className={`border-b border-[var(--rule)] ${tall ? 'h-[300px] lg:h-[360px]' : 'h-[260px] lg:h-[300px]'}`}>{visual}</Backdrop>
      <div className="p-8">
        <h3 className="rk-section-title mt-0 mb-2.5 text-[1.2rem] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">{title}</h3>
        <p className="font-[family-name:var(--font-figtree)] m-0 text-[15px] leading-[1.6] text-[var(--mid)]">{copy}</p>
      </div>
    </motion.div>
  )
}
