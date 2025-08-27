'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { fadeUpVariants } from '@/lib/animations'
import { useTheme } from '@/components/theme-provider'
import DotGrid from '@/components/ui/bg'
import { 
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Target,
  Users,
  Shield,
  Brain,
  Zap,
  Clock,
  AlertTriangle,
  Rocket
} from 'lucide-react'
import Link from 'next/link'
import { ClosingCTA } from '@/components/closing-cta'

export function AboutPageClient() {
  const { resolvedTheme } = useTheme()
  
  // Theme-aware colors for DotGrid
  const dotColors = resolvedTheme === 'dark' 
    ? {
        baseColor: "rgba(147, 197, 253, 0.06)", // Light blue, very subtle
        activeColor: "rgba(147, 197, 253, 0.12)" // Light blue, slightly more visible
      }
    : {
        baseColor: "rgba(59, 130, 246, 0.06)", // Darker blue, very subtle  
        activeColor: "rgba(162, 196, 250, 0.12)" // Darker blue, slightly more visible
      }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* DotGrid background */}
        <div className="absolute inset-0">
          <DotGrid
            dotSize={3}
            gap={20}
            baseColor={dotColors.baseColor}
            activeColor={dotColors.activeColor}
            proximity={120}
            shockRadius={250}
            shockStrength={4}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-4 sm:px-6 md:px-8 pt-20">
          <div className="min-h-[600px] flex flex-col items-center justify-center gap-12">
            {/* Text Content */}
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Eyebrow */}
              <motion.div 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center rounded-full border border-border bg-background-secondary px-3 py-1 text-sm font-medium text-foreground-muted mb-8">
                  Our Story
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px] tracking-[-0.02em] leading-[0.95] text-foreground mb-6 px-4 sm:px-0"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Building the Bridge Between <span className="text-accent">Infrastructure & Impact</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                className="max-w-[90vw] sm:max-w-[55ch] text-[18px] sm:text-[19px] md:text-[20px] leading-7 text-foreground-muted mx-auto px-4 sm:px-0"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                We did not start with a product idea. We started with a feeling we could not ignore.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-3 mt-8 justify-center items-center w-full"
              >
                <Button size="lg" asChild>
                  <CalendlyBooking url="https://calendly.com/rubixkube/new-meeting">
                    Book Demo
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </CalendlyBooking>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#how-it-works">
                    See it in Action
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary/30">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="grid md:grid-cols-2 gap-8 items-center"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-[36px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.015em] text-foreground mb-6">
                  The Problem We Couldn&apos;t Ignore
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-foreground-muted">
                  <p>Good engineers drowning in dashboards. Alerts at 2 AM. War rooms that drag for hours.</p>
                  <p>Infra kept getting smarter. Reliability still relied on tired people.</p>
                  <p>Every outage cost more than uptime. It cost trust. It cost momentum. It cost people.</p>
                  <p>We watched smart teammates leave jobs they loved just to breathe again.</p>
                  <p className="text-accent font-semibold">That waste of talent and energy is why we built RubixKube.</p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <AlertTriangle className="w-24 h-24 text-accent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-[36px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.015em] text-foreground mb-8">
              RubixKube is the Missing Layer
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Software that thinks like a seasoned SRE</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Software that acts before customers notice</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Software that explains risk in the language of both infra and business</h3>
              </div>
            </div>
            <p className="text-xl text-foreground-muted">
              <span className="text-accent font-semibold">We are here to keep services alive and teams human.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Built Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary/30">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-[36px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.015em] text-foreground mb-8 text-center">
              What We Built
            </h2>
            <div className="bg-background rounded-2xl p-8 border border-border">
              <p className="text-lg leading-relaxed text-foreground-muted mb-6">
                A mesh of intelligent AI agents that <span className="text-accent font-semibold">observe, plan, act, and learn.</span>
              </p>
              <p className="text-lg leading-relaxed text-foreground-muted mb-6">
                It studies your stack like an expert. It scales without burnout. It remembers everything.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Engineers get a partner</h4>
                    <p className="text-foreground-muted">that handles the grind</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Leaders get clarity</h4>
                    <p className="text-foreground-muted">on risk, cost, and readiness to ship</p>
                  </div>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-foreground-muted mt-6">
                The same system that heals issues also tells you what is safe to launch.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-[36px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.015em] text-foreground mb-12 text-center">
              Why It Matters
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Column */}
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-foreground-muted">
                  Downtime does not only break systems.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-lg text-foreground-muted">It breaks trust</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-lg text-foreground-muted">It breaks momentum</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-lg text-foreground-muted">It breaks revenue</span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-foreground-muted">
                  Reliability should not depend on heroics. It should be a property of the system.
                </p>
                <p className="text-lg leading-relaxed text-foreground-muted">
                  <span className="text-accent font-semibold">RubixKube makes reliability predictable.</span> It reduces fire drills. It protects launches. It buys back time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Sections */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Team Benefits */}
            <motion.div 
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold tracking-[-0.015em] text-foreground mb-8">
                What This Means For Your Team
              </h2>
              <div className="space-y-4">
                {[
                  "Fewer escalations and fewer late nights",
                  "Clear root cause in plain language",
                  "Safer, faster releases",
                  "A system that gets better with every fix"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground-muted">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Business Benefits */}
            <motion.div 
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold tracking-[-0.015em] text-foreground mb-8">
                What This Means For Your Business
              </h2>
              <div className="space-y-4">
                {[
                  "Less revenue at risk",
                  "Fewer broken customer moments",
                  "Reliable launches on tight timelines",
                  "Leadership visibility on risk, cost, and impact"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground-muted">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary/30">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-[36px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.015em] text-foreground mb-12 text-center">
              What We Believe
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Reliability is a product decision, not just an ops task",
                "Memory beats muscle. What you learn should compound",
                "Automation must be governed, explainable, and reversible",
                "Great teams deserve tools that protect their focus and health"
              ].map((belief, index) => (
                <div key={index} className="bg-background rounded-xl p-6 border border-border">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <p className="text-lg text-foreground-muted">{belief}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Result Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-[36px] sm:text-[40px] md:text-[48px] font-extrabold tracking-[-0.015em] text-foreground mb-12">
              The Result
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-10 h-10 text-accent" />
                </div>
                <p className="text-2xl font-bold text-accent">Fewer fire drills</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-10 h-10 text-accent" />
                </div>
                <p className="text-2xl font-bold text-accent">Faster launches</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-accent" />
                </div>
                <p className="text-2xl font-bold text-accent">Peace of mind at scale</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ClosingCTA />

      <Footer />
    </>
  )
}
