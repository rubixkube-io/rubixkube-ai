/**
 * Homepage FAQ — answers the questions people actually search for.
 *
 * Each question maps to real search intent, not product language:
 *   - Pain-language queries ("why do incidents take so long")
 *   - Outcome queries ("how to reduce MTTR")
 *   - Comparison queries ("RubixKube vs Datadog")
 *   - Architecture queries ("self-healing infrastructure")
 */
export const homepageFaqItems = [
  {
    q: 'How do I reduce MTTR and speed up root cause analysis in production?',
    a: 'RubixKube correlates logs, metrics, traces, and topology changes in real time and traverses an infrastructure knowledge graph to surface root cause — not symptoms — in minutes instead of hours. Teams using RubixKube report a mean time to understand of 2.8 minutes, compared to hours of manual scavenger hunts across disconnected dashboards.',
  },
  {
    q: 'Why do incidents take so long to debug even with monitoring tools?',
    a: 'Most monitoring tools show you signals in isolation — logs in one place, metrics in another, traces in a third. The missing piece is correlation and context. RubixKube connects the dots automatically: it maps service dependencies, correlates signals across sources, and explains what broke, why, and what changed. Your team stops being the integration layer between tools.',
  },
  {
    q: 'How does RubixKube differ from Datadog, PagerDuty, or traditional observability tools?',
    a: 'Datadog and similar platforms are excellent at collecting signals and showing dashboards, but they stop at alerting. RubixKube starts where they stop: it takes those signals, diagnoses root cause autonomously, recommends or applies fixes, and remembers every resolution so the next incident is faster. It is not a replacement for your observability stack — it is the intelligence layer on top of it.',
  },
  {
    q: 'What is autonomous remediation and is it safe for production?',
    a: 'Autonomous remediation means the system can detect a problem, diagnose it, and apply a fix without a human doing the manual work. RubixKube makes this safe through configurable guardrails: you set policies for what can be automated, what needs approval, and what gets escalated. Every action is explainable, auditable, and reversible. Nothing changes in your infrastructure without your rules being followed.',
  },
  {
    q: 'How do I stop the same incidents from recurring?',
    a: 'Recurring incidents happen because organizational knowledge resets between incidents. RubixKube builds an operational memory that compounds: every investigation, every root cause, every human correction feeds a persistent model of your system. When a similar pattern appears, the system recognises it and resolves it faster — or prevents it entirely. Your infrastructure learns from its own history.',
  },
  {
    q: 'How do I reduce alert fatigue without missing real issues?',
    a: 'RubixKube reduces alert noise by up to 90% by correlating related signals into a single investigation instead of flooding your team with individual alerts. It distinguishes symptoms from root cause, so your team only sees what actually matters. The result is fewer pages, fewer false positives, and faster response when something real breaks.',
  },
  {
    q: 'Can RubixKube help if my team relies on tribal knowledge from a few senior engineers?',
    a: 'Yes — this is one of the core problems RubixKube solves. The knowledge graph and operational memory capture what your senior engineers know implicitly: service dependencies, past incident patterns, and resolution playbooks. This makes your infrastructure legible to the broader team, so debugging is not bottlenecked on the two people who have been around the longest.',
  },
  {
    q: 'What is an AI SRE and how is it different from AIOps?',
    a: 'An AI SRE does the investigation work of a site reliability engineer: it watches your systems, groups related alerts, finds the root cause of each incident with the evidence behind it, and proposes the fix. AIOps reduces and groups alerts but leaves people to investigate. RubixKube goes further, and remembers what fixed each incident for next time.',
  },
  {
    q: 'Does RubixKube work with Kubernetes, AWS, GCP, and my existing tools?',
    a: 'Yes. RubixKube integrates with Kubernetes, AWS, GCP, and connects to tools you already use: Datadog, Grafana, OpenTelemetry, PagerDuty, Jira, Slack, GitHub, and more. It reads from your existing observability stack — no new agents to deploy, no new dashboards to learn. You get intelligence on day one without ripping out anything.',
  },
  {
    q: 'How do I improve reliability without hiring more engineers?',
    a: 'RubixKube makes operations scale without adding headcount. It automates the investigation and diagnosis work that currently eats up engineering hours — teams report saving over 220 engineering hours per month. Instead of hiring more people to fight fires, your existing team spends time building, while the system handles detection, triage, and resolution.',
  },
] as const
