import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/site";
import { faqJsonLd, organizationJsonLd, serviceJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Used inside the brand wordmark SVG so the lockup matches Silv's source file.
const interTight = Inter_Tight({
  variable: "--font-tight",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: "%s | Fiveleaf",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "Silviu Major", url: SITE.url }],
  keywords: [
    "AI agents UK",
    "AI customer service",
    "AI implementation partner UK",
    "AI for operators",
    "AI for sales and operations",
    "Fiveleaf",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd(), faqJsonLd(), ...serviceJsonLd()];

  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/*
         * Resource hints for the cal.com inline embed at the bottom of
         * the page. dns-prefetch costs nothing and shaves the DNS round
         * trip; preconnect opens the TCP/TLS handshake early so by the
         * time the IntersectionObserver mounts the iframe, the
         * connection is already warm.
         */}
        <link rel="dns-prefetch" href="https://cal.com" />
        <link rel="dns-prefetch" href="https://app.cal.com" />
        <link rel="preconnect" href="https://cal.com" crossOrigin="anonymous" />
        <link
          rel="preconnect"
          href="https://app.cal.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-fl-surface text-fl-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-fl-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
