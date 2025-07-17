"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { toast } from "sonner"
import type { Product } from "@/lib/data"

export interface WishlistItem extends Omit<Product, "reviews" | "sizes" | "description" | "images"> {
  // Wishlist items are essentially products without quantity, reviews, sizes, description, or images
  // We'll keep the core product info for display
}

interface WishlistState {
  items: WishlistItem[]
  isOpen: boolean
  itemCount: number
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_WISHLIST" }
  | { type: "TOGGLE_WISHLIST" }
  | { type: "OPEN_WISHLIST" }
  | { type: "CLOSE_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] }

const calculateItemCount = (items: WishlistItem[]): number => {
  return items.length
}

const WishlistContext = createContext<{
  state: WishlistState
  dispatch: React.Dispatch<WishlistAction>
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  clearWishlist: () => void
  toggleWishlist: () => void
  openWishlist: () => void
  closeWishlist: () => void
  isInWishlist: (id: number) => boolean
} | null>(null)

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state // Item already in wishlist
      }
      const newItems = [...state.items, action.payload]
      return {
        ...state,
        items: newItems,
        itemCount: calculateItemCount(newItems),
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        itemCount: calculateItemCount(newItems),
      }
    }

    case "CLEAR_WISHLIST":
      return {
        ...state,
        items: [],
        itemCount: 0,
      }

    case "TOGGLE_WISHLIST":
      return {
        ...state,
        isOpen: !state.isOpen,
      }

    case "OPEN_WISHLIST":
      return {
        ...state,
        isOpen: true,
      }

    case "CLOSE_WISHLIST":
      return {
        ...state,
        isOpen: false,
      }

    case "LOAD_WISHLIST": {
      return {
        ...state,
        items: action.payload,
        itemCount: calculateItemCount(action.payload),
      }
    }

    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    isOpen: false,
    itemCount: 0,
  })

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("chapter2-wishlist")
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        dispatch({ type: "LOAD_WISHLIST", payload: parsedWishlist })
      } catch (error) {
        console.error("Error loading wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chapter2-wishlist", JSON.stringify(state.items))
  }, [state.items])

  const addToWishlist = (item: WishlistItem) => {
    const isAlreadyInWishlist = state.items.some((wishItem) => wishItem.id === item.id)
    if (!isAlreadyInWishlist) {
      dispatch({ type: "ADD_ITEM", payload: item })
      toast.success(`${item.name} added to wishlist!`)
    } else {
      toast.info(`${item.name} is already in your wishlist.`)
    }
  }

  const removeFromWishlist = (id: number) => {
    const item = state.items.find((item) => item.id === id)
    dispatch({ type: "REMOVE_ITEM", payload: id })
    if (item) {
      toast.success(`${item.name} removed from wishlist.`)
    }
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
    toast.success("Wishlist cleared.")
  }

  const toggleWishlist = () => {
    dispatch({ type: "TOGGLE_WISHLIST" })
  }

  const openWishlist = () => {
    dispatch({ type: "OPEN_WISHLIST" })
  }

  const closeWishlist = () => {
    dispatch({ type: "CLOSE_WISHLIST" })
  }

  const isInWishlist = (id: number): boolean => {
    return state.items.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        state,
        dispatch,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        toggleWishlist,
        openWishlist,
        closeWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
