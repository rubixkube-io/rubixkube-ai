import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { webPageJsonLd } from '@/components/structured-data'
import { outlineBlueAccentMd, outlineInkMd } from '@/lib/outline-blue-cta'
import { rkMono10, rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import { NightShiftGame } from './night-shift-game'

const mono = 'font-[family-name:var(--font-mono)]'
const serif = 'font-[family-name:var(--font-serif)]'
const CONSOLE_URL = 'https://console.rubixkube.ai'

const title = 'Rubix Night Shift: a game from RubixKube'
const description =
  'Spend five night shifts as Rubix, the agent inside RubixKube. Find the root cause of every incident, ask before you change anything, and remember what worked.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: 'https://rubixkube.ai/night-shift' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: '/night-shift' },
}

const PIECES: [string, string][] = [
  ['Observers', 'Small probes sit on each source: a cluster, a machine, a cloud account. They report what breaks.'],
  ['Incidents, grouped', 'One failure shows up in many places. Rubix groups the alerts into one incident and runs one RCA.'],
  ['Root cause, with evidence', 'Rubix tests each idea against logs, metrics and what changed, until one holds.'],
  ['A Fix and Follow-ups', 'Every RCA ends with a Fix for now and Follow-ups so it does not happen again.'],
  ['Observe, Assist, Auto', 'Your team decides what Rubix may change on its own. Anything destructive still goes to a person.'],
  ['It remembers', 'Past RCAs make the next investigation faster. In the game, one of them solves the last night.'],
]

const NIGHTS: [string, string][] = [
  ['Juniper Coffee', 'A crash loop, an alert storm, and a job that keeps coming back.'],
  ['Hearth Bakery', 'Connect three machines and an AWS account, then a full disk and a missing permission.'],
  ['Harbor Radio', 'Rain, two incidents at once, and a choice about which one comes first.'],
  ['Juniper, in Auto mode', 'Rubix fixes things on its own, until a fix would delete something.'],
  ['The long night', 'A migration breaks everything at once. A note from the first night finds the cause.'],
]

export default function NightShiftPage() {
  const jsonLd = webPageJsonLd({ name: 'Rubix Night Shift', description, url: 'https://rubixkube.ai/night-shift' })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <section className="bg-[var(--bg)]">
        <div className="rk-landing-max px-[var(--pad)] pt-[calc(var(--nav-stack)+2.5rem)] pb-10 sm:pb-12">
          <span className={cn(`${mono} mb-8 block tracking-[0.2em] text-[var(--mid)] uppercase`, rkMono10)}>A game from RubixKube</span>
          <h1 className={`rk-landing-h2-std ${serif} max-w-none leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]`}>
            Rubix <span className="italic text-[var(--blue)]">Night Shift.</span>
          </h1>
          <p className={cn(`${mono} mt-8 max-w-2xl leading-[1.75] font-light text-[var(--mid)]`, rkMono13)}>{description}</p>
          <p className={`${mono} mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[12px] font-light tracking-[0.04em] text-[var(--mid)]`}>
            <span>About an hour</span>
            <span>Plays in the browser</span>
            <span>Best with sound</span>
          </p>
        </div>
        <div className="rk-landing-max px-[var(--pad)] pb-16 sm:pb-24">
          <NightShiftGame />
        </div>
      </section>

      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] px-[var(--pad)] py-16 sm:py-24">
        <div className="rk-landing-max">
          <span className={cn(`${mono} mb-6 block tracking-[0.2em] text-[var(--mid)] uppercase`, rkMono10)}>What you are playing</span>
          <h2 className={`rk-landing-h2-std ${serif} max-w-[20ch] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]`}>
            Every night is how RubixKube <span className="italic text-[var(--blue)]">actually works.</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 border-t border-[var(--rule)] md:grid-cols-3">
            {PIECES.map(([h, p], i) => (
              <article
                key={h}
                className={cn('border-b border-[var(--rule)] py-6 md:pr-6', i % 3 !== 0 && 'md:border-l md:pl-6')}
              >
                <h3 className="m-0 text-[17px] font-semibold text-[var(--ink)]">{h}</h3>
                <p className="mt-2 mb-0 max-w-[40ch] text-[15px] leading-relaxed text-[var(--mid)]">{p}</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="outline" className={outlineBlueAccentMd}>
              <Link href="/platform">See the platform</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--rule)] bg-[var(--bg)] px-[var(--pad)] py-16 sm:py-24">
        <div className="rk-landing-max">
          <span className={cn(`${mono} mb-6 block tracking-[0.2em] text-[var(--mid)] uppercase`, rkMono10)}>Five nights</span>
          <ol className="m-0 list-none border-t border-[var(--rule)] p-0">
            {NIGHTS.map(([team, line], i) => (
              <li key={team} className="grid grid-cols-1 gap-1 border-b border-[var(--rule)] py-5 md:grid-cols-[6rem_16rem_minmax(0,1fr)] md:items-baseline md:gap-6">
                <span className={`${mono} text-[12px] font-light tracking-[0.04em] text-[var(--mid)]`}>Night {i + 1}</span>
                <span className="font-semibold text-[var(--ink)]">{team}</span>
                <span className="text-[var(--mid)]">{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-[var(--rule)] bg-[var(--background-secondary)] px-[var(--pad)] py-16 sm:py-24">
        <div className="rk-landing-max">
          <h2 className={`rk-landing-h2-std ${serif} max-w-[18ch] leading-[1.05] font-light tracking-[-0.01em] text-[var(--ink)]`}>
            Now try it on <span className="italic text-[var(--blue)]">your own systems.</span>
          </h2>
          <p className={cn(`${mono} mt-6 max-w-xl leading-[1.75] font-light text-[var(--mid)]`, rkMono13)}>
            Connect a cluster, a machine or a cloud account, and Rubix starts watching.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild variant="primary">
              <a href={CONSOLE_URL} target="_blank" rel="noopener noreferrer">Start for free</a>
            </Button>
            <Button asChild variant="outline" className={outlineInkMd}>
              <a href="https://docs.rubixkube.ai/">Read the docs</a>
            </Button>
            <Button asChild variant="outline" className={outlineInkMd}>
              <Link href="/products/rubix-cli">Rubix CLI</Link>
            </Button>
            <Button asChild variant="outline" className={outlineInkMd}>
              <a href="https://trykepler.rubixkube.ai" target="_blank" rel="noopener noreferrer">Try Kepler</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
