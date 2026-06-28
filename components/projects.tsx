"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import useEmblaCarousel from "embla-carousel-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface Project {
  id: string
  title: string
  description: string
  image: string | string[]
  technologies: string[]
  demo: string
  github: string
  badge: string
}

function ProjectImageCarousel({ images, title, className = "aspect-video" }: { images: string[], title: string, className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return
    
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    onSelect()
  }, [emblaApi])

  if (images.length === 1) {
    return (
      <div className={`relative overflow-hidden bg-muted ${className}`}>
        <Image
          src={images[0] || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-muted group/carousel ${className}`}>
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((img, i) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={i}>
              <Image
                src={img || "/placeholder.svg"}
                alt={`${title} - image ${i + 1}`}
                fill
                className="object-cover transition duration-500 group-hover/carousel:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
      
      {canScrollPrev && (
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:bg-background"
          onClick={(e) => { e.stopPropagation(); emblaApi?.scrollPrev(); }}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      
      {canScrollNext && (
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:bg-background"
          onClick={(e) => { e.stopPropagation(); emblaApi?.scrollNext(); }}
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
      
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm transition-all ${
              emblaApi?.selectedScrollSnap() === i ? 'w-3 bg-white' : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Projects({ limit }: { limit?: number }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        let query = supabase.from('projects').select('*').order('created_at', { ascending: false })
        if (limit) {
          query = query.limit(limit)
        }
        
        const { data, error } = await query
        
        if (error) throw error
        if (data) setProjects(data)
      } catch (err) {
        console.error("Error fetching projects:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [limit])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } }
  }

  const parseImages = (imageField: string | string[]) => {
    if (Array.isArray(imageField)) return imageField;
    if (!imageField) return [];
    try {
      const parsed = JSON.parse(imageField);
      if (Array.isArray(parsed)) return parsed;
      return [imageField];
    } catch {
      return [imageField];
    }
  }

  return (
    <section id="projects" className="scroll-mt-28">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Featured Work</h2>
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
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants} 
              className="group relative cursor-pointer flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors shadow-sm hover:shadow-md"
              onClick={() => setSelectedProject(project)}
            >
              <ProjectImageCarousel images={parseImages(project.image)} title={project.title} />
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 mb-6 flex-1">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-2 mt-auto" aria-label="Technologies used">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <li key={tech}>
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {tech}
                      </span>
                    </li>
                  ))}
                  {project.technologies?.length > 3 && (
                    <li>
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        +{project.technologies.length - 3}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl">
          {selectedProject && (
            <>
              <ProjectImageCarousel 
                images={parseImages(selectedProject.image)} 
                title={selectedProject.title}
                className="w-full aspect-[16/9]"
              />
              
              <div className="p-6 sm:p-8">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl sm:text-3xl font-bold">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="sr-only">
                    Details about {selectedProject.title}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech) => (
                      <span key={tech} className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground">
                    <p className="whitespace-pre-wrap leading-relaxed">{selectedProject.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                    {selectedProject.demo && selectedProject.demo !== "#" && (
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm hover:shadow-primary/25 text-sm">
                        <ExternalLink className="w-4 h-4" /> Visit Website
                      </a>
                    )}
                    {selectedProject.github && selectedProject.github !== "#" && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="bg-background text-foreground border border-border px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-muted transition-colors text-sm">
                        <Github className="w-4 h-4" /> View Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
