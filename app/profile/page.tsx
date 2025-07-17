"use client"

import { Navigation } from "@/components/navigation"
import { MotionWrapper } from "@/components/motion-wrapper"
import { User, Mail, ShoppingBag, Heart, MapPin, CreditCard, LogOut, X, Settings } from "lucide-react" // Import Settings icon
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label" // Import Label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Import Select components
import { useAuth } from "@/contexts/auth-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useUserPreferences, getAllCategories } from "@/contexts/user-preferences-context" // Import useUserPreferences and getAllCategories
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { state: authState, logout } = useAuth()
  const { state: wishlistState, removeFromWishlist } = useWishlist()
  const { state: userPreferencesState, setPreferredCategory } = useUserPreferences() // Use user preferences context
  const router = useRouter()

  // Mock data for order history, addresses, and payment methods
  const mockOrders = [
    {
      id: "ORD001",
      date: "2024-07-10",
      total: "₹18,998",
      status: "Delivered",
      items: [
        { name: "Ethereal Silk Dress", qty: 1, image: "/placeholder.svg?height=100&width=100" },
        { name: "Minimalist Blazer", qty: 1, image: "/placeholder.svg?height=100&width=100" },
      ],
    },
    {
      id: "ORD002",
      date: "2024-06-25",
      total: "₹10,999",
      status: "Processing",
      items: [{ name: "Sustainable Jumpsuit", qty: 1, image: "/placeholder.svg?height=100&width=100" }],
    },
  ]

  const mockAddresses = [
    {
      id: 1,
      label: "Home",
      address: "123 Fashion St, Bandra, Mumbai, 400050",
    },
    {
      id: 2,
      label: "Work",
      address: "456 Studio Rd, Andheri, Mumbai, 400053",
    },
  ]

  const mockPaymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/26",
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "5678",
      expiry: "08/25",
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login") // Redirect to login page after logout
  }

  if (!authState.isAuthenticated || !authState.currentUser) {
    // Redirect to login if not authenticated (client-side check)
    router.push("/login")
    return null // Or a loading spinner
  }

  const availableCategories = getAllCategories()

  return (
    <main className="min-h-screen pt-16 overflow-x-hidden">
      <Navigation />
      <section className="py-20 px-4 bg-gradient-to-br from-muted/30 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <MotionWrapper initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <User className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">Your Account</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Welcome, {authState.currentUser.name}!
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Manage your personal information, orders, and preferences.
            </p>
          </MotionWrapper>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <MotionWrapper delay={0.2}>
            <Card className="shadow-lg border-border/50 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <User className="h-6 w-6 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <span>Email: {authState.currentUser.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-accent" />
                  <span>Name: {authState.currentUser.name}</span>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Edit Profile
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* User Preferences */}
          <MotionWrapper delay={0.3}>
            <Card className="shadow-lg border-border/50 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Settings className="h-6 w-6 text-primary" />
                  Your Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preferred-category">Preferred Product Category</Label>
                  <Select
                    value={userPreferencesState.preferredCategory || "All"}
                    onValueChange={(value) => setPreferredCategory(value === "All" ? null : value)}
                  >
                    <SelectTrigger id="preferred-category" className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    This will personalize your homepage's featured products.
                  </p>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Order History */}
          <MotionWrapper delay={0.4}>
            <Card className="shadow-lg border-border/50 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockOrders.length > 0 ? (
                  mockOrders.map((order) => (
                    <div key={order.id} className="border-b border-border/50 pb-4 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-foreground">Order #{order.id}</h4>
                        <span className="text-sm text-muted-foreground">{order.date}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-muted-foreground">Total: {order.total}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        View Details
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No orders found.</p>
                )}
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Wishlist */}
          <MotionWrapper delay={0.5}>
            <Card className="shadow-lg border-border/50 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Heart className="h-6 w-6 text-primary fill-primary" />
                  My Wishlist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {wishlistState.items.length > 0 ? (
                  wishlistState.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b border-border/50 pb-4 last:border-b-0"
                    >
                      <Link href={`/products/${item.id}`}>
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      </Link>
                      <div className="flex-1">
                        <Link href={`/products/${item.id}`}>
                          <h4 className="font-semibold text-foreground hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <p className="font-bold text-primary">{item.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">Your wishlist is empty.</p>
                )}
                <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/products")}>
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Saved Addresses */}
          <MotionWrapper delay={0.6}>
            <Card className="shadow-lg border-border/50 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <MapPin className="h-6 w-6 text-primary" />
                  Saved Addresses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAddresses.length > 0 ? (
                  mockAddresses.map((address) => (
                    <div key={address.id} className="border-b border-border/50 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-foreground">{address.label}</h4>
                      <p className="text-muted-foreground text-sm">{address.address}</p>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Edit
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No saved addresses.</p>
                )}
                <Button variant="outline" className="w-full bg-transparent">
                  Add New Address
                </Button>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Payment Methods */}
          <MotionWrapper delay={0.7}>
            <Card className="shadow-lg border-border/50 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CreditCard className="h-6 w-6 text-primary" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPaymentMethods.length > 0 ? (
                  mockPaymentMethods.map((method) => (
                    <div key={method.id} className="border-b border-border/50 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-foreground">
                        {method.type} ending in {method.last4}
                      </h4>
                      <p className="text-muted-foreground text-sm">Expires: {method.expiry}</p>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Edit
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No saved payment methods.</p>
                )}
                <Button variant="outline" className="w-full bg-transparent">
                  Add New Card
                </Button>
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>
      </section>
    </main>
  )
}
