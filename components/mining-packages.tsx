import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function MiningPackages() {
  const packages = [
    {
      name: "Starter Miner",
      price: "Free",
      hashRate: "1 MH/s",
      features: ["Basic cloud mining", "Daily payouts", "Limited support", "Access to mining pool"],
      buttonText: "Start Free Mining",
      link: "/auth/signup",
      isPrimary: false,
    },
    {
      name: "Pro Miner",
      price: "$99/month",
      hashRate: "100 MH/s",
      features: [
        "Advanced cloud mining",
        "Priority daily payouts",
        "24/7 premium support",
        "Dedicated mining pool access",
        "Real-time analytics",
      ],
      buttonText: "Choose Pro Plan",
      link: "/pricing",
      isPrimary: true,
    },
    {
      name: "Enterprise Miner",
      price: "Custom",
      hashRate: "500+ MH/s",
      features: [
        "Customizable contracts",
        "Dedicated infrastructure",
        "Account manager",
        "On-site support options",
        "Advanced security audits",
      ],
      buttonText: "Contact Sales",
      link: "/contact",
      isPrimary: false,
    },
  ]

  return (
    <section className="py-20" id="packages" aria-labelledby="packages-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Mining Packages
            </div>
            <h2 id="packages-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Flexible Mining Solutions
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Choose the perfect mining package that fits your needs, from free trials to enterprise-grade solutions.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`flex flex-col ${
                pkg.isPrimary ? "border-primary-foreground shadow-lg scale-105" : "border-border"
              }`}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                <p className="text-4xl font-bold mt-2">{pkg.price}</p>
                <p className="text-muted-foreground text-sm">{pkg.hashRate}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-muted-foreground">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button asChild className="w-full">
                  <Link href={pkg.link}>{pkg.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
