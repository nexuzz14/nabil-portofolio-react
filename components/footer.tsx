"use client"

import { useEffect, useState } from "react"
import { Heart, Github, Linkedin, Mail, Instagram } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Profile {
  email: string
  github_url: string
  linkedin_url: string
  instagram_url: string
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

export default function Footer() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase
        .from('profile')
        .select('email, github_url, linkedin_url, instagram_url')
        .limit(1)
        .single()
      if (data) setProfile(data)
    }
    fetchProfile()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  const socialLinks = []
  if (profile?.github_url) socialLinks.push({ icon: Github, href: profile.github_url, label: "GitHub" })
  if (profile?.linkedin_url) socialLinks.push({ icon: Linkedin, href: profile.linkedin_url, label: "LinkedIn" })
  if (profile?.email) socialLinks.push({ icon: Mail, href: `mailto:${profile.email}`, label: "Email" })
  if (profile?.instagram_url) socialLinks.push({ icon: Instagram, href: profile.instagram_url, label: "Instagram" })

  return (
    <footer className="border-t border-border/30 pt-12 pb-16 text-sm text-muted-foreground sm:pb-8">
      {/* Navigation Links */}
      <nav className="mb-8">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Icons — Dynamic from Supabase */}
      {socialLinks.length > 0 && (
        <div className="flex justify-center gap-5 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      )}

      {/* Copyright */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p>
          Coded in Visual Studio Code. Built with Next.js and Tailwind CSS, deployed with Vercel.
        </p>
        <p className="flex items-center gap-2 flex-shrink-0">
          Crafted with <Heart className="h-4 w-4 text-red-500" />
        </p>
      </div>
    </footer>
  )
}
