/** Single source for platform FAQ (visible UI + FAQPage JSON-LD). */
export const platformFaqItems = [
  {
    q: 'What is the agent mesh architecture?',
    a: 'The agent mesh is a self-orchestrating network of specialized AI agents — Observer, Planner, Executor, Historian, and Collaborator — that work together as a reasoning engine. Unlike single-model automation, the mesh coordinates multi-step infrastructure operations across services, clusters, and clouds.',
  },
  {
    q: 'How does RubixKube differ from traditional monitoring tools?',
    a: 'Traditional tools like Datadog or Grafana surface alerts and dashboards but stop there. RubixKube closes the loop: it detects anomalies, diagnoses root cause automatically, and applies safe remediation — all with human-in-the-loop controls. It goes beyond observability into autonomous action.',
  },
  {
    q: 'What is the infrastructure knowledge graph?',
    a: 'A live, continuously updated graph of your services, metrics, logs, dependencies, ownership, incident history, CI/CD state, and runbooks. It answers what happened, why, what changed, and whether it has happened before — giving AI agents the context they need for accurate root cause analysis.',
  },
  {
    q: 'Can I talk to RubixKube in natural language?',
    a: 'Yes. The conversational interface lets you ask questions, trigger actions, and review incident timelines using natural language. It is context-aware, meaning it understands your infrastructure topology and recent events without you needing to specify every detail.',
  },
  {
    q: 'What integrations does RubixKube support?',
    a: 'RubixKube has native connectors for Jira, GitHub, PagerDuty, Slack, Confluence, Datadog, Grafana, OpenTelemetry, Sentry, and more. It plugs into your existing stack on day one — no new agents to deploy and no new dashboards to build.',
  },
  {
    q: 'Does RubixKube make changes to my infrastructure automatically?',
    a: 'Only with your permission. Every remediation action goes through safety guardrails with configurable approval policies. Actions are explainable, auditable, and reversible. You choose what runs automatically and what requires human sign-off.',
  },
] as const
