"use client"

import { useState, useEffect, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: string
  post_slug: string
  author_name: string
  author_email?: string
  content: string
  created_at: string
}

interface CommentsSectionProps {
  postSlug: string
}

export default function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author_name: "", content: "" })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/comments?post_slug=${postSlug}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Comment[] = await response.json()
      setComments(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
    } catch (err: any) {
      setError(err.message || "Failed to fetch comments.")
      console.error("Error fetching comments:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postSlug])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    if (!newComment.author_name.trim() || !newComment.content.trim()) {
      setError("Name and comment cannot be empty.")
      setSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newComment, post_slug: postSlug }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const addedComment: Comment = await response.json()
      setComments((prev) => [addedComment, ...prev])
      setNewComment({ author_name: "", content: "" })
    } catch (err: any) {
      setError(err.message || "Failed to submit comment.")
      console.error("Error submitting comment:", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Leave a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your Name"
                value={newComment.author_name}
                onChange={(e) => setNewComment({ ...newComment, author_name: e.target.value })}
                required
                disabled={submitting}
              />
            </div>
            <div>
              <Textarea
                placeholder="Write your comment here..."
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                required
                disabled={submitting}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Comment"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <Avatar>
                    <AvatarFallback>
                      {comment.author_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{comment.author_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground">{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
