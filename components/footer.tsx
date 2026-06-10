"use client"

import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="pb-16 pt-8 text-sm text-muted-foreground sm:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p>
          Coded in Visual Studio Code. Built with Next.js and Tailwind CSS, deployed with Vercel.
        </p>
        <p className="flex items-center gap-2 flex-shrink-0">
          Crafted with <Heart className="h-4 w-4 text-red-500" />
        </p>
      </div>
    </footer>
  )
}
