import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    // Zähle Portfolio-Projekte
    const { count: portfolioCount } = await supabase.from("portfolio").select("*", { count: "exact", head: true })

    // Zähle Services
    const { count: servicesCount } = await supabase.from("services").select("*", { count: "exact", head: true })

    // Zähle Kontakte
    const { count: contactsCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })

    // Zähle FAQs
    const { count: faqsCount } = await supabase.from("faqs").select("*", { count: "exact", head: true })

    return NextResponse.json({
      portfolio: portfolioCount || 0,
      services: servicesCount || 0,
      contacts: contactsCount || 0,
      faqs: faqsCount || 0,
    })
  } catch (error) {
    console.error("[v0] Error loading stats:", error)
    return NextResponse.json(
      {
        portfolio: 0,
        services: 0,
        contacts: 0,
        faqs: 0,
      },
      { status: 500 },
    )
  }
}
