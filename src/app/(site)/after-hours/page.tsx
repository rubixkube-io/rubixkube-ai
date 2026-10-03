import { Metadata } from 'next'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { webPageJsonLd } from '@/components/structured-data'

const TITLE = 'Rubix is missing - RubixKube After Hours'
const DESCRIPTION =
  'Rubix was last seen at 03:17:42 UTC. He left no note. Everything you need is public. Find Rubix and win.'
const CHALLENGE_URL = 'https://afterhours.rubixkube.ai'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: 'RUBIX IS MISSING.', description: DESCRIPTION, url: 'https://rubixkube.ai/after-hours' },
  twitter: { card: 'summary_large_image', title: 'RUBIX IS MISSING.', description: DESCRIPTION },
  alternates: { canonical: '/after-hours' },
}

const pageJsonLd = webPageJsonLd({ name: TITLE, description: DESCRIPTION, url: 'https://rubixkube.ai/after-hours' })

const display = { fontFamily: 'Rajdhani, sans-serif' }

export default function AfterHoursPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <Navbar />
      <section className="px-4 pb-16 pt-28 sm:px-6 md:pt-32">
        <div className="mx-auto max-w-6xl rounded-2xl bg-[#0B1220] px-5 pb-20 pt-14 text-[#E4E9F3] sm:px-10 md:px-16 md:pt-20">
          <div className="flex flex-col-reverse gap-12 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 style={display} className="text-[clamp(44px,9vw,112px)] font-bold leading-[0.9] tracking-[0.01em]">
                RUBIX IS MISSING.
              </h1>

              <p className="mt-10 font-mono text-[15px] text-[#6B7894]">
                Last seen{' '}
                <span style={display} className="align-[-0.06em] text-[30px] text-[#E4E9F3] tabular-nums">
                  03:17:42
                </span>{' '}
                UTC
              </p>

              <div className="mt-10 max-w-xl space-y-1 font-serif text-[clamp(21px,2.4vw,27px)] italic leading-snug">
                <p>He left no note.</p>
                <p>He left no instructions.</p>
                <p>Everything you need is public.</p>
              </div>
            </div>
            <figure className="w-[220px] shrink-0 rounded-lg border border-dashed border-[#3A4A6B] p-5 md:w-[260px]">
              <Image
                src="/assets/after-hours/rubix.webp"
                alt="Rubix, the RubixKube AI SRE"
                width={536}
                height={560}
                className="h-auto w-full"
                priority
              />
              <figcaption className="mt-4 font-mono text-[13px] leading-relaxed text-[#9AA5BD]">
                Missing: Rubix
                <br />
                AI SRE. Last seen on night watch.
              </figcaption>
            </figure>
          </div>
          <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href={CHALLENGE_URL}
              className="inline-flex w-fit items-center rounded-md bg-[#2F5BFF] px-6 py-3.5 font-mono text-[15px] font-medium text-white transition-colors hover:bg-[#244BE0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4E9F3]"
            >
              Start at afterhours.rubixkube.ai
            </a>
            <p className="font-mono text-[14px] text-[#6B7894]">builders leave history.</p>
          </div>

          <div className="mt-24 grid gap-12 border-t border-[#22304D] pt-12 md:grid-cols-2">
            <div>
              <h2 style={display} className="text-[24px] font-bold tracking-[0.03em]">
                Find Rubix. Win.
              </h2>
              <p className="mt-3 max-w-md font-mono text-[14px] leading-relaxed text-[#9AA5BD]">
                The first person to find Rubix wins an M5Stack Cardputer and the RubixKube kit. That includes a Rubix
                you get to keep.
              </p>
            </div>
            <div>
              <h2 style={display} className="text-[24px] font-bold tracking-[0.03em]">
                How it works
              </h2>
              <p className="mt-3 max-w-md font-mono text-[14px] leading-relaxed text-[#9AA5BD]">
                You need a terminal, git and docker. When you find him, you get a flag and an Operator Key. Claim your
                spot by opening an issue on rubixkube-io/after-hours with your key. Please don&apos;t post the answer
                or the steps until the challenge closes.
              </p>
              <p className="mt-4 max-w-md font-mono text-[14px] leading-relaxed text-[#9AA5BD]">
                Keep your Operator Key. This is the first of several.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
