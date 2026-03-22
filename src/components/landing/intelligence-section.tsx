'use client'

import { useId } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/section-label'
import { landingCtaArrowSmClass, landingCtaLinkSm } from '@/lib/landing-inline-cta'
import { rkMono9, rkMono11, rkMono13, rkMono15Lead } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

const HX = 55
const HY = 58
const G = '#c4c5cc'
const B = '#2f5bff'

/** Shared node ring — infra “satellites” around the core observer */
const NODES = {
  t: { x: 55, y: 14 },
  tr: { x: 88, y: 32 },
  br: { x: 90, y: 78 },
  b: { x: 55, y: 100 },
  bl: { x: 20, y: 78 },
  tl: { x: 22, y: 32 },
} as const

type StoryStage = 0 | 1 | 2 | 3

/** Roll-up point on bottom spoke (symptom → model), one kink — not stacked arrows */
const CHAIN_Y = 83

/**
 * Staged story — flow **inward** (signals / evidence → core), not broadcast outward.
 * 0 — Topology: grey discovery, scan ring
 * 1 — Dependencies: observation + peer links (chords mostly undirected)
 * 2 — Causality: everything feeding hub; one clean bottom rollup + light lateral hint
 * 3 — Yours: full mesh feeding the core + boundary
 */
function IntelligenceStoryGraph({ stage }: { stage: StoryStage }) {
  const rid = useId().replace(/:/g, '')
  const arrow = `intel-a-${rid}`
  const arrowFaint = `intel-af-${rid}`

  const svgCls = 'mx-auto h-[120px] w-[75%] max-w-[120px] shrink-0'

  return (
    <svg viewBox="0 0 110 118" fill="none" className={svgCls} aria-hidden>
      <defs>
        <marker
          id={arrow}
          markerWidth="5"
          markerHeight="5"
          refX="4.2"
          refY="2.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0 0 L5 2.5 L0 5 Z" fill={B} fillOpacity="0.55" />
        </marker>
        <marker
          id={arrowFaint}
          markerWidth="4"
          markerHeight="4"
          refX="3.5"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0 0 L4 2 L0 4 Z" fill={B} fillOpacity="0.35" />
        </marker>
      </defs>

      {/* Stage 0–3: optional boundary (ownership) */}
      {stage >= 3 && (
        <rect
          x="6"
          y="6"
          width="98"
          height="106"
          rx="14"
          stroke={B}
          strokeOpacity="0.14"
          strokeWidth="1"
          fill="none"
        />
      )}

      {/* Scan ring — first contact with the graph */}
      {stage === 0 && (
        <ellipse
          cx={HX}
          cy={HY}
          rx="42"
          ry="38"
          stroke={G}
          strokeWidth="0.75"
          strokeDasharray="3 4"
          opacity="0.55"
        />
      )}

      {/* Hub-to-satellite edges */}
      {stage === 0 && (
        <>
          <line x1={HX} y1={HY} x2={NODES.t.x} y2={NODES.t.y} stroke={G} strokeWidth="1" />
          <line x1={HX} y1={HY} x2={NODES.tr.x} y2={NODES.tr.y} stroke={G} strokeWidth="1" />
          <line x1={HX} y1={HY} x2={NODES.br.x} y2={NODES.br.y} stroke={G} strokeWidth="1" />
          <line x1={HX} y1={HY} x2={NODES.b.x} y2={NODES.b.y} stroke={G} strokeWidth="1" />
          <line x1={HX} y1={HY} x2={NODES.bl.x} y2={NODES.bl.y} stroke={G} strokeWidth="1" />
          <line x1={HX} y1={HY} x2={NODES.tl.x} y2={NODES.tl.y} stroke={G} strokeWidth="1" />
        </>
      )}

      {stage === 1 && (
        <>
          {/* Evidence / deps flowing **into** the observer */}
          <line
            x1={NODES.tr.x}
            y1={NODES.tr.y}
            x2={HX}
            y2={HY}
            stroke={B}
            strokeWidth="1.1"
            strokeOpacity="0.5"
            markerEnd={`url(#${arrow})`}
          />
          <line
            x1={NODES.br.x}
            y1={NODES.br.y}
            x2={HX}
            y2={HY}
            stroke={B}
            strokeWidth="1.1"
            strokeOpacity="0.45"
            markerEnd={`url(#${arrow})`}
          />
          <line
            x1={NODES.tl.x}
            y1={NODES.tl.y}
            x2={HX}
            y2={HY}
            stroke={B}
            strokeWidth="1"
            strokeOpacity="0.35"
            markerEnd={`url(#${arrowFaint})`}
          />
          <line x1={NODES.t.x} y1={NODES.t.y} x2={HX} y2={HY} stroke={G} strokeWidth="0.9" strokeOpacity="0.85" />
          <line x1={NODES.b.x} y1={NODES.b.y} x2={HX} y2={HY} stroke={G} strokeWidth="0.9" strokeOpacity="0.85" />
          <line x1={NODES.bl.x} y1={NODES.bl.y} x2={HX} y2={HY} stroke={G} strokeWidth="0.9" strokeOpacity="0.85" />
          {/* Peer topology — undirected chords (no “broadcast” arrow) */}
          <line
            x1={NODES.tl.x}
            y1={NODES.tl.y}
            x2={NODES.tr.x}
            y2={NODES.tr.y}
            stroke={B}
            strokeWidth="0.85"
            strokeOpacity="0.32"
          />
          <line x1={NODES.tr.x} y1={NODES.tr.y} x2={NODES.br.x} y2={NODES.br.y} stroke={B} strokeWidth="0.9" strokeOpacity="0.34" />
          <line x1={NODES.bl.x} y1={NODES.bl.y} x2={NODES.br.x} y2={NODES.br.y} stroke={B} strokeWidth="0.75" strokeOpacity="0.28" />
        </>
      )}

      {stage === 2 && (
        <>
          <line x1={NODES.t.x} y1={NODES.t.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.45" markerEnd={`url(#${arrow})`} />
          <line x1={NODES.tr.x} y1={NODES.tr.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.55" markerEnd={`url(#${arrow})`} />
          <line x1={NODES.br.x} y1={NODES.br.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.5" markerEnd={`url(#${arrow})`} />
          <line x1={NODES.bl.x} y1={NODES.bl.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.45" markerEnd={`url(#${arrow})`} />
          <line x1={NODES.tl.x} y1={NODES.tl.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.4" markerEnd={`url(#${arrow})`} />
          {/* Bottom rollup: one spine, **single** arrow into hub (no triple stack) */}
          <line x1={NODES.b.x} y1={NODES.b.y} x2={55} y2={CHAIN_Y} stroke={B} strokeWidth="1" strokeOpacity="0.42" />
          <line
            x1={55}
            y1={CHAIN_Y}
            x2={HX}
            y2={HY}
            stroke={B}
            strokeWidth="1.15"
            strokeOpacity="0.52"
            markerEnd={`url(#${arrow})`}
          />
          {/* Lateral “pattern” hint: correlated path, dashed — touches real nodes */}
          <line
            x1={NODES.bl.x}
            y1={NODES.bl.y}
            x2={NODES.tr.x}
            y2={NODES.tr.y}
            stroke={B}
            strokeWidth="0.75"
            strokeOpacity="0.22"
            strokeDasharray="3 3"
          />
        </>
      )}

      {stage === 3 && (
        <>
          <line x1={NODES.t.x} y1={NODES.t.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.55" markerEnd={`url(#${arrow})`} />
          <line x1={NODES.tr.x} y1={NODES.tr.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.6" markerEnd={`url(#${arrow})`} />
          <line x1={NODES.br.x} y1={NODES.br.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.55" markerEnd={`url(#${arrow})`} />
          <line x1={NODES.bl.x} y1={NODES.bl.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.55" markerEnd={`url(#${arrow})`} />
          <line x1={NODES.tl.x} y1={NODES.tl.y} x2={HX} y2={HY} stroke={B} strokeWidth="1" strokeOpacity="0.5" markerEnd={`url(#${arrow})`} />
          {/* Ring — structure only; flow is radial inward */}
          <line x1={NODES.t.x} y1={NODES.t.y} x2={NODES.tr.x} y2={NODES.tr.y} stroke={B} strokeWidth="0.75" strokeOpacity="0.35" />
          <line x1={NODES.tr.x} y1={NODES.tr.y} x2={NODES.br.x} y2={NODES.br.y} stroke={B} strokeWidth="0.75" strokeOpacity="0.38" />
          <line x1={NODES.br.x} y1={NODES.br.y} x2={NODES.b.x} y2={NODES.b.y} stroke={B} strokeWidth="0.75" strokeOpacity="0.35" />
          <line x1={NODES.b.x} y1={NODES.b.y} x2={NODES.bl.x} y2={NODES.bl.y} stroke={B} strokeWidth="0.75" strokeOpacity="0.35" />
          <line x1={NODES.bl.x} y1={NODES.bl.y} x2={NODES.tl.x} y2={NODES.tl.y} stroke={B} strokeWidth="0.75" strokeOpacity="0.35" />
          <line x1={NODES.tl.x} y1={NODES.tl.y} x2={NODES.t.x} y2={NODES.t.y} stroke={B} strokeWidth="0.75" strokeOpacity="0.35" />
          <line x1={NODES.tl.x} y1={NODES.tl.y} x2={NODES.tr.x} y2={NODES.tr.y} stroke={B} strokeWidth="0.65" strokeOpacity="0.28" />
          <line x1={NODES.bl.x} y1={NODES.bl.y} x2={NODES.br.x} y2={NODES.br.y} stroke={B} strokeWidth="0.65" strokeOpacity="0.28" />
          {/* Bottom spoke: same single rollup as stage 2, reinforced */}
          <line x1={NODES.b.x} y1={NODES.b.y} x2={55} y2={CHAIN_Y} stroke={B} strokeWidth="1.05" strokeOpacity="0.5" />
          <line
            x1={55}
            y1={CHAIN_Y}
            x2={HX}
            y2={HY}
            stroke={B}
            strokeWidth="1.15"
            strokeOpacity="0.58"
            markerEnd={`url(#${arrow})`}
          />
        </>
      )}

      {/* Nodes (draw on top) */}
      {stage === 0 && (
        <>
          <circle cx={HX} cy={HY} r="7" fill={B} fillOpacity="0.92" />
          <circle cx={NODES.t.x} cy={NODES.t.y} r="3.5" fill={G} />
          <circle cx={NODES.tr.x} cy={NODES.tr.y} r="3.5" fill={G} />
          <circle cx={NODES.br.x} cy={NODES.br.y} r="3.5" fill={G} />
          <circle cx={NODES.b.x} cy={NODES.b.y} r="3.5" fill={G} />
          <circle cx={NODES.bl.x} cy={NODES.bl.y} r="3.5" fill={G} />
          <circle cx={NODES.tl.x} cy={NODES.tl.y} r="3.5" fill={G} />
        </>
      )}

      {stage === 1 && (
        <>
          <circle cx={HX} cy={HY} r="7" fill={B} />
          <circle cx={NODES.t.x} cy={NODES.t.y} r="3.5" fill={G} fillOpacity="0.9" />
          <circle cx={NODES.tr.x} cy={NODES.tr.y} r="4" fill={B} fillOpacity="0.5" />
          <circle cx={NODES.br.x} cy={NODES.br.y} r="4" fill={B} fillOpacity="0.48" />
          <circle cx={NODES.b.x} cy={NODES.b.y} r="3.5" fill={G} fillOpacity="0.9" />
          <circle cx={NODES.bl.x} cy={NODES.bl.y} r="3.5" fill={G} fillOpacity="0.9" />
          <circle cx={NODES.tl.x} cy={NODES.tl.y} r="3.5" fill={B} fillOpacity="0.4" />
        </>
      )}

      {stage === 2 && (
        <>
          <circle cx={HX} cy={HY} r="7" fill={B} />
          <circle cx={NODES.t.x} cy={NODES.t.y} r="3.5" fill={B} fillOpacity="0.45" />
          <circle cx={NODES.tr.x} cy={NODES.tr.y} r="4" fill={B} fillOpacity="0.58" />
          <circle cx={NODES.br.x} cy={NODES.br.y} r="4" fill={B} fillOpacity="0.55" />
          <circle cx={NODES.b.x} cy={NODES.b.y} r="4" fill={B} fillOpacity="0.62" />
          <circle cx={NODES.bl.x} cy={NODES.bl.y} r="3.5" fill={B} fillOpacity="0.48" />
          <circle cx={NODES.tl.x} cy={NODES.tl.y} r="3.5" fill={B} fillOpacity="0.42" />
          <circle cx="55" cy={CHAIN_Y} r="3" fill={B} fillOpacity="0.52" />
        </>
      )}

      {stage === 3 && (
        <>
          <circle cx={HX} cy={HY} r="8" fill={B} />
          <circle cx={NODES.t.x} cy={NODES.t.y} r="3.5" fill={B} fillOpacity="0.72" />
          <circle cx={NODES.tr.x} cy={NODES.tr.y} r="4" fill={B} fillOpacity="0.78" />
          <circle cx={NODES.br.x} cy={NODES.br.y} r="4" fill={B} fillOpacity="0.75" />
          <circle cx={NODES.b.x} cy={NODES.b.y} r="4" fill={B} fillOpacity="0.8" />
          <circle cx={NODES.bl.x} cy={NODES.bl.y} r="3.5" fill={B} fillOpacity="0.74" />
          <circle cx={NODES.tl.x} cy={NODES.tl.y} r="3.5" fill={B} fillOpacity="0.72" />
          <circle cx="55" cy={CHAIN_Y} r="3.25" fill={B} fillOpacity="0.7" />
        </>
      )}
    </svg>
  )
}

const cards = [
  { time: 'Day 1', title: 'Topology', em: 'mapped.', desc: 'Every service, node, and edge. Automatically.', stage: 0 as const },
  { time: 'Week 1', title: 'Dependencies', em: 'understood.', desc: 'Upstream and downstream relationships known.', stage: 1 as const },
  { time: 'Month 1', title: 'Causality', em: 'emerging.', desc: 'Failure patterns surface before they fire.', stage: 2 as const },
  { time: 'Always', title: 'Yours,', em: 'entirely.', desc: 'A model no other tool has. Built only by being there.', stage: 3 as const },
] as const

function intelCardClass(i: number) {
  /* lg:flex-1 = equal column widths; no flex-1 on inner blocks so card height stays content-sized */
  const base = 'flex flex-col py-10 lg:min-w-0 lg:flex-1 lg:py-8'
  /* Horizontal padding lives on the section — only gutters between columns here */
  if (i === 0)
    return `${base} border-b border-[var(--rule)] max-lg:last:border-b-0 lg:border-b-0 lg:border-r lg:pl-0 lg:pr-12`
  if (i === cards.length - 1)
    return `${base} border-b-0 max-lg:border-b-0 lg:pl-12 lg:pr-0`
  return `${base} border-b border-[var(--rule)] max-lg:last:border-b-0 lg:border-b-0 lg:border-r lg:px-12`
}

export function IntelligenceSection() {
  return (
    <section className="landing-snap-section flex min-h-[calc(100vh-var(--nav-stack))] flex-col justify-center border-t border-[var(--rule)] px-[var(--pad)] lg:h-[calc(100vh-var(--nav-stack))]">
      <div className="rk-landing-max flex w-full shrink-0 flex-col">
        <div className="grid shrink-0 grid-cols-1 items-start gap-12 pt-[52px] pb-10 md:grid-cols-2 md:items-end md:gap-20">
        <Reveal>
          <SectionLabel className="mb-9">The intelligence layer</SectionLabel>
          <h2 className="rk-landing-h2-compact font-[family-name:var(--font-serif)] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]">
            Most tools see your
            <br />
            infrastructure for the
            <br />
            first time, <em className="italic text-[var(--blue)]">every time.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            className={cn(
              'intel-body font-[family-name:var(--font-mono)] font-light leading-[1.65] tracking-[-0.01em] text-[var(--mid)]',
              rkMono13,
            )}
          >
            <p>
              <span
                className={cn(
                  'font-medium text-[var(--blue)] decoration-1',
                  rkMono15Lead,
                )}
              >
                RubixKube remembers.
              </span>
            </p>
            <p className="mt-3.5">
              Every signal, session, and resolution builds a deeper model of your system.
              <br />
              One that compounds over time and belongs entirely to you.
            </p>
            <Link
              href="https://docs.rubixkube.ai/concepts/memory-engine"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 w-fit ${landingCtaLinkSm}`}
            >
              Learn more about Memory Engine
              <ArrowRight className={landingCtaArrowSmClass} strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </Reveal>
        </div>

        <div className="flex h-9 shrink-0 items-center border-b border-[var(--rule)]">
        <span
          className={cn(
            'font-[family-name:var(--font-mono)] tracking-[0.22em] text-[var(--text-muted)] uppercase',
            rkMono9,
          )}
        >
          Compounding memory
        </span>
        </div>

        {/* Content-sized row; section justify-center vertically centers the whole block */}
        <div className="flex shrink-0 flex-col pt-8 pb-10 lg:flex-row lg:items-start">
          {cards.map((c, i) => (
            <Reveal key={c.time} delay={0.05 * i} className={intelCardClass(i)}>
              <p
                className={cn(
                  'mb-5 font-[family-name:var(--font-mono)] tracking-[0.2em] text-[var(--blue)] uppercase',
                  rkMono9,
                )}
              >
                {c.time}
              </p>
              <h3 className="mb-2 font-[family-name:var(--font-serif)] text-2xl font-light leading-[1.1] tracking-[-0.01em] text-[var(--ink)]">
                {c.title}
                <br />
                <em className="italic text-[var(--blue)]">{c.em}</em>
              </h3>
              <p
                className={cn(
                  'mb-6 font-[family-name:var(--font-mono)] font-light leading-[1.65] tracking-[-0.01em] text-[var(--mid)]',
                  rkMono11,
                )}
              >
                {c.desc}
              </p>
              <div className="card-graph flex h-[120px] shrink-0 items-center justify-center">
                <IntelligenceStoryGraph stage={c.stage} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
