"use server"

import { prisma } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function getMetas() {
  const session = await getSession()
  if (!session) return []

  return prisma.meta.findMany({
    where: { userId: session.userId },
    orderBy: { current: "desc" },
  })
}

export async function createMeta(data: {
  name: string
  target: number
  current: number
  date: string
  color: string
  status?: string
}) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  return prisma.meta.create({
    data: {
      ...data,
      status: data.status || "Nueva meta",
      userId: session.userId,
    },
  })
}

export async function updateMeta(
  id: string,
  data: { name: string; target: number; current: number; date: string }
) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  return prisma.meta.update({
    where: { id },
    data,
  })
}

export async function deleteMeta(id: string) {
  const session = await getSession()
  if (!session) throw new Error("No autorizado")

  return prisma.meta.delete({ where: { id } })
}
