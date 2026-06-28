"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Award, FileText } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  link: string
  image: string
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const { data, error } = await supabase.from('certificates').select('*').order('created_at', { ascending: false })
        if (error) throw error
        if (data) setCertificates(data)
      } catch (err) {
        console.error("Error fetching certificates:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCertificates()
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

  if (loading) {
    return (
      <section id="certificates" className="mb-24 scroll-mt-24 md:mb-36 lg:mb-36 lg:scroll-mt-24">
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
        </div>
      </section>
    )
  }

  if (certificates.length === 0) return null

  return (
    <section id="certificates" className="mb-24 scroll-mt-24 md:mb-36 lg:mb-36 lg:scroll-mt-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Certificates</h2>
        <div className="w-20 h-1 bg-primary rounded-full"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="group/list space-y-12"
      >
        {certificates.map((cert) => (
          <motion.div key={cert.id} variants={itemVariants} className="group relative">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
            
            <div className="relative z-10 sm:grid sm:grid-cols-8 sm:gap-8 md:gap-4 items-center">
              <div className="z-10 mb-4 sm:col-span-2 sm:mb-0">
                {cert.image ? (
                  <div className="relative overflow-hidden rounded border border-border/50 aspect-video sm:aspect-auto sm:h-20 sm:w-32 bg-muted flex items-center justify-center">
                    {cert.image.includes('.pdf') ? (
                      <a href={cert.image} target="_blank" rel="noopener noreferrer" className="w-full h-full flex flex-col items-center justify-center text-primary hover:bg-primary/5 transition-colors">
                        <FileText className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-medium uppercase tracking-wider">PDF File</span>
                      </a>
                    ) : (
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                    )}
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded border border-border/50 aspect-video sm:aspect-auto sm:h-20 sm:w-32 bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="w-8 h-8" />
                  </div>
                )}
              </div>
              
              <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-foreground flex items-center gap-2">
                  {(cert.link || cert.image) ? (
                    <a href={cert.link || cert.image} target="_blank" rel="noopener noreferrer" className="inline-flex items-baseline font-semibold leading-tight text-foreground hover:text-primary focus-visible:text-primary group/link text-base">
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                      <span>{cert.title}</span>
                      <ExternalLink className="ml-1 inline-block h-3 w-3 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                    </a>
                  ) : (
                    <span className="font-semibold leading-tight text-foreground text-base">
                      {cert.title}
                    </span>
                  )}
                </h3>
                
                <p className="mt-2 text-sm leading-normal text-muted-foreground flex items-center gap-2">
                  <span className="font-medium text-foreground/80">{cert.issuer}</span>
                  <span>•</span>
                  <span>{cert.date}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
