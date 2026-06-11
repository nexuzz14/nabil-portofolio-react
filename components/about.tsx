"use client"

import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { motion, useInView } from "framer-motion"
import { Folder, Briefcase, Cpu } from "lucide-react"

interface Profile {
  full_bio: string
  resume_url: string
}

function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (value > 0 && isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const count = { val: 0 }
      const duration = 2000
      const start = performance.now()

      function step(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        count.val = Math.round(eased * value)
        setDisplayValue(count.val)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
  }, [value, isInView])

  return <span ref={ref}>{displayValue}</span>
}

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [stats, setStats] = useState({ projects: 0, experiences: 0, skills: 0 })

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await supabase.from('profile').select('*').limit(1).single()
      if (data) setProfile(data)
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    async function fetchStats() {
      const [projectsRes, experiencesRes, skillsRes] = await Promise.all([
        supabase.from('projects').select('*'),
        supabase.from('experiences').select('*'),
        supabase.from('skills').select('*'),
      ])
      console.log('Stats debug:', {
        projects: projectsRes.data?.length,
        experiences: experiencesRes.data?.length,
        skills: skillsRes.data?.length,
        projectsError: projectsRes.error,
        experiencesError: experiencesRes.error,
        skillsError: skillsRes.error,
      })
      setStats({
        projects: projectsRes.data?.length ?? 0,
        experiences: experiencesRes.data?.length ?? 0,
        skills: skillsRes.data?.length ?? 0,
      })
    }
    fetchStats()
  }, [])

  if (!profile) {
    return (
      <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 animate-pulse">
        <div className="space-y-4">
          <div className="h-4 w-full bg-primary/5 rounded"></div>
          <div className="h-4 w-5/6 bg-primary/5 rounded"></div>
          <div className="h-4 w-full bg-primary/5 rounded"></div>
          <div className="h-4 w-4/6 bg-primary/5 rounded"></div>
        </div>
      </section>
    )
  }

  const statItems = [
    { label: "Projects Completed", value: stats.projects, icon: Folder },
    { label: "Work Experiences", value: stats.experiences, icon: Briefcase },
    { label: "Tech Skills", value: stats.skills, icon: Cpu },
  ]

  return (
    <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">About</h2>
      </div>
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-muted-foreground leading-relaxed whitespace-pre-wrap"
        >
          {profile.full_bio}
        </motion.div>
        
        {profile.resume_url && (
          <div className="mt-8">
            <a 
              href={profile.resume_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors group"
            >
              <span>View Full Resume</span>
              <svg className="transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        )}

        {/* Stat Counters */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10 p-5 text-center transition-all duration-300 hover:border-primary/25 hover:bg-primary/10"
            >
              <stat.icon className="w-5 h-5 text-primary/50 mx-auto mb-2 transition-colors group-hover:text-primary/80" />
              <div className="text-3xl font-bold text-foreground tabular-nums">
                <AnimatedCounter value={stat.value} />
                <span className="text-primary">+</span>
              </div>
              <div className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
