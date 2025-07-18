"use client"

import { Testimonial } from "@/components/testimonials"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface TestimonialData {
  quote: string
  name: string
  title: string
  avatarSrc?: string
}

interface TestimonialSliderProps {
  testimonials: TestimonialData[]
  interval?: number // Interval in milliseconds for auto-slide
}

export function TestimonialSlider({ testimonials, interval = 5000 }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, interval)

    return () => clearInterval(timer)
  }, [testimonials.length, interval])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-950 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">What Our Miners Say</h2>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Testimonial {...testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md z-10"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md z-10"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-gray-400 dark:bg-gray-600"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
