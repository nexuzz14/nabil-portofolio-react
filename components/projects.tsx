"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  gallery: string[]
}

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects: Project[] = [
  {
    "id": 1,
    "title": "E-Commerce Payment Gateway",
    "description": "An e-commerce platform with a PHP backend, integrated with the Midtrans payment gateway and RajaOngkir shipping calculator API.",
    "longDescription": "A functional e-commerce application built with native PHP and a MySQL database. This platform enables users to browse products, manage their shopping cart, and complete transactions securely. Key features include seamless integration with the RajaOngkir API for real-time domestic shipping cost calculations and a secure payment process handled by the Midtrans payment gateway. The system also includes an admin panel for product and order management.",
    "image": "/chemtrank.png",
    "technologies": ["PHP", "MySQL", "RajaOngkir API", "Midtrans API"],
    "liveUrl": "https://example.com",
    "githubUrl": "https://github.com/example",
    "gallery": [
      "/chemongkir.png",
      "/chemtrank.png"
    ]
  },
  {
    "id": 2,
    "title": "Inventory Management System",
    "description": "A web-based inventory management system to track product stock, transactions, and master data, built with a React frontend and Laravel backend.",
    "longDescription": "A comprehensive Inventory Management System designed to streamline business operations. The front-end is built with React and Material-UI, offering a clean and responsive user interface for managing master data, tracking product stock, and recording incoming/outgoing transactions. The powerful back-end is powered by Laravel, providing a robust REST API for all data operations. This system helps businesses maintain accurate inventory levels and monitor stock movements efficiently.",
    "image": "/dashboardi.png",
    "technologies": ["React", "Laravel", "Rest API", "Material-UI", "Firebase"],
    "liveUrl": "https://example.com",
    "githubUrl": "https://github.com/example",
    "gallery": [
      "/invenmasdat.png",
      "/invenbarang.png",
      "/inventransaksi.png",
      "/invenakun.png"
    ]
  },
  {
    "id": 3,
    "title": "Event Planner",
    "description": "A modern and responsive landing page for an Event Planner business, designed to showcase services, packages, and a gallery.",
    "longDescription": "A visually appealing landing page for an Event Planner service, built from scratch using HTML, Tailwind CSS, and vanilla JavaScript. The site is fully responsive and designed to attract potential clients by showcasing available service packages, a gallery of past events, customer testimonials, and an easy-to-use contact section. The focus is on a modern design and a smooth user experience to effectively market the business.",
    "image": "/eventplanner.png",
    "technologies": ["HTML", "JavaScript", "Tailwind CSS"],
    "liveUrl": "https://example.com",
    "githubUrl": "https://github.com/example",
    "gallery": [
      "/eventpaket.png",
      "/eventgaleri.png",
      "/eventtesti.png",
      "/eventkontak.png"
    ]
  },
  {
    "id": 4,
    "title": "Tour & Travel",
    "description": "A promotional website for a Tour & Travel agency, featuring tour packages, special promos, and booking information.",
    "longDescription": "A promotional website designed for a Tour & Travel agency to showcase its offerings and attract customers. Developed with HTML, Tailwind CSS, and JavaScript, the site features detailed information on travel packages, current promotions, and a clear call-to-action for bookings. The layout is fully responsive, ensuring a great user experience on all devices, from desktops to mobile phones. The design aims to be engaging and persuasive, encouraging users to explore travel options and make inquiries.",
    "image": "/tour&travel.png",
    "technologies": ["HTML", "Tailwind CSS", "JavaScript"],
    "liveUrl": "https://example.com",
    "githubUrl": "https://github.com/example",
    "gallery": [
      "/travelpaket.png",
      "/travelpromo.png",
      "/travelpemesanan.png",
      "/travelkontak.png"
    ]
  }
  ]

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === selectedProject.gallery.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.gallery.length - 1 : prev - 1))
    }
  }

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className={`py-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A showcase of my recent work and the technologies I've been exploring.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          onClick={() => openModal(project)}
                          variant="secondary"
                          className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-6">
              {/* Image Carousel */}
              <div className="relative mb-6">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.gallery[currentImageIndex] || "/placeholder.svg"}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {selectedProject.gallery.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                <div className="flex justify-center mt-4 gap-2">
                  {selectedProject.gallery.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-primary" : "bg-muted"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{selectedProject.longDescription}</p>

                <div>
                  <h4 className="font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

               {/*  <div className="flex gap-4 pt-4">
                  <Button asChild>
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
