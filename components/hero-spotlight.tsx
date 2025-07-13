"use client"
import { motion } from "framer-motion"

export function HeroSpotlight() {
  return (
    <div className="absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-5 blur-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
    </div>
  )
}
