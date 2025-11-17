"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Service {
  id: number
  slug: string
  title: string
  description: string
  image: string
  category: string
  published: boolean
}

const fallbackServices: Service[] = [
  {
    id: 1,
    slug: "azure-m365-services",
    title: "Azure & Microsoft 365",
    description: "Professionelle Azure Cloud-Lösungen und Microsoft 365 Integration für moderne Arbeitsumgebungen.",
    image: "/azure-cloud-microsoft-365.jpg",
    category: "Cloud",
    published: true,
  },
  {
    id: 2,
    slug: "cyber-security",
    title: "Cyber Security",
    description: "Umfassende IT-Sicherheitslösungen zum Schutz Ihrer Daten und Systeme vor Cyber-Bedrohungen.",
    image: "/cyber-security-shield-protection.jpg",
    category: "Security",
    published: true,
  },
  {
    id: 3,
    slug: "it-consulting-support",
    title: "IT Consulting & Support",
    description: "Kompetente Beratung und zuverlässiger IT-Support für Ihr Unternehmen – individuell und persönlich.",
    image: "/it-consulting-business-support.jpg",
    category: "Consulting",
    published: true,
  },
  {
    id: 4,
    slug: "netzwerk-infrastruktur",
    title: "Netzwerk & Infrastruktur",
    description: "Planung, Installation und Wartung moderner Netzwerk- und IT-Infrastruktur für maximale Performance.",
    image: "/network-infrastructure-servers.jpg",
    category: "Infrastruktur",
    published: true,
  },
  {
    id: 5,
    slug: "website-entwicklung",
    title: "Website-Entwicklung",
    description: "Professionelle Entwicklung moderner Websites und Webanwendungen nach Ihren Anforderungen.",
    image: "/modern-web-development-responsive.jpg",
    category: "Development",
    published: true,
  },
  {
    id: 6,
    slug: "it-outsourcing",
    title: "IT-Outsourcing",
    description: "Qualifizierte IT-Fachkräfte für Ihr Unternehmen – flexibel, kompetent und kosteneffizient.",
    image: "/it-team-outsourcing-professionals.jpg",
    category: "Outsourcing",
    published: true,
  },
  {
    id: 7,
    slug: "cloud-services",
    title: "Cloud-Lösungen",
    description: "Sichere und skalierbare Cloud-Services für moderne Geschäftsanforderungen.",
    image: "/cloud-computing-services.png",
    category: "Cloud",
    published: true,
  },
  {
    id: 8,
    slug: "modern-workplace",
    title: "Modern Workplace",
    description: "Transformation zu modernen digitalen Arbeitsplätzen mit Microsoft 365 und Teams.",
    image: "/modern-workplace-digital-office.jpg",
    category: "Workplace",
    published: true,
  },
  {
    id: 9,
    slug: "ki-automation",
    title: "KI & Automation",
    description: "Intelligente Automatisierungslösungen und KI-Integration für effizientere Geschäftsprozesse.",
    image: "/ai-automation-artificial-intelligence.jpg",
    category: "KI",
    published: true,
  },
]

export default function Services() {
  const [services, setServices] = useState<Service[]>(fallbackServices)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch("/api/public/services")
        if (res.ok) {
          const data = await res.json()
          if (data && Array.isArray(data) && data.length > 0) {
            setServices(data)
          }
        }
      } catch (err) {
        console.error("[v0] Failed to load services:", err)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft
      const itemWidth = carousel.offsetWidth
      const newSlide = Math.round(scrollLeft / itemWidth)
      setCurrentSlide(newSlide)
    }

    carousel.addEventListener("scroll", handleScroll)
    return () => carousel.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) {
    return (
      <section id="dienstleistungen" className="mb-20">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-6"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded w-full max-w-2xl mb-12"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="dienstleistungen" className="mb-16 md:mb-20">
      <h2 className="text-black dark:text-white mb-4 md:mb-6 text-[1.75rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-5xl font-medium sm:leading-tight">
        Unsere
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">IT-Services</span>
      </h2>
      <p className="mb-8 md:mb-12 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
        Von Azure & Microsoft 365 über Cyber Security bis zu Website-Entwicklung und IT-Outsourcing – 
        wir bieten umfassende IT-Dienstleistungen für Privat- und Geschäftskunden.
      </p>

      {/* Mobile Carousel */}
      <div className="sm:hidden">
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/dienstleistungen/${service.slug}`}
              className="flex-shrink-0 w-[85vw] card overflow-hidden rounded-3xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg snap-center group"
            >
              <div className="block h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                      {service.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg leading-snug mb-3">{service.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-gray-700 dark:text-gray-300 mb-4">{service.description}</p>
                  <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium mt-auto group">
                    Mehr erfahren{" "}
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const carousel = carouselRef.current
                if (carousel) {
                  carousel.scrollTo({
                    left: carousel.offsetWidth * index,
                    behavior: "smooth",
                  })
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-[#7A7FEE]" : "w-2 bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/dienstleistungen/${service.slug}`}
            className="card overflow-hidden rounded-3xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg h-full group"
          >
            <div className="block h-full flex flex-col">
              <div className="relative overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                    {service.category}
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{service.description}</p>
                <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium mt-auto group">
                  Mehr erfahren{" "}
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Alle Leistungen Button */}
      {services.length > 6 && (
        <div className="flex justify-center mt-8">
          <Link href="/dienstleistungen" className="btn-primary">
            Alle Leistungen ansehen
          </Link>
        </div>
      )}
    </section>
  )
}
