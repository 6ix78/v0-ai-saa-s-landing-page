import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MiningPackage } from "@/components/mining-packages"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | PulseCloud",
  description: "Explore PulseCloud's flexible mining packages and find the perfect plan for your needs.",
}

export default function PricingPage() {
  const packages = [
    {
      name: "Starter",
      price: "$39/month",
      hashRate: "100 GH/s",
      features: ["Basic dashboard access", "Email support", "Daily payouts", "Limited rig management"],
    },
    {
      name: "Pro",
      price: "$99/month",
      hashRate: "500 GH/s",
      features: [
        "Advanced dashboard",
        "Priority support",
        "Hourly payouts",
        "Full rig management",
        "Customizable alerts",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "$499/month",
      hashRate: "2 TH/s",
      features: [
        "Dedicated account manager",
        "24/7 phone support",
        "Instant payouts",
        "API access",
        "Custom mining strategies",
        "DDoS protection",
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Flexible Mining Packages</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose the perfect plan that fits your mining ambitions, from individual enthusiasts to large-scale
                operations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <MiningPackage key={index} {...pkg} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
