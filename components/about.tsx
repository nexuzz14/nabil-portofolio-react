"use client"

import { BentoCard } from "@/components/bento-card"
import { ArrowRight, Download } from "lucide-react"

export default function About() {
  return (
    <BentoCard className="h-full justify-between group overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/20 transition-colors duration-500"></div>
      
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl flex items-center gap-3">
          Hi, I'm Nabil 👋
        </h1>
        <h2 className="mt-4 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
          Full Stack Developer
        </h2>
        <p className="mt-4 max-w-sm leading-normal text-muted-foreground text-sm sm:text-base">
          I build pixel-perfect, engaging, and accessible digital experiences. Focusing on React, Next.js, and modern web technologies.
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <a 
          href="#projects" 
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          View Work <ArrowRight className="ml-2 w-4 h-4" />
        </a>
        <a 
          href="/resume.pdf" 
          target="_blank"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          Resume <Download className="ml-2 w-4 h-4" />
        </a>
      </div>
    </BentoCard>
  )
}
