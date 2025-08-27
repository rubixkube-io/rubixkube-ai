'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { fadeUpVariants } from '@/lib/animations'
import { FileText, Shield, Users, CreditCard, Lightbulb, AlertTriangle, Calendar } from 'lucide-react'
import Link from 'next/link'

const TermsPage = () => {
  const quickLinks = [
    { title: "Eligibility", icon: Users, href: "#eligibility" },
    { title: "Use of Services", icon: Shield, href: "#use-of-services" },
    { title: "Data & Responsibilities", icon: FileText, href: "#data-responsibilities" },
    { title: "Billing & Payment", icon: CreditCard, href: "#billing-payment" },
    { title: "Intellectual Property", icon: Lightbulb, href: "#intellectual-property" },
    { title: "Contact", icon: AlertTriangle, href: "#contact" },
  ]

  const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }) => (
    <motion.section 
      id={id}
      variants={fadeUpVariants} 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-12"
    >
      <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
      <div className="text-foreground-muted leading-relaxed">
        {children}
      </div>
    </motion.section>
  )

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
              Terms of Service
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-foreground-muted leading-relaxed">
                These Terms of Service govern your use of RubixKube™ and its related services. 
                By accessing or using our platform, you agree to be bound by these terms and all 
                applicable laws and regulations.
              </p>
            </motion.section>

            {/* Eligibility */}
            <Section title="Eligibility" id="eligibility">
              <p className="mb-4">
                To use RubixKube™, you must be at least 16 years of age and have the authority to enter into binding agreements. 
                If you&apos;re using RubixKube on behalf of an organization, you represent that you have the necessary permissions to bind that organization to these Terms.
              </p>
            </Section>

            {/* Use of Services */}
            <Section title="Use of Services" id="use-of-services">
              <p className="mb-4">
                You agree to use RubixKube™ only for lawful purposes. You will not:
              </p>
              <div className="p-4 bg-card-background rounded-lg border border-border">
                <ul className="list-disc pl-6 space-y-2 text-foreground-muted">
                  <li>Disrupt or interfere with the performance of the Services</li>
                  <li>Reverse engineer or attempt to extract the source code</li>
                  <li>Use Services to build competing products</li>
                  <li>Misuse API access or tokens</li>
                  <li>Submit harmful or misleading content</li>
                </ul>
              </div>
            </Section>

            {/* Data & Responsibilities */}
            <Section title="Your Data & Responsibilities" id="data-responsibilities">
              <p className="mb-4">
                You retain ownership of your data. We process it according to our Privacy Policy.
              </p>
              <div className="p-4 bg-card-background rounded-lg border border-border">
                <ul className="list-disc pl-6 space-y-2 text-foreground-muted">
                  <li>Keep your credentials secure</li>
                  <li>Ensure compliance of integrated tools (e.g., GitHub, Prometheus)</li>
                  <li>Backup critical data</li>
                </ul>
              </div>
            </Section>

            {/* Billing & Payment */}
            <Section title="Subscription, Billing & Payment" id="billing-payment">
              <div className="p-4 bg-card-background rounded-lg border border-border">
                <p className="text-foreground-muted leading-relaxed">
                  All paid Services are billed per our pricing terms. Charges are non-refundable unless required by law. 
                  Pricing may be updated with prior notice.
                </p>
              </div>
            </Section>

            {/* Intellectual Property */}
            <Section title="Intellectual Property" id="intellectual-property">
              <p className="mb-4">
                RubixKube™ and all platform content are the exclusive IP of SLOW RABBIT DESIGNS PRIVATE LIMITED.
              </p>
              <div className="p-4 bg-card-background rounded-lg border border-border">
                <ul className="list-disc pl-6 space-y-2 text-foreground-muted">
                  <li>Do not use trademarks like &quot;RubixKube™&quot;, &quot;Agent Mesh&quot; without permission</li>
                  <li>Do not copy or distribute platform content without approval</li>
                </ul>
              </div>
            </Section>

            {/* Feedback & Contributions */}
            <Section title="Feedback & Contributions" id="feedback">
              <div className="p-4 bg-card-background rounded-lg border border-border">
                <p className="text-foreground-muted leading-relaxed">
                  Any feedback or contributions you provide (e.g., bug reports, suggestions) grant RubixKube™ a royalty-free, 
                  perpetual right to use them to improve the product.
                </p>
              </div>
            </Section>

            {/* Service Availability */}
            <Section title="Service Availability" id="service-availability">
              <div className="p-4 bg-card-background rounded-lg border border-border">
                <p className="text-foreground-muted leading-relaxed">
                  Services are provided &quot;as-is&quot; and &quot;as-available&quot;. We are not liable for downtimes due to maintenance, 
                  third-party issues, or upgrades.
                </p>
              </div>
            </Section>

            {/* Limitation of Liability */}
            <Section title="Limitation of Liability" id="liability">
              <div className="p-4 bg-card-background rounded-lg border border-border">
                <p className="text-foreground-muted leading-relaxed">
                  Our liability is limited to the amount you paid for Services in the 12 months preceding the claim. 
                  We are not liable for indirect, incidental, or consequential damages.
                </p>
              </div>
            </Section>

            {/* Termination */}
            <Section title="Termination" id="termination">
              <div className="p-4 bg-card-background rounded-lg border border-border">
                <p className="text-foreground-muted leading-relaxed">
                  You may cancel your account at any time. We may terminate accounts for Terms violations. 
                  Upon termination, your access to Services will cease immediately.
                </p>
              </div>
            </Section>

            {/* Changes to Terms */}
            <Section title="Changes to Terms" id="changes">
              <div className="p-4 bg-card-background rounded-lg border border-border">
                <p className="text-foreground-muted leading-relaxed">
                  We may update these Terms periodically. Continued use after changes constitutes acceptance. 
                  Material changes will be communicated via email or platform notifications.
                </p>
              </div>
            </Section>

            {/* Contact */}
            <Section title="Contact Information" id="contact">
              <div className="p-6 bg-card-background rounded-lg border border-border">
                <p className="text-foreground-muted mb-4">
                  For questions about these Terms, contact us at:
                </p>
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="font-medium">Email:</span>{' '}
                    <a href="mailto:connect@rubixkube.ai" className="text-primary hover:underline">
                      connect@rubixkube.ai
                    </a>
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Address:</span> SLOW RABBIT DESIGNS PRIVATE LIMITED
                  </p>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default TermsPage
