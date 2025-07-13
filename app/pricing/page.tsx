import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$29",
      period: "per month",
      hashRate: "50 MH/s",
      features: ["Standard cloud mining", "Daily payouts", "Email support", "Access to shared mining pool"],
      buttonText: "Choose Basic",
      link: "/auth/signup",
      isPrimary: false,
    },
    {
      name: "Standard",
      price: "$99",
      period: "per month",
      hashRate: "200 MH/s",
      features: [
        "Enhanced cloud mining",
        "Priority daily payouts",
        "24/7 chat support",
        "Dedicated mining pool access",
        "Real-time analytics dashboard",
      ],
      buttonText: "Choose Standard",
      link: "/auth/signup",
      isPrimary: true,
    },
    {
      name: "Premium",
      price: "$249",
      period: "per month",
      hashRate: "500 MH/s",
      features: [
        "Premium cloud mining",
        "Instant daily payouts",
        "Dedicated account manager",
        "Exclusive mining pool access",
        "Advanced security features",
        "Customizable reporting",
      ],
      buttonText: "Choose Premium",
      link: "/auth/signup",
      isPrimary: false,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Flexible Pricing</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find the perfect plan that fits your mining goals and budget.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col ${
                  plan.isPrimary ? "border-primary-foreground shadow-lg scale-105" : "border-border"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-4xl font-bold mt-2">
                    {plan.price}
                    <span className="text-lg text-muted-foreground"> {plan.period}</span>
                  </p>
                  <p className="text-muted-foreground text-sm">{plan.hashRate}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-muted-foreground">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button asChild className="w-full">
                    <Link href={plan.link}>{plan.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Looking for custom solutions for large-scale operations?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact our sales team
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
