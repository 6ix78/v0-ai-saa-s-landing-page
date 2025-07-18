"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Zap } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Mining Pool",
    href: "/mining-pool",
    description: "Join our high-performance mining pool for stable payouts.",
  },
  {
    title: "Mining Calculator",
    href: "/calculator",
    description: "Estimate your potential earnings with our mining calculator.",
  },
  {
    title: "Mining Stats",
    href: "/stats",
    description: "View real-time mining statistics and network data.",
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Explore our flexible mining packages and pricing plans.",
  },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">PulseCloud</span>
          </Link>
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <Zap className="h-6 w-6 text-primary" />
                            <div className="mb-2 mt-4 text-lg font-medium">PulseCloud</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Professional Ethereum mining solutions with enterprise-grade infrastructure.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/mining-pool" title="Mining Pool">
                        Join our high-performance mining pool for stable payouts.
                      </ListItem>
                      <ListItem href="/calculator" title="Mining Calculator">
                        Estimate your potential earnings with our mining calculator.
                      </ListItem>
                      <ListItem href="/stats" title="Mining Stats">
                        View real-time mining statistics and network data.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem key={component.title} title={component.title} href={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>About Us</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 py-6">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">PulseCloud</span>
                </Link>
                <Link href="/mining-pool" className="text-lg font-medium hover:text-primary">
                  Mining Pool
                </Link>
                <Link href="/calculator" className="text-lg font-medium hover:text-primary">
                  Mining Calculator
                </Link>
                <Link href="/stats" className="text-lg font-medium hover:text-primary">
                  Mining Stats
                </Link>
                <Link href="/pricing" className="text-lg font-medium hover:text-primary">
                  Pricing
                </Link>
                <Link href="/blog" className="text-lg font-medium hover:text-primary">
                  Blog
                </Link>
                <Link href="/about" className="text-lg font-medium hover:text-primary">
                  About Us
                </Link>
                <Link href="/contact" className="text-lg font-medium hover:text-primary">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
