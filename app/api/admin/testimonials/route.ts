import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return Response.json(data || [])
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return Response.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase.from("testimonials").insert([body]).select().single()

    if (error) throw error

    return Response.json(data)
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return Response.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
