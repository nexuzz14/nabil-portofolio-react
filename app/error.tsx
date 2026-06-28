"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error("Application crashed:", error)
  }, [error])

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center bg-background">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-foreground">Oops, Something went wrong!</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We encountered a client-side exception. Below are the technical details of the error.
      </p>
      
      <div className="w-full max-w-2xl bg-card border border-border/50 rounded-xl p-4 overflow-hidden mb-8 shadow-lg text-left">
        <div className="text-xs font-mono text-red-400 font-bold mb-2 break-words">
          {error.name}: {error.message}
        </div>
        {error.stack && (
          <pre className="text-[10px] sm:text-xs font-mono text-muted-foreground overflow-auto max-h-[300px] p-2 bg-background/50 rounded">
            {error.stack}
          </pre>
        )}
      </div>

      <button
        className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  )
}
