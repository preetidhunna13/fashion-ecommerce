"use client"

import React from "react"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { products } from "@/lib/data" // To get available categories

interface UserPreferencesState {
  preferredCategory: string | null
}

interface UserPreferencesContextType {
  state: UserPreferencesState
  setPreferredCategory: (category: string | null) => void
}

const UserPreferencesContext = createContext<UserPreferencesContextType | null>(null)

const PREFERENCES_STORAGE_KEY = "chapter2-user-preferences"

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferredCategory, setPreferredCategoryState] = useState<string | null>(null)

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY)
      if (savedPreferences) {
        const preferences: UserPreferencesState = JSON.parse(savedPreferences)
        setPreferredCategoryState(preferences.preferredCategory)
      }
    } catch (error) {
      console.error("Failed to load user preferences from localStorage:", error)
      localStorage.removeItem(PREFERENCES_STORAGE_KEY) // Clear corrupted data
    }
  }, [])

  // Save preferences to localStorage whenever preferredCategory changes
  useEffect(() => {
    const preferencesToSave: UserPreferencesState = { preferredCategory }
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferencesToSave))
  }, [preferredCategory])

  const setPreferredCategory = useCallback((category: string | null) => {
    setPreferredCategoryState(category)
    if (category) {
      toast.success(`Preferred category set to: ${category}`)
    } else {
      toast.info("Preferred category cleared.")
    }
  }, [])

  const contextValue = React.useMemo(
    () => ({
      state: { preferredCategory },
      setPreferredCategory,
    }),
    [preferredCategory, setPreferredCategory],
  )

  return <UserPreferencesContext.Provider value={contextValue}>{children}</UserPreferencesContext.Provider>
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext)
  if (!context) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider")
  }
  return context
}

// Helper to get all unique categories from products
export const getAllCategories = (): string[] => {
  const categories = new Set<string>()
  products.forEach((product) => categories.add(product.category))
  return ["All", ...Array.from(categories)].sort()
}
