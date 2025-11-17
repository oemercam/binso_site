"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  content: string
  rating: number
  published: boolean
}

export default function References() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>()
  const isAutoScrolling = useRef(false)

  const fallbackTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Peter Müller",
      role: "Geschäftsführer, TechStart GmbH",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Die KI-Chatbot-Lösung von Binso hat unseren Kundenservice revolutioniert. Wir sparen über 30% Zeit bei Anfragen.",
      rating: 5,
      published: true,
    },
    {
      id: 2,
      name: "Julia Schneider",
      role: "Marketing Leiterin, SwissRetail AG",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Dank der WhatsApp-Automation erreichen wir unsere Kunden direkter und effizienter. Die ROI war bereits nach 3 Monaten positiv.",
      rating: 5,
      published: true,
    },
    {
      id: 3,
      name: "Michael Koch",
      role: "CEO, InnovateSolutions",
      image: "/placeholder.svg?height=100&width=100",
      content:
        "Professionell, zuverlässig und innovativ. Binso hat unsere gesamte Prozessautomatisierung übernommen und perfekt umgesetzt.",
      rating: 5,
      published: true,
    },
    {
      id: 4,
      name: "Claudia Bauer",
      role: "Operations Manager, LogisticPro",
      image: "/placeholder.svg?height=100&width=100",
      content: "Die massgeschneiderte Web-App hat unsere internen Abläufe komplett digitalisiert. Sehr empfehlenswert!",
      rating: 5,
      published: true,
    },
  ]

  useEffect(() => {
    fetch("/api/public/testimonials")
      .then((res) => {
        if (!res.ok) throw new Error("API failed")
        return res.json()
      })
      .then((data) => {
        setTestimonials(data.length > 0 ? data : fallbackTestimonials)
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Failed to load testimonials, using fallback:", err)
        setTestimonials(fallbackTestimonials)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (testimonials.length === 0) return

    // Clear existing interval
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)

    // Start new interval
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [testimonials.length, currentIndex])

  useEffect(() => {
    if (scrollContainerRef.current && testimonials.length > 0) {
      isAutoScrolling.current = true
      const container = scrollContainerRef.current
      const scrollWidth = container.scrollWidth / testimonials.length
      container.scrollTo({
        left: scrollWidth * currentIndex,
        behavior: "smooth",
      })
      
      // Reset flag after scroll animation
      setTimeout(() => {
        isAutoScrolling.current = false
      }, 500)
    }
  }, [currentIndex, testimonials.length])

  const handleScroll = () => {
    if (!scrollContainerRef.current || isAutoScrolling.current) return
    
    const container = scrollContainerRef.current
    const scrollLeft = container.scrollLeft
    const itemWidth = container.scrollWidth / testimonials.length
    const newIndex = Math.round(scrollLeft / itemWidth)
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
  }

  if (loading) {
    return (
      <section className="mb-20" id="references">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-6"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded w-full max-w-2xl mb-12"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-16 md:mb-20" id="references">
      <div className="mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-black dark:text-white mb-4 md:mb-6 text-[1.75rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-5xl font-medium sm:leading-tight">
          Was unsere
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Kunden sagen</span>
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
          Über 50 zufriedene Kunden vertrauen auf unsere KI- und Automatisierungslösungen. Lesen Sie, was sie über uns
          sagen.
        </p>
      </div>

      <div className="relative">
        {/* Testimonials container with scroll snap */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth pb-4"
        >
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group flex-shrink-0 flex-grow-0 basis-full sm:basis-[calc(50%-12px)] border-[#E0E0E0] bg-white p-5 md:p-6 lg:p-8 transition-all hover:border-[#111111] hover:shadow-lg dark:border-[#333333] dark:bg-[#1A1A1A] dark:hover:border-[#555555] snap-start flex flex-col min-h-fit"
            >
              <div className="mb-3 md:mb-4 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-[#111111] text-[#111111] dark:fill-white dark:text-white" />
                ))}
              </div>

              <p className="mb-5 md:mb-6 flex-grow text-pretty text-[0.9375rem] md:text-base leading-relaxed text-[#333333] dark:text-[#CCCCCC] lg:text-lg">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 md:gap-4">
                <Avatar className="h-12 w-12 border-2 border-[#E0E0E0] dark:border-[#333333]">
                  <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="bg-[#F5F5F5] text-[#111111] dark:bg-[#2A2A2A] dark:text-white">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-[0.9375rem] md:text-base text-[#111111] dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-[#666666] dark:text-[#999999]">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-[#7A7FEE]"
                  : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
