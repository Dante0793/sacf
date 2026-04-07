"use client"

import {
  Brain,
  BookOpen,
  Lock,
  ArrowRight,
  Flame,
  MessageCircleQuestion
} from "lucide-react"

export default function EducacionPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-full">
      {/* ── Editorial Paper Wrapper ── */}
      <div className="bg-[#fbfbfb] rounded-2xl w-full min-h-[85vh] p-6 sm:p-10 shadow-xl overflow-hidden text-[#2d2b3b] font-sans border border-[#e5e7eb] relative flex flex-col gap-8">

      {/* ── HEADER ── */}
      <header className="flex flex-col">
        <h1 className="text-4xl sm:text-5xl font-black font-serif text-[#2d2b3b] uppercase tracking-tight leading-none mb-2">
          ACADEMIA <span className="text-[#10b981] italic">MASTERCLASS</span>
        </h1>
        <p className="text-sm font-bold font-sans text-[#2d2b3b]/60 uppercase tracking-widest pb-4 border-b border-[#2d2b3b]/10 inline-block pr-6 mb-2">
          Cómo los hábitos interrumpen flujos de capital
        </p>
      </header>

      {/* ── HERO SECTION (Módulo Activo) ── */}
      <div className="w-full border border-gray-200 rounded-2xl overflow-hidden flex flex-col lg:flex-row bg-white">

        {/* Lado Izquierdo: Ilustración */}
        <div className="w-full lg:w-[40%] bg-[#f8fafc] p-6 lg:p-10 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-gray-200 min-h-[250px]">
          {/* Badge flotante */}
          <div className="absolute top-4 left-4 lg:top-6 lg:left-6 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Módulo Activo</p>
            <p className="text-sm font-black text-[#10b981]">60% Completado</p>
          </div>

          {/* Icono central (Simulando el cerebro) */}
          <div className="mt-8">
            <Brain size={120} strokeWidth={1.5} className="text-[#10b981]" />
          </div>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="w-full lg:w-[60%] p-6 lg:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
              Principiante - Avanzado
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <BookOpen size={14} /> 4 Lecciones
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic font-bold mb-6 text-[#1a1a1a]">
            Psicología del Dinero
          </h2>

          {/* Texto con capitular */}
          <div className="flex gap-4 mb-8">
            <span className="text-5xl lg:text-6xl font-black text-[#10b981] leading-none mt-1">S</span>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed text-justify">
              esgos cognitivos en finanzas, triggers emocionales, el ciclo del gasto impulsivo... A través de nuestras métricas,
              hemos notado que la ansiedad financiera bloquea la toma de decisiones racionales. Cuando la fricción económica golpea,
              la respuesta humana por defecto es un <strong className="text-[#1a1a1a]">brote de consumo compensatorio</strong>. Este curso romperá ese ciclo.
            </p>
          </div>

          <button className="self-start bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-2 transition-colors">
            Reanudar Masterclass <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── BOTTOM SECTION: Malla Curricular & Métricas ── */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Columna Malla Curricular (Ocupa 2 en pantallas grandes) */}
        <div className="xl:col-span-2 min-w-0"> {/* min-w-0 es crucial para que el truncate/scroll no rompa el grid flex */}
          <div className="flex justify-between items-end border-l-4 border-[#10b981] pl-3 mb-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-[#1a1a1a]">Malla Curricular</h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">Deslice para explorar &rarr;</span>
          </div>

          {/* Contenedor de tarjetas con Scroll Horizontal en pantallas pequeñas */}
          <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory hide-scrollbar">

            {/* Tarjeta 1 */}
            <div className="shrink-0 w-[240px] md:w-[260px] snap-start border border-gray-200 rounded-xl p-5 bg-white flex flex-col justify-between h-[160px]">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-gray-50 rounded-lg"><BookOpen size={20} className="text-gray-600" /></div>
                <span className="text-3xl font-black text-gray-200">01</span>
              </div>
              <h4 className="font-serif italic font-bold text-lg text-[#1a1a1a]">Fundamentos financieros</h4>
            </div>

            {/* Tarjeta 2 (Activa) */}
            <div className="shrink-0 w-[240px] md:w-[260px] snap-start border-2 border-[#10b981] shadow-sm rounded-xl p-5 bg-white flex flex-col justify-between h-[160px] relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#10b981]/10 rounded-lg"><Brain size={20} className="text-[#10b981]" /></div>
                <span className="text-3xl font-black text-gray-200">02</span>
              </div>
              <h4 className="font-serif italic font-bold text-lg text-[#1a1a1a]">Psicología del Dinero</h4>
              <div className="absolute bottom-0 left-0 h-1 bg-[#10b981] w-[60%]" />
            </div>

            {/* Tarjeta 3 (Bloqueada) */}
            <div className="shrink-0 w-[240px] md:w-[260px] snap-start border border-gray-100 rounded-xl p-5 bg-gray-50 flex flex-col justify-between h-[160px] opacity-70">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-gray-200 rounded-lg"><Lock size={20} className="text-gray-400" /></div>
                <span className="text-3xl font-black text-gray-200">03</span>
              </div>
              <h4 className="font-serif italic font-bold text-lg text-gray-400">Deuda y Crédito</h4>
            </div>

            {/* Tarjeta 4 (Bloqueada) */}
            <div className="shrink-0 w-[240px] md:w-[260px] snap-start border border-gray-100 rounded-xl p-5 bg-gray-50 flex flex-col justify-between h-[160px] opacity-70">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-gray-200 rounded-lg"><Lock size={20} className="text-gray-400" /></div>
                <span className="text-3xl font-black text-gray-200">04</span>
              </div>
              <h4 className="font-serif italic font-bold text-lg text-gray-400">Ahorro e Inversión</h4>
            </div>

          </div>
        </div>

        {/* Columna Métricas (Ocupa 1 en pantallas grandes) */}
        <div className="xl:col-span-1 min-w-0 flex flex-col">
          <div className="border-l-4 border-[#6b21a8] pl-3 mb-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-[#1a1a1a]">Métricas</h3>
          </div>

          <div className="bg-[#4a148c] rounded-xl p-6 text-white flex-1 relative overflow-hidden flex flex-col justify-center">
            {/* Decoración de fondo */}
            <Flame size={120} className="absolute -right-4 -top-4 text-white opacity-5" strokeWidth={1} />

            <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">Disciplina Diaria</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-6xl font-black leading-none">12</span>
              <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Días</span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed max-w-[80%]">
              Racha constante de aprendizaje. Continúa así para consolidar tus hábitos.
            </p>

            {/* Botón flotante estilo chat (como el que se ve en la esquina de tu captura) */}
            <button className="absolute bottom-4 right-4 w-10 h-10 bg-[#ca2c41] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <MessageCircleQuestion size={20} className="text-white" />
            </button>
          </div>
        </div>

      </div>

      {/* CSS para esconder la barra de scroll en navegadores webkit pero mantener funcionalidad */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      </div>
    </div>
  )
}