'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants } from '@/lib/animations'
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
  const documentationCategories = [
    {
      title: "Getting Started",
      copy: "Sign up, install locally or on cloud, connect clusters, and complete your first 15 minutes",
      icon: BookOpen,
      gradient: "from-primary to-primary-dark",
      link: "https://docs.rubixkube.ai/getting-started/introduction",
      guides: [
        { title: "Installation with KIND", link: "https://docs.rubixkube.ai/getting-started/installation-kind" },
        { title: "Cloud Installation", link: "https://docs.rubixkube.ai/getting-started/installation-cloud" },
        { title: "First Steps Tutorial", link: "https://docs.rubixkube.ai/tutorials/first-steps" },
        { title: "Sign Up & Login", link: "https://docs.rubixkube.ai/getting-started/sign-up" }
      ]
    },
    {
      title: "Core Concepts",
      copy: "Site Reliability Intelligence, Agent Mesh, Memory Engine, and Safety Guardrails",
      icon: FileText,
      gradient: "from-accent to-primary",
      link: "https://docs.rubixkube.ai/concepts/what-is-sri",
      guides: [
        { title: "What is SRI?", link: "https://docs.rubixkube.ai/concepts/what-is-sri" },
        { title: "Agent Mesh", link: "https://docs.rubixkube.ai/concepts/agent-mesh" },
        { title: "Memory Engine", link: "https://docs.rubixkube.ai/concepts/memory-engine" },
        { title: "Safety Guardrails", link: "https://docs.rubixkube.ai/concepts/guardrails" }
      ]
    },
    {
      title: "Using the Platform",
      copy: "Dashboard, Insights & RCA, Chat Interface, Agents, Clusters, and Integrations",
      icon: BarChart3,
      gradient: "from-primary-light to-accent",
      link: "https://docs.rubixkube.ai/using/dashboard",
      guides: [
        { title: "Dashboard Overview", link: "https://docs.rubixkube.ai/using/dashboard" },
        { title: "Insights & RCA", link: "https://docs.rubixkube.ai/using/insights" },
        { title: "Chat Basics", link: "https://docs.rubixkube.ai/tutorials/chat-basics" },
        { title: "Managing Agents", link: "https://docs.rubixkube.ai/using/agents" },
        { title: "Connect Clusters", link: "https://docs.rubixkube.ai/using/clusters" },
        { title: "Integrations", link: "https://docs.rubixkube.ai/using/integrations" }
      ]
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
      title: "OOMKilled Detection & Auto-Remediation",
      copy: "See how RubixKube's Agent Mesh detects memory issues, performs RCA in 30 seconds, and suggests optimal resource allocation.",
      status: "Tutorial Available",
      metrics: ["30-90s RCA analysis", "Automated evidence gathering", "Memory optimization suggestions"],
      link: "https://docs.rubixkube.ai/tutorials/rubixkube-in-action"
    },
    {
      title: "Multi-Incident Analysis Dashboard",
      copy: "Real dashboard showing CrashLoop, ImagePullBackOff, and PodPending incidents with 75% RCA coverage and intelligent prioritization.",
      status: "Live Demo",
      metrics: ["75% RCA coverage", "Real-time detection", "Intelligent prioritization"],
      link: "https://docs.rubixkube.ai/using/insights"
    },
    {
      title: "Cost Optimization with AI",
      copy: "Chat-based resource analysis identifying over-provisioned nginx containers and automated VPA recommendations.",
      status: "Tutorial Available", 
      metrics: ["10x resource optimization", "Automated right-sizing", "Cost analysis via chat"],
      link: "https://docs.rubixkube.ai/tutorials/chat-cost-analysis"
    }
  ]

  const supportResources = [
    {
      title: "Troubleshooting Guide",
      copy: "Step-by-step fixes for common issues across Dashboard, Insights, Agents, and platform components",
      icon: Lightbulb,
      gradient: "from-red-500 to-orange-500",
      link: "https://docs.rubixkube.ai/support/troubleshooting"
    },
    {
      title: "Frequently Asked Questions", 
      copy: "Quick answers to common questions about setup, RCA, agents, guardrails, and platform usage",
      icon: TrendingUp,
      gradient: "from-blue-500 to-indigo-500", 
      link: "https://docs.rubixkube.ai/support/faq"
    },
    {
      title: "Beta Disclaimers & Limitations",
      copy: "Important information about current capabilities, known limitations, and what's coming next",
      icon: Calendar,
      gradient: "from-yellow-500 to-amber-500",
      link: "https://docs.rubixkube.ai/getting-started/disclaimers"
    }
  ]

  const handsonTutorials = [
    {
      title: "Break Things, Watch RubixKube Fix Them",
      copy: "Guided experiments with OOMKilled, CrashLoop, and ImagePullBackOff incidents - see real RCA in action",
      icon: Calendar,
      gradient: "from-primary to-accent",
      link: "https://docs.rubixkube.ai/tutorials/rubixkube-in-action"
    },
    {
      title: "Chat with Your Infrastructure", 
      copy: "Master the conversational interface - from basic queries to advanced troubleshooting and cost analysis",
      icon: Calendar,
      gradient: "from-accent to-primary",
      link: "https://docs.rubixkube.ai/tutorials/chat-basics"
    },
    {
      title: "Agent Mesh Deep Dive",
      copy: "Understand how 6 specialized AI agents collaborate - Observer, RCA Pipeline, Memory, SRI, Remediation, and Guardian",
      icon: Calendar,
      gradient: "from-primary to-accent",
      link: "https://docs.rubixkube.ai/concepts/agent-mesh"
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg)]" aria-hidden />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-20 md:px-[var(--pad)] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2000px]">
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
                <span className="mb-8 inline-flex items-center border border-[var(--rule)] bg-[var(--background-secondary)] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] text-[var(--mid)] uppercase">
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
                  <Link href="https://docs.rubixkube.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                    Read the Docs
                  </Link>
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
      <section id="resources" className="py-24 md:py-20 sm:py-14 bg-background">
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
                Live Demos & Examples
              </motion.h2>
              <p className="text-foreground-muted mb-8">
                Real platform demonstrations showing RubixKube&apos;s Agent Mesh detecting, analyzing, and resolving infrastructure incidents.
              </p>
              <div className="space-y-6">
                {caseStudies.map((study, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-card-background rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow group"
                    variants={fadeUpVariants}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-foreground">{study.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        study.status === 'Tutorial Available' || study.status === 'Live Demo' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {study.status}
                      </span>
                    </div>
                    <p className="text-foreground-muted mb-4 text-sm leading-relaxed">
                      {study.copy}
                    </p>
                    <div className="space-y-2 mb-4">
                      {study.metrics.map((metric, metricIdx) => (
                        <div key={metricIdx} className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-foreground">{metric}</span>
                        </div>
                      ))}
                    </div>
                    {study.link && (
                      <div className="pt-4 border-t border-border">
                        <Link 
                          href={study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group-hover:gap-2 gap-1 transition-all"
                        >
                          View Tutorial
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hands-on Tutorials Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
        <CardGrid
          items={handsonTutorials}
          title="Hands-on Tutorials"
          subtitle="Interactive learning experiences - break things, fix them, and master the platform with guided experiments."
          variant="with-icon"
        />
      </section>

      {/* Support & Troubleshooting Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background-secondary">
        <CardGrid
          items={supportResources}
          title="Support & Help"
          subtitle="Get help quickly with troubleshooting guides, FAQs, and platform documentation."
          variant="with-icon"
        />
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-20 sm:py-14 bg-background">
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
              <CalendlyBooking url="https://calendly.com/rubixkube-ai/30min" variant="primary" size="lg">
                Book a Demo
              </CalendlyBooking>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
