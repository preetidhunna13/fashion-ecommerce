"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/contexts/wishlist-context"
import type { Product } from "@/lib/data"

interface AddToWishlistButtonProps {
  product: Product
  className?: string
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive" | "link"
  size?: "sm" | "default" | "lg" | "icon"
}

export function AddToWishlistButton({
  product,
  className = "",
  variant = "ghost",
  size = "icon",
}: AddToWishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist, openWishlist } = useWishlist()
  const isProductInWishlist = isInWishlist(product.id)

  const handleToggleWishlist = () => {
    if (isProductInWishlist) {
      removeFromWishlist(product.id)
    } else {
      // Only add necessary fields for WishlistItem
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        selectedColor: product.selectedColor,
        selectedSize: product.selectedSize,
      }
      addToWishlist(wishlistItem)
      openWishlist() // Open wishlist sidebar after adding
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button
        variant={variant}
        size={size}
        className={`${className} ${isProductInWishlist ? "text-primary hover:text-primary/80" : "text-muted-foreground hover:text-primary"} transition-colors duration-200`}
        onClick={handleToggleWishlist}
        aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <motion.div
          key={isProductInWishlist ? "filled" : "outline"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Heart className={`h-4 w-4 ${isProductInWishlist ? "fill-primary" : ""}`} />
        </motion.div>
      </Button>
    </motion.div>
  )
}
