// Für Produktion: Upstash Redis verwenden

interface RateLimitEntry {
  count: number
  resetAt: number
}

// In-Memory Store (wird bei Server-Restart zurückgesetzt)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup alter Einträge alle 5 Minuten
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  limit: number // Max Anzahl Requests
  window: number // Zeitfenster in Sekunden
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 100, window: 60 }
): Promise<RateLimitResult> {
  const now = Date.now()
  const windowMs = config.window * 1000
  const key = `${identifier}:${Math.floor(now / windowMs)}`

  const entry = rateLimitStore.get(key)

  if (!entry) {
    // Neuer Eintrag
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })

    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: Math.floor((now + windowMs) / 1000),
    }
  }

  if (entry.count >= config.limit) {
    // Limit erreicht
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      reset: Math.floor(entry.resetAt / 1000),
    }
  }

  // Erhöhe Counter
  entry.count++

  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - entry.count,
    reset: Math.floor(entry.resetAt / 1000),
  }
}

// Spezielle Rate Limits für verschiedene Endpunkte
export const RATE_LIMITS = {
  API_GENERAL: { limit: 100, window: 60 }, // 100 Requests pro Minute
  API_STRICT: { limit: 20, window: 60 }, // 20 Requests pro Minute (Auth, etc.)
  API_CONTACT: { limit: 5, window: 300 }, // 5 Kontaktformulare pro 5 Minuten
  API_CHATBOT: { limit: 30, window: 60 }, // 30 Chatbot-Messages pro Minute
} as const
