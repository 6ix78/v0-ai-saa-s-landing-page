import { Button } from "@/components/ui/button"
import { Zap, Shield, Users, Database, Bot } from "lucide-react"
import ContactForm from "@/components/contact-form"
import Testimonials from "@/components/testimonials" // Existing static testimonials
import TestimonialSlider from "@/components/testimonial-slider" // New slider
import UseCases from "@/components/use-cases"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TypingPromptInput from "@/components/typing-prompt-input"
import FramerSpotlight from "@/components/framer-spotlight"
import CssGridBackground from "@/components/css-grid-background"
import FeaturesSection from "@/components/features-section"
import StructuredData from "@/components/structured-data"
import MiningPackages from "@/components/mining-packages"
import FAQSection from "@/components/faq-section" // New FAQ section
import Link from "next/link"

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <CssGridBackground />
          <FramerSpotlight />
          <div className="container px-4 md:px-6 py-16 md:py-20">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-6">
                Professional Mining Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                Professional Ethereum Mining Solutions by PulseCloud
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-2xl mb-12">
                Start mining Ethereum with our enterprise-grade mining infrastructure. High-performance mining rigs,
                competitive rates, and 24/7 support for maximum profitability.
              </p>

              <TypingPromptInput />

              <div className="flex flex-wrap justify-center gap-3 mt-16">
                <Button
                  asChild
                  className="flex items-center gap-3 px-5 py-6 h-[60px] bg-[#1a1d21] hover:bg-[#2a2d31] text-white rounded-xl border-0 dark:bg-primary dark:hover:bg-primary/90 dark:shadow-[0_0_15px_rgba(36,101,237,0.5)] relative overflow-hidden group"
                >
                  <Link href="/auth/signup">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 dark:opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                    <Zap className="h-5 w-5 text-white relative z-10" />
                    <div className="flex flex-col items-start relative z-10">
                      <span className="text-[15px] font-medium">Start Mining</span>
                      <span className="text-xs text-gray-400 dark:text-gray-300 -mt-0.5">Get Started</span>
                    </div>
                  </Link>
                </Button>
                <Button
                  asChild
                  className="px-5 py-6 h-[60px] rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-[15px] font-medium text-foreground"
                >
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* Mining Packages Section */}
        <MiningPackages />
        {/* Features Section */}
        <FeaturesSection />
        {/* How It Works */}
        <section className="py-20" id="how-it-works" aria-labelledby="how-it-works-heading">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How Mining Works
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Start earning Ethereum with our professional mining infrastructure in three simple steps.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Choose Your Package</h3>
                <p className="text-muted-foreground">
                  Select from our range of mining packages based on your investment goals and hash rate requirements.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Start Mining</h3>
                <p className="text-muted-foreground">
                  Our enterprise-grade mining rigs begin mining Ethereum immediately after your purchase.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Earn Daily</h3>
                <p className="text-muted-foreground">
                  Receive daily Ethereum payouts directly to your wallet with full transparency and real-time tracking.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Use Cases */}
        <UseCases />
        {/* Testimonials (Static Grid) */}
        <Testimonials />
        {/* Testimonial Slider (New) */}
        <TestimonialSlider />
        {/* Contact/Pricing Section */}
        <section id="contact" className="py-20 bg-muted/50 dark:bg-muted/10" aria-labelledby="contact-heading">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 id="contact-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Enterprise Mining Solutions
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    We offer custom mining solutions for large-scale operations and institutional clients.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Dedicated mining infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span>Custom hash rate allocation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <span>24/7 monitoring and support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Enterprise-grade security</span>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="font-medium">Contact us for custom mining solutions and enterprise pricing.</p>
                </div>
              </div>
              <div className="lg:ml-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section (New) */}
        <FAQSection />
        
      </div>
    </>
  )
}
