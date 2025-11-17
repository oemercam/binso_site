import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Target, Users, Award, ArrowRight } from 'lucide-react'
import ContactFormButton from "@/components/landing-page/contact-form-button"

export const metadata = {
  title: "Über uns - AUTOMATTIC | KI-gestützte Entwicklung",
  description: "Erfahren Sie mehr über AUTOMATTIC - Ihr Partner für KI-gestützte Entwicklung, Automatisierung und digitale Transformation.",
}

export default function AboutPage() {
  return (
    <main className="container py-12 md:py-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto mb-16 md:mb-24">
        <h1 className="text-black dark:text-white text-[2rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
          Über
          <span className="block text-[#7A7FEE]">AUTOMATTIC</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          Ihr KI-gestützter Entwicklungspartner für hochwertige, skalierbare Plattformen.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-28">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 text-[#7A7FEE]">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Unsere Mission</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-black dark:text-white mb-6">
            Digitalisierung mit KI & Automatisierung
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Wir entwickeln intelligente Lösungen, die Ihre Geschäftsprozesse automatisieren und optimieren. 
            Mit modernster KI-Technologie und jahrelanger Erfahrung in der Softwareentwicklung bringen wir 
            Ihre digitale Transformation voran.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Unser Ziel ist es, Unternehmen dabei zu helfen, effizienter zu arbeiten, Kosten zu senken 
            und sich auf ihr Kerngeschäft zu konzentrieren – während wir uns um die Technologie kümmern.
          </p>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#7A7FEE]/20 to-[#A78BFA]/20 flex items-center justify-center">
            <Image
              src="/modern-office-workspace-with-computers.jpg"
              alt="AUTOMATTIC Team"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20 md:mb-28">
        <h2 className="text-3xl md:text-4xl font-medium text-black dark:text-white mb-12 text-center">
          Unsere Werte
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: CheckCircle2,
              title: "Qualität",
              description: "Höchste Standards in Entwicklung und Ausführung",
            },
            {
              icon: Users,
              title: "Partnerschaft",
              description: "Enge Zusammenarbeit mit unseren Kunden",
            },
            {
              icon: Award,
              title: "Innovation",
              description: "Modernste Technologien und Ansätze",
            },
            {
              icon: Target,
              title: "Effizienz",
              description: "Schnelle Umsetzung ohne Kompromisse",
            },
          ].map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7A7FEE]/10 mb-4">
                  <Icon className="w-8 h-8 text-[#7A7FEE]" />
                </div>
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* What We Do Section */}
      <div className="mb-20 md:mb-28">
        <h2 className="text-3xl md:text-4xl font-medium text-black dark:text-white mb-8">
          Was wir machen
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-medium text-black dark:text-white mb-4">KI & Automatisierung</h3>
            <ul className="space-y-3">
              {[
                "Intelligente Chatbots für Kundenservice",
                "Prozessautomatisierung für mehr Effizienz",
                "WhatsApp Business Automation",
                "KI-gestützte Datenanalyse",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#7A7FEE] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-medium text-black dark:text-white mb-4">Web & App Entwicklung</h3>
            <ul className="space-y-3">
              {[
                "Massgeschneiderte Webanwendungen",
                "Mobile Apps für iOS und Android",
                "E-Commerce Plattformen",
                "API-Integration und Systemanbindung",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#7A7FEE] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-20 md:mb-28">
        <div className="grid sm:grid-cols-3 gap-8 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#7A7FEE]/10 to-[#A78BFA]/10">
          {[
            { value: "50+", label: "Erfolgreiche Projekte" },
            { value: "95%", label: "Kundenzufriedenheit" },
            { value: "24/7", label: "Support verfügbar" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#7A7FEE] mb-2">{stat.value}</div>
              <div className="text-gray-700 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-medium text-black dark:text-white mb-6">
          Bereit für Ihre digitale Transformation?
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Lassen Sie uns gemeinsam Ihre Vision in die Realität umsetzen. Vereinbaren Sie noch heute ein 
          kostenloses Erstgespräch.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <ContactFormButton />
          <Link href="/dienstleistungen" className="btn-secondary inline-flex items-center gap-2">
            Unsere Dienstleistungen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
