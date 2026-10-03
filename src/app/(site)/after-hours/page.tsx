import { latestAfterHoursChallenge } from '@/data/after-hours'
import { AfterHoursLetter, afterHoursMetadata } from './after-hours-letter'

// /after-hours always shows the newest open challenge.
export const metadata = afterHoursMetadata(latestAfterHoursChallenge(), '/after-hours')

export default function AfterHoursPage() {
  return <AfterHoursLetter challenge={latestAfterHoursChallenge()} path="/after-hours" />
}
