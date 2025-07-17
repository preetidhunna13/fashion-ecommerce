"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"

interface SearchInputProps {
  onClose: () => void
}

export function SearchInput({ onClose }: SearchInputProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<typeof products>([])
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 1) {
        const filtered = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )
        setSuggestions(filtered)
      } else {
        setSuggestions([])
      }
    }, 300) // Debounce search input

    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
        if (query.length === 0) {
          onClose() // Close search if clicked outside and query is empty
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [query, onClose])

  const handleClear = () => {
    setQuery("")
    setSuggestions([])
    setIsFocused(false)
    onClose()
  }

  return (
    <motion.div
      ref={searchRef}
      className="relative w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for products..."
          className="w-full pl-10 pr-10 py-2 rounded-full border border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          aria-label="Search products"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            className="absolute top-full left-0 w-full bg-card border border-border rounded-lg shadow-lg mt-2 max-h-80 overflow-y-auto z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            layout
          >
            {suggestions.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onClick={onClose}
                className="flex items-center gap-3 p-3 hover:bg-muted transition-colors duration-200 border-b border-border/50 last:border-b-0"
              >
                <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <span className="ml-auto font-semibold text-primary">{product.price}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
