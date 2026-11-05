/** Single source for about page FAQ (visible UI + FAQPage JSON-LD). */
export const aboutFaqItems = [
  {
    q: 'What is an AI SRE?',
    a: 'An AI SRE is software that does the investigation work of a site reliability engineer: it watches your systems, investigates what breaks, finds the root cause with evidence, and proposes the fix. RubixKube does this across Kubernetes, clouds and machines, and remembers every incident and fix.',
  },
  {
    q: 'Why was RubixKube built?',
    a: 'Infrastructure complexity passed a threshold that the human mind cannot manage alone: millions of signals, hundreds of services and dependencies every second. The industry responded with more dashboards and more alerts — instrumenting everything but automating nothing. RubixKube was built to close that gap with autonomous, governed reliability.',
  },
  {
    q: 'How is RubixKube different from AIOps platforms?',
    a: 'AIOps platforms typically add AI on top of existing monitoring to reduce alert noise. RubixKube is an AI SRE: it investigates every incident to a root cause with evidence and proposes the fix, remembers past incidents, and only changes what your mode allows.',
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
