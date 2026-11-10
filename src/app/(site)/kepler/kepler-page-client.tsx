'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductLockup } from '@/components/product/product-lockup'
import { SectionBar } from '@/components/product/section-bar'
import { Tile } from '@/components/product/tile'
import { Button } from '@/components/ui/button'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import { siteLink, siteLinkArrow } from '@/lib/site-ui'
import { FEATURE_GROUPS, FOUNDER, HERO, KEPLER_SECTIONS, SHOTS, THESIS, type KeplerFeature } from './content'

const label =
  'mb-6 inline-block font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase'
const h2 = 'rk-section-title mt-0 mb-6 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)]'
const lead = 'rk-section-body m-0 max-w-[44ch] text-[var(--mid)]'
const section = 'scroll-mt-[calc(var(--nav-stack)+4rem)] bg-[var(--bg)] py-24 sm:py-32'

const PRODUCT = { name: 'Kepler', sections: KEPLER_SECTIONS } as const

const reveal = {
  variants: fadeUpVariants,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, amount: 0.1 },
}

/** The workspace, running off the right and bottom edges of its frame. */
function WorkspaceView() {
  return (
    <div
      className="absolute inset-0"
      style={{
        maskImage: 'linear-gradient(to bottom, black 70%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent)',
      }}
    >
      <Image
        src={SHOTS.workspace.src}
        alt="Kepler workspace: a chat on the left where the agent checked pods and events, found a bad image tag as the cause and suggested a fix, and a new-session prompt on the right in Observe, read-only mode"
        width={SHOTS.workspace.w}
        height={SHOTS.workspace.h}
        sizes="(max-width: 1024px) 100vw, 1100px"
        className="absolute top-[6%] left-[6%] h-auto w-[88%] max-w-none rounded-lg drop-shadow-[0_18px_36px_color-mix(in_srgb,var(--ink)_18%,transparent)]"
      />
    </div>
  )
}

function IconView({ icon: Icon }: { icon: KeplerFeature['icon'] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--rule)] bg-[var(--bg)] drop-shadow-[0_12px_24px_color-mix(in_srgb,var(--ink)_10%,transparent)]">
        <Icon className="h-7 w-7 text-[var(--ink)]" strokeWidth={1.5} aria-hidden />
      </span>
    </div>
  )
}

export function KeplerPageClient() {
  return (
    <>
      <Navbar />

      <div id="top">
        <section id="what" className="relative overflow-hidden bg-[var(--bg)]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(60% 70% at 85% 40%, color-mix(in srgb, var(--blue) 12%, transparent), transparent 70%), radial-gradient(color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px)',
              backgroundSize: 'auto, 16px 16px',
              maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            }}
          />
          <div className="rk-landing-max relative grid items-center gap-14 px-[var(--pad)] pt-[calc(var(--nav-stack)+4rem)] pb-24 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:pt-[calc(var(--nav-stack)+5rem)] lg:pb-32">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10">
              <motion.div variants={fadeUpVariants} className="mb-10">
                <ProductLockup name="Kepler" size="lg" />
              </motion.div>
              <motion.h1
                variants={fadeUpVariants}
                className="rk-section-title mt-0 mb-8 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.06] text-[var(--ink)]"
              >
                {HERO.title} <em>{HERO.titleEm}</em>
              </motion.h1>
              <motion.p variants={fadeUpVariants} className={lead}>
                {HERO.lead}
              </motion.p>
              <motion.div variants={fadeUpVariants} className="mt-10 flex flex-wrap items-center gap-4">
                {/* Placeholder: Task 4 replaces this with the real download button. */}
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href="#download">Download</a>
                </Button>
              </motion.div>
              <motion.p
                variants={fadeUpVariants}
                className={`${label} !mb-0 mt-10`}
              >
                {HERO.note}
              </motion.p>
            </motion.div>

            <motion.div variants={fadeUpVariants} initial="hidden" animate="visible" className="relative">
              <div className="overflow-hidden rounded-3xl shadow-[0_48px_96px_-40px_color-mix(in_srgb,var(--ink)_50%,transparent)]">
                <Image
                  src={SHOTS.hero.src}
                  alt="The Kepler desktop app on its sign-in screen"
                  width={SHOTS.hero.w}
                  height={SHOTS.hero.h}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="h-auto w-full"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <SectionBar product={PRODUCT} action={{ label: 'Download', href: '#download' }} />

      {/* Thesis */}
      <section id="thesis" className={section}>
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
            <motion.div {...reveal} className="lg:sticky lg:top-[calc(var(--nav-stack)+7rem)] lg:self-start">
              <span className={label}>{THESIS.label}</span>
              <h2 className={h2}>
                {THESIS.heading} <em>{THESIS.headingEm}</em>
              </h2>
            </motion.div>
            <motion.div {...reveal} className="space-y-6">
              {THESIS.paragraphs.map((p) => (
                <p key={p} className="rk-section-body m-0 max-w-[56ch] text-[var(--mid)]">
                  {p}
                </p>
              ))}
            </motion.div>
          </div>
          <motion.div {...reveal} className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-[var(--faint)] ring-1 ring-[var(--faint)] md:grid-cols-3">
            {THESIS.points.map((pt) => (
              <div key={pt.title} className="bg-[var(--bg)] p-8">
                <h3 className="rk-section-title mt-0 mb-2.5 text-[1.2rem] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">{pt.title}</h3>
                <p className="m-0 font-[family-name:var(--font-figtree)] text-[15px] leading-[1.6] text-[var(--mid)]">{pt.copy}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={`${section} border-t border-[var(--faint)]`}>
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div {...reveal} className="mb-16 max-w-3xl">
            <span className={label}>Features</span>
            <h2 className={h2}>
              Everything an operator needs, <em>in one app.</em>
            </h2>
          </motion.div>

          {FEATURE_GROUPS.map((group, gi) => {
            const wide = gi === 0
            return (
              <div key={group.name} className={gi > 0 ? 'mt-24' : ''}>
                <motion.div {...reveal} className="mb-10 max-w-3xl">
                  <span className={label}>{group.plan}</span>
                  <h3 className="rk-section-title mt-0 mb-4 text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.15] text-[var(--ink)]">{group.name}</h3>
                  <p className={lead}>{group.blurb}</p>
                </motion.div>
                <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${wide ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                  {group.features.map((f, fi) => {
                    const hero = wide && fi === 0
                    return (
                      <Tile
                        key={f.title}
                        span={hero ? 'md:col-span-2 lg:col-span-4' : ''}
                        title={f.title}
                        copy={f.copy}
                        tall={hero}
                        visual={hero ? <WorkspaceView /> : <IconView icon={f.icon} />}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Founder note */}
      <section className={`${section} border-t border-[var(--faint)]`}>
        <motion.div {...reveal} className="rk-landing-max px-[var(--pad)]">
          <span className={label}>{FOUNDER.label}</span>
          <p className="rk-section-title m-0 mb-8 max-w-[52ch] text-[clamp(1.15rem,1.6vw,1.5rem)] leading-[1.4] text-[var(--ink)]">{FOUNDER.body}</p>
          <p className="m-0 mb-6 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]">{FOUNDER.signature}</p>
          <Link href={FOUNDER.href} className={siteLink}>
            {FOUNDER.linkLabel}
            <ArrowRight className={siteLinkArrow} aria-hidden />
          </Link>
        </motion.div>
      </section>

      {/* Placeholders: Task 3 fills pricing, Task 4 fills download. */}
      <section id="pricing" className={`${section} border-t border-[var(--faint)]`}>
        <div className="rk-landing-max px-[var(--pad)]">
          <h2 className={h2}>Pricing</h2>
        </div>
      </section>
      <section id="download" className={`${section} border-t border-[var(--faint)]`}>
        <div className="rk-landing-max px-[var(--pad)]">
          <h2 className={h2}>Download</h2>
        </div>
      </section>

      <Footer />
    </>
  )
}
