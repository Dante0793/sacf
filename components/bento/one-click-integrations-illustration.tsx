import type React from "react"

interface FinancialEducationIllustrationProps {
  className?: string
}

const modules = [
  {
    icon: "💰",
    title: "Ahorro Inteligente",
    progress: 100,
    xp: 320,
    badge: "⭐",
    color: "#22c55e",
  },
  {
    icon: "📈",
    title: "Inversión Básica",
    progress: 72,
    xp: 230,
    badge: "🏅",
    color: "#3b82f6",
  },
  {
    icon: "📊",
    title: "Presupuesto Personal",
    progress: 20,
    xp: 60,
    badge: "🎯",
    color: "#a855f7",
  },
]

const FinancialEducationIllustration: React.FC<FinancialEducationIllustrationProps> = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-full relative overflow-hidden flex flex-col gap-2 pr-4 pl-4 pt-2 ${className}`}
      role="img"
      aria-label="Ilustración de educación financiera con módulos interactivos y recompensas de progreso"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-1">
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "hsl(var(--muted-foreground))",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Tu progreso
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "hsl(var(--primary))",
            background: "hsl(var(--primary) / 0.1)",
            borderRadius: "999px",
            padding: "2px 10px",
          }}
        >
          750 XP total
        </span>
      </div>

      {/* Module cards */}
      {modules.map((mod, i) => (
        <div
          key={i}
          style={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "10px",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          {/* Icon */}
          <span style={{ fontSize: "20px", lineHeight: 1, flexShrink: 0 }}>{mod.icon}</span>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "hsl(var(--foreground))",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "140px",
                }}
              >
                {mod.title}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: mod.color,
                  flexShrink: 0,
                  marginLeft: "6px",
                }}
              >
                +{mod.xp} XP
              </span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: "6px",
                borderRadius: "999px",
                background: "hsl(var(--muted))",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${mod.progress}%`,
                  borderRadius: "999px",
                  background: mod.color,
                  transition: "width 0.6s ease",
                }}
              />
            </div>

            {/* Progress label */}
            <div
              style={{
                marginTop: "3px",
                fontSize: "10px",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              {mod.progress}% completado
            </div>
          </div>

          {/* Badge */}
          <span
            style={{
              fontSize: "18px",
              flexShrink: 0,
              opacity: mod.progress === 100 ? 1 : 0.3,
              filter: mod.progress === 100 ? "none" : "grayscale(1)",
              transition: "opacity 0.3s",
            }}
            title={mod.progress === 100 ? "¡Módulo completado!" : "Completa el módulo para desbloquear"}
          >
            {mod.badge}
          </span>
        </div>
      ))}

      {/* Bottom CTA hint */}
      <div
        style={{
          marginTop: "2px",
          textAlign: "center",
          fontSize: "11px",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        Desbloquea recompensas completando cada módulo
      </div>
    </div>
  )
}

export default FinancialEducationIllustration
