/** When Kepler opens to everyone: 10:00 in India on 20 November 2026. The /kepler page switches from its
 *  countdown to its live copy at this moment, on the server and in an open tab. */
export const LAUNCH_AT = Date.parse('2026-11-20T10:00:00+05:30')

export const isLive = (now: number) => now >= LAUNCH_AT

/** When the Product Hunt launch opens: 12:01 in California, 13:31 in India, the same day. From this moment the
 *  hero shows the Product Hunt badge where the docs button was. */
export const PRODUCT_HUNT_AT = Date.parse('2026-11-20T13:31:00+05:30')

/** The home launch card's copy (src/components/kepler-launch.tsx, not on any page). Flip to true in a one-line PR on
 *  launch day if the card comes back. The announcement bar switches on LAUNCH_AT by itself. */
export const KEPLER_DOWNLOADS_LIVE = false
