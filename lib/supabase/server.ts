import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"
import { createServiceClient } from "./service"

export async function createClient() {
  const cookieStore = await cookies()

  // Hole das Access Token aus den Cookies
  const accessToken = cookieStore.get("sb-access-token")?.value
  const refreshToken = cookieStore.get("sb-refresh-token")?.value

  const isDevelopment = process.env.NODE_ENV === "development"
  if (isDevelopment && (accessToken || refreshToken)) {
    // Im Development-Modus mit gültiger Session: verwende Service Role
    return createServiceClient()
  }

  const supabase = createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    },
  )

  // Wenn Tokens vorhanden sind, setze die Session
  if (accessToken && refreshToken) {
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    })
  }

  return supabase
}
