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
  github: string
  demo: string
  badge: string
}

function ProjectImageCarousel({ images, title, className = "aspect-video sm:aspect-auto sm:h-20 sm:w-32" }: { images: string[], title: string, className?: string }) {
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
      <div className={`relative overflow-hidden rounded border border-border/50 bg-muted ${className}`}>
        <Image
          src={images[0] || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition group-hover:scale-105"
        />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded border border-border/50 bg-muted group/carousel ${className}`}>
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((img, i) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={i}>
              <Image
                src={img || "/placeholder.svg"}
                alt={`${title} image ${i+1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation arrows appear on hover */}
      <button 
        className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-background/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:bg-background disabled:opacity-0"
        onClick={(e) => { e.preventDefault(); emblaApi?.scrollPrev(); }}
        disabled={!canScrollPrev}
      >
        <ChevronLeft className="w-3 h-3" />
      </button>
      <button 
        className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-background/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:bg-background disabled:opacity-0"
        onClick={(e) => { e.preventDefault(); emblaApi?.scrollNext(); }}
        disabled={!canScrollNext}
      >
        <ChevronRight className="w-3 h-3" />
      </button>

      {/* Indicator */}
      <div className="absolute bottom-1 right-1 bg-background/80 backdrop-blur px-1.5 py-0.5 rounded text-[8px] font-medium opacity-0 group-hover/carousel:opacity-100 transition-opacity">
        +{images.length - 1}
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
      transition: { staggerChildren: 0.2 } 
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
    <section id="projects" className="mb-24 scroll-mt-24 md:mb-36 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">Projects</h2>
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
          className="group/list space-y-12"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants} 
              className="group relative cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              
              <div className="relative z-10 sm:grid sm:grid-cols-8 sm:gap-8 md:gap-4">
                <div className="z-10 mb-4 sm:col-span-2 sm:mb-0">
                  <ProjectImageCarousel images={parseImages(project.image)} title={project.title} />
                </div>
                
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-foreground flex items-center gap-2">
                    <span className="inline-flex items-baseline font-semibold leading-tight text-foreground group-hover:text-primary transition-colors text-base">
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                      <span>{project.title}</span>
                    </span>
                  </h3>
                  
                  <p className="mt-2 text-sm leading-normal text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap" aria-label="Technologies used">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <li key={tech} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary">
                          {tech}
                        </div>
                      </li>
                    ))}
                    {project.technologies?.length > 4 && (
                      <li className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary">
                          +{project.technologies.length - 4}
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                <DialogDescription className="sr-only">
                  Details about {selectedProject.title}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <ProjectImageCarousel 
                  images={parseImages(selectedProject.image)} 
                  title={selectedProject.title}
                  className="w-full aspect-video mb-6"
                />
                 
                 <div className="space-y-4">
                   <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                     {selectedProject.description}
                   </p>
                   
                   <div>
                     <h4 className="font-semibold mb-2">Technologies</h4>
                     <ul className="flex flex-wrap gap-2">
                        {selectedProject.technologies?.map((tech) => (
                          <li key={tech} className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary">
                            {tech}
                          </li>
                        ))}
                     </ul>
                   </div>
                   
                   <div className="flex gap-4 pt-4 mt-6 border-t border-border/50">
                     {selectedProject.demo && selectedProject.demo !== "#" && (
                       <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors text-sm">
                         <ExternalLink className="w-4 h-4" /> Live Demo
                       </a>
                     )}
                     {selectedProject.github && selectedProject.github !== "#" && (
                       <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="bg-secondary text-secondary-foreground border border-border/50 px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-secondary/80 transition-colors text-sm">
                         <Github className="w-4 h-4" /> Source Code
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

