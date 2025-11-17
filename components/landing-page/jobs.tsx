"use client"

import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { jobsData } from '@/lib/jobs-data'

export default function Jobs() {
  const publishedJobs = jobsData.filter(job => job.published)

  if (publishedJobs.length === 0) {
    return null
  }

  return (
    <section className="mb-16 md:mb-20" id="karriere">
      <h2 className="text-black dark:text-white mb-4 md:mb-6 text-[1.75rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-5xl font-medium sm:leading-tight">
        Offene
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Stellen</span>
      </h2>
      <p className="mb-8 md:mb-12 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
        Werde Teil unseres Teams und gestalte die digitale Zukunft mit uns. Wir suchen talentierte IT-Spezialisten,
        die mit Leidenschaft und Expertise an innovativen Projekten arbeiten möchten.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {publishedJobs.slice(0, 4).map((job) => (
          <Link
            key={job.id}
            href={`/karriere/${job.slug}`}
            className="card p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden block"
          >
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#7A7FEE] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#7A7FEE]/10 dark:bg-[#7A7FEE]/20 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-[#7A7FEE]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-1 group-hover:text-[#7A7FEE] transition-colors">
                  {job.title}
                </h3>
                <p className="text-sm text-[#7A7FEE] font-medium">{job.department}</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-4">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[#7A7FEE] font-medium">
              <span>Mehr erfahren</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
