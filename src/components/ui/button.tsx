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
          'inline-flex min-w-fit cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-[family-name:var(--font-mono)] font-normal uppercase tracking-[0.1em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-50',
          {
            'border-none bg-[var(--blue)] text-white hover:opacity-92':
              variant === 'primary' || variant === 'cta',
            'border border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--ink)]/5':
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
