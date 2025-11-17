"use server"

import { sanitizeInput, isValidEmail, isValidPhone, validateLength } from "@/lib/security"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  message: string
  website: string
  privacyConsent: boolean
}

interface ContactFormResult {
  success: boolean
  message: string
  errors?: Record<string, string>
}

export async function submitContactForm(formData: ContactFormData): Promise<ContactFormResult> {
  const errors: Record<string, string> = {}

  if (formData.website) {
    return {
      success: false,
      message: "Spam erkannt",
    }
  }

  const firstName = sanitizeInput(formData.firstName)
  const lastName = sanitizeInput(formData.lastName)
  const email = sanitizeInput(formData.email)
  const phone = sanitizeInput(formData.phone)
  const company = sanitizeInput(formData.company)
  const message = sanitizeInput(formData.message)

  // Pflichtfelder prüfen
  if (!validateLength(firstName, 2, 50)) {
    errors.firstName = "Vorname muss zwischen 2 und 50 Zeichen lang sein"
  }

  if (!validateLength(lastName, 2, 50)) {
    errors.lastName = "Nachname muss zwischen 2 und 50 Zeichen lang sein"
  }

  if (!isValidEmail(email)) {
    errors.email = "Ungültige E-Mail-Adresse"
  }

  if (phone && !isValidPhone(phone)) {
    errors.phone = "Ungültige Telefonnummer"
  }

  if (!validateLength(message, 10, 1000)) {
    errors.message = "Nachricht muss zwischen 10 und 1000 Zeichen lang sein"
  }

  if (!formData.privacyConsent) {
    errors.privacyConsent = "Datenschutzerklärung muss akzeptiert werden"
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Validierungsfehler",
      errors,
    }
  }

  // Hier würde normalerweise die E-Mail gesendet oder in Datenbank gespeichert werden
  console.log("Kontaktformular-Daten (validiert und sanitisiert):", {
    firstName,
    lastName,
    email,
    phone,
    company,
    message,
  })

  // Simuliere API-Verzögerung
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    message: "Ihre Nachricht wurde erfolgreich versendet. Wir melden uns bald bei Ihnen.",
  }
}
