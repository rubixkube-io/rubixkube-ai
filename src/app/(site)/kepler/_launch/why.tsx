'use client'

import { Fragment, useCallback, useRef, useState } from 'react'
import { ASSETS, CARDS, WHY } from '../content'
import { useOnScroll, usePrefersReducedMotion } from './use-launch'

const WORDS = WHY.statement.split(' ')

/** The problem darkens word by word as it reaches the middle of the screen. */
function Statement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = usePrefersReducedMotion()
  const [on, setOn] = useState(0)
  const measure = useCallback(() => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const p = (innerHeight * 0.78 - r.top) / (r.height + innerHeight * 0.25)
    setOn(Math.round(Math.min(1, Math.max(0, p)) * WORDS.length))
  }, [])
  useOnScroll(measure)
  return (
    <p className="big" ref={ref}>
      {WORDS.map((w, i) => (
        <Fragment key={i}>
          <span className={reduce || i < on ? 'w on' : 'w'}>{w}</span>{' '}
        </Fragment>
      ))}
    </p>
  )
}

export function Why() {
  return (
    <>
      <section className="statement" id="why">
        <div className="label">Why Kepler</div>
        <Statement />
        <p className="answer">{WHY.answer}</p>
        <div className="two">
          {WHY.pillars.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="cards" aria-label="What operators asked for">
        {CARDS.map((c) => (
          <article
            key={c.tag}
            className="card img"
            style={{ backgroundImage: `url(${ASSETS}/${c.image})`, backgroundPosition: c.position }}
          >
            <span className="tag">{c.tag}</span>
            <div>
              <h3>{c.title}</h3>
              <p>{c.copy}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
