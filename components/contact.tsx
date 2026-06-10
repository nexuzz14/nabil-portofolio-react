"use client"

import { BentoCard } from "@/components/bento-card"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"

export default function Contact() {
  return (
    <BentoCard delay={0.3} className="h-full bg-primary text-primary-foreground group overflow-hidden border-none relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h2 className="text-xl font-bold">Let's Connect</h2>
          <p className="text-sm text-primary-foreground/80 mt-2">
            Have a project in mind? Let's talk!
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <a href="mailto:hello@example.com" className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/30 transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://github.com" target="_blank" className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/30 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/30 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </BentoCard>
  )
}
