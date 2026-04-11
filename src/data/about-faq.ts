/** Single source for about page FAQ (visible UI + FAQPage JSON-LD). */
export const aboutFaqItems = [
  {
    q: 'What is Site Reliability Intelligence (SRI)?',
    a: 'Site Reliability Intelligence is a new category that goes beyond observability and AIOps. SRI closes the full loop — detection, reasoning, resolution, and learning — without waiting for a human in the middle. It builds a living model of your infrastructure that compounds knowledge with every incident.',
  },
  {
    q: 'Why was RubixKube built?',
    a: 'Infrastructure complexity passed a threshold that the human mind cannot manage alone: millions of signals, hundreds of services and dependencies every second. The industry responded with more dashboards and more alerts — instrumenting everything but automating nothing. RubixKube was built to close that gap with autonomous, governed reliability.',
  },
  {
    q: 'How is RubixKube different from AIOps platforms?',
    a: 'AIOps platforms typically add AI on top of existing monitoring to reduce alert noise. RubixKube is built from the ground up as an autonomous system: an agent mesh that observes, diagnoses, and acts — with operational memory that compounds over time and safety guardrails that keep humans in control.',
  },
  {
    q: 'What does "governed automation" mean?',
    a: 'Every automated action in RubixKube is traceable, explainable, and reversible. Governance means you set the policies — what can be automated, what needs approval, what gets escalated — and the system respects those boundaries with full audit trails.',
  },
  {
    q: 'Who is RubixKube designed for?',
    a: 'RubixKube is designed for SRE teams, platform engineers, DevOps teams, and engineering leaders who manage cloud-native infrastructure. It works for teams of any size — from a startup with one cluster to enterprises with hundreds of services across multiple clouds.',
  },
] as const
