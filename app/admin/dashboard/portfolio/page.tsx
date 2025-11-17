import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { PortfolioTable } from "@/components/admin/portfolio-table"
import { AlertTriangle } from 'lucide-react'
import { ExternalLink } from 'lucide-react'

export default async function PortfolioManagementPage() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error && error.message.includes("infinite recursion")) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-red-900 mb-2">
                Datenbank-Konfiguration erforderlich
              </h2>
              <p className="text-red-800 mb-4">
                Die Row Level Security (RLS) Policies verursachen eine Endlosschleife.
                Bitte beheben Sie dieses Problem, um das Admin-Dashboard nutzen zu können.
              </p>
              <Link href="/admin/dashboard/rls-fix-required">
                <Button variant="destructive">
                  Zum Fix-Tutorial
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Projekte</h1>
          <p className="mt-2 text-gray-600">Verwalten Sie alle Portfolio-Projekte auf Ihrer Webseite</p>
        </div>
        <Link href="/admin/dashboard/portfolio/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neues Projekt
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Fehler beim Laden der Projekte: {error.message}</p>
        </div>
      ) : (
        <PortfolioTable projects={projects || []} />
      )}
    </div>
  )
}
