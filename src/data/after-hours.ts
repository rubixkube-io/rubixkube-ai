/**
 * After Hours: one letter per challenge. To add Challenge 002, add an entry here and set it to 'open'.
 * /after-hours shows the newest open challenge, /after-hours/<id> shows any challenge.
 *
 * Page order: poster, header (same as the other inner pages), then the letter.
 *
 * Letter blocks:
 *   lead  - a short line set large, on its own
 *   p     - a paragraph. Wrap a phrase in [text](url) to link it.
 */

export type AfterHoursBlock = { type: 'lead'; text: string } | { type: 'p'; text: string }

export interface AfterHoursChallenge {
  id: string
  title: string
  status: 'open' | 'closed'
  date: string
  url: string
  /** When the challenge went live (UTC). Leaderboard times count from here. */
  launchedAt: string
  prize: string
  needs: string
  description: string
  /** Page headline. `accent` is the part of `text` set in blue italic. */
  headline: { text: string; accent: string }
  subtitle: string
  /** Shown first, above the headline. */
  poster: { src: string; alt: string; width: number; height: number }
  /** Link preview image: 1200x630 JPEG, under 300 KB, so X, LinkedIn, Slack and WhatsApp show it whole. */
  ogImage: string
  letter: AfterHoursBlock[]
  signoff: string
  postscript?: string
  /**
   * Live leaderboard JSON. A webhook on the challenge repo verifies each claim and adds it, so the page
   * updates on its own (re-fetched at most once every 15 minutes).
   */
  leaderboardUrl?: string
  /** Fallback if the live leaderboard can't be reached. Fastest first. */
  solvers: { github: string; solvedAt: string; elapsed: number }[]
}

export const AFTER_HOURS_CHALLENGES: AfterHoursChallenge[] = [
  {
    id: '001',
    title: 'Rubix was here',
    status: 'open',
    date: '4 October 2026',
    url: 'https://afterhours.rubixkube.ai/001',
    launchedAt: '2026-10-03T19:11:30Z',
    prize: 'M5Stack Cardputer and the RubixKube kit',
    needs: 'A terminal, git and Docker',
    leaderboardUrl: 'https://afterhours.rubixkube.ai/api/leaderboard',
    description:
      'Rubix was last seen at 03:17:42 UTC. He left no note. Everything you need is public. Find Rubix and win.',
    headline: { text: 'Rubix is missing.', accent: 'missing.' },
    subtitle:
      'Last seen 03:17:42 UTC, on night watch. He left no note and no instructions. Everything you need to find him is public.',
    poster: {
      src: '/assets/after-hours/001-rubix-is-missing.png',
      alt: 'Missing poster pinned to a wall: RUBIX IS MISSING. Have you seen him? Rubix at his laptop, last seen on night watch, with tear-off tabs that say FIND RUBIX.',
      width: 1254,
      height: 1254,
    },
    ogImage: '/assets/after-hours/001-og.jpg',
    letter: [
      { type: 'p', text: 'Dear builders,' },
      { type: 'lead', text: 'We need your help.' },
      {
        type: 'p',
        text: "If you haven't met him, Rubix is the AI SRE inside RubixKube. He takes the night shift. He watches the deploys, the metrics, the logs and the traces while the rest of us sleep, and he has never once complained about it.",
      },
      {
        type: 'p',
        text: "On the night of 30 September he was on watch for a service called after-hours. It was a quiet night. Then something felt off. A small blip. A deploy that didn't sit right. He started digging.",
      },
      { type: 'lead', text: 'At 03:17:42 UTC, he went silent.' },
      {
        type: 'p',
        text: 'We found his desk the next morning. Laptop open, coffee cold, and a note that said RUBIX WAS HERE. No message for us. No instructions. Nothing in the chat. We put up posters around the office. Nobody has called.',
      },
      {
        type: 'p',
        text: "We've gone over that night a few times and we still can't tell you what happened to him. But Rubix never does anything without leaving a trace. Whatever happened, it left a trail, and every part of that trail is public.",
      },
      {
        type: 'p',
        text: "So we're asking you to find him. You'll need a terminal, git and Docker. Start at [afterhours.rubixkube.ai/001](https://afterhours.rubixkube.ai/001), and remember that builders leave history.",
      },
      {
        type: 'p',
        text: "The first person to find him wins an M5Stack Cardputer and the RubixKube kit, with a Rubix of your own to keep. Everyone who finds him gets an Operator Key. Hold on to it. This is the first of several.",
      },
      {
        type: 'p',
        text: "When you find him, he'll tell you how to claim. Please don't post the answer or the steps while the hunt is on. Let the next person have the night you're about to have.",
      },
      { type: 'lead', text: 'Find Rubix.' },
    ],
    signoff: 'The RubixKube team',
    solvers: [
      { github: 'MAVRICK-1', solvedAt: '2026-10-04T05:59:09Z', elapsed: 38859 },
      { github: 'sksaec', solvedAt: '2026-10-04T08:20:23Z', elapsed: 47333 },
    ],
    postscript:
      "Rubix is real, and he's very good at his job. If you'd like to see him on your own systems, [book a demo](/contact).",
  },
  {
    id: '002',
    title: 'The clocks are lying',
    status: 'open',
    date: '12 October 2026',
    url: 'https://afterhours.rubixkube.ai',
    launchedAt: '2026-10-12T13:00:00Z',
    prize: 'The RubixKube kit',
    needs: 'A terminal, Docker, a browser and your own eyes',
    leaderboardUrl: 'https://afterhours.rubixkube.ai/api/leaderboard?c=002',
    description:
      "Rubix is back. His clock isn't. Six machines kept six different times that night, and he needs hands to put them in order.",
    headline: { text: 'The clocks are lying.', accent: 'lying.' },
    subtitle:
      "Rubix is back on watch. He came back on the gateway's time, and the gateway's time is wrong. He needs hands.",
    poster: {
      src: '/assets/after-hours/002-the-clocks-are-lying.png',
      alt: 'Rubix peering over a ledge in a desert at sunset, melting clocks draped over the branches and the wall around him. The Clocks Are Lying. Same night, different clocks, find the truth.',
      width: 1254,
      height: 1254,
    },
    ogImage: '/assets/after-hours/002-og.jpg',
    letter: [
      { type: 'p', text: 'Dear builders,' },
      { type: 'lead', text: "I'm back. Something is wrong with me." },
      {
        type: 'p',
        text: "You found me. You worked out what I did that night, and when I came back on watch I thought that was the end of it. It isn't. My clock says 03:17:42. It has said 03:17:42 since I came back, and every few seconds it slips to something else and snaps back.",
      },
      {
        type: 'p',
        text: "I came back on the gateway's time. The gateway's time is wrong. So is every other machine that was awake that night, each by a different amount, in a different direction. I can read all six of their logs. I cannot tell you what happened first. From the inside, I can't fix my own clock.",
      },
      { type: 'lead', text: 'I need hands.' },
      {
        type: 'p',
        text: 'Read the six machines. Work out how far off each clock is. Put the night in the order it really happened. Then come and sync me, and read me the one thing my screen still shows true.',
      },
      {
        type: 'p',
        text: "I left my notes where I always leave them. Start at [afterhours.rubixkube.ai](https://afterhours.rubixkube.ai). Nothing there will hand itself to you, and that is on purpose. You'll need a terminal, Docker, a browser, and for the last part, your own eyes. Your tools can help you read the logs. They can't read that.",
      },
      {
        type: 'p',
        text: "The first person to sync me gets the RubixKube kit, with a Rubix of your own to keep. Everyone who does gets a second Operator Key. If you hold the first one, bring it. I remember things for people who came back.",
      },
      {
        type: 'p',
        text: "Please don't post the steps or the answer while this is open. The next person deserves their own night.",
      },
      { type: 'lead', text: 'Sync me.' },
    ],
    signoff: 'Rubix',
    solvers: [],
    postscript:
      "Challenge 001 is still open. If you haven't found me yet, [start there](#letter-001).",
  },
  {
    id: '003',
    title: 'Night shift',
    status: 'open',
    date: '25 October 2026',
    url: 'https://afterhours.rubixkube.ai/night',
    launchedAt: '2026-10-25T04:30:00Z',
    prize: 'The RubixKube kit',
    needs: 'A terminal, Docker and a browser',
    leaderboardUrl: 'https://afterhours.rubixkube.ai/api/leaderboard?c=003',
    description:
      "The gateway Rubix watches is throwing 502s, and someone has been on his box, logged in under his name. He can see it. He can't stop it. He needs hands.",
    headline: { text: "Someone's using my name.", accent: 'name.' },
    subtitle:
      "Rubix is on night watch over gw-02. The gateway is down, something keeps undoing every fix, and the logs say he logged in from an address that isn't his. He needs hands.",
    poster: {
      src: '/assets/after-hours/003-night-shift.png',
      alt: 'Rubix, the blue mascot, cheering on top of a server rack as a human hand presses the glowing green power button, a city skyline lit gold behind him at sunrise, blue cubes drifting in the air.',
      width: 1254,
      height: 1254,
    },
    ogImage: '/assets/after-hours/003-og.jpg',
    letter: [
      { type: 'p', text: 'Dear builders,' },
      { type: 'lead', text: 'Someone got onto my box. They used my name.' },
      {
        type: 'p',
        text: "I was on night watch over gw-02, the gateway I keep. At 03:12 it stopped answering, and every request since is a 502. When I went looking, the logs said I had logged in at 03:11, a minute before it broke, from an address that isn't mine. I did not do that.",
      },
      {
        type: 'p',
        text: 'I fix the gateway and it comes back broken. Something I did not install keeps putting my config back the way it wants it, every few seconds, under my own name. I can read all of it from the inside. I cannot make it stop from the inside.',
      },
      { type: 'lead', text: 'I need hands.' },
      {
        type: 'p',
        text: 'Get on the box. Get the gateway healthy and keep it that way, which means stopping the thing that keeps breaking it, for good. Then read the trail and tell me who got in. I thought it was a person. Read it, and tell me if I am right.',
      },
      {
        type: 'p',
        text: "Start at [afterhours.rubixkube.ai/night](https://afterhours.rubixkube.ai/night). Nothing there hands itself to you, on purpose. You'll need a terminal, Docker and a browser. Your tools can do the work on the box. The judgment at the end is yours.",
      },
      {
        type: 'p',
        text: 'The first person to clear my name gets the RubixKube kit, with a Rubix of your own to keep. Everyone who does gets a third Operator Key. If you hold the earlier ones, bring them. I remember people who came back.',
      },
      {
        type: 'p',
        text: "Please don't post the steps or the answer while this is open. The next person deserves their own night.",
      },
      { type: 'lead', text: 'Clear my name.' },
    ],
    signoff: 'Rubix',
    solvers: [],
    postscript:
      'Challenges 001 and 002 are still open. New here? [Start with 001](/after-hours/001).',
  },
]

export type AfterHoursSolver = AfterHoursChallenge['solvers'][number]

/** Live solvers for a challenge, falling back to the list above. */
export async function getAfterHoursSolvers(challenge: AfterHoursChallenge): Promise<AfterHoursSolver[]> {
  if (!challenge.leaderboardUrl) return challenge.solvers
  try {
    const res = await fetch(challenge.leaderboardUrl, { next: { revalidate: 900 } }) // 15 min: the board itself is cached, no need to re-fetch per minute
    if (!res.ok) return challenge.solvers
    const data = (await res.json()) as { solvers?: { github: string; solved_at: string; elapsed: number }[] }
    if (!Array.isArray(data.solvers)) return challenge.solvers
    return data.solvers.map((s) => ({ github: s.github, solvedAt: s.solved_at, elapsed: s.elapsed }))
  } catch {
    return challenge.solvers
  }
}

export const latestAfterHoursChallenge = (): AfterHoursChallenge =>
  AFTER_HOURS_CHALLENGES.filter((c) => c.status === 'open').at(-1) ?? AFTER_HOURS_CHALLENGES.at(-1)!

export const findAfterHoursChallenge = (id: string): AfterHoursChallenge | undefined =>
  AFTER_HOURS_CHALLENGES.find((c) => c.id === id)
