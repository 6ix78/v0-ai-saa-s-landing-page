import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const blogPostSlug = searchParams.get("slug")

  if (!blogPostSlug) {
    return NextResponse.json({ error: "Blog post slug is required" }, { status: 400 })
  }

  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("blog_post_slug", blogPostSlug)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comments: data })
}

export async function POST(request: Request) {
  const { blog_post_slug, author, content } = await request.json()

  if (!blog_post_slug || !author || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("comments").insert({ blog_post_slug, author, content }).select().single() // Return the inserted row

  if (error) {
    console.error("Error inserting comment:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ comment: data }, { status: 201 })
}
