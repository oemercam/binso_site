"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loginAdmin } from "@/app/actions/admin-auth"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.append("ipAddress", "client-ip")
      const result = await loginAdmin(formData)

      if (result.success) {
        router.push("/admin/dashboard")
      } else {
        setError(result.error || "Login fehlgeschlagen")
        setLoading(false)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(`Ein Fehler ist aufgetreten: ${err}`)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Melden Sie sich an, um auf das Dashboard zuzugreifen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">Neu hier?</h3>
              <p className="text-xs text-blue-700 mb-3">
                Erstellen Sie zuerst einen Demo-Account für Entwicklung und Tests.
              </p>
              <Link href="/admin/init" className="block">
                <Button
                  type="button"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  size="default"
                >
                  Demo-Account jetzt erstellen
                </Button>
              </Link>
            </div>

            <details className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <summary className="text-sm font-medium text-slate-900 cursor-pointer">
                Demo-Zugangsdaten anzeigen
              </summary>
              <div className="mt-2 text-xs text-slate-700 space-y-1">
                <p><strong>E-Mail:</strong> demo@binso.ch</p>
                <p><strong>Passwort:</strong> Demo123!</p>
              </div>
            </details>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Oder mit bestehenden Zugangsdaten
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800 font-medium mb-1">Login fehlgeschlagen</p>
                <p className="text-xs text-red-700">{error}</p>
                {error.includes("Invalid") && (
                  <div className="mt-2 pt-2 border-t border-red-300">
                    <p className="text-xs text-red-700">
                      Falls Sie die Demo-Zugangsdaten verwenden, erstellen Sie zuerst den Demo-Account über den Button oben.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ihre-email@beispiel.de"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" variant="outline" className="w-full" disabled={loading}>
              {loading ? "Wird angemeldet..." : "Anmelden"}
            </Button>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-4">
              <p className="text-xs text-yellow-800">
                Nach 5 fehlgeschlagenen Login-Versuchen wird Ihr Account für 15 Minuten gesperrt.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
