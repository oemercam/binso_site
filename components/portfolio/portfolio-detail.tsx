"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, MessageSquare, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"
import type { PortfolioItem } from "@/utils/csv-parser"
import { sanitizeHTML } from "@/lib/sanitize-html"

interface PortfolioDetailPageProps {
  project: PortfolioItem
}

export default function PortfolioDetailPage({ project }: PortfolioDetailPageProps) {
  const benefits = [
    "Steigerung der Benutzerfreundlichkeit um 40%",
    "Reduzierung der Ladezeiten um 60%",
    "Moderne, responsive Oberfläche",
    "SEO-Optimierung für bessere Sichtbarkeit",
    "Integration mit bestehenden Systemen",
    "Skalierbare Architektur",
  ]

  const features = [
    {
      title: "Design & UX",
      description: project.shortDescription || "Modernes, benutzerfreundliches Design mit Fokus auf Conversion.",
    },
    {
      title: "Technologie",
      description: "Entwickelt mit modernsten Technologien für Performance und Skalierbarkeit.",
    },
    {
      title: "Integration",
      description: "Nahtlose Integration mit bestehenden Tools und Workflows.",
    },
    {
      title: "Support",
      description: "Fortlaufende Wartung und Support für langfristigen Erfolg.",
    },
  ]

  const results = [
    "40% mehr Benutzerengagement",
    "60% schnellere Ladezeiten",
    "25% höhere Conversion-Rate",
    "100% zufriedener Kunde",
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-[#111111]">
        {/* Hero Section */}
        <section className="relative pt-8 pb-20 overflow-hidden">
          <div className="container">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zum Portfolio
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.categories
                    ?.filter((cat) => cat !== "all")
                    .map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-[#7A7FEE]/10 text-[#7A7FEE] rounded-full text-sm font-medium"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-4">
                  {project.projectUrl && (
                    <Button size="lg" className="bg-[#7A7FEE] hover:bg-[#6B6FDE] text-white" asChild>
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Projekt ansehen
                      </a>
                    </Button>
                  )}
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      const event = new CustomEvent("openContactDrawer")
                      window.dispatchEvent(event)
                    }}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Ähnliches Projekt anfragen
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={project.mainImage || "/placeholder.svg?height=600&width=800"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Details Section */}
        <section className="py-20 bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Projektergebnisse
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#7A7FEE] flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(project.content) }} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Projektdetails
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Messbarer Erfolg
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800 text-center"
                >
                  <p className="text-2xl font-bold text-[#7A7FEE] mb-2">{result.split(" ")[0]}</p>
                  <p className="text-gray-700 dark:text-gray-300">{result.split(" ").slice(1).join(" ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#7A7FEE]">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Interessiert an einem ähnlichen Projekt?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch. Wir analysieren Ihre Anforderungen und
              entwickeln eine massgeschneiderte Lösung.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#7A7FEE] hover:bg-gray-100"
                onClick={() => {
                  const event = new CustomEvent("openContactDrawer")
                  window.dispatchEvent(event)
                }}
              >
                Jetzt Beratung anfragen
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <a href="https://wa.me/41792619587" target="_blank" rel="noopener noreferrer">
                  WhatsApp Chat starten
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
