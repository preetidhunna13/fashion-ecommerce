"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Instagram, Twitter, Linkedin, Facebook, Mail } from "lucide-react"
import Link from "next/link"
import { MotionWrapper } from "./motion-wrapper"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter your email address.")
      return
    }

    startTransition(async () => {
      // Simulate API call for newsletter signup
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success("Thank you for subscribing!", {
        description: "You'll receive updates and exclusive offers from Chapter 2.",
      })
      setEmail("")
    })
  }

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/rheachakraborty" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/rhea_chakraborty" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/chapter2" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/rheachakraborty" },
  ]

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "Dresses", href: "/products?category=Dresses" },
        { name: "Blazers", href: "/products?category=Blazers" },
        { name: "Accessories", href: "/products?category=Accessories" },
        { name: "New Arrivals", href: "/products?isNew=true" },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Sustainability", href: "/about#sustainability" },
        { name: "Team", href: "/about#team" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faq" }, // Placeholder
        { name: "Shipping & Returns", href: "/shipping" }, // Placeholder
      ],
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-muted/50 via-background to-secondary/10 py-16 px-4 border-t border-border/50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Info & Newsletter */}
        <MotionWrapper delay={0.1}>
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-bold text-primary">
              Chapter 2
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Timeless elegance meets conscious living. Discover your next chapter.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Label htmlFor="newsletter-email" className="text-foreground">
                Join Our Newsletter
              </Label>
              <div className="flex gap-2">
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 focus:ring-primary focus:border-primary"
                  required
                />
                <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90">
                  {isPending ? "Joining..." : "Subscribe"}
                </Button>
              </div>
            </form>
          </div>
        </MotionWrapper>

        {/* Navigation Links */}
        {footerLinks.map((section, index) => (
          <MotionWrapper key={section.title} delay={0.2 + index * 0.1}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
        ))}

        {/* Social Media & Contact */}
        <MotionWrapper delay={0.5}>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" /> info@chapter2.com
              </p>
              <p className="text-muted-foreground flex items-center gap-2">
                {/* Using a placeholder for phone icon as it's not directly in lucide-react for general contact */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.86-4.04A16.5 16.5 0 0 1 3.07 6.18 2 2 0 0 1 5.08 4h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 12.22a14.6 14.6 0 0 0 7.31 7.31l1.44-1.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 98765 43210
              </p>
            </div>
          </div>
        </MotionWrapper>
      </div>

      <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Chapter 2. All rights reserved.</p>
        <p>Designed with passion for a sustainable future.</p>
      </div>
    </footer>
  )
}
