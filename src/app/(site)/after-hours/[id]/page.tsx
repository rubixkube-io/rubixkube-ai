import { notFound } from 'next/navigation'
import { AFTER_HOURS_CHALLENGES, findAfterHoursChallenge } from '@/data/after-hours'
import { AfterHoursLetter, afterHoursMetadata } from '../after-hours-letter'

type Props = { params: Promise<{ id: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return AFTER_HOURS_CHALLENGES.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const challenge = findAfterHoursChallenge(id)
  return challenge ? afterHoursMetadata(challenge, `/after-hours/${id}`) : {}
}

export default async function AfterHoursChallengePage({ params }: Props) {
  const { id } = await params
  const challenge = findAfterHoursChallenge(id)
  if (!challenge) notFound()
  return <AfterHoursLetter challenge={challenge} path={`/after-hours/${id}`} />
}
