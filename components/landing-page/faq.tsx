"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Cloud, Shield, Laptop, Users } from 'lucide-react'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  published: boolean
}

const categoryConfig = [
  { id: "cloud-azure", title: "Cloud & Azure M365", icon: Cloud },
  { id: "security-support", title: "Cyber Security & Support", icon: Shield },
  { id: "workplace-ki", title: "Modern Workplace & KI", icon: Laptop },
  { id: "outsourcing-consulting", title: "IT-Outsourcing & Consulting", icon: Users },
]

export default function Faq() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  const fallbackFaqs: FAQ[] = [
    {
      id: 1,
      question: "Welche Cloud-Dienste bieten Sie an?",
      answer:
        "Wir bieten umfassende Cloud-Lösungen mit Azure und Microsoft 365. Von der Migration bestehender Systeme über Hybrid-Cloud-Architekturen bis hin zu vollständig verwalteten Cloud-Infrastrukturen. Inklusive Backup, Monitoring und 24/7 Support.",
      category: "cloud-azure",
      published: true,
    },
    {
      id: 2,
      question: "Wie schützen Sie mein Unternehmen vor Cyber-Bedrohungen?",
      answer:
        "Unser Cyber Security Service umfasst Firewall-Management, Endpoint-Protection, regelmäßige Security-Audits, Mitarbeiter-Schulungen, Incident Response und SIEM-Lösungen. Wir implementieren Zero-Trust-Architekturen und sorgen für kontinuierliche Überwachung.",
      category: "security-support",
      published: true,
    },
    {
      id: 3,
      question: "Was umfasst Ihr IT-Support?",
      answer:
        "Unser Support-Team bietet First- und Second-Level-Support für Hard- und Software, Remote-Hilfe, Vor-Ort-Service, Wartung, Updates und Problemlösungen. Verfügbar per Telefon, E-Mail, Ticket-System oder persönlich – flexibel nach Ihren Bedürfnissen.",
      category: "security-support",
      published: true,
    },
    {
      id: 4,
      question: "Was bedeutet Modern Workplace?",
      answer:
        "Modern Workplace kombiniert Microsoft 365, Teams, SharePoint und mobile Geräte für produktives Arbeiten von überall. Wir implementieren kollaborative Tools, automatisieren Workflows und integrieren KI-Assistenten für effizientere Prozesse.",
      category: "workplace-ki",
      published: true,
    },
    {
      id: 5,
      question: "Wie kann KI mein Unternehmen unterstützen?",
      answer:
        "KI-Integration spart Zeit durch automatisierte Dokumentenverarbeitung, intelligente Chatbots für Kundenservice, Datenanalyse, Prozessautomation und Predictive Maintenance. Wir entwickeln maßgeschneiderte KI-Lösungen basierend auf Azure AI und OpenAI.",
      category: "workplace-ki",
      published: true,
    },
    {
      id: 6,
      question: "Was ist IT-Outsourcing und welche Vorteile bietet es?",
      answer:
        "Beim IT-Outsourcing stellen wir qualifizierte IT-Experten für Ihr Team bereit – flexibel nach Bedarf. Vorteile: Kostenreduktion, Zugang zu Spezialisten, Skalierbarkeit und Fokus auf Ihr Kerngeschäft. Von einzelnen Entwicklern bis zu kompletten IT-Teams.",
      category: "outsourcing-consulting",
      published: true,
    },
    {
      id: 7,
      question: "Welche Netzwerk- und Infrastruktur-Services bieten Sie?",
      answer:
        "Wir planen, implementieren und verwalten Ihre gesamte IT-Infrastruktur: LAN/WAN, WLAN, VPN, Server, Virtualisierung, Storage-Lösungen und Netzwerk-Sicherheit. Inklusive Dokumentation, Monitoring und kontinuierliche Optimierung.",
      category: "cloud-azure",
      published: true,
    },
    {
      id: 8,
      question: "Entwickeln Sie auch maßgeschneiderte Websites und Web-Apps?",
      answer:
        "Ja! Wir entwickeln responsive Websites, Web-Applikationen, E-Commerce-Lösungen und Portale mit modernen Technologien. Von der Konzeption über Design bis zur Programmierung und Hosting – alles aus einer Hand.",
      category: "workplace-ki",
      published: true,
    },
    {
      id: 9,
      question: "Was umfasst Ihr IT-Consulting?",
      answer:
        "Unser Consulting umfasst IT-Strategie-Beratung, Technologie-Auswahl, Digital Transformation, IT-Sicherheitskonzepte, Cloud-Migration-Strategien und Prozessoptimierung. Wir analysieren Ihre Bedürfnisse und entwickeln passgenaue Lösungen.",
      category: "outsourcing-consulting",
      published: true,
    },
    {
      id: 10,
      question: "Bieten Sie Services auch für Privatkunden an?",
      answer:
        "Ja, wir unterstützen auch Privatkunden bei PC-Problemen, Netzwerk-Einrichtung, Datensicherung, Gerätekonfiguration, Website-Erstellung und IT-Beratung. Ob Remote-Support oder Vor-Ort-Service – wir helfen gerne weiter.",
      category: "security-support",
      published: true,
    },
  ]

  useEffect(() => {
    fetch("/api/public/faqs")
      .then((res) => {
        if (!res.ok) throw new Error("API failed")
        return res.json()
      })
      .then((data) => {
        const validFaqs = data.filter((faq: FAQ) => 
          categoryConfig.some(cat => cat.id === faq.category)
        )
        
        if (validFaqs.length === 0) {
          setFaqs(fallbackFaqs)
        } else {
          setFaqs(validFaqs)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load FAQs:", err)
        setFaqs(fallbackFaqs)
        setLoading(false)
      })
  }, [])

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  // Group FAQs by category
  const faqCategories = categoryConfig
    .map((cat) => ({
      ...cat,
      questions: faqs
        .filter((faq) => faq.category === cat.id),
    }))
    .filter((cat) => cat.questions.length > 0)

  // Die wichtigsten 10 FAQs für mobile (flache Liste)
  const topFaqs = faqs.slice(0, 10)

  if (loading) {
    return (
      <section id="faq" className="mb-20">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-6"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded w-full max-w-2xl mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="faq" className="mb-16 md:mb-20">
      <div>
        <h2 className="text-black dark:text-white mb-4 md:mb-6 text-[1.75rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-5xl font-medium sm:leading-tight">
          Häufig gestellte
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Fragen</span>
        </h2>
        <p className="mb-8 md:mb-12 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
          Hier finden Sie Antworten auf die häufigsten Fragen zu unseren IT-Dienstleistungen, Cloud-Lösungen, Cyber-Sicherheit und mehr.
        </p>

        {/* Mobile Ansicht - Einfache Liste */}
        <div className="md:hidden space-y-3">
          {topFaqs.map((question) => {
            const itemId = `mobile-${question.id}`
            return (
              <div
                key={question.id}
                className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-white/50 dark:bg-gray-900/50"
              >
                <button
                  onClick={() => toggleItem(itemId)}
                  className="flex justify-between items-start w-full text-left group min-h-[44px]"
                  aria-expanded={openItem === itemId}
                  aria-controls={`faq-answer-${itemId}`}
                >
                  <span className="font-medium text-[0.9375rem] leading-snug text-gray-900 dark:text-gray-100 group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors pr-4">
                    {question.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform text-gray-500 ${
                      openItem === itemId ? "rotate-180 text-[#7A7FEE]" : ""
                    }`}
                  />
                </button>
                {openItem === itemId && (
                  <div
                    id={`faq-answer-${itemId}`}
                    className="mt-3 text-[0.9375rem] leading-relaxed text-gray-700 dark:text-gray-300"
                  >
                    {question.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Desktop Ansicht - Kategorien-Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqCategories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.id}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white/50 dark:bg-gray-900/50"
              >
                {/* Kategorie-Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#7A7FEE]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#7A7FEE]" />
                  </div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">{category.title}</h3>
                </div>

                {/* Fragen innerhalb der Kategorie */}
                <div className="space-y-3">
                  {category.questions.map((question) => {
                    const itemId = `${category.id}-${question.id}`
                    return (
                      <div
                        key={question.id}
                        className="border-b border-gray-200 dark:border-gray-800 pb-3 last:border-0"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="flex justify-between items-start w-full text-left py-2 group"
                          aria-expanded={openItem === itemId}
                          aria-controls={`faq-answer-${itemId}`}
                        >
                          <span className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors pr-4">
                            {question.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 flex-shrink-0 transition-transform text-gray-500 ${
                              openItem === itemId ? "rotate-180 text-[#7A7FEE]" : ""
                            }`}
                          />
                        </button>
                        {openItem === itemId && (
                          <div
                            id={`faq-answer-${itemId}`}
                            className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                          >
                            {question.answer}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
