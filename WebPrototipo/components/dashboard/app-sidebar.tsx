"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  GraduationCap,
  UserCircle,
  BrainCircuit,
  FileBarChart,
  Settings,
  LogOut,
  ChevronUp,
  Target,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navGroups = [
  {
    label: "Principal",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Gastos", href: "/dashboard/gastos", icon: Receipt },
      { title: "Presupuestos", href: "/dashboard/presupuestos", icon: Wallet },
    ],
  },
  {
    label: "Aprendizaje",
    items: [
      { title: "Educación", href: "/dashboard/educacion", icon: GraduationCap },
      { title: "Mi Perfil Financiero", href: "/dashboard/perfil-financiero", icon: UserCircle },
    ],
  },
  {
    label: "Herramientas",
    items: [
      { title: "Metas de Vida", href: "/dashboard/metas", icon: Target },
      { title: "Recomendaciones IA", href: "/dashboard/recomendaciones", icon: BrainCircuit },
      { title: "Reportes", href: "/dashboard/reportes", icon: FileBarChart },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user)
      })
      .catch(() => {})
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const displayName = user?.name || "Usuario"
  const displayEmail = user?.email || ""

  return (
    <Sidebar collapsible="icon" className="border-r border-[#e5e7eb] bg-white">
      {/* ─── Header: Tlacuache Logo ── */}
      <SidebarHeader className="h-14 flex flex-row items-center border-b border-[#e5e7eb] px-4 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#2d2b3b] shadow-sm shrink-0 transition-transform group-hover:scale-110 overflow-hidden border border-[#2d2b3b]">
            <svg width="100%" height="100%" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[0.8]">
              {/* Orejas */}
              <circle cx="14" cy="16" r="8" fill="#e5e7eb" />
              <circle cx="38" cy="16" r="8" fill="#e5e7eb" />
              <circle cx="14" cy="16" r="4.5" fill="black" />
              <circle cx="38" cy="16" r="4.5" fill="black" />
              
              {/* Cara */}
              <path d="M7 24 C7 14, 45 14, 45 24 C45 34, 30 46, 26 48 C22 46, 7 34, 7 24 Z" fill="#fcfcfc" />
              
              {/* Mancha negra frente */}
              <path d="M18 12 Q26 28 34 12 L26 12 Z" fill="black" />
              
              {/* Ojos */}
              <circle cx="20" cy="27" r="3" fill="black" />
              <circle cx="32" cy="27" r="3" fill="black" />
              <circle cx="19.5" cy="26" r="1.5" fill="white" />
              <circle cx="31.5" cy="26" r="1.5" fill="white" />
              
              {/* Nariz */}
              <path d="M23 44 C23 41, 29 41, 29 44 L26 49 Z" fill="#ea580c" />
            </svg>
          </div>
          <span className="text-xl font-bold font-sans tracking-[0.2em] text-[#2d2b3b] group-data-[collapsible=icon]:hidden mt-0.5 ml-1">
            S<span className="text-[#ea580c]">A</span>CF
          </span>
        </Link>
      </SidebarHeader>

      {/* ─── Navigation con Contraste Elevado ── */}
      <SidebarContent className="px-2 pt-4">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[11px] uppercase tracking-widest text-[#2d2b3b]/60 font-black mb-1 group-data-[collapsible=icon]:hidden px-2">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href)
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={
                           "text-[#2d2b3b]/70 hover:bg-[#2d2b3b]/5 hover:text-[#2d2b3b] font-bold rounded-xl data-[active=true]:bg-[#2d2b3b] data-[active=true]:text-white data-[active=true]:shadow-md data-[active=true]:focus:bg-black"
                        }
                      >
                        <Link href={item.href} className="flex items-center gap-3 px-2 py-5">
                          <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-[#78fcd6] group-data-[active=true]/menu-button:text-[#78fcd6] z-10 relative" : ""} />
                          <span className={`text-[13px] ${isActive ? "tracking-wide" : ""}`}>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator className="mx-4 opacity-50" />

      {/* ─── Footer: Configuración ── */}
      <SidebarFooter className="p-4 pb-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/configuracion"}
              tooltip="Configuración"
              className={
                 "text-[#2d2b3b]/70 hover:bg-[#2d2b3b]/5 hover:text-[#2d2b3b] font-bold rounded-xl data-[active=true]:bg-[#2d2b3b] data-[active=true]:text-white data-[active=true]:shadow-md data-[active=true]:focus:bg-black"
              }
            >
              <Link href="/dashboard/configuracion" className="flex items-center gap-3 px-2 py-5">
                <Settings size={18} strokeWidth={pathname === "/dashboard/configuracion" ? 2.5 : 2} className={pathname === "/dashboard/configuracion" ? "text-[#78fcd6] group-data-[active=true]/menu-button:text-[#78fcd6] z-10 relative" : ""} />
                <span className="text-[13px]">Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="mt-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="hover:bg-gray-100 hover:shadow-sm border border-transparent rounded-xl transition-all p-1"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#ea580c] text-white text-xs font-black shrink-0 relative z-20 shadow-inner">
                    {displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden px-1">
                    <span className="text-[13px] font-black text-[#2d2b3b]">{displayName}</span>
                    <span className="text-[10px] text-[#2d2b3b]/50 tracking-wide font-mono">{displayEmail}</span>
                  </div>
                  <ChevronUp className="ml-auto group-data-[collapsible=icon]:hidden opacity-50" size={14} />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-56 bg-white border border-[#e5e7eb] shadow-xl font-sans rounded-xl mb-2"
              >
                <DropdownMenuItem onClick={handleLogout} className="text-[#ca2c41] font-bold focus:bg-red-50 focus:text-[#ca2c41] cursor-pointer text-xs uppercase tracking-widest pl-4 py-3">
                  <LogOut size={14} className="mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
