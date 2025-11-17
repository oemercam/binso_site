"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

type Testimonial = {
  id: string
  client_name: string
  client_role: string
  client_company: string
  testimonial: string
  rating: number
  image_url: string
  project_reference: string
  published: boolean
  sort_order: number
  created_at: string
}

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true })

    if (error) {
      if (error.message && error.message.includes("infinite recursion")) {
        router.push("/admin/dashboard/rls-fix-required")
        return
      }
      setError(error.message)
    }

    if (!error && data) {
      setTestimonials(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Möchten Sie dieses Testimonial wirklich löschen?")) return

    const { error } = await supabase.from("testimonials").delete().eq("id", id)

    if (!error) {
      fetchTestimonials()
    }
  }

  const togglePublished = async (id: string, published: boolean) => {
    const { error } = await supabase.from("testimonials").update({ published: !published }).eq("id", id)

    if (!error) {
      fetchTestimonials()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Laden...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-1">Fehler beim Laden</h3>
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Link href="/admin/dashboard/testimonials/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neues Testimonial
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600">Noch keine Testimonials vorhanden.</p>
            </CardContent>
          </Card>
        ) : (
          testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold">{testimonial.client_name}</h3>
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {testimonial.client_role} {testimonial.client_company && `bei ${testimonial.client_company}`}
                    </p>
                    <p className="text-gray-700 line-clamp-3 mb-3">{testimonial.testimonial}</p>
                    {testimonial.project_reference && (
                      <p className="text-sm text-gray-600">Projekt: {testimonial.project_reference}</p>
                    )}
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          testimonial.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {testimonial.published ? "Veröffentlicht" : "Entwurf"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => togglePublished(testimonial.id, testimonial.published)}>
                      {testimonial.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Link href={`/admin/dashboard/testimonials/${testimonial.id}`}>
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(testimonial.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
