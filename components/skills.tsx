"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

interface Skill {
  id: string
  name: string
  category: string
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
        
        if (error) throw error
        if (data) setSkills(data)
      } catch (err) {
        console.error("Error fetching skills:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)))
  
  const skillCategories = categories.map(cat => ({
    title: cat,
    skills: skills.filter(s => s.category === cat).map(s => s.name)
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="skills" className="mb-24 scroll-mt-24 md:mb-36 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">Skills</h2>
      </div>

      {loading ? (
         <div className="flex justify-center items-center h-20">
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
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground mb-4">{category.title}</h3>
              <ul className="flex flex-wrap gap-2" aria-label={`Skills in ${category.title}`}>
                {category.skills.map((skill) => (
                  <li key={skill}>
                    <div className="flex items-center rounded-full bg-muted/50 border border-border/50 px-4 py-2 text-sm font-medium leading-5 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
                      {skill}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}