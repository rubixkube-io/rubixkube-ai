'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants } from '@/lib/animations'
import { useTheme } from '@/components/theme-provider'
import DotGrid from '@/components/ui/bg'
import { CardGrid } from '@/components/ui/card-grid'
import { 
  BookOpen,
  FileText,
  BarChart3,
  Calendar,
  ArrowRight,
  // ExternalLink, - unused"
  Lightbulb,
  TrendingUp
} from 'lucide-react'

export function ResourcesPageClient() {
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

  const documentationCategories = [
    {
      title: "Getting Started",
      copy: "Quick Start Guide, Installation, First Steps, Basic Configuration",
      icon: BookOpen,
      gradient: "from-primary to-primary-dark"
    },
    {
      title: "Core Concepts",
      copy: "AI Agents, Observability, Automation, Security",
      icon: FileText,
      gradient: "from-accent to-primary"
    },
    {
      title: "Advanced Topics",
      copy: "Custom Policies, Integration APIs, Performance Tuning, Troubleshooting",
      icon: BarChart3,
      gradient: "from-primary-light to-accent"
    }
  ]

  const blogCategories = [
    {
      title: "Infrastructure Reliability",
      copy: "Latest insights on maintaining reliable infrastructure at scale"
    },
    {
      title: "AI Operations", 
      copy: "How AI is transforming operations and incident response"
    },
    {
      title: "Industry Insights",
      copy: "Trends and best practices from the SRE community"
    },
    {
      title: "Product Updates",
      copy: "New features and improvements to RubixKube"
    },
    {
      title: "Best Practices",
      copy: "Proven strategies for infrastructure reliability"
    }
  ]

  const caseStudies = [
    {
      title: "E-commerce Platform",
      copy: "How a major retailer reduced MTTR by 80% and prevented revenue loss.",
      status: "Available Now",
      metrics: ["80% MTTR reduction", "99.9% uptime", "Zero revenue loss"]
    },
    {
      title: "Financial Services",
      copy: "Achieving compliance while maintaining system reliability in a regulated environment.",
      status: "Coming Soon",
      metrics: ["100% compliance", "99.99% uptime", "Automated audits"]
    }
  ]

  const upcomingWebinars = [
    {
      title: "Getting Started with RubixKube",
      copy: "Learn the basics of setting up and using RubixKube for your infrastructure",
      icon: Calendar,
      gradient: "from-primary to-accent"
    },
    {
      title: "Advanced Automation Strategies", 
      copy: "Discover advanced techniques for automating your infrastructure operations",
      icon: Calendar,
      gradient: "from-accent to-primary"
    },
    {
      title: "Industry Roundtable: Future of SRE",
      copy: "Join industry experts for a discussion on the future of Site Reliability Engineering",
      icon: Calendar,
      gradient: "from-primary to-accent"
    }
  ]

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

        <div className="relative z-10 mx-auto max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px] px-6 md:px-8 pt-20">
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
                  Resources
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                className="text-[40px] sm:text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] tracking-[-0.02em] leading-[0.95] text-foreground mb-6"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Learn & <span className="text-accent">Grow</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                className="max-w-[55ch] text-[18px] leading-7 text-foreground-muted mx-auto"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Not just docs. This is our playbook for the reliability era - guides, case studies, and stories from teams who refuse to gamble with downtime.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-3 mt-8 justify-center"
              >
                <Button size="lg" asChild>
                  <CalendlyBooking url="https://calendly.com/rubixkube/new-meeting">
                    Book Demo
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </CalendlyBooking>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#resources">
                    Explore Resources
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <CardGrid
          items={documentationCategories}
          title="Documentation"
          subtitle="Comprehensive guides to get you started with RubixKube and master advanced features."
          variant="with-icon"
        />
      </section>

      {/* Blog & Case Studies Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Blog Section */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.015em] text-foreground mb-6"
                variants={fadeUpVariants}
              >
                Blog & Insights
              </motion.h2>
              <p className="text-foreground-muted mb-8">
                Stay updated with the latest in infrastructure reliability, AI operations, and industry trends.
              </p>
              <div className="space-y-4">
                {blogCategories.map((category, idx) => (
                  <Link 
                    key={idx}
                    href={`/blog?category=${encodeURIComponent(category.title)}`}
                    className="block"
                  >
                    <motion.div
                      className="flex items-center justify-between p-4 bg-card-background rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer group"
                      variants={fadeUpVariants}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">{category.title}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary transition-colors" />
                    </motion.div>
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Button variant="outline" className="group" asChild>
                  <Link href="/blog">
                    View All Posts
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Case Studies Section */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.h2 
                className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.015em] text-foreground mb-6"
                variants={fadeUpVariants}
              >
                Case Studies
              </motion.h2>
              <p className="text-foreground-muted mb-8">
                Real-world examples of how organizations are using RubixKube to transform their operations.
              </p>
              <div className="space-y-6">
                {caseStudies.map((study, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-card-background rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow"
                    variants={fadeUpVariants}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">{study.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        study.status === 'Available Now' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {study.status}
                      </span>
                    </div>
                    <p className="text-foreground-muted mb-4 text-sm leading-relaxed">
                      {study.copy}
                    </p>
                    <div className="space-y-2">
                      {study.metrics.map((metric, metricIdx) => (
                        <div key={metricIdx} className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-foreground">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <CardGrid
          items={upcomingWebinars}
          title="Webinars & Events"
          subtitle="Join our live sessions to learn from experts and connect with the community."
          variant="with-icon"
        />
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary">
        <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8 text-center">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.015em] text-foreground mb-6"
              variants={fadeUpVariants}
            >
              Ready to Level Up Your Infrastructure Knowledge?
            </motion.h2>
            <p className="text-lg text-foreground-muted mb-8 max-w-2xl mx-auto">
              Put Site Reliability Intelligence to work in your stack.
            </p>
            <motion.div variants={fadeUpVariants}>
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <CalendlyBooking url="https://calendly.com/rubixkube/new-meeting">
                  Book a Demo
                </CalendlyBooking>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
