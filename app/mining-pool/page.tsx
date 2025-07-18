import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Zap, DollarSign, Shield } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mining Pool | PulseCloud",
  description: "Join PulseCloud's high-performance mining pool for stable payouts and efficient mining.",
}

export default function MiningPoolPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Join the <span className="text-primary">PulseCloud Mining Pool</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Maximize your mining profits with our state-of-the-art, high-performance Ethereum mining pool.
        </p>
        <Button size="lg" className="mt-8 px-8 py-3 text-lg">
          Start Mining Now
        </Button>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Why Mine with PulseCloud?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our mining pool is designed for both novice and experienced miners, offering a seamless experience with
            competitive advantages. We focus on stability, efficiency, and transparency to ensure you get the most out
            of your mining efforts.
          </p>
          <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <span>High Uptime & Reliability</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <span>Competitive Pool Fees</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <span>Transparent Statistics</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <span>24/7 Technical Support</span>
            </li>
          </ul>
        </div>
        <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Mining Pool Benefits"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Pool Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">High Hash Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join a pool with a massive combined hash rate for more frequent block finds.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <DollarSign className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">Fair Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We use a transparent PPLNS (Pay Per Last N Shares) payout scheme for fairness.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">Growing Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Connect with other miners, share insights, and grow together.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">DDoS Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our infrastructure is protected against attacks to ensure continuous mining.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">How to Connect</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Connecting your mining rig to PulseCloud's pool is simple. Follow these steps:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4 dark:bg-blue-900 dark:text-blue-300">
                1
              </div>
              <CardTitle className="text-xl font-bold">Choose Your Miner</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select your preferred mining software (e.g., PhoenixMiner, T-Rex, Gminer).
              </p>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4 dark:bg-blue-900 dark:text-blue-300">
                2
              </div>
              <CardTitle className="text-xl font-bold">Configure Your Batch File</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Set the pool address and your wallet address in your miner's configuration.
              </p>
              <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm mt-4 break-all">
                {`pool.pulsecloud.com:8008 -wal 0xYOUR_WALLET_ADDRESS`}
              </code>
            </CardContent>
          </Card>
          <Card className="p-6 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4 dark:bg-blue-900 dark:text-blue-300">
                3
              </div>
              <CardTitle className="text-xl font-bold">Start Mining</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Run your miner and start earning Ethereum. Monitor your stats on our dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Need Assistance?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Our support team is ready to help you get started or resolve any issues.
        </p>
        <Button size="lg" variant="outline" className="px-8 py-3 text-lg bg-transparent">
          Contact Support
        </Button>
      </section>
    </div>
  )
}
