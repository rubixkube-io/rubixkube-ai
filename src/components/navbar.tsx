'use client'

import { useState, useEffect, useRef, useMemo, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowUpRight, Moon, Sun, Users, Mail, Activity, Linkedin, Github, Slack } from 'lucide-react'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { useKeyShortcut } from '@/lib/use-key-shortcut'
import { useTheme } from '@/components/theme-provider'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { useReferenceGuidesNav, useRecentNav } from '@/components/reference-pages-nav-provider'
import { urlFor } from '@/lib/sanity.client'
import { AbstractCover } from '@/components/solutions/abstract-cover'
import { USE_CASES } from '@/data/solutions'
import {
  RESOURCES_CATEGORIES,
  REFERENCE_CATEGORY_LABELS,
  guidesForCategories,
  isProductsNavActive,
  isSolutionsNavActive,
  isResourcesNavActive,
  isCompanyNavActive,
  type ReferenceGuideNavItem,
} from '@/lib/reference-nav'

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>
type Mega = 'products' | 'usecases' | 'resources' | 'company'
type Row = {
  title: string
  line: string
  href: string
  icon: Icon
  external?: boolean
}

const CALENDLY = 'https://calendly.com/rubixkube-ai/30min'
const CONSOLE_URL = 'https://console.rubixkube.ai'
const DOCS_URL = 'https://docs.rubixkube.ai/'
const SLACK_URL = 'https://join.slack.com/t/rubixkubecommunity/shared_invite/zt-3fq7kiu8k-RC5uzLY6BjQFE5Uq_NziEA'
const GITHUB_URL = 'https://github.com/rubixkube-io'
const LINKEDIN_URL = 'https://linkedin.com/company/rubixkube'

/** offset: the screenshot sits inset from the top and left of the cover and runs off the other edges; Hubble's cover is already drawn that way */
const PRODUCTS: {
  title: string
  line: string
  href: string
  image: string
  imageDark?: string
  offset?: boolean
}[] = [
  {
    title: 'RubixKube',
    line: 'Finds the cause of each incident and suggests the fix.',
    href: '/platform',
    image: '/screenshots/platform/rubix-home-light.png',
    imageDark: '/screenshots/platform/rubix-home-dark.png',
    offset: true,
  },
  {
    title: 'Hubble',
    line: 'On-call schedules, escalation and paging.',
    href: '/hubble',
    image: '/screenshots/hubble/nav-card.png',
  },
  {
    title: 'Kepler',
    line: 'The desktop IDE for operators.',
    href: '/products/kepler',
    image: '/screenshots/kepler/cover-window.png',
    offset: true,
  },
  {
    title: 'Rubix CLI',
    line: 'Rubix in your terminal.',
    href: '/products/rubix-cli',
    image: '/screenshots/rubix-cli-cover.png',
    offset: true,
  },
]

const RESOURCE_COLUMNS: {
  label: string
  links: { title: string; href: string; external?: boolean }[]
}[] = [
  {
    label: 'Learn',
    links: [
      { title: 'Blog', href: '/blog' },
      { title: 'Podcast', href: '/podcast' },
      { title: 'All resources', href: '/resources' },
    ],
  },
  {
    label: 'Build',
    links: [
      { title: 'Docs', href: DOCS_URL, external: true },
      { title: 'GitHub', href: GITHUB_URL, external: true },
    ],
  },
]

const COMPANY: Row[] = [
  {
    title: 'About',
    line: 'Who we are, and why we built RubixKube.',
    href: '/about',
    icon: Users,
  },
  {
    title: 'Contact',
    line: 'Questions, partnerships and press.',
    href: '/contact',
    icon: Mail,
  },
  {
    title: 'Status',
    line: 'The live health of every RubixKube service.',
    href: '/status',
    icon: Activity,
  },
]

const SOCIAL = [
  { name: 'LinkedIn', href: LINKEDIN_URL, icon: Linkedin },
  { name: 'GitHub', href: GITHUB_URL, icon: Github },
  { name: 'Slack community', href: SLACK_URL, icon: Slack },
]

/** A card in a menu: the cover on the left, the kind, title and summary on the right */
type NavCard = {
  key: string
  href: string
  kind: string
  title: string
  summary?: string | null
  image?: string | null
}

function sanityCard(item: ReferenceGuideNavItem): NavCard {
  const hero = item.heroImage
  return {
    key: `${item.category}/${item.slug}`,
    href: `/${item.category}/${item.slug}`,
    kind: REFERENCE_CATEGORY_LABELS[item.category] ?? item.category,
    title: item.title,
    summary: item.subtitle,
    image: hero?.asset?._ref != null ? urlFor(hero).width(480).height(300).url() : null,
  }
}

const navText = 'whitespace-nowrap font-[family-name:var(--font-figtree)] text-[15px] font-medium'
const navItem = cn(navText, 'inline-flex items-center gap-1 rounded-lg px-2.5 py-2 transition-colors hover:bg-[var(--rule)] xl:px-3')
const label = 'mb-3 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em] text-[var(--mid)] uppercase'
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]'
const demoButton =
  '!h-9 !rounded-lg !px-4 !py-0 !font-[family-name:var(--font-figtree)] !text-[14px] !font-medium !tracking-normal !normal-case shadow-[0_1px_2px_rgba(17,19,24,0.1)] transition-shadow hover:shadow-[0_4px_16px_rgba(47,91,255,0.3)]'

function CardLink({ card, index, onNavigate }: { card: NavCard; index: number; onNavigate?: () => void }) {
  return (
    <Link
      href={card.href}
      onClick={onNavigate}
      className={cn(
        'group -mx-2.5 grid grid-cols-[6.5rem_1fr] items-start gap-4 rounded-xl p-2.5 transition-colors hover:bg-[var(--rule)] sm:grid-cols-[9.5rem_1fr] xl:grid-cols-[10.5rem_1fr]',
        focus,
      )}
    >
      <span className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-[var(--panel)] ring-1 ring-[var(--rule)]">
        {card.image ? (
          <Image src={card.image} alt="" fill sizes="168px" className="object-cover" />
        ) : (
          <AbstractCover seed={card.key} index={index} />
        )}
      </span>
      <span className="min-w-0">
        <span className="block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.12em] text-[var(--mid)] uppercase">
          {card.kind}
        </span>
        <span className="mt-1.5 block text-[15px] leading-[1.35] font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--blue)]">
          {card.title}
        </span>
        {card.summary?.trim() ? (
          <span className="mt-1.5 line-clamp-2 block text-[14px] leading-[1.45] text-[var(--mid)]">{card.summary}</span>
        ) : null}
      </span>
    </Link>
  )
}

function Cards({ title, cards, offset = 0, onNavigate }: { title: string; cards: NavCard[]; offset?: number; onNavigate?: () => void }) {
  return (
    <div className="min-w-0">
      <p className={label}>{title}</p>
      <div className="flex flex-col gap-2.5">
        {cards.map((c, i) => (
          <CardLink key={c.key} card={c} index={offset + i} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  )
}

/** Two halves with a rule between them on wide screens, stacked on narrow ones */
function Split({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="grid gap-7 lg:grid-cols-2 lg:gap-0">
      <div className="min-w-0 lg:pr-7">{left}</div>
      <div className="min-w-0 lg:border-l lg:border-[var(--rule)] lg:pl-7">{right}</div>
    </div>
  )
}

/** Products: one card per product, the cover on top and one line under the name */
function ProductsPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div>
      <p className={label}>Products</p>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <li key={p.href}>
            <Link href={p.href} onClick={onNavigate} className={cn('group block rounded-xl', focus)}>
              <span className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-[var(--panel)] ring-1 ring-[var(--rule)]">
                {p.offset ? (
                  <span className="absolute top-[14%] left-[12%] block w-[118%] overflow-hidden rounded-tl-lg shadow-[0_12px_32px_rgba(17,19,24,0.22)] ring-1 ring-[var(--rule)] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Image
                      src={p.image}
                      alt=""
                      width={1200}
                      height={750}
                      sizes="(max-width: 1024px) 50vw, 340px"
                      className={cn('block h-auto w-full', p.imageDark && 'rk-only-light')}
                    />
                    {p.imageDark ? (
                      <Image
                        src={p.imageDark}
                        alt=""
                        width={1200}
                        height={750}
                        sizes="(max-width: 1024px) 50vw, 340px"
                        className="rk-only-dark block h-auto w-full"
                      />
                    ) : null}
                  </span>
                ) : (
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 45vw, 300px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                )}
              </span>
              <span className="mt-3 block text-[15px] font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--blue)]">
                {p.title}
              </span>
              <span className="mt-0.5 block text-[14px] leading-[1.4] text-[var(--mid)]">{p.line}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function UseCasesPanel({ onNavigate }: { onNavigate?: () => void }) {
  const guides = useReferenceGuidesNav()
  const { useCases, caseStudies } = useMemo(() => {
    const written = guides.filter((g) => g.category === 'use-case').map(sanityCard)
    // until the use cases are published in Sanity, the short list on /solutions stands in
    const useCases: NavCard[] = written.length
      ? written
      : USE_CASES.map((u) => ({
          key: `use-case/${u.slug}`,
          href: u.href,
          kind: 'Use case',
          title: u.title,
          summary: u.summary,
        }))
    return {
      useCases,
      caseStudies: guides.filter((g) => g.category === 'case-study').map(sanityCard),
    }
  }, [guides])

  const all = (
    <Link
      href="/solutions"
      onClick={onNavigate}
      className={cn('mt-4 inline-flex text-[14px] font-medium text-[var(--ink)] hover:text-[var(--blue)]', focus)}
    >
      All use cases →
    </Link>
  )

  // with no case studies yet, the use cases take both halves
  if (!caseStudies.length) {
    return (
      <Split
        left={
          <div>
            <Cards title="Use cases" cards={useCases.slice(0, 2)} onNavigate={onNavigate} />
            {all}
          </div>
        }
        right={<Cards title="More use cases" cards={useCases.slice(2, 4)} offset={2} onNavigate={onNavigate} />}
      />
    )
  }
  return (
    <Split
      left={
        <div>
          <Cards title="Use cases" cards={useCases.slice(0, 2)} onNavigate={onNavigate} />
          {all}
        </div>
      }
      right={<Cards title="Case studies" cards={caseStudies.slice(0, 2)} onNavigate={onNavigate} />}
    />
  )
}

function ResourcesPanel({ onNavigate }: { onNavigate?: () => void }) {
  const guides = useReferenceGuidesNav()
  const recent = useRecentNav()
  const featured = useMemo(() => {
    const pages = guidesForCategories(guides, RESOURCES_CATEGORIES)
    // one comparison and one glossary entry when there are both, so the two cards differ
    const compare = pages.find((g) => g.category === 'compare')
    const glossary = pages.find((g) => g.category === 'glossary')
    const picked = [compare, glossary].filter((g): g is ReferenceGuideNavItem => !!g)
    const rest = pages.filter((g) => !picked.includes(g))
    return [...picked, ...rest].slice(0, 2).map(sanityCard)
  }, [guides])

  return (
    <Split
      left={
        <div>
          <div className="grid grid-cols-2 gap-6">
            {RESOURCE_COLUMNS.map((col) => (
              <div key={col.label}>
                <p className={label}>{col.label}</p>
                <ul className="flex flex-col">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={onNavigate}
                        {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className={cn(
                          'inline-flex items-center gap-1 py-1.5 text-[15px] font-medium text-[var(--ink)] transition-colors hover:text-[var(--blue)]',
                          focus,
                        )}
                      >
                        {l.title}
                        {l.external ? <ArrowUpRight className="h-3.5 w-3.5 text-[var(--mid)]" strokeWidth={1.75} aria-hidden /> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {recent.length ? (
            <div className="mt-6 grid grid-cols-2 gap-6 border-t border-[var(--rule)] pt-6">
              {(['post', 'episode'] as const).map((kind) => {
                const items = recent.filter((r) => r.kind === kind)
                if (!items.length) return null
                return (
                  <div key={kind}>
                    <p className={label}>{kind === 'post' ? 'Latest posts' : 'Latest episodes'}</p>
                    <ul className="flex flex-col gap-3">
                      {items.map((r) => (
                        <li key={r.href}>
                          <Link href={r.href} onClick={onNavigate} className={cn('group block', focus)}>
                            {r.date ? (
                              <span className="block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.08em] text-[var(--mid)] uppercase">
                                {new Date(r.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  timeZone: 'UTC',
                                })}
                              </span>
                            ) : null}
                            <span className="mt-1 line-clamp-2 block text-[14px] leading-[1.4] font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--blue)]">
                              {r.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      }
      right={featured.length ? <Cards title="Featured" cards={featured} onNavigate={onNavigate} /> : null}
    />
  )
}

/** A list of rows with an icon, a name and one line, as in the Products menu */
function Rows({ title, rows, onNavigate }: { title: string; rows: Row[]; onNavigate?: () => void }) {
  return (
    <div>
      <p className={label}>{title}</p>
      <ul className="grid gap-1">
        {rows.map(({ title: name, line, href, icon: RowIcon, external }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={cn('group -mx-2.5 flex gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--rule)]', focus)}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--rule)] text-[var(--ink)]">
                <RowIcon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="inline-flex items-center gap-1 text-[15px] font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--blue)]">
                  {name}
                  {external ? <ArrowUpRight className="h-3.5 w-3.5 text-[var(--mid)]" strokeWidth={1.75} aria-hidden /> : null}
                </span>
                <span className="mt-0.5 block text-[14px] leading-[1.4] text-[var(--mid)]">{line}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CompanyPanel({ onNavigate }: { onNavigate?: () => void }) {
  return <Rows title="Company" rows={COMPANY} onNavigate={onNavigate} />
}

/** compact: a small dropdown under its label instead of the full-width panel */
const PANELS: {
  id: Mega
  name: string
  active: (p: string) => boolean
  Panel: ComponentType<{ onNavigate?: () => void }>
  compact?: boolean
}[] = [
  {
    id: 'products',
    name: 'Products',
    active: isProductsNavActive,
    Panel: ProductsPanel,
  },
  {
    id: 'usecases',
    name: 'Use cases',
    active: isSolutionsNavActive,
    Panel: UseCasesPanel,
  },
  {
    id: 'resources',
    name: 'Resources',
    active: isResourcesNavActive,
    Panel: ResourcesPanel,
  },
  {
    id: 'company',
    name: 'Company',
    active: isCompanyNavActive,
    Panel: CompanyPanel,
    compact: true,
  },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaDesktop, setMegaDesktop] = useState<null | Mega>(null)
  const [mobileMega, setMobileMega] = useState<null | Mega>(null)
  const [megaPortalReady, setMegaPortalReady] = useState(false)
  // where a compact menu's label starts, so its dropdown opens right under it
  const [anchorLeft, setAnchorLeft] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const pathname = usePathname()
  const navShellRef = useRef<HTMLElement | null>(null)
  const megaOverlayRef = useRef<HTMLDivElement | null>(null)

  // Keyboard first: L opens the console sign-in, B opens the booking calendar
  useKeyShortcut('l', () => window.open(CONSOLE_URL, '_blank', 'noopener,noreferrer'))
  useKeyShortcut('b', () => document.querySelector<HTMLElement>('[data-shortcut="book-demo"] button')?.click())
  // D switches between light and dark
  const { toggleTheme } = useTheme()
  useKeyShortcut('d', toggleTheme)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    setMegaDesktop(null)
    setMobileMega(null)
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    setMegaPortalReady(true)
  }, [])

  useEffect(() => {
    if (!megaDesktop) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaDesktop(null)
    }
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null
      if (!target) return
      const inNav = navShellRef.current?.contains(target) ?? false
      const inMega = megaOverlayRef.current?.contains(target) ?? false
      if (!inNav && !inMega) setMegaDesktop(null)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown, true)
    }
  }, [megaDesktop])

  const closeAll = () => {
    setMegaDesktop(null)
    setIsOpen(false)
    setMobileMega(null)
  }

  const open = PANELS.find((p) => p.id === megaDesktop)
  const megaPortal =
    megaPortalReady &&
    typeof document !== 'undefined' &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={megaOverlayRef}
            className="pointer-events-auto fixed z-[2000] max-lg:hidden"
            style={{ top: 'var(--nav-stack)', left: 0, right: 0, bottom: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.04 : 0.18,
              ease: 'easeOut',
            }}
          >
            {/* The scrim catches every pixel below the header, so the page behind never takes hover or clicks */}
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 z-0 border-0 bg-[var(--ink)]/[0.16] p-0 backdrop-blur-[2px]"
              onClick={() => setMegaDesktop(null)}
            />
            <div
              id="nav-mega-desktop"
              role="region"
              aria-label={`${open.name} menu`}
              className={cn(
                'pointer-events-none relative z-[1] pt-2 font-[family-name:var(--font-figtree)]',
                open.compact ? 'absolute w-[22rem]' : 'rk-landing-max px-[var(--pad)]',
              )}
              style={open.compact ? { left: Math.max(16, anchorLeft - 12) } : undefined}
            >
              <motion.div
                key={open.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.04 : 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  'pointer-events-auto max-h-[min(72vh,620px)] overflow-y-auto overscroll-contain rounded-2xl bg-[var(--paper)] shadow-[0_24px_60px_rgba(17,19,24,0.14)] ring-1 ring-[var(--rule)]',
                  open.compact ? 'p-5' : 'p-7',
                )}
              >
                <open.Panel onNavigate={() => setMegaDesktop(null)} />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    )

  const pricingActive = pathname === '/pricing' || pathname.startsWith('/pricing/')

  return (
    <motion.header
      ref={navShellRef}
      variants={fadeUpVariants}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate="visible"
      className={cn(
        'fixed top-[var(--announce-h)] right-0 left-0 z-[100] overflow-visible pt-[var(--nav-gap-top)] font-[family-name:var(--font-figtree)] transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || megaDesktop || isOpen
          ? 'border-b border-[var(--rule)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-[14px]'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="rk-landing-max relative flex h-[var(--nav-height)] items-center gap-5 px-[var(--pad)] xl:gap-8">
        <Link href="/" className="flex shrink-0" aria-label="RubixKube home">
          <Image
            src="/dark-logo.svg"
            alt=""
            width={1720}
            height={200}
            className="rk-only-dark h-[18px] w-auto sm:h-5 min-[1920px]:h-6"
            priority
          />
          <Image
            src="/light-logo.svg"
            alt=""
            width={1720}
            height={200}
            className="rk-only-light h-[18px] w-auto sm:h-5 min-[1920px]:h-6"
            priority
          />
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {PANELS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={cn(
                navItem,
                'cursor-pointer',
                megaDesktop === p.id && 'bg-[var(--rule)]',
                p.active(pathname) ? 'text-[var(--blue)]' : 'text-[var(--ink)]',
                focus,
              )}
              aria-expanded={megaDesktop === p.id}
              aria-haspopup="true"
              aria-controls="nav-mega-desktop"
              id={`nav-trigger-${p.id}`}
              onMouseEnter={(e) => {
                setAnchorLeft(e.currentTarget.getBoundingClientRect().left)
                setMegaDesktop(p.id)
              }}
              onClick={(e) => {
                setAnchorLeft(e.currentTarget.getBoundingClientRect().left)
                setMegaDesktop((m) => (m === p.id ? null : p.id))
              }}
            >
              {p.name}
              <ChevronDown
                className={cn('h-3.5 w-3.5 shrink-0 text-[var(--mid)] transition-transform', megaDesktop === p.id && 'rotate-180')}
                strokeWidth={2}
                aria-hidden
              />
            </button>
          ))}
          <Link
            href="/pricing"
            onMouseEnter={() => setMegaDesktop(null)}
            className={cn(navItem, pricingActive ? 'text-[var(--blue)]' : 'text-[var(--ink)]', focus)}
          >
            Pricing
          </Link>
        </div>

        <div className="ml-auto hidden items-center gap-3 lg:flex xl:gap-5">
          <div className="hidden items-center xl:flex">
            {SOCIAL.map(({ name, href, icon: SocialIcon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
                aria-label={name}
                className={cn('rounded-lg p-2 text-[var(--mid)] transition-colors hover:bg-[var(--rule)] hover:text-[var(--ink)]', focus)}
              >
                <SocialIcon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </a>
            ))}
          </div>
          <Link
            href={CONSOLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Sign in (L)"
            aria-keyshortcuts="L"
            className={cn(navText, 'text-[var(--ink)] transition-colors hover:text-[var(--blue)]', focus)}
          >
            Sign in
          </Link>
          <span data-shortcut="book-demo" className="contents" title="Book a demo (B)">
            <CalendlyBooking url={CALENDLY} variant="primary" size="sm" className={demoButton}>
              Book a demo
            </CalendlyBooking>
          </span>
          <ThemeToggle onClick={toggleTheme} />
        </div>

        <button
          type="button"
          className="relative z-10 ml-auto shrink-0 rounded-md p-2 text-[var(--ink)] lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {megaPortal}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-[var(--rule)] bg-[var(--bg)] lg:hidden"
          >
            <div className="flex max-h-[calc(100dvh-var(--nav-stack))] flex-col">
              <div className="flex-1 overflow-y-auto px-[var(--pad)] py-2">
                {PANELS.map(({ id, name, active, Panel }) => (
                  <div key={id} className="border-b border-[var(--rule)]">
                    <button
                      type="button"
                      className={cn(
                        'flex w-full items-center justify-between py-4 text-left text-[17px] font-medium',
                        active(pathname) ? 'text-[var(--blue)]' : 'text-[var(--ink)]',
                      )}
                      aria-expanded={mobileMega === id}
                      onClick={() => setMobileMega((m) => (m === id ? null : id))}
                    >
                      {name}
                      <ChevronDown
                        className={cn('h-4 w-4 shrink-0 text-[var(--mid)] transition-transform', mobileMega === id && 'rotate-180')}
                        strokeWidth={2}
                      />
                    </button>
                    {mobileMega === id && (
                      <div className="pb-5">
                        <Panel onNavigate={closeAll} />
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/pricing"
                  onClick={closeAll}
                  className={cn(
                    'block border-b border-[var(--rule)] py-4 text-[17px] font-medium',
                    pricingActive ? 'text-[var(--blue)]' : 'text-[var(--ink)]',
                  )}
                >
                  Pricing
                </Link>
                <div className="flex items-center gap-1 py-3">
                  {SOCIAL.map(({ name, href, icon: SocialIcon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="rounded-lg p-2.5 text-[var(--mid)] hover:text-[var(--ink)]"
                    >
                      <SocialIcon className="h-5 w-5" strokeWidth={1.75} />
                    </a>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Switch between light and dark theme"
                  className="flex w-full items-center gap-2 border-t border-[var(--rule)] py-4 text-[15px] text-[var(--mid)] hover:text-[var(--ink)]"
                >
                  <Moon className="rk-only-light h-4 w-4" strokeWidth={1.75} aria-hidden />
                  <span className="rk-only-light">Dark theme</span>
                  <Sun className="rk-only-dark h-4 w-4" strokeWidth={1.75} aria-hidden />
                  <span className="rk-only-dark">Light theme</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-[var(--rule)] px-[var(--pad)] py-4">
                <Link
                  href={CONSOLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeAll}
                  className="flex h-10 items-center justify-center rounded-lg text-[15px] font-medium text-[var(--ink)] ring-1 ring-[var(--rule)]"
                >
                  Sign in
                </Link>
                <CalendlyBooking
                  url={CALENDLY}
                  variant="primary"
                  size="sm"
                  className={cn(demoButton, '!h-10 w-full [&_button]:w-full')}
                  onOpen={() => setIsOpen(false)}
                >
                  Book a demo
                </CalendlyBooking>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/** Sun in dark, moon in light; the icons swap through the theme CSS so the first paint is right. */
function ThemeToggle({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Switch theme (D)"
      aria-label="Switch between light and dark theme"
      aria-keyshortcuts="D"
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg text-[var(--mid)] ring-1 ring-[var(--rule)] transition-colors hover:text-[var(--ink)]',
        className,
      )}
    >
      <Moon className="rk-only-light h-4 w-4" strokeWidth={1.75} />
      <Sun className="rk-only-dark h-4 w-4" strokeWidth={1.75} />
    </button>
  )
}
