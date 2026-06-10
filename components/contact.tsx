"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Mail, Github, Linkedin, Phone } from "lucide-react"

interface Profile {
  email: string
  phone: string
  github_url: string
  linkedin_url: string
}

export default function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profile').select('*').limit(1).single()
      if (data) setProfile(data)
    }
    fetchProfile()
  }, [])

  if (!profile) return null // Hide if loading

  return (
    <section id="contact" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">Let's Connect</h2>
      </div>

      <div className="rounded-2xl bg-primary/5 p-8 border border-primary/10">
        <h3 className="text-2xl font-bold mb-2">Let's build something together.</h3>
        <p className="text-muted-foreground mb-6">
          Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
        </p>

        <div className="flex gap-4">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              <Mail className="w-5 h-5" />
            </a>
          )}
          {profile.phone && (
            <a href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`} className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Phone className="w-5 h-5" />
            </a>
          )}
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          )}
          {profile.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
