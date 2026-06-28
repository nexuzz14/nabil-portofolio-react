"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Terminal } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

export default function Hero() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profile').select('*').limit(1).single()
      if (data) setProfile(data)
    }
    fetchProfile()
  }, [])

  if (!profile) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4 w-full max-w-3xl">
          <div className="h-12 w-3/4 bg-primary/10 rounded-lg"></div>
          <div className="h-6 w-1/2 bg-primary/10 rounded-lg"></div>
          <div className="h-4 w-5/6 bg-primary/5 rounded mt-8"></div>
        </div>
      </section>
    )
  }

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-[85vh] flex items-center justify-center pt-12 md:pt-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
            >
              <Terminal className="w-4 h-4" />
              <span>Available for Freelance Projects</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
            >
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Digital Solutions</span> That Grow Your Business
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              I help businesses and individuals create fast, secure, and modern websites. From landing pages to complex web applications.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a 
                href="#contact"
                onClick={scrollToContact}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
              >
                Start a Project <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#projects"
                onClick={scrollToProjects}
                className="w-full sm:w-auto px-8 py-4 bg-background border border-border text-foreground rounded-full font-semibold hover:bg-muted transition-all flex items-center justify-center"
              >
                View My Work
              </a>
            </motion.div>
          </div>

          {/* Visual/Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-md lg:max-w-none relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full max-w-[500px] mx-auto">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-full md:rounded-3xl blur-3xl animate-pulse"></div>
              
              {profile.avatar_url ? (
                <div className="relative w-full h-full rounded-full md:rounded-[2rem] overflow-hidden border-2 border-border/50 shadow-2xl bg-muted z-10">
                  <Image 
                    src={profile.avatar_url}
                    alt={profile.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full rounded-full md:rounded-[2rem] overflow-hidden border-2 border-border/50 shadow-2xl bg-muted z-10 flex items-center justify-center">
                  <Image 
                    src="/hero-3d.png"
                    alt="3D Illustration"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-6 bg-background border border-border/50 p-4 rounded-xl shadow-xl z-20 hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
                <p className="text-sm font-bold text-foreground">Next.js & React</p>
                <p className="text-xs text-muted-foreground">Modern Tech Stack</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-background border border-border/50 p-4 rounded-xl shadow-xl z-20 hidden md:block animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <p className="text-sm font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
