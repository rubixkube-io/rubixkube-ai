'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { fadeUpVariants } from '@/lib/animations'
import Link from 'next/link'

const sectionTitle =
  'rk-section-title m-0 mb-5 text-[clamp(1.45rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[var(--ink)]'
const bodyText = 'font-[family-name:var(--font-figtree)] font-normal text-[18px] leading-[1.7] text-[var(--ink)]'
const listText = `m-0 list-disc space-y-1.5 pl-6 marker:text-[var(--mid)] ${bodyText}`
const panelCard = 'rounded-2xl bg-[var(--panel)] p-6 ring-1 ring-[var(--rule)] sm:p-8'
const inlineLink = 'break-all text-[var(--blue)] underline underline-offset-4'

const TermsPage = () => {
  const quickLinks = [
    { title: "Eligibility", href: "#eligibility" },
    { title: "Use of Services", href: "#use-of-services" },
    { title: "Data & Responsibilities", href: "#data-responsibilities" },
    { title: "Billing & Payment", href: "#billing-payment" },
    { title: "Intellectual Property", href: "#intellectual-property" },
    { title: "Contact", href: "#contact" },
  ]

  const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id: string }) => (
    <motion.section
      id={id}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
    >
      <h2 className={sectionTitle}>{title}</h2>
      <div className={`[&_p]:m-0 ${bodyText}`}>
        {children}
      </div>
    </motion.section>
  )

  return (
    <>
      <Navbar />

      <header className="bg-[var(--bg)]">
        <PageHero className="pb-0" title="Terms of Service">
        {/* Meta Info */}
        <div
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-[family-name:var(--font-figtree)] text-[15px] text-[var(--mid)]"
        >
          <span>Effective Date: June 25, 2025</span>
          <span>Last Updated: June 25, 2025</span>
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
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14"
            >
              <h2 className={sectionTitle}>Introduction</h2>
              <p className={`m-0 ${bodyText}`}>
                These Terms of Service govern your use of RubixKube™ and its related services. 
                By accessing or using our platform, you agree to be bound by these terms and all 
                applicable laws and regulations.
              </p>
            </motion.section>

            {/* Eligibility */}
            <Section title="Eligibility" id="eligibility">
              <p className="!mb-4">
                To use RubixKube™, you must be at least 16 years of age and have the authority to enter into binding agreements. 
                If you&apos;re using RubixKube on behalf of an organization, you represent that you have the necessary permissions to bind that organization to these Terms.
              </p>
            </Section>

            {/* Use of Services */}
            <Section title="Use of Services" id="use-of-services">
              <p className="!mb-4">
                You agree to use RubixKube™ only for lawful purposes. You will not:
              </p>
              <div>
                <ul className={listText}>
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
              <p className="!mb-4">
                You retain ownership of your data. We process it according to our Privacy Policy.
              </p>
              <div>
                <ul className={listText}>
                  <li>Keep your credentials secure</li>
                  <li>Ensure compliance of integrated tools (e.g., GitHub, Prometheus)</li>
                  <li>Backup critical data</li>
                </ul>
              </div>
            </Section>

            {/* Billing & Payment */}
            <Section title="Subscription, Billing & Payment" id="billing-payment">
              <div>
                <p>
                  All paid Services are billed per our pricing terms. Charges are non-refundable unless required by law. 
                  Pricing may be updated with prior notice.
                </p>
              </div>
            </Section>

            {/* Intellectual Property */}
            <Section title="Intellectual Property" id="intellectual-property">
              <p className="!mb-4">
                RubixKube™ and all platform content are the exclusive IP of RubixKube Intelligence Private Limited.
              </p>
              <div>
                <ul className={listText}>
                  <li>Do not use trademarks like &quot;RubixKube™&quot;, &quot;Agent Mesh&quot; without permission</li>
                  <li>Do not copy or distribute platform content without approval</li>
                </ul>
              </div>
            </Section>

            {/* Feedback & Contributions */}
            <Section title="Feedback & Contributions" id="feedback">
              <div>
                <p>
                  Any feedback or contributions you provide (e.g., bug reports, suggestions) grant RubixKube™ a royalty-free, 
                  perpetual right to use them to improve the product.
                </p>
              </div>
            </Section>

            {/* Service Availability */}
            <Section title="Service Availability" id="service-availability">
              <div>
                <p>
                  Services are provided &quot;as-is&quot; and &quot;as-available&quot;. We are not liable for downtimes due to maintenance, 
                  third-party issues, or upgrades.
                </p>
              </div>
            </Section>

            {/* Limitation of Liability */}
            <Section title="Limitation of Liability" id="liability">
              <div>
                <p>
                  Our liability is limited to the amount you paid for Services in the 12 months preceding the claim. 
                  We are not liable for indirect, incidental, or consequential damages.
                </p>
              </div>
            </Section>

            {/* Termination */}
            <Section title="Termination" id="termination">
              <div>
                <p>
                  You may cancel your account at any time. We may terminate accounts for Terms violations. 
                  Upon termination, your access to Services will cease immediately.
                </p>
              </div>
            </Section>

            {/* Changes to Terms */}
            <Section title="Changes to Terms" id="changes">
              <div>
                <p>
                  We may update these Terms periodically. Continued use after changes constitutes acceptance. 
                  Material changes will be communicated via email or platform notifications.
                </p>
              </div>
            </Section>

            {/* Contact */}
            <Section title="Contact Information" id="contact">
              <div className={panelCard}>
                <p className="!mb-4">
                  For questions about these Terms, contact us at:
                </p>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Email:</span>{' '}
                    <a href="mailto:connect@rubixkube.ai" className={inlineLink}>
                      connect@rubixkube.ai
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> RubixKube Intelligence Private Limited
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
