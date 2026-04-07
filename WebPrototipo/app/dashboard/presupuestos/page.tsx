"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Calendar,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  Target,
  Link as LinkIcon
} from "lucide-react"

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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

import { getPresupuestos, createPresupuesto, updatePresupuesto, deletePresupuesto } from "@/app/actions/presupuestos"
import { getCategorias } from "@/app/actions/gastos"

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function PresupuestosPage() {
  const [presupuestos, setPresupuestos] = useState<any[]>([])
  const [categorias, setCategorias] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCat, setFilterCat] = useState("todas")
  const [filterMonth, setFilterMonth] = useState("todos")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    getPresupuestos().then((data) => {
      setPresupuestos(data.map((p: any) => ({
        id: p.id,
        categoria: p.categoriaId,
        asignado: p.asignado,
        gastado: p.gastado,
        periodo: p.periodo,
      })))
    })
    getCategorias().then(setCategorias)
  }, [])

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    asignado: "",
    categoria: "",
    periodo: "2024-03"
  })

  // Tabs
  const [activeTab, setActiveTab] = useState("Planificador")

  // ── Functions ──
  const getCategoriaDisplay = (id: string) => {
    return categorias.find((c: any) => c.id === id) || { name: "Otros", color: "bg-[#e5e7eb] text-[#2d2b3b]", hex: "#2d2b3b" }
  }

  const handleOpenNewDialog = () => {
    setEditingId(null)
    setFormData({
      asignado: "",
      categoria: "",
      periodo: "2024-03"
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (pres: any) => {
    setEditingId(pres.id)
    setFormData({
      asignado: pres.asignado.toString(),
      categoria: pres.categoria,
      periodo: pres.periodo
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    await deletePresupuesto(id)
    setPresupuestos(prev => prev.filter(p => p.id !== id))
  }

  const handleSave = async () => {
    if (!formData.asignado || !formData.categoria) return

    if (editingId) {
      await updatePresupuesto(editingId, {
        asignado: parseFloat(formData.asignado),
        categoriaId: formData.categoria,
        periodo: formData.periodo,
      })
      setPresupuestos(prev => prev.map(p => p.id === editingId ? {
        ...p,
        asignado: parseFloat(formData.asignado),
        categoria: formData.categoria,
        periodo: formData.periodo
      } : p))
    } else {
      const created = await createPresupuesto({
        asignado: parseFloat(formData.asignado),
        categoriaId: formData.categoria,
        periodo: formData.periodo,
      })
      setPresupuestos(prev => [{
        id: created.id,
        asignado: created.asignado,
        gastado: created.gastado,
        categoria: created.categoriaId,
        periodo: created.periodo,
      }, ...prev])
    }
    setIsDialogOpen(false)
  }

  // Derived State
  const presupuestosFiltrados = presupuestos.filter((p) => {
    const catDisplay = getCategoriaDisplay(p.categoria).name.toLowerCase()
    const matchSearch = catDisplay.includes(searchTerm.toLowerCase())
    const matchCat = filterCat === "todas" || p.categoria === filterCat
    const matchMonth = filterMonth === "todos" || p.periodo === filterMonth
    return matchSearch && matchCat && matchMonth
  }).sort((a,b) => b.asignado - a.asignado)

  const totalAsignado = presupuestosFiltrados.reduce((acc, p) => acc + p.asignado, 0)
  const totalGastado = presupuestosFiltrados.reduce((acc, p) => acc + p.gastado, 0)
  const isOverAudit = totalGastado > totalAsignado

  const catEnRiesgo = presupuestosFiltrados.filter(p => p.gastado > p.asignado * 0.8)

  // Gráficos Data
  const donutData = [
    { name: "Gastado", value: Math.min(totalGastado, totalAsignado), color: isOverAudit ? "#ca2c41" : "#2d2b3b" },
    { name: "Disponible", value: Math.max(0, totalAsignado - totalGastado), color: "#f3f4f6" },
  ]

  const barChartData = presupuestosFiltrados.map(p => ({
    name: getCategoriaDisplay(p.categoria).name,
    Asignado: p.asignado,
    Consumido: p.gastado,
    hex: getCategoriaDisplay(p.categoria).hex
  }))

  return (
    <div className="flex flex-col w-full h-full min-h-full">
      {/* ── Editorial Paper Wrapper ── */}
      <div className="bg-[#fbfbfb] rounded-2xl w-full min-h-[85vh] p-6 sm:p-10 shadow-xl overflow-hidden text-[#2d2b3b] font-sans border border-[#e5e7eb] relative flex flex-col">

        {/* ── Top Header Navbar ── */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b-2 border-[#2d2b3b]/10 pb-4 gap-4">
          <div className="flex gap-6 text-sm font-bold tracking-wider text-[#2d2b3b]/80 uppercase">
            {["Planificador", "Ejecución Visual", "Reglas Automáticas"].map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer pb-1 transition-colors ${activeTab === tab
                    ? "border-b-2 border-[#10b981] text-[#2d2b3b]" // Usando emerald para presupuesto
                    : "hover:text-[#2d2b3b]"
                  }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {activeTab === "Planificador" && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={handleOpenNewDialog}
                  className="flex items-center gap-2 bg-[#10b981] text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest shadow hover:bg-[#059669] transition-colors uppercase"
                >
                  <Plus size={14} strokeWidth={3} />
                  Nuevo Presupuesto
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white border border-[#2d2b3b]/10 text-[#2d2b3b] rounded-2xl p-6">
                <DialogHeader>
                  <DialogTitle className="font-serif italic text-2xl text-[#2d2b3b]">
                    {editingId ? "Editar Límite" : "Asignar Partida"}
                  </DialogTitle>
                  <DialogDescription className="text-[#2d2b3b]/60 font-sans">
                    El presupuesto es intención. Define un límite duro para guiar la ejecución de tu capital.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-5 py-4 font-sans">
                  <div className="grid gap-2">
                    <Label htmlFor="categoria" className="font-bold text-xs uppercase tracking-widest text-[#2d2b3b]/80">Categoría</Label>
                    <Select value={formData.categoria} onValueChange={(val) => setFormData({ ...formData, categoria: val })}>
                      <SelectTrigger className="bg-[#fbfbfb] border-[#e5e7eb] focus:ring-[#10b981]">
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
                    <Label htmlFor="asignado" className="font-bold text-xs uppercase tracking-widest text-[#2d2b3b]/80">Límite Asignado (Bs)</Label>
                    <Input
                      id="asignado"
                      type="number"
                      placeholder="0.00"
                      value={formData.asignado}
                      onChange={(e) => setFormData({ ...formData, asignado: e.target.value })}
                      className="bg-[#fbfbfb] border-[#e5e7eb] focus-visible:ring-[#10b981]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="periodo" className="font-bold text-xs uppercase tracking-widest text-[#2d2b3b]/80">Periodo Mensual</Label>
                    <Select value={formData.periodo} onValueChange={(val) => setFormData({ ...formData, periodo: val })}>
                      <SelectTrigger className="bg-[#fbfbfb] border-[#e5e7eb] focus:ring-[#10b981]">
                        <SelectValue placeholder="Mes" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#e5e7eb]">
                        <SelectItem value="2024-03" className="cursor-pointer">Marzo 2024</SelectItem>
                        <SelectItem value="2024-04" className="cursor-pointer">Abril 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 rounded-full text-xs font-bold text-[#2d2b3b] hover:bg-gray-100 transition-colors uppercase">
                    Cancelar
                  </button>
                  <button onClick={handleSave} className="px-5 py-2 rounded-full text-xs font-bold bg-[#2d2b3b] text-white hover:bg-black transition-colors shadow-md uppercase">
                    Establecer
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {activeTab === "Ejecución Visual" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center gap-2 px-4 py-1.5 h-9 rounded-full text-xs font-bold text-[#2d2b3b] border border-[#e5e7eb] hover:bg-gray-100 transition-colors uppercase w-full sm:w-auto focus:outline-none">
                  <Calendar size={14} />
                  {filterMonth === "todos" ? "Histórico General" : filterMonth === "2024-03" ? "Marzo" : filterMonth}
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
        {activeTab === "Ejecución Visual" ? (
          <motion.div key="visual-presupuesto" {...fadeUp} className="flex flex-col flex-1 w-full gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#10b981] pb-2 mb-2">
               <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                  Métricas de <span className="text-[#10b981] italic">Alineación</span>
                </h1>
                <p className="text-sm font-bold font-sans text-[#2d2b3b] uppercase tracking-widest hidden sm:block text-right mb-1">
                  Desviación de Capital <br/><span className="font-normal text-[#2d2b3b]/60">{filterMonth === "todos" ? "Consolidado" : filterMonth}</span>
                </p>
            </div>

            {/* EXPANDED BENTO GRID: 4 Columns Wide */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 min-h-[500px]">
              
              {/* Doughnut Card (Takes 1 Col) */}
              <div className="col-span-1 lg:col-span-1 bg-white p-5 rounded-2xl border border-[#2d2b3b]/10 shadow-sm flex flex-col relative overflow-hidden h-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-serif italic text-[#2d2b3b] font-bold leading-tight">Consumo Total</h3>
                    <p className="text-[10px] text-[#2d2b3b]/50 font-sans uppercase tracking-widest mt-1">Límite Mensual Consolidado</p>
                  </div>
                </div>
                
                <div className="flex-1 w-full min-h-[140px] relative mt-2">
                  {/* Etiqueta central */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none mt-2">
                     <span className={`text-2xl font-black font-mono leading-none ${isOverAudit ? "text-[#ca2c41]" : "text-[#2d2b3b]"}`}>
                       {Math.round((totalGastado / totalAsignado) * 100) || 0}%
                     </span>
                     <span className="text-[9px] uppercase tracking-widest text-[#2d2b3b]/50 font-bold">Quemado</span>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-[#2d2b3b]/5">
                   <div className="flex justify-between items-center w-full">
                     <span className="text-[9px] font-bold text-[#2d2b3b]/60 uppercase tracking-wider">Asignación Total</span>
                     <span className="text-xs font-mono font-bold text-[#2d2b3b]">Bs {totalAsignado.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center w-full">
                     <span className="text-[9px] font-bold text-[#2d2b3b]/60 uppercase tracking-wider">Ejecución Real</span>
                     <span className={`text-xs font-mono font-bold ${isOverAudit ? "text-[#ca2c41]" : "text-[#2d2b3b]"}`}>Bs {totalGastado.toLocaleString()}</span>
                   </div>
                </div>
              </div>

              {/* Bar Chart Card (Takes 3 Cols) - Asignado vs Consumido */}
              <div className="col-span-1 md:col-span-1 lg:col-span-3 bg-white p-5 rounded-2xl border border-[#2d2b3b]/10 shadow-sm flex flex-col relative h-full">
                 <div className="flex justify-between items-start border-b border-[#2d2b3b]/5 pb-3 mb-6">
                  <div>
                    <h3 className="text-lg font-serif italic text-[#2d2b3b] font-bold">Distribución Táctica</h3>
                    <p className="text-[10px] text-[#2d2b3b]/50 font-sans uppercase tracking-widest mt-0.5">Fricción vs Ejecución por Categoría</p>
                  </div>
                  <div className="flex gap-4 items-center hidden sm:flex">
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#e5e7eb]"></div><span className="text-[10px] uppercase font-bold text-[#2d2b3b]/50 tracking-widest">Límite Asignado</span></div>
                     <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#10b981]"></div><span className="text-[10px] uppercase font-bold text-[#2d2b3b]/50 tracking-widest">Gasto Consumido</span></div>
                  </div>
                </div>

                <div className="flex-1 w-full min-h-[220px] -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} layout="horizontal" barGap={2}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d2b3b" strokeOpacity={0.06} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 10, fontWeight: "bold" }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 10, fontWeight: 500 }} />
                      <Tooltip 
                        cursor={{ fill: "#f3f4f6" }} 
                        contentStyle={{ backgroundColor: "#2d2b3b", borderRadius: "8px", border: "none", color: "white" }}
                        itemStyle={{ fontSize: "12px", fontWeight: "bold", fontFamily: "monospace", color: "white" }}
                        labelStyle={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}
                      />
                      <Bar dataKey="Asignado" fill="#e5e7eb" radius={[4, 4, 0, 0]} maxBarSize={30} />
                      <Bar dataKey="Consumido" radius={[4, 4, 0, 0]} maxBarSize={30}>
                         {barChartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.Consumido > entry.Asignado ? "#ca2c41" : entry.hex} />
                         ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Notification Panel (Takes Full Width) */}
              <div className="col-span-1 lg:col-span-4 bg-[#fbfbfb] p-5 rounded-2xl border border-dashed border-[#2d2b3b]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${catEnRiesgo.length > 0 ? "bg-[#ca2c41]/10 text-[#ca2c41]" : "bg-[#10b981]/10 text-[#10b981]"}`}>
                       {catEnRiesgo.length > 0 ? <AlertTriangle size={24} /> : <Target size={24} />}
                    </div>
                    <div>
                      <h4 className="text-[#2d2b3b] font-bold font-sans uppercase tracking-widest text-xs">
                        {catEnRiesgo.length > 0 ? "Alerta de Desviación Táctica" : "Alineación Óptima"}
                      </h4>
                      <p className="text-sm text-[#2d2b3b]/70 font-sans mt-1">
                        {catEnRiesgo.length > 0 
                          ? `Atención: Tienes ${catEnRiesgo.length} categorí${catEnRiesgo.length>1?'as':'a'} que han superado el 80% de su límite (Fricción alta).` 
                          : "Tu ejecución de capital se mantiene estrictamente dentro de los parámetros diseñados."}
                      </p>
                    </div>
                 </div>
                 {catEnRiesgo.length > 0 && (
                   <div className="flex gap-2">
                     {catEnRiesgo.slice(0, 3).map(c => (
                        <Badge key={c.id} variant="outline" className={`border-0 text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider ${getCategoriaDisplay(c.categoria).color}`}>
                           {getCategoriaDisplay(c.categoria).name}
                        </Badge>
                     ))}
                   </div>
                 )}
              </div>

            </div>
          </motion.div>
        ) : activeTab === "Planificador" ? (
          <div className="flex flex-col lg:flex-row gap-12 flex-1">
            {/* ── Left Narrative Column ── */}
            <div className="w-full lg:w-[35%] flex flex-col pt-2">
              <motion.div key="text-planificador" {...fadeUp} className="flex flex-col h-full">
                <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
                  FICHA <span className="text-[#10b981] italic">TÁCTICA</span>
                </h1>
                <p className="text-xl font-bold font-sans text-[#2d2b3b] mb-8 border-b-2 border-[#10b981] pb-2 inline-block w-fit pr-4">
                  Planificación <span className="font-normal text-[#2d2b3b]/60">| Límites</span>
                </p>

                <h3 className="text-2xl font-serif italic text-[#2d2b3b] mb-4">
                  Intención y Fricción
                </h3>
                <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-6 text-justify">
                  El presupuesto no es una restricción punitiva, es un <strong className="text-[#2d2b3b]">diseño de intenciones</strong>. Consiste en decirle a tu dinero a dónde ir antes de preguntarte a dónde fue.
                </p>
                <p className="text-[15px] leading-relaxed text-[#2d2b3b]/80 font-sans mb-8 text-justify">
                  Establecer límites crea una "fricción útil" que pausa los impulsos cognitivos identificados en tu masterclass, obligándote a evaluar el costo de oportunidad.
                </p>

                <div className="border-l-4 border-[#10b981] pl-4 py-1 mt-auto">
                  <p className="text-[14px] leading-relaxed text-[#2d2b3b] font-sans">
                    <strong>Métrica Clave:</strong> Tienes <span className="font-mono font-bold">Bs {totalAsignado.toLocaleString()}</span> de masa de capital asignada este mes. La ejecución está al <span className="font-mono font-bold text-[#ca2c41]">{Math.round((totalGastado/totalAsignado)*100)}%</span>.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ── Right Content Column ── */}
            <div className="w-full lg:w-[65%] flex flex-col gap-6">
              <motion.div key="view-planificador" {...fadeUp} className="flex flex-col w-full h-full">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center border-b border-[#2d2b3b]/10 pb-4">
                  <div className="w-1.5 h-6 bg-[#2d2b3b] shrink-0 hidden sm:block" />

                  {/* Search */}
                  <div className="relative w-full sm:max-w-xs flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2d2b3b]/50" />
                    <Input
                      placeholder="Buscar partida..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 bg-white border-[#e5e7eb] focus-visible:ring-[#10b981]/20 rounded-full h-9 text-sm text-[#2d2b3b] font-sans"
                    />
                  </div>

                  {/* Filtro y Mes */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center justify-center gap-2 px-4 py-1.5 h-9 rounded-full text-xs font-bold text-[#2d2b3b] border border-[#e5e7eb] hover:bg-gray-100 transition-colors uppercase w-full sm:w-auto focus:outline-none">
                          <Calendar size={14} />
                          {filterMonth === "todos" ? "Histórico General" : "Marzo"}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-[#2d2b3b]/10 shadow-lg rounded-xl min-w-[150px]">
                        <DropdownMenuItem onClick={() => setFilterMonth("2024-03")} className="cursor-pointer font-bold text-xs uppercase tracking-wide">
                          Marzo 2024
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Scrollable Budget List */}
                <div className="flex-1 mt-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                  {presupuestosFiltrados.length === 0 ? (
                    <div className="py-20 text-center text-[#2d2b3b]/50 font-sans italic border-2 border-dashed border-[#e5e7eb] rounded-xl m-2">
                      No hay límites configurados para esta vista.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 pb-10">
                      {presupuestosFiltrados.map((p) => {
                        const catInfo = getCategoriaDisplay(p.categoria)
                        const porcentaje = (p.gastado / p.asignado) * 100
                        const isOver = porcentaje > 100

                        return (
                          <div key={p.id} className="flex items-start w-full gap-4 group py-4 border-b border-[#2d2b3b]/5 hover:bg-[#f3f4f6]/50 transition-colors px-2 rounded-lg">
                            {/* Dot timeline */}
                            <div className="hidden sm:flex flex-col items-center mt-1">
                              <div className={`w-3 h-3 rounded-full border-2 border-white ring-1 ring-[#2d2b3b]/20 ${catInfo.color.split(' ')[0]}`} />
                            </div>

                            <div className="flex-1 flex flex-col gap-3">
                              {/* Header & Numbers */}
                              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[10px] text-[#2d2b3b]/50 tracking-widest uppercase font-bold mb-1">
                                    {p.periodo} {isOver && <span className="text-[#ca2c41] ml-1">• Sobregiro</span>}
                                  </span>
                                  <span className="text-[15px] font-bold font-sans text-[#2d2b3b] leading-tight">
                                    Presupuesto de {catInfo.name}
                                  </span>
                                </div>

                                <div className="flex items-center gap-6">
                                  <Badge variant="outline" className={`hidden sm:inline-flex border-0 text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider ${catInfo.color}`}>
                                    {catInfo.name}
                                  </Badge>
                                  
                                  <div className="text-right flex flex-col items-end min-w-[100px]">
                                    <span className="text-[15px] font-mono font-bold text-[#2d2b3b] leading-none">
                                      Bs {p.asignado.toFixed(2)}
                                    </span>
                                    <span className={`text-[11px] font-mono mt-1 ${isOver ? 'text-[#ca2c41] font-bold' : 'text-[#2d2b3b]/50'}`}>
                                      Bs {p.gastado.toFixed(2)}
                                    </span>
                                  </div>

                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white border border-transparent hover:border-[#2d2b3b]/20 text-[#2d2b3b]/50 hover:text-[#2d2b3b] transition-all focus:outline-none">
                                        <MoreHorizontal size={14} />
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white border-[#2d2b3b]/10 text-[#2d2b3b] shadow-xl rounded-xl">
                                      <DropdownMenuItem onClick={() => handleOpenEditDialog(p)} className="focus:bg-[#fbfbfb] focus:text-[#2d2b3b] cursor-pointer text-xs font-bold uppercase tracking-wider">
                                        <Pencil className="mr-2 h-3 w-3" /> Reajustar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDelete(p.id)} className="focus:bg-red-50 focus:text-[#ca2c41] text-[#ca2c41] cursor-pointer text-xs font-bold uppercase tracking-wider">
                                        <Trash2 className="mr-2 h-3 w-3" /> Eliminar
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>

                              {/* Progress bar */}
                              <div className="w-full flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden flex">
                                   <div 
                                     className="h-full transition-all duration-1000 ease-out"
                                     style={{ 
                                       width: `${Math.min(porcentaje, 100)}%`, 
                                       backgroundColor: isOver ? '#ca2c41' : catInfo.hex 
                                     }}
                                   />
                                </div>
                                <span className={`text-[10px] font-bold font-mono w-10 text-right ${isOver ? 'text-[#ca2c41]' : 'text-[#2d2b3b]/50'}`}>
                                  {porcentaje.toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed border-[#e5e7eb] rounded-2xl bg-[#fbfbfb]/50">
            <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 flex items-center justify-center mb-6">
              <LinkIcon size={32} className="text-[#10b981]" />
            </div>
            <h3 className="text-xl font-bold text-[#2d2b3b] mb-2 font-sans uppercase tracking-widest">Envolventes Algorítmicos</h3>
            <p className="text-sm text-[#2d2b3b]/60 text-center max-w-sm mb-8">
              Autogenera límites flexibles basados en patrones de consumo y varianza de ingresos.
            </p>
            <button className="flex items-center gap-2 bg-[#2d2b3b] text-white px-6 py-3 rounded-full text-xs font-bold tracking-widest shadow-lg hover:bg-black transition-colors uppercase">
              <RefreshCw size={14} />
              Configurar IA
            </button>
            <span className="text-[10px] font-bold text-[#2d2b3b]/40 uppercase tracking-widest mt-4">Disponible en Versión Pro</span>
          </div>
        )}
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
