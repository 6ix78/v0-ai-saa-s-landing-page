"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Added Avatar imports

export default function TestimonialSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const testimonials = [
    {
      quote:
        "PulseCloud has revolutionized my crypto mining. The ease of use and consistent payouts are unmatched. Highly recommended for anyone looking into cloud mining!",
      author: "Jane Doe",
      title: "Crypto Enthusiast",
      avatar: "/placeholder.svg?height=64&width=64", // Placeholder avatar
    },
    {
      quote:
        "I was skeptical at first, but PulseCloud delivered. My profits have been steady, and their customer support is incredibly responsive. A truly professional service.",
      author: "John Smith",
      title: "Investor",
      avatar: "/placeholder.svg?height=64&width=64", // Placeholder avatar
    },
    {
      quote:
        "As a beginner, I found PulseCloud's platform very intuitive. The setup was quick, and I started earning almost immediately. Great experience!",
      author: "Alice Johnson",
      title: "New Miner",
      avatar: "/placeholder.svg?height=64&width=64", // Placeholder avatar
    },
    {
      quote:
        "The transparency and detailed statistics provided by PulseCloud are fantastic. It helps me track my earnings precisely. A reliable and trustworthy platform.",
      author: "Robert Brown",
      title: "Data Analyst",
      avatar: "/placeholder.svg?height=64&width=64", // Placeholder avatar
    },
  ]

  return (
    <section className="py-12 md:py-20 bg-muted/50 dark:bg-muted/10">
      {" "}
      {/* Updated background */}
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What Our Users Say</h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-none pl-4 w-full md:w-1/2 lg:w-1/3">
                  <Card className="h-full flex flex-col">
                    <CardContent className="flex-grow p-6 flex flex-col justify-between items-center text-center">
                      <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex flex-col items-center">
                        <Avatar className="h-16 w-16 mb-2">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                          <AvatarFallback>
                            {testimonial.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold text-primary">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex bg-transparent"
            onClick={scrollPrev}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex bg-transparent"
            onClick={scrollNext}
          >
            <ArrowRightIcon className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
