import type React from "react"
import { TrendingDown, TrendingUp } from "lucide-react"

interface EmotionalFinancialIllustrationProps {
  className?: string
}

const entries = [
  {
    emotion: "😰",
    label: "Ansioso",
    action: "Vendiste ETH",
    amount: "-$320",
    trend: "down",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
  },
  {
    emotion: "😄",
    label: "Eufórico",
    action: "Compraste DOGE",
    amount: "-$150",
    trend: "down",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
  },
  {
    emotion: "😌",
    label: "Tranquilo",
    action: "Invertiste en fondo",
    amount: "+$500",
    trend: "up",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
  },
  {
    emotion: "😤",
    label: "Frustrado",
    action: "Gasto impulsivo",
    amount: "-$85",
    trend: "down",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
  },
  {
    emotion: "🧘",
    label: "Sereno",
    action: "Ahorro programado",
    amount: "+$200",
    trend: "up",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
  },
]

const EmotionalFinancialIllustration: React.FC<EmotionalFinancialIllustrationProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 relative ${className}`}
      role="img"
      aria-label="Ilustración de seguimiento emocional y financiero"
    >
      <div
        style={{
          position: "absolute",
          top: "37%",
          left: "50%",
          transform: "translate(-50%, calc(-50% + 24px))",
          width: "345px",
          height: "277px",
          background: "linear-gradient(180deg, hsl(var(--background)) 0%, transparent 100%)",
          backdropFilter: "blur(16px)",
          borderRadius: "9.628px",
          border: "0.802px solid hsl(var(--border))",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 14px",
            borderBottom: "0.802px solid hsl(var(--border))",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Geist', -apple-system, sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: "hsl(var(--foreground))",
            }}
          >
            Emociones &amp; Finanzas
          </span>
          <div
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "0.5px solid rgba(34,197,94,0.3)",
              borderRadius: "4px",
              padding: "2px 7px",
            }}
          >
            <span
              style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                color: "#22c55e",
              }}
            >
              En vivo
            </span>
          </div>
        </div>

        {/* Entries */}
        <div style={{ flex: 1, overflowY: "hidden" }}>
          {entries.map((entry, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "7px 14px",
                borderBottom: index < entries.length - 1 ? "0.479px solid hsl(var(--border))" : "none",
              }}
            >
              {/* Left: emoji + labels */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: entry.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  {entry.emotion}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span
                    style={{
                      fontFamily: "'Geist', -apple-system, sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: entry.color,
                      lineHeight: "1",
                    }}
                  >
                    {entry.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Geist', -apple-system, sans-serif",
                      fontSize: "10px",
                      fontWeight: 400,
                      color: "hsl(var(--muted-foreground))",
                      lineHeight: "1",
                    }}
                  >
                    {entry.action}
                  </span>
                </div>
              </div>

              {/* Right: amount + trend */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                {entry.trend === "up" ? (
                  <TrendingUp style={{ width: "12px", height: "12px", color: "#22c55e" }} />
                ) : (
                  <TrendingDown style={{ width: "12px", height: "12px", color: "#ef4444" }} />
                )}
                <span
                  style={{
                    fontFamily: "'Geist', -apple-system, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: entry.trend === "up" ? "#22c55e" : "#ef4444",
                  }}
                >
                  {entry.amount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer insight */}
        <div
          style={{
            borderTop: "0.802px solid hsl(var(--border))",
            padding: "6px 14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexShrink: 0,
            background: "rgba(99,102,241,0.05)",
          }}
        >
          <span style={{ fontSize: "11px" }}>💡</span>
          <span
            style={{
              fontFamily: "'Geist', -apple-system, sans-serif",
              fontSize: "9.5px",
              color: "hsl(var(--muted-foreground))",
              fontStyle: "italic",
            }}
          >
            Decisiones tranquilas generan mejores resultados
          </span>
        </div>
      </div>
    </div>
  )
}

export default EmotionalFinancialIllustration
