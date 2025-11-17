import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, AlertCircle, ExternalLink } from 'lucide-react'
import { ServicesTable } from "@/components/admin/services-table"
import { redirect } from 'next/navigation'

export default async function ServicesManagementPage() {
  const supabase = await createClient()

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true })

  if (error && error.message && error.message.includes("infinite recursion")) {
    redirect("/admin/dashboard/rls-fix-required")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dienstleistungen</h1>
          <p className="mt-2 text-gray-600">Verwalten Sie alle Dienstleistungen auf Ihrer Webseite</p>
        </div>
        <Link href="/admin/dashboard/services/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neue Dienstleistung
          </Button>
        </Link>
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
        <ServicesTable services={services || []} />
      )}
    </div>
  )
}
