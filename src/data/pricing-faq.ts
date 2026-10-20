/** Single source for pricing FAQ (visible UI + FAQPage JSON-LD). */
export const pricingFaqItems = [
  {
    q: 'What is an investigation?',
    a: 'When something breaks, Rubix traces it back to the root cause and writes an RCA with the evidence and the fix. That is one investigation. Related alerts are grouped into one incident, so a burst of alerts is one investigation, not many.',
  },
  {
    q: 'What is an environment?',
    a: 'Each place your infrastructure runs: a Kubernetes cluster, an AWS account, a GCP project or a group of machines. Tools you connect, like Datadog or PagerDuty, do not count as environments.',
  },
  {
    q: 'What happens when I hit my investigation limit?',
    a: "On Individual, new investigations pause until next month. On Business, talk to us. If you need more every month, Enterprise sets the volume to fit.",
  },
  {
    q: 'Can I use Hubble without RubixKube?',
    a: 'Yes. Hubble works on its own for on-call and paging. With a RubixKube plan it costs half as much per seat, and every page comes with the RCA from Rubix. See the Hubble page for its own plans.',
  },
  {
    q: 'Does RubixKube change my infrastructure?',
    a: 'Only as far as you allow. Rubix reads by default. It opens pull requests and makes changes through the tools you connect, within the mode you choose: Observe, Assist or Auto.',
  },
] as const
