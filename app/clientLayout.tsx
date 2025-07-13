"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import ActivityPopup from "@/components/activity-popup"
import { activityGenerator, type ActivityItem } from "@/lib/activity-generator"
import Footer from "@/components/footer" // Declare the Footer component

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [popupQueue, setPopupQueue] = useState<ActivityItem[]>([])
  const [activePopup, setActivePopup] = useState<ActivityItem | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const excludedPaths = ["/dashboard", "/auth/signin", "/auth/signup"]

  const shouldShowActivityPopup = !excludedPaths.some((path) => pathname.startsWith(path))
  const shouldShowFooter = !excludedPaths.some((path) => pathname.startsWith(path))

  useEffect(() => {
    if (shouldShowActivityPopup) {
      // Start generating activities if not already running
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setPopupQueue((prev) => [...prev, activityGenerator.generate()])
        }, 7000) // Generate a new activity every 7 seconds
      }
    } else {
      // Clear interval and queue if on an excluded path
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setPopupQueue([])
      setActivePopup(null)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [pathname, shouldShowActivityPopup])

  useEffect(() => {
    // Process the queue
    if (!activePopup && popupQueue.length > 0) {
      const [nextPopup, ...rest] = popupQueue
      setActivePopup(nextPopup)
      setPopupQueue(rest)
    }
  }, [activePopup, popupQueue])

  const handlePopupClose = () => {
    setActivePopup(null)
  }

  return (
    <>
      {children}
      {shouldShowActivityPopup && <ActivityPopup activity={activePopup} onClose={handlePopupClose} />}
      {shouldShowFooter && <Footer />}
    </>
  )
}
