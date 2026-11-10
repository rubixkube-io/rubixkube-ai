import test from 'node:test'
import assert from 'node:assert/strict'
import { FALLBACK_URL, rowsFromRelease, detectPlatform } from '../../src/app/(site)/kepler/releases.ts'

const release = {
  tag_name: 'v0.4.2',
  assets: [
    { name: 'Kepler_0.4.2_aarch64.dmg', browser_download_url: 'https://x/a.dmg', size: 104857600 },
    { name: 'kepler_0.4.2_amd64.deb', browser_download_url: 'https://x/a.deb', size: 52428800 },
    { name: 'kepler-0.4.2.x86_64.rpm', browser_download_url: 'https://x/a.rpm', size: 53477376 },
    { name: 'Kepler_0.4.2_x64-setup.exe', browser_download_url: 'https://x/a.exe', size: 62914560 },
  ],
}

test('null release gives the fallback on every row', () => {
  const rows = rowsFromRelease(null)
  assert.equal(rows.length, 4)
  for (const r of rows) assert.deepEqual([r.url, r.size, r.version], [FALLBACK_URL, null, null])
})

test('assets map to rows with size and version', () => {
  const rows = rowsFromRelease(release)
  assert.deepEqual(rows.map((r) => r.key), ['macos-arm', 'linux-deb', 'linux-rpm', 'windows'])
  assert.equal(rows[0].url, 'https://x/a.dmg')
  assert.equal(rows[0].size, 104857600)
  assert.equal(rows[3].url, 'https://x/a.exe')
  assert.ok(rows.every((r) => r.version === 'v0.4.2'))
})

test('a missing asset falls back for that row only', () => {
  const rows = rowsFromRelease({ ...release, assets: release.assets.slice(0, 2) })
  assert.equal(rows[0].url, 'https://x/a.dmg')
  assert.equal(rows[2].url, FALLBACK_URL)
  assert.equal(rows[2].version, null)
})

test('detectPlatform reads three user agents', () => {
  assert.equal(detectPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'), 'macos-arm')
  assert.equal(detectPlatform('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120'), 'windows')
  assert.equal(detectPlatform('Mozilla/5.0 (X11; Linux x86_64) Firefox/121'), 'linux-deb')
  assert.equal(detectPlatform('curl/8.0'), null)
  assert.equal(detectPlatform('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'), null)
  assert.equal(detectPlatform('Mozilla/5.0 (Linux; Android 14; Pixel 8) Chrome/120 Mobile'), null)
})

test('the two Linux rows have different labels', () => {
  const rows = rowsFromRelease(release)
  const labels = rows.map((r) => r.label)
  assert.equal(new Set(labels).size, labels.length)
  assert.deepEqual(labels.filter((l) => l.startsWith('Linux')), ['Linux (.deb)', 'Linux (.rpm)'])
})
