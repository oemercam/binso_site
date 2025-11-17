import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle } from 'lucide-react'
import { FAQTable } from "@/components/admin/faq-table"
import { redirect } from 'next/navigation'

export default async function FAQManagementPage() {
  const supabase = await createClient()

  const { data: faqs, error } = await supabase
    .from("faqs")
    .select("*")
    .order("category", { ascending: true })
    .order("order_index", { ascending: true })

  if (error && error.message.includes("infinite recursion")) {
    redirect("/admin/dashboard/rls-fix-required")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ Verwaltung</h1>
          <p className="mt-2 text-gray-600">Verwalten Sie häufig gestellte Fragen auf Ihrer Webseite</p>
        </div>
        <Link href="/admin/dashboard/faqs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neue Frage
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-medium text-red-900">Fehler beim Laden</p>
              <p className="text-red-800 mt-1">{error.message}</p>
            </div>
          </div>
        </div>
      ) : (
        <FAQTable faqs={faqs || []} />
      )}
    </div>
  )
}
