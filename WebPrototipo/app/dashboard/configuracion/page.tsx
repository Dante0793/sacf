"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Shield,
  Bell,
  Palette,
  LogOut,
  Save,
  Globe,
  Smartphone,
  CreditCard,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState("perfil")
  const router = useRouter()

  return (
    <div className="flex flex-col w-full h-full min-h-full">
      {/* ── Editorial Paper Wrapper ── */}
      <div className="bg-[#fbfbfb] rounded-2xl w-full min-h-[85vh] p-6 sm:p-10 shadow-xl overflow-hidden text-[#2d2b3b] font-sans border border-[#e5e7eb] relative flex flex-col gap-8">
        
        {/* ── Page Header ── */}
        <motion.div
          {...fadeUp}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2 mt-4">
              Ajustes <span className="text-[#4c1d95] italic">Plataforma</span>
            </h1>
            <p className="text-sm font-bold font-sans text-[#2d2b3b]/60 uppercase tracking-widest pb-4 border-b border-[#2d2b3b]/10 inline-block pr-6 mb-2">
              Gestión de Cuenta y Preferencias Individuales
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ── Sidebar Menu ── */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="w-full md:w-64 shrink-0 flex flex-col gap-2 md:pr-6 md:border-r border-[#2d2b3b]/5"
          >
            <button
              onClick={() => setActiveTab("perfil")}
              className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "perfil"
                  ? "bg-[#2d2b3b] text-white shadow-md hover:bg-black"
                  : "text-[#2d2b3b]/60 hover:bg-[#f3f4f6]"
              }`}
            >
              <User size={16} strokeWidth={2.5} />
              Perfil
            </button>
            <button
              onClick={() => setActiveTab("preferencias")}
              className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "preferencias"
                  ? "bg-[#2d2b3b] text-white shadow-md hover:bg-black"
                  : "text-[#2d2b3b]/60 hover:bg-[#f3f4f6]"
              }`}
            >
              <Sliders size={16} />
              Preferencias Visuales
            </button>
            <button
              onClick={() => setActiveTab("notificaciones")}
              className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "notificaciones"
                  ? "bg-[#2d2b3b] text-white shadow-md hover:bg-black"
                  : "text-[#2d2b3b]/60 hover:bg-[#f3f4f6]"
              }`}
            >
              <Bell size={16} strokeWidth={2.5} />
              Notificaciones
            </button>
            <button
              onClick={() => setActiveTab("seguridad")}
              className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "seguridad"
                  ? "bg-[#2d2b3b] text-white shadow-md hover:bg-black"
                  : "text-[#2d2b3b]/60 hover:bg-[#f3f4f6]"
              }`}
            >
              <Shield size={16} strokeWidth={2.5} />
              Seguridad
            </button>
            <button
              onClick={() => setActiveTab("suscripcion")}
              className={`w-full text-left px-5 py-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "suscripcion"
                  ? "bg-[#2d2b3b] text-white shadow-md hover:bg-black"
                  : "text-[#2d2b3b]/60 hover:bg-[#f3f4f6]"
              }`}
            >
              <CreditCard size={16} strokeWidth={2.5} />
              Suscripción
            </button>
            
            <Separator className="bg-[#2d2b3b]/5 my-2" />
            
            <button
              onClick={() => router.push("/login")}
              className="w-full text-left px-5 py-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#ca2c41] hover:bg-[#ca2c41]/5 transition-colors"
            >
              <LogOut size={16} strokeWidth={2.5} />
              Cerrar Sesión
            </button>
          </motion.div>

          {/* ── Content Area ── */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            {activeTab === "perfil" && (
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold font-sans text-[#2d2b3b] uppercase tracking-wider mb-6 flex items-center gap-3 flex-wrap">
                  <span className="bg-[#2d2b3b]/5 p-2 rounded-lg"><User size={20} className="text-[#2d2b3b]" /></span>
                  Identidad Digital
                </h2>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 pb-8 border-b border-[#2d2b3b]/5">
                  <div className="w-24 h-24 rounded-full bg-[#fbfbfb] flex items-center justify-center text-[#2d2b3b] text-3xl font-black font-serif border-4 border-[#e5e7eb] shadow-sm italic">
                    JP
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="border-[#2d2b3b]/20 hover:bg-[#fbfbfb] text-[#2d2b3b] uppercase text-[10px] font-bold tracking-widest h-10 px-6 rounded-lg">
                      Cambiar Avatar
                    </Button>
                    <Button variant="ghost" className="text-[#ca2c41] hover:bg-[#ca2c41]/5 hover:text-[#a02030] uppercase text-[10px] font-bold tracking-widest h-10 px-6 rounded-lg">
                      Remover
                    </Button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="grid gap-2">
                    <Label htmlFor="nombre" className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50">Nombre Integrado</Label>
                    <Input id="nombre" defaultValue="Juan Pérez" className="bg-[#fbfbfb] border-[#e5e7eb] h-12 text-sm font-bold text-[#2d2b3b] focus-visible:ring-[#10b981]" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50">Dirección Electrónica</Label>
                    <Input id="email" type="email" defaultValue="juan@email.com" className="bg-[#fbfbfb] border-[#e5e7eb] h-12 text-sm font-bold text-[#2d2b3b] focus-visible:ring-[#10b981]" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="moneda" className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50">Divisa Primaria</Label>
                    <Select defaultValue="bs">
                      <SelectTrigger className="bg-[#fbfbfb] border-[#e5e7eb] h-12 text-sm font-bold text-[#2d2b3b] focus:ring-[#10b981]">
                        <SelectValue placeholder="Selecciona una moneda" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#e5e7eb] text-[#2d2b3b]">
                        <SelectItem value="bs" className="font-bold">Bolívares (Bs)</SelectItem>
                        <SelectItem value="usd" className="font-bold">Dólares (USD)</SelectItem>
                        <SelectItem value="eur" className="font-bold">Euros (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zona" className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50">Coordenada Temporal</Label>
                    <Select defaultValue="ccs">
                      <SelectTrigger className="bg-[#fbfbfb] border-[#e5e7eb] h-12 text-sm font-bold text-[#2d2b3b] focus:ring-[#10b981]">
                        <SelectValue placeholder="Selecciona zona horaria" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#e5e7eb] text-[#2d2b3b]">
                        <SelectItem value="ccs" className="font-bold">América/Caracas (GMT-4)</SelectItem>
                        <SelectItem value="bog" className="font-bold">América/Bogotá (GMT-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <Button className="bg-[#10b981] text-white hover:bg-[#059669] shadow-md uppercase text-xs font-bold tracking-widest rounded-lg px-8 h-12">
                    <Save className="mr-2 h-4 w-4" />
                    Sincronizar Cambios
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === "preferencias" && (
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold font-sans text-[#2d2b3b] uppercase tracking-wider mb-6 flex items-center gap-3">
                  <span className="bg-[#2d2b3b]/5 p-2 rounded-lg"><Palette size={20} className="text-[#2d2b3b]" /></span>
                  Parámetros Estéticos
                </h2>
                <div className="text-[#2d2b3b]/40 text-xs font-bold uppercase tracking-widest flex items-center justify-center py-24 border-2 border-dashed border-[#e5e7eb] bg-[#fbfbfb] rounded-xl text-center px-4">
                  El sistema funciona bajo el estándar "Light Editorial". Módulos oscuros serán deprecados.
                </div>
              </div>
            )}

            {activeTab === "notificaciones" && (
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold font-sans text-[#2d2b3b] uppercase tracking-wider mb-8 flex items-center gap-3">
                  <span className="bg-[#2d2b3b]/5 p-2 rounded-lg"><Bell size={20} className="text-[#2d2b3b]" /></span>
                  Protocolo de Alertas
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between group hover:bg-[#fbfbfb] p-4 rounded-xl transition-colors -mx-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-bold uppercase tracking-wider text-[#2d2b3b]">Límites de Presupuesto</Label>
                      <p className="text-xs font-medium text-[#2d2b3b]/50">Advertencia al superar el 80% de un techo presupuestal.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#10b981]" />
                  </div>
                  <Separator className="bg-[#2d2b3b]/5" />
                  <div className="flex items-center justify-between group hover:bg-[#fbfbfb] p-4 rounded-xl transition-colors -mx-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-bold uppercase tracking-wider text-[#2d2b3b]">Rutina Cognitiva</Label>
                      <p className="text-xs font-medium text-[#2d2b3b]/50">Recordatorios para continuar masterclasses pendientes.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#10b981]" />
                  </div>
                  <Separator className="bg-[#2d2b3b]/5" />
                  <div className="flex items-center justify-between group hover:bg-[#fbfbfb] p-4 rounded-xl transition-colors -mx-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-bold uppercase tracking-wider text-[#2d2b3b]">Auditoría Semanal</Label>
                      <p className="text-xs font-medium text-[#2d2b3b]/50">Documento PDF enviado al correo electrónico configurado.</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-[#10b981]" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "seguridad" && (
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold font-sans text-[#2d2b3b] uppercase tracking-wider mb-8 flex items-center gap-3">
                  <span className="bg-[#2d2b3b]/5 p-2 rounded-lg"><Shield size={20} className="text-[#2d2b3b]" /></span>
                  Bóveda de Seguridad
                </h2>
                
                <div className="grid gap-6 max-w-md">
                  <div className="grid gap-2">
                    <Label htmlFor="old-pass" className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50">Llave Criptográfica Actual</Label>
                    <Input id="old-pass" type="password" placeholder="••••••••" className="bg-[#fbfbfb] border-[#e5e7eb] h-12 text-sm text-[#2d2b3b] focus-visible:ring-[#4c1d95]" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-pass" className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50">Nueva Llave Criptográfica</Label>
                    <Input id="new-pass" type="password" placeholder="••••••••" className="bg-[#fbfbfb] border-[#e5e7eb] h-12 text-sm text-[#2d2b3b] focus-visible:ring-[#4c1d95]" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-pass" className="text-[10px] font-bold uppercase tracking-widest text-[#2d2b3b]/50">Confirmación de Llave Nueva</Label>
                    <Input id="confirm-pass" type="password" placeholder="••••••••" className="bg-[#fbfbfb] border-[#e5e7eb] h-12 text-sm text-[#2d2b3b] focus-visible:ring-[#4c1d95]" />
                  </div>
                  <Button className="w-fit mt-4 bg-[#4c1d95] text-white hover:bg-[#3b1575] uppercase text-xs font-bold tracking-widest rounded-lg px-8 h-12 shadow-sm">
                    Reasignar Credenciales
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "suscripcion" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-black font-serif italic text-[#2d2b3b] mb-2 flex items-center gap-2">
                    Licencia de Software: <span className="font-sans not-italic text-[#2d2b3b]/50 text-sm ml-2 bg-[#e5e7eb] px-3 py-1 rounded-full uppercase tracking-widest">Plan Base</span>
                  </h2>
                  <p className="text-sm font-bold text-[#2d2b3b]/60 mb-8 border-b border-[#2d2b3b]/5 pb-6">
                    Módulo de actualización para Inteligencia Conductual y Coaching Integrado.
                  </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  
                  {/* Premium Individual (Destacado) */}
                  <div className="rounded-2xl border-2 border-[#10b981] bg-white p-8 flex flex-col relative overflow-hidden shadow-lg transform xl:-translate-y-2 z-10 transition-transform">
                    <div className="absolute top-0 right-0 bg-[#10b981] text-white text-[10px] uppercase font-bold px-4 py-1.5 rounded-bl-xl tracking-widest">Recomendado</div>
                    <div className="mb-6 border-b border-[#2d2b3b]/5 pb-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#10b981] mb-2">Premium Individual</h3>
                      <div className="text-4xl font-black font-sans text-[#2d2b3b] mt-1 flex items-end gap-1">Bs 79 <span className="text-xs font-bold uppercase tracking-widest text-[#2d2b3b]/40 mb-1">/ mes</span></div>
                    </div>
                    <ul className="text-sm text-[#2d2b3b]/70 space-y-4 mb-8 flex-1">
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#10b981] shrink-0 mt-0.5" /> <span className="font-medium"><strong>Motor de IA Conductual completo</strong> activo 24/7</span></li>
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#10b981] shrink-0 mt-0.5" /> <span className="font-medium">Sesiones semanales con <strong>coach contable</strong></span></li>
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#10b981] shrink-0 mt-0.5" /> <span className="font-medium">Proyecciones matemáticas y Score dinámico</span></li>
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#10b981] shrink-0 mt-0.5" /> <span className="font-medium">Malla curricular Masterclass sin límite</span></li>
                    </ul>
                    <Button className="w-full bg-[#10b981] text-white hover:bg-[#059669] shadow-md uppercase text-xs font-bold tracking-widest h-12 rounded-xl">Actualizar a Premium</Button>
                  </div>

                  {/* Gratuito */}
                  <div className="rounded-2xl border border-[#e5e7eb] bg-[#fbfbfb] p-8 flex flex-col shadow-sm">
                    <div className="mb-6 border-b border-[#2d2b3b]/5 pb-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#2d2b3b]/50 mb-2">Edición Gratuita</h3>
                      <div className="text-3xl font-black font-sans text-[#2d2b3b] mt-1 flex items-end gap-1">Bs 0</div>
                    </div>
                    <ul className="text-sm text-[#2d2b3b]/60 space-y-4 mb-8 flex-1">
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#2d2b3b]/20 shrink-0 mt-0.5" /> <span className="font-medium">Infraestructura básica de Auditoría Automática</span></li>
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#2d2b3b]/20 shrink-0 mt-0.5" /> <span className="font-medium">Categorización limitativa (Max 3. reglas)</span></li>
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#2d2b3b]/20 shrink-0 mt-0.5" /> <span className="font-medium">Lectura parcial (2 clases) en la Masterclass</span></li>
                    </ul>
                    <Button variant="outline" className="w-full border-2 border-[#e5e7eb] bg-[#fbfbfb] text-[#2d2b3b]/40 cursor-default hover:bg-[#fbfbfb] hover:text-[#2d2b3b]/40 uppercase text-xs font-bold tracking-widest h-12 rounded-xl">Plan Base Actual</Button>
                  </div>
                  
                  {/* Premium Familiar */}
                  <div className="rounded-2xl border border-[#38bdf8]/30 bg-white p-8 flex flex-col shadow-sm">
                    <div className="mb-6 border-b border-[#2d2b3b]/5 pb-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#38bdf8] mb-2">Sindicato Familiar</h3>
                      <div className="text-3xl font-black font-sans text-[#2d2b3b] mt-1 flex items-end gap-1">Bs 129 <span className="text-xs font-bold uppercase tracking-widest text-[#2d2b3b]/40 mb-1">/ mes</span></div>
                    </div>
                    <ul className="text-sm text-[#2d2b3b]/70 space-y-4 mb-8 flex-1">
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#38bdf8] shrink-0 mt-0.5" /> <span className="font-medium">Todos los beneficios Premium para <strong>4 perfiles</strong></span></li>
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#38bdf8] shrink-0 mt-0.5" /> <span className="font-medium">Flujo de Caja Consolidado Familiar</span></li>
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#38bdf8] shrink-0 mt-0.5" /> <span className="font-medium">Metas de ahorro compartido y auditoría</span></li>
                    </ul>
                    <Button className="w-full bg-[#f0f9ff] border-2 border-[#38bdf8]/30 text-[#0284c7] hover:bg-[#e0f2fe] uppercase text-xs font-bold tracking-widest h-12 rounded-xl">Formar Grupo Familiar</Button>
                  </div>

                  {/* Corporativo */}
                  <div className="rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6] p-8 flex flex-col shadow-sm">
                    <div className="mb-6 border-b border-[#2d2b3b]/5 pb-6">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#2d2b3b]/50 mb-2">Plan Institucional</h3>
                      <div className="text-3xl font-black font-sans text-[#2d2b3b] mt-1 flex items-end gap-1">Bs 350+ <span className="text-xs font-bold uppercase tracking-widest text-[#2d2b3b]/40 mb-1">/ mes</span></div>
                    </div>
                    <ul className="text-sm text-[#2d2b3b]/60 space-y-4 mb-8 flex-1">
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#2d2b3b]/30 shrink-0 mt-0.5" /> <span className="font-medium">Licencia de Salud Financiera para Empleados</span></li>
                      <li className="flex gap-3 items-start"><Check size={18} className="text-[#2d2b3b]/30 shrink-0 mt-0.5" /> <span className="font-medium">API Empresarial de retenciones salariales</span></li>
                    </ul>
                    <Button variant="outline" className="w-full border-2 border-[#2d2b3b]/20 bg-transparent text-[#2d2b3b] hover:bg-[#2d2b3b] hover:text-white uppercase text-xs font-bold tracking-widest h-12 rounded-xl transition-all">Contactar con B2B</Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Sliders({ size, className }: { size?: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" x2="20" y1="21" y2="21"/><line x1="4" x2="15" y1="14" y2="14"/><line x1="4" x2="9" y1="7" y2="7"/><path d="M15 17v-6"/><path d="M9 10V4"/>
    </svg>
  )
}
