"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Profile {
  name: string
  role: string
  bio: string
  resume_url: string
}

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profile').select('*').limit(1).single()
      if (data) setProfile(data)
    }
    fetchProfile()
  }, [])

  if (!profile) {
    return (
      <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 animate-pulse">
        <div className="h-12 w-64 bg-primary/10 rounded-lg mb-4"></div>
        <div className="h-8 w-48 bg-primary/10 rounded-lg mb-6"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-primary/5 rounded"></div>
          <div className="h-4 w-5/6 bg-primary/5 rounded"></div>
          <div className="h-4 w-4/6 bg-primary/5 rounded"></div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">About</h2>
      </div>
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Hi, I'm {profile.name} 👋
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-foreground sm:text-xl">
          {profile.role}
        </h2>
        <p className="mt-4 max-w-xs leading-normal text-muted-foreground whitespace-pre-wrap">
          {profile.bio}
        </p>
        
        {profile.resume_url && (
          <div className="mt-8">
            <a 
              href={profile.resume_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <span>View Resume</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
