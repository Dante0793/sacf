"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Brain, Sparkles, TrendingDown, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

// ── Mock AI Engine ──────────────────────────────────────────────
const MOCK_USER_DATA = {
  nombre: "Juan",
  saldo: "Bs. 4,280",
  ahorro_mes: "Bs. 620",
  gasto_total: "Bs. 7,340",
  top_gastos: [
    { categoria: "Delivery / Comida", monto: "Bs. 1,840", porcentaje: "25%", tendencia: "up", riesgo: "alto" },
    { categoria: "Entretenimiento", monto: "Bs. 980",  porcentaje: "13%", tendencia: "up", riesgo: "medio" },
    { categoria: "Suscripciones",   monto: "Bs. 760",  porcentaje: "10%", tendencia: "stable", riesgo: "medio" },
    { categoria: "Transporte",      monto: "Bs. 540",  porcentaje: "7%",  tendencia: "down", riesgo: "bajo" },
  ],
  sesgo_detectado: "Gratificación Inmediata",
  score_conductual: 61,
  fondo_emergencia: { actual: "Bs. 2,100", meta: "Bs. 14,400", meses_cubiertos: 0.4 },
  suscripciones: [
    { nombre: "Netflix",    monto: "Bs. 85", uso: "bajo" },
    { nombre: "Spotify",    monto: "Bs. 42", uso: "alto" },
    { nombre: "Disney+",    monto: "Bs. 78", uso: "bajo" },
    { nombre: "YouTube Premium", monto: "Bs. 55", uso: "medio" },
    { nombre: "Gym (sin usar)", monto: "Bs. 280", uso: "ninguno" },
  ],
}

type MsgType = "text" | "suggestions" | "data-card" | "alert"

interface Message {
  role: "assistant" | "user"
  content: string
  type: MsgType
  options?: string[]
  data?: { label: string; value: string; sub?: string; color?: string }[]
  alertLevel?: "warning" | "success" | "info"
}

// ── Respuestas inteligentes según input ──────────────────────────
function getAIResponse(input: string): Message[] {
  const txt = input.toLowerCase()

  if (txt.includes("auditar") || txt.includes("gasto") || txt.includes("gastar")) {
    return [
      {
        role: "assistant",
        content: `Accediendo a tu historial de marzo 2025, Juan. Detecté **${MOCK_USER_DATA.top_gastos[0].porcentaje}** de tu presupuesto mensual (${MOCK_USER_DATA.top_gastos[0].monto}) destinado a Delivery. Esto activa la **señal de Gratificación Inmediata** en tu perfil conductual.`,
        type: "text",
      },
      {
        role: "assistant",
        content: "Aquí están tus fugas de capital por categoría este mes:",
        type: "data-card",
        data: MOCK_USER_DATA.top_gastos.map((g) => ({
          label: g.categoria,
          value: g.monto,
          sub: `${g.porcentaje} del presupuesto`,
          color: g.riesgo === "alto" ? "#ca2c41" : g.riesgo === "medio" ? "#ea580c" : "#10b981",
        })),
      },
      {
        role: "assistant",
        content: "⚠️ Tu sesgo principal es **Gratificación Inmediata**: gastas Bs. 1,840 en delivery en lugar de cocinar, ahorrando potencialmente Bs. 1,200/mes. ¿Quieres que diseñe un plan de reducción progresiva?",
        type: "suggestions",
        options: ["Sí, diseña el plan de reducción", "¿Cómo afecta mi score conductual?", "Ver mis suscripciones activas"],
      },
    ]
  }

  if (txt.includes("fondo") || txt.includes("emergencia")) {
    return [
      {
        role: "assistant",
        content: `Juan, tu Fondo de Emergencia cubre solo **${MOCK_USER_DATA.fondo_emergencia.meses_cubiertos} meses** de gastos. El estándar conductual recomendado es **6 meses** (${MOCK_USER_DATA.fondo_emergencia.meta}).`,
        type: "text",
      },
      {
        role: "assistant",
        content: "Estado de tu Fondo de Emergencia:",
        type: "data-card",
        data: [
          { label: "Fondo Actual", value: MOCK_USER_DATA.fondo_emergencia.actual, sub: "Bs. acumulados", color: "#ca2c41" },
          { label: "Meta 6 Meses", value: MOCK_USER_DATA.fondo_emergencia.meta, sub: "Objetivo recomendado", color: "#10b981" },
          { label: "Déficit", value: "Bs. 12,300", sub: "Te faltan 85% de la meta", color: "#ea580c" },
        ],
      },
      {
        role: "assistant",
        content: "Con tu ritmo de ahorro actual (Bs. 620/mes) tardarías **19.8 meses**. Si reduces delivery en un 50%, acelerarías a **11 meses**. ¿Activo el modo «Modo Escudo» para proteger automáticamente Bs. 800/mes?",
        type: "suggestions",
        options: ["Activar Modo Escudo", "¿Qué es el Modo Escudo?", "Calcular con otro monto"],
      },
    ]
  }

  if (txt.includes("suscripci") || txt.includes("optimizar")) {
    return [
      {
        role: "assistant",
        content: `Escaneando tus ${MOCK_USER_DATA.suscripciones.length} suscripciones activas... Detecté **Bs. 540/mes** en servicios con uso bajo o nulo. Esto es dinero sin retorno conductual.`,
        type: "text",
      },
      {
        role: "assistant",
        content: "Análisis de uso por suscripción:",
        type: "data-card",
        data: MOCK_USER_DATA.suscripciones.map((s) => ({
          label: s.nombre,
          value: s.monto,
          sub: `Uso: ${s.uso}`,
          color: s.uso === "ninguno" ? "#ca2c41" : s.uso === "bajo" ? "#ea580c" : "#10b981",
        })),
      },
      {
        role: "assistant",
        content: "🎯 Recomendación: cancela **GYM + Disney+** = ahorro inmediato de **Bs. 358/mes** (Bs. 4,296/año). Eso cubriría el 35% de tu Fondo de Emergencia en 1 año. ¿Confirmo la acción táctica?",
        type: "suggestions",
        options: ["Confirmar cancelación táctica", "Quiero ver alternativas", "Calcular impacto anual"],
      },
    ]
  }

  if (txt.includes("plan") || txt.includes("reducción") || txt.includes("reduccion")) {
    return [
      {
        role: "assistant",
        content: "Diseñando tu plan de reducción de gastos emocionales en 3 fases:",
        type: "text",
      },
      {
        role: "assistant",
        content: "Plan Conductual Anti-Gratificación — 90 días:",
        type: "data-card",
        data: [
          { label: "Fase 1 — Días 1-30", value: "−Bs. 600", sub: "Delivery: máx. 3 veces/sem", color: "#4c1d95" },
          { label: "Fase 2 — Días 31-60", value: "−Bs. 1,000", sub: "Delivery: máx. 1 vez/sem", color: "#ea580c" },
          { label: "Fase 3 — Días 61-90", value: "−Bs. 1,400", sub: "Solo fines de semana", color: "#10b981" },
        ],
      },
      {
        role: "assistant",
        content: "✅ Al completar las 3 fases habrás liberado **Bs. 3,000** adicionales para tu fondo de emergencia. Tu score conductual subirá de **61** → est. **78 puntos**.",
        type: "suggestions",
        alertLevel: "success",
        options: ["Activar plan ahora", "Quiero ver mi score conductual", "Compartir plan"],
      },
    ]
  }

  if (txt.includes("score") || txt.includes("conductual") || txt.includes("perfil")) {
    return [
      {
        role: "assistant",
        content: `Tu **Score Conductual SACF** actual es **${MOCK_USER_DATA.score_conductual}/100**. Significa que tienes control parcial sobre tus impulsos financieros. El promedio de usuarios SACF Bolivia es **58**, así que estás por encima de la media.`,
        type: "data-card",
        data: [
          { label: "Score Conductual", value: `${MOCK_USER_DATA.score_conductual}/100`, sub: "Por encima del promedio", color: "#ea580c" },
          { label: "Sesgo Primario", value: "Gratificación Inmediata", sub: "Detectado en 73% de tus gastos", color: "#ca2c41" },
          { label: "Fortaleza", value: "Constancia", sub: "Llevas 4 meses activo en SACF", color: "#10b981" },
        ],
      },
      {
        role: "assistant",
        content: "Para llegar a **80+ puntos** necesitas: (1) reducir gastos impulsivos 30%, (2) aportar al fondo de emergencia 2 meses seguidos, (3) completar el módulo «Economía Conductual» en Educación.",
        type: "suggestions",
        options: ["¿Cómo mejorar mi score?", "Ver módulo de educación", "Auditar mis gastos"],
      },
    ]
  }

  if (txt.includes("si") || txt.includes("sí") || txt.includes("ok") || txt.includes("bien") || txt.includes("claro") || txt.includes("procede")) {
    return [
      {
        role: "assistant",
        content: "Perfecto. Cruzando tus datos de transacciones de los últimos 90 días con tu perfil conductual...",
        type: "text",
      },
      {
        role: "assistant",
        content: "Resumen ejecutivo de tu salud financiera:",
        type: "data-card",
        data: [
          { label: "Saldo Disponible", value: MOCK_USER_DATA.saldo, sub: "Al cierre de marzo", color: "#2d2b3b" },
          { label: "Ahorro del Mes", value: MOCK_USER_DATA.ahorro_mes, sub: "+8% vs febrero", color: "#10b981" },
          { label: "Gasto Total Mes", value: MOCK_USER_DATA.gasto_total, sub: "−3% vs febrero", color: "#ca2c41" },
          { label: "Score Conductual", value: `${MOCK_USER_DATA.score_conductual}/100`, sub: "Nivel: Intermedio", color: "#ea580c" },
        ],
      },
      {
        role: "assistant",
        content: "¿Sobre qué área quieres profundizar ahora?",
        type: "suggestions",
        options: ["Auditar mis gastos recientes", "Estado de mi Fondo de Emergencia", "Optimizar mis suscripciones"],
      },
    ]
  }

  // Fallback inteligente
  return [
    {
      role: "assistant",
      content: `Entendido, Juan. Analizando tu consulta en el contexto de tu perfil conductual (Score: ${MOCK_USER_DATA.score_conductual}/100, sesgo detectado: ${MOCK_USER_DATA.sesgo_detectado})…`,
      type: "text",
    },
    {
      role: "assistant",
      content: "Mis tácticas de mayor impacto para ti ahora mismo son:",
      type: "suggestions",
      options: ["Auditar mis gastos recientes", "¿Cómo mejorar mi score?", "Optimizar suscripciones"],
    },
  ]
}

// ── DataCard Component ──
function DataCard({ data }: { data: { label: string; value: string; sub?: string; color?: string }[] }) {
  return (
    <div className="flex flex-col gap-2 mt-1">
      {data.map((item, i) => (
        <div key={i} className="bg-[#f8f8f8] border border-[#e5e7eb] rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2d2b3b]/40 truncate">{item.label}</span>
            {item.sub && <span className="text-[10px] text-[#2d2b3b]/40 font-medium truncate">{item.sub}</span>}
          </div>
          <span className="text-sm font-black shrink-0" style={{ color: item.color || "#2d2b3b" }}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

// ── Main Widget ──────────────────────────────────────────────────
export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `¡Hola, Juan! 👋 Soy tu **Motor Conductual SACF**. Ya cargué tu perfil financiero de marzo 2025. Tu score actual es **${MOCK_USER_DATA.score_conductual}/100** — tienes margen de mejora. ¿Empezamos?`,
      type: "text",
    },
    {
      role: "assistant",
      content: "Elige una táctica de análisis:",
      type: "suggestions",
      options: [
        "Auditar mis gastos recientes",
        "¿Cómo estructuro mi Fondo de Emergencia?",
        "Optimizar mis suscripciones",
      ],
    },
  ])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text, type: "text" }])
    setIsTyping(true)
    const delay = 800 + Math.random() * 700
    setTimeout(() => {
      const responses = getAIResponse(text)
      setIsTyping(false)
      responses.forEach((resp, i) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, resp])
        }, i * 350)
      })
    }, delay)
  }

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputValue.trim() || isTyping) return
    addUserMessage(inputValue.trim())
    setInputValue("")
  }

  const handleOption = (opt: string) => {
    if (isTyping) return
    addUserMessage(opt)
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="bg-white border border-[#e5e7eb] text-[#2d2b3b] px-4 py-3 rounded-xl shadow-lg hidden sm:flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
            >
              <Sparkles size={13} className="text-[#4c1d95] animate-pulse" />
              Motor Conductual IA
            </motion.div>

            <button
              onClick={() => setIsOpen(true)}
              className="group relative w-14 h-14 bg-[#2d2b3b] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-transparent hover:border-[#10b981]"
            >
              <div className="absolute inset-0 bg-[#4c1d95]/20 rounded-full animate-ping" />
              <Brain size={24} className="group-hover:rotate-12 transition-transform relative z-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[640px] max-h-[calc(100vh-32px)] bg-[#fbfbfb] border border-[#e5e7eb] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#4c1d95]/10 flex items-center justify-center border border-[#4c1d95]/20 relative">
                  <Brain size={18} className="text-[#4c1d95]" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#10b981] border-2 border-white rounded-full" />
                </div>
                <div>
                  <h3 className="font-black text-[#2d2b3b] font-sans uppercase tracking-wide text-xs">Motor Conductual SACF</h3>
                  <div className="flex items-center gap-1 text-[10px] text-[#2d2b3b]/40 font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse inline-block" />
                    Analizando perfil de Juan
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] text-[#2d2b3b]/30 hover:text-[#2d2b3b] transition-colors"
              >
                <X size={17} strokeWidth={2.5} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  {msg.type === "data-card" && msg.data ? (
                    <div className="w-full max-w-[90%]">
                      <p className="text-[13px] text-[#2d2b3b]/60 font-bold mb-2 uppercase tracking-widest text-xs">{msg.content}</p>
                      <DataCard data={msg.data} />
                    </div>
                  ) : (
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-[#2d2b3b] text-white font-medium rounded-tr-none"
                          : "bg-white text-[#2d2b3b] border border-[#e5e7eb] rounded-tl-none"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  )}

                  {msg.type === "suggestions" && msg.options && (
                    <div className="flex flex-col gap-2 mt-3 w-full">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOption(opt)}
                          disabled={isTyping}
                          className="text-left text-xs font-bold text-[#4c1d95] hover:text-white bg-[#4c1d95]/5 hover:bg-[#4c1d95] border border-[#4c1d95]/20 rounded-xl px-4 py-3 transition-all w-fit max-w-[92%] uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-white border border-[#e5e7eb] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 bg-[#4c1d95]/40 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-[#4c1d95]/40 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-[#4c1d95]/40 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-[#e5e7eb] shrink-0">
              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 bg-[#fbfbfb] border border-[#e5e7eb] rounded-xl pr-2 pl-4 py-1 focus-within:ring-2 focus-within:ring-[#4c1d95]/20 focus-within:border-[#4c1d95]/40 transition-all"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe una consulta financiera..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-[#2d2b3b] placeholder:text-[#2d2b3b]/25 py-3 font-medium disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 rounded-lg bg-[#4c1d95] text-white flex items-center justify-center disabled:opacity-40 disabled:bg-[#e5e7eb] disabled:text-[#2d2b3b]/40 hover:bg-[#3b1575] transition-colors shrink-0 shadow-sm"
                >
                  <Send size={15} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
