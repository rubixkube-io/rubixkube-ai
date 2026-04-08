'use client'

import { useState, useEffect, useRef, useMemo, type ComponentType } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Linkedin,
  Github,
  Slack,
  Rocket,
  ChevronDown,
  BookOpen,
  Scale,
  Wrench,
  Map,
  Briefcase,
  BookMarked,
  FileText,
  LayoutGrid,
  Target,
  Building2,
  Workflow,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants } from '@/lib/animations'
import { outlineBlueAccentNav } from '@/lib/outline-blue-cta'
import { cn } from '@/lib/utils'
import { useReferenceGuidesNav } from '@/components/reference-pages-nav-provider'
import { urlFor } from '@/lib/sanity.client'
import {
  SOLUTIONS_CATEGORIES,
  RESOURCES_CATEGORIES,
  REFERENCE_CATEGORY_LABELS,
  guidesForCategories,
  referenceGuideNavDisplayTitle,
  isSolutionsNavActive,
  isResourcesNavActive,
  type ReferenceGuideNavItem,
} from '@/lib/reference-nav'

const simpleNavBeforeMega = [{ name: 'Platform', href: '/platform' }] as const
const pricingNavItem = { name: 'Pricing', href: '/pricing' } as const
const simpleNavTail = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const

const SOLUTIONS_HUB: {
  title: string
  href: string
  subtitle: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
}[] = [
  {
    title: 'Overview',
    href: '/solutions',
    subtitle: 'How RubixKube tackles infrastructure challenges.',
    icon: LayoutGrid,
  },
  {
    title: 'Use cases',
    href: '/solutions#use-cases',
    subtitle: 'Self-healing, prevention, and safe launches.',
    icon: Target,
  },
  {
    title: 'Industries',
    href: '/solutions#industries',
    subtitle: 'Retail, fintech, healthcare, SaaS, and more.',
    icon: Building2,
  },
  {
    title: 'How it works',
    href: '/solutions#how-it-works',
    subtitle: 'Observe, diagnose, and act with agents.',
    icon: Workflow,
  },
]

const RESOURCE_QUICK: {
  title: string
  href: string
  subtitle: string
  external?: boolean
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
}[] = [
  {
    title: 'Blog',
    href: '/blog',
    subtitle: 'Deep dives, SRI practice, and product updates.',
    icon: FileText,
  },
  {
    title: 'Documentation',
    href: 'https://docs.rubixkube.ai/',
    external: true,
    subtitle: 'Install, platform guides, and tutorials.',
    icon: BookOpen,
  },
  {
    title: 'Resources hub',
    href: '/resources',
    subtitle: 'Docs, playbooks, and on-site guides.',
    icon: LayoutGrid,
  },
]

const CATEGORY_ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  learn: BookOpen,
  compare: Scale,
  tools: Wrench,
  guide: Map,
  'case-study': Briefcase,
  glossary: BookMarked,
}

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/rubixkube', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/rubixkube-io', icon: Github },
  {
    name: 'Slack',
    href: 'https://join.slack.com/t/rubixkubecommunity/shared_invite/zt-3fq7kiu8k-RC5uzLY6BjQFE5Uq_NziEA',
    icon: Slack,
  },
] as const

const CALENDLY = 'https://calendly.com/rubixkube-ai/30min'
const CONSOLE_URL = 'https://console.rubixkube.ai'

const launchConsoleClass =
  '!rounded-[5px] !py-[9px] !px-5 !text-[10px] !tracking-[0.12em] !font-medium !gap-1.5 shadow-[0_1px_2px_rgba(17,19,24,0.06)] transition-[box-shadow,opacity] duration-200 hover:!opacity-100 hover:shadow-[0_4px_20px_rgba(47,91,255,0.38)] active:translate-y-px active:shadow-[0_1px_4px_rgba(47,91,255,0.25)] min-[1920px]:!py-[11px] min-[1920px]:!px-6 min-[1920px]:!text-[11px] min-[2560px]:!text-xs'

const navLinkClass =
  'whitespace-nowrap font-[family-name:var(--font-mono)] text-[12px] tracking-[0.14em] uppercase transition-colors min-[1600px]:text-[13px] min-[1920px]:text-[14px] min-[2560px]:text-[15px]'

const megaSectionLabel =
  'mb-3 font-[family-name:var(--font-mono)] text-[10px] font-medium tracking-[0.2em] text-[var(--blue)] uppercase'

const megaColumnLabel =
  'mb-3 font-[family-name:var(--font-mono)] text-[10px] font-medium tracking-[0.18em] text-[var(--blue)] uppercase'

function MegaLinkRow({
  href,
  external,
  title,
  subtitle,
  Icon,
  onNavigate,
}: {
  href: string
  external?: boolean
  title: string
  subtitle?: string | null
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>
  onNavigate?: () => void
}) {
  const fullLabel = [title, (subtitle ?? '').trim()].filter(Boolean).join(' — ')
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)]/10">
        <Icon className="h-4 w-4 text-[var(--blue)]" strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="line-clamp-2 block font-[family-name:var(--font-mono)] text-[13px] font-medium leading-snug tracking-[-0.02em] text-[var(--ink)]">
          {title}
        </span>
        {(subtitle ?? '').trim() ? (
          <span className="mt-0.5 line-clamp-3 block font-[family-name:var(--font-mono)] text-[11px] font-light leading-snug text-[var(--mid)]">
            {subtitle}
          </span>
        ) : null}
      </span>
    </>
  )
  const className =
    'flex gap-3 rounded-lg p-2 transition-colors hover:bg-[rgba(17,19,24,0.04)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]'
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        title={fullLabel}
        onClick={onNavigate}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={className} title={fullLabel} onClick={onNavigate}>
      {inner}
    </Link>
  )
}

function MegaCategoryColumn({
  category,
  items,
  onNavigate,
}: {
  category: string
  items: ReferenceGuideNavItem[]
  onNavigate?: () => void
}) {
  const Icon = CATEGORY_ICONS[category] ?? FileText
  const label = REFERENCE_CATEGORY_LABELS[category] ?? category
  return (
    <div className="min-w-0">
      <p className={megaColumnLabel}>{label}</p>
      <ul className="flex flex-col gap-0.5">
        {items.length === 0 ? (
          <li className="px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)]/75">
            Coming soon.
          </li>
        ) : (
          items.map((item) => (
            <li key={`${item.category}-${item.slug}`}>
              <MegaLinkRow
                href={`/${item.category}/${item.slug}`}
                title={referenceGuideNavDisplayTitle(item)}
                subtitle={item.subtitle}
                Icon={Icon}
                onNavigate={onNavigate}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

function SolutionsMegaPanel({ onNavigate }: { onNavigate?: () => void }) {
  const guides = useReferenceGuidesNav()
  const byCategory = useMemo(() => {
    const list = guidesForCategories(guides, SOLUTIONS_CATEGORIES)
    return SOLUTIONS_CATEGORIES.map((cat) => ({
      category: cat,
      items: list.filter((g) => g.category === cat),
    }))
  }, [guides])

  return (
    <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-0">
      <div className="min-w-0 shrink-0 lg:w-[min(14rem,40%)] lg:pr-6">
        <p className={megaSectionLabel}>Solutions</p>
        <ul className="flex flex-col gap-0.5">
          {SOLUTIONS_HUB.map((row) => (
            <li key={row.href}>
              <MegaLinkRow
                href={row.href}
                title={row.title}
                subtitle={row.subtitle}
                Icon={row.icon}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 flex-1 lg:pl-6">
        <p className={megaSectionLabel}>Case studies & glossary</p>
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 sm:gap-5">
          {byCategory.map(({ category, items }) => (
            <MegaCategoryColumn key={category} category={category} items={items} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ResourcesFeaturedArticle({
  item,
  onNavigate,
}: {
  item: ReferenceGuideNavItem
  onNavigate?: () => void
}) {
  const href = `/${item.category}/${item.slug}`
  const categoryLabel = REFERENCE_CATEGORY_LABELS[item.category] ?? item.category
  const Icon = CATEGORY_ICONS[item.category] ?? FileText
  const hero = item.heroImage
  const img =
    hero?.asset?._ref != null ? urlFor(hero).width(640).height(400).url() : null
  const alt = (hero?.alt ?? '').trim() || ''
  const fullLabel = [categoryLabel, item.title, (item.subtitle ?? '').trim()].filter(Boolean).join(' — ')

  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={fullLabel}
      className="group flex gap-4 rounded-xl p-2 text-left transition-colors hover:bg-[rgba(17,19,24,0.04)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)]"
    >
      <div className="relative aspect-[16/10] w-[min(44%,11rem)] min-w-[7.5rem] shrink-0 overflow-hidden rounded-lg bg-[rgba(17,19,24,0.06)] sm:min-w-[9rem]">
        {img ? (
          <Image src={img} alt={alt} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" sizes="(max-width: 768px) 120px, 176px" />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            <Icon className="h-8 w-8 text-[var(--blue)]/30" strokeWidth={1.25} aria-hidden />
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
        <p className="mb-1.5 font-[family-name:var(--font-mono)] text-[10px] font-medium tracking-[0.2em] text-[var(--blue)] uppercase">
          {categoryLabel}
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[14px] font-medium leading-snug tracking-[-0.02em] text-[var(--ink)] sm:text-[15px]">
          {item.title}
        </p>
        {(item.subtitle ?? '').trim() ? (
          <p className="mt-2 line-clamp-3 font-[family-name:var(--font-mono)] text-[11px] font-light leading-relaxed text-[var(--mid)]">
            {item.subtitle}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

function ResourcesMegaPanel({ onNavigate }: { onNavigate?: () => void }) {
  const guides = useReferenceGuidesNav()
  const resourcePages = useMemo(
    () => guidesForCategories(guides, RESOURCES_CATEGORIES),
    [guides],
  )

  return (
    <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-0">
      <div className="min-w-0 shrink-0 lg:w-[min(14rem,40%)] lg:pr-6">
        <p className={megaSectionLabel}>Discover</p>
        <ul className="flex flex-col gap-0.5">
          {RESOURCE_QUICK.map((row) => (
            <li key={row.href}>
              <MegaLinkRow
                href={row.href}
                external={row.external}
                title={row.title}
                subtitle={row.subtitle}
                Icon={row.icon}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      </div>
      {resourcePages.length > 0 ? (
        <div className="min-w-0 flex-1 lg:pl-6">
          <p className={megaSectionLabel}>Featured on this site</p>
          <ul className="flex flex-col gap-3">
            {resourcePages.map((item) => (
              <li key={`${item.category}-${item.slug}`}>
                <ResourcesFeaturedArticle item={item} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaDesktop, setMegaDesktop] = useState<null | 'solutions' | 'resources'>(null)
  const [mobileMega, setMobileMega] = useState<null | 'solutions' | 'resources'>(null)
  const [megaPortalReady, setMegaPortalReady] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const pathname = usePathname()
  const navShellRef = useRef<HTMLElement | null>(null)
  const megaOverlayRef = useRef<HTMLDivElement | null>(null)

  const openMega = (m: 'solutions' | 'resources') => {
    setMegaDesktop(m)
  }

  const toggleMega = (m: 'solutions' | 'resources') => {
    setMegaDesktop((prev) => (prev === m ? null : m))
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
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
      const nav = navShellRef.current
      const mega = megaOverlayRef.current
      const target = e.target as Node | null
      if (!target) return
      const inNav = nav?.contains(target) ?? false
      const inMega = mega?.contains(target) ?? false
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

  const megaPortal =
    megaPortalReady &&
    typeof document !== 'undefined' &&
    createPortal(
      <AnimatePresence>
        {megaDesktop ? (
          <motion.div
            ref={megaOverlayRef}
            key={megaDesktop}
            className="pointer-events-auto fixed z-[2000] max-[1376px]:hidden"
            style={{ top: 'var(--nav-stack)', left: 0, right: 0, bottom: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.04 : 0.18, ease: 'easeOut' }}
          >
            {/* Full hit-target below the header: scrim catches every pixel so the page behind never receives hover/selection. */}
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 z-0 border-0 bg-[var(--ink)]/[0.22] p-0 backdrop-blur-[2px] transition-colors hover:bg-[var(--ink)]/[0.26]"
              onClick={() => setMegaDesktop(null)}
            />
            <div
              id="nav-mega-desktop"
              role="region"
              aria-label={megaDesktop === 'solutions' ? 'Solutions menu' : 'Resources menu'}
              className="pointer-events-none relative z-[1] flex w-full justify-center px-3 pt-2 sm:px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.04 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: 'min(52rem, calc(100vw - 2rem))',
                }}
                className="pointer-events-auto box-border max-w-none shrink-0 overflow-hidden rounded-xl bg-[var(--background-secondary)] shadow-[0_32px_64px_-12px_rgba(17,19,24,0.2)]"
              >
                <div className="max-h-[min(68vh,560px)] overflow-y-auto overscroll-contain px-4 py-5 sm:px-5 sm:py-6">
                  {megaDesktop === 'solutions' ? (
                    <SolutionsMegaPanel onNavigate={() => setMegaDesktop(null)} />
                  ) : (
                    <ResourcesMegaPanel onNavigate={() => setMegaDesktop(null)} />
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    )

  return (
    <motion.header
      ref={navShellRef}
      variants={fadeUpVariants}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate="visible"
      className={cn(
        'fixed top-0 right-0 left-0 z-[100] overflow-visible pt-[var(--nav-gap-top)] transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || megaDesktop
          ? 'border-b border-[var(--rule)] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur-[14px]'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="relative mx-auto flex h-[var(--nav-height)] max-w-[100vw] items-center justify-end gap-3 px-[var(--pad)] min-[1377px]:grid min-[1377px]:grid-cols-[1fr_auto_1fr] min-[1377px]:justify-items-stretch">
        <Link
          href="/"
          className="absolute top-1/2 left-1/2 flex shrink-0 -translate-x-1/2 -translate-y-1/2 min-[1377px]:relative min-[1377px]:top-auto min-[1377px]:left-auto min-[1377px]:translate-x-0 min-[1377px]:translate-y-0 min-[1377px]:justify-self-start"
          aria-label="RubixKube home"
        >
          <Image
            src="/light-logo.svg"
            alt=""
            width={1720}
            height={200}
            className="h-[18px] w-auto max-w-[min(156px,46vw)] sm:h-5 sm:max-w-[min(176px,44vw)] min-[1920px]:h-6 min-[1920px]:max-w-[min(200px,40vw)] min-[2560px]:h-[26px] min-[2560px]:max-w-[min(220px,38vw)]"
            priority
          />
        </Link>

        <div className="hidden min-w-0 justify-center justify-self-center min-[1377px]:flex">
          <div className="flex items-center justify-center gap-x-6 min-[1600px]:gap-x-8">
            {simpleNavBeforeMega.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    navLinkClass,
                    isActive ? 'text-[var(--blue)]' : 'text-[var(--ink)] hover:text-[var(--blue)]',
                  )}
                >
                  {item.name}
                </Link>
              )
            })}

            <div className="relative flex flex-col items-center" onMouseEnter={() => openMega('solutions')}>
              <button
                type="button"
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1',
                  navLinkClass,
                  isSolutionsNavActive(pathname)
                    ? 'text-[var(--blue)]'
                    : 'text-[var(--ink)] hover:text-[var(--blue)]',
                )}
                aria-expanded={megaDesktop === 'solutions'}
                aria-haspopup="true"
                aria-controls="nav-mega-desktop"
                id="nav-trigger-solutions"
                onClick={() => toggleMega('solutions')}
              >
                Solutions
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 shrink-0 transition-transform',
                    megaDesktop === 'solutions' && 'rotate-180',
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
            </div>

            <Link
              href={pricingNavItem.href}
              className={cn(
                navLinkClass,
                pathname === pricingNavItem.href || pathname.startsWith(`${pricingNavItem.href}/`)
                  ? 'text-[var(--blue)]'
                  : 'text-[var(--ink)] hover:text-[var(--blue)]',
              )}
            >
              {pricingNavItem.name}
            </Link>

            <div className="relative flex flex-col items-center" onMouseEnter={() => openMega('resources')}>
              <button
                type="button"
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1',
                  navLinkClass,
                  isResourcesNavActive(pathname)
                    ? 'text-[var(--blue)]'
                    : 'text-[var(--ink)] hover:text-[var(--blue)]',
                )}
                aria-expanded={megaDesktop === 'resources'}
                aria-haspopup="true"
                aria-controls="nav-mega-desktop"
                id="nav-trigger-resources"
                onClick={() => toggleMega('resources')}
              >
                Resources
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 shrink-0 transition-transform',
                    megaDesktop === 'resources' && 'rotate-180',
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
            </div>

            {simpleNavTail.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    navLinkClass,
                    isActive ? 'text-[var(--blue)]' : 'text-[var(--ink)] hover:text-[var(--blue)]',
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="hidden items-center gap-2 justify-self-end min-[1377px]:flex min-[1377px]:gap-3">
          <ThemeToggle />
          <div className="mr-1 hidden min-[1601px]:flex items-center gap-0.5 border-r border-[var(--rule)] pr-3 min-[1601px]:mr-2 min-[1601px]:pr-4">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
                aria-label={name}
                className="rounded-md p-2 text-[var(--mid)] transition-colors hover:bg-[rgba(17,19,24,0.04)] hover:text-[var(--ink)] min-[1920px]:p-2.5 min-[2560px]:p-3"
              >
                <Icon className="h-[18px] w-[18px] min-[1920px]:h-5 min-[1920px]:w-5 min-[2560px]:h-[22px] min-[2560px]:w-[22px]" strokeWidth={1.75} />
              </Link>
            ))}
          </div>
          <CalendlyBooking url={CALENDLY} variant="outline" size="sm" className={outlineBlueAccentNav}>
            Book Demo
          </CalendlyBooking>
          <Button asChild variant="primary" size="sm" className={launchConsoleClass}>
            <Link href={CONSOLE_URL} target="_blank" rel="noopener noreferrer">
              Launch Console
              <Rocket className="h-3.5 w-3.5 shrink-0 opacity-95" strokeWidth={2.25} aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-2 min-[1377px]:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-md p-2 text-[var(--ink)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {megaPortal}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-[var(--rule)] bg-[var(--bg)] min-[1377px]:hidden"
          >
            <div className="flex max-h-[min(70vh,calc(100dvh-var(--nav-height)))] flex-col gap-1 overflow-y-auto px-[var(--pad)] py-4">
              {simpleNavBeforeMega.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'py-2.5 font-[family-name:var(--font-mono)] text-sm tracking-[0.12em] uppercase',
                      isActive ? 'text-[var(--blue)]' : 'text-[var(--ink)]',
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}

              <div className="border-t border-[var(--rule)] pt-2 mt-1">
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center justify-between py-2.5 font-[family-name:var(--font-mono)] text-sm tracking-[0.12em] uppercase text-left',
                    isSolutionsNavActive(pathname) ? 'text-[var(--blue)]' : 'text-[var(--ink)]',
                  )}
                  aria-expanded={mobileMega === 'solutions'}
                  onClick={() => setMobileMega((m) => (m === 'solutions' ? null : 'solutions'))}
                >
                  Solutions
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform',
                      mobileMega === 'solutions' && 'rotate-180',
                    )}
                    strokeWidth={2}
                  />
                </button>
                {mobileMega === 'solutions' && (
                  <div className="border-l border-[var(--rule)] pl-3 pb-2">
                    <SolutionsMegaPanel onNavigate={closeAll} />
                  </div>
                )}
              </div>

              <Link
                href={pricingNavItem.href}
                className={cn(
                  'py-2.5 font-[family-name:var(--font-mono)] text-sm tracking-[0.12em] uppercase border-t border-[var(--rule)] pt-2 mt-1',
                  pathname === pricingNavItem.href || pathname.startsWith(`${pricingNavItem.href}/`)
                    ? 'text-[var(--blue)]'
                    : 'text-[var(--ink)]',
                )}
                onClick={() => setIsOpen(false)}
              >
                {pricingNavItem.name}
              </Link>

              <div className="border-t border-[var(--rule)] pt-2">
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center justify-between py-2.5 font-[family-name:var(--font-mono)] text-sm tracking-[0.12em] uppercase text-left',
                    isResourcesNavActive(pathname) ? 'text-[var(--blue)]' : 'text-[var(--ink)]',
                  )}
                  aria-expanded={mobileMega === 'resources'}
                  onClick={() => setMobileMega((m) => (m === 'resources' ? null : 'resources'))}
                >
                  Resources
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform',
                      mobileMega === 'resources' && 'rotate-180',
                    )}
                    strokeWidth={2}
                  />
                </button>
                {mobileMega === 'resources' && (
                  <div className="border-l border-[var(--rule)] pl-3 pb-2">
                    <ResourcesMegaPanel onNavigate={closeAll} />
                  </div>
                )}
              </div>

              {simpleNavTail.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'py-2.5 font-[family-name:var(--font-mono)] text-sm tracking-[0.12em] uppercase',
                      isActive ? 'text-[var(--blue)]' : 'text-[var(--ink)]',
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}

              <div className="mt-3 flex items-center gap-2 border-t border-[var(--rule)] pt-4">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="rounded-md p-2.5 text-[var(--mid)] hover:bg-[rgba(17,19,24,0.04)] hover:text-[var(--ink)]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex w-full flex-col gap-3">
                <CalendlyBooking
                  url={CALENDLY}
                  variant="outline"
                  size="sm"
                  className={`w-full ${outlineBlueAccentNav} [&_button]:w-full`}
                  onOpen={() => setIsOpen(false)}
                >
                  Book Demo
                </CalendlyBooking>
                <Button
                  asChild
                  variant="primary"
                  size="sm"
                  className={cn(launchConsoleClass, 'w-full')}
                >
                  <Link
                    href={CONSOLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    Launch Console
                    <Rocket className="h-3.5 w-3.5 shrink-0 opacity-95" strokeWidth={2.25} aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
