'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { fadeUpVariants } from '@/lib/animations'
import { ArrowRight, MessageSquare, ShieldCheck, Link2, Hand } from 'lucide-react'

const CONSOLE = 'https://console.rubixkube.ai'

const features = [
  {
    icon: MessageSquare,
    title: 'Answers in the thread',
    body:
      'Mention @Rubix in a channel, or message it from its Messages tab, and it investigates with your organization’s environments, incidents and root cause analyses. One thread is one conversation, so Rubix remembers what was said there.',
  },
  {
    icon: ShieldCheck,
    title: 'Asks before it changes anything',
    body:
      'When Rubix proposes a change, the thread gets a card with the exact command and Approve and Deny buttons. Nothing runs until someone approves, and the card shows who decided.',
  },
  {
    icon: Link2,
    title: 'Shows incidents as cards',
    body:
      'Paste a RubixKube incident link and Slack shows its status, severity and service, with an Ask Rubix button that starts a conversation about it.',
  },
  {
    icon: Hand,
    title: 'Works where you are',
    body:
      'A working state and a Stop button while Rubix thinks, the channel you are looking at as context, and stop, status, settings and help in any thread.',
  },
]

const steps = [
  'Sign in to the RubixKube console and open Integrations, then Slack.',
  'Choose Connect and allow Rubix in your Slack workspace. A Slack admin may need to approve it.',
  'Invite @Rubix to the channels where you want it, or message it directly.',
]

export function SlackPageClient() {
  return (
    <>
      <Navbar />

      <section className="pt-32 pb-12 bg-background">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUpVariants}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Rubix for Slack</h1>
            <p className="text-lg text-foreground-muted leading-relaxed max-w-3xl">
              Rubix is the RubixKube agent. Mention it in a channel or message it directly and it
              answers in the thread with what it sees in your environments: open incidents, their
              root causes, and the fix. It reads first and asks before it changes anything.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={`${CONSOLE}/settings/integrations`}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                Add Rubix to Slack
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <p className="text-sm text-foreground-muted">
                Installs from your RubixKube console. A RubixKube account is required.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-6 md:px-8 space-y-12">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6">What Rubix does in Slack</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="p-6 bg-card-background rounded-lg border border-border">
                  <f.icon className="w-5 h-5 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-foreground-muted leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.section
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Install</h2>
            <ol className="list-decimal pl-6 space-y-2 text-foreground-muted leading-relaxed">
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="text-foreground-muted leading-relaxed mt-4">
              The agent experience (the Messages tab, sessions and the Stop button) needs a paid
              Slack plan. Mentions in channels and incident cards work on every Slack plan.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Permissions</h2>
            <p className="text-foreground-muted leading-relaxed">
              Rubix asks only for what it uses: to hear mentions and direct messages, to post and
              stream replies, to read the thread it was mentioned in at that moment, to show incident
              cards for RubixKube links, to add a reaction that acknowledges a mention, and to show
              the name of the person who asked. It does not join channels on its own and does not
              read channels it was not invited to.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your data</h2>
            <p className="text-foreground-muted leading-relaxed">
              Rubix stores no Slack messages. When you ask something, your words and the recent
              thread messages are sent to Rubix as context and become part of that conversation in
              RubixKube, which your organization keeps for as long as it keeps the conversation.
              Rubix writes only a conversation identifier into Slack message metadata. No Slack data
              is used to train models. Details in the{' '}
              <Link href="/legal/privacy" className="text-primary hover:underline">
                privacy policy
              </Link>
              .
            </p>
          </motion.section>

          <motion.section
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Good to know</h2>
            <p className="text-foreground-muted leading-relaxed">
              Rubix uses a large language model. Its answers can be wrong or incomplete: check before
              you act, and use the Approve step as the check for any change.
            </p>
          </motion.section>

          <motion.section
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Support</h2>
            <div className="p-6 bg-card-background rounded-lg border border-border">
              <p className="text-foreground-muted">
                Questions or problems: the{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  contact page
                </Link>
                , or{' '}
                <a href="mailto:connect@rubixkube.ai" className="text-primary hover:underline">
                  connect@rubixkube.ai
                </a>
                . We answer within two business days. The full guide is at{' '}
                <a
                  href="https://docs.rubixkube.ai/integrations/slack"
                  className="text-primary hover:underline"
                >
                  docs.rubixkube.ai
                </a>
                .
              </p>
            </div>
          </motion.section>
        </div>
      </section>

      <Footer />
    </>
  )
}
