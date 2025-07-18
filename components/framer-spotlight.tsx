"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  h?: string
  className?: string
  fill?: string
}

export function FramerSpotlight({ h = "100%", className, fill = "#fff" }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
      }
    }

    const currentContainer = containerRef.current
    if (currentContainer) {
      currentContainer.addEventListener("mousemove", handleMouseMove)
      currentContainer.addEventListener("mouseenter", () => setIsHovered(true))
      currentContainer.addEventListener("mouseleave", () => setIsHovered(false))
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("mousemove", handleMouseMove)
        currentContainer.removeEventListener("mouseenter", () => setIsHovered(true))
        currentContainer.removeEventListener("mouseleave", () => setIsHovered(false))
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-hidden", className)} style={{ height: h }}>
      <motion.div
        className="absolute inset-0 rounded-full bg-white opacity-0 pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "200px", // Adjust size of the spotlight
          height: "200px", // Adjust size of the spotlight
          x: "-50%",
          y: "-50%",
          backgroundColor: fill,
          filter: "blur(50px)", // Adjust blur for desired effect
        }}
        animate={{
          opacity: isHovered ? 0.1 : 0, // Adjust opacity on hover
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      />
      {/* Content goes here */}
    </div>
  )
}
