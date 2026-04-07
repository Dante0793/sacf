"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2, Check } from "lucide-react"
import { AuthPanel } from "@/components/auth-panel"

const passwordRules = [
  { label: "Al menos 8 caracteres", test: (p: string) => p.length >= 8 },
  { label: "Una letra mayúscula", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Un número", test: (p: string) => /\d/.test(p) },
]

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirm) {
      setError("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
        setError(data.error || "Error al crear la cuenta")
      }
    } catch {
      setIsLoading(false)
      setError("Error de conexión. Intenta de nuevo.")
    }
  }

  const passwordStrength = passwordRules.filter((r) => r.test(formData.password)).length

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* ─── LEFT PANEL – Form ─────────────────────────────── */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-12 xl:px-20 py-10 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8 self-start">
          <div className="flex items-center justify-center w-9 h-9 shrink-0 drop-shadow-md">
            <svg width="100%" height="100%" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-[1.1]">
              {/* Orejas */}
              <circle cx="14" cy="16" r="8" fill="#e5e7eb" />
              <circle cx="38" cy="16" r="8" fill="#e5e7eb" />
              <circle cx="14" cy="16" r="4.5" fill="black" />
              <circle cx="38" cy="16" r="4.5" fill="black" />
              
              {/* Cara */}
              <path d="M7 24 C7 14, 45 14, 45 24 C45 34, 30 46, 26 48 C22 46, 7 34, 7 24 Z" fill="#fcfcfc" />
              
              {/* Mancha negra frente */}
              <path d="M18 12 Q26 28 34 12 L26 12 Z" fill="black" />
              
              {/* Ojos */}
              <circle cx="20" cy="27" r="3" fill="black" />
              <circle cx="32" cy="27" r="3" fill="black" />
              <circle cx="19.5" cy="26" r="1.5" fill="white" />
              <circle cx="31.5" cy="26" r="1.5" fill="white" />
              
              {/* Nariz */}
              <path d="M23 44 C23 41, 29 41, 29 44 L26 49 Z" fill="#ea580c" />
            </svg>
          </div>
          <span className="text-xl font-bold font-sans tracking-[0.2em] text-[#fbfbfb] mt-0.5 ml-1">
            S<span className="text-[#ea580c]">A</span>CF
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-3xl font-bold text-foreground mb-2">Crea tu cuenta</h2>
            <p className="text-muted-foreground text-sm">
              Empieza tu viaje hacia la libertad financiera hoy
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 mb-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Juan Pérez"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 hover:border-white/20"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-email" className="text-sm font-medium text-foreground/80">
                Correo electrónico
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 hover:border-white/20"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-password" className="text-sm font-medium text-foreground/80">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 hover:border-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password strength */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-1 flex flex-col gap-1.5"
                >
                  {/* Bar */}
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= passwordStrength
                            ? passwordStrength === 1
                              ? "bg-red-500"
                              : passwordStrength === 2
                              ? "bg-yellow-400"
                              : "bg-primary"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  {/* Rules */}
                  <div className="flex flex-col gap-0.5">
                    {passwordRules.map((rule, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check
                          size={11}
                          className={rule.test(formData.password) ? "text-primary" : "text-white/20"}
                        />
                        <span
                          className={`text-xs transition-colors ${
                            rule.test(formData.password) ? "text-primary/80" : "text-white/30"
                          }`}
                        >
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm" className="text-sm font-medium text-foreground/80">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirm}
                  onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:ring-2 hover:border-white/20 bg-white/5 ${
                    formData.confirm && formData.password !== formData.confirm
                      ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20"
                      : "border-white/10 focus:border-primary/60 focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-primary transition-colors"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirm && formData.password !== formData.confirm && (
                <p className="text-xs text-red-400">Las contraseñas no coinciden</p>
              )}
            </div>

            {/* Terms */}
            <label htmlFor="terms" className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center ${
                    formData.terms
                      ? "bg-primary border-primary"
                      : "bg-white/5 border-white/20 group-hover:border-primary/50"
                  }`}
                >
                  {formData.terms && <Check size={10} className="text-primary-foreground" strokeWidth={3} />}
                </div>
              </div>
              <span className="text-xs text-muted-foreground leading-relaxed">
                Acepto los{" "}
                <Link href="/terms" className="text-primary hover:underline">Términos de Servicio</Link>
                {" "}y la{" "}
                <Link href="/privacy" className="text-primary hover:underline">Política de Privacidad</Link>
              </span>
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="mt-1 flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-3 px-6 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_rgba(120,252,214,0.25)] transition-all duration-200 hover:shadow-[0_0_32px_rgba(120,252,214,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Crear cuenta gratis
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ─── RIGHT PANEL – Branding ─────────────────────────── */}
      <AuthPanel />
    </div>
  )
}
