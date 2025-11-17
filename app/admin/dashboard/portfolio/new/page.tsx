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

export default function NewPortfolioPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Neues Portfolio-Projekt</h1>
        <p className="mt-2 text-gray-600">Erstellen Sie ein neues Projekt für Ihr Portfolio</p>
      </div>

      <PortfolioForm />
    </div>
  )
}
