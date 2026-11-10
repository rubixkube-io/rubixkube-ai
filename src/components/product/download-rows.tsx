'use client'

import { formatSize, rowsFromRelease } from '@/app/(site)/kepler/releases'
import { Button } from '@/components/ui/button'
import { useLatestRelease } from './use-latest-release'

const mono = 'font-[family-name:var(--font-mono)]'
const sans = 'font-[family-name:var(--font-figtree)]'

/** One row per platform, linking to the asset in the latest release, or to the releases page when it is not known. */
export function DownloadRows() {
  const { release, platform } = useLatestRelease()
  const rows = rowsFromRelease(release)
  return (
    <ul className="m-0 list-none overflow-hidden rounded-2xl p-0 ring-1 ring-[var(--rule)]">
      {rows.map((row, i) => (
        <li
          key={row.key}
          className={`flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6 ${i > 0 ? 'border-t border-[var(--rule)]' : ''} ${row.key === platform ? 'bg-[var(--panel)]' : ''}`}
        >
          <div className="min-w-0">
            <p className={`${sans} m-0 text-[16px] text-[var(--ink)]`}>{row.label}</p>
            <p className={`${mono} m-0 mt-1 min-h-[1.25rem] text-[12px] tracking-[0.1em] text-[var(--mid)] uppercase`}>
              {[row.version, formatSize(row.size)].filter(Boolean).join(' · ')}
            </p>
          </div>
          <Button asChild size="sm" variant={row.key === platform ? 'primary' : 'outline'}>
            <a href={row.url}>Download</a>
          </Button>
        </li>
      ))}
    </ul>
  )
}
