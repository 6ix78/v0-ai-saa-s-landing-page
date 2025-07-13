"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

export default function TypingPromptInput() {
  const phrases = [
    "Start mining Ethereum...",
    "Calculate your profits...",
    "Explore mining packages...",
    "Join our mining pool...",
    "Learn about cloud mining...",
  ]
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    let typingInterval: NodeJS.Timeout | null = null
    let deletingInterval: NodeJS.Timeout | null = null

    if (isTyping) {
      typingInterval = setInterval(() => {
        if (charIndex < phrases[currentPhraseIndex].length) {
          setDisplayedText((prev) => prev + phrases[currentPhraseIndex][charIndex])
          setCharIndex((prev) => prev + 1)
        } else {
          clearInterval(typingInterval!)
          setTimeout(() => setIsTyping(false), 1500) // Pause at end of typing
        }
      }, 70) // Typing speed
    } else {
      deletingInterval = setInterval(() => {
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.slice(0, -1))
        } else {
          clearInterval(deletingInterval!)
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          setCharIndex(0)
          setIsTyping(true)
        }
      }, 40) // Deleting speed
    }

    return () => {
      if (typingInterval) clearInterval(typingInterval)
      if (deletingInterval) clearInterval(deletingInterval)
    }
  }, [displayedText, isTyping, charIndex, currentPhraseIndex, phrases])

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Input
        type="text"
        placeholder={displayedText + (isTyping ? "|" : "")}
        className="w-full py-3 pl-5 pr-12 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 frost-glass-input"
        readOnly
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 transition-colors"
      >
        <ArrowRight className="h-5 w-5 text-white" />
        <span className="sr-only">Submit</span>
      </Button>
    </div>
  )
}
