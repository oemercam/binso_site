import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "./lib/supabase/middleware"
import { rateLimit, RATE_LIMITS } from "./lib/rate-limit"

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request)

  // Wenn Supabase eine Weiterleitung zurückgibt, verwende diese
  if (supabaseResponse.status === 307 || supabaseResponse.status === 308) {
    return supabaseResponse
  }

  const response = supabaseResponse

  response.headers.set("X-Robots-Tag", "index, follow")

  // CSRF-Schutz für POST-Anfragen
  if (request.method === "POST") {
    const contentType = request.headers.get("content-type")

    // Stelle sicher, dass POST-Anfragen JSON sind
    if (!contentType?.includes("application/json") && !contentType?.includes("multipart/form-data")) {
      return new NextResponse("Invalid content type", { status: 400 })
    }
  }

  const pathname = request.nextUrl.pathname
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

  // Bestimme Rate Limit Config basierend auf Route
  let rateLimitConfig = RATE_LIMITS.API_GENERAL

  if (pathname.startsWith("/api/auth") || pathname.startsWith("/api/admin")) {
    rateLimitConfig = RATE_LIMITS.API_STRICT
  } else if (pathname.startsWith("/api/contact")) {
    rateLimitConfig = RATE_LIMITS.API_CONTACT
  } else if (pathname.startsWith("/api/chatbot")) {
    rateLimitConfig = RATE_LIMITS.API_CHATBOT
  }

  // Führe Rate Limiting nur für API-Routes durch
  if (pathname.startsWith("/api/")) {
    const rateLimitResult = await rateLimit(ip, rateLimitConfig)

    // Setze Rate Limit Headers
    response.headers.set("X-RateLimit-Limit", rateLimitResult.limit.toString())
    response.headers.set("X-RateLimit-Remaining", rateLimitResult.remaining.toString())
    response.headers.set("X-RateLimit-Reset", rateLimitResult.reset.toString())

    // Blockiere Request wenn Limit erreicht
    if (!rateLimitResult.success) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          message: "Rate limit exceeded. Please try again later.",
          retryAfter: rateLimitResult.reset,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": (rateLimitResult.reset - Math.floor(Date.now() / 1000)).toString(),
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      )
    }
  }

  return response
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
}
