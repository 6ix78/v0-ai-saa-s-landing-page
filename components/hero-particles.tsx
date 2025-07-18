"use client"

import { cn } from "@/lib/utils"

import { useEffect, useRef } from "react"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export function HeroParticles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
  const particles = useRef<any[]>([])

  const initParticle = (particle: any, x?: number, y?: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const vx = (Math.random() - 0.5) * staticity
    const vy = (Math.random() - 0.5) * staticity
    const radius = Math.random() * 1 + 0.5 // Smaller particles

    particle.x = x || Math.random() * canvas.width
    particle.y = y || Math.random() * canvas.height
    particle.vx = vx
    particle.vy = vy
    particle.radius = radius
  }

  const createCircle = (x: number, y: number) => {
    const particle = {}
    initParticle(particle, x, y)
    particles.current.push(particle)
  }

  const updateParticles = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#FFFFFF" // White particles

    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i]

      const dx = mouse.current.x * dpr - p.x
      const dy = mouse.current.y * dpr - p.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Calculate force and direction
      const force = (-mouse.current.x * dpr * ease) / (distance * distance)
      const angle = Math.atan2(dy, dx)

      p.vx += force * Math.cos(angle)
      p.vy += force * Math.sin(angle)

      p.x += p.vx
      p.y += p.vy

      // Decay velocity
      p.vx *= 0.95
      p.vy *= 0.95

      // Boundary check
      if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
        initParticle(p)
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI)
      ctx.fill()
    }
    requestAnimationFrame(updateParticles)
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = canvasSize.current.w + "px"
      canvasRef.current.style.height = canvasSize.current.h + "px"
    }
  }

  useEffect(() => {
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [dpr])

  useEffect(() => {
    if (canvasRef.current) {
      particles.current = []
      for (let i = 0; i < quantity; i++) {
        createCircle(0, 0) // Particles will be re-initialized to random positions
      }
      updateParticles()
    }
  }, [quantity, staticity, ease, refresh])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={canvasContainerRef} className={cn("absolute inset-0", className)}>
      <canvas ref={canvasRef} />
    </div>
  )
}
