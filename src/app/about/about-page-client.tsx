'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ClosingCTA } from '@/components/closing-cta'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { SynapseAnimation } from '@/components/ui/synapse-animation'
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
              <CalendlyBooking url="https://calendly.com/rubixkube-ai/30min" asChild>
                <Button variant="primary">Book Demo</Button>
              </CalendlyBooking>
              <Button asChild variant="outline">
                <a
                  href="https://console.rubixkube.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See it in Action
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
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
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                Why we exist
              </span>
              <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] tracking-[-0.01em] text-[var(--ink)]">
                The problem we couldn&apos;t{' '}
                <span className="italic text-[var(--blue)]">ignore.</span>
              </h2>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                Infrastructure complexity crossed a threshold. Millions of signals across hundreds of services, namespaces, and dependencies, every second. No engineer, no matter how experienced, can hold that topology in their head anymore. The system outgrew the human mind. And it&apos;s not slowing down.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                The industry responded with more dashboards. More alerts. More surfaces for people to stare at. But instrumenting everything and automating nothing isn&apos;t a strategy. It&apos;s a tax on your best people.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                We believe infrastructure should become invisible. Self-healing. Systems that detect, reason, and resolve on their own, not systems that page a human and hope they have enough context to act.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                That waste of talent and cognitive load is why we built RubixKube.
              </p>
            </motion.div>

            {/* Right: solution (with left border divider) */}
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-5 border-t border-[var(--rule)] pt-12 md:border-t-0 md:pt-0 md:border-l md:pl-16 lg:pl-20">
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--blue)] uppercase">
                The solution
              </span>
              <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,3.5vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)]">
                Site Reliability <span className="italic text-[var(--blue)]">Intelligence.</span>
              </h3>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
                Not another monitoring layer. An intelligent system that closes the entire loop: detection, reasoning, resolution, learning, without waiting for a human in the middle.
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]">
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
                  <p className="font-[family-name:var(--font-mono)] text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60">
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
