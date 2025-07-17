"use client"

import React from "react"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
}

interface AuthContextType {
  state: AuthState
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const AUTH_STORAGE_KEY = "chapter2-auth-user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY)
      if (savedUser) {
        const user: User = JSON.parse(savedUser)
        setCurrentUser(user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error)
      localStorage.removeItem(AUTH_STORAGE_KEY) // Clear corrupted data
    }
  }, [])

  // Save user to localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [currentUser])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call for login
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, you'd verify credentials against a backend
        // For this demo, we'll just "log in" if email and password are not empty
        if (email && password) {
          const user: User = { id: "user-123", name: "Demo User", email } // Mock user data
          setCurrentUser(user)
          setIsAuthenticated(true)
          toast.success("Logged in successfully!")
          resolve(true)
        } else {
          toast.error("Login failed. Please check your credentials.")
          resolve(false)
        }
      }, 1000)
    })
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call for signup
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, you'd create a new user in your backend
        // For this demo, we'll just "sign up" if fields are not empty
        if (name && email && password) {
          const user: User = { id: `user-${Date.now()}`, name, email } // Mock user data
          setCurrentUser(user)
          setIsAuthenticated(true)
          toast.success("Account created successfully!")
          resolve(true)
        } else {
          toast.error("Signup failed. Please fill in all fields.")
          resolve(false)
        }
      }, 1000)
    })
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    toast.info("Logged out.")
  }, [])

  const authContextValue = React.useMemo(
    () => ({
      state: { currentUser, isAuthenticated },
      login,
      signup,
      logout,
    }),
    [currentUser, isAuthenticated, login, signup, logout],
  )

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
