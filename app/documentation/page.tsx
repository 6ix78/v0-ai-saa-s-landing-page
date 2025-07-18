import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Zap, Settings, DollarSign, BarChart } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation | PulseCloud",
  description:
    "Comprehensive documentation for PulseCloud's mining platform, including guides, FAQs, and API references.",
}

const documentationCategories = [
  {
    title: "Getting Started",
    description: "Learn how to set up your account and start mining.",
    icon: BookOpen,
    links: [
      { name: "Account Creation", href: "#" },
      { name: "Choosing a Mining Package", href: "#" },
      { name: "First Payout", href: "#" },
    ],
  },
  {
    title: "Mining Rigs & Hardware",
    description: "Guides on optimizing your mining hardware and rigs.",
    icon: Zap,
    links: [
      { name: "GPU Optimization", href: "#" },
      { name: "Troubleshooting Rigs", href: "#" },
      { name: "Supported Hardware", href: "#" },
    ],
  },
  {
    title: "Dashboard & Settings",
    description: "Navigate your dashboard and customize your preferences.",
    icon: Settings,
    links: [
      { name: "Dashboard Overview", href: "#" },
      { name: "Notification Settings", href: "#" },
      { name: "Security Settings", href: "#" },
    ],
  },
  {
    title: "Payouts & Billing",
    description: "Information on earnings, withdrawals, and billing.",
    icon: DollarSign,
    links: [
      { name: "Payout Methods", href: "#" },
      { name: "Withdrawal Limits", href: "#" },
      { name: "Billing History", href: "#" },
    ],
  },
  {
    title: "Analytics & Reporting",
    description: "Understand your mining performance with detailed reports.",
    icon: BarChart,
    links: [
      { name: "Hash Rate Analytics", href: "#" },
      { name: "Earnings Reports", href: "#" },
      { name: "Custom Reports", href: "#" },
    ],
  },
  {
    title: "API Reference",
    description: "Integrate with PulseCloud using our comprehensive API.",
    icon: BookOpen,
    links: [
      { name: "API Overview", href: "/api-reference" },
      { name: "Authentication", href: "/api-reference#authentication" },
      { name: "Endpoints", href: "/api-reference#endpoints" },
    ],
  },
]

export default function DocumentationPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Documentation & Guides</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find comprehensive guides, API references, and answers to common questions to help you maximize your mining
          potential.
        </p>
        <div className="relative max-w-md mx-auto mt-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {documentationCategories.map((category, index) => (
          <Card key={index} className="p-6 shadow-md">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                <category.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold">{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-primary hover:underline text-base">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
