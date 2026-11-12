/** When Kepler opens to everyone: 10:00 in India on 20 November 2026. The /kepler page switches from its
 *  countdown to its live copy at this moment, on the server and in an open tab. */
export const LAUNCH_AT = Date.parse('2026-11-20T10:00:00+05:30')

export const isLive = (now: number) => now >= LAUNCH_AT

/** The rest of the site's launch copy (announcement bar, home banner). Flip to true in a one-line PR on launch day. */
export const KEPLER_DOWNLOADS_LIVE = false
