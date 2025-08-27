'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { fadeUpVariants } from '@/lib/animations'
import { FileText, Shield, Eye, Database, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

export function PrivacyPageClient() {
  const dataUsageTable = [
    ["Service Delivery", "Operate and improve RubixKube™ functionality"],
    ["Account Management", "Authenticate, notify, and support your usage"],
    ["AI Operations", "Feed anonymized data to improve agent behavior"],
    ["Security Monitoring", "Detect unauthorized access or misconfigurations"],
    ["Analytics & Insights", "Product usage patterns to guide UX & features"],
    ["Legal & Compliance", "Fulfill legal obligations and audits"],
  ]

  const quickLinks = [
    { title: "What We Collect", icon: Database, href: "#what-we-collect" },
    { title: "How We Use Data", icon: Eye, href: "#how-we-use-data" },
    { title: "Data Protection", icon: Shield, href: "#data-protection" },
    { title: "Your Rights", icon: Users, href: "#your-rights" },
    { title: "Contact Us", icon: FileText, href: "#contact" },
  ]

  return (
    <>
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-background border-b border-border">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            {/* Page Title */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-foreground mb-4 mt-24"
              variants={fadeUpVariants}
            >
              Privacy Policy
            </motion.h1>
            
            {/* Meta Info */}
            <motion.div 
              className="flex flex-col sm:flex-row sm:items-center gap-4 text-foreground-muted"
              variants={fadeUpVariants}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Effective Date: June 25, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Last Updated: June 25, 2025</span>
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div 
              className="mt-8 p-4 bg-background-secondary rounded-lg border border-border"
              variants={fadeUpVariants}
            >
              <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Quick Navigation
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex flex-col items-center p-3 rounded-md hover:bg-background transition-colors text-center"
                  >
                    <link.icon className="w-5 h-5 text-primary mb-2" />
                    <span className="text-xs font-medium text-foreground">{link.title}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <motion.section 
              id="introduction"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-foreground-muted leading-relaxed">
                This Privacy Policy applies to all users of RubixKube™ services, including our website, 
                platform, APIs, and integrations. By using RubixKube™, you agree to the practices described 
                in this document.
              </p>
            </motion.section>

            {/* What Information We Collect */}
            <motion.section 
              id="what-we-collect"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">What Information We Collect</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-card-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Personal Information</h3>
                  <ul className="list-disc ml-5 text-foreground-muted text-sm space-y-1">
                    <li>Name, email, job title</li>
                    <li>Organization name</li>
                    <li>Login credentials, preferences</li>
                  </ul>
                </div>
                <div className="p-4 bg-card-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Usage & Technical Data</h3>
                  <ul className="list-disc ml-5 text-foreground-muted text-sm space-y-1">
                    <li>IP address, browser, OS</li>
                    <li>Pages visited, session time</li>
                    <li>Infra metadata (e.g., logs)</li>
                  </ul>
                </div>
                <div className="p-4 bg-card-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Third-Party Integrations</h3>
                  <ul className="list-disc ml-5 text-foreground-muted text-sm space-y-1">
                    <li>GitHub tokens</li>
                    <li>Prometheus, CI/CD events</li>
                    <li>System logs & telemetry</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* How We Use Your Data */}
            <motion.section 
              id="how-we-use-data"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">How We Use Your Data</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead className="bg-background-secondary">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Purpose</th>
                      <th className="text-left p-4 font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-card-background">
                    {dataUsageTable.map(([purpose, description], index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="p-4 font-medium text-foreground">{purpose}</td>
                        <td className="p-4 text-foreground-muted">{description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* Data Protection */}
            <motion.section 
              id="data-protection"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">Data Protection & Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-card-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Security Measures
                  </h3>
                  <ul className="list-disc ml-5 text-foreground-muted space-y-2">
                    <li>End-to-end encryption for data in transit</li>
                    <li>At-rest encryption for sensitive data</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Access controls and authentication</li>
                  </ul>
                </div>
                <div className="p-6 bg-card-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    Data Retention
                  </h3>
                  <ul className="list-disc ml-5 text-foreground-muted space-y-2">
                    <li>Account data: Until account deletion</li>
                    <li>Usage logs: 90 days</li>
                    <li>Analytics: 2 years (anonymized)</li>
                    <li>Legal compliance: As required by law</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Your Rights */}
            <motion.section 
              id="your-rights"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">Your Rights & Choices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-card-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Access & Control</h3>
                  <p className="text-foreground-muted mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc ml-5 text-foreground-muted space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Request data deletion</li>
                    <li>Export your data</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </div>
                <div className="p-6 bg-card-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
                  <p className="text-foreground-muted mb-4">
                    For privacy-related questions or to exercise your rights, contact us at:
                  </p>
                  <div className="p-4 bg-background-secondary rounded-lg">
                    <p className="font-medium text-foreground mb-2">Data Protection Officer</p>
                    <a 
                      href="mailto:connect@rubixkube.ai" 
                      className="text-primary hover:underline break-all"
                    >
                      connect@rubixkube.ai
                    </a>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Updates */}
            <motion.section 
              id="updates"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Policy Updates</h2>
              <p className="text-foreground-muted leading-relaxed">
                We may update this policy periodically. Significant changes will be communicated via email 
                or platform notifications. Continued use of RubixKube™ after changes constitutes acceptance 
                of the updated policy.
              </p>
            </motion.section>

            {/* Contact */}
            <motion.section 
              id="contact"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <div className="p-6 bg-card-background rounded-lg border border-border">
                <p className="text-foreground-muted mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="font-medium">Email:</span>{' '}
                    <a href="mailto:privacy@rubixkube.ai" className="text-primary hover:underline">
                      privacy@rubixkube.ai
                    </a>
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Address:</span> SLOW RABBIT DESIGNS PRIVATE LIMITED
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
