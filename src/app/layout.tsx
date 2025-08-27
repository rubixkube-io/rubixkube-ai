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
  metadataBase: new URL('https://rubixkube.io'),
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
    url: "https://rubixkube.io",
    siteName: "RubixKube",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RubixKube - Site Reliability Intelligence",
    description: "Detect, diagnose, and heal issues before customers feel them.",
  },
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
