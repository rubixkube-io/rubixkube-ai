export const REPO = 'rubixkube-io/kepler-releases'
export const FALLBACK_URL = 'https://github.com/rubixkube-io/kepler-releases/releases/latest'
const API_URL = 'https://api.github.com/repos/rubixkube-io/kepler-releases/releases/latest'
const CACHE_KEY = 'kepler.release.latest'
const CACHE_MS = 3600000

export type PlatformKey = 'macos-arm' | 'linux-deb' | 'linux-rpm' | 'windows'

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
  { key: 'macos-arm', label: 'macOS, Apple silicon (.dmg)', match: /\.dmg$/ },
  { key: 'linux-deb', label: 'Linux (.deb)', match: /\.deb$/ },
  { key: 'linux-rpm', label: 'Linux (.rpm)', match: /\.rpm$/ },
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
  if (/Mac/i.test(ua)) return 'macos-arm'
  if (/Win/i.test(ua)) return 'windows'
  if (/Linux|X11/i.test(ua)) return 'linux-deb'
  return null
}

export const PLATFORM_NAMES: Record<PlatformKey, string> = {
  'macos-arm': 'macOS',
  'linux-deb': 'Linux',
  'linux-rpm': 'Linux',
  windows: 'Windows',
}

export function formatSize(bytes: number | null): string {
  return bytes ? `${Math.round(bytes / 1048576)} MB` : ''
}

function cached(): Release | null {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (c && c.release && Date.now() - c.at < CACHE_MS) return c.release
  } catch {}
  return null
}

/** The latest release, or null on any failure. One lookup an hour per browser. */
export async function fetchLatest(): Promise<Release | null> {
  const have = cached()
  if (have) return have
  try {
    const res = await fetch(API_URL, { headers: { Accept: 'application/vnd.github+json' } })
    if (!res.ok) return null
    const release = await res.json()
    if (!release || typeof release.tag_name !== 'string' || !Array.isArray(release.assets)) return null
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), release }))
    } catch {}
    return release
  } catch {
    return null
  }
}
