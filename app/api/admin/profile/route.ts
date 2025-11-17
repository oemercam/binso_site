import { getSupabaseAdmin } from "@/lib/supabase/admin"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const cookieStore = await cookies()
    const session = cookieStore.get("admin-session")

    if (!session) {
      return Response.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userId = session.value

    const { data, error } = await supabase.from("admin_users").select("*").eq("user_id", userId).single()

    if (error) throw error

    return Response.json(data)
  } catch (error) {
    console.error("Error fetching profile:", error)
    return Response.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseAdmin()
    const cookieStore = await cookies()
    const session = cookieStore.get("admin-session")

    if (!session) {
      return Response.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userId = session.value
    const body = await request.json()

    // Update admin_users table
    const { error: adminError } = await supabase
      .from("admin_users")
      .update({
        name: body.name,
        role: body.role,
      })
      .eq("user_id", userId)

    if (adminError) throw adminError

    // If email changed, update auth user
    if (body.email) {
      const { error: authError } = await supabase.auth.admin.updateUserById(userId, { email: body.email })
      if (authError) throw authError
    }

    // If password changed, update it
    if (body.password) {
      const { error: passError } = await supabase.auth.admin.updateUserById(userId, { password: body.password })
      if (passError) throw passError
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error updating profile:", error)
    return Response.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
