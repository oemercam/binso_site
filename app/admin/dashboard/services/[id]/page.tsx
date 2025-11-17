import { createClient } from "@/lib/supabase/server"
import { ServiceForm } from "@/components/admin/service-form"
import { notFound } from 'next/navigation'

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: service, error } = await supabase.from("services").select("*").eq("id", params.id).single()

  if (error || !service) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dienstleistung bearbeiten</h1>
        <p className="mt-2 text-gray-600">Bearbeiten Sie die Dienstleistung: {service.title}</p>
      </div>

      <ServiceForm service={service} />
    </div>
  )
}
