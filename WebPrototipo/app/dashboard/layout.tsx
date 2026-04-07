"use client"

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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutInner>{children}</DashboardLayoutInner>
}

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pageTitle = breadcrumbMap[pathname] ?? "Dashboard"

  return (
    <SidebarProvider>
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
