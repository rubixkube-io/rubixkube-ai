'use client'

import { formatSize, rowsFromRelease, type PlatformKey } from '../releases'
import { useLatestRelease } from '@/components/product/use-latest-release'

export type Os = 'mac' | 'win' | 'linux'

const OS_OF: Record<PlatformKey, Os> = { 'macos-arm': 'mac', windows: 'win', 'linux-deb': 'linux', 'linux-rpm': 'linux', 'linux-arch': 'linux' }

/** The latest release as the page lists it: one entry per system, the visitor's own system, and the version. */
export function useDownloads() {
  const { release, platform } = useLatestRelease()
  const rows = Object.fromEntries(rowsFromRelease(release).map((r) => [r.key, r])) as Record<PlatformKey, ReturnType<typeof rowsFromRelease>[number]>
  const file = (key: PlatformKey, label: string) => ({ label, url: rows[key].url, size: formatSize(rows[key].size) })
  return {
    os: platform ? OS_OF[platform] : null,
    version: release?.tag_name ?? null,
    files: {
      mac: [file('macos-arm', 'Download .dmg')],
      win: [file('windows', 'Download installer')],
      linux: [file('linux-deb', '.deb'), file('linux-rpm', '.rpm'), file('linux-arch', 'Arch')],
    } satisfies Record<Os, { label: string; url: string; size: string }[]>,
  }
}

export const SYSTEMS: { os: Os; name: string; detail: string; also: string }[] = [
  { os: 'mac', name: 'macOS', detail: 'Apple silicon, macOS 13 or later', also: 'Windows and Linux' },
  { os: 'win', name: 'Windows', detail: 'x64, Windows 10 or later', also: 'macOS and Linux' },
  { os: 'linux', name: 'Linux', detail: 'x64, Debian, Fedora or Arch', also: 'macOS and Windows' },
]
