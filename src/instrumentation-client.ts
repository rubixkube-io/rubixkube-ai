// PostHog product analytics (US cloud), set up per posthog.com/docs/libraries/next-js.
// Same project as the console, so a visitor here is the same person after they sign up there:
// PostHog's cookie is shared across rubixkube.ai subdomains.
import posthog from 'posthog-js'

// The project token is public: it can only send events. The env var overrides it.
const TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ?? 'phc_kREi8JtTZndNYzKMmkxhdtS7724SoPY2byWUFynsDXgF'

// the Sanity Studio at /studio is for the team, not visitors
if (process.env.NODE_ENV === 'production' && !location.pathname.startsWith('/studio')) {
  posthog.init(TOKEN, {
    // through this site's own address (next.config.ts rewrites), so ad blockers don't drop it
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '/ingest',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-05-30',
    // nothing is captured until the visitor chooses in the cookie banner (src/components/cookie-banner.tsx);
    // Accept turns on cookies, Decline counts the visit without any (needs "Cookieless server hash mode"
    // on in the PostHog project). Per posthog.com/docs/tutorials/cookieless-tracking.
    cookieless_mode: 'on_reject',
    // replays never record what people type into forms
    session_recording: { maskAllInputs: true },
  })
}
