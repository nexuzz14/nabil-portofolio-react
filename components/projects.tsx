"use client"

import { useEffect, useState } from "react"
import { BentoCard } from "@/components/bento-card"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  link_github: string
  link_live: string
  images: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
      if (data) setProjects(data)
    }
    fetchProjects()
  }, [])

  // Parse images JSON safely
  const getImages = (imagesJson: string) => {
    try {
      const parsed = JSON.parse(imagesJson)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
      return []
    } catch {
      return imagesJson ? [imagesJson] : []
    }
  }

  const handleNextImage = (e: React.MouseEvent, imagesList: string[]) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % imagesList.length)
  }

  const handlePrevImage = (e: React.MouseEvent, imagesList: string[]) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length)
  }

  return (
    <Dialog.Root open={!!selectedProject} onOpenChange={(open) => {
      if (!open) {
        setSelectedProject(null)
        setCurrentImageIndex(0)
      }
    }}>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => {
          const images = getImages(project.images)
          const thumb = images.length > 0 ? images[0] : "https://via.placeholder.com/600x400"
          
          return (
            <Dialog.Trigger asChild key={project.id} onClick={() => setSelectedProject(project)}>
              <BentoCard delay={0.5 + (index * 0.1)} className="p-0 col-span-1 row-span-1 h-[300px] sm:h-[350px] group cursor-pointer overflow-hidden flex flex-col justify-end relative">
                
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={thumb} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-md text-white rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white rounded text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

              </BentoCard>
            </Dialog.Trigger>
          )
        })}
      </div>

      {/* Modal Detail Project */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-0 border bg-background shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-3xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
          
          {selectedProject && (() => {
            const images = getImages(selectedProject.images)
            const currentImg = images.length > 0 ? images[currentImageIndex] : "https://via.placeholder.com/600x400"
            
            return (
              <>
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-muted">
                  <Image 
                    src={currentImg} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-cover"
                  />
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => handlePrevImage(e, images)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm z-10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => handleNextImage(e, images)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm z-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md">
                        {images.map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? "bg-white w-3" : "bg-white/50"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-6 md:p-8 w-full md:w-1/2 overflow-y-auto">
                  <div className="flex items-start justify-between mb-6">
                    <Dialog.Title className="text-3xl font-bold">{selectedProject.title}</Dialog.Title>
                    <Dialog.Close className="rounded-full w-8 h-8 flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors">
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8 whitespace-pre-wrap flex-grow">
                    {selectedProject.description}
                  </p>

                  <div className="flex gap-4 mt-auto pt-4 border-t border-border/50">
                    {selectedProject.link_live && (
                      <a 
                        href={selectedProject.link_live} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {selectedProject.link_github && (
                      <a 
                        href={selectedProject.link_github} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                      >
                        <Github className="w-4 h-4" /> Repository
                      </a>
                    )}
                  </div>
                </div>
              </>
            )
          })()}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
