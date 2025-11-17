"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSetupPage() {
  const [email, setEmail] = useState("admin@binso.ch")
  const [password, setPassword] = useState("Binso2024!Admin")
  const [confirmPassword, setConfirmPassword] = useState("Binso2024!Admin")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    console.log("[v0] Starting admin setup...")

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein")
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen lang sein")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      console.log("[v0] Supabase client created")

      // Erstelle Admin-Benutzer in Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      console.log("[v0] SignUp response:", { data, error: signUpError })

      if (signUpError) {
        setError(`Fehler bei der Registrierung: ${signUpError.message}`)
        setLoading(false)
        return
      }

      if (!data.user) {
        setError("Benutzer konnte nicht erstellt werden")
        setLoading(false)
        return
      }

      // Füge Benutzer zur admin_users Tabelle hinzu
      const { error: insertError } = await supabase.from("admin_users").insert({
        id: data.user.id,
        email: email,
      })

      console.log("[v0] Insert admin_users:", { insertError })

      if (insertError) {
        setError(`Fehler beim Erstellen des Admin-Eintrags: ${insertError.message}`)
        setLoading(false)
        return
      }

      setSuccess("Admin-Account erfolgreich erstellt! Sie werden zum Login weitergeleitet...")
      setTimeout(() => {
        router.push("/admin/login")
      }, 2000)
    } catch (err) {
      console.error("[v0] Setup error:", err)
      setError(`Ein Fehler ist aufgetreten: ${err}`)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Setup</CardTitle>
          <CardDescription className="text-center">Erstellen Sie Ihren ersten Admin-Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetup} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@binso.ch"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                minLength={8}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Wird erstellt..." : "Admin-Account erstellen"}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>
                Bereits registriert?{" "}
                <a href="/admin/login" className="text-primary hover:underline">
                  Zum Login
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
