import { getSupabaseAdmin } from "./supabase/admin"

export interface AuditLogEntry {
  userId?: string
  userEmail?: string
  action: "create" | "update" | "delete" | "login" | "logout" | "failed_login" | "view"
  tableName?: string
  recordId?: string
  oldData?: any
  newData?: any
  ipAddress?: string
  userAgent?: string
}

export async function logAuditAction(entry: AuditLogEntry) {
  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from("audit_logs").insert({
      user_id: entry.userId,
      user_email: entry.userEmail,
      action: entry.action,
      table_name: entry.tableName,
      record_id: entry.recordId,
      old_data: entry.oldData,
      new_data: entry.newData,
      ip_address: entry.ipAddress,
      user_agent: entry.userAgent,
    })

    // Ignoriere Fehler wenn Tabelle nicht existiert
    if (error?.code === "PGRST205" || error?.message?.includes("Could not find the table")) {
      return
    }

    if (error) {
      console.error("[v0] Audit log error:", error.message)
    }
  } catch (error) {
    console.error("[v0] Failed to log audit action:", error)
  }
}

export async function getAuditLogs(filters?: {
  userId?: string
  tableName?: string
  action?: string
  startDate?: Date
  endDate?: Date
  limit?: number
}) {
  try {
    const supabase = getSupabaseAdmin()
    let query = supabase.from("audit_logs").select("*").order("created_at", { ascending: false })

    if (filters?.userId) {
      query = query.eq("user_id", filters.userId)
    }
    if (filters?.tableName) {
      query = query.eq("table_name", filters.tableName)
    }
    if (filters?.action) {
      query = query.eq("action", filters.action)
    }
    if (filters?.startDate) {
      query = query.gte("created_at", filters.startDate.toISOString())
    }
    if (filters?.endDate) {
      query = query.lte("created_at", filters.endDate.toISOString())
    }

    query = query.limit(filters?.limit || 100)

    const { data, error } = await query

    if (error) throw error
    return data
  } catch (error) {
    console.error("[v0] Failed to get audit logs:", error)
    return []
  }
}
