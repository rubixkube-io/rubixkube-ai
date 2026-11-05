import type { Metadata } from 'next'
import { ThemeProvider, themeInitScript } from '@/components/theme-provider'
import './fonts.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rubixkube.ai'),
  title: 'RubixKube | AI SRE for Kubernetes, Cloud and VMs',
  description:
    'RubixKube is an AI SRE. It watches Kubernetes, clouds and machines, finds the root cause of every incident with evidence, and proposes the fix.',
  keywords: [
    'AI SRE',
    'AI SRE agent',
    'AI root cause analysis',
    'AIOps',
    'Kubernetes troubleshooting',
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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preload" href="/fonts/figtree-normal-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
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
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
