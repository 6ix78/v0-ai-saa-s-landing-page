"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Zap } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Mining Packages", href: "/mining-pool" },
    { name: "Pricing", href: "/pricing" },
    { name: "Calculators", href: "/calculator" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold" prefetch={false}>
          <Zap className="h-6 w-6 text-primary" />
          <span>PulseCloud</span>
        </Link>
        <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
              prefetch={false}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-foreground",
                    )}
                    prefetch={false}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-4">
                  <Link href="/auth/signin">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                </div>
                <div className="mt-2">
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full bg-transparent">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
