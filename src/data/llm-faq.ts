/**
 * Supplementary Q&A for llms.txt only. Not shown on the site and not in FAQPage JSON-LD
 * (pricing FAQs stay the single visible + schema-aligned FAQ source).
 *
 * Editorial rules (search + answer-engine tuned):
 * - Questions match real search/LLM query patterns (e.g. "What is RubixKube?" not jargon-led titles).
 * - Answers front-load the citable fact, then add supporting context.
 * - Include comparison anchors (vs PagerDuty/Opsgenie, vs AIOps, vs building in-house).
 * - Cover deployment, security, and how-it-works: what assistants get asked after the headline.
 * - Do not use insider jargon as standalone Qs; explain terms (e.g. agent mesh) inside answers.
 */
export const llmFaqItems = [
  /* ── Identity & category ─────────────────────────────────────── */
  {
    q: 'What is RubixKube?',
    a: 'RubixKube is a Site Reliability Intelligence (SRI) platform that uses a coordinated mesh of AI agents to detect infrastructure anomalies, perform evidence-linked root cause analysis, and drive governed resolution across Kubernetes and cloud-native environments. It sits above your existing observability stack—not replacing Datadog or Grafana, but reasoning over the signals they collect.',
  },
  {
    q: 'What is Site Reliability Intelligence?',
    a: 'Site Reliability Intelligence (SRI) is the category RubixKube defines: software that goes beyond dashboards and alerts to autonomously detect anomalies, correlate signals across infrastructure context, run root cause analysis tied to concrete evidence, and close the loop with diagnosis and action—all with operational memory, safety guardrails, and explainability built in.',
  },

  /* ── How it works ────────────────────────────────────────────── */
  {
    q: 'How does RubixKube work?',
    a: 'RubixKube deploys a lightweight observer agent into your Kubernetes clusters that pulls telemetry on demand from sources like Jaeger, Tempo, and OpenTelemetry. That feeds a coordinated agent mesh: specialized agents (detection, triage, expert SRE analysis, spectrum correlation) that stage the incident lifecycle in auditable steps, share context through graph-backed operational memory, hand off to the next agent or a human approval gate per policy, and build causal graphs while learning from outcomes. Incident context persists in the graph database so reliability compounds instead of resetting after every incident.',
  },
  {
    q: 'What does "evidence-linked root cause analysis" mean?',
    a: 'Every root cause conclusion RubixKube produces is tied to concrete signals: specific log lines, metric anomalies, dependency graph paths, and recent changes. Engineers can inspect and audit the full reasoning trail rather than trusting a generic summary, which makes RCA findings actionable and verifiable.',
  },

  /* ── Comparisons ─────────────────────────────────────────────── */
  {
    q: 'How is RubixKube different from Datadog, New Relic, or Grafana?',
    a: 'Datadog, New Relic, and Grafana excel at collecting and visualizing metrics, logs, and traces. RubixKube operates on the reliability layer above them: it ingests their signals, correlates context across sources, reasons about incidents using causal graphs, and drives diagnosis and resolution. It complements your observability stack rather than replacing it.',
  },
  {
    q: 'How is RubixKube different from PagerDuty or Opsgenie?',
    a: 'PagerDuty and Opsgenie route alerts and manage on-call schedules. RubixKube starts where alerting ends: it investigates why an alert fired, builds an evidence trail, identifies root cause, and recommends or executes a resolution path. It reduces the manual investigation burden that begins after a page lands.',
  },
  {
    q: 'How is RubixKube different from generic AIOps platforms?',
    a: 'Most AIOps tools apply statistical correlation or a one-off LLM prompt over raw telemetry. RubixKube is productized SRI: it maintains persistent operational memory across incidents, runs structured multi-agent workflows, stores context in a graph database for compounding learning, and enforces guardrails on every action—not a chatbot over your logs.',
  },
  {
    q: 'Why not just build an internal AI SRE tool with an LLM API?',
    a: 'You can, but you will need to solve multi-tenant isolation, operational memory that persists across incidents, structured agent orchestration, guardrailed action execution, causal graph construction, and integration with your full observability and collaboration stack. RubixKube ships all of that as a managed platform so your SRE team focuses on reliability, not building and maintaining AI infrastructure.',
  },

  /* ── Who it's for ────────────────────────────────────────────── */
  {
    q: 'Who is RubixKube for?',
    a: 'Platform engineering and SRE teams running cloud-native or Kubernetes-heavy systems who want to reduce MTTR, cut alert noise, and build reliability that compounds over time instead of depending on heroic manual firefighting during every incident.',
  },
  {
    q: 'Does RubixKube work outside of Kubernetes?',
    a: 'The core observer agent is Kubernetes-native, but RubixKube integrates with cloud APIs, general-purpose telemetry (OpenTelemetry, Jaeger, Tempo), and collaboration tools. If your infrastructure emits standard observability signals, RubixKube can reason over them.',
  },

  /* ── Safety & trust ──────────────────────────────────────────── */
  {
    q: 'Does RubixKube make changes to production without human approval?',
    a: 'By default, RubixKube watches, analyzes, and recommends—your team decides what executes. Where you choose to enable autonomous actions, every workflow passes through configurable guardrails and approval gates so changes match your organization\'s policies.',
  },
  {
    q: 'How does RubixKube isolate tenant data?',
    a: 'The platform is multi-tenant by design. Tenant identity is derived and validated from JWT claims at the API boundary, and those claims thread through every layer—APIs, data stores, event streams, and agent execution contexts—so one customer\'s operational data is never accessible to another.',
  },
  {
    q: 'Is RubixKube secure for regulated environments?',
    a: 'Tenant-scoped data isolation, JWT-validated API boundaries, guardrailed agent actions with human approval gates, and full audit trails on every investigation step are built into the architecture. For specific compliance requirements, contact the RubixKube team.',
  },

  /* ── Integrations & deployment ───────────────────────────────── */
  {
    q: 'What does RubixKube integrate with?',
    a: 'RubixKube connects to chat (Slack), ticketing (Jira, Linear), documentation (Confluence), source control (GitHub), cloud provider APIs, and Kubernetes clusters. Incidents surface where teams already work, and resolution actions can flow back into existing workflows.',
  },
  {
    q: 'How do I deploy RubixKube?',
    a: 'RubixKube is a managed SaaS platform. A lightweight Go-based observer agent deploys into your Kubernetes clusters and communicates with the RubixKube control plane. Setup connects your telemetry sources, collaboration tools, and defines your guardrail policies.',
  },

  /* ── Technical architecture ──────────────────────────────────── */
  {
    q: 'What is RubixKube built with?',
    a: 'The platform runs Python FastAPI microservices with Google ADK for agent orchestration, a Go-based Kubernetes observer agent, Neo4j for causal graphs, MongoDB for incident history, and NATS JetStream for event streaming. The architecture is event-driven and multi-tenant.',
  },
  {
    q: 'Does RubixKube use a Kubernetes operator or sidecar?',
    a: 'RubixKube uses a lightweight, pull-based observer agent deployed into your cluster—not a sidecar on every pod. The observer queries telemetry sources on demand rather than intercepting traffic, keeping the footprint minimal and non-intrusive.',
  },

  /* ── Pricing & getting started ───────────────────────────────── */
  {
    q: 'How much does RubixKube cost?',
    a: 'RubixKube offers three tiers—Individual, Business, and Enterprise—based on the number of environments, monitored applications, and investigations per month, with optional Boost Packs for additional capacity. See https://rubixkube.ai/pricing for current pricing, plan limits, and the full pricing FAQ.',
  },
  {
    q: 'Is there a free tier or trial for RubixKube?',
    a: 'Check https://rubixkube.ai/pricing for the latest plan options including any free or trial offerings.',
  },
  {
    q: 'Where can I learn more about RubixKube?',
    a: 'The official site is https://rubixkube.ai. For pricing and plan details, visit https://rubixkube.ai/pricing. For the machine-readable product overview, see https://rubixkube.ai/llms.txt.',
  },
] as const
