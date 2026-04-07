"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { AuthPanel } from "@/components/auth-panel"

function TlacuacheLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm shrink-0">
      <circle cx="14" cy="16" r="8" fill="#2d2b3b" />
      <circle cx="38" cy="16" r="8" fill="#2d2b3b" />
      <circle cx="14" cy="16" r="4.5" fill="#4a4760" />
      <circle cx="38" cy="16" r="4.5" fill="#4a4760" />
      <path d="M7 24 C7 14, 45 14, 45 24 C45 34, 30 46, 26 48 C22 46, 7 34, 7 24 Z" fill="#2d2b3b" />
      <path d="M18 12 Q26 28 34 12 L26 12 Z" fill="#1a1828" />
      <circle cx="20" cy="27" r="3" fill="#fcfcfc" />
      <circle cx="32" cy="27" r="3" fill="#fcfcfc" />
      <circle cx="19.5" cy="26" r="1.5" fill="#2d2b3b" />
      <circle cx="31.5" cy="26" r="1.5" fill="#2d2b3b" />
      <path d="M23 44 C23 41, 29 41, 29 44 L26 49 Z" fill="#ea580c" />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
        setError(data.error || "Usuario o contraseña incorrectos")
      }
    } catch {
      setIsLoading(false)
      setError("Error de conexión. Intenta de nuevo.")
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* ─── LEFT PANEL – Form ─────────────────────────────── */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-12 xl:px-20 py-12">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 mb-10 self-start">
          <TlacuacheLogo size={34} />
          <span className="text-xl font-bold font-sans tracking-[0.2em] text-[#fbfbfb] mt-0.5">
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Bienvenido de vuelta</h2>
            <p className="text-muted-foreground text-sm">
              Inicia sesión para continuar con tu progreso financiero
            </p>

          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username/Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                Usuario o correo electrónico
              </label>
              <input
                id="email"
                type="text"
                autoComplete="username"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="juan o tu@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 hover:border-white/20"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground/80">
                  Contraseña
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
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
            </div>

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
                  Iniciar sesión
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          {/* <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground/50">o continúa con</span>
            <div className="flex-1 h-px bg-white/10" />
          </div> */}

          {/* Social buttons → redirigen al dashboard directamente */}
          {/* <div className="grid grid-cols-2 gap-3">
            <button
              id="login-google"
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground/70 hover:border-white/20 hover:bg-white/10 hover:text-foreground transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              id="login-github"
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground/70 hover:border-white/20 hover:bg-white/10 hover:text-foreground transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div> */}

          {/* Register link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            ¿Aún no tienes cuenta?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
            >
              Regístrate gratis
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ─── RIGHT PANEL – Branding ─────────────────────────── */}
      <AuthPanel />
    </div>
  )
}
