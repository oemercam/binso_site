import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: true })

    if (error) throw error

    return NextResponse.json({ services: data || [] })
  } catch (error: any) {
    console.error("[v0] Error fetching services:", error.message)
    return NextResponse.json({ services: [] }, { status: 500 })
  }
}
