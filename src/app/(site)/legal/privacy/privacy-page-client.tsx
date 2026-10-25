'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { fadeUpVariants } from '@/lib/animations'
import { Shield, Database } from 'lucide-react'
import Link from 'next/link'

const sectionTitle =
  'rk-section-title m-0 mb-5 scroll-mt-[calc(var(--nav-stack)+2rem)] text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]'
const rowTitle = 'rk-section-title m-0 text-[1.1rem] leading-[1.35] tracking-[-0.01em] text-[var(--ink)]'
const bodyText = 'font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]'
const listText = `m-0 list-disc space-y-1.5 pl-6 marker:text-[var(--mid)] ${bodyText}`
const ruledRow = 'grid gap-x-8 gap-y-2 border-t border-[var(--rule)] py-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]'
const panelCard = 'rounded-2xl bg-[var(--panel)] p-6 ring-1 ring-[var(--rule)] sm:p-8'
const inlineLink = 'break-all text-[var(--blue)] underline underline-offset-4'

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
    { title: "What We Collect", href: "#what-we-collect" },
    { title: "How We Use Data", href: "#how-we-use-data" },
    { title: "Data Protection", href: "#data-protection" },
    { title: "Your Rights", href: "#your-rights" },
    { title: "Hubble Mobile App", href: "#mobile-app" },
    { title: "Contact Us", href: "#contact" },
  ]

  return (
    <>
      <Navbar />

      <header className="bg-[var(--bg)]">
        <PageHero className="pb-0" title="Privacy Policy">
        {/* Meta Info */}
        <div
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]"
        >
          <span>Effective Date: June 25, 2025</span>
          <span>Last Updated: October 25, 2026</span>
        </div>

        {/* Quick Navigation */}
        <nav
          aria-label="Quick Navigation"
          className="mt-10 max-w-[900px] border-y border-[var(--rule)] py-5"
        >
          <h2 className="m-0 mb-3 font-[family-name:var(--font-figtree)] text-[14px] font-normal leading-normal tracking-normal text-[var(--mid)]">
            Quick Navigation
          </h2>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="font-[family-name:var(--font-figtree)] text-[16px] text-[var(--ink)] underline decoration-[var(--rule)] underline-offset-4 transition-colors hover:decoration-[var(--ink)]"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        </PageHero>
      </header>

      {/* Content Section */}
      <section className="bg-[var(--bg)] px-[var(--pad)] pt-14 pb-24">
        <div className="rk-landing-max [&>*]:max-w-[900px]">
          <div>
            
            {/* Introduction */}
            <motion.section 
              id="introduction"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
            >
              <h2 className={sectionTitle}>Introduction</h2>
              <p className={`m-0 ${bodyText}`}>
                This Privacy Policy applies to all users of RubixKube™ services, including our website, 
                platform, APIs, integrations, and mobile applications such as Hubble by RubixKube. By using RubixKube™, you agree to the practices described 
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
              className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
            >
              <h2 className={sectionTitle}>What Information We Collect</h2>
              <div className="border-b border-[var(--rule)]">
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Personal Information</h3>
                  <ul className={listText}>
                    <li>Name, email, job title</li>
                    <li>Organization name</li>
                    <li>Login credentials, preferences</li>
                  </ul>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Usage & Technical Data</h3>
                  <ul className={listText}>
                    <li>IP address, browser, OS</li>
                    <li>Pages visited, session time</li>
                    <li>Infra metadata (e.g., logs)</li>
                  </ul>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Third-Party Integrations</h3>
                  <ul className={listText}>
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
              className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
            >
              <h2 className={sectionTitle}>How We Use Your Data</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="border-b border-[var(--ink)]">
                    <tr>
                      <th className="py-3 pr-5 text-left align-bottom font-[family-name:var(--font-mono)] text-[12px] font-light uppercase tracking-[0.08em] text-[var(--mid)]">Purpose</th>
                      <th className="py-3 pr-5 text-left align-bottom font-[family-name:var(--font-mono)] text-[12px] font-light uppercase tracking-[0.08em] text-[var(--mid)]">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUsageTable.map(([purpose, description], index) => (
                      <tr key={index} className="border-b border-[var(--rule)]">
                        <td className="py-3.5 pr-5 align-top font-[family-name:var(--font-figtree)] text-[16px] font-semibold leading-[1.5] text-[var(--ink)]">{purpose}</td>
                        <td className="py-3.5 pr-5 align-top font-[family-name:var(--font-figtree)] text-[16px] leading-[1.5] text-[var(--ink)]">{description}</td>
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
              className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
            >
              <h2 className={sectionTitle}>Data Protection & Security</h2>
              <div className="border-b border-[var(--rule)]">
                <div className={ruledRow}>
                  <h3 className={`${rowTitle} flex items-center gap-2`}>
                    <Shield className="h-[18px] w-[18px] shrink-0 text-[var(--ink)]" strokeWidth={1.75} />
                    Security Measures
                  </h3>
                  <ul className={listText}>
                    <li>End-to-end encryption for data in transit</li>
                    <li>At-rest encryption for sensitive data</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Access controls and authentication</li>
                  </ul>
                </div>
                <div className={ruledRow}>
                  <h3 className={`${rowTitle} flex items-center gap-2`}>
                    <Database className="h-[18px] w-[18px] shrink-0 text-[var(--ink)]" strokeWidth={1.75} />
                    Data Retention
                  </h3>
                  <ul className={listText}>
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
              className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
            >
              <h2 className={sectionTitle}>Your Rights & Choices</h2>
              <div className="border-b border-[var(--rule)]">
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Access & Control</h3>
                  <div>
                  <p className={`m-0 mb-3 ${bodyText}`}>
                    You have the right to:
                  </p>
                  <ul className={listText}>
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Request data deletion</li>
                    <li>Export your data</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                  </div>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Contact Information</h3>
                  <div>
                  <p className={`m-0 mb-3 ${bodyText}`}>
                    For privacy-related questions or to exercise your rights, contact us at:
                  </p>
                  <p className={`m-0 font-semibold ${bodyText}`}>Data Protection Officer</p>
                  <p className={`m-0 ${bodyText}`}>
                    <a
                      href="mailto:connect@rubixkube.ai"
                      className={inlineLink}
                    >
                      connect@rubixkube.ai
                    </a>
                  </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Rubix in Slack */}
            <motion.section 
              id="slack"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
            >
              <h2 className={sectionTitle}>Rubix in Slack</h2>
              <p className={`m-0 ${bodyText}`}>
                When your organization connects Slack, the Rubix app reads only what it needs to answer:
                the message that mentions it or is sent to it directly, the recent messages of the thread
                it was mentioned in (read at that moment, at most fifteen), the name of the person who
                asked, and RubixKube incident links pasted in Slack. It does not read channels it was not
                invited to, does not join channels on its own, and stores no Slack messages.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                What you say to Rubix, and the thread messages sent along as context, become part of that
                conversation in your RubixKube organization, kept for as long as your organization keeps
                the conversation and deleted with it. Rubix writes one thing into Slack: a conversation
                identifier in the metadata of its own replies. Approvals and questions you answer in Slack
                are recorded in your organization&apos;s activity log with your Slack name.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                Rubix answers with the model your organization chose in RubixKube (our hosted models, or
                your own provider). No Slack data is used to train models. To remove Rubix, disconnect
                Slack in the console or remove the app in Slack; either stops all reading at once. Data
                requests go to the address below.
              </p>
            </motion.section>

            {/* Hubble mobile app */}
            <motion.section 
              id="mobile-app"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
            >
              <h2 className={sectionTitle}>Hubble Mobile App</h2>
              <p className={`m-0 ${bodyText}`}>
                When you use the Hubble by RubixKube mobile app, we process your user and organization
                identifiers; a session for each paired device (the platform, a device label, and when it
                was paired and last used); the push notification token your phone provides and whether
                notifications are turned on for the app; reports that a notification was received or
                opened; the incident actions you take, such as acknowledging or resolving; and content you
                enter, such as the title and details of a page or the reason for a schedule override.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                We use this to sign you in, deliver pages to your phone, record what happens to an
                incident, and show whether notifications will reach you. The app does not collect your
                location, contacts, photos, or advertising identifiers. It contains no advertising and no
                third-party analytics, and we do not use it to track you across other apps or websites.
                Its connections to our servers use HTTPS, and your session is kept in your phone&apos;s
                secure storage.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                Push notifications are delivered through Google Firebase Cloud Messaging on Android and,
                once iPhone push notifications are available, through Apple Push Notification service.
                Your session and push registration are removed when you sign out or revoke the device in
                Hubble on the web, and a device session expires 30 days after pairing. Incident history,
                including the actions you took, is kept for as long as your organization keeps it. To ask
                for your data to be deleted, write to{' '}
                <a href="mailto:privacy@rubixkube.ai" className={inlineLink}>
                  privacy@rubixkube.ai
                </a>{' '}
                from the address on your account.
              </p>
            </motion.section>

            {/* Updates */}
            <motion.section 
              id="updates"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
            >
              <h2 className={sectionTitle}>Policy Updates</h2>
              <p className={`m-0 ${bodyText}`}>
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
              className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
            >
              <h2 className={sectionTitle}>Contact Us</h2>
              <div className={panelCard}>
                <p className={`m-0 mb-4 ${bodyText}`}>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2">
                  <p className={`m-0 ${bodyText}`}>
                    <span className="font-medium">Email:</span>{' '}
                    <a href="mailto:privacy@rubixkube.ai" className={inlineLink}>
                      privacy@rubixkube.ai
                    </a>
                  </p>
                  <p className={`m-0 ${bodyText}`}>
                    <span className="font-medium">Address:</span> RubixKube Intelligence Private Limited
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
