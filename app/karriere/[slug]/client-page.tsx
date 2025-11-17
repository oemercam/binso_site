'use client'

import { jobsData } from "@/lib/jobs-data"
import { notFound, useRouter } from 'next/navigation'
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Calendar, CheckCircle, Home, ChevronRight } from 'lucide-react'

interface JobDetailClientPageProps {
  slug: string
}

export default function JobDetailClientPage({ slug }: JobDetailClientPageProps) {
  const router = useRouter()
  const job = jobsData.find((item) => item.slug === slug)

  if (!job) {
    notFound()
  }

  const ALL_JOBS = jobsData.map(j => ({ slug: j.slug, title: j.title }))

  const handleOffeneStellenClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push('/')
    setTimeout(() => {
      const karriereSection = document.getElementById('karriere')
      if (karriereSection) {
        karriereSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-[#111111]">
        {/* Hero Section */}
        <section className="relative pt-8 pb-4">
          <div className="container">
            <div className="max-w-full">
              <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
                <Link 
                  href="/" 
                  className="text-gray-500 hover:text-[#7A7FEE] transition-colors"
                >
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <a 
                  href="/#karriere" 
                  onClick={handleOffeneStellenClick}
                  className="text-gray-500 hover:text-[#7A7FEE] transition-colors cursor-pointer"
                >
                  Offene Stellen
                </a>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {job.title}
                </span>
              </nav>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[#7A7FEE]/10 text-[#7A7FEE] rounded-full text-sm font-medium">
                  {job.department}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {job.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="pb-8">
          <div className="container">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src={job.heroImage || "/placeholder.svg"}
                alt={job.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Job Details Navigation */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="container">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Weitere offene Stellen:</p>
            <div className="flex flex-wrap gap-2">
              {ALL_JOBS.map((j) => (
                <Link
                  key={j.slug}
                  href={`/karriere/${j.slug}`}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${j.slug === slug 
                      ? 'bg-[#7A7FEE] text-white' 
                      : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  {j.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Job Info Cards */}
        <section className="py-12 bg-gradient-to-br from-[#7A7FEE]/5 to-transparent">
          <div className="container">
            <div className="max-w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#111111] rounded-xl p-6 text-center border-2 border-[#7A7FEE]/20 shadow-lg">
                  <MapPin className="w-8 h-8 text-[#7A7FEE] mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Standort</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{job.location}</div>
                </div>
                <div className="bg-white dark:bg-[#111111] rounded-xl p-6 text-center border-2 border-[#7A7FEE]/20 shadow-lg">
                  <Clock className="w-8 h-8 text-[#7A7FEE] mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Arbeitszeit</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{job.type}</div>
                </div>
                {job.hybridWork && (
                  <div className="bg-white dark:bg-[#111111] rounded-xl p-6 text-center border-2 border-[#7A7FEE]/20 shadow-lg">
                    <Home className="w-8 h-8 text-[#7A7FEE] mx-auto mb-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Hybrid Work</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{job.hybridWork}</div>
                  </div>
                )}
                {job.startDate && (
                  <div className="bg-white dark:bg-[#111111] rounded-xl p-6 text-center border-2 border-[#7A7FEE]/20 shadow-lg">
                    <Calendar className="w-8 h-8 text-[#7A7FEE] mx-auto mb-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Start Datum</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{job.startDate}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Responsibilities Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Deine Aufgaben
              </h2>
              <ul className="space-y-4">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#7A7FEE] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="container">
            <div className="max-w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Das bringst du mit
              </h2>
              <ul className="space-y-4">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#7A7FEE] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Das bieten wir dir
              </h2>
              <ul className="space-y-4">
                {job.benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#7A7FEE] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#7A7FEE]">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Bereit für den nächsten Karriereschritt?
            </h2>
            <p className="text-white/90 mb-4 max-w-2xl mx-auto text-lg">
              Werde Teil unseres Teams und gestalte die digitale Zukunft mit binso.
            </p>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg font-medium">
              Sende uns deine Bewerbung und erzähle uns, warum du perfekt zu uns passt.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#7A7FEE] hover:bg-gray-100"
                onClick={() => {
                  const event = new CustomEvent("openContactDrawer", { 
                    detail: { subject: `Bewerbung: ${job.title}` } 
                  })
                  window.dispatchEvent(event)
                }}
              >
                Jetzt bewerben
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
