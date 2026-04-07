"use client"

import {
  Hexagon,
  Triangle,
  Command,
  Aperture,
  Box,
  Cpu,
  Layers,
  Globe
} from "lucide-react"

// ── Mock Data de Empresas (Simulando SVGs) ──
const companies = [
  { name: "TechCruz", icon: Hexagon },
  { name: "FinanzaLab", icon: Triangle },
  { name: "Andina Pay", icon: Command },
  { name: "DataFlow", icon: Aperture },
  { name: "SecureBank", icon: Box },
  { name: "SmartWallet", icon: Cpu },
  { name: "Capital SCZ", icon: Layers },
  { name: "LatamTech", icon: Globe },
]

export function SocialProof() {
  return (
    <section className="self-stretch py-16 flex flex-col justify-center items-center gap-8 overflow-hidden bg-white border-y border-gray-100 font-sans">

      {/* Título adaptado al contexto boliviano / startup */}
      <div className="text-center text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest leading-tight">
        Con la confianza de empresas innovadoras en Bolivia
      </div>

      {/* Contenedor Flex para que se adapte perfectamente a cualquier pantalla */}
      <div className="w-full max-w-[1100px] flex flex-wrap justify-center items-center gap-x-12 gap-y-10 px-6">

        {companies.map((company, i) => {
          const Icon = company.icon
          return (
            <div
              key={i}
              className="group flex items-center justify-center gap-2.5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
            >
              {/* Icono del Logo */}
              <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-[#ca2c41]/10 transition-colors">
                <Icon size={24} strokeWidth={2.5} className="text-gray-700 group-hover:text-[#ca2c41] transition-colors" />
              </div>

              {/* Texto del Logo */}
              <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-800">
                {company.name}
              </span>
            </div>
          )
        })}

      </div>
    </section>
  )
}