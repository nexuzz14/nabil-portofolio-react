"use client"

import { useEffect, useRef, useState } from "react"
import { Download, MapPin, Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 mt-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Hi, I'm <span className="text-primary">Muhammad Nabil Cahya Firdaus</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-4">Full-Stack Developer & Freelance Engineer</h2>
              
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-6 shadow-sm animate-pulse">
                🚀 Menerima Jasa Pembuatan Web & App
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Full-stack developer (RPL graduate) active as an IT Developer intern at CV DBKLIK Indonesia and an independent freelance engineer. BNSP-certified Junior Programmer passionate about building robust, scalable web applications and delivering high-quality freelance solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Magelang, IND</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Available for hire</span>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="/cv/CV_MuhammadNabilCF.pdf" download="Muhammad Nabil CV.pdf">
                  <Button size="lg" className="group">
                    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    Download CV
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <Card className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="p-0">
                  <div className="relative w-80 h-80 rounded-lg overflow-hidden">
                    <Image
                      src="/foto.jpg"
                      alt="Muhammad Nabil Cahya Firdaus - Full-Stack Developer"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
