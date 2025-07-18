"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useParams, notFound, useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ShoppingBag, Star, Eye } from "lucide-react"
import { MotionWrapper } from "@/components/motion-wrapper"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { AddToWishlistButton } from "@/components/add-to-wishlist-button"
import { products, looks } from "@/lib/data"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"

export default function ShopLookPage() {
  const params = useParams()
  const lookId = Number(params.id)
  const look = looks.find((l) => l.id === lookId)
  const router = useRouter()
  const { addToCart, openCart } = useCart()

  const [selectedColor, setSelectedColor] = useState<{ [key: number]: string }>({})
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null) // For related products hover

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

  const lookProducts = look.productIds
    .map((productId) => products.find((p) => p.id === productId))
    .filter(Boolean) as typeof products

  const randomLookPrice = "₹19,999" // Random amount for the entire look

  const handleAddToCartAll = () => {
    if (lookProducts.length === 0) {
      toast.info("This look has no products to add to cart.")
      return
    }

    lookProducts.forEach((product) => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        selectedColor: selectedColor[product.id] || product.colors[0],
        selectedSize: product.sizes[0],
      })
    })
    toast.success(`All items from "${look.name}" added to cart!`)
    openCart()
  }

  const handleBuyNow = () => {
    if (lookProducts.length === 0) {
      toast.info("This look has no products to buy.")
      return
    }
    // In a real application, this would initiate a quick checkout flow
    toast.info("Proceeding to checkout with this look!", {
      description: "This is a placeholder for the buy now functionality.",
    })
    // You might redirect to a checkout page or open a checkout modal
    // router.push('/checkout');
  }

  // Filter other looks for "You Might Also Like" section
  const otherLooks = looks.filter((l) => l.id !== lookId).slice(0, 3) // Show up to 3 other looks

  // Aggregate all unique sizes from products in this look
  const allLookSizes = Array.from(new Set(lookProducts.flatMap((product) => product.sizes))).sort((a, b) => {
    // Custom sort for common sizes (XS, S, M, L, XL)
    const sizeOrder = ["XS", "S", "M", "L", "XL"]
    const indexA = sizeOrder.indexOf(a)
    const indexB = sizeOrder.indexOf(b)

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    return a.localeCompare(b)
  })

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
            {/* Main Look Image */}
            <MotionWrapper
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-lg bg-muted flex items-center justify-center">
                <Image src={look.image || "/placeholder.svg"} alt={look.name} fill className="object-cover" priority />
              </div>
            </MotionWrapper>

            {/* Look Overview & Add All to Cart */}
            <MotionWrapper
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">{look.name}</h1>
                <p className="text-muted-foreground leading-relaxed">{look.description}</p>

                <div className="flex items-baseline gap-3">
                  <p className="text-2xl font-semibold text-foreground">Price: {randomLookPrice}</p>
                </div>

                {allLookSizes.length > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span className="font-semibold">Available Sizes:</span>
                    <p className="text-base font-medium">{allLookSizes.join(", ")}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button
                    onClick={handleAddToCartAll}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 text-base font-semibold"
                    size="lg"
                    disabled={lookProducts.length === 0}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 text-base font-semibold bg-transparent transition-all duration-300"
                    size="lg"
                    variant="outline"
                    disabled={lookProducts.length === 0}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Individual Products in Look */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <MotionWrapper className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Items in This Look
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the individual pieces that make up this curated style.
            </p>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lookProducts.length > 0 ? (
              lookProducts.map((product, index) => (
                <MotionWrapper
                  key={product.id}
                  delay={index * 0.1}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Card className="group cursor-pointer transition-all duration-500 hover:shadow-2xl border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-0 relative">
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
                            <span className="text-xs text-muted-foreground ml-1">
                              ({product.reviews.length} reviews)
                            </span>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                          {product.name}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{product.description}</p>

                        {/* Color Options */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2">
                              Color: {selectedColor[product.id] || product.colors[0]}
                            </h4>
                            <div className="flex gap-2">
                              {product.colors.map((color, colorIndex) => (
                                <motion.button
                                  key={colorIndex}
                                  className={`w-6 h-6 rounded-full border-2 ${
                                    selectedColor[product.id] === color ||
                                    (!selectedColor[product.id] && colorIndex === 0)
                                      ? "border-primary ring-2 ring-primary/50"
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
                          </div>
                        )}

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2">Sizes:</h4>
                            <p className="text-muted-foreground text-xs">{product.sizes.join(", ")}</p>
                          </div>
                        )}

                        <div className="flex items-center gap-2 mb-4">
                          <p className="text-xl font-bold text-primary">{product.price}</p>
                          {product.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">{product.originalPrice}</p>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          For detailed fabric and wash care instructions, please visit the{" "}
                          <Link href={`/products/${product.id}`} className="text-primary hover:underline">
                            individual product page
                          </Link>
                          .
                        </p>

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
              ))
            ) : (
              <p className="text-muted-foreground text-center col-span-full">No products found for this look.</p>
            )}
          </div>
        </div>
      </section>

      {/* You Might Also Like (Other Looks) */}
      {otherLooks.length > 0 && (
        <section className="py-20 px-4 bg-muted/20">
          <div className="container mx-auto">
            <MotionWrapper className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                You Might Also Like
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore other curated looks that complement your style.
              </p>
            </MotionWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {otherLooks.map((otherLook, index) => (
                <MotionWrapper
                  key={otherLook.id}
                  delay={index * 0.1}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Link href={`/lookbook/${otherLook.id}/shop`}>
                    <motion.div
                      className="group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={otherLook.image || "/placeholder.svg"}
                          alt={otherLook.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button variant="secondary" size="lg" className="rounded-full">
                            View Look
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                          {otherLook.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{otherLook.description}</p>
                      </div>
                    </motion.div>
                  </Link>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
