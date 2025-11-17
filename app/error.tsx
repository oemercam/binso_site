"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RefreshCw, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* 500 Large Number */}
          <div className="relative mb-8">
            <h1 className="text-[150px] sm:text-[200px] font-bold text-destructive/10 leading-none select-none">
              500
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-destructive/20 blur-3xl animate-pulse" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-16 h-16 text-destructive" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">
              Etwas ist schief gelaufen
            </h2>
            <p className="text-lg text-muted-foreground text-balance max-w-md mx-auto">
              Es tut uns leid, aber beim Laden dieser Seite ist ein unerwarteter Fehler aufgetreten. Unser Team wurde automatisch benachrichtigt.
            </p>
          </div>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-8 text-left">
              <h3 className="font-semibold mb-2 text-destructive">Entwickler-Info:</h3>
              <pre className="text-xs overflow-auto text-muted-foreground">
                {error.message}
              </pre>
            </div>
          )}

          {/* Suggestions */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold mb-3 text-center">Was Sie tun können:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Versuchen Sie die Seite neu zu laden</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Gehen Sie zur Startseite zurück</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Kontaktieren Sie uns, wenn das Problem weiterhin besteht</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={reset} size="lg" className="w-full sm:w-auto">
              <RefreshCw className="w-4 h-4 mr-2" />
              Erneut versuchen
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Zur Startseite
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <Link href="/kontakt">
                <MessageCircle className="w-4 h-4 mr-2" />
                Kontakt
              </Link>
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-destructive/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-destructive/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
