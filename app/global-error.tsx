"use client"

import { useEffect, useState } from "react"
import { RefreshCw, Home, AlertCircle, ChevronDown } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isChunkError, setIsChunkError] = useState(false)
  const [isReloading, setIsReloading] = useState(false)

  useEffect(() => {
    console.error("Global application error captured:", error)

    const isChunk =
      error?.name === "ChunkLoadError" ||
      error?.message?.toLowerCase().includes("chunkloaderror") ||
      error?.message?.toLowerCase().includes("loading chunk") ||
      error?.message?.toLowerCase().includes("failed to fetch dynamically imported module")

    setIsChunkError(!!isChunk)

    if (isChunk && typeof window !== "undefined") {
      const reloadKey = "chunk_load_error_global_reload_ts"
      const lastReload = sessionStorage.getItem(reloadKey)
      const now = Date.now()

      if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
        sessionStorage.setItem(reloadKey, now.toString())
        setIsReloading(true)
        window.location.reload()
      }
    }
  }, [error])

  const handleReload = () => {
    setIsReloading(true)
    window.location.reload()
  }

  return (
    <html lang="id">
      <body className="bg-[#090d16] text-white min-h-screen font-sans antialiased selection:bg-blue-500/30">
        <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 overflow-hidden">
          {/* Background Glow */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-blue-600/15 rounded-full blur-[140px]"
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-purple-600/15 rounded-full blur-[140px]"
            />
          </div>

          <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide mb-8 shadow-sm backdrop-blur-md">
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
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              {isChunkError
                ? "Pembaruan Versi Terdeteksi"
                : "Oops, Terjadi Sedikit Kendala!"}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-gray-400 max-w-md mb-10 leading-relaxed">
              {isReloading
                ? "Sedang memuat ulang halaman untuk mengambil versi aset terbaru..."
                : isChunkError
                ? "Terdapat pembaruan versi pada aplikasi atau gangguan jaringan sesaat. Silakan muat ulang halaman untuk memperbarui."
                : "Halaman mengalami gangguan sementara saat memuat aplikasi. Silakan coba muat ulang atau kembali ke halaman utama."}
            </p>

            {/* Primary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={handleReload}
                disabled={isReloading}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isReloading ? "animate-spin" : ""}`} />
                <span>{isReloading ? "Memuat Ulang..." : "Muat Ulang Halaman"}</span>
              </button>

              <a
                href="/"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4 text-blue-400" />
                <span>Kembali ke Beranda</span>
              </a>
            </div>

            {/* Discreet Technical Details Collapsible */}
            <div className="w-full max-w-md">
              <details className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-xl overflow-hidden text-left text-xs">
                <summary className="px-4 py-3 cursor-pointer text-gray-400 hover:text-gray-200 flex items-center justify-between transition-colors select-none font-medium">
                  <span>Detail Teknis (Informasi Sistem)</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </summary>
                <div className="p-4 pt-2 border-t border-gray-800/60 font-mono text-[11px] text-gray-400 space-y-2 bg-black/40 break-words">
                  <div>
                    <span className="text-red-400 font-semibold">{error.name || "Error"}:</span>{" "}
                    <span>{error.message || "An unexpected error occurred."}</span>
                  </div>
                  {error.digest && (
                    <div className="text-[10px] text-gray-500">
                      Digest: {error.digest}
                    </div>
                  )}
                </div>
              </details>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
