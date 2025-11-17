import { type NextRequest, NextResponse } from "next/server"
import { validateSession } from "@/lib/security/session-manager"

export async function POST(request: NextRequest) {
  try {
    const { sessionToken } = await request.json()

    if (!sessionToken) {
      return NextResponse.json({ valid: false, reason: "missing_token" }, { status: 400 })
    }

    const result = await validateSession(sessionToken)

    if (!result.valid) {
      return NextResponse.json({ valid: false, reason: result.reason }, { status: 401 })
    }

    return NextResponse.json({
      valid: true,
      expiresAt: result.session?.expiresAt,
      userId: result.session?.userId,
    })
  } catch (error) {
    console.error("[v0] Session validation error:", error)
    return NextResponse.json({ valid: false, reason: "validation_error" }, { status: 500 })
  }
}
