"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"

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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-300">
          
          {/* Unified Global Background */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]"></div>
            <div className="absolute top-[40%] right-[-10%] w-[35vw] h-[35vw] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[12000ms]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          </div>

          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4 relative z-10">
              
              <Sidebar />

              <main className="pt-24 lg:w-[55%] lg:py-24">
                <About />
                <Experience />
                <Skills />
                <Projects limit={4} />
                <Education />
                <Contact />
                <Footer />
              </main>

            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  )
}
