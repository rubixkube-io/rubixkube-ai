/**
 * Copy for dynamic OG cards (`og-template.png` + overlay).
 * Aligned with each route’s metadata / page promise—no invented metrics.
 */
export const dynamicOgPageContent = {
  platform: {
    eyebrow: 'RubixKube',
    title: 'Know why it broke, in minutes',
    description:
      'Rubix watches your infrastructure, finds the cause when something breaks, and fixes it with you.',
    accent: 'Console · Hubble · Kepler · CLI',
  },
  hubble: {
    eyebrow: 'Hubble by RubixKube',
    title: 'On-call scheduling and paging',
    description:
      'Rosters, escalation policies, acknowledgements, contact rules, a phone app and Slack.',
    accent: 'Rosters · Escalation · Paging',
  },
  about: {
    eyebrow: 'RubixKube',
    title: 'From outages to intelligence',
    description:
      'We built RubixKube from lived pain: late nights and alert floods—and a reliability brain that keeps systems alive.',
    accent: 'Memory · Safety · Explainability',
  },
  solutions: {
    eyebrow: 'RubixKube',
    title: 'Reliability at scale',
    description:
      'Cut MTTR, reduce noise, and protect revenue. Turn firefighting into foresight with autonomous, safe remediation.',
    accent: 'Detect · Diagnose · Resolve · Learn',
  },
  contact: {
    eyebrow: 'RubixKube',
    title: 'Talk with the team',
    description:
      'Plan your reliability path with us—from your first cluster to billions in transactions—with infra and customer trust intact.',
    accent: 'Book a demo · Or reach out',
  },
  resources: {
    eyebrow: 'RubixKube',
    title: 'Docs, playbooks & stories',
    description:
      'Learn the reliability playbook—guides, docs, and stories for teams preventing outages and shipping with confidence.',
    accent: 'Whitepapers · Guides · Case studies',
  },
  blogIndex: {
    eyebrow: 'RubixKube',
    title: 'SRI diaries & deep dives',
    description:
      'AI-native infrastructure, SRE practice, and autonomous reliability—writing from the RubixKube team.',
    accent: 'Site Reliability Intelligence',
  },
  pricing: {
    eyebrow: 'RubixKube',
    title: 'Simple, transparent pricing',
    description:
      'Start free. Scale when you’re ready. Enterprise when reliability is mission-critical.',
    accent: 'Free tier · Business · Enterprise',
  },
} as const
