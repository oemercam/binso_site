import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { getAuditLogs } from "@/lib/audit-log"

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()

    // Prüfe Authentifizierung
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Hole Query-Parameter
    const searchParams = request.nextUrl.searchParams
    const tableName = searchParams.get("tableName") || undefined
    const action = searchParams.get("action") || undefined
    const limit = Number.parseInt(searchParams.get("limit") || "100")

    const logs = await getAuditLogs({
      tableName,
      action,
      limit,
    })

    return NextResponse.json({ logs })
  } catch (error) {
    console.error("[v0] Error fetching audit logs:", error)
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 })
  }
}
