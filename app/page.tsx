"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Certificates from "@/components/certificates"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import BackToTop from "@/components/back-to-top"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-300">
          
          {/* Unified Global Background */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8000ms' }}></div>
            <div className="absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10000ms' }}></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '12000ms' }}></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          </div>

          <Navbar />

          <main className="relative z-10 pt-24 pb-12">
            <Hero />
            <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 space-y-24 md:space-y-32 mt-24">
              <About />
              <Projects limit={6} />
              <Experience />
              <Skills />
              <Certificates />
              <Education />
              <Contact />
            </div>
          </main>
          
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <Footer />
          </div>
          <BackToTop />
        </div>
      )}
    </ThemeProvider>
  )
}
