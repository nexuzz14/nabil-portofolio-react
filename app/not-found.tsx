"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft, Folder, Mail, Compass } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 overflow-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Background Glowing Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-primary/15 rounded-full blur-[140px] mix-blend-screen animate-pulse" style={{ animationDuration: '6000ms' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-purple-500/15 rounded-full blur-[140px] mix-blend-screen animate-pulse" style={{ animationDuration: '8000ms' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold tracking-wide mb-8 shadow-sm backdrop-blur-md"
        >
          <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
          <span>PAGE NOT FOUND</span>
        </motion.div>

        {/* Big 404 Glowing Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6"
        >
          <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-500 select-none drop-shadow-sm">
            404
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl -z-10 rounded-full opacity-60" />
        </motion.div>

        {/* Title and Description */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground"
        >
          Lost in Digital Space?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
        >
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau alamat URL-nya salah ketik. Mari kembali menjelajahi portofolio & proyek terbaik saya.
        </motion.p>

        {/* Primary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
        >
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/projects"
            className="w-full sm:w-auto px-8 py-4 bg-card hover:bg-muted border border-border/60 text-foreground rounded-full font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Folder className="w-4 h-4 text-primary" />
            <span>Lihat Semua Proyek</span>
          </Link>
        </motion.div>

        {/* Quick Links Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-5 shadow-lg text-left"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Atau kueri halaman populer:
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link
              href="/#about"
              className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors text-foreground font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary rotate-180" />
              <span>Tentang Saya</span>
            </Link>
            <Link
              href="/#experience"
              className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors text-foreground font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary rotate-180" />
              <span>Pengalaman</span>
            </Link>
            <Link
              href="/#skills"
              className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors text-foreground font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-primary rotate-180" />
              <span>Keahlian & Tech</span>
            </Link>
            <Link
              href="/#contact"
              className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors text-foreground font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>Hubungi Saya</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
