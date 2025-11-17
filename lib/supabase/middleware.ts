import { type NextRequest, NextResponse } from "next/server"

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  // Admin-Zugriff prüfen
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
    const accessToken = request.cookies.get("sb-access-token")

    if (!accessToken) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  // Wenn Benutzer eingeloggt ist und zur Login-Seite geht, zum Dashboard weiterleiten
  if (request.nextUrl.pathname === "/admin/login") {
    const accessToken = request.cookies.get("sb-access-token")

    if (accessToken) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/dashboard"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
