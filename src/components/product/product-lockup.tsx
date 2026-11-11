import Image from 'next/image'

/** "<Product> by RubixKube": the product name in the site serif, then the RubixKube wordmark. */
export function ProductLockup({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  // md is the section bar, lg the hero
  const lg = size === 'lg'
  return (
    <span role="img" className="inline-flex items-center gap-2.5" aria-label={`${name} by RubixKube`}>
      <span
        className={`font-[family-name:var(--font-serif)] leading-none text-[var(--ink)] ${lg ? 'text-[28px]' : 'text-[26px]'}`}
        aria-hidden
      >
        {name}
      </span>
      <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase" aria-hidden>
        by
      </span>
      <Image src="/light-logo.svg" alt="" width={1720} height={200} className={`rk-only-light w-auto ${lg ? 'h-[15px]' : 'h-[14px]'}`} />
      <Image src="/dark-logo.svg" alt="" width={1720} height={200} className={`rk-only-dark w-auto ${lg ? 'h-[15px]' : 'h-[14px]'}`} />
    </span>
  )
}
