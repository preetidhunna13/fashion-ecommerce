"use client"

import type React from "react" // Import React for TouchEvent type
import { useState, useRef } from "react" // Import useRef
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Filter, Grid, List, Star, Heart, Eye, ArrowLeft } from "lucide-react" // Import ArrowLeft
import Link from "next/link"
import { MotionWrapper } from "@/components/motion-wrapper"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { products } from "@/lib/data"
import { useRouter } from "next/navigation" // Import useRouter

const categories = [
  "All",
  "T-shirts",
  "Shirts",
  "Co-ords",
  "Hoodies",
  "Bottoms",
  "Vests",
  "Caps",
  "Jackets",
  "Accessories",
]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Rating"]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const router = useRouter() // Initialize useRouter

  // For swipe gesture
  const touchStartX = useRef(0)
  const SWIPE_THRESHOLD = 80 // pixels

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

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
      className="min-h-screen pt-16 overflow-x-hidden relative" // Added relative for fixed positioning
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
              <span className="text-sm font-medium">Premium Collection</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Our Collection
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover timeless pieces crafted with love, sustainability, and uncompromising attention to detail
            </p>
          </MotionWrapper>
        </div>
      </section>
      {/* Filters and Controls */}
      <section className="py-8 px-4 border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              {categories.map((category) => (
                <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full transition-all duration-300"
                    size="sm"
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 p-1 bg-muted rounded-full">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-full h-8 w-8"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-full h-8 w-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-8 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
              layout
            >
              {filteredProducts.map((product, index) => (
                <MotionWrapper
                  key={product.id}
                  delay={index * 0.1}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Card
                    className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl border-0 bg-card/50 backdrop-blur-sm overflow-hidden ${
                      viewMode === "list" ? "flex flex-row" : ""
                    }`}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3" : "aspect-[4/5]"}`}
                    >
                      <motion.img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <motion.span
                            className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            New
                          </motion.span>
                        )}
                        {product.originalPrice && (
                          <motion.span
                            className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            Sale
                          </motion.span>
                        )}
                      </div>

                      {/* Hover Overlay */}
                      <AnimatePresence>
                        {hoveredProduct === product.id && (
                          <motion.div
                            className="absolute inset-0 bg-black/40 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center space-x-4">
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                              >
                                <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </motion.div>
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                              >
                                <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>

                    {/* Product Info */}
                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-primary font-medium">{product.category}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span className="text-xs text-muted-foreground">{product.averageRating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews.length})</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                        {product.name}
                      </h3>

                      {/* Color Options */}
                      <div className="flex items-center gap-2 mb-4">
                        {product.colors.map((color: any, colorIndex: React.Key | null | undefined) => (
                          <motion.button
                            key={colorIndex}
                            className={`w-6 h-6 rounded-full border-2 border-gray-300 hover:border-primary`}
                            style={{ backgroundColor: color }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <p className="text-xl font-bold text-primary">{product.price}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">{product.originalPrice}</p>
                        )}
                      </div>

                      {viewMode === "list" && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Sizes:</span>
                          {product.sizes.map((size) => (
                            <span key={size} className="px-2 py-1 bg-muted text-xs rounded">
                              {size}
                            </span>
                          ))}
                        </div>
                      )}
                      <AddToCartButton
                        product={product}
                        selectedColor={product.colors[0]} // Default to first color
                        selectedSize={product.sizes[0]} // Default to first size
                        className="w-full"
                      />
                    </div>
                  </Card>
                </MotionWrapper>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
