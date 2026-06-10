"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  status: string
  skills: string[]
  achievements: string[]
}

export default function Experience() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExperience() {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('created_at', { ascending: true })
        
        if (error) throw error
        if (data) setExperience(data)
      } catch (err) {
        console.error("Error fetching experience:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchExperience()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  }

  return (
    <section id="experience" className="mb-24 scroll-mt-24 md:mb-36 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">Experience</h2>
      </div>

      {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
          </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {experience.map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="group relative">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              
              <div className="relative z-10 sm:grid sm:grid-cols-8 sm:gap-8 md:gap-4">
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                  {item.period}
                </header>
                
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-foreground">
                    <div>
                      <span className="text-base font-semibold group-hover:text-primary transition-colors">{item.title}</span>
                    </div>
                    <div className="text-muted-foreground">{item.company}</div>
                  </h3>
                  
                  <div className="mt-2 text-sm leading-normal text-muted-foreground">
                    <ul className="space-y-2">
                      {item.achievements?.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ul className="mt-4 flex flex-wrap" aria-label="Technologies used">
                    {item.skills?.map((skill) => (
                      <li key={skill} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary">
                          {skill}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}
