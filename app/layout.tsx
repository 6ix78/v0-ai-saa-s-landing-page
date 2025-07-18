import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./clientLayout"
import { StructuredData } from "@/components/structured-data"

const inter = Inter({ subsets: ["latin"] })

// Metadata is now defined outside the component as it's static
export const metadata: Metadata = {
  title: "PulseCloud | Professional Ethereum Mining Solutions",
  description:
    "Start mining Ethereum with PulseCloud's enterprise-grade mining infrastructure. High-performance mining rigs, competitive rates, and 24/7 support for maximum profitability.",
  keywords:
    "ethereum mining, crypto mining, ETH mining, cloud mining, mining pool, cryptocurrency, blockchain, PulseCloud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-mining-domain.com", // Keep this generic for v0 preview
    title: "PulseCloud | Professional Ethereum Mining Solutions",
    description:
      "Start mining Ethereum with PulseCloud's enterprise-grade mining infrastructure. High-performance mining rigs, competitive rates, and 24/7 support for maximum profitability.",
    siteName: "PulseCloud",
    images: [
      {
        url: "https://your-mining-domain.com/og-image.jpg", // Keep this generic for v0 preview
        width: 1200,
        height: 630,
        alt: "PulseCloud",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseCloud | Professional Ethereum Mining Solutions",
    description: "Start mining Ethereum with PulseCloud's enterprise-grade mining infrastructure.",
    images: ["https://your-mining-domain.com/twitter-image.jpg"], // Keep this generic for v0 preview
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PulseCloud",
  url: "https://pulsecloud.com",
  logo: "https://pulsecloud.com/logo.png",
  description: "Professional Ethereum mining solutions with enterprise-grade infrastructure and 24/7 support.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-123-4567", // Replace with actual phone
    contactType: "customer service",
    email: "support@pulsecloud.com", // Replace with actual email
  },
  sameAs: [
    "https://twitter.com/pulsecloud", // Replace with actual Twitter
    "https://github.com/pulsecloud", // Replace with actual GitHub
    "https://linkedin.com/company/pulsecloud", // Replace with actual LinkedIn
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        <StructuredData jsonLd={jsonLd} />
      </body>
    </html>
  )
}
