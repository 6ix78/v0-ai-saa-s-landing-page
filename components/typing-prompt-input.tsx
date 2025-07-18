"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface TypingPromptInputProps {
  prompts: string[]
  onSend?: (message: string) => void
  delay?: number
  typingSpeed?: number
}

export function TypingPromptInput({ prompts, onSend, delay = 2000, typingSpeed = 50 }: TypingPromptInputProps) {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const promptCycleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const currentPrompt = prompts[currentPromptIndex]

  useEffect(() => {
    if (!currentPrompt) return

    let charIndex = 0
    setIsTyping(true)
    setDisplayedText("")

    const typeChar = () => {
      if (charIndex < currentPrompt.length) {
        setDisplayedText((prev) => prev + currentPrompt.charAt(charIndex))
        charIndex++
        typingTimeoutRef.current = setTimeout(typeChar, typingSpeed)
      } else {
        setIsTyping(false)
        promptCycleTimeoutRef.current = setTimeout(() => {
          setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length)
        }, delay)
      }
    }

    typingTimeoutRef.current = setTimeout(typeChar, typingSpeed)

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      if (promptCycleTimeoutRef.current) clearTimeout(promptCycleTimeoutRef.current)
    }
  }, [currentPrompt, typingSpeed, delay, prompts])

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend?.(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <div className="relative flex w-full max-w-md items-center">
      <Input
        type="text"
        placeholder={displayedText}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pr-12 h-12 text-base"
        disabled={isTyping}
      />
      <Button
        type="button"
        size="icon"
        className="absolute right-2 h-10 w-10"
        onClick={handleSend}
        disabled={isTyping || !inputValue.trim()}
      >
        <Send className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  )
}
