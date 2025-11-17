"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
          <div className="max-w-2xl w-full text-center">
            <div className="flex justify-center mb-8">
              <AlertTriangle className="w-24 h-24 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Kritischer Fehler</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Ein kritischer Fehler ist aufgetreten. Bitte laden Sie die Seite neu oder kehren Sie zur Startseite zurück.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Erneut versuchen
              </button>
              <Link
                href="/"
                className="px-6 py-3 border border-input rounded-md hover:bg-accent"
              >
                <Home className="inline w-4 h-4 mr-2" />
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
