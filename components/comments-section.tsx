"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: string
  blog_post_slug: string
  author: string
  content: string
  created_at: string
}

interface CommentsSectionProps {
  postSlug: string
}

export function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [author, setAuthor] = useState("Anonymous") // In a real app, this would come from user auth
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/comments?slug=${postSlug}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setComments(data.comments)
    } catch (e: any) {
      setError(`Failed to fetch comments: ${e.message}`)
      console.error("Error fetching comments:", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postSlug])

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      setError("Comment cannot be empty.")
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blog_post_slug: postSlug, author, content: newComment }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setComments((prevComments) => [data.comment, ...prevComments])
      setNewComment("")
      setError(null)
    } catch (e: any) {
      setError(`Failed to submit comment: ${e.message}`)
      console.error("Error submitting comment:", e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments</h2>

      {/* New Comment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Leave a comment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* In a real app, author input might be hidden if user is logged in */}
          <div className="grid gap-2">
            <Label htmlFor="author">Your Name</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name"
              disabled={submitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment">Your Comment</Label>
            <Textarea
              id="comment"
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
              disabled={submitting}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleSubmitComment} disabled={submitting || !newComment.trim()}>
            {submitting ? "Submitting..." : "Submit Comment"}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Comments */}
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.author}`} />
                    <AvatarFallback>{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{comment.author}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
