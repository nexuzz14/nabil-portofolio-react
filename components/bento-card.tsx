"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BentoCardProps {
  children: ReactNode
  className?: string
  delay?: number
  onClick?: () => void
}

export function BentoCard({ children, className, delay = 0, onClick }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-card border border-border/50 p-6 flex flex-col",
        "transition-all duration-300 hover:shadow-2xl hover:border-primary/30 group",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  )
}
