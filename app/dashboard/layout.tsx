"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { Separator } from "@/components/ui/separator"
import dynamic from "next/dynamic"

const AiChatWidget = dynamic(
  () => import("@/components/dashboard/ai-chat-widget").then((m) => ({ default: m.AiChatWidget })),
  { ssr: false }
)

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/gastos": "Registro de Gastos",
  "/dashboard/presupuestos": "Presupuestos",
  "/dashboard/educacion": "Educación Financiera",
  "/dashboard/perfil-financiero": "Perfil Financiero",
  "/dashboard/metas": "Metas de Vida",
  "/dashboard/recomendaciones": "Recomendaciones IA",
  "/dashboard/reportes": "Reportes",
  "/dashboard/configuracion": "Configuración",
}

function PrototypeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 flex flex-col gap-6 border border-[#e5e7eb]">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ca2c41]">Aviso importante</span>
          <h2 className="text-2xl font-black font-serif text-[#2d2b3b] leading-tight">
            Esto es un <span className="italic text-[#4c1d95]">Prototipo</span>
          </h2>
        </div>
        <div className="border-t border-[#e5e7eb] pt-4 flex flex-col gap-3 text-[15px] text-[#2d2b3b]/80 leading-relaxed font-sans">
          <p>
            La aplicación que estás explorando es un <strong>prototipo de demostración</strong> y no representa el producto final.
          </p>
          <p>
            Algunos datos mostrados son ficticios y están aquí únicamente con fines ilustrativos. Algunas funciones pueden estar incompletas o comportarse de manera inesperada.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-2 w-full py-3 bg-[#2d2b3b] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#4c1d95] transition-colors"
        >
          Entendido, continuar
        </button>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutInner>{children}</DashboardLayoutInner>
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pageTitle = breadcrumbMap[pathname] ?? "Dashboard"
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("sacf_prototype_seen")) {
      setShowModal(true)
    }
  }, [])

  function handleClose() {
    localStorage.setItem("sacf_prototype_seen", "1")
    setShowModal(false)
  }

  return (
    <SidebarProvider>
      {showModal && <PrototypeModal onClose={handleClose} />}
      <AppSidebar />
      <SidebarInset>
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e5e7eb] bg-white px-4">
          <SidebarTrigger className="text-[#2d2b3b]/60 hover:text-[#2d2b3b] transition-colors" />
          <Separator orientation="vertical" className="mr-1 h-4 bg-[#e5e7eb]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2d2b3b]/40">{pageTitle}</span>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 relative bg-white">
          {children}
          <AiChatWidget />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
