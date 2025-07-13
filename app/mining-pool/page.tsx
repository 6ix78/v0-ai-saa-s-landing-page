import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function MiningPoolPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Mining Pool</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Maximize your earnings by joining our high-performance Ethereum mining pool.
              </p>
            </div>
          </div>

          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,000+</div>
                <p className="text-xs text-muted-foreground">Active miners</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pool Hash Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">500 TH/s</div>
                <p className="text-xs text-muted-foreground">Combined power</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Payouts</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Consistent</div>
                <p className="text-xs text-muted-foreground">Direct to your wallet</p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">How Our Pool Works</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Connect Your Rig</h3>
                <p className="text-muted-foreground">
                  Easily connect your mining hardware to our pool using our simple setup guide.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Mine Together</h3>
                <p className="text-muted-foreground">
                  Contribute your hash rate to the collective power of the pool to find blocks faster.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Receive Payouts</h3>
                <p className="text-muted-foreground">
                  Get a proportional share of the block rewards based on your contribution, paid daily.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Join?</h2>
            <p className="text-muted-foreground text-lg mb-6">Start maximizing your Ethereum mining profits today.</p>
            <Link href="/auth/signup">
              <Button size="lg">Join Our Mining Pool</Button>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
