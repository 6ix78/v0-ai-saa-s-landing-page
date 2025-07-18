import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, LifeBuoy, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support | PulseCloud",
  description:
    "Get help and support for your PulseCloud mining operations. Contact us or find answers in our documentation.",
}

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How Can We Help You?</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our support team is dedicated to providing you with the best mining experience. Find answers, contact us, or
          explore our resources.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="text-center p-6 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
              <LifeBuoy className="h-8 w-8" />
            </div>
            <CardTitle className="text-xl font-bold">Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Reach out to our expert team for personalized assistance.</p>
            <Link href="#contact-form-section" className="text-primary hover:underline font-medium">
              Send a Message
            </Link>
          </CardContent>
        </Card>
        <Card className="text-center p-6 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <CardTitle className="text-xl font-bold">Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Find detailed guides, FAQs, and troubleshooting steps.</p>
            <Link href="/documentation" className="text-primary hover:underline font-medium">
              Explore Docs
            </Link>
          </CardContent>
        </Card>
        <Card className="text-center p-6 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
              <Users className="h-8 w-8" />
            </div>
            <CardTitle className="text-xl font-bold">Community Forum</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Connect with other miners and get peer-to-peer support.</p>
            <Link href="/community" className="text-primary hover:underline font-medium">
              Join Community
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Direct Contact</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Prefer to speak with us directly? Here's how you can reach our support team.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-6 w-6 text-primary" />
              <span className="text-lg text-gray-700 dark:text-gray-300">support@pulsecloud.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-6 w-6 text-primary" />
              <span className="text-lg text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-lg text-gray-700 dark:text-gray-300">
                123 Mining Lane, Blockchain City, BC 12345
              </span>
            </div>
          </div>
        </div>
        <div id="contact-form-section" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
          <ContactForm />
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Still Can't Find What You Need?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Our comprehensive knowledge base and community forums are constantly updated with new information.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/documentation">Visit Knowledge Base</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/community">Ask the Community</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
