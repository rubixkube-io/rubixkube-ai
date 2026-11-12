// The Kepler mark and the platform icons the launch page uses.

/** Kepler's planet, ring and moon. `ring` and `moon` take classes so the footer lockup can draw them in. */
export function KeplerMark({ ring, moon }: { ring?: string; moon?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse className={ring} cx="12" cy="12" rx="9" ry="4" transform="rotate(-28 12 12)" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.2" pathLength={60} />
      <circle cx="12" cy="12" r="3.1" fill="currentColor" />
      <g className={moon}>
        <circle cx="19.3" cy="7.7" r="1.6" fill="currentColor" />
      </g>
    </svg>
  )
}

export function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12.15 6.9c-.95 0-2.42-1.08-3.96-1.04-2.04.03-3.91 1.18-4.96 3.01-2.12 3.68-.55 9.1 1.52 12.09 1.01 1.45 2.21 3.09 3.79 3.04 1.52-.07 2.09-.99 3.94-.99 1.83 0 2.35.99 3.96.95 1.64-.03 2.68-1.48 3.68-2.95 1.16-1.69 1.64-3.33 1.66-3.42-.04-.01-3.18-1.22-3.22-4.86-.03-3.04 2.48-4.49 2.6-4.56-1.43-2.09-3.62-2.32-4.39-2.38-2-.16-3.68 1.09-4.62 1.09zm3.38-3.07c.84-1.01 1.4-2.43 1.25-3.83-1.21.05-2.66.8-3.53 1.82-.78.9-1.45 2.34-1.27 3.71 1.34.1 2.72-.69 3.55-1.7z" />
    </svg>
  )
}

export function WindowsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M2 4.6 10 3.5v7.8H2zM11 3.4 22 2v9.3H11zM2 12.4h8v7.8L2 19.1zM11 12.4h11V22l-11-1.5z" />
    </svg>
  )
}

export function LinuxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2c-3 0-4.6 2.4-4.6 5.4 0 1.5-.5 2.6-1.5 4C4.7 13 4 14.8 4 16.6c0 1.2.4 2.1 1 2.7-.7.4-1.4 1-1.4 1.7 0 .6.5 1 1.3 1h3.4c.8 0 1.4-.4 1.7-1h4c.3.6.9 1 1.7 1h3.4c.8 0 1.3-.4 1.3-1 0-.7-.7-1.3-1.4-1.7.6-.6 1-1.5 1-2.7 0-1.8-.7-3.6-1.9-5.2-1-1.4-1.5-2.5-1.5-4C16.6 4.4 15 2 12 2zm-1.9 4.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm3.8 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM12 9.6c.8 0 1.6.4 1.6.8S12.8 11.6 12 11.6s-1.6-.8-1.6-1.2.8-.8 1.6-.8zm0 3.4c2 0 3.4 1.6 3.4 3.6S14 19.6 12 19.6s-3.4-1-3.4-3S10 13 12 13z" />
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2v8m-3.5-3.5L8 10l3.5-3.5M2.5 13.5h11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
