import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { hashPassword } from "@/lib/password"
import { createSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con este correo" },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
      },
    })

    // Create default categories for new user if none exist
    const catCount = await prisma.categoria.count()
    if (catCount === 0) {
      await prisma.categoria.createMany({
        data: [
          { id: "comida", name: "Comida", color: "bg-[#ca2c41] text-white", hex: "#ca2c41" },
          { id: "transporte", name: "Transporte", color: "bg-[#4c1d95] text-white", hex: "#4c1d95" },
          { id: "servicios", name: "Servicios", color: "bg-[#f59e0b] text-white", hex: "#f59e0b" },
          { id: "ocio", name: "Ocio", color: "bg-[#38bdf8] text-white", hex: "#38bdf8" },
          { id: "salud", name: "Salud", color: "bg-[#10b981] text-white", hex: "#10b981" },
          { id: "otros", name: "Otros", color: "bg-[#9ca3af] text-white", hex: "#9ca3af" },
        ],
        skipDuplicates: true,
      })
    }

    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
    })

    return NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
