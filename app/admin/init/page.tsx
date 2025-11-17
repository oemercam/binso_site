"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InitAdminPage() {
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const initializeAdmin = async () => {
    try {
      setLoading(true)
      setStatus("Erstelle Demo Admin Account...")
      setError("")

      const supabase = createClient()

      // Demo Admin Zugangsdaten
      const email = "demo@binso.ch"
      const password = "Demo123!"

      console.log("[v0] Registriere Admin:", email)

      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginData?.user) {
        setStatus("Demo Admin existiert bereits und wurde angemeldet! Weiterleitung...")
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1500)
        return
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Umgehe Email-Bestätigung für Demo-User
          emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/admin/dashboard` : undefined,
        }
      })

      console.log("[v0] SignUp response:", { signUpData, signUpError })

      if (signUpError) {
        // Wenn Benutzer bereits existiert
        if (signUpError.message.includes("already registered") || signUpError.message.includes("already been registered")) {
          setStatus("Demo Admin existiert bereits! Versuche Login...")
          // Versuche nochmal den Login
          const { data: retryLogin, error: retryError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          if (retryLogin?.user) {
            setStatus("Erfolgreich angemeldet! Weiterleitung...")
            setTimeout(() => {
              router.push("/admin/dashboard")
            }, 1500)
            return
          } else {
            throw new Error("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Supabase Auth Einstellungen.")
          }
        }
        throw signUpError
      }

      if (signUpData.user && !signUpData.session) {
        setError("Email-Bestätigung erforderlich. Bitte überprüfen Sie Ihre Email oder deaktivieren Sie die Email-Bestätigung in den Supabase Auth-Einstellungen.")
        setStatus("")
        setLoading(false)
        return
      }

      setStatus("Demo Admin erfolgreich erstellt und angemeldet! Weiterleitung...")
      
      // Weiterleitung nach 1.5 Sekunden
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 1500)
    } catch (err: any) {
      console.error("[v0] Init error:", err)
      setError(err.message || "Fehler beim Erstellen des Demo Admins")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Demo Account</CardTitle>
          <CardDescription className="text-center">
            Erstellen Sie automatisch einen Demo-Account für Entwicklung und Tests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">Demo Zugangsdaten:</h2>
            <p className="text-sm text-blue-700">
              <strong>Email:</strong> demo@binso.ch
              <br />
              <strong>Passwort:</strong> Demo123!
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-800">
              <strong>Hinweis:</strong> Falls Email-Bestätigung erforderlich ist, deaktivieren Sie diese in den Supabase Dashboard Einstellungen unter Authentication → Providers → Email.
            </p>
          </div>

          {status && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">{status}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Button
            onClick={initializeAdmin}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? "Wird erstellt..." : "Demo Admin erstellen"}
          </Button>

          <div className="text-center">
            <a href="/admin/login" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
              Zurück zum Login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
