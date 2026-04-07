"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Calendar,
  RefreshCw,
  Link as LinkIcon,
  ChevronDown
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { getGastos, getCategorias, createGasto, updateGasto, deleteGasto } from "@/app/actions/gastos"

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function GastosPage() {
  const [gastos, setGastos] = useState<any[]>([])
  const [categorias, setCategorias] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCat, setFilterCat] = useState("todas")
  const [filterMonth, setFilterMonth] = useState("todos")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    getGastos().then((data) => {
      setGastos(data.map((g: any) => ({
        id: g.id,
        fecha: g.fecha,
        descripcion: g.descripcion,
        categoria: g.categoriaId,
        monto: g.monto,
      })))
    })
    getCategorias().then(setCategorias)
  }, [])

  // Local state for specific graphic filters
  const [frequencyFilter, setFrequencyFilter] = useState("Esta Semana")
  const [accumFilter, setAccumFilter] = useState("Marzo")

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    monto: "",
    categoria: "",
    descripcion: "",
    fecha: new Date().toISOString().split("T")[0]
  })

  // Tabs
  const [activeTab, setActiveTab] = useState("Libro Mayor")

  // ── Functions ──
  const getCategoriaDisplay = (id: string) => {
    return categorias.find((c: any) => c.id === id) || { name: "Otros", color: "bg-[#e5e7eb] text-[#2d2b3b]", hex: "#9ca3af" }
  }

  const handleOpenNewDialog = () => {
    setEditingId(null)
    setFormData({
      monto: "",
      categoria: "",
      descripcion: "",
      fecha: new Date().toISOString().split("T")[0]
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (gasto: any) => {
    setEditingId(gasto.id)
    setFormData({
      monto: gasto.monto.toString(),
      categoria: gasto.categoria,
      descripcion: gasto.descripcion,
      fecha: gasto.fecha
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    await deleteGasto(id)
    setGastos(prev => prev.filter(g => g.id !== id))
  }

  const handleSave = async () => {
    if (!formData.monto || !formData.descripcion || !formData.categoria) return

    if (editingId) {
      await updateGasto(editingId, {
        monto: parseFloat(formData.monto),
        categoriaId: formData.categoria,
        descripcion: formData.descripcion,
        fecha: formData.fecha,
      })
      setGastos(prev => prev.map(g => g.id === editingId ? {
        ...g,
        monto: parseFloat(formData.monto),
        categoria: formData.categoria,
        descripcion: formData.descripcion,
        fecha: formData.fecha
      } : g))
    } else {
      const created = await createGasto({
        monto: parseFloat(formData.monto),
        categoriaId: formData.categoria,
        descripcion: formData.descripcion,
        fecha: formData.fecha,
      })
      setGastos(prev => [{
        id: created.id,
        monto: created.monto,
        categoria: created.categoriaId,
        descripcion: created.descripcion,
        fecha: created.fecha,
      }, ...prev])
    }
    setIsDialogOpen(false)
  }

  // Derived State
  const gastosFiltrados = gastos.filter((g) => {
    const matchSearch = g.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCat = filterCat === "todas" || g.categoria === filterCat
    const matchMonth = filterMonth === "todos" || g.fecha.startsWith(filterMonth)
    return matchSearch && matchCat && matchMonth
  })

  const gastoTotal = gastos.map(item => item.monto).reduce((prev, next) => prev + next, 0)

  // Calculate top category dynamically based on total state
  const catTotals = gastos.reduce((acc, curr) => {
    acc[curr.categoria] = (acc[curr.categoria] || 0) + curr.monto
    return acc
  }, {} as Record<string, number>)
  const topCategoryId = Object.keys(catTotals).sort((a, b) => catTotals[b] - catTotals[a])[0] || "comida"
  const topCategoryName = getCategoriaDisplay(topCategoryId).name

  const categoryChartData = Object.keys(catTotals).map(catId => ({
    name: getCategoriaDisplay(catId).name,
    value: catTotals[catId],
    color: getCategoriaDisplay(catId).color?.match?.(/bg-\[([^\]]+)\]/)?.[1] || (getCategoriaDisplay(catId) as any).hex || "#2d2b3b"
  }))

  // Compute daily spend from real data (current week)
  const dayNames = ["D", "L", "M", "M", "J", "V", "S"]
  const dailySpend = dayNames.map((day, i) => {
    const dayGastos = gastos.filter(g => {
      const d = new Date(g.fecha)
      return d.getDay() === i
    })
    return { day, total: dayGastos.reduce((acc: number, g: any) => acc + g.monto, 0) }
  })

  // Compute monthly accumulation from real data
  const monthlyAccumulation = (() => {
    const sorted = [...gastosFiltrados].sort((a, b) => a.fecha.localeCompare(b.fecha))
    let acc = 0
    const target = gastoTotal / 30
    return Array.from({ length: 30 }, (_, i) => {
      const dayGastos = sorted.filter(g => {
        const d = new Date(g.fecha).getDate()
        return d === i + 1
      })
      acc += dayGastos.reduce((a: number, g: any) => a + g.monto, 0)
      return { day: i + 1, acumulado: acc, proyeccionSana: Math.round(target * (i + 1)) }
    })
  })()

  return (
    <div className="flex flex-col w-full h-full min-h-full">
      {/* ── Editorial Paper Wrapper ── */}
      <div className="bg-[#fbfbfb] rounded-2xl w-full min-h-[85vh] p-6 sm:p-10 shadow-xl overflow-hidden text-[#2d2b3b] font-sans border border-[#e5e7eb] relative flex flex-col">

        {/* ── Top Header Navbar ── */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b-2 border-[#2d2b3b]/10 pb-4 gap-4">
          <div className="flex gap-6 text-sm font-bold tracking-wider text-[#2d2b3b]/80 uppercase">
            {["Libro Mayor", "Auditoría Visual", "Automático"].map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer pb-1 transition-colors ${activeTab === tab
                    ? "border-b-2 border-[#2d2b3b] text-[#2d2b3b]"
                    : "hover:text-[#2d2b3b]"
                  }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {activeTab === "Libro Mayor" && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={handleOpenNewDialog}
                  className="flex items-center gap-2 bg-[#ca2c41] text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest shadow hover:bg-[#a11e30] transition-colors uppercase"
                >
                  <Plus size={14} strokeWidth={3} />
                  Nuevo Gasto
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white border border-[#2d2b3b]/10 text-[#2d2b3b] rounded-2xl p-6">
                <DialogHeader>
                  <DialogTitle className="font-serif italic text-2xl text-[#2d2b3b]">
                    {editingId ? "Editar Asiento" : "Registrar Gasto"}
                  </DialogTitle>
                  <DialogDescription className="text-[#2d2b3b]/60 font-sans">
                    {editingId ? "Modifica los detalles del registro existente." : "Ingresa los detalles. El sistema detectará patrones para tu reporte narrativo."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-5 py-4 font-sans">
                  <div className="grid gap-2">
                    <Label htmlFor="monto" className="font-bold text-xs uppercase tracking-widest text-[#2d2b3b]/80">Monto (Bs)</Label>
                    <Input
                      id="monto"
                      type="number"
                      placeholder="0.00"
                      value={formData.monto}
                      onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                      className="bg-[#fbfbfb] border-[#e5e7eb] focus-visible:ring-[#ca2c41]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="categoria" className="font-bold text-xs uppercase tracking-widest text-[#2d2b3b]/80">Categoría</Label>
                    <Select value={formData.categoria} onValueChange={(val) => setFormData({ ...formData, categoria: val })}>
                      <SelectTrigger className="bg-[#fbfbfb] border-[#e5e7eb] focus:ring-[#ca2c41]">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#e5e7eb]">
                        {categorias.map((c) => (
                          <SelectItem key={c.id} value={c.id} className="cursor-pointer hover:bg-[#fbfbfb] focus:bg-[#fbfbfb] text-[#2d2b3b]">
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="descripcion" className="font-bold text-xs uppercase tracking-widest text-[#2d2b3b]/80">Descripción</Label>
                    <Input
                      id="descripcion"
                      placeholder="Ej. Cena de sábado"
                      value={formData.descripcion}
                      onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      className="bg-[#fbfbfb] border-[#e5e7eb] focus-visible:ring-[#ca2c41]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fecha" className="font-bold text-xs uppercase tracking-widest text-[#2d2b3b]/80">Fecha</Label>
                    <Input
                      id="fecha"
                      type="date"
                      value={formData.fecha}
                      onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                      className="bg-[#fbfbfb] border-[#e5e7eb] focus-visible:ring-[#ca2c41]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 rounded-full text-xs font-bold text-[#2d2b3b] hover:bg-gray-100 transition-colors uppercase">
                    Cancelar
                  </button>
                  <button onClick={handleSave} className="px-5 py-2 rounded-full text-xs font-bold bg-[#2d2b3b] text-white hover:bg-black transition-colors shadow-md uppercase">
                    Guardar
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {activeTab === "Auditoría Visual" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center gap-2 px-4 py-1.5 h-9 rounded-full text-xs font-bold text-[#2d2b3b] border border-[#e5e7eb] hover:bg-gray-100 transition-colors uppercase w-full sm:w-auto focus:outline-none">
                  <Calendar size={14} />
                  {filterMonth === "todos" ? "Histórico General" : filterMonth.split("-")[1] === "03" ? "Marzo" : "Febrero"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-[#2d2b3b]/10 shadow-lg rounded-xl min-w-[150px]">
                <DropdownMenuItem onClick={() => setFilterMonth("todos")} className="cursor-pointer font-bold text-xs uppercase tracking-wide">
                  Todos los meses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterMonth("2024-03")} className="cursor-pointer font-bold text-xs uppercase tracking-wide">
                  Marzo 2024
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterMonth("2024-02")} className="cursor-pointer font-bold text-xs uppercase tracking-wide">
                  Febrero 2024
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </header>

        {/* ── Dynamic Main Layout ── */}
        {activeTab === "Auditoría Visual" && !mounted ? null : activeTab === "Auditoría Visual" ? (
          <motion.div key="visual-full" {...fadeUp} className="flex flex-col flex-1 w-full gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#ca2c41] pb-2 mb-2">
               <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                  Radiografía <span className="text-[#ca2c41] italic">Visual</span>
                </h1>
                <p className="text-sm font-bold font-sans text-[#2d2b3b] uppercase tracking-widest hidden sm:block text-right mb-1">
                  Mapeo de Comportamiento <br/><span className="font-normal text-[#2d2b3b]/60">{filterMonth === "todos" ? "Histórico Consolidado" : filterMonth}</span>
                </p>
            </div>

            {/* EXPANDED BENTO GRID: 4 Columns Wide */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 min-h-[500px]">
              
              {/* Doughnut Card (COMPACTED: Takes 1 Col) */}
              <div className="col-span-1 lg:col-span-1 bg-white p-5 rounded-2xl border border-[#2d2b3b]/10 shadow-sm flex flex-col relative overflow-hidden h-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-serif italic text-[#2d2b3b] font-bold leading-tight">Distribución Fija</h3>
                    <p className="text-[10px] text-[#2d2b3b]/50 font-sans uppercase tracking-widest mt-1">Acumulado</p>
                  </div>
                </div>
                
                <div className="flex-1 w-full min-h-[160px] relative -mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={65}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#2d2b3b] px-3 py-2 shadow-xl rounded-md text-white text-xs font-sans font-bold uppercase tracking-widest">
                              {payload[0].name}: <span className="text-[#f59e0b]">Bs {payload[0].value}</span>
                            </div>
                          )
                        }
                        return null
                      }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend Below Compacted Doughnut */}
                <div className="flex flex-col gap-1.5 mt-auto pt-2 border-t border-[#2d2b3b]/5">
                   {categoryChartData.slice(0, 3).map((cat, idx) => (
                    <div key={idx} className="flex justify-between items-center w-full">
                       <div className="flex items-center gap-1.5 overflow-hidden">
                         <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                         <span className="text-[9px] font-bold text-[#2d2b3b] uppercase tracking-wider truncate">{cat.name}</span>
                       </div>
                       <span className="text-[9px] font-mono text-[#2d2b3b]/50">{Math.round(cat.value/gastoTotal*100)}%</span>
                    </div>
                   ))}
                   {categoryChartData.length > 3 && (
                     <div className="text-[9px] text-[#2d2b3b]/40 italic uppercase text-center mt-1">+ {categoryChartData.length - 3} más</div>
                   )}
                </div>
              </div>

              {/* Bar Chart Card (Takes 3 Cols) */}
              <div className="col-span-1 md:col-span-1 lg:col-span-3 bg-white p-5 rounded-2xl border border-[#2d2b3b]/10 shadow-sm flex flex-col relative h-full">
                 <div className="flex justify-between items-start border-b border-[#2d2b3b]/5 pb-3 mb-4">
                  <div>
                    <h3 className="text-lg font-serif italic text-[#2d2b3b] font-bold">Frecuencia de Consumo</h3>
                    <p className="text-[10px] text-[#2d2b3b]/50 font-sans uppercase tracking-widest mt-0.5">Combustión operativa por días</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Inline Filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/60 hover:text-[#2d2b3b] transition-colors focus:outline-none bg-[#fbfbfb] px-2 py-1 rounded-md border border-[#e5e7eb]">
                            {frequencyFilter} <ChevronDown size={10} />
                         </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[120px] rounded-lg shadow-lg">
                        <DropdownMenuItem onClick={() => setFrequencyFilter("Esta Semana")} className="text-[10px] font-bold uppercase tracking-wider cursor-pointer">Esta Semana</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFrequencyFilter("Mes Promedio")} className="text-[10px] font-bold uppercase tracking-wider cursor-pointer">Mes Promedio</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="text-right hidden sm:block">
                       <span className="text-[10px] font-bold text-[#2d2b3b]/50 uppercase tracking-widest">Pico Operativo</span>
                       <p className="text-lg font-black font-mono text-[#ca2c41] leading-none mt-0.5">Sábado</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full min-h-[180px] -ml-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailySpend} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d2b3b" strokeOpacity={0.06} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 10, fontWeight: "bold" }} dy={5} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 10, fontWeight: 500 }} />
                      <Tooltip cursor={{ fill: "transparent" }} content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#2d2b3b] p-3 shadow-xl rounded-md text-white text-xs font-sans">
                              <span className="font-bold uppercase tracking-widest text-[#2d2b3b]/50">{label}</span>
                              <div className="mt-1 font-mono text-lg text-white font-bold">Bs {payload[0].value}</div>
                            </div>
                          )
                        }
                        return null
                      }} />
                      <Bar 
                        dataKey="total" 
                        radius={[4, 4, 0, 0]} 
                        maxBarSize={45}
                        isAnimationActive={true}
                      >
                        {dailySpend.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.total >= 400 ? "#ca2c41" : "#2d2b3b"} opacity={0.9} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Area Chart Card (Takes FULL Width, Bottom Row) */}
              <div className="col-span-1 lg:col-span-4 bg-white p-5 rounded-2xl border border-[#2d2b3b]/10 shadow-sm flex flex-col relative h-[250px]">
                 <div className="flex justify-between items-start border-b border-[#2d2b3b]/5 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 bg-[#4c1d95]" />
                    <div>
                      <h3 className="text-lg font-serif italic text-[#2d2b3b] font-bold leading-none">Curva de Acumulación Diaria</h3>
                      <p className="text-[10px] text-[#2d2b3b]/50 font-sans uppercase tracking-widest mt-1">Velocidad de gasto a través del mes</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-center">
                    <div className="hidden sm:flex items-center gap-2 mr-4">
                      <span className="w-2 h-2 rounded-full bg-[#38bdf8] opacity-80" /> <span className="text-[10px] font-bold text-[#2d2b3b]/60 uppercase tracking-widest">Gasto Real Compuesto</span>
                      <span className="w-2 h-2 rounded-full bg-[#ca2c41] opacity-60 ml-2" /> <span className="text-[10px] font-bold text-[#2d2b3b]/60 uppercase tracking-widest">Proyección Lineal (Meta)</span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/60 hover:text-[#2d2b3b] transition-colors focus:outline-none bg-[#fbfbfb] px-2 py-1 rounded-md border border-[#e5e7eb]">
                            {accumFilter} <ChevronDown size={10} />
                         </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[120px] rounded-lg shadow-lg">
                        <DropdownMenuItem onClick={() => setAccumFilter("Marzo")} className="text-[10px] font-bold uppercase tracking-wider cursor-pointer">Marzo (Actual)</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setAccumFilter("Febrero")} className="text-[10px] font-bold uppercase tracking-wider cursor-pointer">Febrero Pasado</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="flex-1 w-full -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyAccumulation} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAcum" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ca2c41" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#ca2c41" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d2b3b" strokeOpacity={0.06} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 10, fontWeight: "bold" }} dy={5} 
                         tickFormatter={(val) => `Día ${val}`} interval="preserveStartEnd" minTickGap={20}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 10, fontWeight: 500 }} />
                      <Tooltip 
                         contentStyle={{ backgroundColor: "#2d2b3b", borderRadius: "8px", border: "none", color: "white" }}
                         itemStyle={{ fontSize: "12px", fontWeight: "bold", fontFamily: "monospace" }}
                         labelStyle={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}
                      />
                      <Area type="monotone" name="Gasto Acumulado" dataKey="acumulado" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorAcum)" />
                      <Area type="step" name="Meta Lineal" dataKey="proyeccionSana" stroke="#ca2c41" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorMeta)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 flex-1">
            {/* ── Left Narrative Column ── */}
            <div className="w-full lg:w-[35%] flex flex-col pt-2">
              {activeTab === "Libro Mayor" ? (
                <motion.div key="text-mayor" {...fadeUp} className="flex flex-col h-full">
                  <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                    LIBRO <span className="text-[#4c1d95] italic">MAYOR</span>
                  </h1>
                  <p className="text-xl font-bold font-sans text-[#2d2b3b] mb-8 border-b-2 border-[#ca2c41] pb-2 inline-block w-fit pr-4">
                    Registro <span className="font-normal text-[#2d2b3b]/60">| Transacciones</span>
                  </p>

                  <h3 className="text-2xl font-serif italic text-[#2d2b3b] mb-4">
                    Micro-decisiones
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-6 text-justify">
                    Cada asiento en este registro es un voto sobre las prioridades reales de tu capital.
                    Hasta este momento, has movido un acumulado de <strong>Bs {gastoTotal.toLocaleString()}</strong>.
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-8 text-justify">
                    Asegúrate de registrar todo para que la Auditoría Visual pueda dar resultados precisos. La categoría <span className="text-[#ca2c41] font-bold uppercase">{topCategoryName}</span> es la de mayor reincidencia.
                  </p>

                  <div className="border-l-4 border-[#eab308] pl-4 py-1 mt-auto">
                    <p className="text-[14px] leading-relaxed text-[#2d2b3b] font-sans">
                      <strong>¿Sabías que?</strong> Automatizar un "Día de Gasto Cero" semanal recorta hasta el 15% de gastos invisibles documentados aquí.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="text-auto" {...fadeUp} className="flex flex-col h-full">
                  <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                    DATA <span className="text-[#f59e0b] italic">AUTOPILOT</span>
                  </h1>
                  <p className="text-xl font-bold font-sans text-[#2d2b3b] mb-8 border-b-2 border-[#eab308] pb-2 inline-block w-fit pr-4">
                    Adiós al Excel <span className="font-normal text-[#2d2b3b]/60">| Transacciones</span>
                  </p>

                  <h3 className="text-2xl font-serif italic text-[#2d2b3b] mb-4">
                    Sincronización Bancaria
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-6 text-justify">
                    El registro manual es solo un punto de partida. Vincula tus cuentas bancarias y billeteras digitales para que
                    las transacciones se integren sin intervención humana.
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-8 text-justify">
                    La IA clasificará automáticamente las salidas de dinero, ahorrándote 5 horas de administración al mes.
                  </p>
                </motion.div>
              )}
            </div>

            {/* ── Right Content Column ── */}
            <div className="w-full lg:w-[65%] flex flex-col gap-6">
              {activeTab === "Libro Mayor" ? (
                <motion.div key="view-mayor" {...fadeUp} className="flex flex-col w-full h-full">
                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 items-center border-b border-[#2d2b3b]/10 pb-4">
                    <div className="w-1.5 h-6 bg-[#2d2b3b] shrink-0 hidden sm:block" />

                    {/* Search */}
                    <div className="relative w-full sm:max-w-xs flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d2b3b]/50" />
                      <Input
                        placeholder="Buscar en el registro..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 bg-white border-[#e5e7eb] focus-visible:ring-[#2d2b3b]/20 rounded-full h-9 text-sm text-[#2d2b3b] font-sans"
                      />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center justify-center gap-2 px-4 py-1.5 h-9 rounded-full text-xs font-bold text-[#2d2b3b] border border-[#e5e7eb] hover:bg-gray-100 transition-colors uppercase w-full sm:w-auto focus:outline-none">
                            <Filter size={14} />
                            {filterCat === "todas" ? "Resumen" : getCategoriaDisplay(filterCat).name}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-[#2d2b3b]/10 shadow-lg rounded-xl min-w-[150px]">
                          <DropdownMenuItem onClick={() => setFilterCat("todas")} className="cursor-pointer font-bold text-xs uppercase tracking-wide">
                            Todas las categorías
                          </DropdownMenuItem>
                          {categorias.map(c => (
                            <DropdownMenuItem key={c.id} onClick={() => setFilterCat(c.id)} className="cursor-pointer font-bold text-xs uppercase tracking-wide">
                              {c.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Histórico Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center justify-center gap-2 px-4 py-1.5 h-9 rounded-full text-xs font-bold text-[#2d2b3b] border border-[#e5e7eb] hover:bg-gray-100 transition-colors uppercase w-full sm:w-auto focus:outline-none">
                            <Calendar size={14} />
                            {filterMonth === "todos" ? "Histórico" : filterMonth.split("-")[1] === "03" ? "Marzo" : "Febrero"}
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-[#2d2b3b]/10 shadow-lg rounded-xl min-w-[150px]">
                          <DropdownMenuItem onClick={() => setFilterMonth("todos")} className="cursor-pointer font-bold text-xs uppercase tracking-wide">
                            Todos los meses
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterMonth("2024-03")} className="cursor-pointer font-bold text-xs uppercase tracking-wide">
                            Marzo 2024
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterMonth("2024-02")} className="cursor-pointer font-bold text-xs uppercase tracking-wide">
                            Febrero 2024
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Scrollable Ledger List */}
                  <div className="flex-1 mt-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                    {gastosFiltrados.length === 0 ? (
                      <div className="py-20 text-center text-[#2d2b3b]/50 font-sans italic border-2 border-dashed border-[#e5e7eb] rounded-xl m-2">
                        No se encontraron registros activos.
                      </div>
                    ) : (
                      <div className="flex flex-col items-center relative pb-10">
                        {/* Vertical Timeline Rule */}
                        <div className="absolute left-6 top-2 bottom-0 w-px bg-[#2d2b3b]/10 -z-10 hidden sm:block" />

                        {gastosFiltrados.map((gasto, idx) => {
                          const catInfo = getCategoriaDisplay(gasto.categoria)
                          return (
                            <div key={gasto.id} className="flex items-start w-full gap-4 group py-4 border-b border-[#2d2b3b]/5 hover:bg-[#f3f4f6]/50 transition-colors px-2 rounded-lg">

                              {/* Dot timeline */}
                              <div className="hidden sm:flex flex-col items-center mt-1">
                                <div className={`w-3 h-3 rounded-full border-2 border-white ring-1 ring-[#2d2b3b]/20 ${catInfo.color.split(' ')[0]}`} />
                              </div>

                              {/* Content */}
                              <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[10px] text-[#2d2b3b]/50 tracking-widest uppercase font-bold mb-1">
                                    {gasto.fecha}
                                  </span>
                                  <span className="text-[15px] font-bold font-sans text-[#2d2b3b] leading-tight">
                                    {gasto.descripcion}
                                  </span>
                                  <div className="mt-2 sm:hidden">
                                    <Badge variant="outline" className={`border-0 text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider ${catInfo.color}`}>
                                      {catInfo.name}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="flex items-center gap-6">
                                  <Badge variant="outline" className={`hidden sm:inline-flex border-0 text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider ${catInfo.color}`}>
                                    {catInfo.name}
                                  </Badge>
                                  <span className="text-[15px] font-mono font-bold text-[#ca2c41] w-24 text-right shrink-0">
                                    - Bs {gasto.monto.toFixed(2)}
                                  </span>

                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white border border-transparent hover:border-[#2d2b3b]/20 text-[#2d2b3b]/50 hover:text-[#2d2b3b] transition-all focus:outline-none">
                                        <MoreHorizontal size={14} />
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white border-[#2d2b3b]/10 text-[#2d2b3b] shadow-xl rounded-xl">
                                      <DropdownMenuItem onClick={() => handleOpenEditDialog(gasto)} className="focus:bg-[#fbfbfb] focus:text-[#2d2b3b] cursor-pointer text-xs font-bold uppercase tracking-wider">
                                        <Pencil className="mr-2 h-3 w-3" /> Editar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDelete(gasto.id)} className="focus:bg-red-50 focus:text-[#ca2c41] text-[#ca2c41] cursor-pointer text-xs font-bold uppercase tracking-wider">
                                        <Trash2 className="mr-2 h-3 w-3" /> Eliminar
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>

                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="view-auto" {...fadeUp} className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed border-[#e5e7eb] rounded-2xl bg-[#fbfbfb]/50">
                  <div className="w-16 h-16 rounded-2xl bg-[#f59e0b]/10 flex items-center justify-center mb-6">
                    <LinkIcon size={32} className="text-[#f59e0b]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d2b3b] mb-2 font-sans uppercase tracking-widest">Open Banking</h3>
                  <p className="text-sm text-[#2d2b3b]/60 text-center max-w-sm mb-8">
                    Conecta cuentas institucionales para categorización algorítmica.
                  </p>
                  <button className="flex items-center gap-2 bg-[#2d2b3b] text-white px-6 py-3 rounded-full text-xs font-bold tracking-widest shadow-lg hover:bg-black transition-colors uppercase">
                    <RefreshCw size={14} />
                    Integración Futura
                  </button>
                  <span className="text-[10px] font-bold text-[#2d2b3b]/40 uppercase tracking-widest mt-4">Disponible en Q3 2026</span>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
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
