'use client'

import { SectionLabel } from '@/components/ui/section-label'
import { BrainIntegrationStrip } from './brain-integration-strip'
import { rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { MemoryGraph } from './memory-graph'


/** `integrations` adds the tools strip under it; the platform page shows that strip on its own */
export function BrainSection({ integrations = true }: { integrations?: boolean } = {}) {
  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] items-center border-t border-[var(--rule)] px-[var(--pad)] py-20 lg:h-[calc(100vh-var(--nav-stack))] lg:py-10 min-[1600px]:py-20">
      <div className="rk-landing-max flex w-full flex-col gap-16 lg:gap-12 min-[1600px]:gap-20">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-[120px]">
        <Reveal>
          <SectionLabel>Continuous intelligence</SectionLabel>
          <h2 className="rk-landing-h2-wide mt-0 rk-section-title text-[var(--ink)]">
            The more it sees,
            <br />
            the more it <em className="italic text-[var(--blue)]">knows.</em>
          </h2>
          <div
            className={cn(
              'mt-8 space-y-3.5 rk-section-body text-[var(--mid)]',
              rkMono13,
            )}
          >
            <p>
              Investigations are not episodic. Every conversation, every RCA, every human correction feeds the
              same growing model. Indexes rebuild, connections deepen, and the system&apos;s understanding of your
              stack expands with every passing day.
            </p>
            <p>
              The result is persistent context. RubixKube doesn&apos;t wake up when an alert fires. It has been
              observing continuously, getting sharper with every signal it sees.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="w-full">
          <MemoryGraph className="mx-auto block aspect-square w-full max-w-[30rem] lg:max-w-[min(30rem,calc(100vh-var(--nav-stack)-21rem))]" />
        </Reveal>
        </div>

        {integrations && (
          <Reveal delay={0.2}>
            <BrainIntegrationStrip />
          </Reveal>
        )}
      </div>
    </section>
  )
}
