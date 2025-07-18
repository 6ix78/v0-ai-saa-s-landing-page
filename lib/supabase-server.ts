"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "./supabase.types"

/**
 * Server-side Supabase client for Server Actions
 * - Uses the public **anon** key so Row-Level Security remains enforced
 * - Automatically wires the Next.js cookie store, letting Supabase persist the auth session.
 */
export async function createServerActionClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set: (key, value, opts) => cookieStore.set(key, value, { path: "/", sameSite: "lax", secure: true, ...opts }),
        remove: (key, opts) => cookieStore.delete(key, { path: "/", sameSite: "lax", secure: true, ...opts }),
      },
    },
  )
}
