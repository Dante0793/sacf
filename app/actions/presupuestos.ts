"use server"

import { prisma } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function getPresupuestos() {
  const session = await getSession()
  if (!session) return []

  return prisma.presupuesto.findMany({
    where: { userId: session.userId },
    include: { categoria: true },
    orderBy: { asignado: "desc" },
  })
}

export async function createPresupuesto(data: {
  asignado: number
  categoriaId: string
  periodo: string
}) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  return prisma.presupuesto.create({
    data: {
      ...data,
      userId: session.userId,
    },
    include: { categoria: true },
  })
}

export async function updatePresupuesto(
  id: string,
  data: { asignado: number; categoriaId: string; periodo: string }
) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  return prisma.presupuesto.update({
    where: { id },
    data,
    include: { categoria: true },
  })
}

export async function deletePresupuesto(id: string) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  return prisma.presupuesto.delete({ where: { id } })
}
