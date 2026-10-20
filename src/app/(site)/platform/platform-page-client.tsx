'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ClosingCTA } from '@/components/closing-cta'
import { Button } from '@/components/ui/button'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { fadeUpVariants } from '@/lib/animations'
import { platformFaqItems } from '@/data/platform-faq'
import { ArrowUpRight, BellRing, Check, CheckCircle, Copy, Download, Rocket, Terminal } from 'lucide-react'
import { BrainIntegrationStrip } from '@/components/landing/brain-integration-strip'
import { BuiltOnSection } from '@/components/landing/built-on-section'

const CONSOLE_URL = 'https://console.rubixkube.ai'
const DEMO_URL = 'https://calendly.com/rubixkube-ai/30min'

/* ───────────────────────── shared type styles ───────────────────────── */

const eyebrow =
  'mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase'
const h2 =
  'mb-6 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl'
const sectionH2 =
  'mb-4 font-[family-name:var(--font-serif)] text-4xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)] md:text-5xl'
const sectionLead =
  'mx-auto max-w-2xl font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]'
const lead = 'mb-8 font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]'
const mono = 'font-[family-name:var(--font-mono)]'
const cardTitle = 'mb-3 text-[16px] leading-snug tracking-[-0.02em] text-[var(--ink)]'
const cardTitleStyle = { fontFamily: 'var(--font-mono)', fontWeight: 500 }
const cardBody = `${mono} text-[14px] font-normal leading-[1.7] text-[var(--ink)]/60`

const reveal = {
  variants: fadeUpVariants,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true },
}

/* ───────────────────────── building blocks ───────────────────────── */

/** Browser chrome around a console screenshot, as on the rest of the site. */
function BrowserFrame({ children, shadow = 'shadow-sm' }: { children: ReactNode; shadow?: string }) {
  return (
    <div>
      <div className="rounded-t-xl border border-b-0 border-[var(--rule)] bg-[var(--background-secondary)] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
            <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
            <div className="h-3 w-3 rounded-full bg-[var(--faint)]" />
          </div>
          <div className="flex-1 rounded-md bg-[var(--bg)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
            console.rubixkube.ai
          </div>
        </div>
      </div>
      <div className={`relative overflow-hidden border border-t-0 border-[var(--rule)] ${shadow}`}>{children}</div>
    </div>
  )
}

/**
 * A console view with a light and a dark version, captured from console-next with demo data.
 * The theme CSS shows the one that matches (globals.css, .rk-only-light / .rk-only-dark).
 */
function ThemedImage({ name, w, h, alt, sizes, className = '', priority = false }: { name: string; w: number; h: number; alt: string; sizes: string; className?: string; priority?: boolean }) {
  return (
    <>
      <Image src={`/screenshots/platform/${name}-light.png`} alt={alt} width={w} height={h} sizes={sizes} className={`rk-only-light ${className}`} priority={priority} />
      <Image src={`/screenshots/platform/${name}-dark.png`} alt={alt} width={w} height={h} sizes={sizes} className={`rk-only-dark ${className}`} priority={priority} />
    </>
  )
}

/** A soft blue field with a faint dot grid for console parts to float on, as on the Hubble page. */
function Backdrop({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--background-secondary)] ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(120% 90% at 0% 0%, rgba(47,91,255,0.16), transparent 60%), radial-gradient(90% 70% at 100% 100%, rgba(47,91,255,0.10), transparent 60%), radial-gradient(color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, 14px 14px',
      }}
    >
      {children}
    </div>
  )
}

/** Fades the right and bottom edges, so a part larger than its frame ends softly. */
const fadeEdges = {
  maskImage: 'linear-gradient(to right, black 86%, transparent), linear-gradient(to bottom, black 72%, transparent)',
  maskComposite: 'intersect' as const,
  WebkitMaskImage: 'linear-gradient(to right, black 86%, transparent), linear-gradient(to bottom, black 72%, transparent)',
  WebkitMaskComposite: 'source-in',
}

/** Bottom edge only, for parts that fit the frame's width. */
const fadeBottom = {
  maskImage: 'linear-gradient(to bottom, black 72%, transparent)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent)',
}

/**
 * A console part floating on the backdrop. width is in frame widths; left and top place its
 * top-left corner, in percent of the frame.
 */
function Float({ name, w, h, alt, width, left, top }: { name: string; w: number; h: number; alt: string; width: number; left: number; top: number }) {
  return (
    <div className="absolute inset-0" style={width <= 1 ? fadeBottom : fadeEdges}>
      <div
        className="absolute overflow-hidden rounded-xl border border-[var(--rule)] shadow-[0_24px_48px_-16px_rgba(17,19,24,0.35)]"
        style={{ width: `${width * 100}%`, left: `${left}%`, top: `${top}%` }}
      >
        <ThemedImage name={name} alt={alt} w={w} h={h} sizes="(max-width: 1024px) 140vw, 1100px" className="h-auto w-full" />
      </div>
    </div>
  )
}

/** The hero: one incident from alert to fix, as four console screens: incident, RCA, Fix, Rubix. */
const HERO_FRAMES = [
  { name: 'hero-incidents', step: 'Incident opened', alt: 'The Incidents page: payments-api is crash looping, and Rubix has found the cause' },
  { name: 'hero-rca', step: 'Root cause found', alt: 'The RCA: connection exhaustion on orders-db takes down payments-api, with impact, root cause and confidence' },
  { name: 'hero-fix', step: 'Fix suggested', alt: 'The Fix task: set DB_POOL_SIZE back to 10 on orders-api, and why Rubix suggested it' },
  { name: 'hero-chat', step: 'Pull request opened', alt: 'Rubix chat: asked to fix it, Rubix opens a pull request that sets DB_POOL_SIZE back to 10' },
] as const
const HERO_STEP_MS = 3600

/**
 * Crossfades the four frames on a loop; the step row shows where it is and jumps on click.
 * With reduced motion it holds on the last frame.
 */
function HeroSequence() {
  const reduce = useReducedMotion()
  const last = HERO_FRAMES.length - 1
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const shown = reduce ? last : active

  useEffect(() => {
    if (reduce || paused) return
    const t = window.setTimeout(() => setActive((i) => (i + 1) % HERO_FRAMES.length), HERO_STEP_MS)
    return () => window.clearTimeout(t)
  }, [active, paused, reduce])

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <BrowserFrame shadow="shadow-2xl">
        <div className="relative">
          {HERO_FRAMES.map((f, i) => (
            <div
              key={f.name}
              aria-hidden={i !== shown}
              className={`transition-opacity duration-700 ease-out ${i === 0 ? 'relative' : 'absolute inset-0'} ${i === shown ? 'opacity-100' : 'opacity-0'}`}
            >
              <ThemedImage name={f.name} alt={f.alt} w={3200} h={2000} sizes="(max-width: 1920px) 100vw, 1920px" className="h-auto w-full" priority={i === 0} />
            </div>
          ))}
        </div>
      </BrowserFrame>
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4" role="tablist" aria-label="From alert to fix">
        {HERO_FRAMES.map((f, i) => (
          <button
            key={f.name}
            type="button"
            role="tab"
            aria-selected={i === shown}
            onClick={() => setActive(i)}
            className="group text-left"
          >
            <span className="mb-3 block h-px w-full overflow-hidden bg-[var(--rule)]">
              <span
                key={i === shown && !reduce && !paused ? `run-${active}` : 'still'}
                className={`block h-full bg-[var(--blue)] ${i < shown || (reduce && i === shown) ? 'w-full' : i === shown && !paused ? 'rk-hero-progress' : i === shown ? 'w-full' : 'w-0'}`}
                style={{ animationDuration: `${HERO_STEP_MS}ms` }}
              />
            </span>
            <span className={`${mono} text-[10px] tracking-[0.2em] uppercase transition-colors ${i === shown ? 'text-[var(--ink)]' : 'text-[var(--mid)] group-hover:text-[var(--ink)]'}`}>
              {String(i + 1).padStart(2, '0')} · {f.step}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Checks({ items }: { items: readonly string[] }) {
  return (
    <div className="space-y-4 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--ink)]">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue)]" strokeWidth={1.5} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

/* ───────────────────────── content ───────────────────────── */

/** What the console does for a team. No numbers: claims only. */
const OUTCOMES = [
  {
    label: 'Incidents',
    title: 'One incident per problem',
    copy: 'Related alerts are grouped as they arrive, so your team sees each problem once, with every signal attached.',
  },
  {
    label: 'Root cause',
    title: 'The cause in minutes',
    copy: 'Rubix starts the moment an incident opens, and cites the logs, events and changes behind every conclusion.',
  },
  {
    label: 'Coverage',
    title: 'Your entire stack',
    copy: 'Kubernetes, Linux machines, AWS and Google Cloud, together with alerts from Datadog, PagerDuty, Grafana and Sentry.',
  },
  {
    label: 'Resolution',
    title: 'From cause to fix',
    copy: 'Every RCA ends in a clear fix. Rubix can open the pull request or apply the change, with the access you choose.',
  },
] as const

/** How much Rubix may do without asking. */
const MODES = [
  { name: 'Observe', copy: 'Rubix reads and answers. It changes nothing.' },
  { name: 'Assist', copy: 'Rubix asks before every change.' },
  { name: 'Auto', copy: 'Rubix makes changes and asks before anything destructive.' },
] as const

/** The console, one part at a time. Each view is a crop of a full console screen. */
const PARTS = [
  {
    id: 'investigation',
    eyebrow: 'Investigation',
    title: (
      <>
        Every incident, investigated <span className="italic text-[var(--blue)]">the moment it opens.</span>
      </>
    ),
    copy: 'Rubix reads logs, events, metrics and recent changes as soon as an incident is created, and shows each step as it works. Follow along live, or open the incident to a finished answer.',
    points: ['Related alerts grouped into one incident', 'Each step visible as it happens', 'Recent changes surfaced first'],
    image: { name: 'part-investigating', w: 1520, h: 770, width: 0.88, left: 6, top: 12, alt: 'Rubix investigating an incident: checking orders-db connections, 497 of 500 in use' },
  },
  {
    id: 'root-cause',
    eyebrow: 'Root cause',
    title: (
      <>
        Root causes, <span className="italic text-[var(--blue)]">backed by evidence.</span>
      </>
    ),
    copy: 'Each RCA (root cause analysis) states the impact, the cause and how confident Rubix is, with a citation for every claim. Your team confirms or corrects it in one click, and the verdict stays with the RCA.',
    points: ['Impact, root cause and contributing factors', 'A citation for every claim', 'Right, Partly right or Wrong from your team'],
    image: { name: 'part-root-cause', w: 2360, h: 940, width: 1.3, left: 6, top: 12, alt: 'An RCA: the impact, the root cause, and Was this the cause? with Right, Partly right and Wrong' },
  },
  {
    id: 'tasks',
    eyebrow: 'Tasks',
    title: (
      <>
        Every RCA ends <span className="italic text-[var(--blue)]">in a fix.</span>
      </>
    ),
    copy: 'The fix and any follow-ups arrive as Tasks. Hand the fix to Rubix to open a pull request or apply the change, or assign it to an engineer and track it to done.',
    points: ['A Fix and Follow-ups from every RCA', 'Pull requests and changes made by Rubix', 'Owners, priority and status for every task'],
    image: { name: 'part-tasks', w: 2560, h: 830, width: 1.25, left: 6, top: 16, alt: 'Tasks that need an owner: two Fixes and a Follow-up from the RCA' },
  },
  {
    id: 'environments',
    eyebrow: 'Environments',
    title: (
      <>
        Your entire stack, <span className="italic text-[var(--blue)]">in one view.</span>
      </>
    ),
    copy: 'Connect a Kubernetes cluster, Linux machines, or an AWS or Google Cloud account with a single command. The observer is read-only. Every environment gets a live view of its health, recent changes and open incidents.',
    points: ['Kubernetes, Linux machines, AWS and Google Cloud', 'A read-only observer, installed with one command', 'Alerts from Datadog, PagerDuty, Grafana and Sentry'],
    image: { name: 'part-environment', w: 2670, h: 1040, width: 1.25, left: 6, top: 12, alt: 'An environment page: your 46 apps look healthy, with nodes, apps, pods and open incidents' },
  },
] as const

/** RubixKube's own apps, as on the console's Apps page. */
const KEPLER_URL = 'https://trykepler.rubixkube.ai'
const CLI_INSTALL = 'npm install -g @rubixkube/rubix'
const MCP_URL = 'https://mcp.rubixkube.ai/mcp'

/** One-click installs, in each tool's documented form (same links as console-next src/areas/apps/apps.ts). */
const INSTALL_LINKS = {
  // config is base64 of {"url":"https://mcp.rubixkube.ai/mcp"}
  cursor: 'cursor://anysphere.cursor-deeplink/mcp/install?name=rubixkube&config=eyJ1cmwiOiJodHRwczovL21jcC5ydWJpeGt1YmUuYWkvbWNwIn0=',
  vscode: `vscode:mcp/install?${encodeURIComponent(JSON.stringify({ name: 'rubixkube', type: 'http', url: MCP_URL }))}`,
  claude: `https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=RubixKube&connectorUrl=${encodeURIComponent(MCP_URL)}`,
}

/** A command or URL to copy, with a copy button. */
function CopyCommand({ label, command }: { label?: string; command: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(command).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    })
  }
  return (
    <div className="min-w-0">
      {label && <p className={`${mono} mb-2 text-[11px] text-[var(--mid)]`}>{label}</p>}
      <div className="flex items-center gap-3 rounded-lg border border-[var(--rule)] bg-[var(--background-secondary)] py-2.5 pr-2 pl-4">
        <code className={`${mono} min-w-0 flex-1 truncate text-[12.5px] text-[var(--ink)]`}>{command}</code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy'}
          className="shrink-0 rounded-md p-1.5 text-[var(--mid)] transition-colors hover:bg-[var(--rule)] hover:text-[var(--ink)]"
        >
          {copied ? <Check className="h-4 w-4" strokeWidth={1.75} /> : <Copy className="h-4 w-4" strokeWidth={1.75} />}
        </button>
      </div>
    </div>
  )
}

/** A product view at the top of an app card, inset like the console's Apps page. */
function AppShot({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-60 overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--background-secondary)] sm:h-72">{children}</div>
  )
}

function AppTitle({ icon, name, badge, line }: { icon: ReactNode; name: string; badge?: string; line: string }) {
  return (
    <div className="mt-6 flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--background-secondary)]">{icon}</div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-[family-name:var(--font-serif)] text-[1.75rem] leading-none font-light text-[var(--ink)]">{name}</h3>
          {badge && <span className={`${mono} rounded-md border border-[var(--rule)] px-1.5 py-0.5 text-[10px] tracking-[0.1em] text-[var(--mid)] uppercase`}>{badge}</span>}
        </div>
        <p className={`${mono} mt-2 text-[13px] font-light leading-[1.7] text-[var(--mid)]`}>{line}</p>
      </div>
    </div>
  )
}

const appCard = 'flex scroll-mt-[calc(var(--nav-stack)+2rem)] flex-col rounded-2xl border border-[var(--rule)] bg-[var(--bg)] p-5 sm:p-6'

/** AI tools that reach Rubix over RubixKube's MCP server. */
const AI_TOOLS = [
  { logo: 'cursor', name: 'Cursor', line: 'Opens Cursor and adds RubixKube.', href: INSTALL_LINKS.cursor, action: 'Add to Cursor', mono: true },
  { logo: 'vscode', name: 'VS Code', line: 'Opens VS Code and adds RubixKube for Copilot.', href: INSTALL_LINKS.vscode, action: 'Add to VS Code' },
  { logo: 'claude', name: 'Claude', line: 'Adds RubixKube as a connector in Claude on the web and desktop.', href: INSTALL_LINKS.claude, action: 'Add to Claude', web: true },
] as const

function ToolLogo({ logo, invert = false }: { logo: string; invert?: boolean }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--rule)] bg-[var(--background-secondary)]">
      <Image src={`/logos/ai/${logo}.svg`} alt="" width={20} height={20} className={`h-5 w-5 ${invert ? 'rk-mono-logo' : ''}`} />
    </div>
  )
}

/* ───────────────────────── page ───────────────────────── */

export function PlatformPageClient() {
  return (
    <>
      <Navbar />

      {/* Hero: the whole console, then the page zooms in on its parts */}
      <section className="relative bg-[var(--bg)] pb-24 sm:pb-32">
        <div className="rk-landing-max relative z-10 w-full px-[var(--pad)] pt-[calc(var(--nav-stack)+3.5rem)] pb-12 text-center">
          <motion.div className="mx-auto max-w-4xl" variants={fadeUpVariants} initial="hidden" animate="visible">
            <motion.div variants={fadeUpVariants}>
              <span className="mb-6 inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase">
                RubixKube Console
              </span>
            </motion.div>

            <motion.h1
              className="mb-8 font-[family-name:var(--font-serif)] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]"
              variants={fadeUpVariants}
            >
              From alert to fix,
              <br />
              <span className="italic text-[var(--blue)]">in minutes.</span>
            </motion.h1>

            <motion.p
              className="mx-auto max-w-[58ch] font-[family-name:var(--font-mono)] text-[15px] font-light leading-relaxed text-[var(--mid)]"
              variants={fadeUpVariants}
            >
              RubixKube watches your infrastructure. When something breaks, Rubix finds the cause and ships the fix with you.
            </motion.p>

            <motion.div variants={fadeUpVariants} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary">
                <Link href={CONSOLE_URL} target="_blank" rel="noopener noreferrer">
                  Start Free
                  <Rocket className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button asChild variant="outline" className={outlineBlueAccentMd}>
                <Link href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                  Book a Demo
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto w-full px-[var(--pad)]"
          style={{ maxWidth: 'min(100%, 120rem)' }}
        >
          <HeroSequence />
        </motion.div>
      </section>

      <BuiltOnSection />

      {/* Rubix: the agent people work with */}
      <section id="rubix" className="scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
            <motion.div {...reveal}>
              <span className={eyebrow}>Rubix</span>
              <h2 className={h2}>
                Ask Rubix anything about <span className="italic text-[var(--blue)]">your infrastructure.</span>
              </h2>
              <p className={lead}>
                Rubix knows your environments, your incidents and what changed. Ask in plain language and it runs the checks, shows its work and answers with evidence. When there is a fix, it opens the pull request or makes the change, within the access you give it.
              </p>
              <Checks items={['Grounded in your live environments and history', 'Every step visible as it works', 'Pull requests and changes, with your approval', 'Every action recorded under the person who asked']} />
            </motion.div>
            <motion.div {...reveal}>
              <BrowserFrame>
                <ThemedImage
                  name="rubix-home"
                  alt="Rubix in the console: Good afternoon, Maya. One incident is open and Rubix is on it, with what Rubix noticed below"
                  w={3200}
                  h={2000}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="h-auto w-full"
                />
              </BrowserFrame>
            </motion.div>
          </div>

          <motion.div {...reveal} className="mt-16 grid items-center gap-10 rounded-2xl border border-[var(--rule)] p-8 sm:p-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div>
              <h3 className="mb-3 font-[family-name:var(--font-serif)] text-3xl font-light leading-[1.1] text-[var(--ink)] md:text-4xl">
                Set how far <span className="italic text-[var(--blue)]">it goes.</span>
              </h3>
              <p className={`${mono} mb-8 text-[13px] font-light leading-relaxed text-[var(--mid)]`}>
                Choose how much Rubix does on its own. In Assist it stops before every change and waits for a yes.
              </p>
              <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                {MODES.map((m) => (
                  <div key={m.name} className="grid grid-cols-[88px_1fr] gap-4 py-4">
                    <p className={`${mono} pt-0.5 text-[10px] tracking-[0.2em] text-[var(--blue)] uppercase`}>{m.name}</p>
                    <p className={`${mono} text-[13px] font-light leading-relaxed text-[var(--ink)]`}>{m.copy}</p>
                  </div>
                ))}
              </div>
            </div>
            <Backdrop className="h-[300px] sm:h-[380px]">
              <div className="absolute inset-0" style={fadeBottom}>
                <div className="absolute top-[12%] right-[7%] left-[7%] overflow-hidden rounded-xl border border-[var(--rule)] shadow-[0_24px_48px_-16px_rgba(17,19,24,0.35)]">
                  <ThemedImage
                    name="part-approval"
                    alt="In Assist, Rubix asks before it opens a pull request: Approve, Allow in this chat, or Deny"
                    w={1408}
                    h={840}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </Backdrop>
          </motion.div>
        </div>
      </section>

      {/* Outcomes */}
      <section id="console" className="scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="mb-16 text-center">
            <span className={eyebrow}>RubixKube Console</span>
            <h2 className={sectionH2}>
              Built for the moment <span className="italic text-[var(--blue)]">something breaks.</span>
            </h2>
            <p className={sectionLead}>Alerts from your observers and monitoring tools arrive as incidents. Each one is investigated, explained and resolved in one place.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.label}
                {...reveal}
                custom={i}
                className="flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--bg)] p-10 transition-shadow hover:shadow-md"
              >
                <span className={`${mono} mb-6 text-[10px] tracking-[0.2em] text-[var(--blue)] uppercase`}>{o.label}</span>
                <h3 className={cardTitle} style={cardTitleStyle}>
                  {o.title}
                </h3>
                <p className={cardBody}>{o.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The console, one part at a time */}
      {PARTS.map((part, i) => {
        const imageFirst = i % 2 === 0
        return (
          <section
            key={part.id}
            id={part.id}
            className={`scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32`}
          >
            <div className="rk-landing-max px-[var(--pad)]">
              <div className={`grid items-center gap-12 lg:gap-20 ${imageFirst ? 'lg:grid-cols-[3fr_2fr]' : 'lg:grid-cols-[2fr_3fr]'}`}>
                <motion.div {...reveal} className={imageFirst ? 'order-2 lg:order-1' : 'order-2'}>
                  <Backdrop className="h-[300px] sm:h-[420px] lg:h-[480px]">
                    <Float {...part.image} />
                  </Backdrop>
                </motion.div>
                <motion.div {...reveal} className={imageFirst ? 'order-1 lg:order-2' : 'order-1'}>
                  <span className={eyebrow}>{part.eyebrow}</span>
                  <h2 className={h2}>{part.title}</h2>
                  <p className={lead}>{part.copy}</p>
                  <Checks items={part.points} />
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

      {/* RubixKube's apps and AI tools: where else Rubix works */}
      <section id="ecosystem" className="scroll-mt-[var(--nav-stack)] border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="mb-16 text-center">
            <span className={eyebrow}>Apps</span>
            <h2 className={sectionH2}>
              Rubix, wherever <span className="italic text-[var(--blue)]">your team works.</span>
            </h2>
            <p className={sectionLead}>Built by RubixKube for the people who keep systems running. Each one signs in with your RubixKube account.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Hubble */}
            <motion.div {...reveal} id="hubble" className={appCard}>
              <AppShot>
                <div className="absolute top-6 left-[24%] w-[125%] overflow-hidden rounded-lg border border-[var(--rule)] shadow-sm">
                  <ThemedImage name="hubble-oncall" alt="Hubble On call page: who is on call for each service, and the next handoffs" w={2880} h={1800} sizes="(max-width: 1024px) 120vw, 40vw" className="h-auto w-full" />
                </div>
                <div className="absolute top-10 left-6 w-[28%] max-w-[140px] drop-shadow-[0_18px_28px_rgba(17,19,24,0.28)]">
                  <ThemedImage name="hubble-phone" alt="Hubble phone app: an incident waiting for acknowledgement" w={780} h={1640} sizes="140px" className="h-auto w-full" />
                </div>
              </AppShot>
              <AppTitle
                icon={<BellRing className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />}
                name="Hubble"
                line="On-call and paging. Rotations, escalation and paging on the web and on your phone, until someone acknowledges."
              />
              <div className="mt-auto flex items-center gap-4 pt-8">
                <Button asChild variant="outline" className={outlineBlueAccentMd}>
                  <Link href="/hubble">Explore Hubble</Link>
                </Button>
                <span className={`${mono} text-[11px] text-[var(--mid)]`}>Web, iOS and Android</span>
              </div>
            </motion.div>

            {/* Kepler */}
            <motion.div {...reveal} id="kepler" className={appCard}>
              <AppShot>
                <Image src="/screenshots/kepler.png" alt="Kepler, the SRE IDE by RubixKube" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
              </AppShot>
              <AppTitle
                icon={<Image src="/logos/ai/kepler.webp" alt="" width={44} height={44} className="h-full w-full" />}
                name="Kepler"
                badge="Beta"
                line="The SRE IDE. Chat, terminal and browser in one desktop app, with RubixKube and your environments a click away."
              />
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
                <Button asChild variant="primary">
                  <Link href={KEPLER_URL} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    Download Kepler
                  </Link>
                </Button>
                <span className={`${mono} text-[11px] text-[var(--mid)]`}>macOS, Windows and Linux</span>
              </div>
            </motion.div>

            {/* Rubix CLI */}
            <motion.div {...reveal} id="cli" className={appCard}>
              <AppShot>
                <div className="absolute top-6 left-6 w-[118%] overflow-hidden rounded-lg">
                  {/* the capture carries its own window and margin; crop to the terminal */}
                  <Image src="/screenshots/rubix-cli.png" alt="Rubix CLI in a terminal" width={2012} height={1876} sizes="(max-width: 1024px) 120vw, 40vw" className="-my-[5%] h-auto w-[112%] max-w-none -translate-x-[5.4%]" />
                </div>
              </AppShot>
              <AppTitle
                icon={<Terminal className="h-5 w-5 text-[var(--blue)]" strokeWidth={1.5} />}
                name="Rubix CLI"
                line="Chat with Rubix from your terminal. Needs Node.js 18 or later."
              />
              <div className="mt-auto pt-8">
                <CopyCommand label="Install" command={CLI_INSTALL} />
              </div>
            </motion.div>
          </div>

          {/* AI tools */}
          <div className="mt-20">
            <div className="mb-8 max-w-3xl">
              <h3 className="mb-3 font-[family-name:var(--font-serif)] text-3xl font-light leading-[1.1] text-[var(--ink)]">
                In the AI tools <span className="italic text-[var(--blue)]">you already use.</span>
              </h3>
              <p className={`${mono} text-[14px] font-light leading-relaxed text-[var(--mid)]`}>
                Check how your environments are doing, see open incidents and Tasks, start an investigation or read an RCA, from your editor or assistant.
              </p>
            </div>
            <motion.div {...reveal} className="divide-y divide-[var(--rule)] overflow-hidden rounded-2xl border border-[var(--rule)]">
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-4">
                  <ToolLogo logo="claudecode" />
                  <div>
                    <p className={`${mono} text-[14px] font-medium text-[var(--ink)]`}>Claude Code</p>
                    <p className={`${mono} text-[13px] font-light text-[var(--mid)]`}>RubixKube&apos;s plugin, with skills for status, incidents and RCAs.</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <CopyCommand label="Add RubixKube's plugins" command="/plugin marketplace add rubixkube-io/rubixkube-for-ai" />
                  <CopyCommand label="Install" command="/plugin install rubixkube@rubixkube" />
                </div>
              </div>
              {AI_TOOLS.map((t) => (
                <div key={t.name} className="flex flex-wrap items-center gap-4 p-6">
                  <ToolLogo logo={t.logo} invert={'mono' in t} />
                  <div className="min-w-0 flex-1">
                    <p className={`${mono} text-[14px] font-medium text-[var(--ink)]`}>{t.name}</p>
                    <p className={`${mono} text-[13px] font-light text-[var(--mid)]`}>{t.line}</p>
                  </div>
                  <Button asChild variant="outline" className={outlineBlueAccentMd}>
                    <a href={t.href} {...('web' in t ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {t.action}
                      {'web' in t && <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />}
                    </a>
                  </Button>
                </div>
              ))}
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-4">
                  <ToolLogo logo="mcp" invert />
                  <div>
                    <p className={`${mono} text-[14px] font-medium text-[var(--ink)]`}>Any other MCP client</p>
                    <p className={`${mono} text-[13px] font-light text-[var(--mid)]`}>Add this server, and sign in when it asks.</p>
                  </div>
                </div>
                <CopyCommand command={MCP_URL} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="mb-16 text-center">
            <span className={eyebrow}>Integrations</span>
            <h2 className={sectionH2}>
              Works with the stack <span className="italic text-[var(--blue)]">you already run.</span>
            </h2>
            <p className={sectionLead}>Alerts arrive from the monitoring tools you already use. Rubix is available in Slack and in your AI tools over MCP.</p>
          </div>
          <div className="w-full">
            <BrainIntegrationStrip hideHeader />
          </div>
        </div>
      </section>

      {/* FAQ: the same items as the FAQPage JSON-LD in page.tsx */}
      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-[80px]">
            <motion.div {...reveal}>
              <span className={`${mono} text-[10px] tracking-[0.2em] text-[var(--mid)] uppercase`}>Questions</span>
              <h2 className="mt-4 font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,4rem)] leading-[1.1] font-light tracking-[-0.01em] text-[var(--ink)]">
                Frequently <span className="italic text-[var(--blue)]">asked.</span>
              </h2>
            </motion.div>
            <div>
              {platformFaqItems.map((item, i) => (
                <motion.div key={item.q} {...reveal} className={`py-8 ${i !== 0 ? 'border-t border-[var(--rule)]' : ''}`}>
                  <h3 className="mb-3 font-[family-name:var(--font-serif)] text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.2] font-light text-[var(--ink)]">
                    {item.q}
                  </h3>
                  <p className={`${mono} text-[13px] font-light leading-relaxed text-[var(--mid)]`}>{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA headline="See RubixKube on your own systems" subline="Book a 30-minute walkthrough with our team." />

      <Footer />
    </>
  )
}
