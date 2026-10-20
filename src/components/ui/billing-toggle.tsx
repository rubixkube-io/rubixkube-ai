'use client'

import { cn } from '@/lib/utils'
import { rkMono9, rkMono11 } from '@/lib/landing-responsive-type'

/** Monthly or annual billing switch, shared by the pricing pages. */
export function BillingToggle({ isAnnual, onToggle, saving = 'Save 15%' }: { isAnnual: boolean; onToggle: () => void; saving?: string }) {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex rounded-full border border-[var(--rule)] bg-[var(--bg)] p-1">
        <button
          type="button"
          onClick={() => !isAnnual || onToggle()}
          className={cn(
            'rounded-full px-6 py-2.5 font-[family-name:var(--font-mono)] tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer',
            rkMono11,
            !isAnnual
              ? 'bg-[var(--surface)] text-[var(--ink)] shadow-sm'
              : 'bg-transparent text-[var(--mid)]',
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => isAnnual || onToggle()}
          className={cn(
            'rounded-full px-6 py-2.5 font-[family-name:var(--font-mono)] tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer flex items-center gap-2',
            rkMono11,
            isAnnual
              ? 'bg-[var(--surface)] text-[var(--ink)] shadow-sm'
              : 'bg-transparent text-[var(--mid)]',
          )}
        >
          Annual
          <span
            className={cn(
              'font-[family-name:var(--font-mono)] tracking-[0.1em] text-[var(--green)] uppercase',
              rkMono9,
            )}
          >
            {saving}
          </span>
        </button>
      </div>
    </div>
  )
}
