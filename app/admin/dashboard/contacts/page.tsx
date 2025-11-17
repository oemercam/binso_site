import { createClient } from "@/lib/supabase/server"
import { ContactsTable } from "@/components/admin/contacts-table"
import { AlertCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function ContactsManagementPage() {
  const supabase = await createClient()

  const { data: contacts, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error && error.message && error.message.includes("infinite recursion")) {
    redirect("/admin/dashboard/rls-fix-required")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kontaktanfragen</h1>
        <p className="mt-2 text-gray-600">Alle Kontaktformular-Einträge von Ihrer Webseite</p>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">Fehler beim Laden</h3>
              <p className="text-red-800 text-sm">{error.message}</p>
            </div>
          </div>
        </div>
      ) : (
        <ContactsTable contacts={contacts || []} />
      )}
    </div>
  )
}
