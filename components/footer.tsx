import Link from "next/link"
import { Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, PhoneIcon as Whatsapp, TextIcon as Telegram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-white">PulseCloud</span>
          </Link>
          <p className="text-sm">
            Your trusted partner in professional Ethereum mining solutions. Maximize your profits with our cutting-edge
            infrastructure.
          </p>
          <div className="flex space-x-4">
            {/* Social Media Icons Placeholder */}
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Whatsapp className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Telegram className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Solutions</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/mining-pool" className="text-sm hover:text-white transition-colors">
                Mining Pool
              </Link>
            </li>
            <li>
              <Link href="/calculator" className="text-sm hover:text-white transition-colors">
                Mining Calculator
              </Link>
            </li>
            <li>
              <Link href="/stats" className="text-sm hover:text-white transition-colors">
                Mining Stats
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-sm hover:text-white transition-colors">
                Pricing Plans
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-sm hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-sm hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Newsletter</h3>
          <p className="text-sm">Stay up-to-date with the latest mining news and exclusive offers.</p>
          <form className="flex gap-2">
            <Input type="email" placeholder="Your email" className="flex-1 bg-gray-800 border-gray-700 text-white" />
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 border-t border-gray-800 mt-8 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} PulseCloud. All rights reserved.</p>
      </div>
    </footer>
  )
}
