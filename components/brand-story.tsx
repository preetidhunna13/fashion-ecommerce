"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { MotionWrapper } from "./motion-wrapper"
import { Leaf, Heart, Award, Users } from "lucide-react"

export function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers", color: "text-primary" },
    { icon: Leaf, value: "100%", label: "Sustainable Materials", color: "text-accent" },
    { icon: Award, value: "25+", label: "Design Awards", color: "text-secondary" },
    { icon: Heart, value: "1M+", label: "Lives Touched", color: "text-primary" },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-r from-muted/50 via-background to-secondary/10 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <MotionWrapper
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Heart className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">Our Story</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Crafting Tomorrow's Legacy
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Chapter 2 represents more than fashion—it's a movement toward conscious luxury. Born from the vision of
                creating timeless pieces that honor both craftsmanship and our planet.
              </p>
              <p>
                Every thread tells a story of sustainability, every design celebrates individuality, and every piece is
                crafted with the belief that true elegance comes from making choices that matter.
              </p>
              <p>
                Join us in writing a new chapter where style meets substance, where luxury embraces responsibility, and
                where your wardrobe becomes a reflection of your values.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((stat, index) => (
                <MotionWrapper
                  key={stat.label}
                  delay={index * 0.1}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center group"
                >
                  <motion.div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="h-6 w-6" />
                  </motion.div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </MotionWrapper>
              ))}
            </div>
          </MotionWrapper>

          {/* Visual Element */}
          <MotionWrapper
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <motion.div className="relative aspect-square" style={{ y }}>
              {/* Main Circle */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Inner Circle */}
              <motion.div
                className="absolute inset-8 bg-gradient-to-tl from-accent/30 to-primary/30 rounded-full flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="text-6xl font-bold text-primary/50">RC</div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute top-1/4 -left-8 w-12 h-12 bg-accent/20 rounded-full blur-lg"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
              />
            </motion.div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
