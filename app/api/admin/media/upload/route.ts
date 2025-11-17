import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to base64 for storage (simplified approach)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")
    const dataUrl = `data:${file.type};base64,${base64}`

    // In production, you would upload to Vercel Blob or S3
    // For now, we store the base64 data URL
    const filename = `${Date.now()}_${file.name}`

    const { data, error } = await supabase
      .from("media")
      .insert({
        filename: filename,
        original_filename: file.name,
        file_path: dataUrl, // In production: actual blob URL
        file_type: file.type.startsWith("image/") ? "image" : "document",
        mime_type: file.type,
        file_size: file.size,
        category: "general",
        uploaded_by: "admin",
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
