"use client"

import { Button } from "@/components/ui/button"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import type { ActivityItem } from "@/lib/activity-generator"
import { cn } from "@/lib/utils"

interface ActivityPopupProps {
  activity: ActivityItem | null
  onClose: () => void
}

export default function ActivityPopup({ activity, onClose }: ActivityPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (activity) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 5000) // Popup visible for 5 seconds
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [activity])

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose()
    }
  }

  if (!activity) return null

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
          className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-4 rounded-lg shadow-lg z-50",
            "flex items-center space-x-3 border border-gray-200 dark:border-gray-700",
            "w-[calc(100%-2rem)] max-w-sm", // Responsive width
          )}
        >
          <div className="flex-shrink-0">
            {/* You can add an icon or avatar here based on activity type */}
            <span className="text-primary text-xl">⚡</span>
          </div>
          <div className="flex-grow">
            <p className="font-semibold text-sm">{activity.user}</p>
            <p className="text-xs text-muted-foreground">{activity.message}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="flex-shrink-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Close notification</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
