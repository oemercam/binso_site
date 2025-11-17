"use client"

import { useEffect } from "react"
import { X, Mail, Phone, MapPin, MessageCircle, Calendar } from 'lucide-react'

interface ContactBottomSheetProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactBottomSheet({ isOpen, onClose }: ContactBottomSheetProps) {
  useEffect(() => {
    console.log("[v0] ContactBottomSheet: isOpen =", isOpen)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
      document.body.style.margin = "0"
      document.body.style.padding = "0"
      document.documentElement.style.margin = "0"
      document.documentElement.style.padding = "0"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      document.body.style.margin = ""
      document.body.style.padding = ""
      document.documentElement.style.margin = ""
      document.documentElement.style.padding = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      document.body.style.margin = ""
      document.body.style.padding = ""
      document.documentElement.style.margin = ""
      document.documentElement.style.padding = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const contactOptions = [
    {
      icon: Mail,
      title: "E-Mail schreiben",
      description: "info@binso.ch",
      href: "mailto:info@binso.ch",
      color: "bg-blue-500",
    },
    {
      icon: Phone,
      title: "Anrufen",
      description: "+41 79 261 95 87",
      href: "tel:+41792619587",
      color: "bg-green-500",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Direktnachricht senden",
      href: "https://wa.me/905309103708",
      color: "bg-[#25D366]",
    },
    {
      icon: Calendar,
      title: "Termin buchen",
      description: "Erstgespräch vereinbaren",
      href: "https://outlook.office.com/bookwithme/user/6db7a69533a14cc4b119a0532f93fb77@binso.ch/meetingtype/R9jo1MFu0UShYzPR9_WyzA2?anonymous",
      color: "bg-[#7A7FEE]",
    },
  ]

  return (
    <>
      <div
        className="fixed z-[200] transition-opacity duration-300 md:hidden backdrop-blur-sm"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          margin: 0,
          padding: 0,
        }}
        onClick={onClose}
      />

      <div
        className={`fixed z-[201] bg-white dark:bg-[#0A0A0A] rounded-t-3xl shadow-2xl transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          width: '100vw',
          margin: 0,
          padding: 0,
        }}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-4 pb-3">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Kontaktieren Sie uns
          </h2>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            className="relative z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation"
            aria-label="Close"
            type="button"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Contact Options Grid */}
        <div className="px-6 pb-8 space-y-3">
          {contactOptions.map((option) => {
            const Icon = option.icon
            return (
              <a
                key={option.title}
                href={option.href}
                target={option.href.startsWith('http') ? '_blank' : undefined}
                rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-98 group"
              >
                <div className={`${option.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {option.description}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:translate-x-1 transition-transform">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            )
          })}
        </div>

        {/* Address Section */}
        <div className="px-6 pb-8">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900">
            <MapPin className="h-5 w-5 text-[#7A7FEE] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Unser Standort</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Binso GmbH<br />
                Weissbadstrasse 8b<br />
                CH-9050 Appenzell
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
