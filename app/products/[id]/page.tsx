"use client"

import type { FC } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Star, Heart, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MotionWrapper } from "@/components/motion-wrapper"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { products } from "@/lib/data"
import { Navigation } from "@/components/navigation"

const ProductPage: FC = () => {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }
  const product = products.find((p) => p.id.toString() === id)

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-16 overflow-x-hidden relative bg-gradient-to-br from-muted/30 via-background to-secondary/10">
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

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/30 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <MotionWrapper>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">Product Details</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {product.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover more about this product, crafted with love, sustainability, and uncompromising attention to detail.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <MotionWrapper>
            <motion.img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full rounded-2xl shadow-lg object-cover aspect-[4/5]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </MotionWrapper>

          {/* Product Details Card */}
          <MotionWrapper>
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">New</span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">Sale</span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-base text-muted-foreground">{product.averageRating.toFixed(1)}</span>
                <span className="text-base text-muted-foreground">({product.reviews.length} reviews)</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                )}
              </div>
              {/* Color Options */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Colors:</span>
                {product.colors.map((color: string, idx: number) => (
                  <span
                    key={idx}
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {/* Size Options */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Sizes:</span>
                {product.sizes.map((size: string) => (
                  <span key={size} className="px-2 py-1 bg-muted text-xs rounded">
                    {size}
                  </span>
                ))}
              </div>
              <AddToCartButton
                product={product}
                selectedColor={product.colors[0]}
                selectedSize={product.sizes[0]}
                className="w-full mb-4"
              />
              <div className="flex gap-2">
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </MotionWrapper>
        </div>
      </section>
    </main>
  )
}

export default ProductPage
