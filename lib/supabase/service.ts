import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Service Role Client - Umgeht RLS für Admin-Operationen
let supabaseService: ReturnType<typeof createClient<Database>> | null = null

export function createServiceClient() {
  if (supabaseService) {
    return supabaseService
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase Service Role Konfiguration fehlt")
  }

  supabaseService = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return supabaseService
}
