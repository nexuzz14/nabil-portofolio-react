"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { RefreshCw, Home, AlertCircle, ChevronDown } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isChunkError, setIsChunkError] = useState(false)
  const [isReloading, setIsReloading] = useState(false)

  useEffect(() => {
    // Log error for debugging / reporting
    console.error("Application error captured:", error)

    // Check if error is related to chunk loading failure (common after new deployments)
    const isChunk =
      error?.name === "ChunkLoadError" ||
      error?.message?.toLowerCase().includes("chunkloaderror") ||
      error?.message?.toLowerCase().includes("loading chunk") ||
      error?.message?.toLowerCase().includes("failed to fetch dynamically imported module")

    setIsChunkError(!!isChunk)

    if (isChunk && typeof window !== "undefined") {
      const reloadKey = "chunk_load_error_reload_ts"
      const lastReload = sessionStorage.getItem(reloadKey)
      const now = Date.now()

      // If we haven't reloaded in the last 15 seconds, reload automatically to fetch latest build chunks
      if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
        sessionStorage.setItem(reloadKey, now.toString())
        setIsReloading(true)
        window.location.reload()
      }
    }
  }, [error])

  const handleReload = () => {
    setIsReloading(true)
    // Full reload fetches fresh HTML and chunk hashes from server
    window.location.reload()
  }

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 overflow-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Background Glowing Orbs matching not-found.tsx */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-primary/15 rounded-full blur-[140px] mix-blend-screen animate-pulse"
          style={{ animationDuration: "6000ms" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-purple-500/15 rounded-full blur-[140px] mix-blend-screen animate-pulse"
          style={{ animationDuration: "8000ms" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold tracking-wide mb-8 shadow-sm backdrop-blur-md"
        >
          {isChunkError ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>PEMBARUAN APLIKASI</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>TERJADI KENDALA SISTEM</span>
            </>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground"
        >
          {isChunkError
            ? "Pembaruan Versi Terdeteksi"
            : "Oops, Terjadi Sedikit Kendala!"}
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
        >
          {isReloading
            ? "Sedang memuat ulang halaman untuk mengambil versi aset terbaru..."
            : isChunkError
            ? "Terdapat pembaruan versi pada aplikasi atau gangguan jaringan sesaat. Silakan muat ulang halaman untuk memperbarui."
            : "Halaman mengalami gangguan sementara saat memuat komponen. Silakan coba muat ulang atau kembali ke halaman utama."}
        </motion.p>

        {/* Primary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8"
        >
          <button
            onClick={handleReload}
            disabled={isReloading}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isReloading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            <span>{isReloading ? "Memuat Ulang..." : "Muat Ulang Halaman"}</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-card hover:bg-muted border border-border/60 text-foreground rounded-full font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-primary" />
            <span>Kembali ke Beranda</span>
          </Link>
        </motion.div>

        {/* Discreet Technical Details Collapsible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-md"
        >
          <details className="group bg-card/40 backdrop-blur-md border border-border/40 rounded-xl overflow-hidden text-left text-xs">
            <summary className="px-4 py-3 cursor-pointer text-muted-foreground hover:text-foreground flex items-center justify-between transition-colors select-none font-medium">
              <span>Detail Teknis (Informasi Sistem)</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="p-4 pt-2 border-t border-border/30 font-mono text-[11px] text-muted-foreground space-y-2 bg-background/50 break-words">
              <div>
                <span className="text-red-400 font-semibold">{error.name || "Error"}:</span>{" "}
                <span>{error.message || "An unexpected error occurred."}</span>
              </div>
              {error.digest && (
                <div className="text-[10px] text-muted-foreground/70">
                  Digest: {error.digest}
                </div>
              )}
            </div>
          </details>
        </motion.div>
      </div>
    </div>
  )
}
