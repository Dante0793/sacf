"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

// ── TLACUACHE LOGO (SVG inline, sin contenedor negro) ──
function TlacuacheLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm shrink-0"
    >
      {/* Orejas */}
      <circle cx="14" cy="16" r="8" fill="#2d2b3b" />
      <circle cx="38" cy="16" r="8" fill="#2d2b3b" />
      <circle cx="14" cy="16" r="4.5" fill="#4a4760" />
      <circle cx="38" cy="16" r="4.5" fill="#4a4760" />
      {/* Cara */}
      <path d="M7 24 C7 14, 45 14, 45 24 C45 34, 30 46, 26 48 C22 46, 7 34, 7 24 Z" fill="#2d2b3b" />
      {/* Mancha frente */}
      <path d="M18 12 Q26 28 34 12 L26 12 Z" fill="#1a1828" />
      {/* Ojos */}
      <circle cx="20" cy="27" r="3" fill="#fcfcfc" />
      <circle cx="32" cy="27" r="3" fill="#fcfcfc" />
      <circle cx="19.5" cy="26" r="1.5" fill="#2d2b3b" />
      <circle cx="31.5" cy="26" r="1.5" fill="#2d2b3b" />
      {/* Nariz */}
      <path d="M23 44 C23 41, 29 41, 29 44 L26 49 Z" fill="#ea580c" />
    </svg>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <TlacuacheLogo size={34} />
      <span className="text-xl font-bold font-sans tracking-[0.2em] text-[#2d2b3b]">
        S<span className="text-brand-accent">A</span>CF
      </span>
    </div>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const navItems = [
    { name: "Características", href: "#features-section" },
    { name: "Precios", href: "#pricing-section" },
    { name: "Testimonios", href: "#testimonials-section" },
    { name: "FAQ", href: "#faq-section" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.getElementById(href.substring(1))
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-[#e5e7eb]"
      }`}
    >
      <div className="max-w-7xl mx-auto h-14 px-5 md:px-8 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-[#2d2b3b]/55 hover:text-[#2d2b3b] hover:bg-[#f3f4f6] px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/login"
            className="text-xs font-bold uppercase tracking-widest text-[#2d2b3b]/55 hover:text-[#2d2b3b] transition-colors px-4 py-2 rounded-xl hover:bg-[#f3f4f6]"
          >
            Ingresar
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-primary-dark active:scale-95 transition-all shadow-sm"
          >
            Comenzar Gratis
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#f3f4f6] text-[#2d2b3b] transition-colors shrink-0">
              <Menu size={20} strokeWidth={2.5} />
              <span className="sr-only">Abrir menú</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white border-l border-[#e5e7eb] w-[280px] p-0">
            <SheetHeader className="p-6 pb-4 border-b border-[#e5e7eb]">
              <SheetTitle asChild>
                <div>
                  <Logo />
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-[#2d2b3b]/60 hover:text-[#2d2b3b] hover:bg-[#f3f4f6] px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#e5e7eb]">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-center text-xs font-bold uppercase tracking-widest text-[#2d2b3b] border border-[#e5e7eb] px-5 py-3 rounded-xl hover:bg-[#f3f4f6] transition-colors"
                >
                  Ingresar
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="text-center bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Comenzar Gratis
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}