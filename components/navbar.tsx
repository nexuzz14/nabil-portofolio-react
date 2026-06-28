"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const router = useRouter()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "certificates", label: "Certificates" },
    { id: "education", label: "Education" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { id: string, path?: string }) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    if (item.path) {
      router.push(item.path)
      return
    }

    if (pathname !== "/") {
      router.push(`/#${item.id}`)
      return
    }

    const element = document.getElementById(item.id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-4 shadow-sm" 
          : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <a 
          href="/" 
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="font-bold text-xl tracking-tight flex items-center gap-2 text-foreground"
        >
          <span className="text-primary">Nabil</span>.dev
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={item.path || `/#${item.id}`} 
                  onClick={(e) => handleNavClick(e, item)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-border/50 pl-8">
            <ThemeToggle />
            <a 
              href="/#contact"
              onClick={(e) => handleNavClick(e, { id: "contact" })}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Hire Me
            </a>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground p-2"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background border-b border-border/50 px-6 py-4"
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={item.path || `/#${item.id}`} 
                  onClick={(e) => handleNavClick(e, item)}
                  className="block text-base font-medium text-muted-foreground hover:text-primary py-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a 
                href="/#contact"
                onClick={(e) => handleNavClick(e, { id: "contact" })}
                className="block text-center bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-medium mt-4"
              >
                Hire Me
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
