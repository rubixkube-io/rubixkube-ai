import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cta'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          'inline-flex min-w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-[family-name:var(--font-mono)] font-medium uppercase tracking-[0.12em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-50',
          {
            'border-none bg-[var(--blue)] text-white shadow-[0_1px_2px_rgba(17,19,24,0.06)] transition-[box-shadow,opacity] duration-200 hover:opacity-100 hover:shadow-[0_4px_20px_rgba(47,91,255,0.38)] active:translate-y-px active:shadow-[0_1px_4px_rgba(47,91,255,0.25)]':
              variant === 'primary' || variant === 'cta',
            'border border-[var(--ink)] bg-transparent text-[var(--ink)] shadow-[0_1px_2px_rgba(17,19,24,0.06)] transition-[box-shadow,opacity] duration-200 hover:bg-[var(--ink)]/5 hover:shadow-[0_4px_16px_rgba(17,19,24,0.12)] active:translate-y-px active:shadow-[0_1px_4px_rgba(17,19,24,0.1)]':
              variant === 'secondary',
            'border border-[var(--faint)] bg-transparent text-[var(--mid)] hover:border-[var(--mid)]/40':
              variant === 'outline',
            'border-none bg-transparent text-[var(--mid)] hover:text-[var(--ink)]':
              variant === 'ghost',
          },
          {
            'px-5 py-2.5 text-[10px]': size === 'sm',
            'px-6 py-3 text-[11px]': size === 'md',
            'px-8 py-3.5 text-[12px]': size === 'lg',
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
