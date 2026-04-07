import type React from "react"
import { Users, MessageCircle, BookOpen, Star, CheckCircle } from "lucide-react"

interface CommunityAccessProps {
  width?: number | string
  height?: number | string
  className?: string
}

const coaches = [
  {
    initials: "AL",
    name: "Ana López",
    specialty: "Sesgos cognitivos",
    rating: 4.9,
    sessions: 312,
    color: "#818cf8",
    bg: "rgba(129,140,248,0.15)",
  },
  {
    initials: "CR",
    name: "Carlos Reyes",
    specialty: "Ahorro conductual",
    rating: 4.8,
    sessions: 218,
    color: "#34d399",
    bg: "rgba(52,211,153,0.15)",
  },
  {
    initials: "MP",
    name: "María Pérez",
    specialty: "Inversión emocional",
    rating: 5.0,
    sessions: 407,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
  },
]

const stats = [
  { icon: <Users style={{ width: "11px", height: "11px" }} />, label: "Miembros activos", value: "2,400+" },
  { icon: <MessageCircle style={{ width: "11px", height: "11px" }} />, label: "Sesiones este mes", value: "940" },
  { icon: <BookOpen style={{ width: "11px", height: "11px" }} />, label: "Recursos disponibles", value: "180+" },
]

const CommunityAccess: React.FC<CommunityAccessProps> = ({ width = "100%", height = "100%", className = "" }) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-start relative ${className}`}
      style={{ width, height, background: "transparent" }}
      role="img"
      aria-label="Acceso a comunidad y coaches especializados en finanzas conductuales"
    >
      {/* Main card */}
      <div
        style={{
          width: "calc(100% - 48px)",
          margin: "1px 24px 0 24px",
          background: "linear-gradient(180deg, hsl(var(--primary) / 0.05) 0%, transparent 100%)",
          backdropFilter: "blur(16px)",
          borderRadius: "10px",
          border: "0.8px solid hsl(var(--border))",
          overflow: "hidden",
          padding: "10px 16px 10px 16px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Users style={{ width: "13px", height: "13px", color: "hsl(var(--primary))" }} />
            <span
              style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "hsl(var(--foreground))",
              }}
            >
              Comunidad SACF
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 7px",
              borderRadius: "20px",
              background: "rgba(52,211,153,0.12)",
              border: "0.6px solid rgba(52,211,153,0.3)",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
            <span
              style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: "8.5px",
                color: "#34d399",
                fontWeight: 500,
              }}
            >
              En línea
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "6px" }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "7px 8px",
                background: "hsl(var(--card) / 0.3)",
                borderRadius: "7px",
                border: "0.6px solid hsl(var(--border))",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "hsl(var(--primary))",
                }}
              >
                {s.value}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                {s.icon}
                <span
                  style={{
                    fontFamily: "'Geist', -apple-system, sans-serif",
                    fontSize: "7.5px",
                    color: "hsl(var(--muted-foreground))",
                    textAlign: "center",
                    lineHeight: "1.2",
                  }}
                >
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "0.6px solid hsl(var(--border))", margin: "0 -16px" }} />

        {/* Coaches section */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "'Geist', -apple-system, sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                color: "hsl(var(--foreground))",
              }}
            >
              Coaches especializados
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <CheckCircle style={{ width: "9px", height: "9px", color: "#818cf8" }} />
              <span
                style={{
                  fontFamily: "'Geist', -apple-system, sans-serif",
                  fontSize: "8px",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                Certificados
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {coaches.map((coach, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "7px 9px",
                  background: "linear-gradient(135deg, hsl(var(--card) / 0.3) 0%, transparent 100%)",
                  borderRadius: "8px",
                  border: "0.6px solid hsl(var(--border))",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: coach.bg,
                    border: `1.5px solid ${coach.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist', -apple-system, sans-serif",
                      fontSize: "8.5px",
                      fontWeight: 700,
                      color: coach.color,
                    }}
                  >
                    {coach.initials}
                  </span>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span
                      style={{
                        fontFamily: "'Geist', -apple-system, sans-serif",
                        fontSize: "9.5px",
                        fontWeight: 600,
                        color: "hsl(var(--foreground))",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {coach.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Geist', -apple-system, sans-serif",
                        fontSize: "8px",
                        color: "hsl(var(--muted-foreground))",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      · {coach.specialty}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                    <Star style={{ width: "8px", height: "8px", color: "#f59e0b", fill: "#f59e0b" }} />
                    <span
                      style={{
                        fontFamily: "'Geist', -apple-system, sans-serif",
                        fontSize: "8px",
                        color: "#f59e0b",
                        fontWeight: 600,
                      }}
                    >
                      {coach.rating}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Geist', -apple-system, sans-serif",
                        fontSize: "8px",
                        color: "hsl(var(--muted-foreground))",
                      }}
                    >
                      · {coach.sessions} sesiones
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div
                  style={{
                    padding: "3px 8px",
                    borderRadius: "20px",
                    background: coach.bg,
                    border: `0.6px solid ${coach.color}`,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist', -apple-system, sans-serif",
                      fontSize: "7.5px",
                      fontWeight: 600,
                      color: coach.color,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Agendar
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityAccess
