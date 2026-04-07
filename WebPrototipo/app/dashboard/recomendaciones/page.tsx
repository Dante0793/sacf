"use client"

import { motion } from "framer-motion"
import {
  Brain,
  AlertOctagon,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  LineChart,
  CheckCircle,
} from "lucide-react"

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function RecomendacionesPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-full">
      {/* ── Editorial Paper Wrapper ── */}
      <div className="bg-[#fbfbfb] rounded-2xl w-full min-h-[85vh] p-6 sm:p-10 shadow-xl overflow-hidden text-[#2d2b3b] font-sans border border-[#e5e7eb] relative flex flex-col gap-6">
        
        {/* ── Page Header ── */}
        <motion.div
          {...fadeUp}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2 mt-4 flex flex-wrap items-center gap-4">
              Análisis <span className="text-[#4c1d95] italic">Conductual</span>
              <div className="flex items-center gap-1.5 bg-[#4c1d95]/10 border border-[#4c1d95]/20 px-3 py-1 rounded-full h-fit mt-1">
                <Brain size={14} className="text-[#4c1d95] animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-[#4c1d95] tracking-widest">Motor IA Activo</span>
              </div>
            </h1>
            <p className="text-sm font-bold font-sans text-[#2d2b3b]/60 uppercase tracking-widest pb-4 border-b border-[#2d2b3b]/10 inline-block pr-6 mt-2">
              Recomendaciones basadas en tus patrones de consumo
            </p>
          </div>
        </motion.div>

        {/* ── Main Insights ── */}
        <div className="grid gap-6">
          {/* Critical Alert - Impulsive buying */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-[#ca2c41]/20 bg-gradient-to-br from-[#ca2c41]/5 to-transparent p-6 sm:p-8 relative overflow-hidden group shadow-sm"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <AlertOctagon size={180} className="text-[#ca2c41]" />
            </div>
            
            <div className="relative z-10 w-full max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#ca2c41]/10 flex items-center justify-center text-[#ca2c41] border border-[#ca2c41]/20 shadow-[0_0_15px_rgba(202,44,65,0.1)]">
                  <AlertOctagon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-sans text-[#ca2c41] uppercase tracking-wider mb-0.5">Alerta de Fricción Financiera</h3>
                  <p className="text-xs font-bold text-[#ca2c41]/60 uppercase tracking-widest">Detectado por incremento inusual (Fines de semana)</p>
                </div>
              </div>
              
              <p className="text-[#2d2b3b]/80 text-[15px] leading-relaxed mb-6 font-medium">
                Hemos notado una aceleración del <span className="font-black text-[#ca2c41]">45%</span> en flujo de salida hacia <span className="italic font-serif font-bold">Comida Delivery</span> los fines de semana a partir de las 10:00 PM. Este patrón suele correlacionarse con <strong className="text-[#2d2b3b]">fatiga cognitiva</strong> más que con necesidad calórica.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-[#ca2c41]/10">
                <button className="bg-[#ca2c41] text-white font-bold tracking-widest uppercase px-6 py-3 rounded-lg hover:bg-[#a02030] shadow-md hover:shadow-lg transition-all text-xs flex items-center justify-center gap-2">
                  Bloquear App de Delivery en ese horario
                  <ArrowRight size={14} className="stroke-[3]" />
                </button>
                <button className="bg-transparent border-2 border-[#ca2c41]/20 text-[#ca2c41] font-bold tracking-widest uppercase px-6 py-3 rounded-lg hover:bg-[#ca2c41]/5 transition-colors text-xs">
                  Modo Observador Activo
                </button>
              </div>
            </div>
          </motion.div>

          {/* Opportunity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-[#10b981]/20 bg-white p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] border border-[#10b981]/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Lightbulb size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans text-[#2d2b3b] uppercase tracking-wider mb-0.5">Fuga de Capital</h3>
                  <p className="text-[10px] font-bold text-[#2d2b3b]/50 uppercase tracking-widest">Optimización de Suscripciones</p>
                </div>
              </div>
              
              <p className="text-[#2d2b3b]/70 text-sm leading-relaxed mb-6">
                Tu índice de uso de <strong className="text-[#2d2b3b]">Netflix</strong> ha caído a 0 horas en los últimos 3 meses, incurriendo en un costo sin retorno. Igualmente tu plan <strong className="text-[#2d2b3b]">Spotify Familiar</strong> está subutilizado.
              </p>

              <div className="bg-[#fbfbfb] border border-[#e5e7eb] rounded-xl p-4 flex justify-between items-center mb-6 shadow-inner">
                <span className="text-[11px] font-bold text-[#2d2b3b]/50 uppercase tracking-widest">Potencial de Ahorro Anual</span>
                <span className="text-2xl font-black font-mono text-[#10b981]">Bs 850</span>
              </div>

              <button className="w-full bg-white border-2 border-[#e5e7eb] text-[#2d2b3b] font-bold uppercase tracking-widest px-4 py-3 rounded-lg hover:bg-[#fbfbfb] hover:border-[#2d2b3b]/10 transition-colors text-[11px] flex justify-center items-center gap-2">
                Auditar Suscripciones Activas
              </button>
            </motion.div>

            {/* Investment habit */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-[#38bdf8]/20 bg-white p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8] border border-[#38bdf8]/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                  <LineChart size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans text-[#2d2b3b] uppercase tracking-wider mb-0.5">Ciclo de Inversión</h3>
                  <p className="text-[10px] font-bold text-[#2d2b3b]/50 uppercase tracking-widest">Fondo de Emergencia Consolidado</p>
                </div>
              </div>
              
              <p className="text-[#2d2b3b]/70 text-sm leading-relaxed mb-6">
                El colchón líquido (3x gastos operativos) ha sido completado con éxito. Todo flujo adicional debería ser inyectado en instrumentos de renta fija para combatir la inflación.
              </p>

              <div className="bg-[#fbfbfb] border border-[#e5e7eb] rounded-xl p-4 flex justify-between items-center mb-6 shadow-inner">
                <span className="text-[11px] font-bold text-[#2d2b3b]/50 uppercase tracking-widest">Capacidad Inversora Mensual</span>
                <span className="text-2xl font-black font-mono text-[#38bdf8]">Bs 920</span>
              </div>

              <button className="w-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#0284c7] font-bold tracking-widest uppercase px-4 py-3 rounded-lg hover:bg-[#38bdf8]/20 transition-colors text-[11px] flex justify-center items-center gap-2">
                Explorar Instrumentos de Riesgo Moderado
              </button>
            </motion.div>
          </div>
        </div>

        {/* ── Impact history ── */}
        <div className="mt-4">
          <h2 className="text-lg font-black font-serif italic text-[#2d2b3b] mb-4">Impacto Cuantificable</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: "Capital Recuperado", value: "Bs 4,250", icon: TrendingUp, color: "text-[#10b981]" },
              { label: "Fricciones Evitadas", value: "24", icon: CheckCircle, color: "text-[#38bdf8]" },
              { label: "Score Conductual", value: "85/100", icon: Brain, color: "text-[#4c1d95]" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="rounded-2xl border border-[#e5e7eb] bg-white p-6 flex flex-col items-center justify-center text-center shadow-sm group hover:border-[#2d2b3b]/20 transition-all"
              >
                <stat.icon size={24} className={`mb-3 ${stat.color} opacity-80 group-hover:scale-110 transition-transform`} />
                <div className="text-3xl font-black font-mono text-[#2d2b3b]">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
