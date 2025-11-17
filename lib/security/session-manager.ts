import { getSupabaseAdmin } from "../supabase/admin"

const SESSION_TIMEOUT_MINUTES = 30
const SESSION_MAX_LIFETIME_HOURS = 24

export interface Session {
  id: string
  userId: string
  sessionToken: string
  ipAddress?: string
  userAgent?: string
  expiresAt: Date
  lastActivity: Date
  createdAt: Date
}

export async function createSession(userId: string, ipAddress?: string, userAgent?: string): Promise<Session | null> {
  try {
    const supabase = getSupabaseAdmin()

    // Generiere sicheren Session-Token
    const sessionToken = generateSecureToken()

    const expiresAt = new Date(Date.now() + SESSION_TIMEOUT_MINUTES * 60 * 1000)

    const { data, error } = await supabase
      .from("admin_sessions")
      .insert({
        user_id: userId,
        session_token: sessionToken,
        ip_address: ipAddress,
        user_agent: userAgent,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      userId: data.user_id,
      sessionToken: data.session_token,
      ipAddress: data.ip_address,
      userAgent: data.user_agent,
      expiresAt: new Date(data.expires_at),
      lastActivity: new Date(data.last_activity),
      createdAt: new Date(data.created_at),
    }
  } catch (error) {
    console.error("[v0] Failed to create session:", error)
    return null
  }
}

export async function validateSession(sessionToken: string): Promise<{
  valid: boolean
  session?: Session
  reason?: string
}> {
  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase.from("admin_sessions").select("*").eq("session_token", sessionToken).single()

    if (error || !data) {
      return { valid: false, reason: "session_not_found" }
    }

    const now = new Date()
    const expiresAt = new Date(data.expires_at)
    const createdAt = new Date(data.created_at)
    const lastActivity = new Date(data.last_activity)

    // Prüfe ob Session abgelaufen ist (Inaktivität)
    if (expiresAt < now) {
      await deleteSession(sessionToken)
      return { valid: false, reason: "session_expired" }
    }

    // Prüfe maximale Lebensdauer
    const maxLifetime = new Date(createdAt.getTime() + SESSION_MAX_LIFETIME_HOURS * 60 * 60 * 1000)
    if (maxLifetime < now) {
      await deleteSession(sessionToken)
      return { valid: false, reason: "session_max_lifetime_reached" }
    }

    // Update Last Activity und verlängere Expiry
    const newExpiresAt = new Date(now.getTime() + SESSION_TIMEOUT_MINUTES * 60 * 1000)
    await supabase
      .from("admin_sessions")
      .update({
        last_activity: now.toISOString(),
        expires_at: newExpiresAt.toISOString(),
      })
      .eq("session_token", sessionToken)

    return {
      valid: true,
      session: {
        id: data.id,
        userId: data.user_id,
        sessionToken: data.session_token,
        ipAddress: data.ip_address,
        userAgent: data.user_agent,
        expiresAt: newExpiresAt,
        lastActivity: now,
        createdAt,
      },
    }
  } catch (error) {
    console.error("[v0] Failed to validate session:", error)
    return { valid: false, reason: "validation_error" }
  }
}

export async function deleteSession(sessionToken: string): Promise<boolean> {
  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from("admin_sessions").delete().eq("session_token", sessionToken)

    return !error
  } catch (error) {
    console.error("[v0] Failed to delete session:", error)
    return false
  }
}

export async function deleteAllUserSessions(userId: string): Promise<boolean> {
  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from("admin_sessions").delete().eq("user_id", userId)

    return !error
  } catch (error) {
    console.error("[v0] Failed to delete user sessions:", error)
    return false
  }
}

export async function cleanupExpiredSessions(): Promise<number> {
  try {
    const supabase = getSupabaseAdmin()

    const now = new Date()
    const { data, error } = await supabase.from("admin_sessions").delete().lt("expires_at", now.toISOString()).select()

    if (error) throw error

    return data?.length || 0
  } catch (error) {
    console.error("[v0] Failed to cleanup expired sessions:", error)
    return 0
  }
}

function generateSecureToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}
