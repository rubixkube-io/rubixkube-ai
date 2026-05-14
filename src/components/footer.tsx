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
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Resources', href: '/resources' },
      { label: 'Blog', href: '/blog' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'Docs', href: 'https://docs.rubixkube.ai/' },
      { label: 'Rubix CLI', href: '/products/rubix-cli' },
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

      <div className="mb-14 grid grid-cols-2 items-start gap-10 md:grid-cols-5 md:gap-6 lg:gap-8">
        {footerColumns.map((column) => (
          <motion.div
            key={column.title}
            variants={fadeUpVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="border-b border-[var(--rule)] pb-3 mb-4 font-[family-name:var(--font-serif)] text-[1.0625rem] font-light leading-none tracking-[-0.02em] text-[var(--ink)] sm:text-lg min-[1920px]:text-[1.25rem]">
              {column.title}
            </h3>
            <ul className="space-y-2 pt-1">
                {column.links.map((link) => {
                  const external = link.href.startsWith('http')
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-[family-name:var(--font-mono)] text-[10px] font-light leading-relaxed tracking-[0.04em] text-[var(--text-muted)] transition-colors hover:text-[var(--ink)] sm:text-[11px] min-[1920px]:text-xs"
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
        <motion.div
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          className="col-span-2 flex justify-start self-start md:col-span-1"
        >
          <Image
            src="/logos/nvidia-inception-program-badge-rgb-for-screen.png"
            alt="NVIDIA Inception Program"
            width={320}
            height={128}
            className="h-12 w-auto max-w-full object-contain object-left sm:h-14 md:h-16 lg:h-[4.5rem] min-[1920px]:h-[5rem] min-[2560px]:h-[5.25rem]"
          />
        </motion.div>
      </div>

      {/* Large subtle footer logo */}
      <motion.div
        variants={fadeUpVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true }}
        className="pointer-events-none mb-12 flex select-none justify-center px-4"
        aria-hidden="true"
      >
        <Image
          src="/light-logo.svg"
          alt="RubixKube"
          width={1720}
          height={200}
          className="h-auto w-full object-contain brightness-0 opacity-20 transition-opacity duration-500 hover:opacity-30"
          priority={false}
        />
      </motion.div>

      <motion.div
        variants={fadeUpVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col items-center justify-between gap-6 border-t border-[var(--rule)] pt-8 sm:flex-row"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--ink)] uppercase hover:text-[var(--blue)] transition-colors">
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
          <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.08em] text-[var(--text-muted)] uppercase">
            <Link href="/llms.txt" className="hover:text-[var(--mid)]">
              llms.txt
            </Link>
            <span className="mx-1.5 text-[var(--rule)]" aria-hidden>
              ·
            </span>
            <Link href="/llms-full.txt" className="hover:text-[var(--mid)]">
              full
            </Link>
          </span>
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
