/** Single source for pricing FAQ (visible UI + FAQPage JSON-LD). */
export const pricingFaqItems = [
  {
    q: 'What is an investigation?',
    a: "When something breaks, RubixKube finds it, traces it back to the root cause, and tells you exactly what to fix. That's one investigation.",
  },
  {
    q: 'What is an environment?',
    a: 'Your AWS account, your GCP project, your Kubernetes cluster, each one is an environment. Think of it as one distinct place your infrastructure lives.',
  },
  {
    q: 'What is a monitored application?',
    a: 'Any service RubixKube keeps an eye on, like your payment API, your auth service, your data pipeline. If it breaks, we catch it.',
  },
  {
    q: 'What happens when I hit my investigation limit?',
    a: "On Free, you're paused until next month. On Business, we keep going at $8 per investigation or grab a Boost Pack if you'd rather pay upfront at a lower rate.",
  },
  {
    q: 'Does RubixKube touch my infrastructure?',
    a: 'No. We watch, we analyze, we recommend. Your team decides what to do. Nothing changes without you.',
  },
] as const
