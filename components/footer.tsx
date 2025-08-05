"use client"

import { Heart } from "lucide-react"

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="text-xl font-bold mb-4">
                <span className="text-primary">{"<"}</span>
                Muhammad Nabil Cahay Firdaus
                <span className="text-primary">{"/>"}</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Junior Full-Stack Developer passionate about creating innovative web solutions and learning new
                technologies.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">Get In Touch</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>mnabilcf14@email.com</p>
                <p>+62 858-0306-7018</p>
                <p>Magelang, IND</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Muhammad Nabil Cahya Firdaus. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1 mt-4 md:mt-0">
              Built with <Heart className="h-4 w-4 text-red-500" /> and React
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
