/**
 * Copy for dynamic OG cards (`og-template.png` + overlay), taken from each page's hero.
 * No invented metrics.
 */
export const dynamicOgPageContent = {
  platform: {
    eyebrow: 'Platform',
    title: 'From alert to fix, in minutes.',
    description: 'RubixKube watches your infrastructure. When something breaks, Rubix finds the cause and ships the fix with you.',
    accent: null,
  },
  hubble: {
    eyebrow: 'Hubble by RubixKube',
    title: 'On-call and paging, from RubixKube.',
    description: 'Rosters, escalation policies, acknowledgements, contact rules, a phone app and Slack.',
    accent: null,
  },
  about: {
    eyebrow: 'About RubixKube',
    title: 'Building the bridge between infrastructure and impact.',
    description: 'We did not start with a product idea. We started with a feeling we could not ignore.',
    accent: null,
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'What teams use RubixKube for.',
    description: 'Use cases, products and case studies, from the first alert to the post-mortem.',
    accent: null,
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch.',
    description: 'Questions about RubixKube, help getting started, partnerships and press.',
    accent: null,
  },
  resources: {
    eyebrow: 'Resources',
    title: 'Docs, guides, and deep dives.',
    description: 'The blog, the podcast, the docs and the glossary, in one place.',
    accent: null,
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Reliability that pays for itself.',
    description: 'Individual, Business and Enterprise plans. RubixKube finds the root cause in minutes, so your engineers get back to building.',
    accent: null,
  },
} as const
