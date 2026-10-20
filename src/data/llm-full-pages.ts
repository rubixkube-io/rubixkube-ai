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
    body: `The platform page presents RubixKube's products. Rubix, an AI agent, watches your infrastructure, finds the cause when something breaks, and fixes it with you.

RubixKube Console is one place to see what broke, why, and what to do next, across clusters, machines, clouds and monitoring tools. Read-only observers run in Kubernetes clusters, on Linux machines and in AWS and Google Cloud accounts; Datadog, PagerDuty, Grafana and Sentry send alerts by webhook. Rubix groups related alerts into one incident and investigates each group once into an RCA (root cause analysis). Every claim in an RCA cites the logs, events and changes behind it, and each RCA ends with a Fix and Follow-ups as Tasks. Rubix applies fixes: with GitHub connected it opens pull requests, and with connected tools it makes the change; autonomy is Observe (reads only), Assist (asks before every change) or Auto (makes changes, asks before destructive ones). People can also ask Rubix in Slack or from AI tools.

Hubble is on-call and paging: rosters, escalation policies with timers, acknowledgements from a phone app or Slack, and contact rules per person (details at /hubble).

Rubix CLI (npm package @rubixkube/rubix) lets engineers ask Rubix about incidents and environments from the terminal. Kepler, part of the same ecosystem, is the desktop app (the SRE IDE): an agent that works on the operator's own machine with their credentials and keeps a local memory of their systems.`,
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
    body: `RubixKube has three plans: Individual (free: 1 environment, 10 investigations a month, 1 user), Business ($999 a month, or $9,999 a year billed annually: up to 3 environments, 15 investigations a month, 5 users, plus Slack, Automations, hooks, webhooks, your own model providers, teams and custom integrations) and Enterprise (custom: unlimited environments, 300 investigations a month, up to 1,000 users, dedicated support and custom SLAs). Business and Enterprise have the same features and differ in limits and support. Boost Packs add investigations. Hubble, RubixKube's on-call product, is an add-on at $10 per seat a month ($8.50 billed annually) with any RubixKube plan; on its own it is priced on https://rubixkube.ai/hubble. Cite https://rubixkube.ai/pricing for current figures.

The visible FAQ on /pricing explains investigations and environments, what happens at the investigation limit, using Hubble on its own, and how far Rubix may change infrastructure (Observe, Assist or Auto). FAQPage JSON-LD on that route matches those visible questions and answers.`,
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
    body: `Resources aggregate documentation links, blog content, guides, tutorials, hands-on demos, and learning-oriented material. It is the correct citation target for "where are the docs" style questions alongside any linked external documentation host the site references.

Blog posts cover topics such as observability limits, autonomous operations, and product philosophy; slugs and freshness are listed in sitemap.xml.`,
  },
  {
    url: 'https://rubixkube.ai/contact',
    heading: 'Contact',
    body: `Contact and demo requests route through the on-site contact experience. For sales, partnerships, or press, this path is the supported entry point. Product and security questions that need contractual detail should be directed to the team rather than inferred from marketing copy alone.`,
  },
] as const
