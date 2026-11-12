'use client'

import { Beta } from './beta'
import { Close } from './close'
import { Footer } from './footer'
import { Founder } from './founder'
import { Hero } from './hero'
import { Plans } from './plans'
import { Story } from './story'
import { useLaunch } from './use-launch'
import { Why } from './why'

/** The /kepler launch page. Before 20 November it counts down and collects emails; from then on it offers the
 *  download. `serverNow` is the time the page was rendered, so the first render matches the server's. */
export function KeplerLaunch({ serverNow }: { serverNow: number }) {
  const { live, left } = useLaunch(serverNow)
  return (
    <div className={live ? 'kl is-live' : 'kl'}>
      <Hero live={live} left={left} />
      <Why />
      <Story live={live} />
      <Beta />
      <Founder />
      <Plans live={live} />
      <Close live={live} left={left} />
      <Footer live={live} />
    </div>
  )
}
