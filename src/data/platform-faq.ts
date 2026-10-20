/** Single source for platform FAQ (visible UI + FAQPage JSON-LD). */
export const platformFaqItems = [
  {
    q: 'What does RubixKube do?',
    a: 'Rubix, an AI agent, watches your infrastructure, finds the cause when something breaks, and fixes it with you. Related alerts become one incident, Rubix investigates each one into an RCA (root cause analysis), and you can ask Rubix anything about your systems.',
  },
  {
    q: 'What can RubixKube connect to?',
    a: 'Kubernetes clusters, Linux machines, AWS and Google Cloud, through a small observer that only reads. Datadog, PagerDuty, Grafana and Sentry send their alerts by webhook.',
  },
  {
    q: 'How do I know an RCA is right?',
    a: 'Every claim in an RCA cites what Rubix saw: the logs, events and changes behind it. You can open the evidence and tell Rubix whether it was right.',
  },
  {
    q: 'Can Rubix fix things?',
    a: 'Yes. Connect GitHub and Rubix opens pull requests; connect your tools and it makes the change. You choose how much it does on its own: in Observe it only reads, in Assist it asks before every change, and in Auto it makes changes and asks before anything destructive. Every change is recorded under the person who asked for it. The observers themselves only read.',
  },
  {
    q: 'What are Hubble, Kepler and Rubix CLI?',
    a: 'They are part of the same RubixKube ecosystem as the console. Hubble is on-call and paging: rosters, escalation and acknowledgements. Kepler is the desktop app: an agent that works on your own machine with your own credentials and remembers your systems. Rubix CLI lets you ask Rubix about your incidents and environments from the terminal.',
  },
  {
    q: 'How is RubixKube different from a monitoring tool?',
    a: 'Monitoring tools tell you something is wrong. RubixKube works with the alerts you already have and goes further: it finds the cause, shows the evidence, and fixes it.',
  },
] as const
