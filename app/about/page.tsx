import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { Users, Lightbulb, Handshake } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About PulseCloud</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Your trusted partner in professional Ethereum cloud mining.
              </p>
            </div>
          </div>

          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-bold mb-2">Our Mission</h2>
              <p className="text-muted-foreground">
                To democratize access to cryptocurrency mining by providing secure, efficient, and user-friendly cloud
                mining solutions for everyone.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-bold mb-2">Our Vision</h2>
              <p className="text-muted-foreground">
                To be the leading global provider of cloud mining services, driving innovation and fostering a
                sustainable crypto ecosystem.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <Handshake className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-bold mb-2">Our Values</h2>
              <p className="text-muted-foreground">
                Transparency, security, customer satisfaction, and continuous innovation are at the core of everything
                we do.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">Our Story</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto text-center">
              Founded in 2020, PulseCloud emerged from a passion for blockchain technology and a vision to simplify
              cryptocurrency mining. We recognized the barriers to entry for individual miners and the complexities
              faced by institutions. Our goal was to build a robust, scalable, and accessible cloud mining platform that
              empowers users to participate in the crypto economy without the burden of hardware management or high
              electricity costs.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto text-center mt-4">
              Since then, we&apos;ve grown into a global leader, operating state-of-the-art data centers and
              continuously investing in cutting-edge technology. We pride ourselves on our commitment to security,
              transparency, and providing unparalleled support to our diverse community of miners worldwide.
            </p>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Ready to start your mining journey with a trusted partner?
            </p>
            <Link href="/auth/signup">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
