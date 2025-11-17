import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase.from("testimonials").update(body).eq("id", params.id).select().single()

    if (error) throw error

    return Response.json(data)
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return Response.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from("testimonials").delete().eq("id", params.id)

    if (error) throw error

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return Response.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
