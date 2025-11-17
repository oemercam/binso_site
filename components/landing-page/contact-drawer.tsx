"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, User, Building2, MessageCircle, Linkedin, Calendar } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { submitContactForm } from "@/app/actions/contact"

interface ContactDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    website: "",
    privacyConsent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formStartTime] = useState(Date.now())

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      privacyConsent: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.website) {
      return
    }

    const timeSinceStart = Date.now() - formStartTime
    if (timeSinceStart < 3000) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitStatus("success")

        // Reset nach 2 Sekunden
        setTimeout(() => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            message: "",
            website: "",
            privacyConsent: false,
          })
          setSubmitStatus("idle")
          onClose()
        }, 2000)
      } else {
        setSubmitStatus("error")
        console.error("Formular-Fehler:", result.errors)
      }
    } catch (error) {
      console.error("Fehler beim Absenden:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-5xl overflow-y-auto p-0">
        <div className="p-6 sm:p-8">
          <SheetHeader className="mb-8">
            <SheetTitle className="text-3xl font-medium">
              Kontakt
              <span className="text-[#7A7FEE]"> aufnehmen</span>
            </SheetTitle>
            <SheetDescription className="text-base">
              Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
            </SheetDescription>
          </SheetHeader>

          {submitStatus === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Vielen Dank!</h3>
              <p className="text-muted-foreground">
                Ihre Nachricht wurde erfolgreich versendet. Wir werden uns bald bei Ihnen melden.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[380px_1fr] gap-8">
              {/* Linke Spalte - Firmendaten */}
              <div className="lg:border-r lg:border-border lg:pr-8">
                <div className="sticky top-0 space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-6 text-foreground">Unsere Kontaktdaten</h3>
                    <div className="space-y-6">
                      {/* Adresse */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#7A7FEE]/10 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-[#7A7FEE]" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Binso GmbH</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Weissbadstrasse 8b
                            <br />
                            CH-9050 Appenzell
                            <br />
                            Schweiz
                          </p>
                        </div>
                      </div>

                      {/* Telefon */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#7A7FEE]/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-[#7A7FEE]" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Telefon</p>
                          <a
                            href="tel:+41792619587"
                            className="text-sm text-muted-foreground hover:text-[#7A7FEE] transition-colors"
                          >
                            +41 79 261 95 87
                          </a>
                        </div>
                      </div>

                      {/* E-Mail */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#7A7FEE]/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-[#7A7FEE]" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">E-Mail</p>
                          <a
                            href="mailto:info@binso.ch"
                            className="text-sm text-muted-foreground hover:text-[#7A7FEE] transition-colors break-all"
                          >
                            info@binso.ch
                          </a>
                        </div>
                      </div>

                      {/* MWST */}
                      <div className="pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">MWST-Nr:</span>
                          <br />
                          CHE-173.401.068 MWST
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          <span className="font-medium text-foreground">Handelsregister:</span>
                          <br />
                          CH-310.4.003.501-7
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="text-sm font-medium text-foreground mb-4">Schneller Kontakt</h4>
                    <div className="space-y-3">
                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/905309103708"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors group"
                      >
                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                        <div>
                          <p className="text-sm font-medium text-foreground">WhatsApp</p>
                          <p className="text-xs text-muted-foreground">Direktnachricht senden</p>
                        </div>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/company/binso-gmbh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 transition-colors group"
                      >
                        <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                        <div>
                          <p className="text-sm font-medium text-foreground">LinkedIn</p>
                          <p className="text-xs text-muted-foreground">Folgen Sie uns</p>
                        </div>
                      </a>

                      {/* Meeting buchen */}
                      <a
                        href="https://calendly.com/binso-gmbh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#7A7FEE]/10 hover:bg-[#7A7FEE]/20 transition-colors group"
                      >
                        <Calendar className="w-5 h-5 text-[#7A7FEE]" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Meeting buchen</p>
                          <p className="text-xs text-muted-foreground">Direkt Termin wählen</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rechte Spalte - Formular */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Vorname */}
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#7A7FEE]" />
                        Vorname <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Max"
                        className="focus-visible:ring-[#7A7FEE]"
                      />
                    </div>

                    {/* Nachname */}
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#7A7FEE]" />
                        Nachname <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Muster"
                        className="focus-visible:ring-[#7A7FEE]"
                      />
                    </div>
                  </div>

                  {/* E-Mail */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#7A7FEE]" />
                      E-Mail-Adresse <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="max.muster@beispiel.ch"
                      className="focus-visible:ring-[#7A7FEE]"
                    />
                  </div>

                  {/* Telefon */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#7A7FEE]" />
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+41 79 123 45 67"
                      className="focus-visible:ring-[#7A7FEE]"
                    />
                  </div>

                  {/* Firma */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#7A7FEE]" />
                      Firma
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Ihre Firma AG"
                      className="focus-visible:ring-[#7A7FEE]"
                    />
                  </div>

                  {/* Honeypot */}
                  <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Nachricht */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Ihre Nachricht <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Anfrage..."
                      rows={5}
                      className="focus-visible:ring-[#7A7FEE] resize-none"
                    />
                  </div>

                  {/* Datenschutz Checkbox */}
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="privacyConsent"
                      checked={formData.privacyConsent}
                      onCheckedChange={handleCheckboxChange}
                      required
                      className="mt-1 data-[state=checked]:bg-[#7A7FEE] data-[state=checked]:border-[#7A7FEE]"
                    />
                    <Label htmlFor="privacyConsent" className="text-sm leading-relaxed font-normal cursor-pointer">
                      Ich habe die{" "}
                      <Link href="/datenschutz" className="text-[#7A7FEE] hover:underline">
                        Datenschutzerklärung
                      </Link>{" "}
                      gelesen und akzeptiere diese. <span className="text-red-500">*</span>
                    </Label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="pt-4 flex gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.privacyConsent}
                      className="flex-1 bg-[#7A7FEE] hover:bg-[#6B6FDE] text-white disabled:opacity-50"
                    >
                      {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                    </Button>
                    <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                      Abbrechen
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
