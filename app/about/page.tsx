import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Lightbulb, Shield, Zap } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          About <span className="text-primary">PulseCloud</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Empowering the future of decentralized finance through cutting-edge Ethereum mining solutions.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            At PulseCloud, our mission is to democratize access to cryptocurrency mining. We believe in a future where
            anyone, regardless of their technical expertise or capital, can participate in and benefit from the
            blockchain revolution. We achieve this by providing robust, efficient, and user-friendly cloud mining
            services.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We are committed to transparency, security, and delivering consistent value to our community of miners.
          </p>
        </div>
        <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Our Mission"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg order-last lg:order-first">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Our Values"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Values</h2>
          <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <Zap className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold">Innovation:</span> Continuously evolving our technology to provide the
                most efficient mining solutions.
              </div>
            </li>
            <li className="flex items-start">
              <Shield className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold">Security:</span> Prioritizing the safety of your investments and data
                with state-of-the-art security measures.
              </div>
            </li>
            <li className="flex items-start">
              <Users className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold">Community:</span> Building a strong, supportive global community of
                miners.
              </div>
            </li>
            <li className="flex items-start">
              <Lightbulb className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold">Transparency:</span> Providing clear, honest, and real-time insights
                into your mining operations.
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Why Choose PulseCloud?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">High Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Leverage our state-of-the-art mining infrastructure for maximum hash rate and efficiency.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">Unwavering Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your assets are protected with advanced security protocols and cold storage solutions.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">Dedicated Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our expert support team is available 24/7 to assist you with any queries or issues.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Join the PulseCloud Family</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Ready to start your mining journey with a trusted partner? Sign up today and experience the future of cloud
          mining.
        </p>
        <Button size="lg" className="px-8 py-3 text-lg">
          Get Started Now
        </Button>
      </section>
    </div>
  )
}
