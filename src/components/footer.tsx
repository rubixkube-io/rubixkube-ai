'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants } from '@/lib/animations'
import { Linkedin, Github, Slack } from 'lucide-react'

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our story', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resources', href: '/resources' },
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: 'https://docs.rubixkube.ai/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
    ],
  },
]

const socialLinks = [
  { platform: 'LinkedIn', href: 'https://linkedin.com/company/rubixkube', iconType: 'linkedin' },
  { platform: 'GitHub', href: 'https://github.com/rubixkube-io', iconType: 'github' },
  {
    platform: 'Slack',
    href: 'https://join.slack.com/t/rubixkubecommunity/shared_invite/zt-3fq7kiu8k-RC5uzLY6BjQFE5Uq_NziEA',
    iconType: 'slack',
  },
]

function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case 'linkedin':
      return <Linkedin className="h-5 w-5" />
    case 'github':
      return <Github className="h-5 w-5" />
    case 'slack':
      return <Slack className="h-5 w-5" />
    default:
      return null
  }
}

/** Inner footer columns + tagline (used inside standard `Footer` and homepage `LandingFooter`). */
export function FooterBody() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <motion.p
        variants={fadeUpVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto mb-14 max-w-2xl text-center font-[family-name:var(--font-mono)] text-sm font-light leading-relaxed text-[var(--mid)]"
      >
        RubixKube is Site Reliability Intelligence: see more, plan better, act safely, and learn with every
        incident.
      </motion.p>

      <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
        {footerColumns.map((column) => (
          <motion.div
            key={column.title}
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--ink)] uppercase">
              {column.title}
            </h3>
            <ul className="space-y-2.5">
                {column.links.map((link) => {
                  const external = link.href.startsWith('http')
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-[family-name:var(--font-mono)] text-xs font-light text-[var(--mid)] transition-colors hover:text-[var(--ink)]"
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUpVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center justify-between gap-6 border-t border-[var(--rule)] pt-8 sm:flex-row"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo-icon.png" alt="" width={24} height={24} className="h-6 w-6 rounded" />
            <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--ink)] uppercase">
              RubixKube
            </span>
          </Link>
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-5">
          {socialLinks.map((social) => (
            <Link
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--mid)] transition-colors hover:text-[var(--ink)]"
              title={social.platform}
            >
              <SocialIcon type={social.iconType} />
            </Link>
          ))}
          <Link
            href="/llms.txt"
            className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.08em] text-[var(--text-muted)] uppercase hover:text-[var(--mid)]"
          >
            AI access
          </Link>
        </div>
      </motion.div>
    </>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--background-secondary)]">
      <div className="px-[var(--pad)] py-16 md:py-20">
        <div className="rk-landing-max w-full">
          <FooterBody />
        </div>
      </div>
    </footer>
  )
}
