"use client"

import Link from "next/link"
import { Zap, Twitter, Github, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-12 bg-muted/50 dark:bg-muted/10">
      {" "}
      {/* Updated background */}
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-1 lg:col-span-2">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">PulseCloud</span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-md">
            Professional Ethereum mining solutions with enterprise-grade infrastructure and 24/7 support.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="col-span-1">
          <h3 className="font-semibold text-lg mb-4">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/mining-pool" className="text-muted-foreground hover:text-primary">
                Mining Pool
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-muted-foreground hover:text-primary">
                Pricing Plans
              </Link>
            </li>
            <li>
              <Link href="/calculator" className="text-muted-foreground hover:text-primary">
                Mining Calculator
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="font-semibold text-lg mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Support
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                API Reference
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                Community
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container text-center text-sm text-muted-foreground mt-12">
        &copy; {currentYear} PulseCloud. All rights reserved.
      </div>
    </footer>
  )
}
