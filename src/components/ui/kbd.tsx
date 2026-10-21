/** A keyboard key shown inside a button, like the console's shortcut chips. Hidden on touch-sized screens. */
export function Kbd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      aria-hidden
      className={`hidden min-w-[18px] items-center justify-center rounded-[4px] border border-current/30 px-1 font-[family-name:var(--font-mono)] text-[13px] leading-[16px] tracking-normal opacity-80 lg:inline-flex ${className}`}
    >
      {children}
    </kbd>
  )
}
