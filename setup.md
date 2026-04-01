# RubixKube Website — Development Guide

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **CMS**: Sanity v4 (blog content)
- **Package Manager**: Yarn

## Prerequisites

- Node.js 20+
- Yarn

## Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Start with Turbopack (faster HMR)
yarn dev:turbo
```

Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
yarn dev           # Dev server
yarn dev:turbo     # Dev server with Turbopack
yarn build         # Production build
yarn build:turbo   # Production build with Turbopack
yarn start         # Start production server
yarn lint          # Run ESLint
yarn export-og     # Export OG images
```

## Project Structure

```
src/
├── app/
│   ├── globals.css                  # Design tokens + global styles
│   ├── layout.tsx                   # Root layout
│   ├── (site)/
│   │   ├── page.tsx                 # Home page
│   │   ├── platform/                # Platform page
│   │   ├── solutions/               # Solutions page
│   │   ├── pricing/                 # Pricing page
│   │   ├── resources/               # Resources page
│   │   ├── about/                   # About page
│   │   ├── contact/                 # Contact page
│   │   ├── blog/                    # Blog index + post pages (Sanity)
│   │   ├── status/                  # Status page
│   │   └── legal/                   # Privacy & Terms pages
│   ├── studio/                      # Sanity Studio (embedded)
│   └── api/og/                      # OG image generation
├── components/
│   ├── landing/                     # Landing page sections
│   │   ├── hero-section.tsx         # Hero with rotating metrics
│   │   ├── intelligence-section.tsx # Compounding memory / DAY1→ALWAYS cards
│   │   ├── brain-section.tsx        # Continuous intelligence + SVG diagram
│   │   ├── rca-section.tsx          # RCA flow section
│   │   ├── metrics-section.tsx      # Stats / proof points
│   │   ├── content-cards-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── built-on-section.tsx
│   │   ├── closing-landing-section.tsx
│   │   ├── partner-logos.tsx        # Customer logo grid / marquee
│   │   ├── landing-footer.tsx
│   │   └── landing-page.tsx         # Scroll-locked landing shell
│   ├── blog/                        # Blog-specific components
│   ├── ui/                          # Shared UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── section-label.tsx
│   │   ├── calendly-booking.tsx
│   │   └── synapse-animation.tsx
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── closing-cta.tsx
├── hooks/
│   └── use-reduced-motion.ts
├── lib/
│   ├── utils.ts
│   ├── animations.ts
│   ├── landing-responsive-type.ts   # Responsive type scale helpers
│   └── landing-inline-cta.ts
└── sanity/                          # Sanity client + schema types
```

```
sanity/                              # Sanity Studio config + schemas
context/                             # Design tokens, copy, SEO audit
```

## Customization

### Design Tokens
Edit CSS custom properties in `src/app/globals.css` (`--ink`, `--mid`, `--blue`, `--bg`, `--rule`, etc.)

### Content / Copy
- `context/copy.json` — site-wide copy
- `context/pages-copy.json` — page-specific copy
- Sanity Studio (`/studio`) — blog posts and authors

### Adding a Page
1. Create directory under `src/app/(site)/`
2. Add `page.tsx` and `layout.tsx`
3. Add route to `src/components/navbar.tsx`

## Deployment

Deployed on Vercel. Any push to `main` triggers a production deploy.

```bash
vercel --prod   # Manual deploy
```

## Troubleshooting

**Dev server won't start**
- Ensure Node 20+ is installed
- `rm -rf node_modules && yarn install`

**Build errors**
- `yarn tsc --noEmit` to catch TypeScript issues

**Styling issues**
- Tailwind v4 uses CSS-native config — check `src/app/globals.css` for token definitions, not `tailwind.config.ts`
