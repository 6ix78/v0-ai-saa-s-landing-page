"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function withdrawFunds(formData: FormData) {
  const amount = Number.parseFloat(formData.get("amount") as string)
  const walletAddress = formData.get("walletAddress") as string

  if (isNaN(amount) || amount <= 0) {
    return { success: false, message: "Invalid amount." }
  }
  if (!walletAddress) {
    return { success: false, message: "Wallet address is required." }
  }

  // In a real application, you would get the user ID from the session
  // For this example, we'll use a placeholder user ID
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "User not authenticated." }
  }

  const userId = user.id

  // Start a transaction (Supabase doesn't have explicit transactions for RPC,
  // so we'll simulate atomicity with careful checks and error handling)
  try {
    // 1. Fetch current balance
    const { data: balanceData, error: fetchError } = await supabase
      .from("user_balances")
      .select("balance")
      .eq("user_id", userId)
      .single()

    if (fetchError || !balanceData) {
      console.error("Error fetching balance:", fetchError)
      return { success: false, message: "Failed to fetch balance." }
    }

    const currentBalance = balanceData.balance

    if (currentBalance < amount) {
      return { success: false, message: "Insufficient balance." }
    }

    // 2. Update balance
    const newBalance = currentBalance - amount
    const { error: updateError } = await supabase
      .from("user_balances")
      .update({ balance: newBalance })
      .eq("user_id", userId)

    if (updateError) {
      console.error("Error updating balance:", updateError)
      return { success: false, message: "Failed to process withdrawal." }
    }

    // 3. Log the withdrawal (optional, but good for auditing)
    // In a real app, you'd have a 'transactions' table
    console.log(`User ${userId} withdrew ${amount} to ${walletAddress}. New balance: ${newBalance}`)

    revalidatePath("/dashboard/wallets") // Revalidate the wallets page to show updated balance
    return { success: true, message: `Successfully withdrew $${amount.toFixed(2)} to ${walletAddress}.` }
  } catch (error) {
    console.error("Unexpected error during withdrawal:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
