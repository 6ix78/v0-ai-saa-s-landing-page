"use server"

import { cookies } from "next/headers"
import { getServerSupabaseClient } from "@/lib/supabase"

/**
 * Very small demo “mining” routine.
 *
 * • Every user has 1 GH /s of free hash-power.
 * • Users who received the $20 sign-up bonus get an additional 9 GH /s
 *   (so 10 GH /s total) – adjust to your needs.
 * • Earnings accrue at 0.00000001 ETH per GH /s per second.
 *
 * The user_balances table must contain:
 *   user_id (uuid, PK/FK) | balance_eth (numeric) | total_hash_power_gh (numeric)
 *   | last_mining_update (timestamptz)
 */
export async function calculateAndApplyMiningEarnings() {
  const supabase = getServerSupabaseClient(cookies())
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser()

  if (userErr || !user) {
    return { success: false, message: "Not authenticated" }
  }

  // grab (or initialise) the user’s balance record
  const { data: balanceRow } = await supabase.from("user_balances").select("*").eq("user_id", user.id).single()

  const now = new Date()

  // If the row doesn’t exist yet create it with the free hash-power
  if (!balanceRow) {
    const totalHashPower = 1 // free 1 GH/s
    const { error: insErr } = await supabase.from("user_balances").insert({
      user_id: user.id,
      balance_eth: 0,
      total_hash_power_gh: totalHashPower,
      last_mining_update: now.toISOString(),
    })

    if (insErr) {
      return { success: false, message: insErr.message }
    }

    return {
      success: true,
      message: "Mining record initialised.",
      newBalance: 0,
      totalHashPower,
    }
  }

  // ------------------------------------------------------------------
  // Mining calculation
  // ------------------------------------------------------------------
  const {
    balance_eth,
    total_hash_power_gh,
    last_mining_update,
  }: {
    balance_eth: number
    total_hash_power_gh: number
    last_mining_update: string
  } = balanceRow

  const lastUpdate = new Date(last_mining_update)
  const elapsedSec = (now.getTime() - lastUpdate.getTime()) / 1000
  if (elapsedSec <= 0) {
    return {
      success: true,
      message: "Nothing to update yet.",
      newBalance: balance_eth,
      totalHashPower: total_hash_power_gh,
    }
  }

  const EARN_RATE = 1e-8 // 0.00000001 ETH · GH⁻¹ · s⁻¹
  const minedEth = elapsedSec * total_hash_power_gh * EARN_RATE
  const newBalance = balance_eth + minedEth

  const { error: updErr } = await supabase
    .from("user_balances")
    .update({
      balance_eth: newBalance,
      last_mining_update: now.toISOString(),
    })
    .eq("user_id", user.id)

  if (updErr) {
    return { success: false, message: updErr.message }
  }

  return {
    success: true,
    message: `⛏️ +${minedEth.toFixed(10)} ETH mined in ${elapsedSec.toFixed(0)} s`,
    newBalance,
    totalHashPower: total_hash_power_gh,
  }
}
