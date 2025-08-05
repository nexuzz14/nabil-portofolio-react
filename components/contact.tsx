"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, CheckCircle, AlertCircle, Instagram } from "lucide-react"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mnabilcf14@gmail.com",
      href: "mailto:mnabilcf14@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+62 85803067018",
      href: "tel:+6285803067018",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Magelang, IND",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/mnabilcf",
      color: "hover:text-blue-600",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/nexuzz14",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      icon: Instagram,
      label: "Twitter",
      href: "https://instagram.com/ptrcsnn",
      color: "hover:text-blue-400",
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about
              technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div
              className={`space-y-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href !== "#" ? (
                          <a href={item.href} className="font-medium hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-muted rounded-lg transition-all duration-300 hover:scale-110 ${social.color}`}
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Follow me on social media for updates on my latest projects and tech insights.
                  </p>
                </CardContent>
              </Card>

              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold mb-2">Currently Available</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  I'm actively seeking new opportunities and interesting projects to work on.
                </p>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  Open to Work
                </Badge>
              </div>
            </div>

            {/* Contact Form */}
            <Card
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <CardHeader>
                <CardTitle>Send Me a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      Failed to send message. Please try again.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
