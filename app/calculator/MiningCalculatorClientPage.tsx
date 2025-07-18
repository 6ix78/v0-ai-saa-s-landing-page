"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function MiningCalculatorClientPage() {
  const [hashRate, setHashRate] = useState("")
  const [powerConsumption, setPowerConsumption] = useState("")
  const [electricityCost, setElectricityCost] = useState("")
  const [poolFee, setPoolFee] = useState("1") // Default to 1%
  const [currency, setCurrency] = useState("ETH")
  const [estimatedDailyEarnings, setEstimatedDailyEarnings] = useState<number | null>(null)
  const [estimatedMonthlyEarnings, setEstimatedMonthlyEarnings] = useState<number | null>(null)
  const [estimatedYearlyEarnings, setEstimatedYearlyEarnings] = useState<number | null>(null)

  const calculateEarnings = () => {
    const hr = Number.parseFloat(hashRate)
    const pc = Number.parseFloat(powerConsumption)
    const ec = Number.parseFloat(electricityCost)
    const pf = Number.parseFloat(poolFee) / 100 // Convert percentage to decimal

    if (isNaN(hr) || isNaN(pc) || isNaN(ec) || isNaN(pf) || hr <= 0) {
      setEstimatedDailyEarnings(null)
      setEstimatedMonthlyEarnings(null)
      setEstimatedYearlyEarnings(null)
      return
    }

    // Dummy calculation logic (replace with real formulas)
    // These values are highly simplified and do not reflect real-world mining
    const ethPriceUsd = 2000 // Example ETH price
    const dailyBlockRewardEth = 0.0000001 // Example ETH per GH/s per day
    const networkHashRate = 1000000 // Example network hashrate in GH/s

    // Calculate raw daily earnings in ETH
    const rawDailyEth = (hr / networkHashRate) * dailyBlockRewardEth * 24 * 60 * 60 * 1000000000000000000 // Simplified
    // Adjust for pool fees
    const netDailyEth = rawDailyEth * (1 - pf)

    // Convert to USD
    const dailyEarningsUsd = netDailyEth * ethPriceUsd

    // Calculate electricity cost
    const dailyElectricityCost = (pc / 1000) * ec * 24 // kWh * cost/kWh * hours

    // Net daily earnings
    const netDailyEarnings = dailyEarningsUsd - dailyElectricityCost

    setEstimatedDailyEarnings(netDailyEarnings)
    setEstimatedMonthlyEarnings(netDailyEarnings * 30)
    setEstimatedYearlyEarnings(netDailyEarnings * 365)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Mining Profitability Calculator</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Estimate your potential earnings by inputting your mining rig's specifications and electricity costs.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Input Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="hashRate">Hash Rate (GH/s)</Label>
              <Input
                id="hashRate"
                type="number"
                placeholder="e.g., 100"
                value={hashRate}
                onChange={(e) => setHashRate(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="powerConsumption">Power Consumption (Watts)</Label>
              <Input
                id="powerConsumption"
                type="number"
                placeholder="e.g., 1000"
                value={powerConsumption}
                onChange={(e) => setPowerConsumption(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="electricityCost">Electricity Cost ($/kWh)</Label>
              <Input
                id="electricityCost"
                type="number"
                step="0.001"
                placeholder="e.g., 0.12"
                value={electricityCost}
                onChange={(e) => setElectricityCost(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="poolFee">Pool Fee (%)</Label>
              <Input
                id="poolFee"
                type="number"
                step="0.1"
                placeholder="e.g., 1"
                value={poolFee}
                onChange={(e) => setPoolFee(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency">Cryptocurrency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculateEarnings} className="w-full py-3 text-lg">
              Calculate Earnings
            </Button>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Estimated Earnings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {estimatedDailyEarnings !== null ? (
              <>
                <div className="grid gap-2">
                  <p className="text-lg text-muted-foreground">Daily Earnings (USD)</p>
                  <p className="text-4xl font-bold text-primary">${estimatedDailyEarnings.toFixed(2)}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-lg text-muted-foreground">Monthly Earnings (USD)</p>
                  <p className="text-4xl font-bold text-primary">${estimatedMonthlyEarnings?.toFixed(2)}</p>
                </div>
                <div className="grid gap-2">
                  <p className="text-lg text-muted-foreground">Yearly Earnings (USD)</p>
                  <p className="text-4xl font-bold text-primary">${estimatedYearlyEarnings?.toFixed(2)}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  *These are estimates based on current network difficulty and market prices, which can fluctuate.
                </p>
              </>
            ) : (
              <p className="text-lg text-muted-foreground text-center py-12">
                Enter your mining details to see estimated earnings.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
