// Plain data and helpers. No imports and only erasable TypeScript syntax, so
// scripts/tests/kepler-pricing.test.mjs can load this file with Node directly.

/** Prices are in cents (USD). Annual is the per-month price when billed once a year.
 *  `line` sits under the price; `tag` sits next to the name. */
export const PLANS = [
  {
    name: 'Free',
    tag: 'Forever',
    price: { monthly: 0, annual: 0 },
    line: 'For one machine',
    recommended: false,
    includes: [
      'Chat, terminal, browser and editor',
      'Memory, skills and slash commands',
      'MCP and the CLI',
      'Up to 3 watchers',
      'Your own model keys',
    ],
  },
  {
    name: 'Pro',
    tag: null,
    price: { monthly: 2000, annual: 1600 },
    line: 'or $16 a month, billed yearly',
    recommended: true,
    includes: [
      'Everything in Free',
      'War rooms and topology',
      'Automations',
      'Remote access and channels',
      'Unlimited watchers',
      'Hosted models included',
      '3 devices',
    ],
  },
] as const

/** AI credit: a one-time buy, used once a week's hosted usage is reached. Not a subscription. */
export const CREDIT = {
  name: 'AI credit',
  tag: 'One-time',
  headline: 'Add credit',
  line: 'Buy once. No subscription.',
  includes: ['For when you reach your weekly limit', 'Use it on any hosted model', 'Lasts a year'],
} as const

/** Team is not self-serve at launch: one line under the cards, linking to contact. */
export const TEAM_LINE = { text: 'On call as a team?', link: 'Talk to us' } as const

export const TRIAL = 'Every new account starts with 14 days of Pro, hosted models included. No card.'

export const FAQ = [
  {
    question: 'Can I use my own model keys?',
    answer:
      'Yes, on every plan. Bring an Anthropic, OpenAI, Google or Bedrock key and Kepler uses it. Hosted models are optional.',
  },
  {
    question: 'What is the trial?',
    answer:
      'Every new account gets 14 days of Pro, hosted models included. No card. When it ends, you keep the free tool and everything you built.',
  },
  {
    question: 'How much hosted usage does Pro include?',
    answer:
      'Pro has two limits on hosted models: one resets every 5 hours and one resets every week. Most people never reach them. If you do, wait for the reset or add credit.',
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
