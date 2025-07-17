"use client"

import { Navigation } from "@/components/navigation"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { looks } from "@/lib/data" // Import the looks data
import { motion } from "framer-motion" // Import motion from framer-motion

export default function LookbookPage() {
  return (
    <main className="min-h-screen pt-16 overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/30 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <MotionWrapper initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Heart className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">Curated Styles</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Shop The Look
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover expertly curated outfits designed to inspire your next chapter in style.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Looks Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {looks.map((look, index) => (
              <MotionWrapper
                key={look.id}
                delay={index * 0.1}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Link href={`/lookbook/${look.id}`}>
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-0 relative">
                      <div className="relative aspect-[4/5] overflow-hidden bg-muted flex items-center justify-center">
                        {look.video ? (
                          <video
                            src={look.video}
                            className="w-full h-full object-cover" // Changed to object-cover
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-label={`Video for ${look.name} look`}
                          />
                        ) : (
                          <Image src={look.image || "/placeholder.svg"} alt={look.name} fill className="object-cover" />
                        )}
                        {/* Overlay for text/icon on hover, still useful for video to show "View Look" */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">View Look</span>
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                          {look.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{look.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
