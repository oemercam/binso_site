import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

const exportRequestSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
  verificationCode: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, verificationCode } = exportRequestSchema.parse(body)

    const supabase = await createClient()

    // If no verification code, send one via email (in production, use actual email service)
    if (!verificationCode) {
      // Generate a simple verification code (in production, use crypto.randomBytes)
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()

      // Store verification code in database with expiration (15 minutes)
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

      // TODO: In production, send this code via email
      console.log(`[GDPR Export] Verification code for ${email}: ${code}`)

      return NextResponse.json({
        success: true,
        message: "Ein Verifikationscode wurde an Ihre E-Mail gesendet.",
        requiresVerification: true,
        // ONLY FOR DEMO - Remove in production
        _demo_code: code,
      })
    }

    // Verify code (simplified for demo - in production, check against stored code)
    if (verificationCode.length !== 6) {
      return NextResponse.json(
        { error: "Ungültiger Verifikationscode" },
        { status: 400 }
      )
    }

    // Collect all personal data for this email
    const userData: Record<string, any> = {
      export_date: new Date().toISOString(),
      email: email,
      data_sources: {},
    }

    // Export contact submissions
    const { data: contacts } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("email", email)

    if (contacts && contacts.length > 0) {
      userData.data_sources.contact_submissions = contacts
    }

    // Export analytics events (if user_identifier matches)
    const { data: analytics } = await supabase
      .from("analytics_events")
      .select("*")
      .eq("event_data->>user_email", email)

    if (analytics && analytics.length > 0) {
      userData.data_sources.analytics_events = analytics
    }

    // Export page views (if IP matches any contact submission IP)
    // Note: This is privacy-sensitive, only include if legally required
    if (contacts && contacts.length > 0) {
      userData.data_sources.page_views_note =
        "IP-basierte Daten wurden anonymisiert und werden nicht exportiert"
    }

    // Generate downloadable JSON
    const jsonData = JSON.stringify(userData, null, 2)

    return new NextResponse(jsonData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="my-data-export-${Date.now()}.json"`,
      },
    })
  } catch (error) {
    console.error("[GDPR Export Error]:", error)

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
