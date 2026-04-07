"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  const pricingPlans = [
    {
      name: "Libre",
      monthlyPrice: "0 Bs.",
      annualPrice: "0 Bs.",
      description: "Perfecto para comenzar tu transformación.",
      features: [
        "Seguimiento básico de gastos",
        "IA conductual limitada",
        "Acceso a educación gamificada",
        "Reportes mensuales",
        "Comunidad de usuarios",
      ],
      buttonText: "Comenzar",
      buttonClass:
        "bg-gray-100 outline outline-1 outline-gray-200 text-gray-900 hover:bg-gray-200 transition-colors",
    },
    {
      name: "Premium",
      monthlyPrice: "25 Bs.",
      annualPrice: "20 Bs.",
      description: "Ideal para cambio real de comportamiento.",
      features: [
        "Análisis psicológico completo de gastos",
        "IA conductual avanzada 24/7",
        "Coaching personalizado mensual",
        "Acceso a todos los módulos educativos",
        "Seguimiento emocional integrado",
        "Recomendaciones inteligentes ilimitadas",
        "Soporte prioritario",
      ],
      buttonText: "Suscribirse",
      buttonClass:
        "bg-success shadow-md text-success-foreground hover:bg-success/90 transition-colors border-0",
      popular: true,
    },
    {
      name: "Profesional",
      monthlyPrice: "60 Bs.",
      annualPrice: "50 Bs.",
      description: "Para familias y equipos empresariales.",
      features: [
        "Coaching dedicado especializado",
        "Acceso familiar (hasta 5 miembros)",
        "Análisis avanzado de patrones conductuales",
        "Reportes ejecutivos personalizados",
        "Integración con asesor financiero",
        "Soporte directo por WhatsApp",
      ],
      buttonText: "Contactar Ventas",
      buttonClass:
        "bg-gray-100 outline outline-1 outline-gray-200 text-gray-900 hover:bg-gray-200 transition-colors",
    },
  ]

  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start items-center my-0 py-8 md:py-14 font-sans">
      <div className="self-stretch relative flex flex-col justify-center items-center gap-2 py-0">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-4xl md:text-5xl font-bold tracking-tight leading-tight md:leading-[40px]">
            Planes para tu transformación financiera
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Elige un plan adaptado a tus necesidades. Desde el inicio con acceso gratuito a coaching especializado con soporte total.
          </p>
        </div>

        {/* Toggle Anual/Mensual */}
        <div className="pt-6">
          <div className="p-1 bg-gray-100 rounded-xl border border-gray-200 flex justify-start items-center relative">
            <button
              onClick={() => setIsAnnual(true)}
              className="relative px-4 py-2 flex justify-center items-center rounded-lg w-28"
            >
              <span
                className={`relative z-10 text-center text-sm font-bold transition-colors duration-200 ${isAnnual ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
              >
                Anual
              </span>
              {isAnnual && (
                <motion.div
                  layoutId="pricing-toggle-bg"
                  className="absolute inset-0 bg-white shadow-sm rounded-lg border border-gray-200/50"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
            <button
              onClick={() => setIsAnnual(false)}
              className="relative px-4 py-2 flex justify-center items-center rounded-lg w-28"
            >
              <span
                className={`relative z-10 text-center text-sm font-bold transition-colors duration-200 ${!isAnnual ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
              >
                Mensual
              </span>
              {!isAnnual && (
                <motion.div
                  layoutId="pricing-toggle-bg"
                  className="absolute inset-0 bg-white shadow-sm rounded-lg border border-gray-200/50"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="self-stretch px-5 flex flex-col md:flex-row justify-start items-start gap-4 md:gap-6 mt-10 max-w-[1100px] mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`flex-1 p-6 md:p-8 overflow-hidden rounded-2xl flex flex-col justify-start items-start gap-6 transition-all duration-300 ${plan.popular
                ? "bg-[#ca2c41] shadow-[0px_8px_20px_-4px_rgba(202,44,65,0.3)] md:scale-105 z-10"
                : "bg-white border border-gray-200 shadow-sm mt-0 md:mt-4"
              }`}
          >
            <div className="self-stretch flex flex-col justify-start items-start gap-6">
              <div className="self-stretch flex flex-col justify-start items-start gap-6">

                {/* Título y Badge Popular */}
                <div className={`w-full flex items-center h-5 text-sm font-bold tracking-widest uppercase ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                  {plan.popular && (
                    <div className="ml-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <span className="text-center text-white text-[10px] font-bold tracking-widest uppercase">
                        Popular
                      </span>
                    </div>
                  )}
                </div>

                {/* Precios */}
                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                  <div className="flex justify-start items-baseline gap-1.5">
                    <div className={`relative h-12 flex items-baseline text-4xl md:text-5xl font-black ${plan.popular ? "text-white" : "text-gray-900"}`}>
                      <span className="invisible">{isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                      <span
                        className="absolute inset-0 flex items-center transition-all duration-500 origin-left"
                        style={{
                          opacity: isAnnual ? 1 : 0,
                          transform: `scale(${isAnnual ? 1 : 0.8})`,
                          filter: `blur(${isAnnual ? 0 : 4}px)`,
                        }}
                        aria-hidden={!isAnnual}
                      >
                        {plan.annualPrice}
                      </span>
                      <span
                        className="absolute inset-0 flex items-center transition-all duration-500 origin-left"
                        style={{
                          opacity: !isAnnual ? 1 : 0,
                          transform: `scale(${!isAnnual ? 1 : 0.8})`,
                          filter: `blur(${!isAnnual ? 0 : 4}px)`,
                        }}
                        aria-hidden={isAnnual}
                      >
                        {plan.monthlyPrice}
                      </span>
                    </div>
                    <div className={`text-sm font-bold uppercase tracking-widest ${plan.popular ? "text-white/70" : "text-gray-400"}`}>
                      /mes
                    </div>
                  </div>
                  <div className={`self-stretch text-sm font-medium leading-relaxed mt-2 ${plan.popular ? "text-white/90" : "text-gray-500"}`}>
                    {plan.description}
                  </div>
                </div>
              </div>

              {/* Botón */}
              <Button
                className={`self-stretch py-6 rounded-xl flex justify-center items-center w-full font-bold uppercase tracking-widest text-xs ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </Button>
            </div>

            {/* Features */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4 mt-2">
              <div className={`self-stretch text-sm font-bold tracking-widest uppercase ${plan.popular ? "text-white/90" : "text-gray-900"}`}>
                {plan.name === "Libre" ? "Incluye:" : "Todo lo del plan Libre +"}
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
                {plan.features.map((feature) => (
                  <div key={feature} className="self-stretch flex justify-start items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                      <Check
                        className={`w-full h-full ${plan.popular ? "text-white" : "text-[#ca2c41]"}`}
                        strokeWidth={3}
                      />
                    </div>
                    <div className={`leading-snug font-medium text-sm text-left ${plan.popular ? "text-white" : "text-gray-600"}`}>
                      {feature}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}