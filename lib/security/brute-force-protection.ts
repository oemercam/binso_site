import { getSupabaseAdmin } from "../supabase/admin"

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION_MINUTES = 15
const ATTEMPT_WINDOW_MINUTES = 30

export async function checkLoginAttempts(
  email: string,
  ipAddress?: string,
): Promise<{
  allowed: boolean
  remainingAttempts: number
  lockedUntil?: Date
}> {
  try {
    const supabase = getSupabaseAdmin()
    const windowStart = new Date(Date.now() - ATTEMPT_WINDOW_MINUTES * 60 * 1000)

    const { data: attempts, error } = await supabase
      .from("login_attempts")
      .select("*")
      .eq("email", email)
      .eq("success", false)
      .gte("created_at", windowStart.toISOString())
      .order("created_at", { ascending: false })

    if (error?.code === "PGRST205" || error?.message?.includes("Could not find the table")) {
      console.log("[v0] login_attempts Tabelle existiert nicht, erlaube Login")
      return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS }
    }

    if (error) throw error

    const failedAttempts = attempts?.length || 0

    if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lastAttempt = attempts?.[0]
      if (lastAttempt) {
        const lockedUntil = new Date(new Date(lastAttempt.created_at).getTime() + LOCKOUT_DURATION_MINUTES * 60 * 1000)

        if (lockedUntil > new Date()) {
          return {
            allowed: false,
            remainingAttempts: 0,
            lockedUntil,
          }
        }
      }
    }

    return {
      allowed: true,
      remainingAttempts: Math.max(0, MAX_LOGIN_ATTEMPTS - failedAttempts),
    }
  } catch (error) {
    console.error("[v0] Failed to check login attempts:", error)
    return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS }
  }
}

export async function recordLoginAttempt(email: string, success: boolean, ipAddress?: string) {
  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from("login_attempts").insert({
      email,
      success,
      ip_address: ipAddress,
    })

    // Ignoriere Fehler wenn Tabelle nicht existiert
    if (error?.code === "PGRST205" || error?.message?.includes("Could not find the table")) {
      return
    }

    if (error) throw error

    // Lösche alte Einträge (älter als 24 Stunden)
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
    await supabase.from("login_attempts").delete().lt("created_at", cutoff.toISOString())
  } catch (error) {
    console.error("[v0] Failed to record login attempt:", error)
  }
}

export async function clearLoginAttempts(email: string) {
  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from("login_attempts").delete().eq("email", email)

    // Ignoriere Fehler wenn Tabelle nicht existiert
    if (error?.code === "PGRST205" || error?.message?.includes("Could not find the table")) {
      return
    }

    if (error) throw error
  } catch (error) {
    console.error("[v0] Failed to clear login attempts:", error)
  }
}
