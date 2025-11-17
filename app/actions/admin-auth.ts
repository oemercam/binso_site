"use server"

import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { logAuditAction } from "@/lib/audit-log"
import { checkLoginAttempts, recordLoginAttempt, clearLoginAttempts } from "@/lib/security/brute-force-protection"
import { validatePassword } from "@/lib/security/password-validation"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

const DEMO_EMAIL = "demo@binso.ch"
const DEMO_PASSWORD = "Demo123!"

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const ipAddress = formData.get("ipAddress") as string | undefined

  console.log("[v0] Login-Versuch für:", email)

  const attemptCheck = await checkLoginAttempts(email, ipAddress)
  if (!attemptCheck.allowed) {
    const minutesLeft = Math.ceil((attemptCheck.lockedUntil!.getTime() - Date.now()) / 60000)

    await logAuditAction({
      userEmail: email,
      action: "failed_login",
      ipAddress,
      newData: { reason: "account_locked", minutes_left: minutesLeft },
    })

    return {
      success: false,
      error: `Account ist gesperrt. Versuchen Sie es in ${minutesLeft} Minuten erneut.`,
      lockedUntil: attemptCheck.lockedUntil,
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("[v0] Login-Fehler:", error.message)

    await recordLoginAttempt(email, false, ipAddress)

    await logAuditAction({
      userEmail: email,
      action: "failed_login",
      ipAddress,
      newData: { error: error.message, remaining_attempts: attemptCheck.remainingAttempts - 1 },
    })

    return {
      success: false,
      error: `Login fehlgeschlagen. Noch ${attemptCheck.remainingAttempts - 1} Versuche übrig.`,
    }
  }

  if (data.session) {
    console.log("[v0] Login erfolgreich")

    await recordLoginAttempt(email, true, ipAddress)
    await clearLoginAttempts(email)

    const cookieStore = await cookies()
    
    // Access Token Cookie
    cookieStore.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 Tage
      path: "/",
    })
    
    // Refresh Token Cookie
    cookieStore.set("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 Tage
      path: "/",
    })

    try {
      const adminClient = getSupabaseAdmin()
      await adminClient.from("admin_users").update({ last_login: new Date().toISOString() }).eq("email", email)
    } catch (e) {
      console.error("[v0] Failed to update last_login:", e)
    }

    await logAuditAction({
      userId: data.user.id,
      userEmail: email,
      action: "login",
      ipAddress,
      newData: { session_id: data.session.user.id },
    })

    return { success: true }
  }

  return { success: false, error: "Login fehlgeschlagen" }
}

export async function loginDemoUser() {
  console.log("[v0] Demo-Login wird durchgeführt")
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { data, error } = await supabase.auth.signInWithPassword({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  })

  if (error) {
    console.error("[v0] Demo-Login-Fehler:", error.message)
    
    if (error.message.includes("Invalid login credentials")) {
      return {
        success: false,
        error: "Demo-User existiert noch nicht. Bitte klicken Sie auf 'Demo-Account einrichten' und erstellen Sie den User zuerst.",
      }
    }
    
    return {
      success: false,
      error: `Demo-Login fehlgeschlagen: ${error.message}`,
    }
  }

  if (data.session) {
    console.log("[v0] Demo-Login erfolgreich")

    const cookieStore = await cookies()
    
    cookieStore.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    
    cookieStore.set("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    try {
      const adminClient = getSupabaseAdmin()
      await adminClient.from("admin_users").update({ last_login: new Date().toISOString() }).eq("email", DEMO_EMAIL)
    } catch (e) {
      console.error("[v0] Failed to update last_login:", e)
    }

    await logAuditAction({
      userId: data.user.id,
      userEmail: DEMO_EMAIL,
      action: "login",
      newData: { type: "demo_login", session_id: data.session.user.id },
    })

    return { success: true }
  }

  return { success: false, error: "Demo-Login fehlgeschlagen" }
}

export async function logoutAdmin(userId: string, userEmail: string, ipAddress?: string) {
  await logAuditAction({
    userId,
    userEmail,
    action: "logout",
    ipAddress,
  })

  const cookieStore = await cookies()
  cookieStore.delete("sb-access-token")
  cookieStore.delete("sb-refresh-token")

  return { success: true }
}

export async function changePassword(
  userId: string,
  userEmail: string,
  currentPassword: string,
  newPassword: string,
  ipAddress?: string,
) {
  const validation = validatePassword(newPassword)
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: currentPassword,
  })

  if (verifyError) {
    return {
      success: false,
      errors: ["Aktuelles Passwort ist falsch"],
    }
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (updateError) {
    return {
      success: false,
      errors: [updateError.message],
    }
  }

  await logAuditAction({
    userId,
    userEmail,
    action: "update",
    tableName: "auth.users",
    ipAddress,
    newData: { action: "password_changed" },
  })

  return { success: true }
}
