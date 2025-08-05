"use client"

import { useEffect, useRef, useState } from "react"
import { Download, MapPin, Calendar } from "lucide-react"
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
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">Junior Full-Stack Developer</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Highly motivated Junior Programmer passionate about developing innovative web solutions and continuous learning. 
                Equipped with strong problem-solving skills and a fresh perspective, eager to contribute to meaningful projects. 
                Actively seeking opportunities to grow and make a positive impact in the tech industry.
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

              <a href="/cv/Muhammad_Nabil-CV.pdf" download="Muhammad_Nabil-CV.pdf">
                <Button size="lg" className="group">
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Download CV
                </Button>
              </a>
            </div>

            <div className="flex justify-center">
              <Card className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardContent className="p-0">
                  <div className="relative w-80 h-80 rounded-lg overflow-hidden">
                    <Image
                      src="/foto.jpg"
                      alt="Muhammad Nabil Cahya Firdaus - Junior Developer"
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
