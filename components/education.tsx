"use client"

import { useEffect, useState } from "react"
import { BentoCard } from "@/components/bento-card"
import { GraduationCap, ChevronRight, X } from "lucide-react"
import { supabase } from "@/lib/supabase"
import * as Dialog from "@radix-ui/react-dialog"

interface Education {
  id: string
  degree: string
  school: string
  period: string
  location: string
  gpa: string
  coursework: string[]
  achievements: string[]
}

export default function Education() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEducation() {
      const { data } = await supabase.from('education').select('*').order('created_at', { ascending: true })
      if (data) setEducation(data)
      setLoading(false)
    }
    fetchEducation()
  }, [])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <BentoCard delay={0.2} className="h-full group cursor-pointer hover:bg-primary/5 transition-colors">
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-500">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Education</h2>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {education.length > 0 
                  ? `${education[0].degree} at ${education[0].school}`
                  : "Loading education..."}
              </p>
            </div>
            
            <div className="flex items-center text-sm font-medium text-blue-500 mt-4 group-hover:translate-x-1 transition-transform">
              See Details <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </BentoCard>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-2xl font-bold">Education History</Dialog.Title>
            <Dialog.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="overflow-y-auto pr-2 mt-4 space-y-8 pb-8">
            {education.map((edu) => (
              <div key={edu.id} className="relative pl-6 border-l border-border/50">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5" />
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <div className="text-blue-500 font-medium">{edu.school}</div>
                <div className="text-sm text-muted-foreground mb-4">
                  {edu.period} • {edu.location} {edu.gpa && `• GPA: ${edu.gpa}`}
                </div>
                
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-foreground">Relevant Coursework:</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {edu.coursework.join(", ")}
                    </p>
                  </div>
                )}

                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                    {edu.achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
