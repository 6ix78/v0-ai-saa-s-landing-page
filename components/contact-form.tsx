"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send formData to your backend here
    console.log("Form submitted:", formData)

    setStatus("success")
    setFormData({ name: "", email: "", subject: "", message: "" }) // Clear form
    setTimeout(() => setStatus(""), 3000) // Clear status message after 3 seconds
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Regarding my mining rig" value={formData.subject} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Type your message here."
          className="min-h-[100px]"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
      {status === "success" && <p className="text-center text-green-500">Your message has been sent successfully!</p>}
    </form>
  )
}
