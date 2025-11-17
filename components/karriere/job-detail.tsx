"use client"

import { Job } from "@/lib/jobs-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle2 } from 'lucide-react'
import Link from "next/link"

interface JobDetailProps {
  job: Job
}

export default function JobDetail({ job }: JobDetailProps) {
  const handleApply = () => {
    const event = new CustomEvent('openContactDrawer', { 
      detail: { subject: `Bewerbung: ${job.title}` } 
    })
    window.dispatchEvent(event)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#7A7FEE]/10 to-[#6366F1]/5 dark:from-[#7A7FEE]/20 dark:to-[#6366F1]/10 border-b">
        <div className="container-custom py-8 md:py-12">
          <Link 
            href="/#karriere" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zu allen Stellen
          </Link>
          
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#7A7FEE]/10 dark:bg-[#7A7FEE]/20 flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-[#7A7FEE]" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-2">
                {job.title}
              </h1>
              <p className="text-lg text-[#7A7FEE] font-medium">{job.department}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{job.type}</span>
            </div>
            {job.salary && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{job.salary}</span>
              </div>
            )}
          </div>

          <Button 
            size="lg" 
            onClick={handleApply}
            className="bg-[#7A7FEE] hover:bg-[#6366F1] text-white"
          >
            Jetzt bewerben
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl">
          {/* Description */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
              Über die Position
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {job.description}
            </p>
          </section>

          {/* Responsibilities */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6">
              Deine Aufgaben
            </h2>
            <ul className="space-y-3">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7A7FEE] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6">
              Das bringst du mit
            </h2>
            <ul className="space-y-3">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7A7FEE] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6">
              Das bieten wir dir
            </h2>
            <ul className="space-y-3">
              {job.benefits.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7A7FEE] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <div className="card p-8 bg-gradient-to-br from-[#7A7FEE]/10 to-[#6366F1]/5 dark:from-[#7A7FEE]/20 dark:to-[#6366F1]/10">
            <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">
              Interessiert?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Wir freuen uns auf deine Bewerbung! Sende uns deine Unterlagen und erzähle uns,
              warum du perfekt zu binso passt.
            </p>
            <Button 
              size="lg" 
              onClick={handleApply}
              className="bg-[#7A7FEE] hover:bg-[#6366F1] text-white"
            >
              Bewerbung senden
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
