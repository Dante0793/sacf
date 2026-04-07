import type React from "react"
import { Brain, ShieldCheck, Zap } from "lucide-react"

interface SmartRecommendationsProps {
  className?: string
}

const recommendations = [
  {
    icon: <Brain style={{ width: "14px", height: "14px", color: "#818cf8" }} />,
    iconBg: "rgba(129,140,248,0.12)",
    bias: "Aversión a la pérdida",
    suggestion: "Mantén tu fondo de emergencia intacto antes de invertir más.",
    profile: "Conservador",
    profileColor: "#818cf8",
    impact: "Alto",
    impactColor: "#22c55e",
  },
  {
    icon: <Zap style={{ width: "14px", height: "14px", color: "#f59e0b" }} />,
    iconBg: "rgba(245,158,11,0.12)",
    bias: "Sesgo de presente",
    suggestion: "Automatiza tu ahorro mensual para evitar gastar de más hoy.",
    profile: "Impulsivo",
    profileColor: "#f59e0b",
    impact: "Medio",
    impactColor: "#f59e0b",
  },
  {
    icon: <ShieldCheck style={{ width: "14px", height: "14px", color: "#34d399" }} />,
    iconBg: "rgba(52,211,153,0.12)",
    bias: "Efecto manada",
    suggestion: "No sigas tendencias virales; diversifica según tu meta real.",
    profile: "Ansioso",
    profileColor: "#34d399",
    impact: "Alto",
    impactColor: "#22c55e",
  },
]

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({ className = "" }) => {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backdropFilter: "blur(8px)",
        borderRadius: "10px",
        boxSizing: "border-box",
      }}
      role="img"
      aria-label="Recomendaciones inteligentes basadas en economía conductual y perfil psicológico"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "3px",
          padding: "8px 20px 0 20px",
          height: "98%",
          width: "calc(100% - 48px)",
          background: "linear-gradient(180deg, hsl(var(--primary) / 0.05) 0%, transparent 100%)",
          backdropFilter: "blur(16px)",
          borderRadius: "9.628px",
          border: "0.802px solid hsl(var(--border))",
          overflow: "hidden",
          boxSizing: "border-box",
          margin: "1px 24px 0 24px",
        }}
      >
        {/* Header */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2px",
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
            Recomendaciones IA
          </span>
          <span
            style={{
              fontFamily: "'Geist', -apple-system, sans-serif",
              fontSize: "9px",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            Basado en tu perfil
          </span>
        </div>

        {/* Cards */}
        {recommendations.map((rec, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "12px",
              padding: "8px 10px",
              background: "linear-gradient(180deg, hsl(var(--card) / 0.3) 0%, transparent 100%)",
              backdropFilter: "blur(16px)",
              borderRadius: "8px",
              border: "0.541px solid hsl(var(--border))",
              width: "100%",
              maxWidth: "320px",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: rec.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "1px",
              }}
            >
              {rec.icon}
            </div>

            {/* Text */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px", flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "'Geist', -apple-system, sans-serif",
                    fontSize: "9px",
                    fontWeight: 600,
                    color: rec.profileColor,
                    whiteSpace: "nowrap",
                  }}
                >
                  {rec.bias}
                </span>
                <span
                  style={{
                    fontFamily: "'Geist', -apple-system, sans-serif",
                    fontSize: "8.5px",
                    color: "hsl(var(--muted-foreground))",
                    whiteSpace: "nowrap",
                  }}
                >
                  · Perfil: {rec.profile}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "hsl(var(--foreground))",
                  lineHeight: "1.4",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {rec.suggestion}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "1px",
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: rec.impactColor,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Geist', -apple-system, sans-serif",
                    fontSize: "8.5px",
                    color: rec.impactColor,
                  }}
                >
                  Impacto {rec.impact}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SmartRecommendations
