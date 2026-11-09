'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { fadeUpVariants } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { RefreshCw, CheckCircle } from 'lucide-react'

const STATUS_API = process.env.NEXT_PUBLIC_STATUS_API_URL ?? 'https://api.rubixkube.ai/status'

// Maps endpoint names returned by the status API to display names and groups.
// Keys must match the API's endpoint names exactly.
const SERVICE_MAP: Record<string, { name: string; group: string }> = {
  'Orchestrator':      { name: 'API',                   group: 'Platform'       },
  'Console':           { name: 'Console',               group: 'Platform'       },
  'MCP Server':        { name: 'MCP Server',            group: 'Platform'       },
  'Slack Bot':         { name: 'Slack App',             group: 'Platform'       },
  'Notification':      { name: 'Notifications',         group: 'Platform'       },
  'Rubix Agent':       { name: 'Rubix',                 group: 'Intelligence'   },
  'Automation Engine': { name: 'Automations',           group: 'Intelligence'   },
  'Memory Engine X':   { name: 'Incidents',             group: 'Data'           },
  'Knowledge Graph':   { name: 'Topology',              group: 'Data'           },
  'NATS':              { name: 'Event Streaming',       group: 'Infrastructure' },
  'Neo4j':             { name: 'Graph Store',           group: 'Infrastructure' },
  'Novu':              { name: 'Notification Service',  group: 'Infrastructure' },
}

const GROUP_ORDER = ['Platform', 'Intelligence', 'Data', 'Infrastructure']
const BAR_COUNT = 45
const HISTORY_API = (key: string) => `${STATUS_API}/history/${key}?limit=${BAR_COUNT}`
const POLL_INTERVAL = 30_000

type ServiceStatus = 'operational' | 'degraded' | 'outage'

interface Service {
  name: string
  group: string
  key?: string
  order?: number
  status: ServiceStatus
  uptime_24h: number | null
  uptime_7d: number | null
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
    badge: 'bg-emerald-500/10 text-[color-mix(in_srgb,var(--color-emerald-500)_70%,var(--ink))] ring-1 ring-inset ring-emerald-500/25',
  },
  degraded: {
    label: 'Degraded',
    dot: 'bg-amber-500',
    badge: 'bg-amber-500/10 text-[color-mix(in_srgb,var(--color-amber-500)_70%,var(--ink))] ring-1 ring-inset ring-amber-500/25',
  },
  outage: {
    label: 'Outage',
    dot: 'bg-red-500',
    badge: 'bg-red-500/10 text-[color-mix(in_srgb,var(--color-red-500)_70%,var(--ink))] ring-1 ring-inset ring-red-500/25',
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
    textColor: 'text-[color-mix(in_srgb,var(--color-emerald-500)_70%,var(--ink))]',
    dotColor: 'bg-emerald-500',
  },
  degraded: {
    label: 'Some systems degraded',
    borderColor: 'border-amber-500',
    bg: 'bg-amber-500/5',
    textColor: 'text-[color-mix(in_srgb,var(--color-amber-500)_70%,var(--ink))]',
    dotColor: 'bg-amber-500',
  },
  outage: {
    label: 'Service disruption detected',
    borderColor: 'border-red-500',
    bg: 'bg-red-500/5',
    textColor: 'text-[color-mix(in_srgb,var(--color-red-500)_70%,var(--ink))]',
    dotColor: 'bg-red-500',
  },
}

// The API sends each service's Gatus key. Older API versions don't, so build it
// from the original internal names (before remapping), the way Gatus does.
function endpointKey(svc: Service): string {
  return svc.key ?? toEndpointKey(svc.group, svc.name)
}

function toEndpointKey(internalGroup: string, internalName: string): string {
  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `${slugify(internalGroup)}_${slugify(internalName)}`
}

// Rows follow SERVICE_MAP order; services missing from it go last.
const SERVICE_ORDER = Object.keys(SERVICE_MAP)

function applyServiceMap(services: Service[]): Service[] {
  return services.map((svc) => {
    const mapped = SERVICE_MAP[svc.name]
    // Keep the key from the internal names; the history lookup uses it.
    const key = endpointKey(svc)
    if (!mapped) return { ...svc, key, order: SERVICE_ORDER.length }
    return { ...svc, key, order: SERVICE_ORDER.indexOf(svc.name), name: mapped.name, group: mapped.group }
  })
}

function groupSummary(services: Service[]): string {
  const outage = services.filter((s) => s.status === 'outage').length
  const degraded = services.filter((s) => s.status === 'degraded').length
  if (!outage && !degraded) return 'All operational'
  return [outage && `${outage} outage`, degraded && `${degraded} degraded`].filter(Boolean).join(', ')
}

function groupServices(services: Service[]): Record<string, Service[]> {
  const grouped = services.reduce<Record<string, Service[]>>((acc, svc) => {
    const g = svc.group || 'Other'
    if (!acc[g]) acc[g] = []
    acc[g].push(svc)
    return acc
  }, {})
  for (const list of Object.values(grouped)) {
    list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name))
  }
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
  if (!iso) return '-'
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

type Bar = 'green' | 'red' | 'empty'

/**
 * One bar per check, oldest on the left. The API returns the newest BAR_COUNT
 * results, oldest first. Missing checks show as empty bars.
 */
function buildBars(results: GatusResult[] | undefined): Bar[] {
  const slice = (results ?? []).slice(-BAR_COUNT)
  const pad: Bar[] = Array(BAR_COUNT - slice.length).fill('empty')
  return [...pad, ...slice.map((r): Bar => (r.success ? 'green' : 'red'))]
}

// Dot, name, bars, uptime, status. Bars and uptime hide on small screens.
const ROW_GRID = 'grid-cols-[0.5rem_1fr_7rem] sm:grid-cols-[0.5rem_1fr_auto_6rem_7rem] gap-x-4'

const BAR_COLOR_CLASS: Record<Bar, string> = {
  green: 'bg-emerald-500',
  red: 'bg-red-500',
  empty: 'bg-[var(--rule)]',
}

interface UptimeBarsProps {
  bars: Bar[]
}

function UptimeBars({ bars }: UptimeBarsProps) {
  return (
    <div
      className="hidden sm:flex items-end gap-[2px]"
      title={`Last ${BAR_COUNT} checks, oldest to newest`}
      aria-label={`Last ${BAR_COUNT} checks`}
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


  const fetchHistory = useCallback(async (services: Service[]) => {
    const results = await Promise.allSettled(
      services.map(async (svc) => {
        const key = endpointKey(svc)
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
      <header className="bg-[var(--bg)]">
        <PageHero
          className="pb-0 [&>*]:mx-auto [&>*]:max-w-[900px]"
          title="System Status."
          lede="Real-time health of all RubixKube platform services."
        >
          {lastFetched && (
            <div className="mt-6 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)]">
              <RefreshCw className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
              <span>Updated {timeAgo(lastFetched.toISOString())}</span>
            </div>
          )}

          {/* Prominent overall status banner */}
          {overall && data && (
            <div className={`mt-8 rounded-2xl px-6 py-5 ring-1 ring-[var(--rule)] ${overall.bg}`}>
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${overall.dotColor}`} />
                <span className={`font-[family-name:var(--font-figtree)] text-[18px] font-semibold ${overall.textColor}`}>
                  {overall.label}
                </span>
              </div>
            </div>
          )}
        </PageHero>
      </header>

      {/* Content */}
      <section className="bg-[var(--bg)] px-[var(--pad)] pt-14 pb-24">
        <div className="rk-landing-max [&>*]:mx-auto [&>*]:max-w-[900px]">

          {/* Error state */}
          {error && (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 rounded-2xl bg-red-500/5 p-5 font-[family-name:var(--font-figtree)] text-[16px] text-[color-mix(in_srgb,var(--color-red-500)_70%,var(--ink))] ring-1 ring-red-500/20"
            >
              Unable to fetch status. Retrying automatically…
            </motion.div>
          )}

          {/* Loading skeleton */}
          {!data && !error && (
            <div className="space-y-10 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-3 w-28 bg-[var(--rule)] rounded mb-4" />
                  <div className="rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--rule)] divide-y divide-[var(--rule)]">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-center gap-4 px-5 py-4">
                        <div className="h-2 w-2 rounded-full bg-[var(--rule)] shrink-0" />
                        <div className="h-3 w-40 bg-[var(--rule)] rounded" />
                        <div className="hidden sm:block ml-auto h-6 w-[175px] bg-[var(--rule)] rounded" />
                        <div className="ml-auto sm:ml-0 h-5 w-20 bg-[var(--rule)] rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Service groups */}
          {data && (
            <div className="space-y-10">
              {Object.entries(groups).map(([group, services], idx) => (
                <motion.div
                  key={group}
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: reducedMotion ? 0 : idx * 0.05 }}
                >
                  <div className="mb-4 flex items-baseline justify-between gap-4">
                    <h2 className="m-0 font-[family-name:var(--font-mono)] text-[12px] font-light uppercase leading-normal tracking-[0.12em] text-[var(--mid)]">
                      {group}
                    </h2>
                    <span className="font-[family-name:var(--font-mono)] text-[12px] font-light text-[var(--mid)]">
                      {groupSummary(services)}
                    </span>
                  </div>
                  <div className="rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--rule)] divide-y divide-[var(--rule)]">
                    <div className={`hidden sm:grid ${ROW_GRID} px-5 py-2.5 font-[family-name:var(--font-mono)] text-[11px] font-light text-[var(--mid)]`}>
                      <span className="col-span-2">Service</span>
                      <span>Last {BAR_COUNT} checks</span>
                      <span className="text-right">Uptime (7d)</span>
                      <span className="text-center">Status</span>
                    </div>
                    {services.map((svc) => {
                      const cfg = STATUS_CONFIG[svc.status]
                      const bars = buildBars(historyMap[endpointKey(svc)])
                      return (
                        <div key={svc.name} className={`grid ${ROW_GRID} items-center px-5 py-4`}>
                          <div className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                          <span className="font-[family-name:var(--font-mono)] text-[14px] text-[var(--ink)] min-w-0 truncate">
                            {svc.name}
                          </span>
                          <UptimeBars bars={bars} />
                          <span className="hidden sm:block font-[family-name:var(--font-mono)] text-[13px] font-light text-[var(--mid)] text-right tabular-nums">
                            {svc.uptime_7d == null ? '-' : `${svc.uptime_7d.toFixed(1)}%`}
                          </span>
                          <span className={`font-[family-name:var(--font-mono)] text-[12px] w-[7rem] text-center py-0.5 rounded-full ${cfg.badge}`}>
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
                <h2 className="m-0 mb-4 font-[family-name:var(--font-mono)] text-[12px] font-light uppercase leading-normal tracking-[0.12em] text-[var(--mid)]">
                  Incident History
                </h2>
                <div className="rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--rule)]">
                  <div className="flex flex-col items-center justify-center gap-3 px-5 py-10 text-center">
                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" strokeWidth={1.75} />
                    <p className="m-0 font-[family-name:var(--font-figtree)] text-[16px] text-[var(--mid)]">
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
