"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LabelList,
  Legend,
  type TooltipProps,
} from "recharts"

import { getDashboardData } from "@/app/actions/dashboard"

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.3 }
}


// ── Custom Tooltips ──
const AreaTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const ingresos = payload.find((p) => p.dataKey === "ingresos")
    const gastos = payload.find((p) => p.dataKey === "gastos")
    return (
      <div className="bg-white border border-[#2d2b3b]/20 p-3 shadow-lg rounded-sm text-[#2d2b3b] text-sm font-sans">
        <p className="font-bold mb-1 border-b border-[#2d2b3b]/10 pb-1">{label}</p>
        <p className="text-[#38bdf8] font-semibold">Ingresos: Bs {ingresos?.value ?? 0}</p>
        <p className="text-[#ca2c41] font-semibold">Gastos: Bs {gastos?.value ?? 0}</p>
      </div>
    )
  }
  return null
}

const PieTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#2d2b3b]/20 px-3 py-1 shadow-lg rounded-sm text-[#2d2b3b] text-sm font-sans font-bold">
        {payload[0].name}: Bs {payload[0].value}
      </div>
    )
  }
  return null
}

const BarTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#2d2b3b]/20 p-3 shadow-lg rounded-sm text-[#2d2b3b] text-sm font-sans">
        <p className="font-bold mb-1 border-b border-[#2d2b3b]/10 pb-1">{label}</p>
        {payload.map((p) => (
          <p key={String(p.dataKey)} style={{ color: p.color }} className="font-semibold">
            {p.name}: Bs {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const [view, setView] = useState("Mensual")
  const [activeTab, setActiveTab] = useState("Titulares")
  const [mounted, setMounted] = useState(false)
  const [dashData, setDashData] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    getDashboardData().then(setDashData)
  }, [])

  const user = dashData?.user || { name: "Usuario", monthlyIncome: 0 }
  const insights = dashData?.insights || { topCategory: "N/A", topCategorySpent: 0, savingsRate: 0, totalGastosMes: 0 }
  const trendDataMonthly = dashData?.monthlyTrend || []
  const categoryDataAll = dashData?.categoryData || []
  const activeGoals = dashData?.activeGoals || []

  const trendData = view === "Mensual" ? trendDataMonthly : trendDataMonthly.slice(-1)
  const categoryData = categoryDataAll

  return (
    <div className="flex flex-col w-full h-full min-h-full">
      {/* ── Editorial Paper Wrapper ── */}
      <div className="bg-[#fbfbfb] rounded-2xl w-full min-h-[85vh] p-6 sm:p-10 shadow-xl overflow-hidden text-[#2d2b3b] font-sans border border-[#e5e7eb] relative">
        
        {/* ── Top Header Navbar ── */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b-2 border-[#2d2b3b]/10 pb-4 gap-4">
          <div className="flex gap-6 text-sm font-bold tracking-wider text-[#2d2b3b]/80 uppercase">
            {["Titulares", "Balance", "Distribución"].map((tab) => (
              <span 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer pb-1 transition-colors ${
                  activeTab === tab 
                    ? "border-b-2 border-[#2d2b3b] text-[#2d2b3b]" 
                    : "hover:text-[#2d2b3b]"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="flex bg-white rounded-full border border-[#2d2b3b]/20 p-1 shadow-sm font-sans">
            {["Semanal", "Mensual"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  view === v ? "bg-[#2d2b3b] text-white shadow-md" : "text-[#2d2b3b] hover:bg-gray-100"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </header>

        {/* ── Main Layout ── */}
        <div className="flex flex-col lg:flex-row gap-12 min-h-[500px]">
          
          {/* ── Left Narrative Column ── */}
          <div className="w-full lg:w-[35%] flex flex-col pt-2 relative">
            <AnimatePresence mode="wait">
              
              {activeTab === "Titulares" && (
                <motion.div key="titulares" {...fadeUp} className="flex flex-col">
                  <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                    RESUMEN <span className="text-[#ca2c41] italic">EJECUTIVO</span>
                  </h1>
                  <p className="text-sm font-bold font-sans text-[#2d2b3b]/60 uppercase tracking-widest pb-4 border-b border-[#2d2b3b]/10 mb-8 inline-block pr-4">
                    Hola, {user.name.split(" ")[0]} | Operaciones {view}
                  </p>

                  <h3 className="text-2xl font-serif italic text-[#2d2b3b] mb-4">
                    La Fotografía Actual
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-6 text-justify">
                    Este {view.toLowerCase()}, has mantenido un volumen constante de ingresos promediando los <strong>Bs {user.monthlyIncome.toLocaleString()}</strong>. 
                    Sin embargo, detectamos una concentración importante en gastos no esenciales.
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-8 text-justify">
                    Tu categoría dominante es <span className="text-[#ca2c41] font-bold">{insights.topCategory}</span>, 
                    con una salida de Bs {categoryData[0]?.value}. A pesar de esto, tu tasa de ahorro estructural se mantiene 
                    resiliente en un <strong>{insights.savingsRate}%</strong>.
                  </p>

                  <div className="border-l-4 border-[#4c1d95] pl-4 py-1 mt-auto">
                    <p className="text-[14px] leading-relaxed text-[#2d2b3b] font-sans">
                      <strong>Estás en camino.</strong>{activeGoals[0] && <> Tu objetivo matriz, la <span className="text-[#f59e0b] font-bold">{activeGoals[0].name}</span>, ya ha cubierto
                      el {Math.round((activeGoals[0].current / activeGoals[0].target) * 100)}% de los fondos necesarios.</>}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "Balance" && (
                <motion.div key="balance" {...fadeUp} className="flex flex-col">
                  <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                    FLUJO DE <span className="text-[#38bdf8] italic">CAJA</span>
                  </h1>
                  <p className="text-sm font-bold font-sans text-[#2d2b3b]/60 uppercase tracking-widest pb-4 border-b border-[#2d2b3b]/10 mb-8 inline-block pr-4">
                    Tus Entradas vs. Salidas | {view}
                  </p>

                  <h3 className="text-2xl font-serif italic text-[#2d2b3b] mb-4">
                    Eficiencia Operativa
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-6 text-justify">
                    El balance neto refleja tu verdadera capacidad para cumplir tus metas a largo plazo. 
                    Durante esta vista {view.toLowerCase()}, {view === "Semanal" ? "tus ingresos han estado pausados por la estructura de tu salario" : "los ingresos superaron consistentemente tus salidas, dándote margen de maniobra"}.
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-8 text-justify">
                    Observa el margen entre las columnas celestes y rojas en tu gráfico. Ese espacio representa el capital liberado que ahora puedes destinar a tu fondo de retiro o a disfrutar sin culpa.
                  </p>
                </motion.div>
              )}

              {activeTab === "Distribución" && (
                <motion.div key="distribucion" {...fadeUp} className="flex flex-col">
                  <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                    HÁBITOS DE <span className="text-[#f59e0b] italic">CONSUMO</span>
                  </h1>
                  <p className="text-sm font-bold font-sans text-[#2d2b3b]/60 uppercase tracking-widest pb-4 border-b border-[#2d2b3b]/10 mb-8 inline-block pr-4">
                    Adónde va tu dinero | {view}
                  </p>

                  <h3 className="text-2xl font-serif italic text-[#2d2b3b] mb-4">
                    La anatomía de tus gastos
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-6 text-justify">
                    No todos los gastos son iguales. La distribución {view.toLowerCase()} expone claramente que 
                    el peso financiero se inclina fuertemente hacia <span className="text-[#ca2c41] font-bold">{categoryData[0]?.name}</span> y <span className="text-[#4c1d95] font-bold">{categoryData[1]?.name}</span>.
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-8 text-justify">
                    Este patrón sugiere una oportunidad: optimizando un 10% en tu principal categoría, estarías sumando suficientes fondos para acelerar tus metas significativamente.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right Data Column ── */}
          <div className="w-full lg:w-[65%] flex flex-col gap-10 relative">
            <AnimatePresence mode="wait">
              
              {activeTab === "Titulares" && (
                <motion.div key="tab-titulares" {...fadeUp} className="flex flex-col gap-10">
                  {/* Area Chart: Trend */}
                  <div className="flex flex-col relative w-full">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-6 bg-[#38bdf8]" />
                      <h3 className="text-xl font-bold font-sans text-[#2d2b3b] tracking-wider uppercase">Tendencia de Liquidez</h3>
                    </div>
                    <p className="text-xs text-[#2d2b3b]/60 mb-4 font-sans uppercase tracking-widest pl-4">Entradas vs Salidas (Bs) {view}</p>
                    
                    <div className="w-full h-[220px]">
                      {mounted ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d2b3b" strokeOpacity={0.08} />
                          <XAxis dataKey="label" axisLine={{ stroke: "#2d2b3b", strokeWidth: 1.5 }} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 11, fontWeight: 500 }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 11, fontWeight: 500 }} />
                          <Tooltip content={AreaTooltip} />
                          <Area type="monotone" dataKey="ingresos" stroke="#38bdf8" strokeWidth={3} fill="#38bdf8" fillOpacity={0.1} />
                          <Area type="monotone" dataKey="gastos" stroke="#ca2c41" strokeWidth={3} fill="#ca2c41" fillOpacity={0.05} />
                        </AreaChart>
                      </ResponsiveContainer>
                      ) : <div className="w-full h-full bg-[#f3f4f6] rounded-lg animate-pulse" />}
                    </div>
                  </div>

                  {/* Bottom Split Row */}
                  <div className="flex flex-col sm:flex-row gap-8 border-t border-[#2d2b3b]/10 pt-8">
                    {/* Pie Chart: Distribution Mini */}
                    <div className="w-full sm:w-1/2 flex flex-col">
                      <h3 className="text-lg font-serif italic text-[#2d2b3b] mb-1 pl-1">Distribución del Gasto</h3>
                      <p className="text-[10px] text-[#2d2b3b]/60 mb-4 font-sans uppercase tracking-widest pl-1">Top categorías {view}</p>
                      <div className="flex items-center h-[160px]">
                        {mounted ? (
                        <ResponsiveContainer width="50%" height="100%">
                          <PieChart>
                            <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value" stroke="none">
                              {categoryData.map((entry: { name: string; color: string; value: number }) => <Cell key={entry.name} fill={entry.color} />)}
                            </Pie>
                            <Tooltip content={PieTooltip} />
                          </PieChart>
                        </ResponsiveContainer>
                        ) : <div className="w-[50%] h-full bg-[#f3f4f6] rounded-full animate-pulse" />}
                        <div className="w-50% flex flex-col gap-2 justify-center pl-2">
                          {categoryData.slice(0, 4).map((cat: { name: string; color: string; value: number }) => (
                            <div key={cat.name} className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }} />
                              <span className="text-xs font-bold text-[#2d2b3b] uppercase truncate max-w-[80px]">{cat.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bars: Goals */}
                    <div className="w-full sm:w-1/2 flex flex-col">
                      <h3 className="text-lg font-serif italic text-[#2d2b3b] mb-1 pl-1">Progreso de Metas</h3>
                      <p className="text-[10px] text-[#2d2b3b]/60 mb-5 font-sans uppercase tracking-widest pl-1">Tus principales objetivos</p>
                      <div className="flex flex-col gap-5">
                        {activeGoals.map((goal: any) => {
                          const pct = Math.round((goal.current / goal.target) * 100)
                          return (
                            <div key={goal.name} className="flex justify-between items-center gap-3">
                              <div className="w-20 shrink-0"><span className="text-[11px] font-bold text-[#2d2b3b] uppercase block leading-tight">{goal.name}</span></div>
                              <div className="flex-1 h-3 rounded-full bg-[#f3f4f6] relative overflow-hidden border border-[#e5e7eb]">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full rounded-r-full" style={{ backgroundColor: goal.color }} />
                              </div>
                              <span className="text-xs font-bold text-[#2d2b3b] w-8 text-right">{pct}%</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "Balance" && (
                <motion.div key="tab-balance" {...fadeUp} className="flex flex-col gap-6 w-full h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-6 bg-[#ca2c41]" />
                    <h3 className="text-xl font-bold font-sans text-[#2d2b3b] tracking-wider uppercase">Comparativa de Balance</h3>
                  </div>
                  <p className="text-xs text-[#2d2b3b]/60 mb-4 font-sans uppercase tracking-widest pl-4">Análisis detallado {view}</p>
                  
                  <div className="w-full h-[450px]">
                    {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d2b3b" strokeOpacity={0.08} />
                        <XAxis dataKey="label" axisLine={{ stroke: "#2d2b3b", strokeWidth: 1.5 }} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 12, fontWeight: "bold" }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 11, fontWeight: 500 }} />
                        <Tooltip content={<BarTooltip />} cursor={{fill: 'transparent'}} />
                        <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 'bold', color: '#2d2b3b' }} />
                        <Bar dataKey="ingresos" name="Ingresos" fill="#38bdf8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="gastos" name="Gastos Operativos" fill="#ca2c41" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                    ) : <div className="w-full h-full bg-[#f3f4f6] rounded-lg animate-pulse" />}
                  </div>
                </motion.div>
              )}

              {activeTab === "Distribución" && (
                <motion.div key="tab-distribucion" {...fadeUp} className="flex flex-col gap-6 w-full h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-6 bg-[#f59e0b]" />
                    <h3 className="text-xl font-bold font-sans text-[#2d2b3b] tracking-wider uppercase">Mapa de Gasto {view}</h3>
                  </div>
                  <p className="text-xs text-[#2d2b3b]/60 mb-4 font-sans uppercase tracking-widest pl-4">Desglose integral de salidas de capital</p>
                  
                  <div className="w-full flex md:flex-row flex-col items-center h-[450px]">
                    {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={140}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="none"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {categoryData.map((entry: { name: string; color: string; value: number }) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={PieTooltip} />
                      </PieChart>
                    </ResponsiveContainer>
                    ) : <div className="w-full h-full bg-[#f3f4f6] rounded-lg animate-pulse" />}

                    <div className="flex flex-col gap-4 p-6 bg-white border border-[#2d2b3b]/10 rounded-lg shadow-sm min-w-[200px]">
                      <h4 className="text-sm font-bold border-b border-[#2d2b3b]/10 pb-2 uppercase tracking-widest text-[#2d2b3b]">Resumen</h4>
                      {categoryData.map((cat: { name: string; color: string; value: number }) => (
                        <div key={cat.name} className="flex justify-between items-center gap-6">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                            <span className="text-sm font-semibold text-[#2d2b3b]">{cat.name}</span>
                          </div>
                          <span className="text-sm text-[#2d2b3b]/70 font-mono">Bs {cat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}
