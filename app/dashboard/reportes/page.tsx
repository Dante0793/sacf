"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Download,
  CalendarDays,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// ── Mock data ──
const comparisonData = [
  { mes: "Ene", gastos: 3400, ingresos: 8000 },
  { mes: "Feb", gastos: 3200, ingresos: 8300 },
  { mes: "Mar", gastos: 4100, ingresos: 8500 },
  { mes: "Abr", gastos: 3100, ingresos: 8500 },
  { mes: "May", gastos: 3800, ingresos: 8600 },
  { mes: "Jun", gastos: 3500, ingresos: 8600 },
]

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function ReportesPage() {
  const [period, setPeriod] = useState("6m")

  return (
    <div className="flex flex-col w-full h-full min-h-full">
      {/* ── Editorial Paper Wrapper ── */}
      <div className="bg-[#fbfbfb] rounded-2xl w-full min-h-[85vh] p-6 sm:p-10 shadow-xl overflow-hidden text-[#2d2b3b] font-sans border border-[#e5e7eb] relative flex flex-col gap-8">
        
        {/* ── Page Header ── */}
        <motion.div
          {...fadeUp}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2 mt-2">
              Reportes <span className="text-[#10b981] italic">Avanzados</span>
            </h1>
            <p className="text-sm font-bold font-sans text-[#2d2b3b]/60 uppercase tracking-widest pb-4 border-b border-[#2d2b3b]/10 inline-block pr-6 mb-2">
              Auditoría Cuantitativa y Exportación Documental
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-[#2d2b3b]/20 text-[#2d2b3b] hover:bg-gray-100 uppercase text-xs font-bold tracking-widest rounded-full px-5 h-10 shadow-sm border-2">
              <Download className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button className="bg-[#2d2b3b] text-white hover:bg-black uppercase text-xs font-bold tracking-widest rounded-full px-5 h-10 shadow-md">
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
          </div>
        </motion.div>

        {/* ── Filter bar ── */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm flex flex-wrap gap-4 items-center"
        >
          <div className="flex items-center gap-2 border-r border-[#2d2b3b]/10 pr-4">
            <Filter size={16} className="text-[#2d2b3b]/50 ml-2" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#2d2b3b]/80 mr-2">Filtros Activos:</span>
          </div>
          
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px] bg-[#fbfbfb] border-[#e5e7eb] h-9 text-xs font-bold tracking-wider uppercase text-[#2d2b3b] focus:ring-[#10b981]">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#e5e7eb] text-[#2d2b3b]">
              <SelectItem value="1m" className="text-xs uppercase font-bold tracking-wider cursor-pointer">Último mes</SelectItem>
              <SelectItem value="3m" className="text-xs uppercase font-bold tracking-wider cursor-pointer">Últimos 3 meses</SelectItem>
              <SelectItem value="6m" className="text-xs uppercase font-bold tracking-wider cursor-pointer">Últimos 6 meses</SelectItem>
              <SelectItem value="1y" className="text-xs uppercase font-bold tracking-wider cursor-pointer">Este año</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] bg-[#fbfbfb] border-[#e5e7eb] h-9 text-xs font-bold tracking-wider uppercase text-[#2d2b3b] focus:ring-[#10b981]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#e5e7eb] text-[#2d2b3b]">
              <SelectItem value="all" className="text-xs uppercase font-bold tracking-wider cursor-pointer">Consolidado</SelectItem>
              <SelectItem value="comida" className="text-xs uppercase font-bold tracking-wider cursor-pointer">Alimentos</SelectItem>
              <SelectItem value="transporte" className="text-xs uppercase font-bold tracking-wider cursor-pointer">Movilidad</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" className="h-9 px-4 text-[#ca2c41] hover:bg-red-50 hover:text-red-700 text-xs font-bold uppercase tracking-widest">
            Limpiar Parámetros
          </Button>
        </motion.div>

        {/* ── Summary metrics Bento Box ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-[#2d2b3b]/10 bg-white p-6 relative overflow-hidden shadow-sm group hover:border-[#ca2c41]/30 transition-colors"
          >
            <div className="absolute right-0 top-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Activity size={100} className="text-[#ca2c41]" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50 mb-1">Masa Operativa (Gastos)</div>
            <div className="text-3xl font-black font-mono text-[#2d2b3b] mb-3">Bs 3,516</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#ca2c41] flex items-center bg-[#ca2c41]/10 w-fit px-2 py-0.5 rounded-sm">
              <ArrowUpRight size={14} className="mr-1 stroke-[3]" />
              12% vs Semestre Pasado
            </div>
          </motion.div>
          
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-[#2d2b3b]/10 bg-white p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute right-0 top-0 p-4 opacity-[0.03]">
              <CalendarDays size={100} className="text-[#2d2b3b]" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50 mb-1">Día de Densidad Máxima</div>
            <div className="text-3xl font-black font-sans uppercase text-[#2d2b3b] mb-3 tracking-tighter">Viernes</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/60">Concentra el 35% del Capital</div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-[#2d2b3b]/10 bg-white p-6 relative overflow-hidden shadow-sm group hover:border-[#10b981]/30 transition-colors"
          >
            <div className="absolute right-0 top-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <ArrowUpRight size={100} className="text-[#10b981]" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50 mb-1">Retención de Capital</div>
            <div className="text-3xl font-black font-mono text-[#10b981] mb-3">18.5%</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#10b981] flex items-center bg-[#10b981]/10 w-fit px-2 py-0.5 rounded-sm mb-3">
              <ArrowUpRight size={14} className="mr-1 stroke-[3]" />
              +2.5% Expansión Neta
            </div>
            <ProgressReport value={18.5} />
          </motion.div>
        </div>

        {/* ── Comparative Chart Master Layout ── */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-[#2d2b3b]/10 bg-white p-6 flex-1 min-h-[400px] flex flex-col shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-[#2d2b3b]/5 pb-4">
            <div className="w-1.5 h-6 bg-[#4c1d95]" />
            <div>
              <h3 className="text-xl font-bold font-sans text-[#2d2b3b] tracking-wider uppercase">Espectro de Flujo de Caja</h3>
              <p className="text-[10px] text-[#2d2b3b]/50 font-sans uppercase tracking-widest mt-0.5">Ingresos vs Gastos {period === '6m' ? '(Últimos 6 Meses)' : ''}</p>
            </div>
          </div>
          <div className="h-[320px] w-full mt-2 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2d2b3b" strokeOpacity={0.06} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 11, fontWeight: "bold" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#2d2b3b", fontSize: 11, fontWeight: 500 }} />
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  contentStyle={{ backgroundColor: "#2d2b3b", borderRadius: "8px", border: "none", color: "white", padding: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  itemStyle={{ fontSize: "14px", fontWeight: "bold", fontFamily: "monospace" }}
                  labelStyle={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "20px", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }} 
                  iconType="circle"
                />
                <Bar dataKey="ingresos" name="Ingresos (Inflow)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={35} />
                <Bar dataKey="gastos" name="Gastos (Outflow)" fill="#ca2c41" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ProgressReport({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full bg-[#f3f4f6] rounded-full overflow-hidden border border-[#e5e7eb]">
      <div 
        className="h-full bg-[#10b981] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" 
        style={{ width: `${Math.min(value * 3, 100)}%` }} // Scaled just for visual purposes
      />
    </div>
  )
}
