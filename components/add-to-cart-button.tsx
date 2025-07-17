"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import type { CartItem } from "@/contexts/cart-context"

interface AddToCartButtonProps {
  product: Omit<CartItem, "quantity">
  selectedColor?: string
  selectedSize?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  showIcon?: boolean
}

export function AddToCartButton({
  product,
  selectedColor,
  selectedSize,
  className = "",
  variant = "default",
  size = "default",
  showIcon = true,
}: AddToCartButtonProps) {
  const { addToCart, openCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedColor: selectedColor || product.selectedColor,
      selectedSize: selectedSize || product.selectedSize,
    }

    addToCart(cartItem)
    setIsAdded(true)

    // Reset the button state after animation
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)

    // Open cart after a short delay
    setTimeout(() => {
      openCart()
    }, 500)
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={handleAddToCart}
        variant={variant}
        size={size}
        className={`relative overflow-hidden ${className}`}
        disabled={isAdded}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={isAdded ? { x: -30, opacity: 0 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {showIcon && <ShoppingCart className="h-4 w-4" />}
          <span>Add to Cart</span>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={isAdded ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 text-green-600">
            <Check className="h-4 w-4" />
            <span>Added!</span>
          </div>
        </motion.div>
      </Button>
    </motion.div>
  )
}
