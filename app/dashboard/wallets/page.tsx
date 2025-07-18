"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, WalletIcon, Send, History } from "lucide-react"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import { withdrawFunds } from "@/actions/withdraw"
import { getClientSupabaseClient } from "@/lib/supabase"

export default function WalletsPage() {
  const [balance, setBalance] = useState<number | null>(null)
  const [walletAddress, setWalletAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [withdrawalStatus, setWithdrawalStatus] = useState<{
    success: boolean | null
    message: string | null
  }>({ success: null, message: null })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([]) // Placeholder for transactions

  const fetchBalance = async () => {
    const supabase = getClientSupabaseClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error("User not authenticated:", userError?.message)
      setBalance(0) // Default to 0 if not authenticated
      return
    }

    const { data, error } = await supabase.from("user_balances").select("balance").eq("user_id", user.id).single()

    if (error) {
      console.error("Error fetching balance:", error)
      setBalance(0)
    } else if (data) {
      setBalance(Number.parseFloat(data.balance))
    }
  }

  useEffect(() => {
    fetchBalance()
    // In a real app, you'd fetch transaction history here too
    setTransactions([
      { id: 1, type: "Withdrawal", amount: "-0.05 ETH", date: "2024-07-10", status: "Completed" },
      { id: 2, type: "Mining Payout", amount: "+0.01 ETH", date: "2024-07-09", status: "Completed" },
      { id: 3, type: "Withdrawal", amount: "-0.1 ETH", date: "2024-07-05", status: "Pending" },
    ])
  }, [])

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setWithdrawalStatus({ success: null, message: null })

    const formData = new FormData()
    formData.append("amount", amount)
    formData.append("walletAddress", walletAddress)

    const result = await withdrawFunds(formData)

    setWithdrawalStatus(result)
    setIsSubmitting(false)

    if (result.success) {
      setAmount("")
      setWalletAddress("")
      fetchBalance() // Refresh balance after successful withdrawal
      // Also refresh transactions in a real app
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex flex-col w-full">
        <DashboardHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {balance !== null ? `${balance.toFixed(8)} ETH` : "Loading..."}
                </div>
                <p className="text-xs text-muted-foreground">Your available funds for withdrawal</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estimated USD Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {balance !== null ? `$${(balance * 2000).toFixed(2)}` : "Loading..."}
                </div>{" "}
                {/* Assuming 1 ETH = $2000 */}
                <p className="text-xs text-muted-foreground">Based on current market rates</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
                <History className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.15 ETH</div> {/* Placeholder */}
                <p className="text-xs text-muted-foreground">Across all time</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdrawal} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount (ETH)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.00000001"
                      placeholder="0.00000000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      min="0.00000001"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="walletAddress">Wallet Address</Label>
                    <Input
                      id="walletAddress"
                      type="text"
                      placeholder="0x..."
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Processing..." : "Initiate Withdrawal"}
                  </Button>
                  {withdrawalStatus.message && (
                    <p
                      className={`text-center text-sm ${withdrawalStatus.success ? "text-green-500" : "text-red-500"}`}
                    >
                      {withdrawalStatus.message}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-muted-foreground">No transactions yet.</p>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium">{tx.type}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className={tx.amount.startsWith("+") ? "text-green-500" : "text-red-500"}>{tx.amount}</p>
                          <p className="text-xs text-muted-foreground">{tx.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
