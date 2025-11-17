import type React from "react"
import type { Metadata } from "next"
import { Outfit } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import CookieBanner from "@/components/cookie-banner"
import { StructuredData } from "@/components/structured-data"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { SkipToContent } from "@/components/skip-to-content"
import { AIChatbotWrapper } from "@/components/ai-chatbot-wrapper"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://binsoai.ch"),
  title: {
    default: "IT-Dienstleistungen & Outsourcing | binso - Ihre IT-Partner",
    template: "%s | binso",
  },
  description:
    "binso bietet umfassende IT-Dienstleistungen für Privat und Geschäfte: Azure M365, Cyber Security, Consulting, Support, Cloud-Lösungen, Netzwerk & Infrastruktur, Website-Entwicklung und IT-Outsourcing.",
  keywords: [
    "IT Dienstleistungen",
    "IT Outsourcing",
    "Azure M365",
    "Cyber Security",
    "IT Consulting",
    "IT Support",
    "Cloud Services",
    "Modern Workplace",
    "KI Automation",
    "Website Entwicklung",
    "Netzwerk Infrastruktur",
    "binso",
    "Binso GmbH",
    "IT Services Schweiz",
  ],
  authors: [{ name: "Binso GmbH" }],
  creator: "Binso GmbH",
  publisher: "Binso GmbH",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.jpg", type: "image/png" }],
    apple: [{ url: "/favicon.jpg" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "binso",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "/",
    title: "IT-Dienstleistungen & Outsourcing | binso",
    description:
      "Professionelle IT-Services von Azure M365 über Cyber Security bis zu Cloud-Lösungen. binso – Ihr zuverlässiger IT-Partner für moderne IT-Infrastruktur.",
    siteName: "binso",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "binso – IT-Dienstleistungen & Outsourcing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT-Dienstleistungen & Outsourcing | binso",
    description:
      "Professionelle IT-Services: Azure M365, Cyber Security, Cloud, Modern Workplace, Website-Entwicklung und IT-Outsourcing.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
        {/* iOS Meta-Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="binso" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" href="/favicon.jpg" />
        
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#7a7fee" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1a1a1a" />
        <link rel="manifest" href="/manifest.json" />
        {/* Chrome für Android */}
        <meta name="application-name" content="binso" />
      </head>
      <body className={outfit.className}>
        <SkipToContent />
        <Suspense fallback={null}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem 
            storageKey="theme"
          >
            <main id="main-content">
              {children}
            </main>
            <CookieBanner />
            <AIChatbotWrapper />
          </ThemeProvider>
        </Suspense>
        <Analytics />
        <SpeedInsights />
        <PerformanceMonitor />
      </body>
    </html>
  )
}
