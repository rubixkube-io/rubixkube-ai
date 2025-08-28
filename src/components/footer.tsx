'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants } from '@/lib/animations'
import { Linkedin, Github } from 'lucide-react'

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/platform' },
      { label: 'Security', href: '/platform/security' },
      { label: 'Changelog', href: '/changelog' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press Kit', href: '/press' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' }
    ]
  }
]

const socialLinks = [
  { platform: 'LinkedIn', href: 'https://linkedin.com/company/rubixkube', iconType: 'linkedin' },
  { platform: 'GitHub', href: 'https://github.com/rubixkube-io', iconType: 'github' }
]

export function Footer() {
  const prefersReducedMotion = useReducedMotion()

  // Function to render social icons
  const renderSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'linkedin':
        return <Linkedin className="w-6 h-6" />
      case 'github':
        return <Github className="w-6 h-6" />
      default:
        return null
    }
  }

  return (
    <footer className="bg-slate-900 dark:bg-slate-900 text-white">
      <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] px-6 md:px-8 py-16">
        {/* One-liner about SRI */}
        <motion.div
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          className="text-center mb-12"
        >
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            RubixKube is Site Reliability Intelligence. Agents that see more, 
            plan better, act safely, and learn forever.
          </p>
        </motion.div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((column, index) => (
            <motion.div
              key={column.title}
              variants={fadeUpVariants}
              initial={prefersReducedMotion ? "visible" : "hidden"}
              animate="visible"
              transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
            >
              <h3 className="font-heading font-semibold text-white mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={fadeUpVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          transition={prefersReducedMotion ? {} : { delay: 0.4 }}
          className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo-icon.png"
                alt="RubixKube Logo"
                width={24}
                height={24}
                className="h-6 w-auto"
              />
              <Image 
                src="/logo-text.svg" 
                alt="RubixKube" 
                width={100}
                height={20}
                className="h-5 w-auto invert" 
              />
            </Link>
            <span className="text-slate-400 text-sm">
              © 2025 All rights reserved.
            </span>
          </div>
          
          {/* Social Links & AI Access */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors duration-200 hover:scale-110 transition-transform p-1"
                title={social.platform}
              >
                {renderSocialIcon(social.iconType)}
              </Link>
            ))}
            <Link
              href="/llms.txt"
              className="text-slate-400 hover:text-slate-300 transition-colors duration-200 text-xs"
              title="AI access preferences"
            >
              AI access
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}