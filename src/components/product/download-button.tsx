'use client'

import { Button } from '@/components/ui/button'
import { FALLBACK_URL, PLATFORM_NAMES, rowsFromRelease } from '@/app/(site)/kepler/releases'
import { useLatestRelease } from './use-latest-release'

/** One button. Says "Download" and links to the latest release until the visitor's platform is known. */
export function DownloadButton({ className }: { className?: string }) {
  const { release, platform } = useLatestRelease()
  const row = platform ? rowsFromRelease(release).find((r) => r.key === platform) : undefined
  return (
    <Button asChild size="lg" className={className}>
      <a href={row?.url ?? FALLBACK_URL}>{platform ? `Download for ${PLATFORM_NAMES[platform]}` : 'Download'}</a>
    </Button>
  )
}
