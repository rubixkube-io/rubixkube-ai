// Plain data and helpers. No imports and only erasable TypeScript syntax, so
// scripts/tests/kepler-pricing.test.mjs can load this file with Node directly.

/** Prices are in cents (USD). Annual is the per-month price when billed once a year. */
export const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    recommended: false,
    includes: [
      'Chat with your own model keys',
      'Terminal, browser and editor',
      'Memory across sessions',
      'Up to 3 watchers',
      'Skills, MCP and the CLI',
      '1 device',
    ],
    button: { label: 'Download', href: '#download' },
    note: null,
  },
  {
    name: 'Pro',
    price: { monthly: 2000, annual: 1600 },
    recommended: true,
    includes: [
      '**Everything in Free**',
      'War rooms',
      'Topology',
      'Automations',
      'Remote access',
      'Channels: WhatsApp, Telegram, Slack, Discord',
      'Artifacts',
      'Unlimited watchers',
      'Hosted models with $5 of usage a month',
      '3 devices',
    ],
    button: { label: 'Start free trial', href: '#download' },
    note: '14 days of Pro free. No card.',
  },
  {
    name: 'Team',
    price: null,
    recommended: false,
    includes: [
      '**Everything in Pro**',
      '5 devices per seat',
      'Billing and invoices for the organization',
    ],
    button: { label: 'Contact us', href: '/contact' },
    note: null,
  },
] as const

/** Provider list price per million tokens, in cents. Mirrors gitops BILLING_USAGE_PRICES. null renders as TBD. */
export const USAGE_PRICES: readonly { model: string; provider: string; provider_in: number | null; provider_out: number | null }[] = [
  { model: 'kepler-fast', provider: 'Google Vertex AI, Gemini 3.5 Flash', provider_in: 150, provider_out: 900 },
  { model: 'kepler-expert', provider: 'Google Vertex AI, Gemini 3.1 Pro', provider_in: 200, provider_out: 1200 },
]

export const USAGE_MARKUP_PERCENT = 110

export const FAQ = [
  {
    question: 'Can I use my own model keys?',
    answer: 'Yes, on every plan. Bring an Anthropic, OpenAI, Google or Bedrock key and Kepler uses it. Hosted models are optional.',
  },
  {
    question: 'What is the trial?',
    answer: 'Every new account gets 14 days of Pro with $5 of hosted usage. No card. When it ends, you keep the free tool and everything you built.',
  },
  {
    question: 'What happens when I stop paying?',
    answer:
      'Nothing is deleted. Automations, channels and extra watchers pause, war rooms and topology close, and your own keys keep working. Upgrade again and everything resumes.',
  },
]

/** Format an amount in minor units (cents). USD only. */
export function formatMoney(minor: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(minor / 100)
}

/** Kepler price is the provider's list price plus 10%, rounded to a cent. null stays null. */
export function keplerPrice(provider: number | null): number | null {
  return provider === null ? null : Math.round((provider * USAGE_MARKUP_PERCENT) / 100)
}
