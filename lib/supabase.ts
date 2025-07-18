import type { cookies as nextCookies } from "next/headers"
import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./supabase.types" // ↪ generate via Studio or `npm i --save-dev supabase`

/* ------------------------------------------------------------------ */
/* CLIENT                                                             */
/* ------------------------------------------------------------------ */
let _client: SupabaseClient<Database> | null = null

export function getClientSupabaseClient(): SupabaseClient<Database> {
  if (_client) return _client

  _client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  return _client
}

/* ------------------------------------------------------------------ */
/* SERVER                                                             */
/* ------------------------------------------------------------------ */
export function getServerSupabaseClient(
  cookieStore: ReturnType<typeof nextCookies>,
  options: CookieOptions = { path: "/", sameSite: "lax", secure: true },
): SupabaseClient<Database> {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // ↪ on the server we can use the service key
    {
      cookies: {
        get: (key) => cookieStore().get(key)?.value,
        set: (key, value, opts) => cookieStore().set(key, value, { ...options, ...opts }),
        remove: (key, opts) => cookieStore().delete(key, { ...options, ...opts }),
      },
    },
  )
}
