import { MILESTONES, STORY_STATS, type Milestone } from '../content'

/** 136 days on the ring: the milestones, then the opening as the last stop. Phones get them as a list. */
export function Story({ live }: { live: boolean }) {
  const opening: Milestone = { date: '20 November', title: `${live ? 'Open' : 'Opens'} to everyone`, left: 87.5, top: 33.3 }
  return (
    <section className="band days" id="days" aria-label="136 days from first commit to launch">
      <div className="head">
        <h2>
          136 days,<span>first commit to launch.</span>
        </h2>
        <p>Built in the open with the operators who would use it, and changed every time they told us it was wrong.</p>
      </div>
      <div className="art" aria-hidden="true">
        {[...MILESTONES, opening].map((m) => (
          <div key={m.date} className={m === opening ? 'stop next up' : 'stop up'} style={{ left: `${m.left}%`, top: `${m.top}%` }}>
            <i />
            <div>
              <time>{m.date}</time>
              <strong>{m.title}</strong>
              {m.note && <span>{m.note}</span>}
            </div>
          </div>
        ))}
      </div>
      <ol className="tl-list">
        {[...MILESTONES, opening].map((m) => (
          <li key={m.date} className={m === opening ? 'next' : undefined}>
            <time>{m.date}</time>
            <strong>{m.title}</strong>
            {m.note && <span>{m.note}</span>}
          </li>
        ))}
      </ol>
      <div className="foot">
        {STORY_STATS.map((s) => (
          <div key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
