"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "¿Qué es SACF y para quién es?",
    answer:
      "SACF (Sistema Avanzado de Control Financiero Conductual) es una plataforma integral diseñada para personas que quieren transformar su relación con el dinero. Combinamos inteligencia artificial conductual, coaching humano especializado y educación gamificada. Es perfecta para personas que gastan emocionalmente, quieren cambiar hábitos financieros y entender por qué toman decisiones de dinero irracionales.",
  },
  {
    question: "¿Cómo funciona la inteligencia artificial conductual de SACF?",
    answer:
      "Nuestra IA no solo registra gastos, analiza tus patrones psicológicos. Identifica cuándo gastas por estrés, depresión, alegría o impulsividad. Entiende tus sesgos cognitivos como la aversión a pérdidas o el sesgo de confirmación. Luego adapta coaching personalizado para cambiar patrones de comportamiento, no solo números.",
  },
  {
    question: "¿Cómo es diferente SACF a Mint, YNAB o Fintonic?",
    answer:
      "Esas apps son excelentes para registrar gastos y presupuestos, pero omiten la dimensión psicológica. SACF agrega coaching humano especializado, análisis emocional de gastos, y educación gamificada que realmente cambia comportamiento. No solo te dice cuánto gastas, sino por qué lo haces y cómo cambiar.",
  },
  {
    question: "¿Qué incluye el plan Libre?",
    answer:
      "El plan Libre incluye seguimiento básico de gastos, acceso a educación gamificada, reportes mensuales y comunidad de usuarios. Es perfecto para comenzar tu transformación sin inversión inicial. Puedes actualizar a Premium cuando estés listo.",
  },
  {
    question: "¿Cómo funciona el coaching personalizado?",
    answer:
      "Nuestros coaches son especialistas en finanzas conductuales. Basándose en tus patrones de gasto, emociones y sesgos identificados por la IA, crean planes personalizados. En Premium tienes acceso mensual a coaching. En Profesional tienes un coach dedicado para orientación continua.",
  },
  {
    question: "¿Es segura mi información financiera?",
    answer:
      "Absolutamente. Usamos encriptación de nivel empresarial, transmisión segura de datos y cumplimos con regulaciones internacionales. Tu información nunca se comparte sin tu permiso explícito. Todos los datos están alojados en servidores seguros en América Latina.",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-left transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground-dark transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="w-full max-w-[435px] text-center text-foreground text-4xl font-semibold leading-10 break-words">
            Preguntas Frecuentes
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
            Todo lo que necesitas saber sobre SACF y cómo transformará tu relación con el dinero
          </p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}
