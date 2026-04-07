"use client"

import { Twitter, Github, Linkedin } from "lucide-react"

// ── COMPONENTE DE LOGO ──
function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 drop-shadow-sm"
      >
        <circle cx="25" cy="30" r="14" fill="#1a1a1a" />
        <circle cx="75" cy="30" r="14" fill="#1a1a1a" />
        <circle cx="25" cy="30" r="6" fill="#f3f4f6" />
        <circle cx="75" cy="30" r="6" fill="#f3f4f6" />
        <path d="M50 92 L18 45 Q18 20 50 20 Z" fill="#ffffff" />
        <path d="M50 92 L82 45 Q82 20 50 20 Z" fill="#e5e7eb" />
        <path d="M50 55 L28 22 Q50 10 72 22 Z" fill="#1a1a1a" />
        <circle cx="36" cy="50" r="5" fill="#1a1a1a" />
        <circle cx="64" cy="50" r="5" fill="#1a1a1a" />
        <path d="M50 92 L43 78 Q50 74 57 78 Z" fill="#f43f5e" />
      </svg> */}
      <span className="text-foreground text-2xl font-black font-serif italic tracking-widest flex items-baseline">
        S<span className="text-[#f43f5e] -ml-0.5">A</span>CF
      </span>
    </div>
  )
}

export function FooterSection() {
  return (
    <footer className="w-full bg-[#fbfbfb] border-t border-gray-200 pt-16 pb-8 font-sans">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-16">

          {/* Left Section: Logo & Description */}
          <div className="flex flex-col justify-start items-start gap-6 max-w-sm">
            <Logo />
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Sistema Avanzado de Control Financiero Conductual.
              Toma el control de tus finanzas y cambia tu relación con el dinero mediante inteligencia artificial y coaching especializado.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" aria-label="Twitter" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-gray-400 hover:text-gray-900 text-gray-500 transition-all shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="GitHub" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-gray-400 hover:text-gray-900 text-gray-500 transition-all shadow-sm">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-gray-400 hover:text-gray-900 text-gray-500 transition-all shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Section: Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full lg:w-auto">
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-900 text-sm font-bold uppercase tracking-widest">Producto</h3>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Características</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Precios</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">IA Conductual</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Coaching</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Educación Gamificada</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-900 text-sm font-bold uppercase tracking-widest">Empresa</h3>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Acerca de nosotros</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Nuestro equipo</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Empleos</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Marca</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Contacto</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-900 text-sm font-bold uppercase tracking-widest">Recursos</h3>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Términos de uso</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Privacidad</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Documentación</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Comunidad</a>
                <a href="#" className="text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors">Soporte</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-medium">
            © {new Date().getFullYear()} SACF. Todos los derechos reservados.
          </p>
          <div className="text-gray-400 text-xs font-medium">
            Hecho con dedicación en Santa Cruz, Bolivia.
          </div>
        </div>
      </div>
    </footer>
  )
}