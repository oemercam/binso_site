import Link from "next/link"
import { ArrowLeft, Home, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Large Number */}
          <div className="relative mb-8">
            <h1 className="text-[150px] sm:text-[200px] font-bold text-primary/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/20 blur-3xl animate-pulse" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">
              Seite nicht gefunden
            </h2>
            <p className="text-lg text-muted-foreground text-balance max-w-md mx-auto">
              Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben. Möglicherweise haben Sie einen veralteten Link verwendet.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold mb-3 text-center">Das könnten Sie versuchen:</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Überprüfen Sie die URL auf Tippfehler</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Gehen Sie zur Startseite zurück</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Nutzen Sie die Navigation, um die gewünschte Seite zu finden</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Zur Startseite
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/dienstleistungen">
                <Search className="w-4 h-4 mr-2" />
                Dienstleistungen
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <Link href="/kontakt">
                Kontakt
              </Link>
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
