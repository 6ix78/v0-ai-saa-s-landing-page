"use client"

import { usePathname } from "next/navigation"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer" // Ensure named export
import { ActivityPopup } from "@/components/activity-popup" // Ensure named export
import { generateRandomActivity } from "@/lib/activity-generator"
import { useState, useEffect, useRef } from "react"
import type { ActivityItem } from "@/lib/activity-generator"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [popupQueue, setPopupQueue] = useState<ActivityItem[]>([])
  const [activePopup, setActivePopup] = useState<ActivityItem | null>(null)
  const popupTimerRef = useRef<NodeJS.Timeout | null>(null)

  const excludedPathsForFooterAndNavbar = ["/dashboard", "/auth/signin", "/auth/signup"]
  const shouldShowFooterAndNavbar = !excludedPathsForFooterAndNavbar.some((path) => pathname.startsWith(path))

  // Activity popup should not show on dashboard, auth, or chat pages
  const excludedPathsForActivityPopup = ["/dashboard", "/auth", "/chat"]
  const shouldShowActivityPopup = !excludedPathsForActivityPopup.some((path) => pathname.startsWith(path))

  useEffect(() => {
    if (!shouldShowActivityPopup) {
      // Clear any active popups and queue if we navigate to an excluded path
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current)
        popupTimerRef.current = null
      }
      setActivePopup(null)
      setPopupQueue([])
      return
    }

    const interval = setInterval(() => {
      setPopupQueue((prevQueue) => {
        const newActivity = generateRandomActivity()
        return [...prevQueue, newActivity]
      })
    }, 5000) // Add a new activity every 5 seconds

    return () => clearInterval(interval)
  }, [shouldShowActivityPopup])

  useEffect(() => {
    if (shouldShowActivityPopup && !activePopup && popupQueue.length > 0) {
      const [nextPopup, ...remainingQueue] = popupQueue
      setActivePopup(nextPopup)
      setPopupQueue(remainingQueue)

      // Set a timer to clear the active popup after a duration
      popupTimerRef.current = setTimeout(() => {
        setActivePopup(null)
      }, 4000) // Popup visible for 4 seconds
    }
  }, [activePopup, popupQueue, shouldShowActivityPopup])

  const handlePopupClose = () => {
    setActivePopup(null)
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current)
      popupTimerRef.current = null
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {shouldShowFooterAndNavbar && <Navbar />}
          {children}
          {shouldShowFooterAndNavbar && <Footer />}
          {shouldShowActivityPopup && activePopup && (
            <ActivityPopup activity={activePopup} onClose={handlePopupClose} />
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
