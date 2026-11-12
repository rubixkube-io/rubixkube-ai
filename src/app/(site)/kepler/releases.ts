export const FALLBACK_URL = 'https://github.com/rubixkube-io/kepler-releases/releases/latest'
const API_URL = 'https://api.github.com/repos/rubixkube-io/kepler-releases/releases/latest'
const CACHE_KEY = 'kepler.release.latest'
const CACHE_MS = 3600000
const FAIL_MS = 300000

export type PlatformKey = 'macos-arm' | 'linux-deb' | 'linux-rpm' | 'linux-arch' | 'windows'

export type Release = {
  tag_name: string
  assets: { name: string; browser_download_url: string; size: number }[]
}

export type Row = {
  key: PlatformKey
  label: string
  url: string
  size: number | null
  version: string | null
}

/** Asset name patterns, copied from the old static site. */
export const PLATFORMS: { key: PlatformKey; label: string; match: RegExp }[] = [
  { key: 'macos-arm', label: 'macOS (Apple silicon)', match: /\.dmg$/ },
  { key: 'linux-deb', label: 'Linux (.deb)', match: /\.deb$/ },
  { key: 'linux-rpm', label: 'Linux (.rpm)', match: /\.rpm$/ },
  { key: 'linux-arch', label: 'Linux (Arch)', match: /\.pkg\.tar\.zst$/ },
  { key: 'windows', label: 'Windows (installer)', match: /-setup\.exe$/ },
]

export function rowsFromRelease(release: Release | null): Row[] {
  return PLATFORMS.map((p) => {
    const asset = release?.assets?.find((a) => p.match.test(a.name))
    if (!release || !asset) return { key: p.key, label: p.label, url: FALLBACK_URL, size: null, version: null }
    return { key: p.key, label: p.label, url: asset.browser_download_url, size: asset.size, version: release.tag_name }
  })
}

export function detectPlatform(ua: string): PlatformKey | null {
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return null
  if (/Mac/i.test(ua)) return 'macos-arm'
  if (/Win/i.test(ua)) return 'windows'
  if (/Linux|X11/i.test(ua)) return 'linux-deb'
  return null
}

export const PLATFORM_NAMES: Record<PlatformKey, string> = {
  'macos-arm': 'macOS (Apple silicon)',
  'linux-deb': 'Linux',
  'linux-rpm': 'Linux',
  'linux-arch': 'Linux',
  windows: 'Windows',
}

export function formatSize(bytes: number | null): string {
  return bytes ? `${Math.round(bytes / 1048576)} MB` : ''
}

function isRelease(r: unknown): r is Release {
  const x = r as Release | null
  return !!x && typeof x.tag_name === 'string' && Array.isArray(x.assets)
}

type Cached = { found: true; release: Release | null } | null

/** A fresh cache entry. A null release is a failed lookup, kept for five minutes. */
function cached(): Cached {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (!c || typeof c.at !== 'number') return null
    if (c.release === null) return Date.now() - c.at < FAIL_MS ? { found: true, release: null } : null
    if (isRelease(c.release) && Date.now() - c.at < CACHE_MS) return { found: true, release: c.release }
  } catch {}
  return null
}

function remember(release: Release | null) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), release }))
  } catch {}
}

let inflight: Promise<Release | null> | null = null

async function lookup(): Promise<Release | null> {
  try {
    const res = await fetch(API_URL, { headers: { Accept: 'application/vnd.github+json' } })
    const release = res.ok ? await res.json() : null
    const ok = isRelease(release) ? release : null
    remember(ok)
    return ok
  } catch {
    remember(null)
    return null
  }
}

/** The latest release, or null on any failure. One request per page load, one lookup an hour per browser. */
export function fetchLatest(): Promise<Release | null> {
  const have = cached()
  if (have) return Promise.resolve(have.release)
  inflight ??= lookup().finally(() => {
    inflight = null
  })
  return inflight
}
