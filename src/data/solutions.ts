/**
 * What /solutions lists besides the Sanity reference pages: the products, and use cases drawn from
 * the docs. A use case links to the docs page that walks through it until it has a page of its own
 * on the site (a Sanity reference page in the `use-case` category).
 */

const DOCS = 'https://docs.rubixkube.ai'

export type SolutionProduct = {
  name: string
  line: string
  href: string
  external?: boolean
  action: string
  image: { src: string; w: number; h: number; alt: string }
}

/** The products, shown one at a time in the feature band */
export const SOLUTION_PRODUCTS: SolutionProduct[] = [
  {
    name: 'RubixKube',
    line: 'Turns what breaks into incidents, finds the cause of each one with the evidence, and suggests the fix. You decide how much Rubix does on its own.',
    href: '/platform',
    action: 'Explore the platform',
    image: {
      src: '/screenshots/platform/hero-rca-dark.png',
      w: 3200,
      h: 2000,
      alt: 'An RCA in the RubixKube console: connection exhaustion on orders-db takes down payments-api',
    },
  },
  {
    name: 'Hubble',
    line: 'On-call schedules, escalation and paging for your team, tied to the same incidents.',
    href: '/hubble',
    action: 'See Hubble',
    image: { src: '/screenshots/hubble/nav-card.png', w: 1280, h: 800, alt: 'Hubble on the web and on a phone: who is on call, and an incident waiting for acknowledgement' },
  },
  {
    name: 'Kepler',
    line: 'The desktop IDE for the engineer on call. It works on your machine, with your access, and remembers your systems.',
    href: '/products/kepler',
    action: 'See Kepler',
    image: { src: '/screenshots/kepler/workspace.png', w: 2000, h: 1254, alt: 'The Kepler window with two conversations side by side, one investigating a failing deployment' },
  },
  {
    name: 'Rubix CLI',
    line: 'Ask Rubix about incidents and environments from your terminal.',
    href: '/products/rubix-cli',
    action: 'See the CLI',
    image: { src: '/screenshots/rubix-cli.png', w: 2012, h: 1876, alt: 'Rubix CLI in a terminal' },
  },
]

export type UseCase = { slug: string; title: string; summary: string; href: string }

/** Use cases, in the order a team meets them: the alert, the cause, the fix, then everything around it */
export const USE_CASES: UseCase[] = [
  {
    slug: 'failing-pod',
    title: 'Investigate a failing pod',
    summary: 'OOMKilled, CrashLoopBackOff, ImagePullBackOff: ask Rubix what happened and get the cause with the evidence.',
    href: `${DOCS}/tutorials/chat-troubleshooting`,
  },
  {
    slug: 'alert-storm',
    title: 'One incident for an alert storm',
    summary: 'Alerts from Datadog, PagerDuty and Grafana are triaged and grouped, so one cause becomes one incident.',
    href: `${DOCS}/integrations/pagerduty`,
  },
  {
    slug: 'root-cause',
    title: 'A root cause you can check',
    summary: 'Every RCA lays out the cause step by step and cites the logs, events, deploys and pull requests behind it.',
    href: `${DOCS}/concepts/root-cause-analysis`,
  },
  {
    slug: 'fix-with-pr',
    title: 'Fix it with a pull request',
    summary: 'Rubix proposes the fix as a pull request or a change through your tools, and waits for your approval.',
    href: `${DOCS}/tutorials/automate-incident-remediation`,
  },
  {
    slug: 'ask-infra',
    title: 'Ask your infrastructure',
    summary: 'Ask in plain English, in the console, Slack, Teams or your AI tools, and get answers that cite your systems.',
    href: `${DOCS}/tutorials/talk-to-infra`,
  },
  {
    slug: 'runbook-skill',
    title: 'Turn a runbook into a skill',
    summary: 'Write your best on-call playbook once, and Rubix runs it the same way for the whole team.',
    href: `${DOCS}/tutorials/add-custom-agent-skills`,
  },
  {
    slug: 'postmortems',
    title: 'Post-mortems and tickets, written for you',
    summary: 'Publish RCAs as Notion pages and open follow-ups in Linear or Jira, where your team already tracks work.',
    href: `${DOCS}/integrations/notion`,
  },
  {
    slug: 'time-saved',
    title: 'Show leadership the time saved',
    summary: 'Hours of investigation saved, MTTU, coverage and recurrence, across every environment, in one report.',
    href: `${DOCS}/using/analytics`,
  },
  {
    slug: 'clouds-machines',
    title: 'Cover your clusters, clouds and machines',
    summary: 'Read-only observers for Kubernetes, AWS and Google Cloud accounts, and Linux machines.',
    href: `${DOCS}/environments/kubernetes`,
  },
  {
    slug: 'war-room',
    title: 'A war room for big incidents',
    summary: 'Kepler leads the incident, with one agent per angle, and gathers the findings and approvals in one place.',
    href: `${DOCS}/kepler/war-room`,
  },
  {
    slug: 'watchers',
    title: 'Checks that run while you are away',
    summary: 'Kepler watchers run read-only checks on a schedule and come back with a suggestion when one fires.',
    href: `${DOCS}/kepler/watchers`,
  },
  {
    slug: 'on-call',
    title: 'On-call and paging',
    summary: 'Hubble pages the right person when an alert fires, and keeps paging until someone acknowledges it.',
    href: '/hubble',
  },
]
