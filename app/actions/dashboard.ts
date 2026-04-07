"use server"

import { prisma } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function getDashboardData() {
  const session = await getSession()
  if (!session) return null

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      age: true,
      monthlyIncome: true,
    },
  })

  if (!user) return null

  const gastos = await prisma.gasto.findMany({
    where: { userId: session.userId },
    include: { categoria: true },
    orderBy: { fecha: "desc" },
  })

  const metas = await prisma.meta.findMany({
    where: { userId: session.userId },
  })

  const presupuestos = await prisma.presupuesto.findMany({
    where: { userId: session.userId },
    include: { categoria: true },
  })

  const comportamientos = await prisma.comportamiento.findMany({
    where: { userId: session.userId },
    orderBy: { date: "desc" },
  })

  // Calculate insights from real data
  const currentMonth = new Date().toISOString().slice(0, 7)
  const gastosMes = gastos.filter((g) => g.fecha.startsWith(currentMonth))
  const totalGastosMes = gastosMes.reduce((acc, g) => acc + g.monto, 0)

  // Category spending
  const categorySpending: Record<string, number> = {}
  for (const g of gastosMes) {
    const catName = g.categoria.name
    categorySpending[catName] = (categorySpending[catName] || 0) + g.monto
  }

  const topCategory = Object.entries(categorySpending).sort(
    (a, b) => b[1] - a[1]
  )[0]

  const savingsRate =
    user.monthlyIncome > 0
      ? Math.round(
          ((user.monthlyIncome - totalGastosMes) / user.monthlyIncome) * 100
        )
      : 0

  // Monthly trend data (last 6 months)
  const monthlyTrend: { label: string; gastos: number; ingresos: number }[] = []
  const monthNames = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ]
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const monthKey = d.toISOString().slice(0, 7)
    const monthGastos = gastos
      .filter((g) => g.fecha.startsWith(monthKey))
      .reduce((acc, g) => acc + g.monto, 0)
    monthlyTrend.push({
      label: monthNames[d.getMonth()],
      gastos: monthGastos,
      ingresos: user.monthlyIncome,
    })
  }

  // Category data for pie chart
  const categoryData = Object.entries(categorySpending)
    .map(([name, value]) => {
      const cat = gastos.find((g) => g.categoria.name === name)?.categoria
      return {
        name,
        value,
        color: cat?.hex || "#9ca3af",
      }
    })
    .sort((a, b) => b.value - a.value)

  // Active goals for progress bars
  const activeGoals = metas.slice(0, 3).map((m) => ({
    name: m.name,
    target: m.target,
    current: m.current,
    color: m.color,
  }))

  return {
    user,
    insights: {
      topCategory: topCategory?.[0] || "N/A",
      topCategorySpent: topCategory?.[1] || 0,
      savingsRate: Math.max(0, savingsRate),
      totalGastosMes,
    },
    monthlyTrend,
    categoryData,
    activeGoals,
    comportamientos,
  }
}

export async function getPerfilData() {
  const session = await getSession()
  if (!session) return null

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, monthlyIncome: true },
  })

  const comportamientos = await prisma.comportamiento.findMany({
    where: { userId: session.userId },
    orderBy: { date: "desc" },
  })

  // Calculate radar scores from behavior logs
  const categoryScores: Record<string, { total: number; count: number }> = {
    AHORRO: { total: 0, count: 0 },
    AUTOCONTROL: { total: 0, count: 0 },
    "USO DE CRÉDITO": { total: 0, count: 0 },
    PLANIFICACIÓN: { total: 0, count: 0 },
    INVERSIONES: { total: 0, count: 0 },
  }

  const categoryMap: Record<string, string> = {
    Ahorro: "AHORRO",
    Autocontrol: "AUTOCONTROL",
    "Crédito Sano": "USO DE CRÉDITO",
    Crédito: "USO DE CRÉDITO",
    Inversión: "INVERSIONES",
    Gastos: "AUTOCONTROL",
    Planificación: "PLANIFICACIÓN",
  }

  for (const c of comportamientos) {
    const mapped = categoryMap[c.category]
    if (mapped && categoryScores[mapped]) {
      const pts = parseInt(c.impact.replace(/[^-\d]/g, "")) || 0
      categoryScores[mapped].total += pts
      categoryScores[mapped].count++
    }
  }

  const radarData = Object.entries(categoryScores).map(([aspect, data]) => ({
    aspect,
    score: data.count > 0 ? Math.min(100, Math.max(0, 50 + data.total)) : 50,
    fullMark: 100,
  }))

  const totalScore = Math.round(
    radarData.reduce((acc, r) => acc + r.score, 0) / radarData.length
  )

  return {
    user,
    radarData,
    totalScore,
    behaviourLog: comportamientos,
  }
}
