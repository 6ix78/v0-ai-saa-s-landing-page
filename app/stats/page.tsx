import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, BarChart, Users, DollarSign } from "lucide-react"
import Link from "next/link"

export default function MiningStatsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mining Statistics</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Track real-time performance, earnings, and network data.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Hash Rate</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,345 MH/s</div>
                <p className="text-xs text-muted-foreground">+5.2% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,234.56</div>
                <p className="text-xs text-muted-foreground">+10.1% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Miners</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,678</div>
                <p className="text-xs text-muted-foreground">+150 since last month</p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Hash Rate Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Placeholder for a chart */}
                  <BarChart className="h-full w-full text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Network Difficulty & Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Placeholder for a chart */}
                  <LineChart className="h-full w-full text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              For more detailed statistics and personalized reports, please{" "}
              <Link href="/dashboard" className="text-primary hover:underline">
                log in to your dashboard
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
