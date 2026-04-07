"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  AreaChart, Area, Tooltip
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { getPerfilData } from "@/app/actions/dashboard"

// Mini-charts para métricas (estáticos para visualización)
const chartAhorro = [{v: 4}, {v: 6}, {v: 5}, {v: 8}, {v: 7}, {v: 9}]
const chartImpulsos = [{v: 8}, {v: 7}, {v: 5}, {v: 4}, {v: 6}, {v: 5}]
const chartInversion = [{v: 9}, {v: 8}, {v: 8}, {v: 8}, {v: 9}, {v: 9}]

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function PerfilFinancieroPage() {
  const [activeTab, setActiveTab] = useState<"resultados" | "historial">("resultados")
  const [perfilData, setPerfilData] = useState<any>(null)

  useEffect(() => {
    getPerfilData().then(setPerfilData)
  }, [])

  const radarData = perfilData?.radarData || [
    { aspect: "AHORRO", score: 50, fullMark: 100 },
    { aspect: "AUTOCONTROL", score: 50, fullMark: 100 },
    { aspect: "USO DE CRÉDITO", score: 50, fullMark: 100 },
    { aspect: "PLANIFICACIÓN", score: 50, fullMark: 100 },
    { aspect: "INVERSIONES", score: 50, fullMark: 100 },
  ]
  const behaviourLog = perfilData?.behaviourLog || []
  const totalScore = perfilData?.totalScore || 50
  const userName = perfilData?.user?.name?.split(" ")[0] || "Usuario"

  return (
    <div className="flex flex-col w-full h-full min-h-full">
      <div className="bg-[#fbfbfb] rounded-2xl w-full min-h-[85vh] p-6 sm:p-10 shadow-xl overflow-hidden text-[#2d2b3b] font-sans border border-[#e5e7eb] relative flex flex-col">

        {/* ── Minimalist Top Nav ── */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b-2 border-[#2d2b3b]/10 pb-4 gap-4">
          <div className="flex gap-6 text-sm font-bold tracking-wider text-[#2d2b3b]/80 uppercase">
            <span 
              onClick={() => setActiveTab("resultados")}
              className={`cursor-pointer pb-1 transition-colors border-b-2 ${activeTab === "resultados" ? "border-[#4c1d95] text-[#2d2b3b]" : "border-transparent hover:text-[#2d2b3b] text-[#2d2b3b]/50"}`}
            >
              Tus Resultados
            </span>
            <span 
              onClick={() => setActiveTab("historial")}
              className={`cursor-pointer pb-1 transition-colors border-b-2 ${activeTab === "historial" ? "border-[#4c1d95] text-[#2d2b3b]" : "border-transparent hover:text-[#2d2b3b] text-[#2d2b3b]/50"}`}
            >
              Historial de Puntos
            </span>
          </div>

          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <span className="text-[10px] text-[#2d2b3b]/50 font-bold uppercase tracking-widest block">Puntaje Total</span>
               <span className="text-xl font-mono font-black text-[#4c1d95]">{totalScore}<span className="text-xs text-[#2d2b3b]/50">/100</span></span>
             </div>
          </div>
        </header>

        {/* ── Tabs Content ── */}
        <div className="flex-1 w-full relative">
          <AnimatePresence mode="wait">
             {activeTab === "resultados" ? (
                // ── Pestaña: Resultados Principales ──
                <motion.div 
                   key="resultados"
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -10 }}
                   transition={{ duration: 0.3 }}
                   className="flex flex-col lg:flex-row gap-12 flex-1 w-full"
                >
                  
                  {/* ── Izquierda: Perfil y Radar ── */}
                  <div className="w-full lg:w-[45%] flex flex-col pt-2">
                     <motion.div {...fadeUp} className="flex flex-col">
                        <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                          TU <span className="text-[#4c1d95] italic">PERFIL</span>
                        </h1>
                        <p className="text-sm font-bold font-sans text-[#2d2b3b]/60 uppercase tracking-widest pb-4 border-b border-[#2d2b3b]/10 mb-8 inline-block pr-4">
                          {userName} | Qué tipo de inversor eres
                        </p>

                        <div className="bg-[#4c1d95] text-white p-6 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden mb-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                           
                           <div className="relative z-10 flex flex-col gap-2">
                              <span className="text-[10px] uppercase tracking-widest font-black text-[#78fcd6] bg-[#78fcd6]/10 px-2 py-0.5 rounded-sm w-fit border border-[#78fcd6]/20">
                                Perfil Principal
                              </span>
                              <h3 className="text-3xl font-serif italic font-bold">Ahorrador Cauteloso</h3>
                              <p className="text-sm text-white/80 leading-relaxed font-sans mt-2 max-w-[85%]">
                                Eres excelente evitando gastar de más, pero te da algo de temor invertir. No dejes tu dinero dormir a solas, la inflación bajará su valor mensual.
                              </p>
                           </div>
                           
                           <div className="relative z-10 hidden sm:flex flex-col items-center justify-center w-16 h-16 border-2 border-[#78fcd6]/30 rounded-full shrink-0 bg-[#4c1d95] shadow-inner">
                              <span className="text-2xl font-black text-[#78fcd6] font-serif">AC</span>
                           </div>
                        </div>

                        {/* MEJORA GRÁFICA: Radar interactivo con Tooltip y sin textTransform (Error TS arreglado) */}
                        <div className="flex justify-between items-end mb-4">
                           <h3 className="text-2xl font-serif italic text-[#2d2b3b]">
                             Tus Habilidades Financieras
                           </h3>
                        </div>
                        <div className="w-full h-[320px] bg-white border border-[#2d2b3b]/5 rounded-2xl shadow-sm relative -ml-4 group">
                           <ResponsiveContainer width="100%" height="100%">
                             <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                               <PolarGrid stroke="#2d2b3b" strokeOpacity={0.06} />
                               <PolarAngleAxis dataKey="aspect" tick={{ fill: "#2d2b3b", fontSize: 10, fontWeight: "900", fontFamily: "monospace" }} />
                               <Tooltip 
                                 wrapperStyle={{ outline: 'none' }}
                                 contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', fontWeight: 'bold', fontSize: '12px' }}
                                 itemStyle={{ color: '#4c1d95', fontWeight: '900' }}
                               />
                               <Radar 
                                  name="Puntaje" 
                                  dataKey="score" 
                                  stroke="#4c1d95" 
                                  strokeWidth={3} 
                                  fill="#4c1d95" 
                                  fillOpacity={0.12} 
                                  isAnimationActive={true}
                                  animationBegin={100}
                                  animationDuration={1500}
                                  animationEasing="ease-out"
                                />
                             </RadarChart>
                           </ResponsiveContainer>
                        </div>
                     </motion.div>
                  </div>

                  {/* ── Derecha: Métricas y Timeline Preview ── */}
                  <div className="w-full lg:w-[55%] flex flex-col gap-8 pt-2">
                    
                     <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="grid grid-cols-3 gap-4">
                        <div className="bg-white border border-[#2d2b3b]/10 p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#10b981]/50 hover:shadow-md transition-all">
                           <div className="absolute top-0 right-0 w-8 h-8 bg-[#10b981]/5 rounded-bl-full" />
                           <div className="flex flex-col mb-4">
                              <span className="text-[10px] text-[#2d2b3b]/40 tracking-widest uppercase font-bold">Nivel Ahorro</span>
                              <span className="text-3xl font-black font-mono text-[#2d2b3b] leading-none mt-1 group-hover:text-[#10b981] transition-colors">{radarData.find((r: any) => r.aspect === "AHORRO")?.score || 50}</span>
                           </div>
                           <div className="w-full h-8 opacity-40 group-hover:opacity-100 transition-opacity">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={chartAhorro}>
                                    <Area type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.1} isAnimationActive={true} animationDuration={1800} animationBegin={200} />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>

                        <div className="bg-white border border-[#2d2b3b]/10 p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#ca2c41]/50 hover:shadow-md transition-all">
                           <div className="absolute top-0 right-0 w-8 h-8 bg-[#ca2c41]/5 rounded-bl-full" />
                           <div className="flex flex-col mb-4">
                              <span className="text-[10px] text-[#2d2b3b]/40 tracking-widest uppercase font-bold">Autocontrol</span>
                              <span className="text-3xl font-black font-mono text-[#ca2c41] leading-none mt-1 group-hover:scale-110 origin-left transition-transform">{radarData.find((r: any) => r.aspect === "AUTOCONTROL")?.score || 50}</span>
                           </div>
                           <div className="w-full h-8 opacity-40 group-hover:opacity-100 transition-opacity">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={chartImpulsos}>
                                    <Area type="step" dataKey="v" stroke="#ca2c41" strokeWidth={2} fill="transparent" isAnimationActive={true} animationDuration={1800} animationBegin={400} />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>

                        <div className="bg-white border border-[#2d2b3b]/10 p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#f59e0b]/50 hover:shadow-md transition-all">
                           <div className="absolute top-0 right-0 w-8 h-8 bg-[#f59e0b]/5 rounded-bl-full" />
                           <div className="flex flex-col mb-4">
                              <span className="text-[10px] text-[#2d2b3b]/40 tracking-widest uppercase font-bold">Inversiones</span>
                              <span className="text-3xl font-black font-mono text-[#2d2b3b] leading-none mt-1 group-hover:text-[#f59e0b] transition-colors">{radarData.find((r: any) => r.aspect === "INVERSIONES")?.score || 50}</span>
                           </div>
                           <div className="w-full h-8 opacity-40 group-hover:opacity-100 transition-opacity">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={chartInversion}>
                                    <defs>
                                      <linearGradient id="colorO" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                      </linearGradient>
                                    </defs>
                                    <Area type="stepAfter" dataKey="v" stroke="#f59e0b" strokeWidth={2} fill="url(#colorO)" isAnimationActive={true} animationDuration={1800} animationBegin={600} />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                     </motion.div>

                     {/* Previsualización del Timeline (Simplificada para la pestaña de Resultados) */}
                     <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="bg-white border border-[#e5e7eb] rounded-2xl p-6 md:p-8 flex-1 shadow-sm flex flex-col">
                        <div className="flex justify-between items-end border-b-2 border-[#2d2b3b]/10 pb-4 mb-6">
                           <div>
                             <h3 className="text-xl font-black text-[#2d2b3b] font-sans uppercase tracking-tight">Registro de Puntos</h3>
                             <p className="text-[10px] text-[#2d2b3b]/50 tracking-widest font-bold uppercase mt-1">Cómo tus acciones suman a tu perfil</p>
                           </div>
                        </div>

                        <div className="flex flex-col relative w-full h-full pb-2 overflow-hidden">
                            <div className="absolute left-[85px] top-2 bottom-0 w-px bg-[#2d2b3b]/10 -z-0" />

                            {/* Muestra solo los primeros 3 en la vista principal */}
                            {behaviourLog.slice(0, 3).map((log: any, idx: number) => (
                               <div key={idx} className="flex items-start w-full gap-5 group py-4 relative z-10 transition-colors hover:bg-[#f3f4f6]/40 rounded-xl px-2">
                                  <div className="flex flex-col items-end shrink-0 w-[55px] pt-1">
                                     <span className="text-[10px] font-bold text-[#2d2b3b]/40 uppercase tracking-widest leading-none mb-1">
                                       {log.date.split(",")[0]}
                                     </span>
                                     <span className="text-[13px] font-mono font-bold text-[#2d2b3b]">
                                       {log.time}
                                     </span>
                                  </div>

                                  <div className="relative shrink-0 flex items-center justify-center">
                                     <motion.div 
                                       initial={{ scale: 0, opacity: 0 }}
                                       animate={{ scale: 1, opacity: 1 }}
                                       transition={{ delay: 0.4 + (idx * 0.15), type: "spring", stiffness: 200, damping: 12 }}
                                       className={`text-[10px] font-mono font-black border-2 border-white rounded-full flex items-center justify-center px-1.5 py-0.5 shadow-sm min-w-[36px] ${log.color.replace('bg-', 'text-').replace('[', '').replace(']', '')} bg-white z-10`} style={{ color: log.color.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/)?.[0] || '#2d2b3b' }}>
                                        {log.impact}
                                     </motion.div>
                                  </div>

                                  <div className="flex flex-col flex-1 pt-0.5 pr-2">
                                     <h4 className="text-[14px] font-bold font-sans text-[#2d2b3b] leading-tight mb-1">
                                       {log.action}
                                     </h4>
                                     <div className="flex items-center gap-2 mt-1">
                                       <Badge variant="outline" className={`border-0 text-[9px] px-2 py-0.5 rounded-sm uppercase tracking-wider text-white ${log.color}`}>
                                         {log.category}
                                       </Badge>
                                     </div>
                                  </div>
                               </div>
                            ))}

                            <button 
                              onClick={() => setActiveTab("historial")}
                              className="w-full mt-4 py-3 border-t border-dashed border-[#2d2b3b]/10 text-center text-[#4c1d95] text-[10px] tracking-widest uppercase font-black hover:bg-gray-50 transition-colors rounded-b-xl"
                            >
                              Ver todos los movimientos
                            </button>
                        </div>
                     </motion.div>

                  </div>
                </motion.div>
             ) : (
                // ── Pestaña: Historial Completo de Puntos ──
                <motion.div 
                   key="historial"
                   initial={{ opacity: 0, x: 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 10 }}
                   transition={{ duration: 0.3 }}
                   className="flex justify-center w-full pb-8"
                >
                    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 md:p-10 flex flex-col w-full max-w-4xl shadow-md mt-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#2d2b3b]/10 pb-6 mb-8 gap-4">
                           <div>
                             <h3 className="text-3xl font-black font-serif italic text-[#2d2b3b] tracking-tight">Tu Historial Completo</h3>
                             <p className="text-[12px] text-[#2d2b3b]/50 tracking-widest font-bold uppercase mt-2">Cómo sumaste o restaste puntos financieros este mes</p>
                           </div>
                           <Badge variant="outline" className="border-[#4c1d95]/30 text-[#4c1d95] bg-[#4c1d95]/5 uppercase tracking-widest text-[10px] py-1.5 px-3 self-start md:self-auto">
                              Últimos 30 días
                           </Badge>
                        </div>

                        <div className="flex flex-col gap-4 relative w-full h-full">
                            {behaviourLog.map((log: any, idx: number) => (
                               <motion.div 
                                 initial={{ opacity: 0, y: 15 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: idx * 0.08 }}
                                 key={idx} 
                                 className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 group py-5 px-6 relative z-10 transition-all hover:bg-[#fbfbfb] rounded-2xl border border-transparent hover:border-[#e5e7eb] hover:shadow-sm"
                               >
                                  <div className="flex items-center gap-6">
                                     <div className={`text-[14px] font-mono font-black border-2 border-white rounded-full flex items-center justify-center w-12 h-8 shadow-sm ${log.color.replace('bg-', 'text-').replace('[', '').replace(']', '')} bg-white shadow-md z-10`} style={{ color: log.color.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/)?.[0] || '#2d2b3b' }}>
                                        {log.impact}
                                     </div>
                                     <div className="flex flex-col">
                                        <h4 className="text-[16px] font-bold font-sans text-[#2d2b3b] leading-tight mb-2">
                                           {log.action}
                                        </h4>
                                        <div className="flex items-center gap-3">
                                           <span className="text-[11px] font-bold text-[#2d2b3b]/40 uppercase tracking-widest leading-none">
                                             {log.date} • <span className="text-[#2d2b3b]/80 font-mono">{log.time}</span>
                                           </span>
                                           <span className={`text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider text-white font-bold ${log.color} ml-2 shadow-sm`}>
                                             {log.category}
                                           </span>
                                        </div>
                                     </div>
                                  </div>

                                  <div className="hidden sm:flex text-[10px] font-black tracking-widest text-[#2d2b3b]/20 group-hover:text-[#4c1d95]/40 uppercase transition-colors">
                                    Acreditado
                                  </div>
                               </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
             )}
          </AnimatePresence>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(45, 43, 59, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(45, 43, 59, 0.2);
        }
      `}</style>
    </div>
  )
}
