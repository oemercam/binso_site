import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseAdmin()
  const body = await request.json()

  const { data, error } = await supabase.from("services").update(body).eq("id", params.id).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseAdmin()
  const { error } = await supabase.from("services").delete().eq("id", params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
