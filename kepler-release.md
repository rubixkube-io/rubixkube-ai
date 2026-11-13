# Kepler release cards

The Kepler desktop app shows short cards from a feed this site hosts: what's new after an update, a welcome when someone starts paying for Pro, and later, announcements. This file says how to add them and when people see them.

## Where the feed lives

- `public/kepler/feed.json` is the feed, served at https://rubixkube.ai/kepler/feed.json. Release builds of the app read it from there.
- Pictures and clips sit next to it, one folder per release: `public/kepler/0.2.0/`, `public/kepler/0.2.1/`.
- `netlify.toml` lets the app fetch the feed (CORS) and caches it for five minutes.
- kepler-app keeps a copy in `feed/` that dev builds read. Edit and check cards there first, then copy them here.

Merging to `main` publishes. Apps pick up a change within five minutes, the next time they start.

## When people see each card

| Card | `placement` | Shown |
|---|---|---|
| What's new | `whats_new` | Once per version, on the first launch of that version, after onboarding. |
| Pro welcome | `pro_welcome` | Once, when a plan turns into paid Pro while Kepler is open. |
| Announcement | `announcement` | Not shown automatically yet. The app can read them; showing each one once, with start and end dates, comes in a later app release. |

A what's-new card counts as seen only when someone closes it. If the slides go up late, people who already updated see them on their next launch.

## Releasing a new version

1. Write the slides in kepler-app `feed/feed.json`, with `version` set to the new version. Put its pictures in kepler-app `feed/<version>/`.
2. Check them in the dev app: run `./dev.sh tauri`, open the inspector (right-click, Inspect), and run `window.dispatchEvent(new CustomEvent("kepler:card-preview", {detail: {placement: "whats_new", version: "<version>"}}))`. Check light and dark themes.
3. Run kepler-app's tests: `npx vitest run src/whatsnew`. They read `feed/feed.json`, so a broken file fails.
4. Copy the new items into `public/kepler/feed.json` here, and the pictures into `public/kepler/<version>/`. Open a PR.
5. Merge it before the app release is published, so the first people to update see the card.
6. After the deploy, check `curl -sI https://rubixkube.ai/kepler/feed.json` shows `access-control-allow-origin: *`, and that a picture URL loads.

A release with nothing worth a card needs no items. The app then shows nothing.

## An item

```json
{
  "id": "0.2.1-fixes",
  "title": "Fixes from launch week",
  "content_text": "This update fixes what you reported after launch.\n- Watchers reconnect after sleep.\n- The terminal keeps its scrollback.",
  "image": "0.2.1/fixes.webp",
  "date_published": "2026-11-27T04:30:00Z",
  "_kepler": {
    "placement": "whats_new",
    "version": "0.2.1",
    "order": 1,
    "label": "Update",
    "image_alt": "What the picture shows",
    "action": { "kind": "settings", "section": "models", "label": "Open Models" }
  }
}
```

- `id`: unique and never reused. Start it with the version.
- `title`: one line.
- `content_text`: plain text. Each line is a paragraph. Lines starting with `- ` are a list.
- `image`: path relative to `feed.json`. For a GIF, use `image` too.
- `_kepler.placement`: `whats_new`, `pro_welcome` or `announcement`.
- `_kepler.version`: what's new only. The exact app version, like `0.2.1`.
- `_kepler.order`: slide order within the card.
- `_kepler.label`: optional small line above the title. Without it the card shows "What's new in <version>" or "Kepler Pro".
- `_kepler.image_alt`: what the picture shows, for screen readers.
- `_kepler.video`: optional clip, played muted on a loop. `image` is then its still frame.
- `_kepler.action`: optional, one button under the text:
  - `{ "kind": "plan", "label": "See plans" }` opens Plan & Usage.
  - `{ "kind": "settings", "section": "models", "label": "Open Models" }` opens a Settings section (`general`, `models`, `watchers`, `remote`, `usage` and the others in kepler-app `src/pages/Settings.tsx`).
  - `{ "kind": "ask", "label": "Try it", "text": "What changed in my environments today?" }` puts the question in the composer.
  - `{ "kind": "link", "label": "Download", "url": "https://rubixkube.ai/kepler" }` opens a link in the browser.

## Pictures, GIFs and clips

- Pictures: 16:9, 1200x675 webp, 30 to 100 KB. For example: `magick in.png -resize 1200x -gravity center -crop 1200x675+0+0 +repage -quality 80 out.webp`.
- GIFs: a few seconds, 640px wide, under 2 MB.
- Clips: a few seconds, 960px, H.264 mp4, no sound, with a still frame: `ffmpeg -t 6 -i in.mp4 -an -vf scale=960:-2 -c:v libx264 -crf 28 -pix_fmt yuv420p -movflags +faststart out.mp4`.
- The card keeps one height for all its slides, so give every slide in a card a picture, or none.
- Someone else's art (a model maker's launch image) needs their brand terms checked first.

## Writing the text

- Say what changed for the user and what they can do with it. Every line should mean something to someone who did not build it.
- Plain words, short sentences. Sentence case. No em dashes.
- Facts, not guesses: no "may" or "might".
- No prices: the app never shows one outside Plan & Usage.
