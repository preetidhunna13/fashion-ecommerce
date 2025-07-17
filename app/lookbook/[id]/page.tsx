"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useParams, notFound, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { MotionWrapper } from "@/components/motion-wrapper"
import { products, looks } from "@/lib/data"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import Link from "next/link"
// Removed import for LookDetailsDialog

export default function DetailedLookPage() {
  const params = useParams()
  const lookId = Number(params.id)
  const look = looks.find((l) => l.id === lookId)
  const router = useRouter()
  const { addToCart, openCart } = useCart()

  // For swipe gesture
  const touchStartX = useRef(0)
  const SWIPE_THRESHOLD = 80 // pixels

  useEffect(() => {
    if (!look) {
      notFound()
    }
  }, [look])

  if (!look) {
    return null // notFound() handles the redirect
  }

  const lookProducts = look.productIds.map((productId) => products.find((p) => p.id === productId)).filter(Boolean) // Filter out any undefined products

  const handleAddToCartAll = () => {
    if (lookProducts.length === 0) {
      toast.info("This look has no products to add to cart.")
      return
    }

    lookProducts.forEach((product) => {
      if (product) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          selectedColor: product.colors[0], // Default to first color
          selectedSize: product.sizes[0], // Default to first size
        })
      }
    })
    toast.success(`All items from "${look.name}" added to cart!`)
    openCart()
  }

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const distance = touchEndX - touchStartX.current

    if (distance > SWIPE_THRESHOLD) {
      router.back()
    }
  }

  return (
    <main
      className="min-h-screen pt-16 overflow-x-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Navigation />

      {/* Edge-of-Screen Back Indicator (Desktop) */}
      <motion.div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex items-center justify-center h-16 w-16 cursor-pointer group"
        initial={{ x: -60, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => router.back()}
        aria-label="Go back to previous page"
      >
        <div className="absolute inset-0 bg-primary/10 rounded-r-full group-hover:bg-primary/20 transition-colors duration-200" />
        <ArrowLeft className="h-6 w-6 text-primary relative z-10" />
      </motion.div>

      <section className="py-20 px-4 bg-gradient-to-br from-muted/30 via-background to-secondary/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Look Media Display */}
            <MotionWrapper
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-lg bg-muted flex items-center justify-center">
                {look.video ? (
                  <video
                    src={look.video}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={`Video for ${look.name} look`}
                  />
                ) : (
                  <Image
                    src={look.image || "/placeholder.svg"}
                    alt={look.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </MotionWrapper>

            {/* Look Details */}
            <MotionWrapper
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">{look.name}</h1>
                <p className="text-muted-foreground leading-relaxed">{look.description}</p>

                {/* Main Look Image (now a Link to the new shop page) */}
                <Link
                  href={`/lookbook/${look.id}/shop`}
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-md bg-muted flex items-center justify-center cursor-pointer group"
                  aria-label={`View details for ${look.name} look`}
                >
                  <Image
                    src={look.image || "/placeholder.svg"}
                    alt={`${look.name} main image`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">Shop This Look</span>
                  </div>
                </Link>

                <h2 className="text-2xl font-bold text-foreground mt-6">Items in this Look:</h2>
                <div className="space-y-4">
                  {lookProducts.length > 0 ? (
                    lookProducts.map((product) => (
                      <Card key={product?.id} className="flex items-center gap-4 p-4 shadow-sm border-border/50">
                        <Link href={`/products/${product?.id}`}>
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={product?.image || "/placeholder.svg"}
                              alt={product?.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>
                        <div className="flex-1">
                          <Link href={`/products/${product?.id}`}>
                            <h4 className="font-semibold text-foreground hover:text-primary transition-colors">
                              {product?.name}
                            </h4>
                          </Link>
                          <p className="text-sm text-muted-foreground">{product?.category}</p>
                          <p className="font-bold text-primary">{product?.price}</p>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No products found for this look.</p>
                  )}
                </div>

                <Button
                  onClick={handleAddToCartAll}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium mt-6"
                  size="lg"
                  disabled={lookProducts.length === 0}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add All to Cart
                </Button>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>
    </main>
  )
}
