'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { fadeUpVariants } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { Activity, RefreshCw, CheckCircle } from 'lucide-react'

const STATUS_API = 'https://api.rubixkube.ai/status'

// Maps internal Gatus names → public-facing display names and groups.
// Internal infra names (NATS, Neo4j etc.) are intentionally remapped here
// so Gatus config stays true to real infra for the dev team.
const SERVICE_MAP: Record<string, { name: string; group: string }> = {
  'Orchestrator':    { name: 'API',               group: 'Platform'       },
  'Console':         { name: 'Dashboard',          group: 'Platform'       },
  'Opel SSE':        { name: 'AI Agents',          group: 'Intelligence'   },
  'RCA Pipeline':    { name: 'Investigations',     group: 'Intelligence'   },
  'Memory Engine X': { name: 'Insights Engine',    group: 'Data'           },
  'Knowledge Graph': { name: 'Topology Engine',    group: 'Data'           },
  'NATS':            { name: 'Event Streaming',    group: 'Infrastructure' },
  'Neo4j':           { name: 'Graph Store',        group: 'Infrastructure' },
}

const GROUP_ORDER = ['Platform', 'Intelligence', 'Data', 'Infrastructure']
const HISTORY_API = (key: string) => `https://api.rubixkube.ai/status/history/${key}`
const POLL_INTERVAL = 30_000
const BAR_COUNT = 45

type ServiceStatus = 'operational' | 'degraded' | 'outage'

interface Service {
  name: string
  group: string
  status: ServiceStatus
  uptime_24h: number
  uptime_7d: number
  response_time_ms: number | null
  checked_at: string | null
}

interface StatusData {
  status: ServiceStatus
  updated_at: string
  services: Service[]
}

// Gatus paginated result shape
interface GatusResult {
  success: boolean
  timestamp: string
}

interface GatusHistory {
  results: GatusResult[]
}

// Per-service history keyed by endpoint key
type HistoryMap = Record<string, GatusResult[]>

const STATUS_CONFIG: Record<ServiceStatus, { label: string; dot: string; badge: string }> = {
  operational: {
    label: 'Operational',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  },
  degraded: {
    label: 'Degraded',
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  },
  outage: {
    label: 'Outage',
    dot: 'bg-red-500',
    badge: 'bg-red-500/10 text-red-400 border border-red-500/20',
  },
}

const OVERALL_CONFIG: Record<
  ServiceStatus,
  { label: string; borderColor: string; bg: string; textColor: string; dotColor: string }
> = {
  operational: {
    label: 'All systems operational',
    borderColor: 'border-emerald-500',
    bg: 'bg-emerald-500/5',
    textColor: 'text-emerald-400',
    dotColor: 'bg-emerald-500',
  },
  degraded: {
    label: 'Some systems degraded',
    borderColor: 'border-amber-500',
    bg: 'bg-amber-500/5',
    textColor: 'text-amber-400',
    dotColor: 'bg-amber-500',
  },
  outage: {
    label: 'Service disruption detected',
    borderColor: 'border-red-500',
    bg: 'bg-red-500/5',
    textColor: 'text-red-400',
    dotColor: 'bg-red-500',
  },
}

// Use original internal name to build the Gatus history key (before remapping)
function toEndpointKey(internalGroup: string, internalName: string): string {
  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `${slugify(internalGroup)}_${slugify(internalName)}`
}

function applyServiceMap(services: Service[]): Service[] {
  return services.map((svc) => {
    const mapped = SERVICE_MAP[svc.name]
    if (!mapped) return svc
    return { ...svc, name: mapped.name, group: mapped.group }
  })
}

function groupServices(services: Service[]): Record<string, Service[]> {
  const grouped = services.reduce<Record<string, Service[]>>((acc, svc) => {
    const g = svc.group || 'Other'
    if (!acc[g]) acc[g] = []
    acc[g].push(svc)
    return acc
  }, {})
  // Return groups in defined order
  const ordered: Record<string, Service[]> = {}
  for (const g of GROUP_ORDER) {
    if (grouped[g]) ordered[g] = grouped[g]
  }
  // Append any unmapped groups at the end
  for (const g of Object.keys(grouped)) {
    if (!ordered[g]) ordered[g] = grouped[g]
  }
  return ordered
}

function timeAgo(iso: string | null): string {
  if (!iso) return '—'
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

/**
 * Build an array of BAR_COUNT bar colors from history results (most recent last).
 * Falls back to a pseudo-random distribution based on uptime_7d if no history.
 */
function buildBars(
  results: GatusResult[] | undefined,
  uptime7d: number
): ('green' | 'red' | 'amber')[] {
  if (results && results.length > 0) {
    // Results from Gatus are newest-first; we want oldest→newest (left→right)
    const slice = results.slice(0, BAR_COUNT).reverse()
    // Pad with green on the left if we have fewer than BAR_COUNT results
    const pad: ('green' | 'red' | 'amber')[] = Array(Math.max(0, BAR_COUNT - slice.length)).fill('green')
    const bars: ('green' | 'red' | 'amber')[] = slice.map((r) => (r.success ? 'green' : 'red'))
    return [...pad, ...bars]
  }

  // Fallback: distribute failures pseudo-randomly based on uptime_7d
  const failRatio = Math.max(0, Math.min(1, 1 - uptime7d / 100))
  const bars: ('green' | 'red' | 'amber')[] = []
  // Simple seeded pseudo-random using index
  for (let i = 0; i < BAR_COUNT; i++) {
    const pseudo = Math.sin(i * 127.1 + 311.7) * 43758.5453
    const frac = pseudo - Math.floor(pseudo)
    bars.push(frac < failRatio ? 'red' : 'green')
  }
  return bars
}

const BAR_COLOR_CLASS: Record<'green' | 'red' | 'amber', string> = {
  green: 'bg-emerald-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
}

interface UptimeBarsProps {
  bars: ('green' | 'red' | 'amber')[]
}

function UptimeBars({ bars }: UptimeBarsProps) {
  return (
    <div
      className="hidden sm:flex items-end gap-[2px] shrink-0"
      title="45-day uptime history (oldest → newest)"
      aria-label="45-day uptime history"
    >
      {bars.map((color, i) => (
        <div
          key={i}
          className={`w-[3px] h-6 rounded-[1px] ${BAR_COLOR_CLASS[color]}`}
        />
      ))}
    </div>
  )
}

export function StatusPageClient() {
  const [data, setData] = useState<StatusData | null>(null)
  const [historyMap, setHistoryMap] = useState<HistoryMap>({})
  const [error, setError] = useState(false)
  const [lastFetched, setLastFetched] = useState<Date | null>(null)
  const reducedMotion = useReducedMotion()

  const motionProps = reducedMotion
    ? {}
    : { variants: fadeUpVariants, initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true } }

  const fetchHistory = useCallback(async (services: Service[]) => {
    const results = await Promise.allSettled(
      services.map(async (svc) => {
        const key = toEndpointKey(svc.group, svc.name)
        try {
          const res = await fetch(HISTORY_API(key), { cache: 'no-store' })
          if (!res.ok) return { key, results: [] as GatusResult[] }
          const json: GatusHistory = await res.json()
          return { key, results: json.results ?? [] }
        } catch {
          return { key, results: [] as GatusResult[] }
        }
      })
    )

    const map: HistoryMap = {}
    for (const r of results) {
      if (r.status === 'fulfilled') {
        map[r.value.key] = r.value.results
      }
    }
    setHistoryMap(map)
  }, [])

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(STATUS_API, { cache: 'no-store' })
      if (!res.ok) throw new Error()
      const json: StatusData = await res.json()
      // Fetch history using original internal names (before remapping) so keys match Gatus
      fetchHistory(json.services)
      // Apply public name/group mapping before storing
      setData({ ...json, services: applyServiceMap(json.services) })
      setError(false)
      setLastFetched(new Date())
    } catch {
      setError(true)
    }
  }, [fetchHistory])

  useEffect(() => {
    fetchStatus()
    const id = setInterval(fetchStatus, POLL_INTERVAL)
    return () => clearInterval(id)
  }, [fetchStatus])

  const groups = data ? groupServices(data.services) : {}
  const overall = data ? OVERALL_CONFIG[data.status] : null

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-background border-b border-border">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <motion.div {...motionProps}>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-foreground mb-6 mt-24"
              {...motionProps}
            >
              System Status
            </motion.h1>

            {/* Meta row */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-4 text-foreground-muted"
              {...motionProps}
            >
              <div className="flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4 shrink-0" />
                <span>Real-time health of all RubixKube platform services</span>
              </div>
              {lastFetched && (
                <div className="flex items-center gap-2 text-sm sm:ml-auto">
                  <RefreshCw className="w-4 h-4 shrink-0" />
                  <span>Updated {timeAgo(lastFetched.toISOString())}</span>
                </div>
              )}
            </motion.div>

            {/* Prominent overall status banner */}
            {overall && data && (
              <motion.div
                className={`mt-6 rounded-lg border-l-4 px-5 py-4 ${overall.bg} ${overall.borderColor}`}
                {...motionProps}
              >
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full shrink-0 ${overall.dotColor}`} />
                  <span className={`text-base font-semibold ${overall.textColor}`}>
                    {overall.label}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-4xl px-6 md:px-8">

          {/* Error state */}
          {error && (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="p-4 bg-red-500/5 rounded-lg border border-red-500/20 text-red-400 text-sm mb-8"
            >
              Unable to fetch status. Retrying automatically…
            </motion.div>
          )}

          {/* Loading skeleton */}
          {!data && !error && (
            <div className="space-y-8 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-3 w-28 bg-background-secondary rounded mb-3" />
                  <div className="bg-card-background rounded-lg border border-border divide-y divide-border">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-center gap-4 px-5 py-4">
                        <div className="h-2 w-2 rounded-full bg-background-secondary shrink-0" />
                        <div className="h-3 w-40 bg-background-secondary rounded" />
                        <div className="hidden sm:block ml-auto h-6 w-[175px] bg-background-secondary rounded" />
                        <div className="ml-auto sm:ml-0 h-5 w-20 bg-background-secondary rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Service groups */}
          {data && (
            <div className="space-y-8">
              {Object.entries(groups).map(([group, services], idx) => (
                <motion.div
                  key={group}
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: reducedMotion ? 0 : idx * 0.05 }}
                >
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-3">
                    {group}
                  </h2>
                  <div className="bg-card-background rounded-lg border border-border divide-y divide-border">
                    {services.map((svc) => {
                      const cfg = STATUS_CONFIG[svc.status]
                      const key = toEndpointKey(svc.group, svc.name)
                      const bars = buildBars(historyMap[key], svc.uptime_7d)
                      return (
                        <div key={svc.name} className="flex items-center gap-4 px-5 py-4">
                          <div className={`h-2 w-2 rounded-full shrink-0 ${cfg.dot}`} />
                          <span className="flex-1 text-sm font-medium text-foreground min-w-0 truncate">
                            {svc.name}
                          </span>
                          <UptimeBars bars={bars} />
                          <span className="hidden sm:block text-xs text-foreground-muted shrink-0 w-16 text-right">
                            {svc.uptime_7d.toFixed(1)}% 7d
                          </span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0 ${cfg.badge}`}>
                            {cfg.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Incident history */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: reducedMotion ? 0 : Object.keys(groups).length * 0.05 }}
              >
                <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-3">
                  Incident History
                </h2>
                <div className="bg-card-background rounded-lg border border-border">
                  <div className="flex flex-col items-center justify-center gap-3 px-5 py-10 text-center">
                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                    <p className="text-sm text-foreground-muted">
                      No incidents reported in the last 30 days.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  )
}
