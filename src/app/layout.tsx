import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { StructuredData } from '@/components/structured-data'
import './globals.css'

/** Same stylesheet as redesign.html — next/font was rendering heavier than the standalone prototype. */
const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Rajdhani:wght@400;700&display=swap'

export const metadata: Metadata = {
  metadataBase: new URL('https://rubixkube.ai'),
  title: 'RubixKube — Site Reliability Intelligence',
  description:
    'AI-native Site Reliability Intelligence: detect anomalies, diagnose root cause, and resolve failures autonomously.',
  keywords: [
    'site reliability intelligence',
    'AI SRE',
    'autonomous remediation',
    'reduce MTTR',
    'Kubernetes reliability',
    'root cause analysis',
  ],
  authors: [{ name: 'RubixKube' }],
  openGraph: {
    title: 'RubixKube — Site Reliability Intelligence',
    description: 'Detect, diagnose, and heal issues before customers feel them.',
    url: 'https://rubixkube.ai',
    siteName: 'RubixKube',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RubixKube — Site Reliability Intelligence',
    description: 'Detect, diagnose, and heal issues before customers feel them.',
  },
  other: {
    viewport: 'width=device-width, initial-scale=1',
    'theme-color': '#f2f0eb',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <StructuredData />
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
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="RubixKube — Site Reliability Intelligence" />
        <meta name="format-detection" content="telephone=no" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="RubixKube" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rubixkube.ai" />
        <meta property="og:title" content="RubixKube — Site Reliability Intelligence" />
        <meta
          property="og:description"
          content="Detect, diagnose, and heal issues before customers feel them."
        />
        <meta property="og:logo" content="https://rubixkube.ai/logo-icon.png" />
      </head>
      <body className="antialiased">
        <ThemeProvider defaultTheme="light" storageKey="rubixkube-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
