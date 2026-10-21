import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Backdrop, Float } from '@/components/console-shot'

const CONSOLE_URL = 'https://console.rubixkube.ai'
const KEPLER_URL = 'https://trykepler.rubixkube.ai'
const DOCS_URL = 'https://docs.rubixkube.ai'

type Action = { label: string; href: string; external?: boolean }

/** The two products, the two ends of an incident: the platform when nobody is there, Kepler when someone is */
const PRODUCTS: {
  name: string
  rest: string
  image: ReactNode
  primary: Action
  links: Action[]
}[] = [
  {
    name: 'RubixKube.',
    rest: 'Watches your infrastructure when nobody is there. Every incident ends with a cause and a fix.',
    image: (
      <Backdrop className="h-full rounded-none border-0">
        <Float
          name="part-investigating"
          w={1520}
          h={770}
          width={0.9}
          left={5}
          top={12}
          alt="Rubix investigating an incident: checking orders-db connections, 497 of 500 in use"
        />
      </Backdrop>
    ),
    primary: { label: 'Start for free', href: CONSOLE_URL, external: true },
    links: [
      { label: 'Explore the platform', href: '/platform' },
      { label: 'Docs', href: DOCS_URL, external: true },
    ],
  },
  {
    name: 'Kepler.',
    rest: 'A new way of thinking about operations: the SRE IDE that sits with the engineer on call.',
    image: (
      <Backdrop className="h-full rounded-none border-0">
        {/* the same float as the RubixKube part: one object on the same paper, same edge and shadow */}
        <div
          className="absolute overflow-hidden rounded-xl border border-[var(--rule)] shadow-[0_24px_48px_-16px_rgba(17,19,24,0.35)]"
          style={{ width: '90%', left: '5%', top: '12%' }}
        >
          <Image
            src="/screenshots/kepler.png"
            alt="Kepler, the SRE IDE by RubixKube"
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 90vw, 45vw"
            className="h-auto w-full"
          />
        </div>
      </Backdrop>
    ),
    primary: { label: 'Download Kepler', href: KEPLER_URL, external: true },
    links: [{ label: 'Why we built it', href: '/blog/kepler-a-tool-for-the-operator' }],
  },
]

function Go({ href, external, className, children }: { href: string; external?: boolean; className: string; children: ReactNode }) {
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

/** The RubixKube and Kepler cards */
export function ProductCards({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${className}`}>
      {PRODUCTS.map((p) => (
        <article key={p.name} className="flex flex-col rounded-2xl bg-[var(--panel)] p-6 ring-1 ring-[var(--rule)] sm:p-7">
          <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg ring-1 ring-[var(--rule)]">{p.image}</div>
          <p className="m-0 max-w-[34em] font-[family-name:var(--font-figtree)] text-[clamp(1.2rem,1.6vw,1.5rem)] leading-[1.3] tracking-[-0.015em]">
            <span className="font-semibold text-[var(--ink)]">{p.name}</span>{' '}
            <span className="text-[var(--mid)]">{p.rest}</span>
          </p>
          {/* the page's one button pattern: a solid main button and quiet text links beside it */}
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-8">
            <Go
              href={p.primary.href}
              external={p.primary.external}
              className="inline-flex h-12 items-center rounded-[6px] bg-[var(--blue)] px-6 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-white transition-[box-shadow] duration-200 hover:shadow-[0_6px_24px_rgba(47,91,255,0.35)] active:translate-y-px"
            >
              {p.primary.label}
            </Go>
            {p.links.map((l) => (
              <Go
                key={l.label}
                href={l.href}
                external={l.external}
                className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]"
              >
                {l.label}
                {l.external ? (
                  <ArrowUpRight className="h-4 w-4 text-[var(--mid)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </Go>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

/**
 * The statement about the two ends of an incident, then the two products that are those ends,
 * each with its first steps.
 */
export function ProductsSection() {
  return (
    <section className="shrink-0 snap-start px-[var(--pad)] pt-[clamp(4rem,12vh,8rem)] pb-[clamp(3rem,8vh,5rem)]">
      <div className="rk-landing-max w-full">
        <p className="rk-section-title m-0 max-w-[30ch] text-[clamp(1.75rem,2.9vw,3rem)] text-[var(--ink)]">
          RubixKube watches your infrastructure when nobody is there. Kepler sits with the engineer when someone is.{' '}
          <span className="text-[var(--mid)]">Those are the two ends of an incident, and Rubix works in both.</span>
        </p>

        <ProductCards className="mt-[clamp(2.5rem,7vh,4.5rem)]" />
      </div>
    </section>
  )
}
