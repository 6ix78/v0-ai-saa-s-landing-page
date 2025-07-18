import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MiningPackageProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  price: string
  hashRate: string
  features: string[]
  isPopular?: boolean
}

export function MiningPackage({ name, price, hashRate, features, isPopular, className, ...props }: MiningPackageProps) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-between border-2",
        isPopular ? "border-primary shadow-lg" : "border-gray-200 dark:border-gray-700",
        className,
      )}
      {...props}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Starting from</CardDescription>
        <div className="text-5xl font-extrabold text-gray-900 dark:text-white mt-2">{price}</div>
        <p className="text-lg text-primary font-semibold">{hashRate}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-lg py-6">Get Started</Button>
      </CardFooter>
    </Card>
  )
}

export default function MiningPackages() {
  const packages = [
    {
      name: "Starter",
      hashRate: "50 MH/s",
      price: "$299",
      duration: "30 days",
      dailyReturn: "$12-15",
      totalReturn: "$360-450",
      roi: "20-50%",
      features: ["50 MH/s Hash Rate", "30 Days Mining", "Daily Payouts", "24/7 Support", "Real-time Monitoring"],
      popular: false,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Professional",
      hashRate: "150 MH/s",
      price: "$799",
      duration: "60 days",
      dailyReturn: "$35-42",
      totalReturn: "$2100-2520",
      roi: "163-215%",
      features: [
        "150 MH/s Hash Rate",
        "60 Days Mining",
        "Daily Payouts",
        "Priority Support",
        "Advanced Analytics",
        "Pool Selection",
      ],
      popular: true,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Enterprise",
      hashRate: "500 MH/s",
      price: "$2,499",
      duration: "90 days",
      dailyReturn: "$115-140",
      totalReturn: "$10,350-12,600",
      roi: "314-404%",
      features: [
        "500 MH/s Hash Rate",
        "90 Days Mining",
        "Daily Payouts",
        "Dedicated Support",
        "Custom Dashboard",
        "API Access",
        "White-label Option",
      ],
      popular: false,
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <section className="py-20 bg-muted/30 dark:bg-muted/10" id="packages">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Mining Packages
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Mining Power</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Select the perfect mining package for your investment goals. All packages include professional mining
              infrastructure and daily payouts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <MiningPackage
              key={index}
              name={pkg.name}
              price={pkg.price}
              hashRate={pkg.hashRate}
              features={pkg.features}
              isPopular={pkg.popular}
              className={`relative overflow-hidden ${pkg.popular ? "ring-2 ring-primary shadow-xl scale-105" : ""}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? We offer enterprise packages with higher hash rates.
          </p>
          <Button variant="outline" asChild>
            <Link href="/pricing">View All Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
