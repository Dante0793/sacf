"use server"

import { prisma } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function getGastos() {
  const session = await getSession()
  if (!session) return []

  return prisma.gasto.findMany({
    where: { userId: session.userId },
    include: { categoria: true },
    orderBy: { fecha: "desc" },
  })
}

export async function getCategorias() {
  return prisma.categoria.findMany({ orderBy: { name: "asc" } })
}

export async function createGasto(data: {
  monto: number
  categoriaId: string
  descripcion: string
  fecha: string
}) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  return prisma.gasto.create({
    data: {
      ...data,
      userId: session.userId,
    },
    include: { categoria: true },
  })
}

export async function updateGasto(
  id: string,
  data: {
    monto: number
    categoriaId: string
    descripcion: string
    fecha: string
  }
) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  return prisma.gasto.update({
    where: { id },
    data,
    include: { categoria: true },
  })
}

export async function deleteGasto(id: string) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  return prisma.gasto.delete({ where: { id } })
}
