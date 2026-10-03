'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants, fadeUp } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { ArrowRight, Check } from 'lucide-react'

const CHALLENGE_URL = 'https://afterhours.rubixkube.ai'
const CLAIM_REPO_URL = 'https://github.com/rubixkube-io/after-hours/issues'

const NEEDS = ['A terminal and curl', 'git', 'Docker', 'An hour or two, and a little patience']

const PRIZES = [
  {
    title: 'First to find Rubix',
    body: 'An M5Stack Cardputer and the RubixKube kit, including a Rubix you get to keep.',
  },
  {
    title: 'Everyone who finds him',
    body: 'A flag and your own Operator Key. Keep it. This is the first of several.',
  },
]

/* Follows the layout and type of the dynamic reference pages ([category]/[slug]). */
export function AfterHoursClient() {
  const prefersReducedMotion = useReducedMotion()
  const anim = prefersReducedMotion ? { initial: 'visible' } : fadeUp
  const heroAnim = { variants: fadeUpVariants, initial: prefersReducedMotion ? 'visible' : 'hidden', animate: 'visible' }

  return (
    <>
      <Navbar />

      {/* ── Hero header ── */}
      <header className="bg-[var(--bg)] px-[var(--pad)] pt-[calc(var(--nav-stack)+4.5rem)] pb-16 sm:pb-20">
        <div className="rk-landing-max">
          <motion.nav
            className="mb-6 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--faint)]"
            {...heroAnim}
          >
            <Link href="/" className="transition-colors hover:text-[var(--mid)]">Home</Link>
            <span>/</span>
            <span className="text-[var(--mid)]">After Hours</span>
          </motion.nav>

          <motion.div {...heroAnim}>
            <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
              After Hours · Challenge 001
            </span>
          </motion.div>

          <motion.h1
            className="mb-5 max-w-4xl font-[family-name:var(--font-serif)] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.08] font-light tracking-[-0.015em] text-[var(--ink)]"
            {...heroAnim}
          >
            Rubix is <span className="italic text-[var(--blue)]">missing.</span>
          </motion.h1>

          <motion.p
            className="mb-10 max-w-4xl whitespace-pre-line font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--ink)]/80 min-[1920px]:text-[17px]"
            {...heroAnim}
          >
            {'Last seen 03:17:42 UTC.\nHe left no note. He left no instructions. Everything you need is public.'}
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-4 sm:gap-6" {...heroAnim}>
            <a
              href={CHALLENGE_URL}
              className="inline-flex items-center gap-2 rounded-[6px] bg-[var(--blue)] px-6 py-3 font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-white uppercase transition-colors hover:bg-blue-700"
            >
              Find Rubix
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <span className="font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)]">
              builders leave history.
            </span>
          </motion.div>

          <motion.div {...heroAnim} className="mt-12 sm:mt-16">
            <figure className="m-0">
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--background-secondary)] shadow-sm">
                <Image
                  src="/assets/after-hours/rubix.webp"
                  alt="Rubix, the RubixKube AI SRE"
                  fill
                  priority
                  className="object-contain p-8 sm:p-12"
                  sizes="(min-width: 1280px) 1200px, 100vw"
                />
              </div>
              <figcaption className="mt-4 text-center font-[family-name:var(--font-mono)] text-[13px] font-light leading-relaxed text-[var(--mid)]">
                Rubix, the AI SRE inside RubixKube. Last seen on night watch.
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </header>

      <div className="border-t border-[var(--rule)]" />

      {/* ── Body ── */}
      <section className="bg-[var(--bg)] px-[var(--pad)] py-16 sm:py-20">
        <div className="rk-landing-max">
          <article className="flex max-w-3xl flex-col gap-10">
            <motion.div variants={fadeUpVariants} {...anim}>
              <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.5vw,1.85rem)] leading-[1.15] font-light tracking-[-0.01em] text-[var(--ink)]">
                What happened
              </h2>
              <div className="text-[16px] leading-[1.8] text-[var(--ink)]">
                <p>
                  Rubix was on night watch for a service called after-hours. Deploys, metrics, logs, traces. All good.
                  Then something felt off.
                </p>
                <p className="mt-5">
                  At 03:17:42 UTC he went silent. The only thing left on the desk was a note: RUBIX WAS HERE.
                </p>
                <p className="mt-5">
                  Nobody has explained what happened to him. Everything you need to work it out is public. Start at{' '}
                  <a href={CHALLENGE_URL} className="text-[var(--blue)] underline underline-offset-4">
                    afterhours.rubixkube.ai
                  </a>
                  .
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariants} {...anim}>
              <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.5vw,1.85rem)] leading-[1.15] font-light tracking-[-0.01em] text-[var(--ink)]">
                What you need
              </h2>
              <ul className="space-y-3">
                {NEEDS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue)]" strokeWidth={2} />
                    <span className="text-[16px] leading-[1.8] text-[var(--ink)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div>
              <motion.h2
                variants={fadeUpVariants}
                {...anim}
                className="mb-8 font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.5vw,1.85rem)] leading-[1.15] font-light tracking-[-0.01em] text-[var(--ink)]"
              >
                The prize
              </motion.h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {PRIZES.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUpVariants}
                    {...anim}
                    className="rounded-[6px] border border-[var(--rule)] bg-[var(--background-secondary)] p-6"
                  >
                    <h3 className="mb-2 font-[family-name:var(--font-serif)] text-[clamp(1rem,1.5vw,1.2rem)] font-light text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="text-[16px] leading-[1.8] text-[var(--ink)]">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={fadeUpVariants} {...anim}>
              <div className="rounded-[6px] border border-[var(--blue)]/15 bg-[var(--blue)]/[0.025] px-7 py-6 sm:px-9 sm:py-8">
                <h3 className="mb-2 font-[family-name:var(--font-serif)] text-[clamp(1.1rem,2vw,1.35rem)] font-light text-[var(--ink)]">
                  How to claim
                </h3>
                <div className="text-[16px] leading-[1.8] text-[var(--ink)]">
                  <p>
                    When you find Rubix you get an Operator Key. Open an issue on{' '}
                    <a href={CLAIM_REPO_URL} className="text-[var(--blue)] underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                      rubixkube-io/after-hours
                    </a>{' '}
                    with that key, from the same GitHub account. The earliest valid solve wins.
                  </p>
                  <p className="mt-5">Please don&apos;t post the answer or the steps until the challenge closes.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariants} {...anim}>
              <div className="rounded-[6px] border border-[var(--blue)]/15 bg-[var(--blue)]/[0.025] px-7 py-8 text-center sm:px-9 sm:py-10">
                <h3 className="mb-2 font-[family-name:var(--font-serif)] text-[clamp(1.15rem,2vw,1.5rem)] font-light text-[var(--ink)]">
                  Find Rubix.
                </h3>
                <p className="mx-auto mb-6 max-w-[50ch] text-[16px] leading-[1.8] text-[var(--ink)]">
                  The first clue is at afterhours.rubixkube.ai. Look closely.
                </p>
                <a
                  href={CHALLENGE_URL}
                  className="inline-flex items-center gap-2 rounded-[6px] bg-[var(--blue)] px-6 py-3 font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-white uppercase transition-colors hover:bg-blue-700"
                >
                  Start the challenge
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>
            </motion.div>
          </article>
        </div>
      </section>

      <ClosingCTA headline="Meet the real Rubix." subline="Rubix is the AI SRE inside RubixKube. Book a 30-minute demo. No slides, just your stack." />
      <Footer />
    </>
  )
}
