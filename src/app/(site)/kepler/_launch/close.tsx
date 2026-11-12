'use client'

import posthog from 'posthog-js'
import { AppleIcon, DownloadIcon, LinuxIcon, WindowsIcon } from './icons'
import { Notify } from './notify'
import { SYSTEMS, useDownloads, type Os } from './use-downloads'
import type { Left } from './use-launch'

const ICON: Record<Os, () => React.JSX.Element> = { mac: AppleIcon, win: WindowsIcon, linux: LinuxIcon }
const unit = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

/** One row per system, the visitor's own marked, each file from the latest release. */
function Downloads() {
  const { os, files, version } = useDownloads()
  return (
    <div className="dltable" id="download">
      <ul className="dlrows">
        {SYSTEMS.map((s) => {
          const Icon = ICON[s.os]
          return (
            <li key={s.os} className={s.os === os ? 'mine' : undefined}>
              <div className="os">
                <Icon />
                <b>{s.name}</b>
                <em className="here">this machine</em>
              </div>
              <p>{s.detail}</p>
              <div className="acts">
                {files[s.os].map((f) => (
                  <a
                    key={f.label}
                    className="dlb"
                    href={f.url}
                    rel="noopener"
                    onClick={() => posthog.capture('kepler_download_clicked', { platform: f.key, from: 'downloads' })}
                  >
                    {s.os !== 'linux' && <DownloadIcon />}
                    {f.label}
                    {s.os !== 'linux' && f.size && <small>{f.size}</small>}
                  </a>
                ))}
              </div>
            </li>
          )
        })}
      </ul>
      {version && <p className="ver">Current version {version}.</p>}
    </div>
  )
}

export function Close({ live, left }: { live: boolean; left: Left }) {
  const minutes = left.days * 1440 + left.hours * 60 + left.minutes
  return (
    <section className="close" id="notify">
      <h2>
        <span>It&apos;s time something</span>
        <span className="l2">stayed up with you.</span>
      </h2>
      {live ? (
        <Downloads />
      ) : (
        <div className="row">
          <p className="when">
            Opens in{' '}
            <b>
              {unit(Math.floor(minutes / 1440), 'day')}, {unit(Math.floor((minutes % 1440) / 60), 'hour')} and{' '}
              {unit(minutes % 60, 'minute')}
            </b>
            .
          </p>
          <Notify />
        </div>
      )}
    </section>
  )
}
