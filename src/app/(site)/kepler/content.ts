import {
  Eye,
  MessageSquare,
  Plug,
  Smartphone,
  SquareTerminal,
  Users,
  Workflow,
  Brain,
  type LucideIcon,
} from 'lucide-react'
import { KEPLER_DOWNLOADS_LIVE } from './launch'

export const KEPLER_SECTIONS = [
  { id: 'what', name: 'What it is' },
  { id: 'thesis', name: 'Why' },
  { id: 'features', name: 'Features' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'download', name: KEPLER_DOWNLOADS_LIVE ? 'Download' : 'Notify me' },
] as const

export const HERO = {
  title: 'The IDE for',
  titleEm: 'operators.',
  lead: 'Kepler is a desktop agent for the people who keep systems alive. It reads the logs, suggests the command, and runs it only when you say so.',
  note: 'macOS · Windows · Linux',
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
      { title: 'Chat', copy: 'Ask in plain words. Kepler reads the logs, shows the commands it ran and the evidence, then suggests the fix. You run it, or let Kepler run it. Use your own keys, or hosted models on Pro.', icon: MessageSquare },
      { title: 'A workspace, not a chat box', copy: 'A terminal, a browser and an editor in one window. You and the agent share them, inside the same workspace.', icon: SquareTerminal },
      { title: 'Memory', copy: 'Services, conventions and runbooks that you can read and edit. By day 30, Kepler knows what it had to ask on day 1.', icon: Brain },
      { title: 'Watchers', copy: 'Background checks on a deploy, a certificate or a pod count. They spend nothing until something changes, then Kepler wakes up and looks into it.', icon: Eye },
      { title: 'Connect what you use', copy: 'Skills are markdown files that teach a task, and they work with Claude Code skill folders. MCP connects your tools. The kepler CLI uses the same agent from the shell.', icon: Plug },
    ],
  },
  {
    name: 'The standing presence',
    plan: 'Pro',
    blurb: 'Kepler keeps working when you are not looking, and tells you only what matters.',
    features: [
      { title: 'See and share an incident', copy: 'War rooms put several agents on one incident, each on its own angle. Topology is a live map of your services and how they connect.', icon: Users },
      { title: 'Automations and artifacts', copy: 'Run on a schedule or a webhook, with an approval step where a person has to say yes. Each run publishes its result, like a nightly status page, as a new version.', icon: Workflow },
      { title: 'Reach it from anywhere', copy: 'Remote access to your own machine, and channels for WhatsApp, Telegram, Slack and Discord, with the same approvals. Your history and credentials stay on your machine.', icon: Smartphone },
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
