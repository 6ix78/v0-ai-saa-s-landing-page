"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowUpRight, ArrowDownRight, MoreHorizontal, Zap, Bitcoin, HardHat } from "lucide-react"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { calculateAndApplyMiningEarnings } from "@/actions/mining"
import { getClientSupabaseClient } from "@/lib/supabase"

const monthlyData = [
  { name: "Jan", revenue: 4000, hashRate: 2400, miners: 12 },
  { name: "Feb", revenue: 3000, hashRate: 1398, miners: 15 },
  { name: "Mar", revenue: 2000, hashRate: 9800, miners: 18 },
  { name: "Apr", revenue: 2780, hashRate: 3908, miners: 22 },
  { name: "May", revenue: 1890, hashRate: 4800, miners: 25 },
  { name: "Jun", revenue: 2390, hashRate: 3800, miners: 28 },
  { name: "Jul", revenue: 3490, hashRate: 4300, miners: 32 },
]

const usageData = [
  { name: "Hash Rate", value: 45, color: "#8884d8" },
  { name: "Power Consumption", value: 30, color: "#82ca9d" },
  { name: "Pool Fees", value: 25, color: "#ffc658" },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"]

export default function Dashboard() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("7d")
  const [userBalance, setUserBalance] = useState<number | null>(null)
  const [totalHashPower, setTotalHashPower] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [miningMessage, setMiningMessage] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchMiningData = async () => {
    setLoading(true)
    const supabase = getClientSupabaseClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      // No active session – send the visitor to the sign-in page
      router.push("/auth/signin")
      return
    }

    const result = await calculateAndApplyMiningEarnings()

    if (result.success) {
      setUserBalance(result.newBalance || 0)
      setTotalHashPower(result.totalHashPower || 0)
      setMiningMessage(result.message)
    } else {
      console.error("Failed to get mining data:", result.message)
      setMiningMessage(`Error: ${result.message}`)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMiningData()

    // Set up an interval to periodically update earnings (e.g., every 5 minutes)
    intervalRef.current = setInterval(fetchMiningData, 5 * 60 * 1000) // Every 5 minutes

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const stats = [
    {
      title: "Total Earnings (ETH)",
      value: userBalance !== null ? `${userBalance.toFixed(8)} ETH` : "Loading...",
      change: "+0.00000000 ETH", // Placeholder, will be updated by mining action
      changeType: "positive",
      icon: Bitcoin,
      description: "from last update",
    },
    {
      title: "Active Miners",
      value: "2,350", // This can be dynamic if you implement rig management
      change: "+180",
      changeType: "positive",
      icon: Users,
      description: "from last month",
    },
    {
      title: "Total Hash Rate",
      value: totalHashPower !== null ? `${totalHashPower.toFixed(2)} GH/s` : "Loading...",
      change: "+0.00 GH/s", // Placeholder, will be updated by mining action
      changeType: "positive",
      icon: Zap,
      description: "from last update",
    },
    {
      title: "Mining Rigs",
      value: "573", // This can be dynamic if you implement rig management
      change: "+20",
      changeType: "positive",
      icon: HardHat,
      description: "from last month",
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      description: "ETH Payout - 0.5 ETH",
      amount: "+$1,999.00",
      status: "completed",
      time: "2 hours ago",
    },
    { id: 2, description: "Package Purchase - Starter", amount: "-$39.00", status: "completed", time: "4 hours ago" },
    { id: 3, description: "ETH Payout - 0.05 ETH", amount: "+$299.00", status: "pending", time: "6 hours ago" },
    {
      id: 4,
      description: "Package Purchase - Enterprise",
      amount: "-$4,999.00",
      status: "completed",
      time: "1 day ago",
    },
    { id: 5, description: "ETH Payout - 0.02 ETH", amount: "+$89.00", status: "completed", time: "2 days ago" },
  ]

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mining Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your mining operations today.
              </p>
              {loading && <p className="text-sm text-blue-500 mt-2">Loading mining data and applying earnings...</p>}
              {miningMessage && !loading && <p className="text-sm text-muted-foreground mt-2">{miningMessage}</p>}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-60:0 dark:text-gray-400">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                      <div className="flex items-center text-xs">
                        {stat.changeType === "positive" ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                          {stat.change}
                        </span>
                        <span className="text-gray-500 ml-1">{stat.description}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Earnings Chart */}
              <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Earnings Overview</CardTitle>
                    <CardDescription>Monthly Ethereum earnings and growth metrics</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={timeRange === "7d" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => setTimeRange("7d")}
                    >
                      7d
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={timeRange === "30d" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => setTimeRange("30d")}
                    >
                      30d
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={timeRange === "90d" ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => setTimeRange("90d")}
                    >
                      90d
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                        <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
                        <YAxis className="text-gray-600 dark:text-gray-400" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Resource Utilization */}
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Resource Utilization</CardTitle>
                  <CardDescription>Current mining resource breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {usageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {usageData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }} />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Payouts */}
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Recent Payouts</CardTitle>
                    <CardDescription>Latest Ethereum payouts</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{transaction.amount}</p>
                          <Badge
                            variant={transaction.status === "completed" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mining Rig Performance */}
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-medium">Mining Rig Performance</CardTitle>
                  <CardDescription>Monthly rig deployment and hash rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                        <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
                        <YAxis className="text-gray-600 dark:text-gray-400" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Bar dataKey="miners" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
