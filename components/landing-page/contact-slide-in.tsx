"use client"

import { useState } from "react"
import { X, Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactSlideInProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactSlideIn({ isOpen, onClose }: ContactSlideInProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-[110] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#0A0A0A] z-[120] shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0A0A] flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Kontakt</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Schließen"
            >
              <X className="h-5 w-5 text-gray-800 dark:text-gray-200" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6 pb-8">
            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                Kontaktinformationen
              </h3>
              
              <a
                href="mailto:info@binso.ch"
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
              >
                <Mail className="w-5 h-5 text-[#7A7FEE] mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#7A7FEE] transition-colors">
                    E-Mail
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">info@binso.ch</p>
                </div>
              </a>

              <a
                href="tel:+41792619587"
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
              >
                <Phone className="w-5 h-5 text-[#7A7FEE] mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#7A7FEE] transition-colors">
                    Telefon
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">+41 79 261 95 87</p>
                </div>
              </a>

              <div className="flex items-start gap-3 p-2.5 rounded-lg">
                <MapPin className="w-5 h-5 text-[#7A7FEE] mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Adresse</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Binso GmbH<br />
                    Weissbadstrasse 8b<br />
                    CH-9050 Appenzell
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                Nachricht senden
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <Input
                    type="text"
                    placeholder="Ihr Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full h-11 text-[15px]"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Ihre E-Mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full h-11 text-[15px]"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Ihre Telefonnummer (optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 text-[15px]"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Ihre Nachricht"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full resize-none text-[15px] min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#7A7FEE] hover:bg-[#6B6FDE] text-white h-11 text-[15px]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Nachricht senden
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
