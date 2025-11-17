import { createClient } from "@/lib/supabase/server"
import { notFound } from 'next/navigation'
import dynamic from "next/dynamic"

const PortfolioForm = dynamic(
  () => import("@/components/admin/portfolio-form").then((mod) => ({ default: mod.PortfolioForm })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    ),
  }
)

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: project, error } = await supabase.from("portfolio_projects").select("*").eq("id", params.id).single()

  if (error || !project) {
    notFound()
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Projekt bearbeiten</h1>
        <p className="mt-2 text-gray-600">Bearbeiten Sie die Details Ihres Portfolio-Projekts</p>
      </div>

      <PortfolioForm project={project} />
    </div>
  )
}
