import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // ── Categorías globales ──
  const categorias = await Promise.all([
    prisma.categoria.upsert({ where: { id: "comida" }, update: {}, create: { id: "comida", name: "Comida", color: "bg-[#ca2c41] text-white", hex: "#ca2c41" } }),
    prisma.categoria.upsert({ where: { id: "transporte" }, update: {}, create: { id: "transporte", name: "Transporte", color: "bg-[#4c1d95] text-white", hex: "#4c1d95" } }),
    prisma.categoria.upsert({ where: { id: "servicios" }, update: {}, create: { id: "servicios", name: "Servicios", color: "bg-[#f59e0b] text-white", hex: "#f59e0b" } }),
    prisma.categoria.upsert({ where: { id: "ocio" }, update: {}, create: { id: "ocio", name: "Ocio", color: "bg-[#38bdf8] text-white", hex: "#38bdf8" } }),
    prisma.categoria.upsert({ where: { id: "salud" }, update: {}, create: { id: "salud", name: "Salud", color: "bg-[#10b981] text-white", hex: "#10b981" } }),
    prisma.categoria.upsert({ where: { id: "otros" }, update: {}, create: { id: "otros", name: "Otros", color: "bg-[#9ca3af] text-white", hex: "#9ca3af" } }),
  ])

  console.log(`✅ ${categorias.length} categorías creadas`)

  // ── Usuarios demo ──
  const passwordHash = await bcrypt.hash("Demo1234", 10)

  const users = [
    { name: "Juan Pérez", email: "juan@sacf.bo", role: "Arquitecto Freelance", age: 28, monthlyIncome: 8500 },
    { name: "María García", email: "maria@sacf.bo", role: "Diseñadora UX", age: 31, monthlyIncome: 7200 },
    { name: "Carlos López", email: "carlos@sacf.bo", role: "Contador", age: 35, monthlyIncome: 9500 },
    { name: "Ana Morales", email: "ana@sacf.bo", role: "Profesora", age: 27, monthlyIncome: 5800 },
    { name: "Roberto Chávez", email: "roberto@sacf.bo", role: "Desarrollador Web", age: 24, monthlyIncome: 6500 },
  ]

  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        passwordHash,
        role: u.role,
        age: u.age,
        monthlyIncome: u.monthlyIncome,
      },
    })

    console.log(`👤 Usuario: ${user.name} (${user.email})`)

    // ── Gastos (últimos 6 meses, ~15-25 por mes) ──
    const gastosDescripciones: Record<string, string[]> = {
      comida: ["Almuerzo en restaurante", "Supermercado", "Café", "Cena familiar", "Delivery pizza", "Mercado semanal", "Panadería", "Sushi con amigos"],
      transporte: ["Uber al trabajo", "Gasolina", "Taxi al aeropuerto", "Pasaje de bus", "Estacionamiento", "Mantenimiento auto"],
      servicios: ["Pago de luz", "Internet fibra", "Agua potable", "Gas doméstico", "Teléfono celular", "Servicio de limpieza"],
      ocio: ["Cine con amigos", "Suscripción Spotify", "Netflix mensual", "Concierto", "Videojuego nuevo", "Salida al parque", "Bowling"],
      salud: ["Farmacia", "Consulta médica", "Vitaminas", "Dentista", "Gimnasio mensual", "Lentes nuevos"],
      otros: ["Regalo cumpleaños", "Ropa nueva", "Libros", "Donación", "Reparación celular"],
    }

    const catIds = ["comida", "transporte", "servicios", "ocio", "salud", "otros"]
    const montoRanges: Record<string, [number, number]> = {
      comida: [15, 500],
      transporte: [10, 200],
      servicios: [50, 400],
      ocio: [20, 350],
      salud: [30, 500],
      otros: [20, 300],
    }

    for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
      const numGastos = 15 + Math.floor(Math.random() * 11) // 15-25 per month
      for (let i = 0; i < numGastos; i++) {
        const catId = catIds[Math.floor(Math.random() * catIds.length)]
        const descs = gastosDescripciones[catId]
        const desc = descs[Math.floor(Math.random() * descs.length)]
        const [min, max] = montoRanges[catId]
        const monto = Math.round((min + Math.random() * (max - min)) * 100) / 100

        const date = new Date()
        date.setMonth(date.getMonth() - monthOffset)
        date.setDate(1 + Math.floor(Math.random() * 28))
        const fecha = date.toISOString().split("T")[0]

        await prisma.gasto.create({
          data: {
            fecha,
            descripcion: desc,
            monto,
            categoriaId: catId,
            userId: user.id,
          },
        })
      }
    }

    console.log(`  💸 Gastos creados (6 meses)`)

    // ── Metas ──
    const metasData = [
      { name: "Fondo de Tranquilidad", target: 35000, current: 5000 + Math.random() * 20000, date: "Dic 2025", color: "#10b981", status: "Avanzando" },
      { name: "Viaje a Japón", target: 56000, current: 2000 + Math.random() * 15000, date: "Oct 2026", color: "#f59e0b", status: "Iniciado" },
      { name: "Enganche Casa Propia", target: 350000, current: 10000 + Math.random() * 80000, date: "2028", color: "#4c1d95", status: "A largo plazo" },
      { name: "Cursos y Maestría", target: 45000, current: 1000 + Math.random() * 8000, date: "Ene 2027", color: "#ca2c41", status: "Iniciado" },
    ]

    for (const m of metasData) {
      await prisma.meta.create({
        data: {
          name: m.name,
          target: m.target,
          current: Math.round(m.current),
          date: m.date,
          color: m.color,
          status: m.status,
          userId: user.id,
        },
      })
    }

    console.log(`  🎯 4 metas creadas`)

    // ── Presupuestos (últimos 3 meses) ──
    const presupuestosBase: Record<string, number> = {
      comida: 600 + Math.random() * 400,
      transporte: 200 + Math.random() * 200,
      servicios: 300 + Math.random() * 200,
      ocio: 300 + Math.random() * 300,
      salud: 100 + Math.random() * 150,
    }

    for (let monthOffset = 0; monthOffset < 3; monthOffset++) {
      const date = new Date()
      date.setMonth(date.getMonth() - monthOffset)
      const periodo = date.toISOString().slice(0, 7)

      for (const [catId, asignado] of Object.entries(presupuestosBase)) {
        const gastado = asignado * (0.5 + Math.random() * 0.7) // 50%-120% spent
        await prisma.presupuesto.create({
          data: {
            asignado: Math.round(asignado),
            gastado: Math.round(gastado * 100) / 100,
            periodo,
            categoriaId: catId,
            userId: user.id,
          },
        })
      }
    }

    console.log(`  📊 Presupuestos creados (3 meses)`)

    // ── Comportamientos ──
    const comportamientosData = [
      { date: "Mar 15, 2026", time: "10:00", action: "Primer depósito automático para invertir", category: "Inversión", impact: "+5 pts", color: "bg-[#10b981]" },
      { date: "Mar 14, 2026", time: "13:20", action: "Gasto impulsivo fuera de presupuesto", category: "Gastos", impact: "-2 pts", color: "bg-[#ca2c41]" },
      { date: "Mar 12, 2026", time: "10:00", action: "Hiciste el pago total de tu Tarjeta", category: "Crédito Sano", impact: "+12 pts", color: "bg-[#4c1d95]" },
      { date: "Mar 10, 2026", time: "11:00", action: "Programaste tu ahorro mensual", category: "Ahorro", impact: "+8 pts", color: "bg-[#38bdf8]" },
      { date: "Mar 08, 2026", time: "09:00", action: "Superaste un antojo sin gastar", category: "Autocontrol", impact: "+4 pts", color: "bg-[#10b981]" },
      { date: "Mar 05, 2026", time: "14:30", action: "Leve retraso en pago programado", category: "Crédito", impact: "-1 pt", color: "bg-[#f59e0b]" },
      { date: "Mar 03, 2026", time: "16:00", action: "Revisaste tu balance semanal", category: "Planificación", impact: "+3 pts", color: "bg-[#4c1d95]" },
      { date: "Mar 01, 2026", time: "08:30", action: "Ahorraste el 20% de tu ingreso", category: "Ahorro", impact: "+10 pts", color: "bg-[#10b981]" },
      { date: "Feb 28, 2026", time: "19:00", action: "Compraste por impulso en oferta", category: "Gastos", impact: "-3 pts", color: "bg-[#ca2c41]" },
      { date: "Feb 25, 2026", time: "10:00", action: "Investigaste opciones de inversión", category: "Inversión", impact: "+6 pts", color: "bg-[#f59e0b]" },
    ]

    for (const c of comportamientosData) {
      await prisma.comportamiento.create({
        data: { ...c, userId: user.id },
      })
    }

    console.log(`  📝 10 comportamientos creados`)
  }

  console.log("\n✅ Seed completado!")
  console.log("\n📋 Credenciales de acceso:")
  console.log("   Email: juan@sacf.bo  |  Password: Demo1234")
  console.log("   Email: maria@sacf.bo |  Password: Demo1234")
  console.log("   Email: carlos@sacf.bo|  Password: Demo1234")
  console.log("   Email: ana@sacf.bo   |  Password: Demo1234")
  console.log("   Email: roberto@sacf.bo| Password: Demo1234")
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
