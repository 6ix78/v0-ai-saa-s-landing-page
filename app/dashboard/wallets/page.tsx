"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { withdrawFunds } from "@/actions/withdraw" // Import the server action
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import { supabase } from "@/lib/supabase" // Client-side Supabase for initial fetch

interface UserBalance {
  balance: number
  currency: string
}

export default function WalletsPage() {
  const [balance, setBalance] = useState<UserBalance | null>(null)
  const [loadingBalance, setLoadingBalance] = useState(true)
  const [errorBalance, setErrorBalance] = useState<string | null>(null)

  const [state, formAction, isPending] = useActionState(withdrawFunds, {
    success: false,
    message: "",
  })

  const fetchBalance = async () => {
    setLoadingBalance(true)
    setErrorBalance(null)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setErrorBalance("User not authenticated.")
        setLoadingBalance(false)
        return
      }

      const { data, error } = await supabase
        .from("user_balances")
        .select("balance, currency")
        .eq("user_id", user.id)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          // No rows found
          setBalance({ balance: 0, currency: "USD" }) // Default balance if not found
        } else {
          throw error
        }
      } else {
        setBalance(data)
      }
    } catch (err: any) {
      setErrorBalance(err.message || "Failed to fetch balance.")
      console.error("Error fetching balance:", err)
    } finally {
      setLoadingBalance(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  useEffect(() => {
    if (state.success) {
      fetchBalance() // Re-fetch balance on successful withdrawal
    }
  }, [state.success])

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
              </CardHeader>
              <CardContent>
                {loadingBalance ? (
                  <div className="text-2xl font-bold">Loading...</div>
                ) : errorBalance ? (
                  <div className="text-red-500">{errorBalance}</div>
                ) : (
                  <div className="text-2xl font-bold">
                    ${balance?.balance.toFixed(2) || "0.00"} {balance?.currency}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Your available funds</p>
              </CardContent>
            </Card>
            {/* Add more wallet-related cards here if needed, e.g., pending withdrawals, deposit history */}
          </div>

          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Withdraw Funds</CardTitle>
              <CardDescription>Withdraw your earnings to your cryptocurrency wallet.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 100.00"
                    required
                    disabled={isPending}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input
                    id="walletAddress"
                    name="walletAddress"
                    type="text"
                    placeholder="Enter your ETH wallet address"
                    required
                    disabled={isPending}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Processing..." : "Withdraw"}
                </Button>
                {state?.message && (
                  <p className={`text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>{state.message}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
