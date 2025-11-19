'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUpVariants, fadeUp } from '@/lib/animations'

export function TrustedBy() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        {/* Title Card - Mobile Only */}
        <motion.div
          variants={fadeUpVariants}
          {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
          className="sm:hidden mb-6 bg-background border border-border/40 rounded-2xl p-4 shadow-xl flex flex-col justify-center space-y-2"
        >
          <h2 className="text-lg font-semibold text-foreground text-center">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xs text-foreground-muted text-center">
            Proudly partnering with leading platforms and innovative startups to build reliable, self-healing infrastructure
          </p>
        </motion.div>

        {/* Bento Grid with Centered Title */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 auto-rows-[80px] sm:auto-rows-[90px] md:auto-rows-[100px]">
          {/* Row 1: GCP (large left), Title Card (center - hidden on mobile), NVIDIA (large right) */}
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : fadeUp)}
            className="col-span-1 sm:col-span-2 md:col-span-2 row-span-2 bg-white rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/gcp.png" alt="GCP" width={140} height={50} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          {/* Title Card - Centered (Hidden on mobile) */}
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.1 } })}
            className="hidden sm:flex col-span-4 md:col-span-2 row-span-2 bg-background border border-border/40 rounded-2xl p-5 md:p-6 shadow-xl flex-col justify-center space-y-3 md:space-y-4"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground text-center">
              Trusted by Industry Leaders
            </h2>
            <p className="text-sm md:text-base text-foreground-muted text-center">
              Proudly partnering with leading platforms and innovative startups to build reliable, self-healing infrastructure
            </p>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.04 } })}
            className="col-span-1 sm:col-span-2 md:col-span-2 row-span-2 bg-white rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/nvidia-inception-program-badge-rgb-for-screen.png" alt="NVIDIA Inception" width={140} height={50} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          {/* Row 2: MongoDB, Neo4j, AWS (wide), DigitalOcean, Auth0 */}
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.08 } })}
            className="col-span-1 sm:col-span-1 md:col-span-1 row-span-1 bg-white rounded-lg p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/mongodb.svg" alt="MongoDB" width={100} height={35} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.12 } })}
            className="col-span-1 sm:col-span-1 md:col-span-1 row-span-1 bg-white rounded-lg p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/neo4j.svg" alt="Neo4j" width={100} height={35} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.16 } })}
            className="col-span-2 sm:col-span-2 md:col-span-2 row-span-1 bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/aws.svg" alt="AWS" width={80} height={30} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.2 } })}
            className="col-span-1 sm:col-span-1 md:col-span-1 row-span-1 bg-white rounded-lg p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/digitalocean.svg" alt="DigitalOcean" width={100} height={35} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.24 } })}
            className="col-span-1 sm:col-span-1 md:col-span-1 row-span-1 bg-white rounded-lg p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/auth0.svg" alt="Auth0" width={100} height={35} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          {/* Row 3: Yellow.ai, Fleek, Anthropic (wide), Vishanti, Sheshi.ai */}
          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.28 } })}
            className="col-span-1 sm:col-span-1 md:col-span-1 row-span-1 bg-white rounded-lg p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/yellow-ai.png" alt="Yellow.ai" width={90} height={30} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.32 } })}
            className="col-span-1 sm:col-span-1 md:col-span-1 row-span-1 bg-white rounded-lg p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/fleek.png" alt="Fleek" width={90} height={30} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.36 } })}
            className="col-span-2 sm:col-span-2 md:col-span-2 row-span-1 bg-white rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/anthropic.webp" alt="Anthropic" width={110} height={40} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.4 } })}
            className="col-span-1 sm:col-span-1 md:col-span-1 row-span-1 bg-white rounded-lg p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/vishanti.png" alt="Vishanti" width={90} height={30} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            {...(prefersReducedMotion ? { initial: "visible" } : { ...fadeUp, transition: { delay: 0.44 } })}
            className="col-span-1 sm:col-span-1 md:col-span-1 row-span-1 bg-white rounded-lg p-2 sm:p-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-center group"
          >
            <Image src="/logos/Sheshi-ai.svg" alt="Sheshi.ai" width={90} height={30} className="object-contain max-w-full h-auto group-hover:scale-105 transition-transform duration-300" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
