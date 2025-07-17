"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real application, you would send this data to your backend
    console.log("Contact form submitted:", formData)

    toast.success("Message sent successfully!", {
      description: "We'll get back to you shortly.",
    })
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen pt-16 overflow-x-hidden">
      {" "}
      {/* Adjusted padding */}
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/30 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <MotionWrapper initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Mail className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you! Reach out to us for any inquiries, collaborations, or feedback.
            </p>
          </MotionWrapper>
        </div>
      </section>
      {/* Contact Details & Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <MotionWrapper
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Our Details</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Feel free to contact us through any of the following channels. Our team is available to assist you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-foreground">Email Us</h3>
                    <p className="text-muted-foreground">For general inquiries, support, or collaborations.</p>
                    <a href="mailto:info@chapter2.com" className="text-primary hover:underline font-medium">
                      info@chapter2.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-foreground">Call Us</h3>
                    <p className="text-muted-foreground">
                      Reach out to our customer service team during business hours.
                    </p>
                    <a href="tel:+919876543210" className="text-primary hover:underline font-medium">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-xl text-foreground">Visit Us</h3>
                    <p className="text-muted-foreground">Our flagship store and design studio.</p>
                    <address className="not-italic text-primary font-medium">
                      Chapter 2 Headquarters, <br />
                      101, Fashion Avenue, Bandra West, <br />
                      Mumbai, Maharashtra, India - 400050
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Contact Form */}
          <MotionWrapper
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="bg-card p-8 rounded-lg shadow-lg border border-border/50">
              <h2 className="text-3xl font-bold mb-6 text-foreground text-center">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Inquiry about an order"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="focus:ring-primary focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </MotionWrapper>
        </div>
      </section>
      {/* Map Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <MotionWrapper className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Find Us on the Map
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visit our physical location to experience Chapter 2 firsthand.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-xl border border-border/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9999999999995!2d72.8345678148567!3d19.07609098709999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c63066535b1b%3A0x7e3f6e3f6e3f6e3f!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chapter 2 Location on Map"
              ></iframe>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </main>
  )
}
