import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: true })

    if (error) throw error

    return NextResponse.json({ testimonials: data || [] })
  } catch (error: any) {
    console.error("[v0] Error fetching testimonials:", error.message)
    return NextResponse.json({ testimonials: [] }, { status: 500 })
  }
}
