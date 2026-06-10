"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Instagram } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Profile {
  name: string
  role: string
  bio: string
  github_url: string
  linkedin_url: string
  email: string
  instagram_url: string
  avatar_url: string
}

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("about")
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profile').select('*').limit(1).single()
      if (data) setProfile(data)
    }
    fetchProfile()
  }, [])

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
    { id: "certificates", label: "Certificates" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ]

  if (!profile) {
    return (
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[40%] lg:flex-col lg:justify-between lg:py-24 py-12 z-20 animate-pulse">
        <div>
          <div className="h-16 w-3/4 bg-primary/10 rounded-lg mb-4"></div>
          <div className="h-8 w-1/2 bg-primary/10 rounded-lg mb-6"></div>
          <div className="space-y-2 mb-12">
            <div className="h-4 w-full bg-primary/5 rounded"></div>
            <div className="h-4 w-5/6 bg-primary/5 rounded"></div>
            <div className="h-4 w-4/6 bg-primary/5 rounded"></div>
          </div>
        </div>
      </header>
    )
  }

  const socialLinks = []
  if (profile.github_url) socialLinks.push({ icon: Github, href: profile.github_url, label: "GitHub" })
  if (profile.linkedin_url) socialLinks.push({ icon: Linkedin, href: profile.linkedin_url, label: "LinkedIn" })
  if (profile.instagram_url) socialLinks.push({ icon: Instagram, href: profile.instagram_url, label: "Instagram" })
  if (profile.email) socialLinks.push({ icon: Mail, href: `mailto:${profile.email}`, label: "Email" })

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[40%] lg:flex-col lg:justify-between lg:py-24 py-12 text-foreground z-20">
      <div>
        {profile.avatar_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 relative group w-32 h-32 lg:w-40 lg:h-40"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/80 to-blue-500/80 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            <img 
              src={profile.avatar_url} 
              alt={profile.name} 
              className="rounded-full object-cover w-full h-full relative z-10 border-2 border-border/50 group-hover:border-primary/50 transition-colors shadow-xl"
            />
          </motion.div>
        )}

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 whitespace-pre-wrap"
        >
          {profile.name}
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 mb-6"
        >
          {profile.role}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground leading-relaxed max-w-xs sm:max-w-md lg:max-w-sm mb-12 whitespace-pre-wrap"
        >
          {profile.bio}
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
