"use client"

import { MessageCircle } from "lucide-react"

export default function FloatingWhatsApp() {
  const phoneNumber = "6285803067018"
  const defaultMessage = "Halo, saya melihat portofolio Anda dan tertarik untuk berdiskusi lebih lanjut mengenai project/jasa pembuatan website."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-background">
        1
      </span>
    </a>
  )
}
