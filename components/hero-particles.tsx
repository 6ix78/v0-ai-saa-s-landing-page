"use client"

import { useEffect, useRef } from "react"

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameId = useRef<number | null>(null)

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string

    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 5 + 1 // Particles between 1 and 6px
      this.speedX = Math.random() * 3 - 1.5 // -1.5 to 1.5
      this.speedY = Math.random() * 3 - 1.5
      this.color = "rgba(255, 255, 255, 0.8)" // White particles
    }

    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX
      this.y += this.speedY

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const init = () => {
      particlesRef.current = []
      const numberOfParticles = (canvas.width * canvas.height) / 9000 // Adjust density
      for (let i = 0; i < numberOfParticles; i++) {
        particlesRef.current.push(new Particle(canvas))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(canvas)
        particlesRef.current[i].draw(ctx)
      }
      animationFrameId.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init() // Re-initialize particles on resize
    }

    window.addEventListener("resize", handleResize)

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />
}
