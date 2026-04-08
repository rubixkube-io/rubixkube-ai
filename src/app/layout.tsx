import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

/** Same stylesheet as redesign.html — next/font was rendering heavier than the standalone prototype. */
const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Mono:wght@300;400;500&family=Rajdhani:wght@400;700&display=swap'

export const metadata: Metadata = {
  metadataBase: new URL('https://rubixkube.ai'),
  title: 'RubixKube | Site Reliability Intelligence',
  description:
    'AI-native SRI: infrastructure that heals itself. Detect anomalies, diagnose root cause, resolve failures autonomously. Memory, safety, Resilience.',
  keywords: [
    'site reliability intelligence',
    'SRI',
    'AI SRE',
    'AIOps',
    'autonomous remediation',
    'Kubernetes reliability',
    'root cause analysis',
    'agent mesh',
    'incident response automation',
  ],
  authors: [{ name: 'RubixKube' }],
  /**
   * Only site-wide Open Graph defaults here. Per-route title, description, url, and images must
   * come from each `page.tsx` / `generateMetadata` (or `opengraph-image.tsx`); putting homepage
   * url/title/description on the root layout duplicates tags and shows the wrong preview on /platform, /blog, etc.
   */
  openGraph: {
    siteName: 'RubixKube',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    viewport: 'width=device-width, initial-scale=1',
    'theme-color': '#f2f0eb',
    'og:logo': 'https://rubixkube.ai/logo-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS_HREF} rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f2f0eb" />
        <meta name="msapplication-TileColor" content="#f2f0eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RubixKube" />
        <meta name="application-name" content="RubixKube" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileImage" content="https://rubixkube.ai/logo-icon.png" />
        <meta name="format-detection" content="telephone=no" />
        {/* Apply saved theme before paint so first frame matches localStorage (pairs with ThemeProvider). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var k='rubixkube-theme',t=localStorage.getItem(k)||'light';if(t!=='dark'&&t!=='light')t='light';var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t;}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="light" storageKey="rubixkube-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
