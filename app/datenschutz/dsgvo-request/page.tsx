"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Trash2, Shield, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"

export default function DSGVORequestPage() {
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [requiresVerification, setRequiresVerification] = useState(false)
  const [demoCode, setDemoCode] = useState("")

  const handleExport = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/gdpr/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode: requiresVerification ? verificationCode : undefined }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Exportieren")
      }

      if (data.requiresVerification) {
        setRequiresVerification(true)
        setDemoCode(data._demo_code || "")
        setMessage({
          type: "success",
          text: data.message + (data._demo_code ? ` (Demo-Code: ${data._demo_code})` : ""),
        })
      } else {
        // Trigger download
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `my-data-export-${Date.now()}.json`
        a.click()
        window.URL.revokeObjectURL(url)

        setMessage({ type: "success", text: "Ihre Daten wurden erfolgreich exportiert!" })
        setRequiresVerification(false)
        setVerificationCode("")
      }
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Ein Fehler ist aufgetreten" })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/gdpr/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          verificationCode: requiresVerification ? verificationCode : undefined,
          confirmDelete,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Löschen")
      }

      if (data.requiresVerification) {
        setRequiresVerification(true)
        setDemoCode(data._demo_code || "")
        setMessage({
          type: "success",
          text: data.message + (data._demo_code ? ` (Demo-Code: ${data._demo_code})` : ""),
        })
      } else {
        setMessage({ type: "success", text: data.message })
        setEmail("")
        setVerificationCode("")
        setConfirmDelete(false)
        setRequiresVerification(false)
      }
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Ein Fehler ist aufgetreten" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container max-w-4xl">
          <Link
            href="/datenschutz"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Datenschutzerklärung
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">DSGVO Datenschutzrechte</h1>
            <p className="text-lg text-muted-foreground">
              Verwalten Sie Ihre personenbezogenen Daten gemäss DSG (Schweizer Datenschutzgesetz) und DSGVO
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Daten exportieren
                </CardTitle>
                <CardDescription>
                  Laden Sie eine Kopie aller Ihrer personenbezogenen Daten herunter, die wir über Sie gespeichert haben.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="export-email">E-Mail-Adresse</Label>
                  <Input
                    id="export-email"
                    type="email"
                    placeholder="ihre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {requiresVerification && (
                  <div>
                    <Label htmlFor="export-code">Verifikationscode</Label>
                    <Input
                      id="export-code"
                      type="text"
                      placeholder="ABC123"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                      disabled={loading}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Geben Sie den Code ein, den Sie per E-Mail erhalten haben
                    </p>
                  </div>
                )}

                <Button onClick={handleExport} disabled={loading || !email} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  {requiresVerification ? "Export bestätigen" : "Daten exportieren"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="w-5 h-5" />
                  Daten löschen
                </CardTitle>
                <CardDescription>
                  Löschen Sie alle Ihre personenbezogenen Daten dauerhaft aus unserem System. Diese Aktion kann nicht
                  rückgängig gemacht werden.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Die Löschung ist endgültig und kann nicht rückgängig gemacht werden. Bitte exportieren Sie Ihre
                    Daten zuerst, falls Sie eine Kopie benötigen.
                  </AlertDescription>
                </Alert>

                <div>
                  <Label htmlFor="delete-email">E-Mail-Adresse</Label>
                  <Input
                    id="delete-email"
                    type="email"
                    placeholder="ihre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {requiresVerification && (
                  <div>
                    <Label htmlFor="delete-code">Verifikationscode</Label>
                    <Input
                      id="delete-code"
                      type="text"
                      placeholder="ABC123"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                      disabled={loading}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="confirm"
                    checked={confirmDelete}
                    onCheckedChange={(checked) => setConfirmDelete(checked as boolean)}
                    disabled={loading}
                  />
                  <label
                    htmlFor="confirm"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ich bestätige, dass ich alle meine Daten dauerhaft löschen möchte
                  </label>
                </div>

                <Button
                  onClick={handleDelete}
                  disabled={loading || !email || !confirmDelete}
                  variant="destructive"
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {requiresVerification ? "Löschung bestätigen" : "Daten löschen"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {message && (
            <Alert className={`mt-6 ${message.type === "error" ? "border-destructive" : "border-primary"}`}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <Card className="mt-6 bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="w-4 h-4" />
                Ihre Rechte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Auskunftsrecht:</strong> Sie können jederzeit Auskunft über Ihre gespeicherten Daten verlangen.
              </p>
              <p>
                <strong>Recht auf Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem maschinenlesbaren
                Format erhalten.
              </p>
              <p>
                <strong>Recht auf Löschung:</strong> Sie können die Löschung Ihrer Daten verlangen, sofern keine
                gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
              <p className="mt-4">
                Bei Fragen kontaktieren Sie uns unter:{" "}
                <a href="mailto:datenschutz@binso.ch" className="text-primary hover:underline">
                  datenschutz@binso.ch
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
