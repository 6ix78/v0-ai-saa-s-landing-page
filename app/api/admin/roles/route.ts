import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerActionClient } from "@/lib/supabase"

export async function GET() {
  const supabase = createServerActionClient({ cookies })

  const { data, error } = await supabase.from("roles").select("id, name").order("name")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
