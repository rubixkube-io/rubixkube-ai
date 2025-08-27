import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from '@/components/theme-provider'
import { StructuredData } from '@/components/structured-data'
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rubixkube.ai'),
  title: "RubixKube - Site Reliability Intelligence",
  description: "Predict, prevent, and fix production issues before customers are impacted with AI-native reliability for Kubernetes and cloud.",
  keywords: [
    "site reliability intelligence",
    "AI SRE",
    "autonomous remediation",
    "reduce MTTR",
    "alert fatigue",
    "incident response automation",
    "root cause analysis",
    "Kubernetes reliability",
    "SLO management",
    "observability correlation",
    "governed automation",
    "revenue at risk"
  ],
  authors: [{ name: "RubixKube" }],
  openGraph: {
    title: "RubixKube - Site Reliability Intelligence",
    description: "Detect, diagnose, and heal issues before customers feel them.",
    url: "https://rubixkube.ai",
    siteName: "RubixKube",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://rubixkube.ai/og.jpg",
        width: 1200,
        height: 630,
        alt: "RubixKube - Site Reliability Intelligence",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "RubixKube - Site Reliability Intelligence",
    description: "Detect, diagnose, and heal issues before customers feel them.",
    images: ["https://rubixkube.ai/og.jpg"]
  },
  other: {
    "viewport": "width=device-width, initial-scale=1",
    "theme-color": "#000000"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        {/* Additional meta tags for WhatsApp and Slack compatibility */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="RubixKube" />
        <meta name="application-name" content="RubixKube" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileImage" content="https://rubixkube.ai/logo-icon.png" />
        {/* WhatsApp specific meta tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="RubixKube - Site Reliability Intelligence" />
        {/* WhatsApp additional requirements */}
        <meta property="og:image:secure_url" content="https://rubixkube.ai/og.jpg?v=20241201" />
        <meta name="whatsapp:image" content="https://rubixkube.ai/og.jpg?v=20241201" />
        <meta name="whatsapp:title" content="RubixKube - Site Reliability Intelligence" />
        <meta name="whatsapp:description" content="Detect, diagnose, and heal issues before customers feel them." />
        {/* Mobile-specific meta tags for better WhatsApp/Slack compatibility */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Cache-busting for WhatsApp and Slack */}
        <meta property="og:image" content="https://rubixkube.ai/og.jpg?v=20241201" />
        <meta name="twitter:image" content="https://rubixkube.ai/og.jpg?v=20241201" />
        {/* Additional Open Graph properties for better compatibility */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="RubixKube" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rubixkube.ai" />
        <meta property="og:title" content="RubixKube - Site Reliability Intelligence" />
        <meta property="og:description" content="Detect, diagnose, and heal issues before customers feel them." />
        {/* Slack specific meta tags */}
        <meta name="slack-app-id" content="RubixKube" />
        <meta name="slack-app-name" content="RubixKube" />
        <meta name="slack-app-description" content="Site Reliability Intelligence for the AI Era" />
        {/* 
          Debugging Open Graph for WhatsApp and Slack:
          1. Test with: https://developers.facebook.com/tools/debug/
          2. Test with: https://cards-dev.twitter.com/validator
          3. Clear WhatsApp cache by sharing to a new chat
          4. Clear Slack cache by posting in a new channel
          5. Check image accessibility: https://rubixkube.ai/og.jpg?v=20241201
        */}
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="rubixkube-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
