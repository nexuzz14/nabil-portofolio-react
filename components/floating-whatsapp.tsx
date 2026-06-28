"use client"

import { FaWhatsapp } from "react-icons/fa"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function FloatingWhatsApp() {
  const [phoneNumber, setPhoneNumber] = useState("6285803067018")
  
  useEffect(() => {
    async function fetchPhone() {
      const { data } = await supabase.from('profile').select('phone').single()
      if (data?.phone) {
        const cleanPhone = data.phone.replace(/[^0-9]/g, '')
        if (cleanPhone) setPhoneNumber(cleanPhone)
      }
    }
    fetchPhone()
  }, [])

  const defaultMessage = "Halo, saya melihat portofolio Anda dan tertarik untuk berdiskusi lebih lanjut mengenai project/jasa pembuatan website."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
      <FaWhatsapp className="h-8 w-8 relative z-10" />
      <span className="absolute -top-1 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white ring-2 ring-background">
        1
      </span>
    </a>
  )
}
