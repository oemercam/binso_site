"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, X, ArrowRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  link: string
}

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

// Alle durchsuchbaren Inhalte der Webseite
const searchableContent: SearchResult[] = [
  // Dienstleistungen
  {
    id: "service-1",
    title: "KI-Chatbot Entwicklung",
    description:
      "Intelligente Chatbots, die Ihre Kundenanfragen automatisch beantworten und rund um die Uhr verfügbar sind.",
    category: "Dienstleistung",
    link: "#dienstleistungen",
  },
  {
    id: "service-2",
    title: "Workflow Automatisierung",
    description:
      "Optimieren Sie Ihre Geschäftsprozesse durch intelligente Automatisierung und steigern Sie die Effizienz.",
    category: "Dienstleistung",
    link: "#dienstleistungen",
  },
  {
    id: "service-3",
    title: "Custom AI Solutions",
    description:
      "Massgeschneiderte KI-Anwendungen, die perfekt auf Ihre spezifischen Geschäftsanforderungen zugeschnitten sind.",
    category: "Dienstleistung",
    link: "#dienstleistungen",
  },
  {
    id: "service-4",
    title: "Datenanalyse & Insights",
    description:
      "Verwandeln Sie Ihre Daten in wertvolle Erkenntnisse mit fortschrittlichen Analyse-Tools und Dashboards.",
    category: "Dienstleistung",
    link: "#dienstleistungen",
  },
  {
    id: "service-5",
    title: "API Integration",
    description: "Nahtlose Integration Ihrer bestehenden Systeme mit modernen APIs und Microservices-Architekturen.",
    category: "Dienstleistung",
    link: "#dienstleistungen",
  },
  {
    id: "service-6",
    title: "KI-Beratung & Strategie",
    description: "Strategische Beratung zur optimalen Nutzung von KI-Technologien für Ihr Unternehmenswachstum.",
    category: "Dienstleistung",
    link: "#dienstleistungen",
  },
  // Team
  {
    id: "team-1",
    title: "Dr. Anna Weber - CEO & KI-Strategin",
    description:
      "15+ Jahre Erfahrung in der Entwicklung von KI-Lösungen für Fortune 500 Unternehmen. Promotion in Machine Learning an der TU München.",
    category: "Team",
    link: "#team",
  },
  {
    id: "team-2",
    title: "Maximilian Schneider - CTO & Lead Developer",
    description:
      "Full-Stack Architekt mit Spezialisierung auf skalierbare Cloud-Infrastrukturen und moderne Web-Technologien.",
    category: "Team",
    link: "#team",
  },
  {
    id: "team-3",
    title: "Lisa Hoffmann - Head of Design",
    description:
      "Preisgekrönte UX/UI Designerin mit Fokus auf intuitive Benutzeroberflächen und barrierearme digitale Produkte.",
    category: "Team",
    link: "#team",
  },
  {
    id: "team-4",
    title: "Thomas Becker - Data Science Lead",
    description:
      "Experte für Datenanalyse und Machine Learning Modelle. Ehemals bei führenden Tech-Unternehmen in Berlin und London.",
    category: "Team",
    link: "#team",
  },
  // FAQ
  {
    id: "faq-1",
    title: "Was kann ich erwarten, wenn wir zusammenarbeiten?",
    description:
      "Wir beginnen mit einem Erstgespräch, um Ihre Bedürfnisse zu verstehen, und erstellen dann ein detailliertes Angebot mit Zeitplan und Kostenschätzung.",
    category: "FAQ",
    link: "#faq",
  },
  {
    id: "faq-2",
    title: "Wie lange dauert die Umsetzung von Projekten?",
    description:
      "Die Projektdauer variiert je nach Komplexität. Einfache Webseiten können 2-4 Wochen dauern, während komplexe Plattformen 3-6 Monate in Anspruch nehmen können.",
    category: "FAQ",
    link: "#faq",
  },
  {
    id: "faq-3",
    title: "Welche Tools verwenden Sie für die Entwicklung?",
    description:
      "Wir nutzen moderne Frameworks wie React, Next.js und Node.js sowie KI-Tools und Cloud-Services. Unser Tech-Stack wird individuell auf die spezifischen Anforderungen jedes Projekts zugeschnitten.",
    category: "FAQ",
    link: "#faq",
  },
  {
    id: "faq-4",
    title: "Was kostet ein typisches Projekt?",
    description:
      "Die Projektkosten variieren stark je nach Anforderungen. Einfache Webseiten beginnen bei ca. CHF 5'000, während komplexe Plattformen von CHF 25'000 bis über CHF 100'000 reichen können.",
    category: "FAQ",
    link: "#faq",
  },
  {
    id: "faq-5",
    title: "Wie handhaben Sie die Zahlungen?",
    description:
      "Wir arbeiten üblicherweise mit einer 50% Anzahlung und den verbleibenden 50% bei Projektabschluss. Bei grösseren Projekten können wir Meilenstein-basierte Zahlungspläne vereinbaren.",
    category: "FAQ",
    link: "#faq",
  },
  // Allgemeine Seiten
  {
    id: "page-portfolio",
    title: "Portfolio - Alle Projekte",
    description:
      "Entdecken Sie unsere vollständige Sammlung von Projekten und Erfolgsgeschichten. Von KI-gestützter Automatisierung bis zu massgeschneiderten Marktplätzen.",
    category: "Seite",
    link: "/portfolio",
  },
  {
    id: "section-projekte",
    title: "Unsere Projekte",
    description:
      "Von KI-gestützter Automatisierung bis zu massgeschneiderten Marktplätzen – unsere Arbeit hilft Unternehmen, intelligenter zu wachsen.",
    category: "Sektion",
    link: "#projekte",
  },
  {
    id: "section-referenzen",
    title: "Kundenbewertungen & Referenzen",
    description: "Was unsere Kunden über uns sagen - Erfahren Sie mehr über unsere erfolgreichen Zusammenarbeiten.",
    category: "Sektion",
    link: "#referenzen",
  },
]

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Suchlogik
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return []
    }

    const query = searchQuery.toLowerCase()
    return searchableContent.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      )
    })
  }, [searchQuery])

  // Reset bei Dialog-Schließung
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("")
    }
  }, [isOpen])

  const handleResultClick = (link: string) => {
    onClose()

    // Wenn es ein interner Anker-Link ist
    if (link.startsWith("#")) {
      // Zur Startseite navigieren, falls nicht dort
      if (window.location.pathname !== "/") {
        router.push(`/${link}`)
      } else {
        // Direkt zum Bereich scrollen
        const element = document.getElementById(link.substring(1))
        if (element) {
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }
    } else {
      // Externe oder andere Seiten
      router.push(link)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          <DialogTitle className="text-xl font-semibold text-black dark:text-white">Webseite durchsuchen</DialogTitle>
        </DialogHeader>

        <div className="p-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Suchen Sie nach Dienstleistungen, Team, FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="overflow-y-auto max-h-[50vh] px-6 pb-6">
          {!searchQuery.trim() ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Geben Sie einen Suchbegriff ein</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {searchResults.length} {searchResults.length === 1 ? "Ergebnis" : "Ergebnisse"} gefunden
              </p>
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.link)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-[#7A7FEE] dark:hover:border-[#7A7FEE] hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#7A7FEE]/10 text-[#7A7FEE] font-medium">
                          {result.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-black dark:text-white group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors mb-1 line-clamp-1">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{result.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors flex-shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium mb-1">Keine Ergebnisse gefunden</p>
              <p className="text-sm">Versuchen Sie andere Suchbegriffe</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
