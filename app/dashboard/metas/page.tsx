"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart, Area, XAxis, Tooltip, YAxis, CartesianGrid,
  BarChart, Bar, Legend
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { getMetas, createMeta, updateMeta, deleteMeta } from "@/app/actions/metas"

export default function MetasPage() {
  const [goals, setGoals] = useState<any[]>([])

  useEffect(() => {
    getMetas().then((data) => setGoals(data))
  }, [])
  const [activeTab, setActiveTab] = useState<"mis-metas" | "proyeccion">("mis-metas")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<any>(null)
  
  // States para CRUD
  const [newName, setNewName] = useState("")
  const [newTarget, setNewTarget] = useState("")
  const [newCurrent, setNewCurrent] = useState("")
  const [newDate, setNewDate] = useState("")

  // States para Filtros en Proyección
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")

  const openCreateModal = () => {
    setEditingGoal(null)
    setNewName("")
    setNewTarget("")
    setNewCurrent("")
    setNewDate("")
    setIsModalOpen(true)
  }

  const openEditModal = (goal: any) => {
    setEditingGoal(goal)
    setNewName(goal.name)
    setNewTarget(String(goal.target))
    setNewCurrent(String(goal.current))
    setNewDate(goal.date)
    setIsModalOpen(true)
  }

  const handleSaveGoal = async () => {
    if (!newName || !newTarget) return

    if (editingGoal) {
      const updated = await updateMeta(editingGoal.id, {
        name: newName,
        target: Number(newTarget),
        current: Number(newCurrent || 0),
        date: newDate || "Sin fecha",
      })
      setGoals(goals.map(g => g.id === editingGoal.id ? updated : g))
    } else {
      const color = ["#4c1d95", "#ea580c", "#10b981", "#ca2c41", "#38bdf8", "#f59e0b"][Math.floor(Math.random() * 6)]
      const created = await createMeta({
        name: newName,
        target: Number(newTarget),
        current: Number(newCurrent || 0),
        date: newDate || "Sin fecha",
        color,
      })
      setGoals([created, ...goals])
    }
    setIsModalOpen(false)
  }

  const handleDeleteGoal = async (id: string) => {
    await deleteMeta(id)
    setGoals(goals.filter(g => g.id !== id))
  }

  const CircularProgress = ({ current, target, color }: { current: number, target: number, color: string }) => {
    const percentage = Math.min(Math.round((current / target) * 100), 100)
    const data = [
      { name: "Logrado", value: percentage },
      { name: "Faltante", value: 100 - percentage }
    ]
    return (
      <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
             <Pie
               data={data}
               cx="50%"
               cy="50%"
               innerRadius="75%"
               outerRadius="100%"
               startAngle={90}
               endAngle={-270}
               dataKey="value"
               stroke="none"
               isAnimationActive={true}
               animationDuration={1500}
               animationEasing="ease-out"
               cornerRadius={12}
             >
               <Cell key="cell-0" fill={color} />
               <Cell key="cell-1" fill={`${color}20`} />
             </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <span className="text-[14px] font-black font-mono leading-none" style={{ color }}>{percentage}%</span>
        </div>
      </div>
    )
  }

  // Filtrado de las proyecciones en base al buscador y estados elegidos
  const filteredGoals = goals.filter(g => {
    const matchName = g.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = statusFilter === "Todos" || g.status === statusFilter
    return matchName && matchStatus
  })

  const totalTarget = filteredGoals.reduce((acc, goal) => acc + goal.target, 0)
  const totalCurrent = filteredGoals.reduce((acc, goal) => acc + goal.current, 0)
  
  // Data for AreaChart
  const projectionData = [
    { year: "2024", capital: totalCurrent, needed: totalTarget },
    { year: "2026", capital: totalCurrent + ((totalTarget - totalCurrent) * 0.3), needed: totalTarget },
    { year: "2028", capital: totalCurrent + ((totalTarget - totalCurrent) * 0.6), needed: totalTarget },
    { year: "2030", capital: totalTarget, needed: totalTarget },
    { year: "2032", capital: totalTarget * 1.5, needed: totalTarget },
  ]

  const CustomTooltipArea = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-xl border border-[#e5e7eb] rounded-xl text-[#2d2b3b] font-sans flex flex-col gap-2 min-w-[180px]">
          <p className="font-bold text-[12px] uppercase text-[#2d2b3b]/50 border-b border-[#e5e7eb] pb-2 mb-1">Año {label}</p>
          <div>
             <span className="text-[10px] text-[#2d2b3b]/60 uppercase font-bold block">Capital Proyectado</span>
             <p className="font-black text-[#4c1d95] text-lg font-mono">Bs. {payload[0].value.toLocaleString()}</p>
          </div>
        </div>
      )
    }
    return null
  }

  const CustomTooltipBar = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-xl border border-[#e5e7eb] rounded-xl text-[#2d2b3b] font-sans flex flex-col min-w-[180px]">
          <p className="font-bold text-[12px] uppercase text-[#2d2b3b] border-b border-[#e5e7eb] pb-2 mb-2">{label}</p>
          <div className="flex flex-col gap-1">
             <span className="text-[11px] font-bold text-[#f59e0b]">Actual: Bs. {payload[0]?.value?.toLocaleString()}</span>
             <span className="text-[11px] font-bold text-[#4c1d95]">Restante: Bs. {payload[1]?.value?.toLocaleString()}</span>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <main className="flex flex-col w-full h-full min-h-full">
      <div className="bg-[#fbfbfb] rounded-2xl w-full min-h-[85vh] p-6 sm:p-10 shadow-xl overflow-hidden text-[#2d2b3b] font-sans border border-[#e5e7eb] relative flex flex-col">

        {/* ── Standard Dashboard Header ── */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b-2 border-[#2d2b3b]/10 pb-4 gap-4">
          <nav className="flex gap-6 text-sm font-bold tracking-wider text-[#2d2b3b]/80 uppercase">
            <button 
              onClick={() => setActiveTab("mis-metas")}
              className={`pb-1 border-b-2 outline-none transition-colors ${activeTab === 'mis-metas' ? 'border-[#4c1d95] text-[#2d2b3b]' : 'border-transparent text-[#2d2b3b]/40 hover:text-[#2d2b3b]'}`}
            >
              Mis Metas
            </button>
            <button 
              onClick={() => setActiveTab("proyeccion")}
              className={`pb-1 border-b-2 outline-none transition-colors ${activeTab === 'proyeccion' ? 'border-[#4c1d95] text-[#2d2b3b]' : 'border-transparent text-[#2d2b3b]/40 hover:text-[#2d2b3b]'}`}
            >
              Proyección de Ahorro
            </button>
          </nav>

          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <span className="text-[10px] text-[#2d2b3b]/50 font-bold uppercase tracking-widest block mb-0.5">Capital Necesario</span>
               <span className="text-xl font-mono font-black text-[#4c1d95]">Bs. {goals.reduce((a,b)=>a+b.target,0).toLocaleString()}</span>
             </div>
          </div>
        </header>

        {/* ── Main Content ── */}
        <section className="flex-1 w-full h-full relative">
           {activeTab === "mis-metas" ? (
             <motion.div 
                key="tab-metas"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col w-full h-full"
             >
                {/* Clean Dashboard Actions Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
                   <div>
                      <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                         Gestión de <span className="italic text-[#4c1d95]">Metas</span>
                      </h1>
                      <p className="text-sm font-bold font-sans text-[#2d2b3b]/60 uppercase tracking-widest pb-4 border-b border-[#2d2b3b]/10 inline-block pr-6 mb-4">
                         Define el destino de tus ahorros y progreso
                      </p>
                   </div>
                   <button 
                      onClick={openCreateModal}
                      className="bg-[#2d2b3b] hover:bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md flex items-center gap-2"
                   >
                      + Nueva Meta
                   </button>
                </div>

                {/* Clean Grid of Goals */}
                <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <AnimatePresence>
                     {goals.map((goal, idx) => (
                       <motion.div 
                         key={goal.id}
                         layout
                         initial={{ opacity: 0, y: 15 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.95 }}
                         transition={{ delay: idx * 0.05 }}
                         className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#2d2b3b]/20 transition-all group flex flex-col justify-between min-h-[220px] relative overflow-hidden"
                       >
                          {/* Accent Color Strip */}
                          <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: goal.color }} />
                          
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-col">
                               <h4 className="text-lg font-black font-sans text-[#2d2b3b] leading-tight pr-2">{goal.name}</h4>
                            </div>
                            <Badge variant="outline" className="border-0 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 shrink-0" style={{ color: goal.color, backgroundColor: `${goal.color}10` }}>
                              {goal.status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between w-full mt-auto gap-4">
                             <div className="flex flex-col pb-1">
                                <span className="text-[10px] font-bold text-[#2d2b3b]/50 uppercase tracking-widest mb-1">Acumulado</span>
                                <div className="flex items-baseline gap-1">
                                   <span className="text-2xl font-black font-mono text-[#2d2b3b]">Bs. {goal.current.toLocaleString()}</span>
                                </div>
                                <span className="text-xs font-bold text-[#2d2b3b]/40 mt-1 block">
                                   de Bs. {goal.target.toLocaleString()}
                                </span>
                             </div>

                             <div className="shrink-0">
                                <CircularProgress current={goal.current} target={goal.target} color={goal.color} />
                             </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-5 pt-4 border-t border-[#f3f4f6]">
                            <button onClick={() => openEditModal(goal)} className="text-[10px] uppercase font-bold text-[#2d2b3b]/50 hover:text-[#4c1d95] transition-colors flex-1 text-left">Editar Meta</button>
                            <span className="text-[#2d2b3b]/20">|</span>
                            <button onClick={() => handleDeleteGoal(goal.id)} className="text-[10px] uppercase font-bold text-[#2d2b3b]/50 hover:text-[#ca2c41] transition-colors flex-[2] text-right">Eliminar</button>
                          </div>
                       </motion.div>
                     ))}
                   </AnimatePresence>
                </article>

             </motion.div>
           ) : (
             <motion.div 
                key="tab-proyeccion"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col w-full h-full min-h-[500px]"
             >
                {/* Barra de Búsquedas y Filtros */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-4 rounded-2xl border border-[#e5e7eb] shadow-sm">
                   <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
                      <div className="flex flex-col gap-1 w-full md:w-[300px]">
                        <label className="text-[10px] uppercase font-bold text-[#2d2b3b]/50 tracking-widest pl-1">Buscar Meta</label>
                        <input 
                           type="text" 
                           placeholder="Ej. Casa Propia" 
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full bg-[#fbfbfb] border border-[#e5e7eb] p-2.5 rounded-xl text-sm font-bold text-[#2d2b3b] outline-none focus:border-[#4c1d95]"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-full md:w-[200px]">
                        <label className="text-[10px] uppercase font-bold text-[#2d2b3b]/50 tracking-widest pl-1">Estado</label>
                        <select 
                           value={statusFilter}
                           onChange={(e) => setStatusFilter(e.target.value)}
                           className="w-full bg-[#fbfbfb] border border-[#e5e7eb] p-2.5 rounded-xl text-sm font-bold text-[#2d2b3b] outline-none focus:border-[#4c1d95]"
                        >
                           <option value="Todos">Todas las metas</option>
                           <option value="Avanzando">Avanzando</option>
                           <option value="Iniciado">Iniciado</option>
                           <option value="A largo plazo">A largo plazo</option>
                           <option value="Nueva meta">Nuevas</option>
                        </select>
                      </div>
                   </div>
                   <div className="flex items-center text-right shrink-0">
                      <p className="text-[11px] font-bold text-[#2d2b3b]/50 uppercase tracking-widest leading-tight">
                        Filtros aplicados<br/>
                        <span className="text-[#4c1d95]">{filteredGoals.length} Metas seleccionadas</span>
                      </p>
                   </div>
                </div>
                
                {/* Cuadrícula de Gráficos Múltiples */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full flex-1 min-h-[400px]">
                    
                    {/* Gráfico 1: El Área de Crecimiento */}
                    <div className="flex flex-col bg-white border border-[#e5e7eb] rounded-3xl p-6 sm:p-8 shadow-sm relative lg:col-span-2 min-h-[300px]">
                        <div className="flex flex-col mb-4 border-b border-[#f3f4f6] pb-4">
                           <h3 className="text-xl font-serif font-black text-[#2d2b3b] mb-1">Simulación a Futuro</h3>
                           <p className="text-xs font-bold font-sans text-[#2d2b3b]/50 uppercase tracking-widest">
                             Proyección del capital necesario ({filteredGoals.length} metas: Bs. {totalTarget.toLocaleString()})
                           </p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="projColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4c1d95" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#4c1d95" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d2b3b" strokeOpacity={0.05} />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 11, fontWeight: "bold" }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 11, fontWeight: "bold" }} tickFormatter={(val) => `Bs. ${val/1000}k`} dx={-10} />
                            
                            <Tooltip content={CustomTooltipArea} />
                            
                            <Area type="monotone" dataKey="needed" stroke="#2d2b3b" strokeOpacity={0.2} strokeWidth={2} strokeDasharray="5 5" fill="none" />
                            <Area type="monotone" dataKey="capital" stroke="#4c1d95" strokeWidth={4} fill="url(#projColor)" isAnimationActive={true} animationDuration={2000} />
                          </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico 2: Desglose Individual (Barras Apiladas) */}
                    <div className="flex flex-col bg-white border border-[#e5e7eb] rounded-3xl p-6 shadow-sm min-h-[300px]">
                        <div className="flex flex-col mb-4">
                           <h3 className="text-lg font-serif font-black text-[#2d2b3b] mb-1">Progreso por Meta</h3>
                           <p className="text-xs font-bold font-sans text-[#2d2b3b]/50 uppercase tracking-widest">
                             Capital actual vs Restante
                           </p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart 
                             data={filteredGoals.map(g => ({ name: g.name.substring(0, 10) + '...', logrados: g.current, restantes: g.target - g.current }))}
                             margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                           >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                              <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: "bold", fill: "#2d2b3b" }} axisLine={false} tickLine={false} dy={5} />
                              <YAxis tick={{ fontSize: 10, fontWeight: "bold", fill: "#2d2b3b" }} tickFormatter={(val)=>`Bs ${val/1000}k`} axisLine={false} tickLine={false} dx={-5} />
                              <Tooltip content={CustomTooltipBar} cursor={{ fill: 'transparent' }} />
                              <Legend wrapperStyle={{ fontSize: "10px", fontWeight: "bold" }} />
                              <Bar dataKey="logrados" name="Acumulado" stackId="a" fill="#f59e0b" radius={[0, 0, 4, 4]} />
                              <Bar dataKey="restantes" name="Faltante" stackId="a" fill="#4c1d95" radius={[4, 4, 0, 0]} />
                           </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico 3: Distribución (Pie Chart) */}
                    <div className="flex flex-col bg-white border border-[#e5e7eb] rounded-3xl p-6 shadow-sm min-h-[300px]">
                        <div className="flex flex-col mb-0">
                           <h3 className="text-lg font-serif font-black text-[#2d2b3b] mb-1">Distribución del Capital</h3>
                           <p className="text-xs font-bold font-sans text-[#2d2b3b]/50 uppercase tracking-widest">
                             Peso económico de cada objetivo
                           </p>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie
                                data={filteredGoals}
                                dataKey="target"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                label={({ name, percent }) => `${name.substring(0, 8)} (${(percent * 100).toFixed(0)}%)`}
                                labelLine={false}
                                fill="#4c1d95"
                                style={{ fontSize: '10px', fontWeight: 'bold' }}
                              >
                                {filteredGoals.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value: number) => `Bs. ${value.toLocaleString()}`} />
                           </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>
             </motion.div>
           )}
        </section>

        {/* ── Standard Clean Form Modal ── */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-[#2d2b3b]/20 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative z-10 border border-[#e5e7eb]"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-black font-sans text-[#2d2b3b]">
                      {editingGoal ? "Editar Meta" : "Nueva Meta"}
                    </h2>
                    <p className="text-xs font-bold text-[#2d2b3b]/50 uppercase tracking-widest mt-1">
                      Configura tu objetivo en Bolivianos (Bs.)
                    </p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold transition-colors">✕</button>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#2d2b3b]/60 tracking-widest pl-1">Nombre de la Meta</label>
                    <input 
                      type="text" 
                      value={newName} 
                      onChange={(e) => setNewName(e.target.value)} 
                      placeholder="Ej: Viaje a Europa" 
                      className="w-full bg-[#fbfbfb] border border-[#e5e7eb] p-3.5 rounded-xl text-sm font-bold text-[#2d2b3b] outline-none focus:border-[#4c1d95] focus:bg-white transition-colors"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-[10px] uppercase font-bold text-[#2d2b3b]/60 tracking-widest pl-1">Costo Total (Bs.)</label>
                      <input 
                        type="number" 
                        value={newTarget} 
                        onChange={(e) => setNewTarget(e.target.value)} 
                        placeholder="10000" 
                        className="w-full bg-[#fbfbfb] border border-[#e5e7eb] p-3.5 rounded-xl text-sm font-mono font-bold text-[#2d2b3b] outline-none focus:border-[#4c1d95] focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-[10px] uppercase font-bold text-[#2d2b3b]/60 tracking-widest pl-1">Fecha Límite</label>
                      <input 
                        type="text" 
                        value={newDate} 
                        onChange={(e) => setNewDate(e.target.value)} 
                        placeholder="Ej: Dic 2025" 
                        className="w-full bg-[#fbfbfb] border border-[#e5e7eb] p-3.5 rounded-xl text-sm font-bold text-[#2d2b3b] outline-none focus:border-[#4c1d95] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-bold text-[#10b981] tracking-widest pl-1">Capital ya ahorrado (Bs.)</label>
                    <input 
                      type="number" 
                      value={newCurrent} 
                      onChange={(e) => setNewCurrent(e.target.value)} 
                      placeholder="Ej: 1500" 
                      className="w-full bg-[#fbfbfb] border border-[#e5e7eb] p-3.5 rounded-xl text-sm font-mono font-bold text-[#2d2b3b] outline-none focus:border-[#10b981]/50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#f3f4f6]">
                  <button 
                    onClick={handleSaveGoal}
                    className="w-full bg-[#4c1d95] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-[#3b1578] transition-colors shadow-md"
                  >
                    Guardar Meta
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
    </main>
  )
}
