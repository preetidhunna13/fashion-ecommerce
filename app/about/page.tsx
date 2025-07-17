"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Calendar, MapPin, Award, Heart } from "lucide-react"

const timelineEvents = [
  {
    year: "2020",
    title: "The Vision",
    description:
      "Rhea Chakraborty conceptualized Chapter 2 with a revolutionary vision to merge luxury fashion with sustainable practices.",
    icon: Heart,
  },
  {
    year: "2021",
    title: "First Collection",
    description:
      "Launched our debut collection 'Ethereal Beginnings' featuring 25 timeless pieces crafted from 100% sustainable materials.",
    icon: Award,
  },
  {
    year: "2022",
    title: "Artisan Network",
    description:
      "Established partnerships with 50+ local artisans across India, preserving traditional craftsmanship while providing fair wages.",
    icon: MapPin,
  },
  {
    year: "2023",
    title: "Global Recognition",
    description:
      "Received the 'Sustainable Fashion Pioneer Award' and expanded to international markets with zero-waste packaging.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Chapter 2.0",
    description:
      "Launched our digital transformation with AR try-ons, blockchain authenticity, and carbon-neutral shipping worldwide.",
    icon: Calendar,
  },
]

const teamMembers = [
  {
    name: "Rhea Chakraborty",
    role: "Founder & Creative Director",
    bio: "Visionary leader with a passion for sustainable luxury and conscious living.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Sustainability",
    bio: "Environmental advocate ensuring every piece meets our zero-impact standards.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Priya Sharma",
    role: "Lead Designer",
    bio: "Creative genius behind our timeless designs and innovative patterns.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16 overflow-x-hidden">
      {" "}
      {/* Adjusted padding */}
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
              <span className="text-sm font-medium">Our Journey</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              About Chapter 2
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A story of passion, purpose, and the relentless pursuit of sustainable luxury that honors both tradition
              and innovation
            </p>
          </MotionWrapper>
        </div>
      </section>
      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <MotionWrapper className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Timeline
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every milestone in our journey represents a step toward a more sustainable and beautiful future
            </p>
          </MotionWrapper>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-secondary opacity-30"></div>

            {timelineEvents.map((event, index) => (
              <MotionWrapper
                key={event.year}
                delay={index * 0.2}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className="flex-1 px-8">
                  <motion.div
                    className={`bg-card/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-primary/10 ${
                      index % 2 === 0 ? "text-right" : "text-left"
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className="p-3 bg-primary/10 rounded-full text-primary"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <event.icon className="h-6 w-6" />
                      </motion.div>
                      <div className="text-3xl font-bold text-primary">{event.year}</div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <motion.div
                  className="w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10"
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />

                <div className="flex-1"></div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto">
          <MotionWrapper className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Chapter 2's vision of sustainable luxury
            </p>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <MotionWrapper
                key={member.name}
                delay={index * 0.2}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="group text-center"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative mb-6 mx-auto w-64 h-64 overflow-hidden rounded-2xl">
                    <motion.div
                      className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-6xl font-bold text-primary/50">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </motion.div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    >
                      <p className="text-white text-center px-4 text-sm leading-relaxed">{member.bio}</p>
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground font-medium">{member.role}</p>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
