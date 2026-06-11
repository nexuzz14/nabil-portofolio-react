import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

import FloatingWhatsApp from '@/components/floating-whatsapp'

const siteUrl = 'https://nabilcf.my.id'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'M Nabil CF | Full-Stack Developer & Freelance Engineer',
  description: 'Portfolio of Muhammad Nabil Cahya Firdaus, a Full-Stack Developer and freelance engineer experienced in Laravel, React, Next.js, and more. Available for freelance projects.',
  keywords: ['Full-stack developer', 'Laravel', 'React', 'Next.js', 'Freelance Web Developer', 'Jasa Pembuatan Website', 'Programmer', 'Magelang', 'Web Developer Indonesia', 'Portfolio'],
  authors: [{ name: 'M Nabil Cahya Firdaus', url: siteUrl }],
  creator: 'M Nabil Cahya Firdaus',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'M Nabil CF | Full-Stack Developer & Freelance Engineer',
    description: 'Portfolio of Muhammad Nabil Cahya Firdaus, available for full-stack web development and freelance projects.',
    url: siteUrl,
    siteName: 'M Nabil CF Portfolio',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'M Nabil CF — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'M Nabil CF | Full-Stack Developer & Freelance Engineer',
    description: 'Portfolio of Muhammad Nabil Cahya Firdaus — Full-Stack Developer available for freelance projects.',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Nabil Cahya Firdaus',
  alternateName: 'M Nabil CF',
  url: siteUrl,
  image: `${siteUrl}/icon.png`,
  jobTitle: 'Full-Stack Developer',
  description: 'Full-Stack Developer and freelance engineer experienced in Laravel, React, Next.js, and more.',
  sameAs: [
    'https://github.com/nexuzz14',
    'https://linkedin.com/in/nabilcf',
  ],
  knowsAbout: ['Web Development', 'React', 'Next.js', 'Laravel', 'Full-Stack Development', 'Freelance Engineering'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
