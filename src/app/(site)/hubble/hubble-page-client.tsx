'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { BillingToggle } from '@/components/ui/billing-toggle'
import { CALENDLY_DEMO_URL } from '@/lib/calendly-demo-url'
import { fadeUpVariants, staggerContainer } from '@/lib/animations'
import { outlineBlueAccentMd } from '@/lib/outline-blue-cta'
import { siteButton, siteButtonCalendly, siteLink, siteLinkArrow } from '@/lib/site-ui'
import { cn } from '@/lib/utils'
import { ArrowRight, BellRing, CheckCircle, Mail, MessageSquare, Smartphone } from 'lucide-react'

const HUBBLE_APP_URL = 'https://oncall.rubixkube.ai'

const INCIDENT = 'Checkout error rate is high'

/**
 * Product views. Parts of the web screens (transparent PNGs at 3x) and the phones (390x820 at 3x).
 * Source: rk-mvp/planning/hubble/product-mock/screens.html. Replace with real captures once
 * the product is live.
 */
const SHOTS = {
  hero: { src: '/screenshots/hubble/hero.png', w: 1920, h: 1536 },
  needsYou: { src: '/screenshots/hubble/part-needs-you.png', w: 2700, h: 267 },
  incidents: { src: '/screenshots/hubble/part-incidents.png', w: 2700, h: 735 },
  onCallNow: { src: '/screenshots/hubble/part-on-call-now.png', w: 2700, h: 816 },
  handoffs: { src: '/screenshots/hubble/part-handoffs.png', w: 2700, h: 450 },
  phoneMyPages: { src: '/screenshots/hubble/phone-my-pages.png', w: 1170, h: 2460 },
  phoneIncident: { src: '/screenshots/hubble/phone-incident.png', w: 1170, h: 2460 },
} as const

type Shot = (typeof SHOTS)[keyof typeof SHOTS]

/* ───────────────────────── shared type styles ───────────────────────── */

const label =
  'mb-6 inline-block font-[family-name:var(--font-mono)] text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase'
const h2 = 'rk-section-title mt-0 mb-6 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] text-[var(--ink)]'
const lead = 'rk-section-body m-0 max-w-[44ch] text-[var(--mid)]'
const mono = 'font-[family-name:var(--font-mono)]'
const sans = 'font-[family-name:var(--font-figtree)]'

const reveal = {
  variants: fadeUpVariants,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, amount: 0.3 },
}

/* ───────────────────────── product views ───────────────────────── */

/** A soft blue field with a faint dot grid, for product views to float on. */
function Backdrop({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-[var(--background-secondary)] ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(120% 90% at 0% 0%, rgba(47,91,255,0.16), transparent 60%), radial-gradient(90% 70% at 100% 100%, rgba(47,91,255,0.10), transparent 60%), radial-gradient(rgba(17,19,24,0.07) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, 14px 14px',
      }}
    >
      {children}
    </div>
  )
}

/** Fades the right and bottom edges, so a view larger than its frame ends softly. */
const fadeEdges = {
  maskImage: 'linear-gradient(to right, black 86%, transparent), linear-gradient(to bottom, black 72%, transparent)',
  maskComposite: 'intersect' as const,
  WebkitMaskImage: 'linear-gradient(to right, black 86%, transparent), linear-gradient(to bottom, black 72%, transparent)',
  WebkitMaskComposite: 'source-in',
}

/** Bottom edge only, for drawn cards that fit the frame's width. */
const fadeBottom = {
  maskImage: 'linear-gradient(to bottom, black 72%, transparent)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent)',
}

/**
 * A part of a product screen, larger than its frame. width is in frame widths;
 * left and top place its top-left corner, in percent of the frame.
 */
function Float({
  shot,
  alt,
  width,
  left,
  top,
  fits = false,
}: {
  shot: Shot
  alt: string
  width: number
  left: number
  top: number
  /** the view fits the frame's width: fade the bottom only */
  fits?: boolean
}) {
  return (
    <div className="absolute inset-0" style={fits ? fadeBottom : fadeEdges}>
      <Image
        src={shot.src}
        alt={alt}
        width={shot.w}
        height={shot.h}
        sizes="(max-width: 768px) 200vw, 1200px"
        className="absolute h-auto max-w-none drop-shadow-[0_18px_36px_rgba(17,19,24,0.18)]"
        style={{ width: `${width * 100}%`, left: `${left}%`, top: `${top}%` }}
      />
    </div>
  )
}

/** A drawn card floating on the backdrop, like the product parts. */
function FloatCard({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0" style={fadeBottom}>
      <div className="absolute top-[12%] right-[7%] left-[7%] drop-shadow-[0_18px_36px_rgba(17,19,24,0.14)]">{children}</div>
    </div>
  )
}

function PhonePair() {
  return (
    <Backdrop className="h-[440px] rounded-3xl border border-[var(--rule)] sm:h-[520px]">
      <Image
        src={SHOTS.phoneMyPages.src}
        alt="Hubble phone app: My pages, with open incidents and the on-call roster"
        width={SHOTS.phoneMyPages.w}
        height={SHOTS.phoneMyPages.h}
        sizes="320px"
        className="absolute top-[-17%] left-[9%] w-[40%] drop-shadow-[0_24px_40px_rgba(17,19,24,0.22)]"
      />
      <Image
        src={SHOTS.phoneIncident.src}
        alt="Hubble phone app: an incident with Acknowledge, Resolve and Escalate"
        width={SHOTS.phoneIncident.w}
        height={SHOTS.phoneIncident.h}
        sizes="320px"
        className="absolute top-[-30%] right-[9%] w-[40%] drop-shadow-[0_24px_40px_rgba(17,19,24,0.28)]"
      />
    </Backdrop>
  )
}

/* ───────────────────────── drawn views (no screen yet) ───────────────────────── */

const card = 'rounded-2xl border border-[var(--rule)] bg-[var(--bg)] p-6 sm:p-8'
const cardLabel = `${mono} mb-6 text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase`

function ContactRules() {
  const rules = [
    { urgency: 'High urgency', steps: [{ icon: Smartphone, text: 'Push, right away' }, { icon: Mail, text: 'Email after 2 min' }] },
    { urgency: 'Low urgency', steps: [{ icon: BellRing, text: 'In-app, right away' }, { icon: Mail, text: 'Email after 30 min' }] },
  ]
  return (
    <div className={card}>
      <p className={cardLabel}>Contact rules</p>
      <div className="space-y-6">
        {rules.map((r) => (
          <div key={r.urgency}>
            <p className={`${sans} mb-3 text-[14px] font-medium text-[var(--ink)]`}>{r.urgency}</p>
            <ol className="space-y-2">
              {r.steps.map((st) => (
                <li key={st.text} className={`${sans} flex items-center gap-3 text-[14px] text-[var(--mid)]`}>
                  <st.icon className="h-4 w-4 text-[var(--ink)]" strokeWidth={1.5} />
                  {st.text}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  )
}

const LEVELS = [
  { level: 'Level 1', who: 'Primary', wait: '5 min' },
  { level: 'Level 2', who: 'Secondary', wait: '10 min' },
  { level: 'Level 3', who: 'Team lead', wait: 'Repeat twice' },
]

function EscalationLevels() {
  return (
    <div className={card}>
      <p className={cardLabel}>Escalation policy · Checkout</p>
      <ol className="space-y-3">
        {LEVELS.map((l) => (
          <li key={l.level} className="flex items-center justify-between gap-3 rounded-md border border-[var(--rule)] bg-[var(--background-secondary)] px-4 py-3 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <span className={`${mono} text-[12px] tracking-[0.15em] text-[var(--mid)] uppercase`}>{l.level}</span>
              <span className={`${sans} text-[14px] font-medium text-[var(--ink)]`}>{l.who}</span>
            </div>
            <span className={`${sans} text-[14px] text-[var(--mid)]`}>{l.wait}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function SlackThread() {
  return (
    <div className={card}>
      <p className={`${mono} mb-6 flex items-center gap-2 text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase`}>
        <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} /> #checkout
      </p>
      <div className="space-y-5">
        <div>
          <p className={`${sans} text-[14px] font-medium text-[var(--ink)]`}>
            Sam <span className={`${mono} text-[12px] font-normal text-[var(--text-muted)]`}>10:01</span>
          </p>
          <p className={`${mono} mt-1 text-[13px] font-light text-[var(--ink)]`}>/oncall who</p>
        </div>
        <div className="border-l-2 border-[var(--faint)] pl-4">
          <p className={`${sans} text-[14px] font-medium text-[var(--ink)]`}>
            Hubble <span className={`${mono} text-[12px] font-normal text-[var(--text-muted)]`}>10:01</span>
          </p>
          <p className={`${sans} mt-1 text-[14px] text-[var(--ink)]`}>Checkout: Ada Lovelace, until Wed 9:00 AM.</p>
        </div>
        <div className="border-l-2 border-[var(--faint)] pl-4">
          <p className={`${sans} text-[14px] font-medium text-[var(--ink)]`}>
            Hubble <span className={`${mono} text-[12px] font-normal text-[var(--text-muted)]`}>10:02</span>
          </p>
          <p className={`${sans} mt-1 text-[14px] text-[var(--ink)]`}>INC-4F21 {INCIDENT}. Paged Ada Lovelace.</p>
          <div className={`${sans} mt-3 inline-block rounded-md border border-[var(--rule)] px-3 py-1.5 text-[13px] font-medium text-[var(--ink)]`}>
            Acknowledge
          </div>
        </div>
      </div>
    </div>
  )
}

function UpgradePath() {
  return (
    // vertical on phones, horizontal from sm up
    <div className={`${card} flex flex-col items-center gap-3 sm:flex-row sm:gap-4`}>
      <span className={`${sans} rounded-md bg-[var(--ink)]/[0.06] px-3 py-2 text-[14px] font-medium text-[var(--ink)]`}>Hubble</span>
      <span className="h-8 w-px bg-[var(--faint)] sm:h-px sm:w-auto sm:flex-1" />
      <span className={`${sans} flex items-center gap-2 rounded-md border border-[var(--rule)] bg-[var(--background-secondary)] px-3 py-2 text-[14px] font-medium whitespace-nowrap text-[var(--ink)]`}>
        Hubble with
        <Image src="/light-logo.svg" alt="RubixKube" width={1720} height={200} className="rk-only-light h-[10px] w-auto" />
        <Image src="/dark-logo.svg" alt="RubixKube" width={1720} height={200} className="rk-only-dark h-[10px] w-auto" />
      </span>
    </div>
  )
}

/* ───────────────────────── pricing ───────────────────────── */

const PLANS = [
  {
    name: 'Hubble',
    price: { monthly: '$20', annual: '$17' },
    unit: { monthly: 'per seat, per month', annual: 'per seat, per month, billed annually' },
    recommended: false,
    includes: [
      'Rosters with rotations, layers and overrides',
      'Escalation policies with timers',
      'Acknowledgements',
      'Contact rules per person',
      'Phone app',
      'Slack',
    ],
  },
  {
    name: 'Hubble with RubixKube',
    price: { monthly: '$10', annual: '$8.50' },
    unit: {
      monthly: 'per seat, per month, with a RubixKube plan',
      annual: 'per seat, per month, billed annually, with a RubixKube plan',
    },
    recommended: true,
    includes: [
      '**Everything in Hubble, at half the price**',
      'Automatic analysis and RCA reports on every incident',
      'Suggested fixes from Rubix',
      'One sign-in and one team for both',
    ],
  },
  {
    name: 'Enterprise',
    price: { monthly: 'Custom', annual: 'Custom' },
    unit: { monthly: 'annual contract', annual: 'annual contract' },
    recommended: false,
    includes: ['Everything in Hubble with RubixKube', 'RBAC & SSO', 'Dedicated support & custom SLAs', 'Custom integrations & onboarding'],
  },
] as const

function Includes({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => {
        const strong = item.startsWith('**')
        return (
          <li key={item} className={`${sans} flex items-start gap-3 text-[15px] leading-[1.5] ${strong ? 'font-medium text-[var(--ink)]' : 'text-[var(--mid)]'}`}>
            <CheckCircle className="mt-[3px] h-4 w-4 shrink-0 text-[var(--ink)]" strokeWidth={1.5} />
            <span>{item.replaceAll('**', '')}</span>
          </li>
        )
      })}
    </ul>
  )
}

/** No direct payment: every plan's button books a call. The recommended plan has the one solid button. */
function PlanButton({ recommended }: { recommended: boolean }) {
  return recommended ? (
    <CalendlyBooking url={CALENDLY_DEMO_URL} className={cn(siteButtonCalendly, '!w-full')}>
      Contact us
    </CalendlyBooking>
  ) : (
    <CalendlyBooking url={CALENDLY_DEMO_URL} variant="outline" className={cn('h-12 w-full', outlineBlueAccentMd)}>
      Contact us
    </CalendlyBooking>
  )
}

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const billing = isAnnual ? 'annual' : 'monthly'
  return (
    <section id="pricing" className="scroll-mt-[calc(var(--nav-stack)+4rem)] border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
      <div className="rk-landing-max px-[var(--pad)]">
        <motion.div {...reveal} className="mb-16">
          <span className={label}>Pricing</span>
          <h2 className={h2}>
            Simple, per-seat <em>pricing.</em>
          </h2>
          <p className={lead}>Pay monthly, or save 15% with annual billing.</p>
        </motion.div>
        <BillingToggle isAnnual={isAnnual} onToggle={() => setIsAnnual(!isAnnual)} />
        <motion.div {...reveal} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl bg-[var(--panel)] p-8 sm:p-10 ${
                plan.recommended ? 'ring-1 ring-[var(--ink)]/40' : 'ring-1 ring-[var(--rule)]'
              }`}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className={`${mono} text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase`}>{plan.name}</span>
                {plan.recommended && (
                  <span className={`${mono} text-[12px] tracking-[0.1em] text-[var(--ink)] uppercase`}>Recommended</span>
                )}
              </div>
              <p className={`${mono} mb-1 text-[clamp(3rem,5vw,4.5rem)] leading-none font-normal tracking-[-0.04em] text-[var(--ink)]`}>
                {plan.price[billing]}
              </p>
              <p className={`${sans} mt-2 mb-6 text-[15px] text-[var(--mid)]`}>{plan.unit[billing]}</p>
              <PlanButton recommended={plan.recommended} />
              <hr className="my-8 border-[var(--rule)]" />
              <Includes items={plan.includes} />
              {plan.recommended && (
                <Link href="/pricing" className={`${siteLink} mt-auto self-start pt-8`}>
                  See RubixKube plans
                  <ArrowRight className={siteLinkArrow} aria-hidden />
                </Link>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── brand and page chrome ───────────────────────── */

/** "Hubble by RubixKube": the product name in the site serif, then the RubixKube wordmark. */
function HubbleLockup({ size = 'md' }: { size?: 'md' | 'lg' }) {
  // md is the section bar, lg the hero
  const lg = size === 'lg'
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Hubble by RubixKube">
      <span
        className={`font-[family-name:var(--font-serif)] leading-none text-[var(--ink)] ${lg ? 'text-[28px]' : 'text-[26px]'}`}
        aria-hidden
      >
        Hubble
      </span>
      <span className={`${mono} text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase`} aria-hidden>
        by
      </span>
      <Image src="/light-logo.svg" alt="" width={1720} height={200} className={`rk-only-light w-auto ${lg ? 'h-[15px]' : 'h-[14px]'}`} />
      <Image src="/dark-logo.svg" alt="" width={1720} height={200} className={`rk-only-dark w-auto ${lg ? 'h-[15px]' : 'h-[14px]'}`} />
    </span>
  )
}

const SECTIONS = [
  { id: 'features', name: 'Features' },
  { id: 'mobile', name: 'Mobile' },
  { id: 'rubixkube', name: 'RubixKube' },
  { id: 'pricing', name: 'Pricing' },
] as const

/** Sticky in-page bar under the site navbar: the product name, its sections, and Open Hubble. */
function SectionBar() {
  return (
    <div className="sticky top-[var(--nav-stack)] z-[90] border-y border-[var(--rule)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="rk-landing-max flex h-16 items-center gap-10 px-[var(--pad)]">
        <a href="#top" className="shrink-0">
          <HubbleLockup />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`${mono} text-[13px] tracking-[0.15em] text-[var(--mid)] uppercase transition-colors hover:text-[var(--ink)]`}
            >
              {s.name}
            </a>
          ))}
        </nav>
        <a
          href={HUBBLE_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(siteButton, 'ml-auto hidden h-10 px-5 text-[15px] sm:inline-flex')}
        >
          Open Hubble
        </a>
      </div>
    </div>
  )
}

/** One feature in the grid: a zoomed view on top, its name and one or two lines below. */
function Tile({ span, title, copy, visual, tall = false }: { span: string; title: string; copy: string; visual: ReactNode; tall?: boolean }) {
  return (
    <motion.div
      {...reveal}
      className={`${span} flex flex-col overflow-hidden rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--rule)] transition-shadow hover:shadow-md`}
    >
      <Backdrop className={`border-b border-[var(--rule)] ${tall ? 'h-[300px] lg:h-[360px]' : 'h-[260px] lg:h-[300px]'}`}>{visual}</Backdrop>
      <div className="p-8">
        <h3 className="rk-section-title mt-0 mb-2.5 text-[1.2rem] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">{title}</h3>
        <p className={`${sans} m-0 text-[15px] leading-[1.6] text-[var(--mid)]`}>{copy}</p>
      </div>
    </motion.div>
  )
}

/* ───────────────────────── page ───────────────────────── */

function OpenButtons() {
  return (
    <a href={HUBBLE_APP_URL} target="_blank" rel="noopener noreferrer" className={cn(siteButton, 'w-full sm:w-auto')}>
      Open Hubble
    </a>
  )
}

export function HubblePageClient() {
  return (
    <>
      <Navbar />

      {/* Hero: words on the left, the product on the right, running off the edge */}
      <section id="top" className="relative overflow-hidden bg-[var(--bg)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(60% 70% at 85% 40%, rgba(47,91,255,0.12), transparent 70%), radial-gradient(rgba(17,19,24,0.06) 1px, transparent 1px)',
            backgroundSize: 'auto, 16px 16px',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
          }}
        />
        <div className="rk-landing-max relative grid items-center gap-14 px-[var(--pad)] pt-[calc(var(--nav-stack)+4rem)] pb-24 lg:grid-cols-[5fr_7fr] lg:gap-10 lg:pt-[calc(var(--nav-stack)+5rem)] lg:pb-32">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 lg:-mt-12">
            <motion.div variants={fadeUpVariants} className="mb-10">
              <HubbleLockup size="lg" />
            </motion.div>
            <motion.h1
              variants={fadeUpVariants}
              className="rk-section-title mt-0 mb-8 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.06] text-[var(--ink)]"
            >
              On-call and paging,{' '}
              <em>from RubixKube.</em>
            </motion.h1>
            <motion.p variants={fadeUpVariants} className={lead}>
              Schedules, escalation and paging for your team. Hubble pages the right person when an alert fires, and keeps paging until someone acknowledges it.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-10 flex flex-wrap items-center gap-4">
              <OpenButtons />
            </motion.div>
            <motion.p
              variants={fadeUpVariants}
              className={`${mono} mt-10 text-[12px] tracking-[0.2em] text-[var(--mid)] uppercase`}
            >
              Push · Email · In-app · Slack
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="relative lg:-mr-[calc(var(--pad)+14vw)]"
          >
            <div className="overflow-hidden rounded-3xl shadow-[0_48px_96px_-40px_rgba(17,19,24,0.5)]">
              <Image
                src={SHOTS.hero.src}
                alt="Hubble On call page at oncall.rubixkube.ai: who is on call for each service, and the next handoffs"
                width={SHOTS.hero.w}
                height={SHOTS.hero.h}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="h-auto w-full"
                priority
              />
            </div>
            <Image
              src={SHOTS.phoneIncident.src}
              alt="Hubble phone app: an incident waiting for acknowledgement"
              width={SHOTS.phoneIncident.w}
              height={SHOTS.phoneIncident.h}
              sizes="220px"
              className="absolute -bottom-12 -left-10 hidden w-[24%] drop-shadow-[0_32px_40px_rgba(17,19,24,0.35)] sm:block"
              priority
            />
          </motion.div>
        </div>
      </section>

      <SectionBar />

      {/* Features: one grid, each tile a zoomed product view */}
      <section id="features" className="scroll-mt-[calc(var(--nav-stack)+4rem)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <motion.div {...reveal} className="mb-16 max-w-3xl">
            <span className={label}>Features</span>
            <h2 className={h2}>
              The whole on-call loop, <em>in one place.</em>
            </h2>
            <p className={lead}>
              Rosters decide who is on call. Escalation decides who is paged next. Everyone sees where each incident stands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
            <Tile
              span="md:col-span-4"
              title="Incidents"
              copy="What needs you first, who is on each incident, and where it stands: triggered, paged, acknowledged or resolved."
              tall
              visual={<Float shot={SHOTS.incidents} alt="Hubble incidents list with Needs you and Open groups" width={0.9} left={5} top={12} fits />}
            />
            <Tile
              span="md:col-span-2"
              title="Acknowledgements"
              copy="One tap acknowledges a page. Escalation stops, and the team sees who has it."
              tall
              visual={<Float shot={SHOTS.needsYou} alt="An incident waiting for acknowledgement, with its paging progress" width={2.5} left={-150} top={40} />}
            />
            <Tile
              span="md:col-span-3"
              title="Rosters"
              copy="Rotations with layers and overrides. Everyone can see who is on call now and who is next."
              visual={<Float shot={SHOTS.onCallNow} alt="Who is on call now for each service" width={1.45} left={7} top={14} />}
            />
            <Tile
              span="md:col-span-3"
              title="Handoffs"
              copy="Every handoff coming up, and who takes over, before it happens."
              visual={<Float shot={SHOTS.handoffs} alt="Upcoming handoffs between responders" width={1.45} left={7} top={22} />}
            />
            <Tile
              span="md:col-span-2"
              title="Escalation policies"
              copy="Who is paged at each level, and how long Hubble waits before the next one."
              visual={<FloatCard><EscalationLevels /></FloatCard>}
            />
            <Tile
              span="md:col-span-2"
              title="Contact rules"
              copy="Each person chooses how they are paged and how soon. High and low urgency get their own rules."
              visual={<FloatCard><ContactRules /></FloatCard>}
            />
            <Tile
              span="md:col-span-2"
              title="Slack"
              copy="Ask who is on call, see new pages and acknowledge them without leaving Slack."
              visual={<FloatCard><SlackThread /></FloatCard>}
            />
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section id="mobile" className="scroll-mt-[calc(var(--nav-stack)+4rem)] border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
            <motion.div {...reveal}>
              <span className={label}>Mobile</span>
              <h2 className={h2}>
                Pages that <em>find you.</em>
              </h2>
              <p className={lead}>
                The phone app shows the pages assigned to you and who is on call. Acknowledge, resolve or escalate an incident from wherever you are.
              </p>
            </motion.div>
            <motion.div {...reveal}>
              <PhonePair />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RubixKube */}
      <section id="rubixkube" className="scroll-mt-[calc(var(--nav-stack)+4rem)] border-t border-[var(--rule)] bg-[var(--background-secondary)] py-24 sm:py-32">
        <div className="rk-landing-max px-[var(--pad)]">
          <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
            <motion.div {...reveal} className="order-2 lg:order-1">
              <Backdrop className="flex min-h-[260px] items-center rounded-3xl border border-[var(--rule)] px-[8%] py-12">
                <div className="w-full drop-shadow-[0_18px_36px_rgba(17,19,24,0.14)]">
                  <UpgradePath />
                </div>
              </Backdrop>
            </motion.div>
            <motion.div {...reveal} className="order-1 lg:order-2">
              <span className={label}>RubixKube</span>
              <h2 className={h2}>
                Works with <em>RubixKube.</em>
              </h2>
              <p className={lead}>
                Hubble runs on its own. Add RubixKube later with the same sign-in, and Rubix investigates each incident and suggests the fix.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Pricing />

      <section className="border-t border-[var(--rule)] bg-[var(--bg)] py-24 sm:py-32">
        <motion.div {...reveal} className="rk-landing-max px-[var(--pad)]">
          <h2 className={h2}>Start using Hubble</h2>
          <p className={lead}>Sign in with your RubixKube account, or create one.</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <OpenButtons />
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
