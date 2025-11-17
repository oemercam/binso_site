// Sicherheits-Utility-Funktionen

// Input Sanitization - entfernt potentiell gefährliche Zeichen
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Entfernt <script> Tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "") // Entfernt <iframe> Tags
    .replace(/javascript:/gi, "") // Entfernt javascript: URLs
    .replace(/on\w+\s*=/gi, "") // Entfernt Event-Handler (onclick, onload, etc.)
    .trim()
}

// Email Validierung
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Telefonnummer Validierung (Schweizer Format)
export function isValidPhone(phone: string): boolean {
  if (!phone) return true // Optional field
  const phoneRegex = /^(\+41|0)[0-9\s]{9,13}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

// Rate Limiting - In-Memory Store (für Production Redis/Upstash verwenden)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(identifier: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// CSRF Token Generator
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Text-Längen-Validierung
export function validateLength(text: string, min: number, max: number): boolean {
  const length = text.trim().length
  return length >= min && length <= max
}
