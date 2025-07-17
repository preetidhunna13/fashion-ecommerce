"use client"

import { useState, useEffect, useRef } from "react" // Import useRef
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, ShoppingBag, User, Sun, Moon, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { SearchInput } from "./search-input"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollingDown, setScrollingDown] = useState(false) // New state for scroll direction
  const prevScrollY = useRef(0) // Ref to store previous scroll position

  const { theme, setTheme } = useTheme()
  const { state: cartState, toggleCart } = useCart()
  const { state: wishlistState, toggleWishlist } = useWishlist()
  const { state: authState, logout } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrolled = currentScrollY > 50 // Still use this for glass effect

      setIsScrolled(scrolled)

      // Determine scroll direction
      if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
        // Scrolling down and past a threshold
        setScrollingDown(true)
      } else if (currentScrollY < prevScrollY.current || currentScrollY <= 50) {
        // Scrolling up or at the very top
        setScrollingDown(false)
      }
      prevScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Lookbook", href: "/lookbook" }, // Added Lookbook link
    { name: "Contact", href: "/contact" },
  ]

  const handleOpenSearch = () => {
    setIsSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
  }

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      } h-16 flex items-center`}
      initial={{ y: -100 }} // Initial state for animation
      animate={{ y: scrollingDown && isScrolled ? "-100%" : 0 }} // Dynamic animation based on scroll direction and if scrolled
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative group">
          <motion.div
            className="text-2xl md:text-3xl font-bold text-primary"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Chapter 2
            <motion.div
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
              layoutId="underline"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link
                href={item.href}
                className="relative text-sm text-foreground hover:text-primary transition-colors duration-300 font-medium group"
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                  layoutId={`nav-${item.name}`}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-primary/10 focus-ring"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 focus-ring"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            {authState.isAuthenticated ? (
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 focus-ring">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 focus-ring">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 focus-ring relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {cartState.itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
                  >
                    {cartState.itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="focus-ring">
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent className="glass">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.5 }}
                >
                  {authState.isAuthenticated ? (
                    <>
                      <Link
                        href="/profile"
                        className="text-lg font-medium hover:text-primary transition-colors duration-300 block mb-4"
                      >
                        Profile
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-lg font-medium hover:text-destructive bg-transparent"
                        onClick={logout}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="text-lg font-medium hover:text-primary transition-colors duration-300"
                    >
                      Login / Signup
                    </Link>
                  )}
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Search Input Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-background/90 backdrop-blur-md py-4 px-4 border-b border-border shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SearchInput onClose={() => setIsSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
