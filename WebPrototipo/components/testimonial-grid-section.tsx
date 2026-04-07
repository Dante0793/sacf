"use client"

import { useState } from "react"
import { motion } from "framer-motion"

// ── Mock Data de Testimonios ──
// Se añadieron 'initial' y 'color' para generar el avatar SVG en línea
const testimonials = [
  {
    quote:
      "SACF me ayudó a entender por qué gastaba impulsivamente. El coaching personalizado y el análisis de mis emociones fueron transformadores. Ahora tengo control de mis finanzas y de mis emociones.",
    name: "Annette Black",
    company: "La Paz, Bolivia",
    initial: "AB",
    color: "#0f766e", // Teal oscuro
    type: "large-teal",
  },
  {
    quote:
      "La gamificación hizo que aprender sobre finanzas sea divertido. Mis hijos también quieren aprender conmigo.",
    name: "Dianne Russell",
    company: "Santa Cruz, Bolivia",
    initial: "DR",
    color: "#b91c1c", // Rojo oscuro
    type: "small-dark",
  },
  {
    quote:
      "No es solo una app de presupuestos. La IA entiende mis patrones de comportamiento y me da consejos que realmente funcionan.",
    name: "Cameron Williamson",
    company: "Cochabamba, Bolivia",
    initial: "CW",
    color: "#4338ca", // Indigo
    type: "small-dark",
  },
  {
    quote:
      "Por primera vez tengo un coach financiero disponible 24/7. SACF cambió mi relación con el dinero.",
    name: "Robert Fox",
    company: "Oruro, Bolivia",
    initial: "RF",
    color: "#047857", // Esmeralda
    type: "small-dark",
  },
  {
    quote:
      "Empecé con el plan gratuito y en una semana me pasé a Premium. Es la inversión financiera mejor que he hecho.",
    name: "Darlene Robertson",
    company: "Sucre, Bolivia",
    initial: "DR",
    color: "#c2410c", // Naranja oscuro
    type: "small-dark",
  },
  {
    quote:
      "SACF identifica mis sesgos cognitivos con precisión. Ahora tomo decisiones financieras conscientes, no emocionales.",
    name: "Cody Fisher",
    company: "Tarija, Bolivia",
    initial: "CF",
    color: "#1d4ed8", // Azul
    type: "small-dark",
  },
  {
    quote:
      "Redujo mis gastos innecesarios en 40% en tres meses. Es lo más efectivo que he probado para cambiar mi comportamiento financiero.",
    name: "Albert Flores",
    company: "Potosí, Bolivia",
    initial: "AF",
    color: "#be185d", // Rosa oscuro
    type: "large-light",
  },
]

// ── Componente de Tarjeta ──
interface TestimonialCardProps {
  quote: string
  name: string
  company: string
  initial: string
  color: string
  type: string
}

const TestimonialCard = ({ quote, name, company, initial, color, type }: TestimonialCardProps) => {
  const isLargeCard = type.startsWith("large")
  const avatarSize = isLargeCard ? 48 : 36
  const padding = isLargeCard ? "p-6" : "p-[30px]"

  let cardClasses = `flex flex-col justify-between items-start overflow-hidden rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] relative ${padding}`
  let quoteClasses = ""
  let nameClasses = ""
  let companyClasses = ""
  let backgroundElements = null
  let cardHeight = ""
  const cardWidth = "w-full md:w-[384px]"

  // Estilos Condicionales por Tipo
  if (type === "large-teal") {
    cardClasses += " bg-teal-800" // Aseguramos un color base visible si no hay bg-primary configurado
    quoteClasses += " text-white text-2xl font-medium leading-8"
    nameClasses += " text-white text-base font-normal leading-6"
    companyClasses += " text-white/60 text-base font-normal leading-6"
    cardHeight = "h-[502px]"
    backgroundElements = (
      <div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ backgroundImage: "radial-gradient(circle at top right, rgba(255,255,255,0.4) 0%, transparent 50%)", zIndex: 0 }}
      />
    )
  } else if (type === "large-light") {
    cardClasses += " bg-gray-50 border border-gray-200"
    quoteClasses += " text-gray-900 text-2xl font-medium leading-8"
    nameClasses += " text-gray-900 text-base font-normal leading-6"
    companyClasses += " text-gray-500 text-base font-normal leading-6"
    cardHeight = "h-[502px]"
    backgroundElements = (
      <div
        className="absolute inset-0 w-full h-full opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at bottom left, rgba(0,0,0,0.2) 0%, transparent 50%)", zIndex: 0 }}
      />
    )
  } else {
    cardClasses += " bg-white outline outline-1 outline-gray-200 outline-offset-[-1px]"
    quoteClasses += " text-gray-700 text-[17px] font-normal leading-6"
    nameClasses += " text-gray-900 text-sm font-normal leading-[22px]"
    companyClasses += " text-gray-500 text-sm font-normal leading-[22px]"
    cardHeight = "h-[244px]"
  }

  return (
    <div className={`${cardClasses} ${cardWidth} ${cardHeight}`}>
      {backgroundElements}

      {/* Cita */}
      <div className={`relative z-10 font-normal break-words ${quoteClasses}`}>
        &ldquo;{quote}&rdquo;
      </div>

      {/* Perfil del Usuario */}
      <div className="relative z-10 flex justify-start items-center gap-3">
        {/* Avatar SVG (Generado con iniciales y color dinámico) */}
        <div
          className="flex items-center justify-center shrink-0 rounded-full text-white font-bold shadow-sm"
          style={{
            width: avatarSize,
            height: avatarSize,
            backgroundColor: color,
            fontSize: isLargeCard ? '16px' : '12px',
            border: "2px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          {initial}
        </div>

        <div className="flex flex-col justify-start items-start gap-0.5">
          <div className={nameClasses}>{name}</div>
          <div className={companyClasses}>{company}</div>
        </div>
      </div>
    </div>
  )
}

// ── Componente Principal de la Sección ──
export function TestimonialGridSection() {
  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start py-6 md:py-8 lg:py-14 bg-white font-sans">

      {/* Cabecera de la sección actualizada a SACF */}
      <div className="self-stretch py-6 md:py-8 lg:py-14 flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-gray-900 text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]">
            Control financiero sin esfuerzo
          </h2>
          <p className="self-stretch text-center text-gray-500 text-sm md:text-sm lg:text-base font-medium leading-[18.20px] md:leading-relaxed lg:leading-relaxed max-w-2xl mx-auto">
            Descubre cómo nuestros usuarios en Bolivia transforman sus hábitos de consumo, reducen deudas y toman decisiones conscientes usando la inteligencia artificial de SACF.
          </p>
        </div>
      </div>

      {/* Grilla Masonry de Testimonios */}
      <div className="w-full pt-0.5 pb-4 md:pb-6 lg:pb-10 flex flex-col md:flex-row justify-center items-start gap-4 md:gap-4 lg:gap-6 max-w-[1100px] mx-auto">
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[0]} />
          <TestimonialCard {...testimonials[1]} />
        </div>
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[2]} />
          <TestimonialCard {...testimonials[3]} />
          <TestimonialCard {...testimonials[4]} />
        </div>
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[5]} />
          <TestimonialCard {...testimonials[6]} />
        </div>
      </div>
    </section>
  )
}