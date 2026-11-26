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
const tableHead =
  'py-3 pr-5 text-left align-bottom font-[family-name:var(--font-mono)] text-[12px] font-light uppercase tracking-[0.08em] text-[var(--mid)]'
const tableCell = 'py-3.5 pr-5 align-top font-[family-name:var(--font-figtree)] text-[16px] leading-[1.5] text-[var(--ink)]'

const PRIVACY_EMAIL = 'privacy@rubixkube.ai'

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-14 scroll-mt-[calc(var(--nav-stack)+2rem)] last:mb-0"
    >
      <h2 className={sectionTitle}>{title}</h2>
      {children}
    </motion.section>
  )
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead className="border-b border-[var(--ink)]">
          <tr>
            {head.map((h) => (
              <th key={h} className={tableHead}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-[var(--rule)]">
              {row.map((cell, i) => (
                <td key={i} className={i === 0 ? `${tableCell} font-semibold` : tableCell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Email() {
  return (
    <a href={`mailto:${PRIVACY_EMAIL}`} className={inlineLink}>
      {PRIVACY_EMAIL}
    </a>
  )
}

export function PrivacyPageClient() {
  const uses = [
    ["Run the service", "Sign you in, connect your environments, detect and investigate incidents, write RCAs and Tasks, answer you in the console, CLI, Slack and MCP, and send the notifications you set up", "Contract"],
    ["Improve your own workspace", "Your Rubix learns from your incidents, feedback and instructions so it gets better for your organization", "Contract"],
    ["Improve RubixKube on free plans", "Described under Free and paid plans below", "Legitimate interests, and you can turn it off"],
    ["Support", "Answer your questions and fix problems you report", "Contract"],
    ["Billing and tax", "Take payments and issue GST invoices", "Contract and legal obligation"],
    ["Security", "Protect accounts and the service, and investigate misuse", "Legitimate interests"],
    ["Product analytics", "See which parts of the console are used, so we know what to improve", "Legitimate interests in the console; your consent on our website"],
    ["News and updates", "Send product news if you sign up for it", "Consent, and you can unsubscribe at any time"],
  ]

  const providers = [
    ["Google Cloud", "Hosting, databases, storage and hosted AI models (Vertex AI)", "United States"],
    ["MongoDB Atlas", "Databases", "United States"],
    ["Auth0 (Okta)", "Sign-in", "United States"],
    ["PostHog", "Product analytics", "United States"],
    ["Razorpay", "Payments", "India"],
    ["Email and SMS delivery providers", "Notifications, invites and paging", "United States"],
    ["Slack", "Delivering Rubix answers, if your organization installs the Slack app", "United States"],
    ["Netlify and Calendly", "Our website, its forms, and demo bookings", "United States"],
  ]

  const quickLinks = [
    { title: "What We Collect", href: "#what-we-collect" },
    { title: "How We Use Data", href: "#how-we-use-data" },
    { title: "Free and Paid Plans", href: "#plans" },
    { title: "Who We Share With", href: "#sharing" },
    { title: "Security and Retention", href: "#data-protection" },
    { title: "Your Rights", href: "#your-rights" },
    { title: "Kepler", href: "#kepler" },
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
          <span>Last Updated: November 27, 2026</span>
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
      <section className="bg-[var(--bg)] pt-14 pb-24">
        <div className="rk-landing-max px-[var(--pad)] [&>*]:max-w-[900px]">
          <div>

            <Section id="introduction" title="Introduction">
              <p className={`m-0 ${bodyText}`}>
                This policy explains what personal data RubixKube Intelligence Private Limited
                (&quot;RubixKube&quot;, &quot;we&quot;) collects, why, who we share it with, how long we keep it, and
                the choices you have. It covers our website, the RubixKube platform (console, API, CLI,
                Slack app, MCP server and observers), Hubble and Kepler.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                We play two roles. For your account, billing and our own analytics, we decide how data is
                used, so we are the controller. For the data your organization sends us from its systems
                (logs, events, incidents and the conversations about them), we handle it on your
                organization&apos;s behalf, so your organization is the controller and we are its processor.
                Business customers can ask for our Data Processing Agreement at <Email />.
              </p>
            </Section>

            <Section id="what-we-collect" title="What We Collect">
              <div className="border-b border-[var(--rule)]">
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Your account</h3>
                  <ul className={listText}>
                    <li>Name, email address, profile picture and language from your sign-in provider</li>
                    <li>Your organization, role and notification settings</li>
                    <li>Phone number, if you use Hubble paging</li>
                  </ul>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Billing</h3>
                  <ul className={listText}>
                    <li>Legal or business name, GSTIN or tax id, address and phone, to issue invoices</li>
                    <li>Card and bank details go to Razorpay and never reach us</li>
                  </ul>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Data from your systems</h3>
                  <ul className={listText}>
                    <li>Logs, events, alerts, resource names and status that observers and integrations send</li>
                    <li>Incidents, RCAs, Tasks, and your conversations with Rubix</li>
                    <li>These can include personal data that your own systems record, such as user names or IP addresses</li>
                    <li>Observers never send secret values, and they mask emails, card numbers, bank numbers and IP addresses before sending. You can add your own masking rules</li>
                  </ul>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>How you use RubixKube</h3>
                  <ul className={listText}>
                    <li>IP address and browser, in our security logs</li>
                    <li>In the console: which pages and features you use, and session recordings with all text and typing hidden</li>
                    <li>On our website: page views, counted without cookies until you accept them</li>
                  </ul>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>When you contact us</h3>
                  <ul className={listText}>
                    <li>What you send through our forms, demo bookings, support and creator program applications</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="how-we-use-data" title="How We Use Your Data">
              <Table head={['Purpose', 'What it means', 'Legal basis']} rows={uses} />
              <p className={`m-0 mt-5 ${bodyText}`}>
                We do not sell your personal data, and we do not use it for advertising.
              </p>
            </Section>

            <Section id="plans" title="Free and Paid Plans">
              <div className="border-b border-[var(--rule)]">
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Paid plans</h3>
                  <p className={`m-0 ${bodyText}`}>
                    We never use your content to train models shared with other customers. We use it only
                    to run and improve your own workspace.
                  </p>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Free plans</h3>
                  <div>
                    <p className={`m-0 ${bodyText}`}>
                      We may use your content to improve RubixKube and to train or tune our models, after
                      removing secrets and personal details we can detect. We use incidents, RCAs, Tasks,
                      your conversations with Rubix and your feedback. We do not use raw logs from your
                      systems or Slack messages.
                    </p>
                    <p className={`m-0 mt-4 ${bodyText}`}>
                      You can turn this off at any time by writing to <Email />. When you move to a paid
                      plan, it stops for everything you create from then on.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="sharing" title="Who We Share Data With">
              <p className={`m-0 mb-5 ${bodyText}`}>
                We share personal data only with the service providers that help us run RubixKube, under
                contracts that require them to protect it, and when the law requires us to.
              </p>
              <Table head={['Provider', 'What for', 'Where']} rows={providers} />
              <p className={`m-0 mt-5 ${bodyText}`}>
                If your organization connects its own AI model provider, your data goes to that provider
                under your organization&apos;s own agreement with it.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                RubixKube is based in India and most of our providers store data in the United States. When
                we move personal data out of the European Economic Area or the United Kingdom, we rely on
                the European Commission&apos;s Standard Contractual Clauses, or on an adequacy decision where
                one applies.
              </p>
            </Section>

            <Section id="data-protection" title="Security and Retention">
              <div className="border-b border-[var(--rule)]">
                <div className={ruledRow}>
                  <h3 className={`${rowTitle} flex items-center gap-2`}>
                    <Shield className="h-[18px] w-[18px] shrink-0 text-[var(--ink)]" strokeWidth={1.75} />
                    How we protect it
                  </h3>
                  <ul className={listText}>
                    <li>TLS encryption for the console and API</li>
                    <li>Encryption at rest for stored data, and extra encryption for stored keys and tokens</li>
                    <li>Each organization sees only its own data</li>
                    <li>Staff access to production is read-only by default, and staff changes to an organization need a second sign-in factor and are recorded</li>
                    <li>Secret values from your systems are never collected</li>
                  </ul>
                </div>
                <div className={`${ruledRow}`}>
                  <h3 className={`${rowTitle} flex items-center gap-2`}>
                    <Database className="h-[18px] w-[18px] shrink-0 text-[var(--ink)]" strokeWidth={1.75} />
                    How long we keep it
                  </h3>
                  <ul className={listText}>
                    <li>Account data: until you delete your account</li>
                    <li>Raw data from your systems: 30 days</li>
                    <li>Incidents, RCAs, Tasks and conversations: for as long as your organization uses RubixKube</li>
                    <li>Billing records: as long as tax law requires</li>
                    <li>Product analytics: while it helps us understand how RubixKube is used. Ask us to delete yours at any time</li>
                  </ul>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Deleting your data</h3>
                  <p className={`m-0 ${bodyText}`}>
                    When you ask us to delete your account or your organization, we block access to it at
                    once and delete it from our systems within 30 days. Copies in our backups are removed
                    when those backups expire.
                  </p>
                </div>
              </div>
            </Section>

            <Section id="your-rights" title="Your Rights & Choices">
              <div className="border-b border-[var(--rule)]">
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Your rights</h3>
                  <div>
                    <p className={`m-0 mb-3 ${bodyText}`}>
                      You can ask us to:
                    </p>
                    <ul className={listText}>
                      <li>Show you the personal data we hold about you</li>
                      <li>Correct it</li>
                      <li>Delete it</li>
                      <li>Send it to you in a common format</li>
                      <li>Limit how we use it, or stop using it for analytics or free-plan improvement</li>
                      <li>Stop sending you news and updates</li>
                    </ul>
                    <p className={`m-0 mt-4 ${bodyText}`}>
                      Write to <Email />. We answer within one month. If your data reached us through an
                      organization that uses RubixKube, we will pass your request to that organization and
                      help it answer.
                    </p>
                  </div>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Complaints</h3>
                  <p className={`m-0 ${bodyText}`}>
                    You can also complain to the data protection authority where you live or work. We would
                    like the chance to fix it first, so please write to us.
                  </p>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Cookies</h3>
                  <p className={`m-0 ${bodyText}`}>
                    The console uses cookies to keep you signed in and for product analytics, as the notice
                    on the sign-in page says. Our website sets analytics cookies only after you accept them,
                    and you can change your choice from the link in the footer.
                  </p>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Automatic decisions</h3>
                  <p className={`m-0 ${bodyText}`}>
                    We make no automatic decisions about you with legal or similar effects. When a trial
                    ends or a payment lapses, the organization moves to the free plan automatically.
                  </p>
                </div>
                <div className={ruledRow}>
                  <h3 className={rowTitle}>Age</h3>
                  <p className={`m-0 ${bodyText}`}>
                    RubixKube is for people aged 16 and over.
                  </p>
                </div>
              </div>
            </Section>

            {/* Rubix in Slack */}
            <Section id="slack" title="Rubix in Slack">
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
            </Section>

            {/* Kepler */}
            <Section id="kepler" title="Kepler">
              <p className={`m-0 ${bodyText}`}>
                Kepler is a desktop app that runs on your machine. Your conversations, memory, settings and
                the keys you add stay on that machine. We do not receive them.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                Kepler connects out only for these: the model you choose, which receives what you ask it
                and what it needs to answer; the tools and systems you connect it to; signing in to your
                Kepler account; checking your plan, which sends a device identifier (a one-way hash, not a
                serial number); checking for updates; and reading the list of what is new in each
                release. When you use Kepler&apos;s hosted models, your requests pass through our gateway to
                the model provider, and we record how much you use to apply your plan&apos;s limits.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                Kepler for Chrome, the browser extension, works only in tabs Kepler opens and keeps in a
                &quot;Kepler&quot; tab group. It sends the text and screenshots of those pages to the Kepler app
                on your computer and nowhere else. Kepler then uses them like anything else you ask it to
                read: they go to the model you chose, and with Kepler&apos;s hosted models they pass through
                our gateway to the model provider. The extension does not read your other tabs, does not
                keep your browsing history, and sends nothing to RubixKube itself.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                Sharing usage with us is off until you turn it on, during onboarding or in Settings,
                General, Privacy. When it is on, Kepler sends which features you use and how they go, as
                counts and outcomes, with your plan, the app version and your operating system, linked to
                your Kepler account. It never sends what you type, what Kepler runs or reads, or the names
                of your systems, and it sends no IP address or location. We use PostHog, in the United
                States, to store it. Turn sharing off at any time and Kepler stops sending at once.
              </p>
              <p className={`m-0 mt-5 ${bodyText}`}>
                Report a Problem copies a report (the app version, the agent&apos;s state and its recent log
                lines) to your clipboard. Nothing is sent unless you paste it somewhere yourself.
              </p>
            </Section>

            <Section id="updates" title="Policy Updates">
              <p className={`m-0 ${bodyText}`}>
                We will update this policy when what we do changes, and change the date at the top. We will
                tell you by email or in the console before a significant change takes effect.
              </p>
            </Section>

            <Section id="contact" title="Contact Us">
              <div className={panelCard}>
                <p className={`m-0 mb-4 ${bodyText}`}>
                  For questions about this policy or your data, contact us:
                </p>
                <div className="space-y-2">
                  <p className={`m-0 ${bodyText}`}>
                    <span className="font-medium">Email:</span> <Email />
                  </p>
                  <p className={`m-0 ${bodyText}`}>
                    <span className="font-medium">Company:</span> RubixKube Intelligence Private Limited, India
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
