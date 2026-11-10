import {
  BookOpen,
  Code2,
  Eye,
  FileText,
  Globe,
  MessageSquare,
  Network,
  Plug,
  Radio,
  Smartphone,
  SquareTerminal,
  TerminalSquare,
  Users,
  Workflow,
  Brain,
  type LucideIcon,
} from 'lucide-react'

export const KEPLER_SECTIONS = [
  { id: 'what', name: 'What it is' },
  { id: 'thesis', name: 'Why' },
  { id: 'features', name: 'Features' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'download', name: 'Download' },
] as const

export const HERO = {
  title: 'The IDE for operators.',
  lead: 'Kepler is a desktop agent for the people who keep systems alive. It runs the commands, reads the logs and remembers what broke last time.',
  note: 'Open beta · macOS · Windows · Linux',
}

export const THESIS = {
  label: 'Why',
  heading: 'Developers got their agent first.',
  headingEm: 'Operators did not.',
  paragraphs: [
    'A coding agent works because the repo holds still. Everything it needs is in files it can read, and everything it does shows up as a diff.',
    'Operations has neither. The system is live, what you know is spread across people and dashboards, and a command can do more than you expect.',
    'Kepler gives operators the two things they never got for free. A memory that grows with every incident, and a presence that watches for you and speaks up when something moves.',
  ],
  points: [
    { title: 'It remembers', copy: 'Your services, how they connect, what broke last month and how you fixed it. Every session makes the next one shorter.' },
    { title: 'It keeps watch', copy: 'Point it at a deploy, a certificate or a pod count. When something changes, it looks into it and tells you.' },
    { title: 'It asks before it acts', copy: 'Kepler suggests and you run the command. Delete, scale and restart stay blocked, whatever the settings say.' },
  ],
}

export type KeplerFeature = { title: string; copy: string; icon: LucideIcon }

export const FEATURE_GROUPS: readonly { name: string; plan: string; blurb: string; features: readonly KeplerFeature[] }[] = [
  {
    name: 'The careful colleague',
    plan: 'Free',
    blurb: 'Ask it what is going on. It looks, shows you what it ran, and suggests what to do.',
    features: [
      { title: 'Chat', copy: 'Ask in plain words. Kepler runs the commands and shows what it ran before it says what it thinks. Use our hosted models or your own keys.', icon: MessageSquare },
      { title: 'Terminal', copy: 'A terminal that you and the agent share, inside the same workspace.', icon: SquareTerminal },
      { title: 'Browser', copy: 'Dashboards open next to the conversation, so the agent reads what you read.', icon: Globe },
      { title: 'Editor', copy: 'A file tree and editor in the same workspace the agent works in.', icon: Code2 },
      { title: 'Memory', copy: 'Services, conventions and runbooks that you can read and edit. Day 30 Kepler knows what Day 1 had to ask.', icon: Brain },
      { title: 'Skills', copy: 'Markdown files that teach Kepler a task. They load when needed and work with Claude Code skill folders.', icon: BookOpen },
      { title: 'MCP', copy: 'Connect the tools you already use. Large servers do not flood the conversation.', icon: Plug },
      { title: 'CLI', copy: 'The kepler command uses the same agent and sessions, for when you stay in the shell.', icon: TerminalSquare },
      { title: 'Watchers', copy: 'Cheap background checks on a deploy, a certificate or a pod count. They cost nothing until something changes.', icon: Eye },
    ],
  },
  {
    name: 'The standing presence',
    plan: 'Pro',
    blurb: 'Kepler keeps working when you are not looking, and tells you only what is worth it.',
    features: [
      { title: 'War rooms', copy: 'Put several agents on one incident. Each takes its own angle and reports back in one place.', icon: Users },
      { title: 'Topology', copy: 'A live map of your services and how they connect, built from what Kepler learns.', icon: Network },
      { title: 'Automations', copy: 'Run on a schedule or a webhook, with an approval step wherever a person has to say yes.', icon: Workflow },
      { title: 'Remote access', copy: 'Reach your own machine from anywhere. Your history and credentials stay on it.', icon: Smartphone },
      { title: 'Channels', copy: 'Talk to Kepler from WhatsApp, Telegram, Slack or Discord, with the same approvals.', icon: Radio },
      { title: 'Artifacts', copy: 'An automation publishes its result under a stable name, like a nightly status page. Each run adds a version.', icon: FileText },
    ],
  },
]

export const FOUNDER = {
  label: 'From the founder',
  body: 'I have spent most of my working life keeping other people’s systems alive. Coding agents got a perfect world for free. The rest of us got dashboards at 3am. Kepler is my attempt at the other half: an agent that learns your systems like a good colleague, and asks before it touches anything.',
  linkLabel: 'Why we built it',
  href: '/blog/kepler-a-tool-for-the-operator',
  signature: 'Priyank, founder',
}

export const SHOTS = {
  hero: { src: '/screenshots/kepler/cover-window.png', w: 1600, h: 1000 },
  workspace: { src: '/screenshots/kepler/workspace.png', w: 2000, h: 1254 },
} as const
