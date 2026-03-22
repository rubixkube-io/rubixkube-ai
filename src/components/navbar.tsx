'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Linkedin, Github, Slack, Rocket } from 'lucide-react'
import { CalendlyBooking } from '@/components/ui/calendly-booking'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants } from '@/lib/animations'
import { outlineBlueAccentNav } from '@/lib/outline-blue-cta'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Platform', href: '/platform' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
  { name: 'Our Story', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const

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

/** Primary nav CTA — solid brand blue, aligned height with Book Demo */
const launchConsoleClass =
  '!rounded-[5px] !py-[9px] !px-5 !text-[10px] !tracking-[0.12em] !font-medium !gap-1.5 shadow-[0_1px_2px_rgba(17,19,24,0.06)] transition-[box-shadow,opacity] duration-200 hover:!opacity-100 hover:shadow-[0_4px_20px_rgba(47,91,255,0.38)] active:translate-y-px active:shadow-[0_1px_4px_rgba(47,91,255,0.25)]'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()

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

  return (
    <motion.header
      variants={fadeUpVariants}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate="visible"
      className={cn(
        'fixed top-0 right-0 left-0 z-[100] h-16 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-[var(--rule)] bg-[rgba(242,240,235,0.92)] backdrop-blur-[14px]'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto grid h-full max-w-[100vw] grid-cols-[1fr_auto] items-center gap-3 px-[var(--pad)] lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Link
          href="/"
          className="flex shrink-0 items-center justify-self-start"
          aria-label="RubixKube home"
        >
          <Image
            src="/light-logo.svg"
            alt=""
            width={1720}
            height={200}
            className="h-[18px] w-auto max-w-[min(156px,46vw)] sm:h-5 sm:max-w-[min(176px,44vw)]"
            priority
          />
        </Link>

        <div className="hidden min-w-0 justify-center justify-self-center lg:flex">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 xl:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] text-[var(--mid)] uppercase transition-colors hover:text-[var(--ink)] xl:text-[11px]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-2 justify-self-end lg:flex xl:gap-3">
          <div className="mr-1 flex items-center gap-0.5 border-r border-[var(--rule)] pr-3 xl:mr-2 xl:pr-4">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
                aria-label={name}
                className="rounded-md p-2 text-[var(--mid)] transition-colors hover:bg-[rgba(17,19,24,0.04)] hover:text-[var(--ink)]"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
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

        <button
          type="button"
          className="justify-self-end rounded-md p-2 text-[var(--ink)] lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-[var(--rule)] bg-[var(--bg)] lg:hidden"
          >
            <div className="flex max-h-[min(70vh,calc(100dvh-4rem))] flex-col gap-1 overflow-y-auto px-[var(--pad)] py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2.5 font-[family-name:var(--font-mono)] text-sm tracking-[0.12em] text-[var(--ink)] uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
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
