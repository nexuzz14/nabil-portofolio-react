"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2500
    const interval = 50
    const step = 100 / (duration / interval)
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + step
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.1),transparent_50%)]"></div>
        
        <div className="z-10 flex flex-col items-center w-full max-w-sm px-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative w-16 h-16 flex items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-l-2 border-primary/50"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-2 rounded-full border-b-2 border-r-2 border-primary/30"
            />
            <span className="font-bold text-2xl tracking-tighter text-foreground">N</span>
          </motion.div>

          <h2 className="text-sm font-semibold tracking-[0.3em] mb-8 text-foreground/80 uppercase">
            Curating Experience
          </h2>

          <div className="w-full h-[2px] bg-muted/50 overflow-hidden mb-4 relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: `${progress}%` }}
              layoutId="progressBar"
            />
          </div>

          <div className="w-full flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
            <span>Loading</span>
            <span>{Math.floor(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
