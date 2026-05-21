"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Projects from "@/components/projects"
import Footer from "@/components/footer"

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
        <Header />
        <main className="flex-grow pt-24">
          <Projects showViewAllLink={false} columns={3} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
