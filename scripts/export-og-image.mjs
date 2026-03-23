/**
 * Renders OG HTML artboards → public PNGs (1200×630).
 * Run: yarn export-og
 */
import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'public')
mkdirSync(outDir, { recursive: true })

const jobs = [
  { html: 'og-image.html', selector: '#og', out: 'og.png' },
  { html: 'og-dynamic-template.html', selector: '#og-dynamic', out: 'og-template.png' },
]

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
})

for (const { html, selector, out } of jobs) {
  const htmlPath = join(root, html)
  const fileUrl = `file://${htmlPath}`
  const outPath = join(outDir, out)
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 120000 })
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve())
  await new Promise((r) => setTimeout(r, 400))
  await page.locator(selector).screenshot({ path: outPath, type: 'png' })
  console.log('Wrote', outPath)
}

await browser.close()
