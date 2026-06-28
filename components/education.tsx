"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

interface Education {
  id: string
  institution: string
  degree: string
  period: string
  location: string
  status: string
  coursework: string[]
  achievements: string[]
}

export default function Education() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEducation() {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('created_at', { ascending: true })
        
        if (error) throw error
        if (data) setEducation(data)
      } catch (err) {
        console.error("Error fetching education:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchEducation()
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
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } }
  }

  return (
    <section id="education" className="mb-24 scroll-mt-24 md:mb-36 lg:mb-36 lg:scroll-mt-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Education</h2>
        <div className="w-20 h-1 bg-primary rounded-full"></div>
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
          className="relative space-y-8"
        >
          {/* Timeline vertical line - desktop only */}
          <div className="absolute left-0 top-2 bottom-2 hidden lg:block w-0.5 bg-primary/20" />

          {education.map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="group relative lg:pl-10">
              {/* Timeline dot - desktop only */}
              <div className="absolute left-0 top-3 hidden lg:flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="w-2 h-2 rounded-full bg-primary relative z-10" />
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border-2 border-primary/40"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: [0.8, 1.3, 1], opacity: [0, 0.6, 0.3] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </motion.div>
              </div>

              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              
              <div className="relative z-10 sm:grid sm:grid-cols-8 sm:gap-8 md:gap-4">
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                  {item.period}
                </header>
                
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-foreground flex items-center gap-2">
                    <span className="text-base font-semibold group-hover:text-primary transition-colors">{item.institution}</span>
                    {item.status && (
                       <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-500 border border-blue-500/20">
                         {item.status}
                       </span>
                    )}
                  </h3>
                  
                  <div className="text-muted-foreground mt-1 text-sm font-medium">{item.degree}</div>
                  
                  <div className="mt-4 text-sm leading-normal text-muted-foreground">
                    <ul className="space-y-2">
                      {item.achievements?.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.coursework && item.coursework.length > 0 && (
                    <ul className="mt-4 flex flex-wrap" aria-label="Coursework">
                      {item.coursework.map((course) => (
                        <li key={course} className="mr-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-muted/50 border border-border/50 px-3 py-1 text-xs font-medium leading-5 text-muted-foreground">
                            {course}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}
