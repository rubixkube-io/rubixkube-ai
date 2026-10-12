import { AFTER_HOURS_CHALLENGES, latestAfterHoursChallenge } from '@/data/after-hours'
import { AfterHoursLetter, afterHoursMetadata } from './after-hours-letter'

// /after-hours always shows the newest open challenge.
export const metadata = afterHoursMetadata(latestAfterHoursChallenge(), '/after-hours')

// The newest open challenge on top, every earlier one below it, newest first.
export default function AfterHoursPage() {
  const latest = latestAfterHoursChallenge()
  const earlier = AFTER_HOURS_CHALLENGES.filter((c) => c.id !== latest.id).reverse()
  return <AfterHoursLetter challenge={latest} path="/after-hours" also={earlier} />
}
