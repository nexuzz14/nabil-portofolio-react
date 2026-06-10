"use client"

import { useEffect, useState } from "react"
import { BentoCard } from "@/components/bento-card"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

interface Skill {
  id: string
  name: string
  icon_url: string
  category: string
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    async function fetchSkills() {
      const { data } = await supabase.from('skills').select('*').order('created_at', { ascending: true })
      if (data) setSkills(data)
    }
    fetchSkills()
  }, [])

  return (
    <BentoCard delay={0.4} className="h-full flex flex-col justify-center overflow-hidden py-8 px-0 border-y sm:border sm:rounded-3xl">
      <div className="px-6 mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Tech Stack
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <div
              key={`${skill.id}-${index}`}
              className="mx-4 flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2"
            >
              <div className="relative w-5 h-5">
                <Image
                  src={skill.icon_url || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  )
}