'use client'

// The after-launch hero's Kepler window: an HTML copy of the app in its default dark theme (Kepler Studio Dark,
// kepler-app src/theme/themes.ts), replaying three threads from the launch film's demo home (fictional company
// Lumen, operator Maya Chen; text from Marketing Videos/kepler-gallery/source/seed*.py). Each tab plays its own
// story and keeps its place; the two incidents stop at the approval card until the visitor answers it.
import posthog from 'posthog-js'
import {
  ArrowUp,
  AtSign,
  Bell,
  Brain,
  Check,
  ChevronRight,
  Folder,
  Globe,
  Hand,
  Infinity as Always,
  Laptop,
  Layers,
  Mic,
  Network,
  Newspaper,
  PanelLeft,
  Plus,
  Radar,
  RotateCcw,
  Search,
  SquarePen,
  Telescope,
  Terminal,
  Workflow,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { KeplerMark } from './icons'
import { usePrefersReducedMotion } from './use-launch'

function Row({ cmd, verb = 'Ran' }: { cmd: string; verb?: string }) {
  return (
    <div className="kd-row">
      <ChevronRight aria-hidden="true" />
      <span className="kd-verb">{verb}</span>
      <code>{cmd}</code>
    </div>
  )
}

function Noticed({ children }: { children: ReactNode }) {
  return (
    <p className="kd-noticed">
      <Telescope aria-hidden="true" />
      <b>Kepler noticed</b> · {children}
    </p>
  )
}

const Obs = () => <i>[observed]</i>

type Story = {
  id: string
  tab: string
  workspace: string
  /** On screen before the replay starts */
  intro: ReactNode
  /** Each shown after its pause (ms) */
  beats: { wait: number; node: ReactNode }[]
  /** The approval card: the command and where it runs; none for a story that only reads */
  ask?: { cmd: string; on: string }
  /** After Run: the rows, then the answer */
  after?: { rows: string[]; done: ReactNode }
}

const PAY_HEALTH = 'curl -s https://checkout-api.prod.lumen.internal/healthz/payments'
const PAY_FIX = 'kubectl -n prod set env deploy/checkout-api --from=secret/payments-api-key-v2'
const DISK_FIX = "sudo sed -i 's#/var/log/nginx-edge#/var/log/nginx#' /etc/logrotate.d/nginx && sudo logrotate -f /etc/logrotate.d/nginx"
const BLOCKED = 'rm -f /var/log/nginx/access.log.1'

const STORIES: Story[] = [
  {
    id: 'payments',
    tab: 'Watch checkout payments',
    workspace: 'checkout-api',
    intro: (
      <>
        <p className="kd-you">Watch checkout. If payments fail, find out why.</p>
        <Row verb="Watching" cmd={PAY_HEALTH} />
        <p>
          Payments are healthy: <b>99.8%</b> succeed over the last 5 minutes <Obs />. I won&apos;t change anything on my
          own.
        </p>
      </>
    ),
    beats: [
      {
        wait: 900,
        node: (
          <>
            <Noticed>checkout-api: payments degraded, 41.2% succeed (was 99.8% at 19:20)</Noticed>
            <p>Payments dropped to 41% in the last few minutes. Finding out why. Reads only.</p>
          </>
        ),
      },
      { wait: 900, node: <Row cmd="kubectl -n prod logs deploy/checkout-api --since=10m | grep 401" /> },
      { wait: 380, node: <Row cmd="git -C ~/src/platform-infra log -3 --format='%h %ad %s'" /> },
      { wait: 380, node: <Row cmd="kubectl -n prod get secrets | grep payments" /> },
      { wait: 380, node: <Row cmd="kubectl -n prod get deploy checkout-api -o jsonpath='{.spec.template.spec}'" /> },
      {
        wait: 900,
        node: (
          <>
            <p>The payments key was rotated at 19:42 and checkout still uses the old one.</p>
            <ul>
              <li>
                <b>Payments fail with</b> <code>401 invalid_api_key</code> since 19:43 <Obs />.
              </li>
              <li>
                <b>platform-infra</b> <code>a41c9e2</code> <b>rotated the key at 19:42</b> and revoked v1 <Obs />.
              </li>
            </ul>
          </>
        ),
      },
      {
        wait: 700,
        node: (
          <>
            <p className="kd-h">Suggested fix</p>
            <pre>
              <code>{PAY_FIX}</code>
            </pre>
            <p className="kd-quiet">Nothing has been changed yet.</p>
          </>
        ),
      },
      { wait: 900, node: <p className="kd-you">Go ahead.</p> },
    ],
    ask: { cmd: PAY_FIX, on: 'This Mac' },
    after: {
      rows: [PAY_FIX, 'kubectl -n prod rollout status deploy/checkout-api --timeout=5m', PAY_HEALTH],
      done: (
        <p>
          Done. checkout-api is on <code>payments-api-key-v2</code> and payments are recovering: <b>97.9%</b> over 5
          minutes, up from 41% <Obs />. The watcher stays on until they are back to normal.
        </p>
      ),
    },
  },
  {
    id: 'disk',
    tab: 'edge-03: root disk full',
    workspace: 'edge-pool',
    intro: (
      <>
        <Noticed>edge-03: / is 100% full (was 91% at 11:10)</Noticed>
        <p>edge-03 filled its root disk in the last half hour. Finding what is writing. Reads only.</p>
      </>
    ),
    beats: [
      { wait: 700, node: <Row cmd="df -h / /var" /> },
      { wait: 380, node: <Row cmd="du -xh --max-depth=2 /var 2>/dev/null | sort -h | tail -6" /> },
      { wait: 380, node: <Row cmd="cat /etc/logrotate.d/nginx" /> },
      { wait: 380, node: <Row cmd="git -C ~/src/platform-infra log --oneline -3 -- ansible/roles/nginx" /> },
      {
        wait: 700,
        node: (
          <>
            <Row verb="Not run" cmd={BLOCKED} />
            <p className="kd-blocked">
              Kepler&apos;s command classifier read <code>{BLOCKED}</code> as destructive. It is never run, in any mode.
            </p>
          </>
        ),
      },
      {
        wait: 1000,
        node: (
          <>
            <p>Deleting logs is blocked, and it would not fix the cause anyway. Here is what I found.</p>
            <ul>
              <li>
                <b>edge-03&apos;s root disk is full</b>: <code>/dev/root</code> 29G of 29G <Obs />.
              </li>
              <li>
                <b>nginx logs stopped rotating on 11 Nov.</b> Release v2.15 moved them to <code>/var/log/nginx</code>, but
                logrotate still points at the old folder <Obs />.
              </li>
            </ul>
          </>
        ),
      },
      {
        wait: 700,
        node: (
          <>
            <p className="kd-h">Suggested fix</p>
            <pre>
              <code>{DISK_FIX}</code>
            </pre>
            <p className="kd-quiet">Nothing has been changed yet.</p>
          </>
        ),
      },
      { wait: 900, node: <p className="kd-you">Go ahead with the logrotate fix on edge-03.</p> },
    ],
    ask: { cmd: DISK_FIX, on: 'edge-03' },
    after: {
      rows: [DISK_FIX, 'df -h /'],
      done: (
        <p>
          Done. <code>/dev/root</code> is at <b>31%</b> (8.9G of 29G) and journald is back under 1% CPU <Obs />. Next is
          the template in platform-infra, so the other edge nodes keep the fix. I can open that pull request.
        </p>
      ),
    },
  },
  {
    id: 'rollout',
    tab: 'v2.15 rollout on prod-eu-west',
    workspace: 'checkout-api',
    intro: <p className="kd-you">Watch the v2.15 rollout of checkout-api on prod-eu-west and tell me if anything looks off.</p>,
    beats: [
      { wait: 700, node: <Row cmd="kubectl -n prod rollout status deploy/checkout-api --timeout=10m" /> },
      { wait: 500, node: <Row cmd="kubectl -n prod get pods -l app=checkout-api -o wide | head -4" /> },
      {
        wait: 1000,
        node: (
          <>
            <p className="kd-h">v2.15 is healthy on prod-eu-west</p>
            <ul>
              <li>
                <b>6/6 pods Ready</b> on <code>checkout-api-7d9f8c</code> after 4m 10s <Obs />.
              </li>
              <li>
                <b>Error rate 0.21%</b>, same as v2.14 over the last hour <Obs />.
              </li>
              <li>
                <b>p99 latency 182 ms</b>, down from 214 ms <Obs />.
              </li>
            </ul>
            <p>No restarts, no new warnings in prod. I&apos;ll keep the deploy guard on it until tonight.</p>
          </>
        ),
      },
    ],
  },
]

type Answer = null | 'run' | 'reject'
type Progress = { beat: number; answer: Answer; after: number }
const FRESH: Progress = { beat: 0, answer: null, after: 0 }

/** `ready` holds the replay back until the window has risen into place (see useRise in hero.tsx). */
export function KeplerDemo({ ready = true }: { ready?: boolean }) {
  const reduce = usePrefersReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [started, setStarted] = useState(false)
  const [tab, setTab] = useState(STORIES[0].id)
  const [progress, setProgress] = useState<Record<string, Progress>>({})
  const story = STORIES.find((s) => s.id === tab)!
  const { beat, answer, after } = progress[tab] ?? FRESH
  const set = (p: Partial<Progress>) => setProgress((all) => ({ ...all, [tab]: { ...(all[tab] ?? FRESH), ...p } }))
  const end = story.beats.length

  // Starts when the window is in view; reduced motion shows each story up to its approval card at once
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (inView && ready) setStarted(true)
  }, [inView, ready])
  useEffect(() => {
    if (!started || beat >= end) return
    if (reduce) return set({ beat: end })
    const id = setTimeout(() => set({ beat: beat + 1 }), story.beats[beat].wait)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `set` is rebuilt each render; tab and beat drive this
  }, [started, tab, beat, end, reduce])
  useEffect(() => {
    const rows = story.after?.rows.length ?? 0
    if (answer !== 'run' || after > rows) return
    const id = setTimeout(() => set({ after: after + 1 }), reduce ? 0 : after === 0 ? 300 : 650)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- as above
  }, [tab, answer, after, reduce])
  // Follows the newest line, as the app does; a tab switch jumps straight there
  useEffect(() => {
    const t = thread.current
    if (t) t.scrollTo({ top: t.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [beat, answer, after, reduce])
  useEffect(() => {
    const t = thread.current
    if (t) t.scrollTop = t.scrollHeight
  }, [tab])

  const open = (id: string) => {
    if (id === tab) return
    setTab(id)
    posthog.capture('kepler_demo_tab_opened', { tab: id })
  }
  const decide = (a: Exclude<Answer, null>, button: string) => {
    set({ answer: a })
    posthog.capture('kepler_demo_answered', { tab, button })
  }
  const finished = story.ask ? answer !== null : beat >= end

  return (
    <div className="kd" ref={root} role="group" aria-label="Kepler, replaying three threads. Pick a tab; press Run to let it apply a fix.">
      <div className="kd-top">
        <span className="kd-lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <PanelLeft className="kd-ico" aria-hidden="true" />
        <span className="kd-brand">
          <KeplerMark />
          Kepler <em>Pro</em>
        </span>
        <span className="kd-tabs" role="tablist">
          {STORIES.map((s) => (
            <button key={s.id} type="button" role="tab" aria-selected={s.id === tab} className={s.id === tab ? 'on' : undefined} onClick={() => open(s.id)}>
              <span>{s.tab}</span>
              {s.id === tab && <X aria-hidden="true" />}
            </button>
          ))}
          <Plus className="kd-plus" aria-hidden="true" />
        </span>
        <span className="kd-tools" aria-hidden="true">
          <SquarePen />
          <Globe />
          <Terminal />
          <Bell />
        </span>
      </div>
      <div className="kd-body">
        <nav className="kd-side">
          <span>
            <Plus /> New session <kbd>⌘N</kbd>
          </span>
          <span>
            <Radar /> New war room
          </span>
          <span>
            <Search /> Search <kbd>⌘K</kbd>
          </span>
          <span>
            <Newspaper /> Feed
          </span>
          <span>
            <Workflow /> Automations
          </span>
          <span>
            <Brain /> Memory
          </span>
          <span>
            <Network /> Topology
          </span>
          <b>Workspaces</b>
          {['Home', 'platform-infra', 'checkout-api', 'edge-pool', 'runbooks'].map((w) => {
            const target = STORIES.find((s) => s.workspace === w)
            const on = story.workspace === w
            return target ? (
              <button key={w} type="button" className={on ? 'on' : undefined} onClick={() => !on && open(target.id)}>
                <Folder aria-hidden="true" /> {w}
              </button>
            ) : (
              <span key={w}>
                <Folder /> {w}
              </span>
            )
          })}
          <span className="kd-me">
            <i>MC</i> Maya Chen
          </span>
        </nav>
        <div className="kd-main" role="tabpanel" aria-label={story.tab}>
          <div className="kd-thread" ref={thread}>
            <div className="kd-col" key={tab}>
              {story.intro}
              {story.beats.map((b, i) => (beat > i ? <div key={i} className="kd-in">{b.node}</div> : null))}
              {story.ask && beat >= end && answer === null && (
                <div className="kd-ask kd-in">
                  <p className="kd-ask-head">
                    <span>Approval needed</span> shell command on <b>{story.ask.on}</b>
                  </p>
                  <pre>
                    <code>$ {story.ask.cmd}</code>
                  </pre>
                  <div className="kd-ask-acts">
                    <button type="button" onClick={() => decide('reject', 'reject')}>
                      <X aria-hidden="true" /> Reject
                    </button>
                    <button type="button" onClick={() => decide('run', 'always')}>
                      <Always aria-hidden="true" /> Always
                    </button>
                    <button type="button" onClick={() => decide('run', 'session')}>
                      <Check aria-hidden="true" /> This session
                    </button>
                    <button type="button" className="kd-run" onClick={() => decide('run', 'run')}>
                      <Check aria-hidden="true" /> Run
                    </button>
                  </div>
                </div>
              )}
              {answer === 'reject' && <p className="kd-quiet kd-in">Rejected. Nothing was changed.</p>}
              {answer === 'run' &&
                story.after?.rows.map((cmd, i) =>
                  after > i ? (
                    <div key={cmd} className="kd-in">
                      <Row cmd={cmd} />
                    </div>
                  ) : null,
                )}
              {answer === 'run' && story.after && after > story.after.rows.length && <div className="kd-in">{story.after.done}</div>}
            </div>
          </div>
          <div className="kd-compose" aria-hidden="true">
            <p>Plan, investigate, ask… / for commands, @ for context</p>
            <div>
              <Plus />
              <AtSign />
              <Layers />
              <span className="kd-mode">
                <Hand /> <b>Assist</b> asks each step
              </span>
              <span className="kd-mode">
                <Laptop /> This Mac
              </span>
              <Mic className="kd-push" />
              <span className="kd-send">
                <ArrowUp />
              </span>
            </div>
          </div>
          {started && finished && (
            <button type="button" className="kd-replay" onClick={() => set(FRESH)}>
              <RotateCcw aria-hidden="true" /> Replay
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
