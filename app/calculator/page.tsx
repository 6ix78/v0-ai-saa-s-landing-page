import type { Metadata } from "next"
import MiningCalculatorClientPage from "./MiningCalculatorClientPage"

export const metadata: Metadata = {
  title: "Mining Calculator | PulseCloud",
  description: "Estimate your potential cryptocurrency mining earnings with PulseCloud's advanced mining calculator.",
}

export default function MiningCalculatorPage() {
  return <MiningCalculatorClientPage />
}
