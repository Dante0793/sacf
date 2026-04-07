import type React from "react"

const AiSpendingAnalysis: React.FC = () => {
  const themeVars = {
    "--ai-primary-color": "hsl(var(--primary))",
    "--ai-background-color": "hsl(var(--background))",
    "--ai-text-color": "hsl(var(--foreground))",
    "--ai-text-dark": "hsl(var(--primary-foreground))",
    "--ai-border-color": "hsl(var(--border))",
    "--ai-border-main": "hsl(var(--foreground) / 0.1)",
    "--ai-highlight-primary": "hsl(var(--primary) / 0.10)",
    "--ai-highlight-header": "hsl(var(--accent) / 0.2)",
    "--ai-warn": "hsl(38 92% 50% / 0.15)",
    "--ai-danger": "hsl(0 84% 60% / 0.13)",
  }

  const transactions = [
    {
      label: "Amazon – Electrónica",
      amount: "-$189.99",
      time: "23:41",
      trigger: "Compra impulsiva",
      triggerColor: "hsl(0 84% 60%)",
      triggerBg: "hsl(0 84% 60% / 0.12)",
      highlight: "hsl(0 84% 60% / 0.07)",
    },
    {
      label: "PedidosYa",
      amount: "-$34.50",
      time: "20:15",
      trigger: "Estrés emocional",
      triggerColor: "hsl(38 92% 50%)",
      triggerBg: "hsl(38 92% 50% / 0.14)",
      highlight: "hsl(38 92% 50% / 0.07)",
    },
    {
      label: "Nike – Descuento 40 %",
      amount: "-$97.00",
      time: "18:03",
      trigger: "FOMO / Oferta",
      triggerColor: "hsl(var(--primary))",
      triggerBg: "hsl(var(--primary) / 0.13)",
      highlight: "hsl(var(--primary) / 0.07)",
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
      aria-label="Panel de análisis de IA que detecta patrones de gasto y desencadenantes psicológicos en tiempo real"
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
          background: "linear-gradient(180deg, var(--ai-background-color) 0%, transparent 100%)",
          opacity: 0.55,
          borderRadius: "10px",
          border: "1px solid var(--ai-border-color)",
          overflow: "hidden",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Faint row hint */}
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
          background: "var(--ai-background-color)",
          backdropFilter: "blur(20px)",
          borderRadius: "10px",
          border: "1px solid var(--ai-border-main)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="bg-card"
          style={{
            padding: "9px 12px 8px",
            borderBottom: "1px solid var(--ai-border-main)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* Pulse dot */}
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "hsl(142 71% 45%)",
                display: "inline-block",
                boxShadow: "0 0 0 2px hsl(142 71% 45% / 0.3)",
              }}
            />
            <span
              style={{
                fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "10.5px",
                fontWeight: 600,
                color: "var(--ai-text-color)",
                letterSpacing: "-0.2px",
              }}
            >
              Análisis en tiempo real
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
            Hoy · 3 alertas
          </span>
        </div>

        {/* Transaction rows */}
        <div className="bg-card" style={{ padding: "6px 8px 8px" }}>
          {transactions.map((tx, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: tx.highlight,
                borderRadius: "7px",
                padding: "6px 8px",
                marginBottom: idx < transactions.length - 1 ? "4px" : "0",
              }}
            >
              {/* Left: name + trigger badge */}
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "var(--ai-text-color)",
                    letterSpacing: "-0.15px",
                  }}
                >
                  {tx.label}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "3px",
                    background: tx.triggerBg,
                    color: tx.triggerColor,
                    borderRadius: "4px",
                    padding: "1.5px 5px",
                    fontSize: "8.5px",
                    fontWeight: 600,
                    letterSpacing: "0.1px",
                    width: "fit-content",
                    fontFamily: "'Geist', sans-serif",
                  }}
                >
                  IA: {tx.trigger}
                </span>
              </div>

              {/* Right: amount + time */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
                <span
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "hsl(0 72% 51%)",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {tx.amount}
                </span>
                <span
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "8.5px",
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  {tx.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer: AI insight bar */}
        <div
          style={{
            background: "var(--ai-highlight-primary)",
            borderTop: "1px solid var(--ai-border-main)",
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
            Gastaste{" "}
            <strong style={{ color: "var(--ai-text-color)", fontWeight: 600 }}>43 % más</strong> los miércoles
            nocturnos. Posible gatillo de estrés laboral.
          </span>
        </div>
      </div>
    </div>
  )
}

export default AiSpendingAnalysis
