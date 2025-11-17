import { createClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient()

    const { data: projects, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(projects || [])
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return NextResponse.json([], { status: 200 })
  }
}
