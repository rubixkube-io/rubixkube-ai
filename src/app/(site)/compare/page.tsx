import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { ReferenceCard } from '@/components/reference-card'
import { webPageJsonLd } from '@/components/structured-data'
import { sanityFetch } from '@/sanity/lib/live'
import { NAV_GUIDES_QUERY, compareGroups, type ReferenceGuideNavItem } from '@/lib/reference-nav'

const TITLE = 'Compare AI SRE Tools - RubixKube'
const DESCRIPTION =
  'How RubixKube compares with Resolve AI, Cleric, Traversal, Datadog, AWS, Azure, incident.io and every other AI SRE tool, and the best alternatives to each.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/compare' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://rubixkube.ai/compare' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export const revalidate = 3600

const mono = 'font-[family-name:var(--font-mono)] text-[12px] tracking-[0.12em] text-[var(--mid)] uppercase'
const heading = 'rk-section-title m-0 mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] text-[var(--ink)]'

function Section({ label, title, line, children }: { label: string; title: string; line?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[var(--rule)] px-[var(--pad)] py-20 sm:py-28">
      <div className="rk-landing-max">
        <p className={`${mono} m-0`}>{label}</p>
        <h2 className={heading}>{title}</h2>
        {line && <p className="rk-section-body m-0 mt-4 max-w-[60ch] text-[var(--mid)]">{line}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

export default async function ComparePage() {
  const { data } = await sanityFetch({ query: NAV_GUIDES_QUERY })
  const { lead, alternatives, versus, others } = compareGroups((data ?? []) as ReferenceGuideNavItem[])
  const jsonLd = webPageJsonLd({ name: TITLE, description: DESCRIPTION, url: 'https://rubixkube.ai/compare' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <PageHero title="Compare AI SRE tools." lede="How RubixKube compares with every other AI SRE tool, and the best alternatives to each." />

      <main className="bg-[var(--bg)]">
        {lead && (
          <Section label="Best AI SRE tools" title="Every AI SRE tool, ranked.">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <ReferenceCard page={lead} wide index={0} />
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="rk-section-body m-0 text-[var(--mid)]">
                  What each tool does, where it works, how you get it and what it costs, from standalone AI SRE platforms to the agents inside
                  Datadog, AWS and Azure, and open source.
                </p>
                <Link
                  href="/learn/what-is-an-ai-sre"
                  className="group mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-figtree)] text-[16px] font-medium text-[var(--ink)]"
                >
                  What is an AI SRE?
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </div>
          </Section>
        )}

        {alternatives.length > 0 && (
          <Section label="Alternatives" title="The best alternatives to the big names.">
            <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {alternatives.map((p, i) => (
                <li key={p.slug} className="m-0 p-0">
                  <ReferenceCard page={p} index={i + 1} />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {versus.length > 0 && (
          <Section label="RubixKube vs" title="RubixKube, tool by tool." line="Where each tool works, how you get it, what it costs and what it may change, next to RubixKube.">
            <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {versus.map((p, i) => (
                <li key={p.slug} className="m-0 p-0">
                  <ReferenceCard page={p} index={i + 4} />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {others.length > 0 && (
          <Section label="More" title="More comparisons.">
            <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <li key={p.slug} className="m-0 p-0">
                  <ReferenceCard page={p} index={i} />
                </li>
              ))}
            </ul>
          </Section>
        )}
      </main>

      <ClosingCTA headline="Try RubixKube on your own systems" subline="Start free, or book a 30-minute demo." />
      <Footer />
    </>
  )
}
