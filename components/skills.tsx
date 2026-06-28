"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import {
  SiReact, SiNextdotjs, SiLaravel, SiTailwindcss, SiTypescript,
  SiJavascript, SiPython, SiPhp, SiMysql, SiPostgresql,
  SiSupabase, SiGit, SiDocker, SiFigma, SiVercel,
  SiGithub, SiHtml5, SiCss, SiNodedotjs, SiBootstrap,
  SiFlutter, SiDart, SiFirebase, SiWordpress, SiVuedotjs,
  SiAngular, SiSvelte, SiRust, SiGo, SiKotlin,
  SiSwift, SiRuby, SiDjango, SiExpress, SiMongodb,
  SiRedis, SiGraphql, SiLinux,
  SiNginx, SiJquery, SiSass, SiVite, SiWebpack,
  SiPrisma, SiStripe, SiTrello, SiJira, SiNotion,
  SiPostman, SiInertia, SiLivewire, SiAlpinedotjs,
  SiFilament
} from "react-icons/si"
import type { IconType } from "react-icons"
import { FaAws } from "react-icons/fa"

// Case-insensitive icon mapping
const skillIconsMap: Record<string, IconType> = {
  'react': SiReact,
  'react.js': SiReact,
  'reactjs': SiReact,
  'next.js': SiNextdotjs,
  'nextjs': SiNextdotjs,
  'next': SiNextdotjs,
  'laravel': SiLaravel,
  'tailwind css': SiTailwindcss,
  'tailwind': SiTailwindcss,
  'tailwindcss': SiTailwindcss,
  'typescript': SiTypescript,
  'javascript': SiJavascript,
  'python': SiPython,
  'php': SiPhp,
  'mysql': SiMysql,
  'postgresql': SiPostgresql,
  'postgres': SiPostgresql,
  'supabase': SiSupabase,
  'git': SiGit,
  'docker': SiDocker,
  'figma': SiFigma,
  'vercel': SiVercel,
  'github': SiGithub,
  'html': SiHtml5,
  'html5': SiHtml5,
  'css': SiCss,
  'css3': SiCss,
  'node.js': SiNodedotjs,
  'nodejs': SiNodedotjs,
  'node': SiNodedotjs,
  'bootstrap': SiBootstrap,
  'flutter': SiFlutter,
  'dart': SiDart,
  'firebase': SiFirebase,
  'wordpress': SiWordpress,
  'vue': SiVuedotjs,
  'vue.js': SiVuedotjs,
  'vuejs': SiVuedotjs,
  'angular': SiAngular,
  'svelte': SiSvelte,
  'rust': SiRust,
  'go': SiGo,
  'golang': SiGo,
  'kotlin': SiKotlin,
  'swift': SiSwift,
  'ruby': SiRuby,
  'django': SiDjango,
  'express': SiExpress,
  'express.js': SiExpress,
  'expressjs': SiExpress,
  'mongodb': SiMongodb,
  'mongo': SiMongodb,
  'redis': SiRedis,
  'graphql': SiGraphql,
  'aws': FaAws,
  'linux': SiLinux,
  'nginx': SiNginx,
  'jquery': SiJquery,
  'sass': SiSass,
  'scss': SiSass,
  'vite': SiVite,
  'webpack': SiWebpack,
  'prisma': SiPrisma,
  'stripe': SiStripe,
  'trello': SiTrello,
  'jira': SiJira,
  'notion': SiNotion,
  'postman': SiPostman,
  'inertia': SiInertia,
  'inertia.js': SiInertia,
  'inertiajs': SiInertia,
  'livewire': SiLivewire,
  'alpine.js': SiAlpinedotjs,
  'alpinejs': SiAlpinedotjs,
  'filament': SiFilament,
  'filamentphp': SiFilament,
}

function getSkillIcon(name: string): IconType | null {
  const key = name.toLowerCase().trim()
  return skillIconsMap[key] || null
}

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <section id="skills" className="mb-24 scroll-mt-24 md:mb-36 lg:mb-36 lg:scroll-mt-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Skills & Technologies</h2>
        <div className="w-20 h-1 bg-primary rounded-full"></div>
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
          className="space-y-10"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground mb-5">{category.title}</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" aria-label={`Skills in ${category.title}`}>
                {category.skills.map((skill, index) => {
                  const Icon = getSkillIcon(skill)
                  return (
                    <motion.li
                      key={skill}
                      variants={cardVariants}
                      transition={{ delay: index * 0.03 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="group/card flex flex-col items-center justify-center gap-2.5 rounded-xl bg-muted/30 border border-border/50 p-4 h-[88px] cursor-default transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]"
                      >
                        {Icon ? (
                          <Icon className="w-7 h-7 text-muted-foreground transition-colors duration-300 group-hover/card:text-primary" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary transition-colors duration-300 group-hover/card:bg-primary/20">
                            {skill.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-xs font-medium text-muted-foreground text-center leading-tight transition-colors duration-300 group-hover/card:text-foreground line-clamp-1">
                          {skill}
                        </span>
                      </motion.div>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}