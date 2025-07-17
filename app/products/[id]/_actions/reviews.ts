"use server"

import { products, type Review } from "@/lib/data"
import { revalidatePath } from "next/cache"

export async function submitReview(
  productId: number,
  rating: number,
  comment: string,
  userId: string,
  userName: string,
) {
  // Simulate a delay for network request
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const productIndex = products.findIndex((p) => p.id === productId)

  if (productIndex === -1) {
    return { success: false, message: "Product not found." }
  }

  const newReview: Review = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    userId,
    userName,
    rating,
    comment,
    date: new Date().toISOString(),
  }

  // In a real application, you would save this to a database (e.g., Supabase, Neon)
  // For this demo, we'll update the in-memory data.
  // Note: This change will not persist across server restarts in a real Next.js dev environment.
  // For a hackathon, this is acceptable to demonstrate the frontend flow.
  products[productIndex].reviews.push(newReview)

  // Recalculate average rating
  const totalRating = products[productIndex].reviews.reduce((sum, review) => sum + review.rating, 0)
  products[productIndex].averageRating = Number.parseFloat(
    (totalRating / products[productIndex].reviews.length).toFixed(1),
  )

  // Revalidate the path to show the updated reviews
  revalidatePath(`/products/${productId}`)

  return { success: true, message: "Review submitted successfully!" }
}
