import Link from "next/link"
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />
      <div className="container py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-medium text-black dark:text-white mb-4">Projekt nicht gefunden</h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Das gesuchte Projekt existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#7A7FEE] text-white rounded-lg text-base font-medium hover:bg-opacity-90 transition-colors"
        >
          Zurück zum Portfolio
        </Link>
      </div>
      <Footer />
    </main>
  )
}
