'use client'

import posthog from 'posthog-js'
import Link from 'next/link'
import { useId, useState } from 'react'
import { Footer } from '../_launch/footer'
import { KeplerMark } from '../_launch/icons'
import { useLaunch } from '../_launch/use-launch'
import { DEAL, EMAIL, FORM, HERO, STEPS, WHO } from './content'

/** The orchestrator keeps each application and posts it to the team's Slack (app/routes/kepler_creators.py). */
const APPLY_URL = process.env.NEXT_PUBLIC_CREATORS_API_URL ?? 'https://api.rubixkube.ai/kepler/creators/apply'

/** The four fields, sent to the orchestrator. */
function ApplyForm() {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const field = (key: string) => String(data.get(key) ?? '').trim()
    setStatus('sending')
    try {
      const response = await fetch(APPLY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: field('name'),
          email: field('email'),
          where: field('where'),
          link: field('link'),
          bot_field: field('bot-field'),
        }),
      })
      if (!response.ok) throw new Error(`Application refused: ${response.status}`)
      // Where they publish only: never the person's name, email or link
      posthog.capture('kepler_creator_applied', { where: field('where') })
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'done') {
    return (
      <p role="status" className="cr-done">
        {FORM.success}
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="cr-form">
      <input name="bot-field" tabIndex={-1} autoComplete="off" hidden />
      <div className="cr-field">
        <label htmlFor={`${id}-name`}>Your name</label>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" required />
      </div>
      <div className="cr-field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </div>
      <div className="cr-field">
        <label htmlFor={`${id}-where`}>Where you publish</label>
        <select id={`${id}-where`} name="where" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {FORM.where.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>
      <div className="cr-field">
        <label htmlFor={`${id}-link`}>Link to your profile</label>
        <input id={`${id}-link`} name="link" type="url" autoComplete="url" placeholder="https://youtube.com/@you" required />
      </div>
      <button type="submit" disabled={status === 'sending'}>
        Send application
      </button>
      {status === 'failed' && (
        <p role="alert" className="notify-error">
          {FORM.error}
        </p>
      )}
      <p className="cr-small">{FORM.privacy}</p>
    </form>
  )
}

/** /kepler/creators in the launch page's design: the offer, three steps, the deal, the form. */
export function CreatorsPageClient({ serverNow }: { serverNow: number }) {
  const { live } = useLaunch(serverNow)
  return (
    <div className={live ? 'kl is-live' : 'kl'}>
      <section className="cr-hero" id="top">
        <header className="bar">
          <Link className="brand" href="/kepler">
            <KeplerMark />
            <b>Kepler</b>
          </Link>
          <nav aria-label="Creators">
            <a href="#how">How it works</a>
            <a href="#deal">The deal</a>
            <a href="#apply">Apply</a>
          </nav>
        </header>
        <div className="lead">
          <h1>
            <span>{HERO.title}</span>
            <span className="bold">{HERO.titleSoft}</span>
          </h1>
          <p className="sub">{HERO.sub}</p>
          <a className="btn primary" href="#apply">
            Apply
          </a>
        </div>
      </section>

      <section className="sect" id="how">
        <div className="sect-head">
          <h2>How it works</h2>
        </div>
        <ol className="cr-steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="cr-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="sect cr-tight" id="deal">
        <div className="sect-head">
          <h2>The deal</h2>
          <p>{WHO}</p>
        </div>
        <div className="rows">
          {DEAL.map((d) => (
            <div key={d.title} className="pair">
              <h3>{d.title}</h3>
              <p>{d.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sect cr-tight" id="apply">
        <div className="cr-apply">
          <h2>
            {FORM.heading}
            <span>{FORM.headingSoft}</span>
          </h2>
          <div className="cr-card">
            <ApplyForm />
          </div>
          <p className="cr-small cr-mail">
            Questions? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
      </section>

      <Footer live={live} />
    </div>
  )
}
