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
   * Verified solvers, fastest first. Add one after checking their key with
   * GET https://afterhours.rubixkube.ai/api/verify?key=... and that the claim came from the same GitHub account.
   * `solvedAt` and `elapsed` (seconds since launch) come straight from that response.
   */
  solvers: { github: string; solvedAt: string; elapsed: number }[]
}

export const AFTER_HOURS_CHALLENGES: AfterHoursChallenge[] = [
  {
    id: '001',
    title: 'Rubix was here',
    status: 'open',
    date: '4 October 2026',
    url: 'https://afterhours.rubixkube.ai',
    launchedAt: '2026-10-03T19:11:30Z',
    prize: 'M5Stack Cardputer and the RubixKube kit',
    needs: 'A terminal, git and Docker',
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
        text: "So we're asking you to find him. You'll need a terminal, git and Docker. Start at [afterhours.rubixkube.ai](https://afterhours.rubixkube.ai), and remember that builders leave history.",
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
]

export const latestAfterHoursChallenge = (): AfterHoursChallenge =>
  AFTER_HOURS_CHALLENGES.filter((c) => c.status === 'open').at(-1) ?? AFTER_HOURS_CHALLENGES.at(-1)!

export const findAfterHoursChallenge = (id: string): AfterHoursChallenge | undefined =>
  AFTER_HOURS_CHALLENGES.find((c) => c.id === id)
