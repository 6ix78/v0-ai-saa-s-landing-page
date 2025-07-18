"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { HeroSpotlight } from "@/components/hero-spotlight"
import { HeroParticles } from "@/components/hero-particles"
import { TypingPromptInput } from "@/components/typing-prompt-input"
import { FeaturesSection } from "@/components/features-section"
import { UseCases } from "@/components/use-cases"
import { MiningPackage } from "@/components/mining-packages"
import { TestimonialSlider } from "@/components/testimonial-slider"
import { FAQSection } from "@/components/faq-section"
import { ContactForm } from "@/components/contact-form" // Ensure named export

export default function Home() {
  const prompts = [
    "How much can I earn with 100 GH/s?",
    "What are the best GPUs for mining?",
    "How do I withdraw my earnings?",
    "Is cloud mining profitable?",
  ]

  const testimonials = [
    {
      quote: "PulseCloud transformed my mining operations. The ease of use and consistent payouts are unmatched!",
      name: "Alex R.",
      title: "Independent Miner",
      avatarSrc: "/placeholder.svg?height=100&width=100",
    },
    {
      quote: "Finally, a cloud mining platform that delivers on its promises. My profits have never been higher.",
      name: "Maria S.",
      title: "Crypto Investor",
      avatarSrc: "/placeholder.svg?height=100&width=100",
    },
    {
      quote: "The support team is incredible, and the dashboard provides all the insights I need. Highly recommend!",
      name: "John D.",
      title: "Mining Farm Owner",
      avatarSrc: "/placeholder.svg?height=100&width=100",
    },
  ]

  const faqs = [
    {
      question: "What is cloud mining?",
      answer:
        "Cloud mining allows you to mine cryptocurrencies without owning or maintaining your own hardware. You rent computing power from a provider like PulseCloud.",
    },
    {
      question: "How do I get started with PulseCloud?",
      answer:
        "Simply sign up for an account, choose a mining package, and start earning. Our platform handles all the technical complexities.",
    },
    {
      question: "What cryptocurrencies can I mine?",
      answer:
        "Currently, we primarily support Ethereum (ETH) mining, with plans to expand to other profitable cryptocurrencies in the future.",
    },
    {
      question: "How often do I receive payouts?",
      answer:
        "Payouts are processed daily for most packages, with instant payout options available for enterprise clients.",
    },
    {
      question: "Is my investment secure?",
      answer:
        "Yes, we employ state-of-the-art security measures, including DDoS protection, cold storage for funds, and encrypted connections to protect your assets.",
    },
  ]

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
    <>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white">
        <HeroParticles className="absolute inset-0" quantity={200} staticity={30} ease={30} />
        <HeroSpotlight className="absolute top-0 left-0" fill="white" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Unlock Your Mining Potential with <span className="text-primary">PulseCloud</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-up delay-200">
            Experience seamless, profitable, and secure Ethereum cloud mining with enterprise-grade infrastructure and
            24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-400">
            <Button size="lg" className="px-8 py-3 text-lg" asChild>
              <Link href="/auth/signup">
                Start Mining Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg text-white border-white hover:bg-white hover:text-gray-900 bg-transparent"
              asChild
            >
              <Link href="/pricing">View Packages</Link>
            </Button>
          </div>
          <div className="mt-12 animate-fade-in-up delay-600">
            <TypingPromptInput prompts={prompts} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works / Use Cases Section */}
      <UseCases />

      {/* Pricing Section */}
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

      {/* Testimonial Slider */}
      <TestimonialSlider testimonials={testimonials} />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Call to Action / Contact Section */}
      <section className="py-16 md:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Mining?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join PulseCloud today and experience the future of profitable and secure cryptocurrency mining.
          </p>
          <Button size="lg" className="px-8 py-3 text-lg bg-white text-primary hover:bg-gray-100" asChild>
            <Link href="/auth/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Get in Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Have questions or need assistance? Our team is here to help. Fill out the form or reach us through the
              details below.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="text-lg text-gray-700 dark:text-gray-300">support@pulsecloud.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="text-lg text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  123 Mining Lane, Blockchain City, BC 12345
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
