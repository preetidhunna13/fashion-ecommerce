"use client"

import Link from "next/link"

import type React from "react"
import { useState, useTransition } from "react"
import { Star, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { submitReview } from "@/app/products/[id]/_actions/reviews" // Import the server action
import type { Review } from "@/lib/data"

interface ProductReviewsProps {
  productId: number
  reviews: Review[]
  averageRating: number
}

export function ProductReviews({ productId, reviews, averageRating }: ProductReviewsProps) {
  const { state: authState } = useAuth()
  const [newRating, setNewRating] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!authState.isAuthenticated || !authState.currentUser) {
      toast.error("You must be logged in to submit a review.")
      return
    }
    if (newRating === 0) {
      toast.error("Please select a rating.")
      return
    }
    if (newComment.trim() === "") {
      toast.error("Please write a comment for your review.")
      return
    }

    startTransition(async () => {
      const result = await submitReview(
        productId,
        newRating,
        newComment,
        authState.currentUser!.id,
        authState.currentUser!.name,
      )

      if (result.success) {
        toast.success(result.message)
        setNewRating(0)
        setNewComment("")
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <div className="space-y-12">
      {/* Overall Rating Summary */}
      <Card className="shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-6xl font-bold text-primary">{averageRating.toFixed(1)}</span>
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i < Math.floor(averageRating) ? "fill-primary" : "fill-transparent"}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">{reviews.length} Reviews</span>
          </div>
          <div className="flex-1 w-full">
            {/* Rating distribution (mock) */}
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-2 text-sm mb-1">
                  <span className="w-4 text-right">
                    {star} <Star className="h-3 w-3 inline-block fill-muted-foreground text-muted-foreground" />
                  </span>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span className="w-8 text-right text-muted-foreground">{count}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Review Submission Form */}
      {authState.isAuthenticated ? (
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <Label htmlFor="rating">Your Rating</Label>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
                        newRating >= star ? "fill-primary text-primary" : "fill-transparent text-muted-foreground"
                      } hover:fill-primary hover:text-primary`}
                      onClick={() => setNewRating(star)}
                      aria-label={`Rate ${star} out of 5 stars`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="comment">Your Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Share your thoughts on this product..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  required
                  className="focus:ring-primary focus:border-primary"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-lg border-border/50 p-6 text-center">
          <p className="text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>{" "}
            to write a review.
          </p>
        </Card>
      )}

      {/* Existing Reviews */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-foreground">All Reviews ({reviews.length})</h3>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="shadow-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <UserCircle className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground">{review.userName}</p>
                    <div className="flex items-center gap-1 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-primary" : "fill-transparent"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
