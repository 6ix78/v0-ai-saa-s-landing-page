import { supabase } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const post_slug = searchParams.get("post_slug")

  if (!post_slug) {
    return NextResponse.json({ error: "Post slug is required" }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_slug", post_slug)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching comments:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Unexpected error fetching comments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { post_slug, author_name, content, author_email } = await req.json()

  if (!post_slug || !author_name || !content) {
    return NextResponse.json({ error: "Post slug, author name, and content are required" }, { status: 400 })
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_slug, author_name, content, author_email }])
      .select() // Select the inserted row to return it
      .single() // Expect a single row back

    if (error) {
      console.error("Error inserting comment:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error("Unexpected error inserting comment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
