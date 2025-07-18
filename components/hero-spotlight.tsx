"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SpotlightProps {
  className?: string
  fill?: string
}

export function HeroSpotlight({ className, fill }: SpotlightProps) {
  return (
    <svg
      className={cn("animate-spotlight absolute inset-0 h-full w-full", className)}
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <motion.circle
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        cx="1920"
        cy="1420"
        r="1200"
        transform="matrix(1 0 0 -1 0 2842)"
        fill={fill || "white"}
        fillOpacity="0.05"
      ></motion.circle>
    </svg>
  )
}
