"use client"

export function LargeTestimonial() {
  return (
    <section className="w-full px-5 overflow-hidden flex justify-center items-center">
      <div className="flex-1 flex flex-col justify-start items-start overflow-hidden">
        <div className="self-stretch px-4 py-12 md:px-6 md:py-16 lg:py-28 flex flex-col justify-start items-start gap-2">
          <div className="self-stretch flex justify-between items-center">
            <div className="flex-1 px-4 py-8 md:px-12 lg:px-20 md:py-8 lg:py-10 overflow-hidden rounded-lg flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-11">

              <div className="w-full max-w-[1024px] text-center text-foreground leading-7 md:leading-10 lg:leading-[64px] font-medium text-lg md:text-3xl lg:text-6xl">
                {
                  "«Tener alertas de mis fugas de capital en tiempo real me cortó los gastos hormiga a la mitad. Controlar tu plata con estas gráficas ahora sí es una belleza, te olvidas de estar renegando a fin de mes.»"
                }
              </div>

              <div className="flex justify-start items-center gap-5">
                {/* Vector de Avatar Integrado (SVG) */}
                <div
                  className="w-12 h-12 relative rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0"
                  style={{ border: "1px solid rgba(0, 0, 0, 0.08)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-gray-600 mt-2"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>

                <div className="flex flex-col justify-start items-start">
                  <div className="text-foreground text-base font-medium leading-6">
                    Ing. Marcelo Cuéllar
                  </div>
                  <div className="text-muted-foreground text-sm font-normal leading-6">
                    Ingeniero de Sistemas - Santa Cruz
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}