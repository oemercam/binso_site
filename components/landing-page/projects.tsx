"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from 'lucide-react'
import { fetchPortfolioData } from "@/utils/csv-parser"
import type { PortfolioItem } from "@/utils/csv-parser"

export default function Projects() {
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  // Fetch portfolio data on component mount
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchPortfolioData()
        // Get the first 3 projects for the landing page
        setProjects(data.slice(0, 3))
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollLeft = container.scrollLeft
    const cardWidth = container.offsetWidth * 0.85
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(index)
  }

  return (
    <section id="projects" className="mb-16 md:mb-20">
      <h2 className="text-black dark:text-white mb-4 md:mb-6 text-[1.75rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-5xl font-medium sm:leading-tight">
        Entdecken Sie unsere
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">neuesten Projekte</span>
      </h2>
      <p className="mb-8 md:mb-12 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
        Von KI-gestützter Automatisierung bis zu massgeschneiderten Marktplätzen – unsere Arbeit hilft Unternehmen,
        intelligenter zu wachsen. Entdecken Sie einige der Plattformen, Tools und Lösungen, die wir für unsere Kunden
        und uns selbst entwickelt haben.
      </p>

      <div
        className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4"
        onScroll={handleScroll}
      >
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="card overflow-hidden shadow-lg animate-pulse flex-shrink-0 w-[85vw] md:w-auto snap-center"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5 md:p-6">
                  <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))
          : projects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="card overflow-hidden shadow-lg transition-all duration-300 hover:shadow-lg block flex-shrink-0 w-[85vw] md:w-auto snap-center group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl leading-snug font-semibold text-black dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-[0.9375rem] leading-relaxed mt-2 mb-4">{project.shortDescription}</p>
                  <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group">
                    Projekt ansehen{" "}
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
      </div>

      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? "bg-[#7A7FEE] w-8" : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => {
              const container = document.querySelector("#projects > div")
              if (container) {
                const cardWidth = container.clientWidth * 0.85
                container.scrollTo({ left: cardWidth * index, behavior: "smooth" })
              }
            }}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/portfolio" className="btn-primary">
          Alle Projekte ansehen
        </Link>
      </div>
    </section>
  )
}
