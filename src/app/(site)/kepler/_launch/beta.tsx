import { BETA_STATS, CHANGES, DISCORD_URL, HELPED, MEMBERS, VOICES } from '../content'
import { Linkedin, Youtube } from 'lucide-react'
import { HackDayMosaic } from './mosaic'

const ASSETS = '/kepler/launch'

const TINTS = ['#3b3fbf', '#c0397e', '#2aa7a0', '#e8a85c', '#5457E6', '#0F172A']

/** A steady tint per name, so a person keeps their colour */
const tint = (name: string) => TINTS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % TINTS.length]

/** A person's photo when we have one, else their initials on their tint */
function Avatar({ name, photo }: { name: string; photo?: string }) {
  if (photo) {
    // eslint-disable-next-line @next/next/no-img-element -- 48px avatars, already sized
    return <img className="av" src={`${ASSETS}/${photo}`} alt="" width={48} height={48} loading="lazy" />
  }
  return (
    <i className="av" style={{ background: tint(name) }}>
      {initials(name)}
    </i>
  )
}

/** A name and a small LinkedIn or YouTube icon, both linking to that person's profile */
function ProfileLink({ name, link }: { name: string; link?: string }) {
  if (!link) return <>{name}</>
  const youtube = isYoutube(link)
  return (
    <a
      className="profile"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title={`${name} on ${youtube ? 'YouTube' : 'LinkedIn'}`}
    >
      {name}
      {youtube ? <Youtube aria-hidden="true" /> : <Linkedin aria-hidden="true" />}
    </a>
  )
}

/** Whether a profile link is on YouTube, by its real hostname rather than anywhere in the text */
function isYoutube(link: string) {
  try {
    return ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(new URL(link).hostname.toLowerCase())
  } catch {
    return false
  }
}

/** Two letters for an avatar: the first letters of two words, else the first two of one */
function initials(name: string) {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (!words.length) return '·'
  return (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase()
}

/** Everyone on the Discord, in three rows that drift. Each row is listed twice so the loop has no seam. */
function Wall() {
  const per = Math.ceil(MEMBERS.length / 3)
  const rows = [0, 1, 2].map((r) => MEMBERS.slice(r * per, (r + 1) * per))
  return (
    <div className="marquee">
      {rows.map((names, r) => (
        <div className="mrow" key={r}>
          {[false, true].map((copy) => (
            <ul key={String(copy)} aria-hidden={copy || undefined}>
              {names.map((n, c) => (
                <li key={n}>
                  <i style={{ background: TINTS[(r * per + c) % TINTS.length] }}>{initials(n)}</i>
                  {n}
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
  )
}

function Voice({
  quote,
  name,
  role,
  photo,
  link,
  small,
}: {
  quote: string
  name: string
  role: string
  photo?: string
  link?: string
  small?: boolean
}) {
  return (
    <figure className={small ? 'voice small' : 'voice'}>
      <blockquote>{quote}</blockquote>
      <figcaption className="who">
        <Avatar name={name} photo={photo} />
        <span>
          <b>
            <ProfileLink name={name} link={link} />
          </b>
          {role}
        </span>
      </figcaption>
    </figure>
  )
}

export function Beta() {
  return (
    <>
      <section className="sect" id="people">
        <div className="sect-head">
          <h2>
            300+ operators shaped it.<span>This launch is theirs too.</span>
          </h2>
          <p>
            The beta ran in the open: the cohort, office hours, meetups and a full day of building in Pune. People ran Kepler on
            real systems, broke it, and told us what scared them.
          </p>
        </div>
        <div className="facts">
          {BETA_STATS.map((s) => (
            <div key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <HackDayMosaic />
        <h3 className="changes">You said. We changed.</h3>
        <div className="rows">
          {CHANGES.map((c) => (
            <div key={c.said} className="pair">
              <q>{c.said}</q>
              <p>
                <b>{c.outcome}</b> {c.change}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="band lights" aria-label="Every light is a person">
        <div className="head">
          <h2>
            Every light is someone<span>who made it better.</span>
          </h2>
        </div>
      </section>

      <section className="sect people-voices">
        <div className="voices">
          <Voice {...VOICES.main} />
          <div className="stack">
            {VOICES.more.map((v) => (
              <Voice key={v.quote} {...v} small />
            ))}
          </div>
        </div>
        <div className="helped">
          <h3>People who went out of their way</h3>
          <div className="grid">
            {HELPED.map((h) => (
              <figure key={h.name}>
                <div className="shot">
                  {h.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element -- 600x600 photos, shown whole
                    <img className="portrait" src={`${ASSETS}/${h.photo}`} alt={h.name} width={600} height={600} loading="lazy" />
                  ) : (
                    <i className="portrait" style={{ background: tint(h.name) }}>
                      {initials(h.name)}
                    </i>
                  )}
                </div>
                <figcaption>
                  <b>
                    <ProfileLink name={h.name} link={h.link} />
                  </b>
                  {h.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="wall">
          <div className="row1">
            <h3>And everyone on the Discord</h3>
            <a href={DISCORD_URL} rel="noopener">
              Join the Discord
            </a>
          </div>
          <Wall />
        </div>
      </section>
    </>
  )
}
