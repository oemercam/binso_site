"use client"

import { useEffect, useState } from "react"
import { Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  linkedin: string
  email: string
  published: boolean
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const fallbackTeam: TeamMember[] = [
    {
      id: 1,
      name: "Ömer Cam",
      role: "Geschäftsführer",
      image: "/team/oemer-cam.jpg",
      bio: "Leitet binso mit Vision und Expertise in IT-Dienstleistungen und digitaler Transformation.",
      linkedin: "https://linkedin.com",
      email: "oemer.cam@binso.ch",
      published: true,
    },
    {
      id: 2,
      name: "Nurcan Cam",
      role: "IT-Spezialistin",
      image: "/team/nurcan-cam.jpg",
      bio: "Spezialistin für IT-Support und Kundenbetreuung mit Fokus auf höchste Kundenzufriedenheit.",
      linkedin: "https://linkedin.com",
      email: "nurcan.cam@binso.ch",
      published: true,
    },
    {
      id: 3,
      name: "Simon Steiner",
      role: "IT-Consultant",
      image: "/team/simon-steiner.jpg",
      bio: "Berät Unternehmen bei Cloud-Migration, Azure M365 und modernen Workplace-Lösungen.",
      linkedin: "https://linkedin.com",
      email: "simon.steiner@binso.ch",
      published: true,
    },
    {
      id: 4,
      name: "Alexander Sotin",
      role: "System Engineer",
      image: "/team/alexander-sotin.jpg",
      bio: "Experte für Netzwerk-Infrastruktur, System-Administration und IT-Sicherheitskonzepte.",
      linkedin: "https://linkedin.com",
      email: "alexander.sotin@binso.ch",
      published: true,
    },
    {
      id: 5,
      name: "Marco Stutz",
      role: "IT-Techniker",
      image: "/team/marco-stutz.jpg",
      bio: "Technischer Support-Spezialist für Hardware, Software und schnelle Problemlösungen.",
      linkedin: "https://linkedin.com",
      email: "marco.stutz@binso.ch",
      published: true,
    },
    {
      id: 6,
      name: "Peter Gansner",
      role: "Senior IT-Berater",
      image: "/team/peter-gansner.jpg",
      bio: "Senior Berater mit umfassender Expertise in Cyber Security, Compliance und IT-Strategie.",
      linkedin: "https://linkedin.com",
      email: "peter.gansner@binso.ch",
      published: true,
    },
    {
      id: 7,
      name: "Yunus Cam",
      role: "Web-Entwickler",
      image: "/team/yunus-cam.jpg",
      bio: "Entwickelt moderne Webanwendungen mit neuesten Technologien und responsive Design.",
      linkedin: "https://linkedin.com",
      email: "yunus.cam@binso.ch",
      published: true,
    },
    {
      id: 8,
      name: "Dilara Cam",
      role: "IT-Koordinatorin",
      image: "/team/dilara-cam.jpg",
      bio: "Koordiniert IT-Projekte, betreut Kunden und sorgt für reibungslose Projektabläufe.",
      linkedin: "https://linkedin.com",
      email: "dilara.cam@binso.ch",
      published: true,
    },
  ]

  useEffect(() => {
    fetch("/api/public/team")
      .then((res) => {
        if (!res.ok) throw new Error("API failed")
        return res.json()
      })
      .then((data) => {
        setTeamMembers(data.length > 0 ? data : fallbackTeam)
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Failed to load team, using fallback:", err)
        setTeamMembers(fallbackTeam)
        setLoading(false)
      })
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollLeft = container.scrollLeft
    const cardWidth = container.offsetWidth * 0.85
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(index)
  }

  if (loading) {
    return (
      <section className="mb-16 md:mb-20" id="team">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-6"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded w-full max-w-2xl mb-12"></div>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-16 md:mb-20" id="team">
      <h2 className="text-black dark:text-white mb-4 md:mb-6 text-[1.75rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-5xl font-medium sm:leading-tight">
        Unser
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Team</span>
      </h2>
      <p className="mb-8 md:mb-12 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
        Unser erfahrenes Team aus IT-Spezialisten, Entwicklern und Consultants bringt Ihre IT-Projekte
        zum Erfolg.
      </p>

      <div
        className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4"
        onScroll={handleScroll}
      >
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="card overflow-hidden hover:shadow-lg flex-shrink-0 w-[85vw] md:w-auto snap-center group"
          >
            <div className="relative overflow-hidden">
              <Image
                src={member.image || `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(member.name)}`}
                alt={member.name}
                width={400}
                height={400}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5 md:p-6 flex flex-col h-[220px]">
              <h3 className="text-lg md:text-xl leading-snug font-semibold text-black dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-[#7A7FEE] text-sm font-medium mb-3">{member.role}</p>
              <p className="text-gray-700 dark:text-gray-300 text-[0.9375rem] leading-relaxed mb-4 h-[60px] overflow-hidden">
                {member.bio}
              </p>

              <div className="flex gap-2 mt-auto">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  aria-label="E-Mail"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? "bg-[#7A7FEE] w-8" : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => {
              const container = document.querySelector("#team > div")
              if (container) {
                const cardWidth = container.clientWidth * 0.85
                container.scrollTo({ left: cardWidth * index, behavior: "smooth" })
              }
            }}
            aria-label={`Go to team member ${index + 1}`}
          />
        ))}
      </div>

      {teamMembers.length > 4 && (
        <div className="flex justify-center mt-8">
          <Link href="/team" className="btn-primary">
            Alle Mitarbeiter ansehen
          </Link>
        </div>
      )}
    </section>
  )
}
