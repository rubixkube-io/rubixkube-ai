'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants, staggerContainer, fadeUp } from '@/lib/animations'


const BELIEFS = [
  {
    title: 'Reliability is a product decision, not just an ops task',
    body: 'Uptime is not an ops concern — it is a business commitment. We built tools that make that commitment possible for teams of any size, at any stage of growth.',
  },
  {
    title: 'Memory beats muscle. What you learn should compound',
    body: 'Every incident your systems survive generates hard-won knowledge. RubixKube preserves it — so your team stops re-learning the same lesson at 2 AM.',
  },
  {
    title: 'Automation must be governed, explainable, and reversible',
    body: 'Automation that cannot explain itself is just noise at speed. Every action RubixKube takes is traceable, reversible, and legible to the humans behind it.',
  },
  {
    title: 'Great teams deserve tools that protect their focus and health',
    body: 'Alert fatigue is a design failure. We build systems that escalate only what matters — so engineers can do their best work without burning out.',
  },
]

const TEAM_BENEFITS = [
  'Fewer escalations and fewer late nights',
  'Clear root cause in plain language',
  'Safer, faster releases',
  'A system that gets better with every fix',
]

const BUSINESS_BENEFITS = [
  'Less revenue at risk',
  'Fewer broken customer moments',
  'Reliable launches on tight timelines',
  'Leadership visibility on risk, cost, and impact',
]

export function AboutPageClient() {
  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-[var(--bg)]">
        <div className="rk-landing-max px-[var(--pad)] pt-[calc(var(--nav-stack)+5rem)] pb-28 sm:pb-36 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.p
              variants={fadeUpVariants}
              className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase"
            >
              Our Story
            </motion.p>

            <motion.h1
              variants={fadeUpVariants}
              className="font-[family-name:var(--font-serif)] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)] max-w-3xl"
            >
              Building the Bridge Between{' '}
              <span className="italic text-[var(--blue)]">
                Infrastructure &amp; Impact
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)] max-w-xl"
            >
              We did not start with a product idea. We started with a feeling
              we could not ignore.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="https://calendly.com/rubixkube-ai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-[6px] bg-[var(--blue)] px-[30px] py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-white uppercase transition-colors hover:bg-blue-700"
              >
                Book Demo
              </a>
              <a
                href="https://console.rubixkube.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[6px] border border-[var(--faint)] bg-transparent px-6 py-[13px] font-[family-name:var(--font-mono)] text-[11px] font-light tracking-[0.1em] text-[var(--mid)] uppercase transition-colors hover:border-[var(--mid)]"
              >
                See it in Action
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────── */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={staggerContainer}
            {...fadeUp}
            className="grid lg:grid-cols-[1fr_1px_1fr] gap-16 lg:gap-0"
          >
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-3 lg:pr-16">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Why we exist
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
                The problem we couldn&apos;t{' '}
                <span className="italic text-[var(--blue)]">ignore.</span>
              </h2>
              <div className="mt-4 space-y-5">
                <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                  Good engineers drowning in dashboards. Alerts at 2 AM. War
                  rooms that drag for hours.
                </p>
                <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                  Infra kept getting smarter. Reliability still relied on tired
                  people.
                </p>
                <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                  Every outage cost more than uptime. It cost trust. It cost
                  momentum. It cost people.
                </p>
                <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                  We watched smart teammates leave jobs they loved just to
                  breathe again.
                </p>
                <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                  That waste of talent and energy is why we built RubixKube.
                </p>
              </div>
            </motion.div>

            <div className="hidden lg:block w-px bg-[var(--rule)]" />

            <motion.div variants={fadeUpVariants} className="space-y-5 lg:pl-16">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                The solution
              </span>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                A mesh of intelligent AI agents that observe, plan, act, and
                learn.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                It studies your stack like an expert. It scales without
                burnout. It remembers everything.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ── Values ───────────────────────────────────────── */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={staggerContainer}
            {...fadeUp}
            className="flex flex-col gap-14"
          >
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                What we believe
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
                Principles that shape every{' '}
                <span className="italic text-[var(--blue)]">decision.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BELIEFS.map((belief) => (
                <motion.div
                  key={belief.title}
                  variants={fadeUpVariants}
                  className="rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-8 flex flex-col gap-4"
                >
                  <span
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                    className="text-[14px] text-[var(--ink)] leading-[1.4]"
                  >
                    {belief.title}
                  </span>
                  <p
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: '1.6', opacity: 0.6 }}
                    className="text-[var(--mid)]"
                  >
                    {belief.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────── */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={staggerContainer}
            {...fadeUp}
            className="flex flex-col gap-14"
          >
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                The impact
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl">
                What this means for your{' '}
                <span className="italic text-[var(--blue)]">team.</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--mid)] uppercase">
                  What this means for your team
                </p>
                <ul className="flex flex-col gap-4">
                  {TEAM_BENEFITS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-[var(--blue)]"
                      />
                      <span className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--mid)] uppercase">
                  What this means for your business
                </p>
                <ul className="flex flex-col gap-4">
                  {BUSINESS_BENEFITS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-[var(--blue)]"
                      />
                      <span className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
