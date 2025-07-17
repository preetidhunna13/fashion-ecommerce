import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { AuthProvider } from "@/contexts/auth-context"
import { UserPreferencesProvider } from "@/contexts/user-preferences-context" // Import UserPreferencesProvider
import { CartSidebar } from "@/components/cart-sidebar"
import { WishlistSidebar } from "@/components/wishlist-sidebar"
import { Toaster } from "sonner"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Chapter 2 - Rhea Chakraborty | Luxury Fashion & Lifestyle",
  description:
    "Discover timeless elegance with Chapter 2 by Rhea Chakraborty. Luxury fashion, sustainable practices, and conscious living redefined.",
  keywords: "Chapter 2, Rhea Chakraborty, luxury fashion, sustainable fashion, lifestyle brand, elegant clothing",
  authors: [{ name: "Rhea Chakraborty" }],
  openGraph: {
    title: "Chapter 2 - Rhea Chakraborty",
    description: "Luxury fashion and lifestyle brand by Rhea Chakraborty",
    type: "website",
  },
  robots: "index, follow",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B7355" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <UserPreferencesProvider>
                  {" "}
                  {/* Wrap with UserPreferencesProvider */}
                  {children}
                  <CartSidebar />
                  <WishlistSidebar />
                  <Toaster position="top-right" richColors />
                </UserPreferencesProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
