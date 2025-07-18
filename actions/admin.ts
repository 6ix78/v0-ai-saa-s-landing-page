"use server"

import { cookies } from "next/headers"
import { createServerActionClient } from "@/lib/supabase"

/**
 * Return all users with their profile, current balance and role name.
 * Falls back to empty array if tables are missing or RLS blocks access.
 */
export async function getUsersWithProfilesAndBalances() {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.from("profiles").select(
    `
        id,
        email,
        created_at,
        first_name,
        last_name,
        company,
        roles:role_id ( name ),
        user_balances:balance_id ( balance, currency )
      `,
  )

  if (error) {
    console.error("[admin] getUsersWithProfilesAndBalances error:", error)
    return []
  }

  // Normalise for the dashboard table
  return data.map((row: any) => ({
    id: row.id,
    email: row.email,
    created_at: row.created_at,
    first_name: row.first_name,
    last_name: row.last_name,
    company: row.company,
    role_name: row.roles?.name ?? "user",
    balance: row.user_balances?.balance ?? 0,
    currency: row.user_balances?.currency ?? "ETH",
  }))
}

/**
 * Fetch the most recent activity logs (latest 100 by default).
 */
export async function getUserActivityLogs(limit = 100) {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase
    .from("activity_logs")
    .select(`id, user_id, event_type, description, timestamp, profiles!inner(email)`)
    .order("timestamp", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("[admin] getUserActivityLogs error:", error)
    return []
  }

  return data.map((row: any) => ({
    ...row,
    user_email: row.profiles?.email,
  }))
}

/**
 * Change a user's role.
 */
export async function updateUserRole(userId: string, newRoleId: string) {
  const supabase = createServerActionClient({ cookies })

  const { error } = await supabase.from("profiles").update({ role_id: newRoleId }).eq("id", userId)

  if (error) {
    console.error("[admin] updateUserRole error:", error)
    return { success: false, message: error.message }
  }

  return { success: true }
}

/**
 * Add or deduct balance from a user.
 * `type` = "add" | "deduct"
 */
export async function adjustUserBalance(userId: string, amount: number, type: "add" | "deduct" = "add") {
  const supabase = createServerActionClient({ cookies })

  // We use an RPC to avoid race conditions, but fall back to update-plus-select here
  const multiplier = type === "add" ? 1 : -1
  const { data, error } = await supabase
    .from("user_balances")
    .update({ balance: supabase.raw(`balance + ${amount * multiplier}`) })
    .eq("user_id", userId)
    .select("balance")
    .single()

  if (error) {
    console.error("[admin] adjustUserBalance error:", error)
    return { success: false, message: error.message }
  }

  // Optionally insert an activity log
  await supabase.from("activity_logs").insert({
    user_id: userId,
    event_type: type === "add" ? "balance_add" : "balance_deduct",
    description: `${type === "add" ? "Added" : "Deducted"} ${amount} ETH via admin dashboard`,
  })

  return { success: true, newBalance: data.balance }
}

/**
 * Generate a one-time magic link that lets the admin open the user dashboard
 * as that user (valid for 5 minutes).
 */
export async function generateRemoteLoginLink(userId: string) {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    user_id: userId,
    options: { expires_in: 300 }, // 5 minutes
  })

  if (error) {
    console.error("[admin] generateRemoteLoginLink error:", error)
    return { success: false, message: error.message }
  }

  return { success: true, loginLink: data.properties?.action_link }
}
