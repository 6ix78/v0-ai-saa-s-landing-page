"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, DollarSign, Zap, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface ActivityItem {
  type: "payout" | "signup" | "mining"
  user: string
  amount?: string
  message: string
}

interface ActivityPopupProps {
  activity: ActivityItem | null
  onClose: () => void
}

export function ActivityPopup({ activity, onClose }: ActivityPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (activity) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [activity])

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "payout":
        return <DollarSign className="h-5 w-5 text-green-500" />
      case "signup":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case "mining":
        return <Zap className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isVisible && activity && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
            "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4",
            "flex items-center space-x-3 border border-gray-200 dark:border-gray-700",
            "max-w-xs w-full",
          )}
          role="alert"
        >
          <div className="flex-shrink-0">{getIcon(activity.type)}</div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{activity.message}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
            <X className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Close</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
