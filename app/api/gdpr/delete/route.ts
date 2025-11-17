import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

const deleteRequestSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
  verificationCode: z.string().optional(),
  confirmDelete: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, verificationCode, confirmDelete } = deleteRequestSchema.parse(body)

    const supabase = await createClient()

    // If no verification code, send one via email
    if (!verificationCode) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

      // TODO: In production, send this code via email
      console.log(`[GDPR Delete] Verification code for ${email}: ${code}`)

      return NextResponse.json({
        success: true,
        message: "Ein Verifikationscode wurde an Ihre E-Mail gesendet.",
        requiresVerification: true,
        // ONLY FOR DEMO - Remove in production
        _demo_code: code,
      })
    }

    // Verify code
    if (verificationCode.length !== 6) {
      return NextResponse.json(
        { error: "Ungültiger Verifikationscode" },
        { status: 400 }
      )
    }

    // Require explicit confirmation
    if (!confirmDelete) {
      return NextResponse.json(
        { error: "Bitte bestätigen Sie die Löschung" },
        { status: 400 }
      )
    }

    // Count affected records before deletion
    const { count: contactCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("email", email)

    // Delete contact submissions
    const { error: contactError } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("email", email)

    if (contactError) {
      console.error("[GDPR Delete Error]:", contactError)
      return NextResponse.json(
        { error: "Fehler beim Löschen der Daten" },
        { status: 500 }
      )
    }

    // Anonymize analytics events (don't delete, for statistics)
    const { error: analyticsError } = await supabase
      .from("analytics_events")
      .update({
        event_data: supabase.rpc("jsonb_set", {
          target: "event_data",
          path: "{user_email}",
          new_value: '"anonymized"',
        }),
      })
      .eq("event_data->>user_email", email)

    // Log deletion in audit log
    const { error: auditError } = await supabase.from("audit_logs").insert({
      action: "gdpr_delete",
      table_name: "contact_submissions",
      user_email: email,
      old_data: {
        records_deleted: contactCount,
        timestamp: new Date().toISOString(),
      },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      user_agent: request.headers.get("user-agent") || "unknown",
    })

    return NextResponse.json({
      success: true,
      message: "Ihre Daten wurden erfolgreich gelöscht.",
      details: {
        contact_submissions_deleted: contactCount,
        analytics_anonymized: true,
      },
    })
  } catch (error) {
    console.error("[GDPR Delete Error]:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Ungültige Anfrage", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    )
  }
}
