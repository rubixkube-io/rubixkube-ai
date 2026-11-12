import { ProductLockup } from '@/components/product/product-lockup'
import { siteButton } from '@/lib/site-ui'
import { cn } from '@/lib/utils'

/** Sticky in-page bar under the site navbar: the product name, its sections, and one action button. */
export function SectionBar({
  product,
  action,
}: {
  product: { name: string; sections: readonly { id: string; name: string }[] }
  action?: { label: string; href: string; external?: boolean }
}) {
  return (
    <div className="sticky top-[var(--nav-stack)] z-[90] border-y border-[var(--rule)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="rk-landing-max flex h-16 items-center gap-10 px-[var(--pad)]">
        <a href="#top" className="shrink-0">
          <ProductLockup name={product.name} />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {product.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="font-[family-name:var(--font-mono)] text-[13px] tracking-[0.15em] text-[var(--mid)] uppercase transition-colors hover:text-[var(--ink)]"
            >
              {s.name}
            </a>
          ))}
        </nav>
        {action && (
          <a
            href={action.href}
            {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={cn(siteButton, 'ml-auto hidden h-10 px-5 text-[15px] sm:inline-flex')}
          >
            {action.label}
          </a>
        )}
      </div>
    </div>
  )
}
