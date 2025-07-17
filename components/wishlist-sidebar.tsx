"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"

export function WishlistSidebar() {
  const { state, closeWishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (item: (typeof state.items)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: item.category,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
    })
    removeFromWishlist(item.id)
  }

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
          />

          {/* Wishlist Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary fill-primary" />
                <h2 className="text-xl font-semibold">My Wishlist</h2>
                <span className="bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full">
                  {state.itemCount}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={closeWishlist} className="hover:bg-muted">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">Save your favorite items here!</p>
                  <Button onClick={closeWishlist} className="bg-primary hover:bg-primary/90">
                    Start Browsing
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {state.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="flex gap-4 p-4 bg-card rounded-lg border border-border"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        {/* Product Image */}
                        <Link href={`/products/${item.id}`} onClick={closeWishlist}>
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.id}`} onClick={closeWishlist}>
                            <h4 className="font-semibold text-sm truncate hover:text-primary transition-colors">
                              {item.name}
                            </h4>
                          </Link>
                          <p className="text-xs text-muted-foreground mb-2">{item.category}</p>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-primary">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">{item.originalPrice}</span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 bg-transparent"
                              onClick={() => handleMoveToCart(item)}
                            >
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Move to Cart
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Clear Wishlist Button */}
                  {state.items.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearWishlist}
                        className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Wishlist
                      </Button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <motion.div
                className="border-t border-border p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={closeWishlist}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
