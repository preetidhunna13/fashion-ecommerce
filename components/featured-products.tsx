"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MotionWrapper } from "./motion-wrapper"
import { AddToCartButton } from "./add-to-cart-button"
import { AddToWishlistButton } from "./add-to-wishlist-button"
import { products } from "@/lib/data"
import { useUserPreferences } from "@/contexts/user-preferences-context" // Import useUserPreferences

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState<{ [key: number]: string }>({})
  const { state: userPreferences } = useUserPreferences()

  const displayedProducts = useMemo(() => {
    const preferredCategory = userPreferences.preferredCategory
    if (!preferredCategory || preferredCategory === "All") {
      return products // Return all products if no preference or "All"
    }

    const preferredItems = products.filter((p) => p.category === preferredCategory)
    const otherItems = products.filter((p) => p.category !== preferredCategory)

    // Prioritize preferred items, then fill with others
    const combined = [...preferredItems, ...otherItems]

    // Ensure uniqueness if an item could somehow be in both lists (though not with this filter logic)
    const uniqueProducts = Array.from(new Set(combined.map((p) => p.id)))
      .map((id) => combined.find((p) => p.id === id))
      .filter(Boolean) as typeof products

    // Limit to a reasonable number for featured section, e.g., 8 products
    return uniqueProducts.slice(0, 8)
  }, [userPreferences.preferredCategory])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <MotionWrapper className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Featured Collection</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Curated for You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {userPreferences.preferredCategory && userPreferences.preferredCategory !== "All"
              ? `Discover our handpicked selection of ${userPreferences.preferredCategory.toLowerCase()} that embody elegance, sustainability, and exceptional craftsmanship`
              : "Discover our handpicked selection of timeless pieces that embody elegance, sustainability, and exceptional craftsmanship"}
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product, index) => (
            <MotionWrapper
              key={product.id}
              delay={index * 0.1}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card
                className="group cursor-pointer transition-all duration-500 hover:shadow-2xl border-0 bg-card/50 backdrop-blur-sm overflow-hidden"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <CardContent className="p-0 relative">
                  {/* Product Image */}
                  <Link href={`/products/${product.id}`} className="relative aspect-[4/5] overflow-hidden block">
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

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
                              <AddToWishlistButton
                                product={product}
                                variant="secondary"
                                size="icon"
                                className="rounded-full shadow-lg"
                              />
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
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-primary font-medium">{product.category}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-xs text-muted-foreground ml-1">({product.reviews.length} reviews)</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Color Options */}
                    <div className="flex items-center gap-2 mb-4">
                      {product.colors.map((color, colorIndex) => (
                        <motion.button
                          key={colorIndex}
                          className={`w-6 h-6 rounded-full border-2 ${
                            selectedColor[product.id] === color || (!selectedColor[product.id] && colorIndex === 0)
                              ? "border-primary"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor({ ...selectedColor, [product.id]: color })}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <p className="text-xl font-bold text-primary">{product.price}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">{product.originalPrice}</p>
                      )}
                    </div>

                    <AddToCartButton
                      product={product}
                      selectedColor={selectedColor[product.id] || product.colors[0]}
                      selectedSize={product.sizes[0]}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>

        <MotionWrapper className="text-center mt-16" delay={0.5}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent text-lg font-medium transition-all duration-300"
              >
                View All Products
              </Button>
            </Link>
          </motion.div>
        </MotionWrapper>
      </div>
    </section>
  )
}
