"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowRight, Instagram } from "lucide-react"

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -60% 0px" }
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/nexuzz14", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/mnabilcf", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/ptrcsnn", label: "Instagram" },
    { icon: Mail, href: "mailto:mnabilcf14@gmail.com", label: "Email" },
  ]

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[40%] lg:flex-col lg:justify-between lg:py-24 py-12 text-foreground z-20">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
        >
          Muhammad Nabil <br/> Cahya Firdaus
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 mb-6"
        >
          Full-Stack Developer
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground leading-relaxed max-w-xs sm:max-w-md lg:max-w-sm mb-12"
        >
          I build accessible, inclusive products and digital experiences for the web, specializing in React, Next.js, and Laravel.
        </motion.p>

        <nav className="hidden lg:block">
          <ul className="flex flex-col w-max space-y-4">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`group flex items-center py-2 transition-all duration-300 ${
                    activeSection === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span 
                    className={`h-px transition-all duration-300 bg-current mr-4 ${
                      activeSection === item.id ? "w-16 bg-primary" : "w-8 group-hover:w-16"
                    }`}
                  ></span>
                  <span className={`text-sm font-bold uppercase tracking-widest ${
                    activeSection === item.id ? "text-primary" : ""
                  }`}>
                    {item.label}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-12 lg:mt-0 flex items-center gap-6"
      >
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1"
            aria-label={social.label}
          >
            <social.icon className="h-6 w-6" />
          </a>
        ))}
      </motion.div>
    </header>
  )
}
