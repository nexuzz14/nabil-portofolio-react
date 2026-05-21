import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'M Nabil CF | Full-Stack Developer & Freelance Engineer',
  description: 'Portfolio of Muhammad Nabil Cahya Firdaus, a Full-Stack Developer and freelance engineer experienced in Laravel, React, Next.js, and more. Available for freelance projects (Joki Proyek).',
  keywords: ['Full-stack developer', 'Laravel', 'React', 'Next.js', 'Freelance Web Developer', 'Jasa Pembuatan Website', 'Joki Proyek IT', 'Programmer', 'Magelang'],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'M Nabil CF | Full-Stack Developer',
    description: 'Portfolio of Muhammad Nabil Cahya Firdaus, available for full-stack web development and freelance projects.',
    type: 'website',
  }
}

import FloatingWhatsApp from '@/components/floating-whatsapp'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
