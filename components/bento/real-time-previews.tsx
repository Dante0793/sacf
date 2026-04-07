"use client"

import type React from "react"

const PersonalFinancialCoaching: React.FC = () => {
  const themeVars = {
    "--coach-primary-color": "hsl(var(--primary))",
    "--coach-background-color": "hsl(var(--background))",
    "--coach-text-color": "hsl(var(--foreground))",
    "--coach-border-color": "hsl(var(--border))",
    "--coach-border-main": "hsl(var(--foreground) / 0.1)",
    "--coach-highlight-primary": "hsl(var(--primary) / 0.10)",
    "--coach-muted": "hsl(var(--muted-foreground))",
  }

  const goals = [
    {
      label: "Fondo de emergencia",
      progress: 72,
      current: "$3,600",
      target: "$5,000",
      color: "hsl(142 71% 45%)",
      colorBg: "hsl(142 71% 45% / 0.12)",
    },
    {
      label: "Vacaciones 2025",
      progress: 41,
      current: "$820",
      target: "$2,000",
      color: "hsl(var(--primary))",
      colorBg: "hsl(var(--primary) / 0.12)",
    },
  ]

  return (
    <div
      style={
        {
          width: "100%",
          height: "100%",
          position: "relative",
          background: "transparent",
          ...themeVars,
        } as React.CSSProperties
      }
      role="img"
      aria-label="Panel de coaching financiero personalizado con metas, progreso y recomendaciones de IA"
    >
      {/* Background card (blurred / scaled back) */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "50%",
          transform: "translateX(-50%) scale(0.91)",
          width: "344px",
          height: "210px",
          background: "linear-gradient(180deg, var(--coach-background-color) 0%, transparent 100%)",
          opacity: 0.55,
          borderRadius: "10px",
          border: "1px solid var(--coach-border-color)",
          overflow: "hidden",
          backdropFilter: "blur(16px)",
        }}
      >
        <div style={{ padding: "10px 12px", boxSizing: "border-box" }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                height: "28px",
                borderRadius: "6px",
                background: "hsl(var(--foreground) / 0.04)",
                marginBottom: "6px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Foreground card (main panel) */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "344px",
          background: "var(--coach-background-color)",
          backdropFilter: "blur(20px)",
          borderRadius: "10px",
          border: "1px solid var(--coach-border-main)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="bg-card"
          style={{
            padding: "9px 12px 8px",
            borderBottom: "1px solid var(--coach-border-main)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            {/* Coach avatar */}
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "var(--coach-highlight-primary)",
                border: "1.5px solid var(--coach-primary-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="4" r="2.2" fill="hsl(var(--primary))" />
                <path d="M2 10.5c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "10.5px",
                fontWeight: 600,
                color: "var(--coach-text-color)",
                letterSpacing: "-0.2px",
              }}
            >
              Tu coach financiero
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "9.5px",
              color: "hsl(var(--muted-foreground))",
              letterSpacing: "-0.1px",
            }}
          >
            3 metas activas
          </span>
        </div>

        {/* Coach message bubble */}
        <div
          className="bg-card"
          style={{ padding: "8px 10px 4px" }}
        >
          <div
            style={{
              background: "var(--coach-highlight-primary)",
              borderRadius: "4px 8px 8px 8px",
              padding: "7px 10px",
              marginBottom: "8px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'Geist', sans-serif",
                fontSize: "9.5px",
                color: "var(--coach-text-color)",
                lineHeight: "1.5",
                letterSpacing: "-0.1px",
              }}
            >
              Vas muy bien con tu deuda. Si destinas{" "}
              <strong style={{ color: "var(--coach-primary-color)" }}>$120 más este mes</strong>, la liquidas
              antes del verano.
            </p>
          </div>
        </div>

        {/* Goals rows */}
        <div className="bg-card" style={{ padding: "0 8px 8px" }}>
          {goals.map((goal, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: "7px",
                padding: "6px 8px",
                marginBottom: idx < goals.length - 1 ? "4px" : "0",
                background: "hsl(var(--foreground) / 0.02)",
                border: "1px solid hsl(var(--foreground) / 0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "9.5px",
                    fontWeight: 500,
                    color: "var(--coach-text-color)",
                    letterSpacing: "-0.15px",
                  }}
                >
                  {goal.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "8.5px",
                    fontWeight: 600,
                    color: goal.color,
                  }}
                >
                  {goal.progress}%
                </span>
              </div>
              {/* Progress bar */}
              <div
                style={{
                  width: "100%",
                  height: "5px",
                  borderRadius: "99px",
                  background: goal.colorBg,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${goal.progress}%`,
                    height: "100%",
                    borderRadius: "99px",
                    background: goal.color,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "8px",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  {goal.current}
                </span>
                <span
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "8px",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  meta: {goal.target}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer: next session */}
        <div
          style={{
            background: "var(--coach-highlight-primary)",
            borderTop: "1px solid var(--coach-border-main)",
            padding: "7px 12px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
            <path
              d="M6 1L7.5 4.5L11 5L8.5 7.5L9.5 11L6 9L2.5 11L3.5 7.5L1 5L4.5 4.5L6 1Z"
              fill="hsl(var(--primary))"
            />
          </svg>
          <span
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: "9px",
              color: "hsl(var(--muted-foreground))",
              letterSpacing: "-0.1px",
              lineHeight: "1.4",
            }}
          >
            Tu plan se ajusta{" "}
            <strong style={{ color: "var(--coach-text-color)", fontWeight: 600 }}>cada semana</strong> según
            tus ingresos y gastos reales.
          </span>
        </div>
      </div>
    </div>
  )
}

export default PersonalFinancialCoaching
