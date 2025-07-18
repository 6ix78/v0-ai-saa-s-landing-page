"use server"

import { createServerActionClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

interface WithdrawResult {
  success: boolean
  message: string
  newBalance?: number
}

export async function withdrawFunds(formData: FormData): Promise<WithdrawResult> {
  const supabase = createServerActionClient()
  const amount = Number.parseFloat(formData.get("amount") as string)
  const walletAddress = formData.get("walletAddress") as string

  // Basic validation
  if (isNaN(amount) || amount <= 0) {
    return { success: false, message: "Invalid withdrawal amount." }
  }
  if (!walletAddress || walletAddress.length < 20) {
    // Simple address length check
    return { success: false, message: "Invalid wallet address." }
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, message: "User not authenticated." }
  }

  try {
    // 1. Fetch current balance
    const { data: balanceData, error: fetchError } = await supabase
      .from("user_balances")
      .select("balance")
      .eq("user_id", user.id)
      .single()

    if (fetchError || !balanceData) {
      console.error("Error fetching balance:", fetchError)
      return { success: false, message: "Failed to retrieve balance. Please try again." }
    }

    const currentBalance = Number.parseFloat(balanceData.balance)

    // 2. Check if sufficient funds
    if (currentBalance < amount) {
      return {
        success: false,
        message: `Insufficient funds. Your current balance is ${currentBalance.toFixed(8)} ETH.`,
      }
    }

    // Simulate a delay for transaction processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 3. Update balance
    const newBalance = currentBalance - amount
    const { error: updateError } = await supabase
      .from("user_balances")
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq("user_id", user.id)

    if (updateError) {
      console.error("Error updating balance:", updateError)
      return { success: false, message: "Withdrawal failed due to a database error." }
    }

    // Revalidate the path to show updated balance immediately
    revalidatePath("/dashboard/wallets")

    return {
      success: true,
      message: `Successfully withdrew ${amount} ETH to ${walletAddress}. New balance: ${newBalance.toFixed(8)} ETH.`,
      newBalance,
    }
  } catch (error) {
    console.error("Unexpected error during withdrawal:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
