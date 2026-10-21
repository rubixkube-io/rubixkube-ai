'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { SynapseAnimation } from '@/components/ui/synapse-animation'
import { fadeUpVariants, staggerContainer, fadeUp } from '@/lib/animations'


const BELIEFS = [
  {
    title: 'Reliability is a product decision, not just an ops task',
    body: 'Uptime is not an ops concern; it is a business commitment. We built tools that make that commitment possible for teams of any size, at any stage of growth.',
  },
  {
    title: 'Memory beats muscle. What you learn should compound',
    body: 'Every incident your systems survive generates hard-won knowledge. RubixKube preserves it so your team stops re-learning the same lesson at 2 AM.',
  },
  {
    title: 'Automation must be governed, explainable, and reversible',
    body: 'Automation that cannot explain itself is just noise at speed. Every action RubixKube takes is traceable, reversible, and legible to the humans behind it.',
  },
  {
    title: 'Great teams deserve tools that protect their focus and health',
    body: 'Alert fatigue is a design failure. We build systems that escalate only what matters so engineers can do their best work without burning out.',
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
        <PageHero
          title="Building the Bridge Between Infrastructure & Impact."
          lede="We did not start with a product idea. We started with a feeling we could not ignore."
        />
      </section>

      {/* ── Problem + Solution ─────────────────────────── */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={staggerContainer}
            {...fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0"
          >
            {/* Left: problem */}
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-5 md:pr-16 lg:pr-20">
              <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Why we exist
              </span>
              <h2 className="rk-section-title m-0 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)]">
                The problem we couldn&apos;t{' '}
                <em>ignore.</em>
              </h2>
              <p className="rk-section-body m-0 text-[var(--mid)]">
                Infrastructure complexity crossed a threshold. Millions of signals across hundreds of services, namespaces, and dependencies, every second. No engineer, no matter how experienced, can hold that topology in their head anymore. The system outgrew the human mind. And it&apos;s not slowing down.
              </p>
              <p className="rk-section-body m-0 text-[var(--mid)]">
                The industry responded with more dashboards. More alerts. More surfaces for people to stare at. But instrumenting everything and automating nothing isn&apos;t a strategy. It&apos;s a tax on your best people.
              </p>
              <p className="rk-section-body m-0 text-[var(--mid)]">
                We believe infrastructure should become invisible. Self-healing. Systems that detect, reason, and resolve on their own, not systems that page a human and hope they have enough context to act.
              </p>
              <p className="rk-section-body m-0 text-[var(--mid)]">
                That waste of talent and cognitive load is why we built RubixKube.
              </p>
            </motion.div>

            {/* Right: solution (with left border divider) */}
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-5 border-t border-[var(--rule)] pt-12 md:border-t-0 md:pt-0 md:border-l md:pl-16 lg:pl-20">
              <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase">
                The solution
              </span>
              <h3 className="rk-section-title m-0 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)]">
                Site Reliability <em>Intelligence.</em>
              </h3>
              <p className="rk-section-body m-0 text-[var(--mid)]">
                Not another monitoring layer. An intelligent system that closes the entire loop: detection, reasoning, resolution, learning, without waiting for a human in the middle.
              </p>
              <p className="rk-section-body m-0 text-[var(--mid)]">
                It builds a living model of your infrastructure that compounds with every signal. Context that never resets. Awareness that never stops.
              </p>

              {/* Synapse animation */}
              <div className="flex-1 mt-8">
                <SynapseAnimation />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ── Values ───────────────────────────────────────── */}
      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div
            variants={staggerContainer}
            {...fadeUp}
            className="flex flex-col gap-14"
          >
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase">
                What we believe
              </span>
              <h2 className="rk-section-title m-0 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)]">
                Principles that shape every{' '}
                <em>decision.</em>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BELIEFS.map((belief) => (
                <motion.div
                  key={belief.title}
                  variants={fadeUpVariants}
                  className="rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--rule)] p-8 flex flex-col gap-3"
                >
                  <span className="rk-section-title text-[1.1rem] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">
                    {belief.title}
                  </span>
                  <p className="rk-section-body m-0 text-[15px] text-[var(--mid)]">
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
              <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase">
                The impact
              </span>
              <h2 className="rk-section-title m-0 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)]">
                What this means for your{' '}
                <em>team.</em>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                <p className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase">
                  What this means for your team
                </p>
                <ul className="flex flex-col gap-4">
                  {TEAM_BENEFITS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="mt-1 shrink-0 text-[var(--ink)]"
                      />
                      <span className="rk-section-body text-[var(--mid)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="flex flex-col gap-6">
                <p className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase">
                  What this means for your business
                </p>
                <ul className="flex flex-col gap-4">
                  {BUSINESS_BENEFITS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="mt-1 shrink-0 text-[var(--ink)]"
                      />
                      <span className="rk-section-body text-[var(--mid)]">
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

      <ClosingCTA
        headline="Meet the team behind the platform"
        subline="Book a call."
      />
      <Footer />
    </>
  )
}
