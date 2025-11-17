import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: true })

    if (error) throw error

    return NextResponse.json({ team: data || [] })
  } catch (error: any) {
    console.error("[v0] Error fetching team:", error.message)
    return NextResponse.json({ team: [] }, { status: 500 })
  }
}
