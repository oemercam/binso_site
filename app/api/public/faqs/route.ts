import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error("[v0] Error fetching FAQs:", error.message)
    return NextResponse.json([], { status: 200 })
  }
}
