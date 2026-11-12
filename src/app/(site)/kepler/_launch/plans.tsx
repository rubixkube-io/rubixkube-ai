import Link from 'next/link'
import { CREDIT, PLANS, TEAM_LINE, TRIAL, formatMoney } from '../pricing'

const whole = (cents: number) => formatMoney(cents, 'USD').replace(/\.00$/, '')

export function Plans({ live }: { live: boolean }) {
  return (
    <section id="pricing">
      <div className="sect-head">
        <h2>
          Free to keep.<span>$20 when you want all of it.</span>
        </h2>
        <p>Free is a real tool, not a demo. Your own model keys work on every plan.</p>
      </div>
      <div className="plans">
        {PLANS.map((plan) => (
          <div key={plan.name} className={plan.recommended ? 'plan pro' : 'plan'}>
            <div className="row">
              <h3>{plan.name}</h3>
              {plan.tag && <span className="tag">{plan.tag}</span>}
            </div>
            <p className="price">
              {whole(plan.price.monthly)}
              {plan.price.monthly > 0 && <small>a month</small>}
            </p>
            <p className="alt">{plan.line}</p>
            <ul>
              {plan.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="btn" href={live ? '#download' : '#notify'}>
              {live ? 'Download' : 'Notify me'}
            </a>
          </div>
        ))}
        <div className="plan">
          <div className="row">
            <h3>{CREDIT.name}</h3>
            <span className="tag">{CREDIT.tag}</span>
          </div>
          <p className="price">{CREDIT.headline}</p>
          <p className="alt">{CREDIT.line}</p>
          <ul>
            {CREDIT.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="btn" href={live ? '#download' : '#notify'}>
            {live ? 'Download' : 'Notify me'}
          </a>
        </div>
      </div>
      <p className="trial">
        {TRIAL} {TEAM_LINE.text} <Link href="/contact">{TEAM_LINE.link}</Link>.
      </p>
    </section>
  )
}
