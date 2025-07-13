"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function CalculatorPage() {
  // Hash Rate Calculator States
  const [usdAmount, setUsdAmount] = useState<number | "">("")
  const [calculatedHashRate, setCalculatedHashRate] = useState<number | null>(null)
  const [calculatedEthEquivalent, setCalculatedEthEquivalent] = useState<number | null>(null)
  const [dailyProfit, setDailyProfit] = useState<number | null>(null)

  // Investment ROI Calculator States
  const [investmentAmount, setInvestmentAmount] = useState<number | "">("")
  const [monthlyReturnRate, setMonthlyReturnRate] = useState<number | "">("")
  const [investmentPeriod, setInvestmentPeriod] = useState<number | "">("")
  const [calculatedROI, setCalculatedROI] = useState<number | null>(null)
  const [totalReturn, setTotalReturn] = useState<number | null>(null)

  // Fixed values for calculation (can be fetched from an API in a real app)
  const ETH_PRICE_USD = 3500 // Example ETH price
  const PROFITABILITY_PER_MH_S_PER_DAY_USD = 0.05 // Example: $0.05 profit per MH/s per day

  // Auto-fill for Hash Rate Calculator based on USD amount
  useEffect(() => {
    if (typeof usdAmount === "number" && usdAmount > 0) {
      // Calculate hash rate equivalent: USD amount / (profit per MH/s per day * 30 days)
      // This is a simplified inverse calculation. In reality, it's more complex.
      const estimatedHashRate = usdAmount / (PROFITABILITY_PER_MH_S_PER_DAY_USD * 30)
      setCalculatedHashRate(estimatedHashRate)

      // Calculate ETH equivalent: USD amount / ETH price
      const ethEquivalent = usdAmount / ETH_PRICE_USD
      setCalculatedEthEquivalent(ethEquivalent)
    } else {
      setCalculatedHashRate(null)
      setCalculatedEthEquivalent(null)
    }
  }, [usdAmount])

  const handleCalculateProfit = () => {
    if (typeof usdAmount === "number" && usdAmount > 0) {
      // Daily profit is directly the USD amount entered, as per the new logic
      setDailyProfit(usdAmount)
    } else {
      setDailyProfit(null)
    }
  }

  const handleCalculateROI = () => {
    if (
      typeof investmentAmount === "number" &&
      typeof monthlyReturnRate === "number" &&
      typeof investmentPeriod === "number" &&
      investmentAmount > 0 &&
      monthlyReturnRate >= 0 &&
      investmentPeriod > 0
    ) {
      const monthlyRateDecimal = monthlyReturnRate / 100
      const totalReturnAmount = investmentAmount * (1 + monthlyRateDecimal * investmentPeriod)
      const roi = ((totalReturnAmount - investmentAmount) / investmentAmount) * 100

      setTotalReturn(totalReturnAmount)
      setCalculatedROI(roi)
    } else {
      setCalculatedROI(null)
      setTotalReturn(null)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mining Calculators</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Estimate your potential earnings and return on investment.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Hash Rate Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Hash Rate Calculator</CardTitle>
                <CardDescription>Estimate your daily profit based on your investment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="usdAmount">Investment Amount (USD)</Label>
                  <Input
                    id="usdAmount"
                    type="number"
                    placeholder="e.g., 100"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value === "" ? "" : Number.parseFloat(e.target.value))}
                    min="0"
                  />
                </div>

                {calculatedHashRate !== null && (
                  <div className="grid gap-2">
                    <Label>Estimated Hash Rate Equivalent</Label>
                    <Input value={`${calculatedHashRate.toFixed(2)} MH/s`} readOnly disabled />
                  </div>
                )}

                {calculatedEthEquivalent !== null && (
                  <div className="grid gap-2">
                    <Label>Estimated ETH Equivalent</Label>
                    <Input value={`${calculatedEthEquivalent.toFixed(4)} ETH`} readOnly disabled />
                  </div>
                )}

                <Button onClick={handleCalculateProfit} className="w-full">
                  Calculate Profit
                </Button>

                {dailyProfit !== null && (
                  <div className="mt-6 space-y-2">
                    <h3 className="text-lg font-semibold">Estimated Daily Profit:</h3>
                    <p className="text-2xl font-bold text-primary">${dailyProfit.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      This is a simplified estimate. Actual profits may vary based on market conditions.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Investment ROI Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Investment ROI Calculator</CardTitle>
                <CardDescription>Calculate the potential return on your investment over time.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="investmentAmount">Initial Investment (USD)</Label>
                  <Input
                    id="investmentAmount"
                    type="number"
                    placeholder="e.g., 1000"
                    value={investmentAmount}
                    onChange={(e) =>
                      setInvestmentAmount(e.target.value === "" ? "" : Number.parseFloat(e.target.value))
                    }
                    min="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="monthlyReturnRate">Monthly Return Rate (%)</Label>
                  <Input
                    id="monthlyReturnRate"
                    type="number"
                    placeholder="e.g., 5"
                    value={monthlyReturnRate}
                    onChange={(e) =>
                      setMonthlyReturnRate(e.target.value === "" ? "" : Number.parseFloat(e.target.value))
                    }
                    min="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="investmentPeriod">Investment Period (Months)</Label>
                  <Input
                    id="investmentPeriod"
                    type="number"
                    placeholder="e.g., 12"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(e.target.value === "" ? "" : Number.parseInt(e.target.value))}
                    min="1"
                  />
                </div>
                <Button onClick={handleCalculateROI} className="w-full">
                  Calculate ROI
                </Button>

                {calculatedROI !== null && totalReturn !== null && (
                  <div className="mt-6 space-y-2">
                    <h3 className="text-lg font-semibold">Estimated Return on Investment:</h3>
                    <p className="text-2xl font-bold text-primary">{calculatedROI.toFixed(2)}%</p>
                    <p className="text-lg font-semibold">Total Return: ${totalReturn.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      This is an estimate. Actual returns may vary based on market fluctuations.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
