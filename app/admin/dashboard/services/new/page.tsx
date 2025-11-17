import { ServiceForm } from "@/components/admin/service-form"

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Neue Dienstleistung</h1>
        <p className="mt-2 text-gray-600">Erstellen Sie eine neue Dienstleistung</p>
      </div>

      <ServiceForm />
    </div>
  )
}
