import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ClientLayout from "./clientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PulseCloud - Professional Ethereum Mining Solutions",
  description:
    "Start mining Ethereum with our enterprise-grade mining infrastructure. High-performance mining rigs, competitive rates, and 24/7 support for maximum profitability.",
  keywords: ["Ethereum mining", "cloud mining", "crypto mining", "ETH mining", "PulseCloud"],
  authors: [{ name: "PulseCloud" }],
  creator: "PulseCloud",
  publisher: "PulseCloud",
  openGraph: {
    title: "PulseCloud - Professional Ethereum Mining Solutions",
    description:
      "Start mining Ethereum with our enterprise-grade mining infrastructure. High-performance mining rigs, competitive rates, and 24/7 support for maximum profitability.",
    url: "https://www.pulsecloud.com",
    siteName: "PulseCloud",
    images: [
      {
        url: "https://www.pulsecloud.com/og-image.jpg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "PulseCloud - Ethereum Mining",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseCloud - Professional Ethereum Mining Solutions",
    description:
      "Start mining Ethereum with our enterprise-grade mining infrastructure. High-performance mining rigs, competitive rates, and 24/7 support for maximum profitability.",
    creator: "@PulseCloud", // Replace with your Twitter handle
    images: ["https://www.pulsecloud.com/twitter-image.jpg"], // Replace with your actual Twitter image
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
