import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { BrandStory } from "@/components/brand-story"
import { Footer } from "@/components/footer" // Import the new Footer component

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <BrandStory />
      <Footer /> {/* Add the Footer component here */}
    </main>
  )
}
