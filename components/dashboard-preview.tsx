"use client"

export function DashboardPreview() {
  return (
    <div className="w-[calc(100vw-24px)] sm:w-[calc(100vw-48px)] md:w-[900px] lg:w-[1160px] md:max-w-[calc(100vw-64px)] mx-auto">
      <div className="bg-gray-100/50 rounded-xl md:rounded-2xl p-1.5 sm:p-2 md:p-4 shadow-lg md:shadow-2xl border border-gray-200">
        {/* Contenedor responsivo para mantener el aspect ratio del SVG */}
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white" style={{ aspectRatio: '1160/700' }}>
          <svg
            viewBox="0 0 1160 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <filter id="shadow-sm" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.05" />
              </filter>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="95%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="chartGradientRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ca2c41" stopOpacity="0.2" />
                <stop offset="95%" stopColor="#ca2c41" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Fondo de la App */}
            <rect width="1160" height="700" fill="#f8fafc" />

            {/* Sidebar */}
            <rect width="240" height="700" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />

            {/* Logo de la App */}
            <circle cx="50" cy="50" r="16" fill="#10b981" fillOpacity="0.1" />
            <path d="M44 50L48 54L56 44" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <text x="76" y="56" fontFamily="sans-serif" fontSize="20" fontWeight="900" fill="#1a1a1a" letterSpacing="-0.5">SACF</text>

            {/* Menú Lateral Items */}
            <rect x="24" y="100" width="192" height="40" rx="8" fill="#f3f4f6" />
            <rect x="50" y="116" width="120" height="8" rx="4" fill="#1a1a1a" />

            <rect x="50" y="176" width="80" height="8" rx="4" fill="#9ca3af" />
            <rect x="50" y="226" width="100" height="8" rx="4" fill="#9ca3af" />
            <rect x="50" y="276" width="90" height="8" rx="4" fill="#9ca3af" />

            {/* Separador Menú */}
            <rect x="24" y="330" width="192" height="1" fill="#e5e7eb" />
            <rect x="50" y="366" width="110" height="8" rx="4" fill="#9ca3af" />
            <rect x="50" y="416" width="70" height="8" rx="4" fill="#9ca3af" />

            {/* Topbar */}
            <rect x="240" y="0" width="920" height="80" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
            <rect x="280" y="36" width="200" height="12" rx="6" fill="#1a1a1a" />

            {/* User Avatar Simulador */}
            <circle cx="1100" cy="40" r="18" fill="#e5e7eb" />
            <rect x="980" y="36" width="90" height="8" rx="4" fill="#9ca3af" />

            {/* ── Main Content Area ── */}

            {/* KPI Cards Row */}
            <g filter="url(#shadow-sm)">
              <rect x="280" y="112" width="260" height="120" rx="16" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
              <rect x="304" y="136" width="40" height="40" rx="8" fill="#10b981" fillOpacity="0.1" />
              <rect x="304" y="196" width="140" height="16" rx="8" fill="#1a1a1a" />
              <rect x="500" y="196" width="16" height="16" rx="8" fill="#10b981" />
            </g>

            <g filter="url(#shadow-sm)">
              <rect x="564" y="112" width="260" height="120" rx="16" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
              <rect x="588" y="136" width="40" height="40" rx="8" fill="#ca2c41" fillOpacity="0.1" />
              <rect x="588" y="196" width="120" height="16" rx="8" fill="#1a1a1a" />
              <rect x="784" y="196" width="16" height="16" rx="8" fill="#ca2c41" />
            </g>

            <g filter="url(#shadow-sm)">
              <rect x="848" y="112" width="260" height="120" rx="16" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
              <rect x="872" y="136" width="40" height="40" rx="8" fill="#4c1d95" fillOpacity="0.1" />
              <rect x="872" y="196" width="160" height="16" rx="8" fill="#1a1a1a" />
            </g>

            {/* Main Chart Area */}
            <g filter="url(#shadow-sm)">
              <rect x="280" y="264" width="544" height="400" rx="16" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
              <rect x="312" y="296" width="180" height="12" rx="6" fill="#1a1a1a" />
              <rect x="312" y="324" width="240" height="8" rx="4" fill="#9ca3af" />

              {/* Chart Grid Lines */}
              <line x1="312" y1="380" x2="792" y2="380" stroke="#f3f4f6" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="312" y1="460" x2="792" y2="460" stroke="#f3f4f6" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="312" y1="540" x2="792" y2="540" stroke="#f3f4f6" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="312" y1="620" x2="792" y2="620" stroke="#e5e7eb" strokeWidth="2" />

              {/* Area Chart 1 (Verde) */}
              <path d="M312 620 L312 500 Q 360 480, 410 520 T 510 440 T 610 480 T 710 360 L 792 380 L 792 620 Z" fill="url(#chartGradient)" />
              <path d="M312 500 Q 360 480, 410 520 T 510 440 T 610 480 T 710 360 L 792 380" stroke="#10b981" strokeWidth="3" fill="none" />

              {/* Area Chart 2 (Rojo) */}
              <path d="M312 620 L312 580 Q 360 590, 410 560 T 510 590 T 610 520 T 710 550 L 792 480 L 792 620 Z" fill="url(#chartGradientRed)" />
              <path d="M312 580 Q 360 590, 410 560 T 510 590 T 610 520 T 710 550 L 792 480" stroke="#ca2c41" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            </g>

            {/* Right Side Widget (Doughnut / Radar placeholder) */}
            <g filter="url(#shadow-sm)">
              <rect x="848" y="264" width="260" height="400" rx="16" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
              <rect x="880" y="296" width="120" height="12" rx="6" fill="#1a1a1a" />

              {/* Doughnut Chart */}
              <circle cx="978" cy="420" r="70" stroke="#f3f4f6" strokeWidth="24" fill="none" />
              <circle cx="978" cy="420" r="70" stroke="#1a1a1a" strokeWidth="24" strokeDasharray="300 440" fill="none" transform="rotate(-90 978 420)" />
              <circle cx="978" cy="420" r="70" stroke="#ca2c41" strokeWidth="24" strokeDasharray="100 440" fill="none" transform="rotate(110 978 420)" />

              {/* Legend Items */}
              <rect x="880" y="540" width="12" height="12" rx="4" fill="#1a1a1a" />
              <rect x="904" y="542" width="80" height="8" rx="4" fill="#4b5563" />

              <rect x="880" y="570" width="12" height="12" rx="4" fill="#ca2c41" />
              <rect x="904" y="572" width="100" height="8" rx="4" fill="#4b5563" />

              <rect x="880" y="600" width="12" height="12" rx="4" fill="#f3f4f6" />
              <rect x="904" y="602" width="60" height="8" rx="4" fill="#4b5563" />
            </g>

          </svg>
        </div>
      </div>
    </div>
  )
}