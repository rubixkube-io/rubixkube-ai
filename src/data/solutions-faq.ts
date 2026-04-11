/** Single source for solutions FAQ (visible UI + FAQPage JSON-LD). */
export const solutionsFaqItems = [
  {
    q: 'How does RubixKube reduce mean time to resolution (MTTR)?',
    a: 'RubixKube correlates signals across metrics, logs, and events, then traverses the infrastructure knowledge graph to find the root cause — in seconds, not hours. Automated diagnosis removes the manual triage cycle that accounts for most of MTTR in traditional incident response.',
  },
  {
    q: 'Can RubixKube prevent incidents before they happen?',
    a: 'Yes. RubixKube learns from past incidents and detects early warning patterns — resource exhaustion trends, deployment anomalies, and dependency failures — before they cascade into outages. It shifts operations from reactive firefighting to proactive prevention.',
  },
  {
    q: 'How does RubixKube handle deployment safety?',
    a: 'RubixKube validates deployments in real time and monitors for regressions from the moment code ships. If it detects risk — elevated error rates, latency spikes, or resource pressure — it can auto-rollback to the last known good state, with full audit trail.',
  },
  {
    q: 'What industries does RubixKube support?',
    a: 'RubixKube works across e-commerce, financial services, healthcare, SaaS, and any industry running cloud-native infrastructure. It connects to AWS, GCP, Kubernetes, and VMs — wherever your production actually runs.',
  },
  {
    q: 'Is human approval required for automated remediation?',
    a: 'It is configurable. You set the policy: fully autonomous for low-risk actions, human-in-the-loop for sensitive changes, or escalation-only mode. Every action is explainable and reversible regardless of the approval level.',
  },
] as const
