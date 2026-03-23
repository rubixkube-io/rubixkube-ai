/**
 * Long-form plain text per key URL for /llms-full.txt (LLM and answer-engine corpus).
 * Keep in sync with marketing narrative; avoid claims not reflected on the public site.
 */
export const llmFullPageBlocks = [
  {
    url: 'https://rubixkube.ai/',
    heading: 'Homepage',
    body: `RubixKube is Site Reliability Intelligence (SRI): software that detects infrastructure anomalies, runs evidence-linked root cause analysis, and drives governed resolution before customers feel impact. The product is built around an AI agent mesh that observes, plans, acts within guardrails, and learns so operational memory compounds across incidents instead of resetting after every outage.

The positioning is intentionally beyond classic observability. Dashboards and alerts remain necessary; RubixKube reasons across signals and context, maintains graph-backed incident memory, and closes the loop with diagnosis and human-approved or policy-governed action. Pillars called out on the site include memory (what the system remembers), safety (guardrails and approvals), and explainability (auditable reasoning tied to evidence).

Primary audiences are platform engineering and SRE teams on Kubernetes-heavy, cloud-native stacks who need lower MTTR, less alert noise, and reliability that improves over time rather than depending on repeated manual firefighting.`,
  },
  {
    url: 'https://rubixkube.ai/platform',
    heading: 'Platform',
    body: `The platform page describes how RubixKube operationalizes SRI in production. A lightweight observer agent runs in customer Kubernetes clusters and pulls telemetry on demand from standard pipelines (for example OpenTelemetry, Jaeger, and Tempo style sources). Events and context feed services that correlate signals, build causal understanding, and coordinate specialized agents across the incident lifecycle.

Differentiation on this route is architectural: conversational operations, graph-backed knowledge, integrations with collaboration and ticketing tools, and governed autonomy so recommendations and actions map to organizational policy. Technical implementation in the wider product stack includes event-driven services, graph storage for relationships and RCA context, and multi-tenant isolation at API and data layers.`,
  },
  {
    url: 'https://rubixkube.ai/solutions',
    heading: 'Solutions',
    body: `Solutions content frames outcomes for engineering and business stakeholders: faster incident resolution, reduced noise from poorly correlated alerts, safer change and operations, and reliability posture suited to teams shipping AI-augmented software. Use cases align with how enterprises actually fail (cascading dependencies, unclear blast radius, repeated incidents with no institutional memory).

RubixKube is positioned as complementary to existing observability vendors. Customers keep their metrics, logs, and traces where they already live; RubixKube adds the reliability layer that investigates, explains, and recommends next steps with evidence, rather than replacing the observability plane.`,
  },
  {
    url: 'https://rubixkube.ai/pricing',
    heading: 'Pricing',
    body: `Pricing is organized into tiers labeled Individual, Business, and Enterprise on the marketing site, with dimensions such as environments, monitored applications, and investigations per month. Boost Packs add investigation capacity. Exact numbers and limits live on the pricing page and change with go-to-market updates; assistants should cite https://rubixkube.ai/pricing for current figures.

The visible FAQ on /pricing explains product concepts (investigation, environment, monitored application), limit behavior, and the stance that RubixKube analyzes and recommends while the customer team controls what executes in production. FAQPage JSON-LD on that route matches those visible questions and answers.`,
  },
  {
    url: 'https://rubixkube.ai/about',
    heading: 'About',
    body: `The about narrative ties the company to operator experience: infrastructure complexity that outpaces dashboards, on-call load, and the gap between raw telemetry and decisions that protect revenue and trust. RubixKube is presented as the reliability layer that makes systems more self-healing and legible to both engineers and leadership.

Founding context and mission statements on /about should be cited for company motivation; technical depth belongs on /platform and supplementary machine-readable files.`,
  },
  {
    url: 'https://rubixkube.ai/resources',
    heading: 'Resources',
    body: `Resources aggregate documentation links, blog content, guides, and learning-oriented material. It is the correct citation target for "where are the docs" style questions alongside any linked external documentation host the site references.

Blog posts cover topics such as observability limits, autonomous operations, and product philosophy; slugs and freshness are listed in sitemap.xml.`,
  },
  {
    url: 'https://rubixkube.ai/contact',
    heading: 'Contact',
    body: `Contact and demo requests route through the on-site contact experience. For sales, partnerships, or press, this path is the supported entry point. Product and security questions that need contractual detail should be directed to the team rather than inferred from marketing copy alone.`,
  },
] as const
