import type { Metadata } from 'next'
import { Geist, Geist_Mono, Merriweather } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-serif", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: 'SACF - Sistema Avanzado de Control Financiero Conductual',
  description: 'Controla tu dinero, no tus emociones. Inteligencia artificial conductual, coaching humano especializado y educación financiera gamificada en una única plataforma.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.variable} ${_geistMono.variable} ${merriweather.variable} font-sans antialiased bg-[#fbfbfb] text-[#2d2b3b]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
