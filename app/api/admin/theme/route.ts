import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from("theme_settings").select("*").order("category", { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching theme settings:", error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const { settings } = await request.json()

    for (const setting of settings) {
      await supabase
        .from("theme_settings")
        .update({
          value: setting.value,
          updated_at: new Date().toISOString(),
        })
        .eq("key", setting.key)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating theme settings:", error)
    return NextResponse.json({ error: "Failed to update theme" }, { status: 500 })
  }
}
