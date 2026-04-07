"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

// ── Scramble Utils ───────────────────────────────────────────
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&'
const PHRASES: [string, string][] = [
  ["Controla tu dinero,", "no tus emociones."],
  ["Toma mejores", "decisiones hoy."],
  ["Tu futuro empieza", "con un hábito."],
]

function rand() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

function scrambleTo(
  el: HTMLElement,
  target: string,
  duration: number,
  onDone?: () => void
) {
  el.innerHTML = target
    .split("")
    .map(() => `<span style="display:inline-block;white-space:pre">${rand()}</span>`)
    .join("")

  const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span"))
  const len = target.length
  const start = Date.now()

  function tick() {
    const progress = Math.min((Date.now() - start) / duration, 1)
    spans.forEach((sp, i) => {
      const cp = Math.max(0, (progress - (i / len) * 0.55) / 0.45)
      sp.textContent =
        cp >= 1
          ? target[i] === " " ? "\u00a0" : target[i]
          : target[i] === " " ? "\u00a0" : rand()
    })
    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      spans.forEach((sp, i) => {
        sp.textContent = target[i] === " " ? "\u00a0" : target[i]
      })
      onDone?.()
    }
  }
  requestAnimationFrame(tick)
}

function scrambleOut(
  el: HTMLElement,
  duration: number,
  onDone?: () => void
) {
  const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span"))
  if (!spans.length) { onDone?.(); return }
  const start = Date.now()
  const len = spans.length

  function tick() {
    const progress = Math.min((Date.now() - start) / duration, 1)
    spans.forEach((sp, i) => {
      const p = Math.max(0, (progress - (i / len) * 0.4) / 0.6)
      if (p > 0) sp.textContent = p > 0.9 ? "\u00a0" : rand()
    })
    if (progress < 1) requestAnimationFrame(tick)
    else onDone?.()
  }
  requestAnimationFrame(tick)
}

// ── Component ────────────────────────────────────────────────
export function AuthPanel() {
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const phraseIdxRef = useRef(0)
  const activeRef = useRef(true)

  useEffect(() => {
    activeRef.current = true

    function runPhrase(idx: number) {
      if (!activeRef.current) return
      const [t1, t2] = PHRASES[idx]
      const el1 = line1Ref.current
      const el2 = line2Ref.current
      if (!el1 || !el2) return

      scrambleTo(el1, t1, 1100, () => {
        if (!activeRef.current) return
        scrambleTo(el2, t2, 1000, () => {
          if (!activeRef.current) return
          setTimeout(() => {
            if (!activeRef.current) return
            scrambleOut(el1, 750, () => {
              if (!activeRef.current) return
              scrambleOut(el2, 600, () => {
                if (!activeRef.current) return
                phraseIdxRef.current = (idx + 1) % PHRASES.length
                setTimeout(() => runPhrase(phraseIdxRef.current), 400)
              })
            })
          }, 2800)
        })
      })
    }

    const t = setTimeout(() => runPhrase(0), 500)
    return () => {
      activeRef.current = false
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="relative hidden lg:flex flex-col w-1/2 h-full overflow-hidden">
      {/* Background */}
      <Image
        src="/auth-bg.png"
        alt="SACF Background"
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#040c08]/90 via-[#07120c]/78 to-[#0a1912]/82" />

      {/* Ambient glows */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-cyan-400/6 rounded-full blur-[100px] animate-pulse [animation-delay:2.2s]" />

      {/* SACF badge — top-left */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 left-10 z-20 flex items-center gap-2"
      >
        <div className="flex items-center justify-center w-11 h-11 shrink-0 drop-shadow-md">
          <svg width="100%" height="100%" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.1]">
            <circle cx="14" cy="16" r="8" fill="#e5e7eb" />
            <circle cx="38" cy="16" r="8" fill="#e5e7eb" />
            <circle cx="14" cy="16" r="4.5" fill="black" />
            <circle cx="38" cy="16" r="4.5" fill="black" />
            <path d="M7 24 C7 14, 45 14, 45 24 C45 34, 30 46, 26 48 C22 46, 7 34, 7 24 Z" fill="#fcfcfc" />
            <path d="M18 12 Q26 28 34 12 L26 12 Z" fill="black" />
            <circle cx="20" cy="27" r="3" fill="black" />
            <circle cx="32" cy="27" r="3" fill="black" />
            <circle cx="19.5" cy="26" r="1.5" fill="white" />
            <circle cx="31.5" cy="26" r="1.5" fill="white" />
            <path d="M23 44 C23 41, 29 41, 29 44 L26 49 Z" fill="#ea580c" />
          </svg>
        </div>
        <span className="text-2xl font-bold font-sans tracking-[0.2em] text-white mt-0.5 ml-1 drop-shadow-md">
          S<span className="text-[#ea580c]">A</span>CF
        </span>
      </motion.div>

      {/* Main content — centrado */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-10 pb-28">
        <div className="flex flex-col items-center gap-1 text-center">

          {/* Línea 1 — blanca */}
          <h2 className="text-[5rem] font-black leading-[1.1] tracking-tight text-white">
            <span ref={line1Ref} />
          </h2>

          {/* Línea 2 — gradiente verde */}
          <h2
            className="text-[5rem] font-black leading-[1.1] tracking-tight"
            style={{
              background: "linear-gradient(90deg, #78fcd6 0%, #00d4a8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <span ref={line2Ref} />
          </h2>

        </div>
      </div>
    </div>
  )
}