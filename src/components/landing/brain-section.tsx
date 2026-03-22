'use client'

import { SectionLabel } from '@/components/ui/section-label'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { BrainIntegrationStrip } from './brain-integration-strip'
import { rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

/** Inbound motion along spokes (satellite → hub), staggered over one cycle. */
const BRAIN_INBOUND_FLOWS = [
  { path: 'M 200 48 L 200 168', begin: '0s' },
  { path: 'M 334 127 L 218 185', begin: '0.43s' },
  { path: 'M 334 273 L 218 215', begin: '0.86s' },
  { path: 'M 200 350 L 200 232', begin: '1.29s' },
  { path: 'M 66 273 L 182 215', begin: '1.72s' },
  { path: 'M 66 127 L 182 185', begin: '2.15s' },
] as const

const BRAIN_FLOW_CYCLE_S = 2.6

export function BrainSection() {
  const reducedMotion = useReducedMotion()
  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] items-center border-t border-[var(--rule)] px-[var(--pad)] py-20 lg:h-[calc(100vh-var(--nav-stack))]">
      <div className="rk-landing-max flex w-full flex-col gap-16 lg:gap-20">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-[120px]">
        <Reveal>
          <SectionLabel>Continuous intelligence</SectionLabel>
          <h2 className="rk-landing-h2-wide mt-0 font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]">
            The more it sees,
            <br />
            the more it <em className="italic text-[var(--blue)]">knows.</em>
          </h2>
          <div
            className={cn(
              'mt-8 space-y-3.5 font-[family-name:var(--font-mono)] font-light leading-relaxed tracking-[-0.01em] text-[var(--mid)]',
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
          <svg
            viewBox="-28 -20 456 440"
            fill="none"
            className="mx-auto h-auto w-full max-w-md"
            aria-hidden
          >
            <defs>
              <marker
                id="brain-flow-in"
                markerWidth="5"
                markerHeight="5"
                refX="3.8"
                refY="2.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0 0 L5 2.5 L0 5 Z" fill="#2f5bff" fillOpacity="0.42" />
              </marker>
            </defs>

            {/* Field + “accumulation” rings — memory deepening, not a one-shot merge */}
            <circle cx="200" cy="200" r="160" stroke="rgba(13,14,18,0.07)" strokeWidth="1" />
            <circle cx="200" cy="200" r="110" stroke="rgba(13,14,18,0.06)" strokeWidth="1" />
            <circle
              cx="200"
              cy="200"
              r="124"
              stroke="#2f5bff"
              strokeWidth="0.45"
              opacity="0.07"
            />
            <circle
              cx="200"
              cy="200"
              r="138"
              stroke="#2f5bff"
              strokeWidth="0.4"
              opacity={reducedMotion ? 0.05 : undefined}
            >
              {!reducedMotion && (
                <animate
                  attributeName="opacity"
                  values="0.04;0.11;0.04"
                  dur="5.5s"
                  repeatCount="indefinite"
                />
              )}
            </circle>

            {/* Core halo — RubixKube mark sits on top after spokes */}
            <circle cx="200" cy="200" r="36" fill="#2f5bff" opacity="0.06" />
            <circle cx="200" cy="200" r="22" fill="#2f5bff" opacity="0.1" />

            {/* Satellites — human feedback slightly larger + ring (teaches the model) */}
            <circle cx="200" cy="42" r="6" fill="#2f5bff" opacity="0.7" />
            <circle cx="340" cy="122" r="6" fill="#2f5bff" opacity="0.55" />
            <circle cx="340" cy="278" r="6" fill="#2f5bff" opacity="0.55" />
            <circle
              cx="200"
              cy="358"
              r="8"
              fill="#2f5bff"
              fillOpacity="0.62"
              stroke="#2f5bff"
              strokeWidth="1.25"
              strokeOpacity="0.45"
            />
            <circle cx="60" cy="278" r="6" fill="#2f5bff" opacity="0.55" />
            <circle cx="60" cy="122" r="6" fill="#2f5bff" opacity="0.7" />

            {/* Inbound streams (straight = steady signals) */}
            <line
              x1="200"
              y1="48"
              x2="200"
              y2="168"
              stroke="#2f5bff"
              strokeWidth="0.75"
              opacity="0.25"
              strokeDasharray="4 4"
              markerEnd="url(#brain-flow-in)"
            />
            <line
              x1="334"
              y1="127"
              x2="218"
              y2="185"
              stroke="#2f5bff"
              strokeWidth="0.75"
              opacity="0.2"
              strokeDasharray="4 4"
              markerEnd="url(#brain-flow-in)"
            />
            <line
              x1="334"
              y1="273"
              x2="218"
              y2="215"
              stroke="#2f5bff"
              strokeWidth="0.75"
              opacity="0.2"
              strokeDasharray="4 4"
              markerEnd="url(#brain-flow-in)"
            />
            <line
              x1="66"
              y1="273"
              x2="182"
              y2="215"
              stroke="#2f5bff"
              strokeWidth="0.75"
              opacity="0.2"
              strokeDasharray="4 4"
              markerEnd="url(#brain-flow-in)"
            />
            <line
              x1="66"
              y1="127"
              x2="182"
              y2="185"
              stroke="#2f5bff"
              strokeWidth="0.75"
              opacity="0.25"
              strokeDasharray="4 4"
              markerEnd="url(#brain-flow-in)"
            />

            {/* Bottom spoke — straight like the others (wavy read as a mistake) */}
            <line
              x1="200"
              y1="350"
              x2="200"
              y2="232"
              stroke="#2f5bff"
              strokeWidth="0.85"
              opacity="0.28"
              strokeDasharray="4 4"
              markerEnd="url(#brain-flow-in)"
            />

            <circle cx="200" cy="92" r="3.5" fill="#2f5bff" opacity="0.35" />
            <circle cx="294" cy="148" r="3.5" fill="#2f5bff" opacity="0.3" />
            <circle cx="294" cy="252" r="3.5" fill="#2f5bff" opacity="0.3" />
            <circle cx="200" cy="308" r="3.5" fill="#2f5bff" opacity="0.3" />
            <circle cx="106" cy="252" r="3.5" fill="#2f5bff" opacity="0.3" />
            <circle cx="106" cy="148" r="3.5" fill="#2f5bff" opacity="0.35" />

            {!reducedMotion &&
              BRAIN_INBOUND_FLOWS.map(({ path, begin }) => (
                <circle key={path} r="2.25" fill="#2f5bff" fillOpacity="0.65">
                  <animateMotion
                    dur={`${BRAIN_FLOW_CYCLE_S}s`}
                    repeatCount="indefinite"
                    begin={begin}
                    path={path}
                    calcMode="linear"
                  />
                </circle>
              ))}

            <image
              href="/logo-icon.png"
              x={184}
              y={184}
              width={32}
              height={32}
              preserveAspectRatio="xMidYMid meet"
            />

            <text
              x="200"
              y="30"
              textAnchor="middle"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#6b6d78', letterSpacing: '0.08em' }}
            >
              RCA REPORTS
            </text>
            <text
              x="354"
              y="122"
              textAnchor="start"
              dominantBaseline="middle"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#6b6d78', letterSpacing: '0.08em' }}
            >
              CHAT
            </text>
            <text
              x="354"
              y="278"
              textAnchor="start"
              dominantBaseline="middle"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#6b6d78', letterSpacing: '0.08em' }}
            >
              ANOMALIES
            </text>
            <text
              x="200"
              y="382"
              textAnchor="middle"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#6b6d78', letterSpacing: '0.08em' }}
            >
              HUMAN FEEDBACK
            </text>
            <text x="48" y="282" textAnchor="end" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#6b6d78', letterSpacing: '0.08em' }}>
              SIGNALS
            </text>
            <text x="48" y="118" textAnchor="end" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#6b6d78', letterSpacing: '0.08em' }}>
              TOPOLOGY
            </text>
          </svg>
        </Reveal>
        </div>

        <Reveal delay={0.2}>
          <BrainIntegrationStrip />
        </Reveal>
      </div>
    </section>
  )
}
